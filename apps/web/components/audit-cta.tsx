import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { trackProps } from "@/lib/analytics";
import { auditBookingHref } from "@/lib/site";

export function AuditCta() {
  return (
    <section id="audit" className="grid gap-8 border border-line bg-panel p-6 sm:p-9 md:grid-cols-[1.2fr_0.8fr] md:p-12">
      <div className="space-y-5">
        <p className="eyebrow">Your next step</p>
        <h2 className="section-heading">Start with the work<br />you want to change.</h2>
        <p className="max-w-xl text-base leading-7 text-muted">Bring a bottleneck, an idea, or a question. We’ll look at where AI could help and what a sensible first engagement would look like.</p>
      </div>
      <div className="flex flex-col items-start justify-center gap-5 md:border-l md:border-line md:pl-10">
        <Button asChild size="lg"><Link href={auditBookingHref("home_audit")} {...trackProps("cta", "home_audit", "audit_booking")}>Book an AI audit call <ArrowUpRight aria-hidden="true" className="size-4" /></Link></Button>
        <p className="max-w-sm text-sm leading-6 text-muted">Already have a build or training brief? <Link className="underline underline-offset-4 hover:text-foreground" href="/contact" {...trackProps("cta", "home_audit", "contact")}>Send us a project inquiry.</Link></p>
      </div>
    </section>
  );
}
