import { NextResponse } from "next/server";
import { appUrlFromRequest, optionalEnv, requiredEnv, MissingEnvError } from "@/lib/env";

/**
 * [TRIAD_CHECKOUT_NOWP] Server-side NOWPayments hosted invoice creation.
 * POST { tier, amount, productName } → returns { mode, checkoutUrl, ... }.
 * Mirrors the working pattern from /Users/keer/projects/prin7r/payments-prototypes/.
 *
 * If NOWPAYMENTS_API_KEY is missing the route returns a mock checkout URL so
 * the landing remains usable in preview environments — but on production we
 * always have the key configured via the gitignored .env on storage-contabo.
 */

export const runtime = "nodejs";

type CheckoutBody = {
  tier?: "reader" | "slices" | "enterprise";
  amount?: number;
  productName?: string;
};

const TIER_DEFAULTS: Record<string, { amount: number; name: string }> = {
  reader: { amount: 29, name: "Triad — Reader" },
  slices: { amount: 199, name: "Triad — Custom-slices" },
  enterprise: { amount: 1499, name: "Triad — Enterprise pilot" }
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as CheckoutBody;
  const tier = body.tier ?? "reader";
  const tierDefaults = TIER_DEFAULTS[tier] ?? TIER_DEFAULTS.reader;
  const amount = typeof body.amount === "number" && body.amount > 0 ? body.amount : tierDefaults.amount;
  const productName = body.productName?.trim().length ? body.productName.trim() : tierDefaults.name;
  const baseUrl = appUrlFromRequest(request);
  const orderId = `triad_${tier}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

  try {
    const apiKey = requiredEnv("NOWPAYMENTS_API_KEY");
    const response = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey
      },
      body: JSON.stringify({
        price_amount: amount,
        price_currency: "usd",
        ipn_callback_url: `${baseUrl}/api/webhooks/nowpayments`,
        order_id: orderId,
        order_description: productName,
        success_url: `${baseUrl}/?order=${orderId}&status=success`,
        cancel_url: `${baseUrl}/?order=${orderId}&status=cancelled`,
        is_fixed_rate: false,
        is_fee_paid_by_user: false
      })
    });

    if (!response.ok) {
      const text = await response.text();
      // [TRIAD_CHECKOUT_NOWP] upstream error — surface to caller without leaking key
      return NextResponse.json(
        {
          mode: "error",
          orderId,
          message: `NOWPayments returned ${response.status}: ${text.slice(0, 240)}`
        },
        { status: 502 }
      );
    }

    const data = (await response.json()) as Record<string, unknown>;
    const checkoutUrl = String(data.invoice_url ?? data.payment_url ?? "");
    if (!checkoutUrl) {
      return NextResponse.json(
        {
          mode: "error",
          orderId,
          message: "NOWPayments returned no invoice_url; check API key and merchant configuration."
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      mode: "live",
      orderId,
      tier,
      amount,
      productName,
      checkoutUrl,
      providerReference: String(data.id ?? data.payment_id ?? ""),
      message: "NOWPayments hosted invoice created."
    });
  } catch (error) {
    if (error instanceof MissingEnvError) {
      // [TRIAD_CHECKOUT_NOWP] missing env — return a soft mock so the landing
      // does not 500 in preview environments. Production always has the key.
      const mock = optionalEnv("NEXT_PUBLIC_APP_URL") ?? baseUrl;
      return NextResponse.json({
        mode: "mock",
        orderId,
        tier,
        amount,
        productName,
        checkoutUrl: `${mock}/?order=${orderId}&status=mock`,
        message: "Mock checkout — NOWPAYMENTS_API_KEY is not configured in this environment."
      });
    }
    return NextResponse.json(
      { mode: "error", orderId, message: (error as Error).message },
      { status: 500 }
    );
  }
}
