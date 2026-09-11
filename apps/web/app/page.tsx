import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { AuditCta } from "@/components/audit-cta";
import { ContentSystemProof } from "@/components/content-system-proof";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/services";
import { trackProps } from "@/lib/analytics";
import { auditBookingHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Consulting, Automation & Training",
  description: "AI audits, business automation, executive and staff training, and AI content systems. One-time builds or ongoing support from Fast Forward Labs.",
};

const process = [
  { title: "Find the opportunity.", text: "Start with your goals and the work getting in the way. Choose a useful first step with a clear outcome." },
  { title: "Build the capability.", text: "Get a working system, a practical roadmap, or hands-on training shaped around your business." },
  { title: "Choose what comes next.", text: "Take the handover and run it with your team, or keep us involved for support, improvements, and AI leadership." },
];

export default function HomePage() {
  return (
    <div className="site-shell space-y-20 pb-16 sm:space-y-24 md:pb-24">
      <section className="grid gap-10 border-b border-line pt-12 pb-12 sm:pt-16 md:pb-16 lg:grid-cols-[1.7fr_0.7fr] lg:gap-16 lg:pt-20">
        <div className="space-y-7">
          <p className="eyebrow flex items-center gap-3"><span className="size-2 bg-accent" aria-hidden="true" />AI consulting & implementation</p>
          <h1 className="max-w-4xl text-[clamp(3.25rem,8vw,6.7rem)] leading-[0.96] font-semibold tracking-[-0.065em]">Put AI to work<br />in your business<span className="text-accent">.</span></h1>
          <p className="max-w-2xl text-lg leading-8 text-muted sm:text-xl">Find the right opportunities, automate the busywork, and give your team the skills to use AI well. We advise, build, and train, from your first audit call to ongoing AI leadership.</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg"><Link href={auditBookingHref("home_hero")} {...trackProps("cta", "home_hero", "audit_booking")}>Book an AI audit call <ArrowUpRight aria-hidden="true" className="size-4" /></Link></Button>
            <Button asChild variant="outline" size="lg"><Link href="#services">Explore services <ArrowDown aria-hidden="true" className="size-4" /></Link></Button>
          </div>
        </div>
        <aside className="flex flex-col justify-end border-l-2 border-accent pl-6 lg:mb-1 lg:pl-8">
          <p className="eyebrow mb-5">Sound familiar?</p>
          <p className="text-2xl leading-snug font-medium tracking-[-0.035em]">You’ve tried the tools.<br />The work still piles up.</p>
          <p className="mt-5 text-sm leading-7 text-muted">The missed follow-up. The weekly report. The content backlog. We start with the work your business needs to get done and build around it.</p>
          <p className="mt-8 border-t border-line pt-5 font-mono text-[11px] uppercase leading-6 tracking-[0.15em] text-muted">Advice · Implementation · Training</p>
        </aside>
      </section>

      <section id="services" aria-labelledby="services-heading">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="space-y-4"><p className="eyebrow">How we can help</p><h2 id="services-heading" className="section-heading">Four ways to move forward.</h2></div>
          <p className="max-w-xs text-sm leading-6 text-muted">Start where you are. Each engagement is scoped around what you need.</p>
        </div>
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
          {services.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} {...trackProps("service", "home_services", service.slug)} className="group flex flex-col bg-background p-6 transition-colors hover:bg-white/90 sm:p-8 md:p-9">
              <div className="mb-8 flex items-center justify-between"><span className="font-mono text-xs tracking-[0.18em] text-accent">/{service.number}</span><ArrowUpRight aria-hidden="true" className="size-5 text-muted transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div>
              <h3 className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">{service.name}</h3>
              <p className="mt-3 text-base font-medium">{service.prompt}</p>
              <p className="mt-2 mb-7 max-w-md text-sm leading-7 text-muted">{service.summary}</p>
              <p className="mt-auto border-t border-line pt-5 font-mono text-[10px] leading-5 uppercase tracking-[0.1em] text-muted">{service.formats}</p>
            </Link>
          ))}
        </div>
      </section>

      <ContentSystemProof />

      <section id="how-we-work" aria-labelledby="process-heading">
        <div className="mb-10 grid gap-5 md:grid-cols-2"><div className="space-y-4"><p className="eyebrow">How we work</p><h2 id="process-heading" className="section-heading">A clear scope.<br />A useful outcome.</h2></div><p className="max-w-lg self-end text-base leading-8 text-muted">You may need a single workflow built, a team workshop, or an AI partner at the leadership table. We agree on the deliverables, responsibilities, and cost before the work begins.</p></div>
        <ol className="grid border-t border-line md:grid-cols-3">{process.map((step, index) => <li key={step.title} className="border-b border-line py-7 md:pr-8"><p className="mb-6 font-mono text-xs text-accent">0{index + 1}</p><h3 className="mb-3 text-xl font-medium tracking-[-0.03em]">{step.title}</h3><p className="max-w-sm text-sm leading-7 text-muted">{step.text}</p></li>)}</ol>
      </section>
      <AuditCta />
    </div>
  );
}
