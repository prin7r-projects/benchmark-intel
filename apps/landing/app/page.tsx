/**
 * [TRIAD_PAGE] The single landing route. Wave 2 batch 1 ships only the
 * marketing surface; the authenticated reader app and custom-slice API are
 * documented in /docs/02-architecture.md but not implemented in this batch.
 */

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrackingStrip } from "@/components/TrackingStrip";
import { Scoreboard } from "@/components/Scoreboard";
import { CoverageTriad } from "@/components/CoverageTriad";
import { Methodology } from "@/components/Methodology";
import { DigestPreview } from "@/components/DigestPreview";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <TrackingStrip />
        <Scoreboard />
        <CoverageTriad />
        <Methodology />
        <DigestPreview />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
