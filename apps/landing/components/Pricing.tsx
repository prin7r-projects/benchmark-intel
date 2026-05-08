/**
 * [TRIAD_PRICING] Three-tier pricing block. NOWPayments CTA on Reader and
 * Custom-slices; mailto Enterprise CTA. Featured tier is Custom-slices.
 */

import { tiers } from "@/lib/data";
import { BuyButton } from "@/components/BuyButton";

export function Pricing() {
  return (
    <section id="pricing" className="section">
      <div className="mx-auto max-w-prose px-6 md:px-10 py-14 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <div>
            <span className="kicker">FIG. 05 · PRICING · CRYPTO RAILS · NAMED-PAYER</span>
            <h2
              style={{
                fontFamily: '"IBM Plex Serif", serif',
                fontWeight: 600,
                fontSize: 38,
                lineHeight: 1.05,
                letterSpacing: "-0.014em",
                marginTop: 8,
                maxWidth: 780
              }}
            >
              Three tiers. NOWPayments crypto rails for individual buyers; wire or USDT for enterprise.
            </h2>
          </div>
          <span className="kicker">All amounts USD</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {tiers.map((t) => (
            <article className={`tier ${t.tierKey === "slices" ? "featured" : ""}`} key={t.tierKey}>
              {t.badge && <span className="tier-badge">{t.badge}</span>}
              <span className="tier-num">Tier {t.num}</span>
              <h3 className="tier-name">{t.name}</h3>
              <p className="tier-blurb">{t.blurb}</p>
              <div className="tier-price">
                {t.price}
                <span className="cycle">{t.cycle}</span>
              </div>
              <ul className="tier-features">
                {t.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div style={{ marginTop: "auto" }}>
                <BuyButton
                  tierKey={t.tierKey}
                  amount={t.amount}
                  productName={`Triad — ${t.name}`}
                  label={t.cta}
                  variant={t.tierKey === "slices" ? "solid" : t.tierKey === "reader" ? "solid" : "ghost"}
                />
                {t.tierKey !== "enterprise" && (
                  <p
                    style={{
                      marginTop: 10,
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: 11,
                      color: "var(--muted)",
                      letterSpacing: "0.04em"
                    }}
                  >
                    Pay in USDT, USDC, or with a credit card on the NOWPayments hosted page.
                  </p>
                )}
                {t.tierKey === "enterprise" && (
                  <p
                    style={{
                      marginTop: 10,
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: 11,
                      color: "var(--muted)",
                      letterSpacing: "0.04em"
                    }}
                  >
                    Reply received within 48h with a single-tenant pilot URL.
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
