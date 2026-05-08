"use client";

/**
 * [TRIAD_BUY] Client button that POSTs to /api/checkout/nowpayments with the
 * tier key and price; redirects to the NOWPayments hosted invoice on success.
 * Falls back to a `mailto:` for the Enterprise tier.
 */

import { useState } from "react";

type Props = {
  tierKey: "reader" | "slices" | "enterprise";
  amount: number;
  productName: string;
  label: string;
  variant?: "solid" | "ghost";
};

export function BuyButton({ tierKey, amount, productName, label, variant = "solid" }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const className = variant === "ghost" ? "btn-ghost" : "btn";

  if (tierKey === "enterprise") {
    return (
      <a
        className={className}
        href="mailto:founder@prin7r.com?subject=Triad%20Enterprise%20pilot&body=Org%3A%20%0AReports%20cadence%3A%20%0AThree%20sample%20slice%20questions%3A%20%0A1.%20%0A2.%20%0A3."
        style={{ width: "100%" }}
      >
        {label}
        <span aria-hidden="true" style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12 }}>↗</span>
      </a>
    );
  }

  async function onClick() {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch("/api/checkout/nowpayments", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tier: tierKey, amount, productName })
      });
      if (!r.ok) {
        const txt = await r.text();
        throw new Error(`Checkout failed (${r.status}): ${txt.slice(0, 160)}`);
      }
      const data = (await r.json()) as { mode?: string; checkoutUrl?: string; message?: string };
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      setError(data.message ?? "Checkout responded without a redirect URL.");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ width: "100%" }}>
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className={className}
        style={{ width: "100%" }}
        aria-busy={loading}
      >
        {loading ? "Opening NOWPayments…" : label}
        {!loading && (
          <span aria-hidden="true" style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12 }}>→</span>
        )}
      </button>
      {error && (
        <p
          role="alert"
          style={{
            marginTop: 10,
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: 11.5,
            color: "var(--cinnabar)"
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
