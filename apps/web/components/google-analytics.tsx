import { Suspense } from "react";
import Script from "next/script";

import { AnalyticsBeacons } from "@/components/analytics-beacons";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";

const ID = GA_MEASUREMENT_ID;

/**
 * Load gtag as early as possible. beforeInteractive puts the stub in the
 * initial HTML so collect isn't dependent on Next's after-hydration injection.
 */
export function GoogleAnalytics() {
  if (!ID) return null;
  return (
    <>
      <Script id="ga4-stub" strategy="afterInteractive">{`
        window.dataLayer=window.dataLayer||[];
        window.gtag=function(){window.dataLayer.push(arguments);};
        window.gtag('js',new Date());
        window.gtag('config','${ID}',{anonymize_ip:true,send_page_view:true});
      `}</Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ID}`}
        strategy="afterInteractive"
      />
      <Suspense fallback={null}>
        <AnalyticsBeacons />
      </Suspense>
    </>
  );
}
