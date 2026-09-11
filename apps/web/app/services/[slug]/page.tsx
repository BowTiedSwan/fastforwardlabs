import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";

import { InquiryCta } from "@/components/inquiry-cta";
import { ContentSystemProof } from "@/components/content-system-proof";
import { Button } from "@/components/ui/button";
import { getService, services } from "@/lib/services";
import { trackProps } from "@/lib/analytics";
import { auditBookingHref } from "@/lib/site";

type ServicePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return {
    title: service.slug === "ai-audit-advisory" ? "AI Audit, Advisory & Fractional Chief AI Officer" : service.name,
    description: `${service.summary} ${service.formats}.`,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const isAudit = slug === "ai-audit-advisory";
  const primaryHref = isAudit ? auditBookingHref("service_hero") : `/contact?service=${slug}`;
  const primaryTrack = isAudit ? trackProps("cta", "service_hero", "audit_booking") : trackProps("cta", "service_hero", slug);
  const primaryLabel = isAudit ? "Book an AI audit call" : "Discuss your project";

  return (
    <div className="site-shell space-y-16 pt-8 pb-16 sm:space-y-20 sm:pt-10 md:pb-24">
      <section>
        <Link href="/#services" className="mb-10 inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-foreground"><ArrowLeft aria-hidden="true" className="size-4" /> All services</Link>
        <div className="grid gap-10 lg:grid-cols-[1.6fr_0.8fr] lg:gap-16">
          <div className="space-y-6"><p className="eyebrow"><span className="mr-3 text-accent">/{service.number}</span>{service.name}</p><h1 className="text-[clamp(2.8rem,6.5vw,5.7rem)] leading-[0.98] font-semibold tracking-[-0.06em]">{service.headline}</h1><p className="max-w-2xl text-lg leading-8 text-muted">{service.introduction}</p><div className="flex flex-wrap gap-3 pt-2"><Button asChild size="lg"><Link href={primaryHref} {...primaryTrack}>{primaryLabel}<ArrowUpRight aria-hidden="true" className="size-4" /></Link></Button><Button asChild variant="outline" size="lg"><Link href="#engagements">See engagement options</Link></Button></div></div>
          <aside className="self-end border border-line bg-panel p-6 sm:p-8"><p className="eyebrow mb-4">Who it’s for</p><p className="text-base leading-7">{service.audience}</p><ul className="mt-6 space-y-4 border-t border-line pt-6">{service.outcomes.map((outcome) => <li key={outcome} className="flex gap-3 text-sm leading-6 text-muted"><Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-accent" /><span>{outcome}</span></li>)}</ul></aside>
        </div>
      </section>

      <section id="engagements" aria-labelledby="engagements-heading">
        <div className="mb-8 grid gap-5 md:grid-cols-[1.2fr_0.8fr]"><div className="space-y-4"><p className="eyebrow">Engagement options</p><h2 id="engagements-heading" className="section-heading">Ways to work together.</h2></div><p className="max-w-md self-end text-sm leading-7 text-muted">We agree on scope, timing, fees, and responsibilities before starting. Choose the level of involvement that fits your team.</p></div>
        <div className={`grid gap-5 ${service.tiers.length === 3 ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
          {service.tiers.map((tier, index) => <article key={tier.name} className="flex flex-col border border-line bg-panel p-6 sm:p-8"><p className="eyebrow mb-6"><span className="mr-2 text-accent">0{index + 1}</span>{tier.format}</p><h3 className="text-2xl leading-tight font-semibold tracking-[-0.035em]">{tier.name}</h3><p className="mt-4 mb-6 text-sm leading-7 text-muted">{tier.description}</p><ul className="mt-auto space-y-3 border-t border-line pt-6">{tier.deliverables.map((item) => <li key={item} className="flex gap-3 text-sm leading-6"><Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-accent" /><span>{item}</span></li>)}</ul></article>)}
        </div>
      </section>

      <section aria-labelledby="examples-heading"><p className="eyebrow mb-4">In practice</p><h2 id="examples-heading" className="section-heading max-w-2xl">{service.examplesTitle}</h2><div className="mt-8 grid gap-x-10 sm:grid-cols-2">{service.examples.map((example) => <div key={example.title} className="border-t border-line py-7"><h3 className="mb-3 text-xl font-medium tracking-[-0.025em]">{example.title}</h3><p className="max-w-xl text-sm leading-7 text-muted">{example.description}</p></div>)}</div></section>

      {slug === "ai-content-systems" ? <ContentSystemProof detail /> : null}

      <section aria-labelledby="delivery-heading"><p className="eyebrow mb-4">From first conversation to delivery</p><h2 id="delivery-heading" className="section-heading">How the work happens.</h2><ol className="mt-8 grid border-t border-line md:grid-cols-3">{service.steps.map((step, index) => <li key={step.title} className="border-b border-line py-7 md:pr-8"><p className="mb-5 font-mono text-xs text-accent">0{index + 1}</p><h3 className="mb-3 text-xl font-medium tracking-[-0.025em]">{step.title}</h3><p className="text-sm leading-7 text-muted">{step.description}</p></li>)}</ol></section>

      <section className="grid gap-8 md:grid-cols-[0.7fr_1.3fr]" aria-labelledby="faq-heading"><div className="space-y-4"><p className="eyebrow">A few practical details</p><h2 id="faq-heading" className="section-heading">Before we start.</h2></div><div className="border-t border-line">{service.faqs.map((faq) => <details key={faq.question} className="group border-b border-line"><summary className="cursor-pointer py-5 pr-4 text-base font-medium">{faq.question}</summary><p className="max-w-2xl pb-6 text-sm leading-7 text-muted">{faq.answer}</p></details>)}</div></section>

      {isAudit ? <section id="audit-call" className="border border-line bg-panel p-6 sm:p-10"><p className="eyebrow mb-4">The starting conversation</p><h2 className="section-heading">Bring one problem worth solving.</h2><p className="mt-5 max-w-2xl text-base leading-8 text-muted">Tell us what your business does, the tools you use, and where work gets stuck. We’ll explore the opportunity together and agree on the most useful next step.</p><Button asChild size="lg" className="mt-7"><Link href={auditBookingHref("service_audit")} {...trackProps("cta", "service_audit", "audit_booking")}>Book an AI audit call <ArrowUpRight aria-hidden="true" className="size-4" /></Link></Button><p className="mt-5 text-sm text-muted">For ongoing advisory or fractional leadership, <Link href="/contact?service=ai-audit-advisory" {...trackProps("cta", "service_audit", "contact")} className="underline underline-offset-4">send a project inquiry</Link>.</p></section> : <InquiryCta slug={slug} name={service.name} />}

      <nav aria-label="Other services" className="border-t border-line pt-8"><p className="eyebrow mb-5">Also from Fast Forward Labs</p><div className="grid gap-4 sm:grid-cols-3">{services.filter((other) => other.slug !== slug).map((other) => <Link key={other.slug} href={`/services/${other.slug}`} {...trackProps("service", "service_related", other.slug)} className="flex min-h-14 items-center justify-between gap-3 border border-line p-4 text-sm font-medium transition-colors hover:border-foreground">{other.name}<ArrowUpRight aria-hidden="true" className="size-4 shrink-0" /></Link>)}</div></nav>
    </div>
  );
}
