import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { optionalEnv } from "@/lib/env";

/**
 * [TRIAD_WEBHOOK_NOWP] NOWPayments IPN webhook handler.
 * Verifies HMAC-SHA512 signature on `x-nowpayments-sig` over the JSON body
 * sorted alphabetically. Mirrors verifyNowpaymentsIpn in payments-prototypes/.
 */

export const runtime = "nodejs";

function sortObject(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortObject);
  if (value && typeof value === "object") {
    return Object.keys(value as Record<string, unknown>)
      .sort()
      .reduce<Record<string, unknown>>((acc, k) => {
        acc[k] = sortObject((value as Record<string, unknown>)[k]);
        return acc;
      }, {});
  }
  return value;
}

function timingSafeEqualHex(left: string, right: string) {
  const a = left.trim().toLowerCase();
  const b = right.trim().toLowerCase();
  if (a.length !== b.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
  } catch {
    return false;
  }
}

function verifyNowpaymentsIpn(payload: unknown, signature: string | null, secret: string) {
  if (!signature) return false;
  const sorted = JSON.stringify(sortObject(payload));
  const expected = crypto.createHmac("sha512", secret.trim()).update(sorted).digest("hex");
  return timingSafeEqualHex(expected, signature);
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  let payload: Record<string, unknown> = {};
  try {
    payload = JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    payload = Object.fromEntries(new URLSearchParams(rawBody).entries());
  }

  const signature = request.headers.get("x-nowpayments-sig");
  const secret = optionalEnv("NOWPAYMENTS_IPN_SECRET");
  const verified = secret ? verifyNowpaymentsIpn(payload, signature, secret) : false;

  const orderId =
    (typeof payload.order_id === "string" || typeof payload.order_id === "number" ? String(payload.order_id) : "") ||
    (typeof payload.payment_id === "string" || typeof payload.payment_id === "number" ? String(payload.payment_id) : "") ||
    "nowpayments_unknown";
  const status =
    (typeof payload.payment_status === "string" ? payload.payment_status : "") ||
    (typeof payload.status === "string" ? payload.status : "") ||
    "";
  const paid = ["finished", "confirmed"].includes(status.toLowerCase());

  // [TRIAD_WEBHOOK_NOWP] Wave 2 batch 1: log to stdout only. Wave 3 will
  // upsert into the orders/entitlements store.
  console.log(
    "[TRIAD_WEBHOOK_NOWP]",
    JSON.stringify({
      orderId,
      verified,
      paid,
      status,
      receivedAt: new Date().toISOString()
    })
  );

  return NextResponse.json(
    {
      ok: verified,
      orderId,
      verified,
      paid: paid && verified,
      status
    },
    { status: verified ? 200 : 401 }
  );
}
