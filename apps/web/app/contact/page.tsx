import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { InquiryForm } from "@/components/inquiry-form";
import { inquiryOptions } from "@/lib/inquiry-options";
import { trackProps } from "@/lib/analytics";
import { auditBookingHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Discuss Your Project",
  description: "Tell Fast Forward Labs about your automation, AI training, content system, or advisory needs. Send a project inquiry or book an AI audit call.",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string | string[] }> }) {
  const { service } = await searchParams;
  const initialService = inquiryOptions.find((option) => option.value === service)?.value || "general";
  return (
    <div className="site-shell grid gap-10 py-12 md:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
      <div className="space-y-6">
        <p className="eyebrow">Let’s talk about your project</p>
        <h1 className="text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.98] font-semibold tracking-[-0.055em]">What would you like to change?</h1>
        <p className="max-w-lg text-lg leading-8 text-muted">Tell us what you have in mind for your operations, content, or team. We’ll get back to you to discuss the right scope and next steps.</p>
        <div className="mt-8 border-t border-line pt-7"><h2 className="text-xl font-medium">Looking for an AI audit call?</h2><p className="mt-3 text-sm leading-7 text-muted">You can choose a time directly in our calendar.</p><Link href={auditBookingHref("contact")} {...trackProps("cta", "contact", "audit_booking")} className="mt-3 inline-flex min-h-11 items-center gap-3 border-b border-accent text-sm font-medium">Book an AI audit call <ArrowUpRight aria-hidden="true" className="size-4" /></Link></div>
      </div>
      <InquiryForm initialService={initialService} />
    </div>
  );
}
