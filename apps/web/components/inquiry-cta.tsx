import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { trackProps } from "@/lib/analytics";

export function InquiryCta({ slug, name }: { slug: string; name: string }) {
  return (
    <section className="grid gap-8 border border-line bg-panel p-6 sm:p-9 md:grid-cols-[1.2fr_0.8fr] md:p-12">
      <div className="space-y-5"><p className="eyebrow">Let’s scope the work</p><h2 className="section-heading">Tell us what you have in mind.</h2><p className="max-w-xl text-base leading-7 text-muted">Talk to us about {name.toLowerCase()}, the outcome you want, and how involved you’d like us to be. We’ll help you find the right engagement.</p></div>
      <div className="flex items-center md:border-l md:border-line md:pl-10"><Button asChild size="lg"><Link href={`/contact?service=${slug}`} {...trackProps("cta", "service_inquiry", slug)}>Discuss your project <ArrowUpRight aria-hidden="true" className="size-4" /></Link></Button></div>
    </section>
  );
}
