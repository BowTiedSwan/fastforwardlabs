import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { trackProps } from "@/lib/analytics";
import { introBookingHref } from "@/lib/site";

export function IntroCta() {
  return (
    <section id="intro-call" className="grid gap-8 border border-line bg-panel p-6 sm:p-9 md:grid-cols-[1.2fr_0.8fr] md:p-12">
      <div className="space-y-5">
        <p className="eyebrow">Your next step</p>
        <h2 className="section-heading">Start with the work<br />you want to change.</h2>
        <p className="max-w-xl text-base leading-7 text-muted">Tell us what you’re working on in a 15-minute intro call. We’ll explore where we can help and agree on a useful next step.</p>
      </div>
      <div className="flex flex-col items-start justify-center gap-5 md:border-l md:border-line md:pl-10">
        <Button asChild size="lg"><Link href={introBookingHref("home_intro")} {...trackProps("cta", "home_intro", "intro_booking")}>Book an intro call <ArrowUpRight aria-hidden="true" className="size-4" /></Link></Button>
        <p className="max-w-sm text-sm leading-6 text-muted">Already have a build or training brief? <Link className="underline underline-offset-4 hover:text-foreground" href="/contact" {...trackProps("cta", "home_intro", "contact")}>Send us a project inquiry.</Link></p>
      </div>
    </section>
  );
}
