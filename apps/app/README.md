# apps/app — Triad authenticated reader app (Wave 3)

Wave 2 batch 1 ships the landing only. The authenticated reader app — scoreboard browser, digest archive search, custom-slice request form, API key issuance — is scoped for Wave 3.

When implemented, this folder will host an open-saas (Wasp) fork:

- Auth: email + magic link, plus invited-team seats for the Custom-slices tier.
- Reader entitlement: NOWPayments order id → entitlement granted via the IPN webhook in `apps/landing/app/api/webhooks/nowpayments/route.ts`.
- Custom-slice request: form submission → ticket queue → 24h SLA delivery as PDF + CSV.
- API key issuance: per-org rotating keys; quota tracked against the canonical scoreboard query layer.

See `/docs/02-architecture.md` for the full Wave 3 architecture.
