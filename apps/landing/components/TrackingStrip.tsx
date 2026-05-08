/**
 * [TRIAD_TRACKING] Black ticker strip beneath the hero.
 * Shows covered counts in mono caps; styled to read like a print masthead
 * stripe rather than a dashboard ticker. No animation.
 */

import { trackingStats } from "@/lib/data";

export function TrackingStrip() {
  return (
    <div className="tracking-strip" role="status" aria-label="Triad coverage statistics">
      <div className="mx-auto max-w-prose px-6 md:px-10">
        <div className="tracking-strip-inner flex-wrap">
          <span>Tracking</span>
          <span><b>{trackingStats.llms}</b> LLMs</span>
          <span><b>{trackingStats.agents}</b> agents</span>
          <span><b>{trackingStats.harnesses}</b> harnesses</span>
          <span><b>{trackingStats.sources}</b> sources</span>
          <span>Updated hourly</span>
          <span>No vendor sponsorship</span>
        </div>
      </div>
    </div>
  );
}
