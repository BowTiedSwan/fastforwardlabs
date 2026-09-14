import Link from "next/link";
import Image from "next/image";

import { trackProps } from "@/lib/analytics";
import { services } from "@/lib/services";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="site-shell grid gap-8 py-10 text-sm text-muted sm:grid-cols-2">
        <div className="space-y-3">
          <Link href="/" className="inline-flex min-h-11 items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-foreground">
            <Image src="/logo.svg" alt="" width={36} height={24} className="h-auto w-9 shrink-0" />
            <span>Fast Forward Labs</span>
          </Link>
          <p>Practical AI advice. Working systems. Capable teams.</p>
          <p className="text-xs">© {new Date().getFullYear()} Fast Forward Labs</p>
          <Link href="/contact" {...trackProps("cta", "footer", "contact")} className="inline-flex min-h-11 items-center border-b border-accent text-foreground">
            Discuss your project
          </Link>
        </div>
        <nav aria-label="Service navigation" className="grid gap-x-6 sm:grid-cols-2">
          {services.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} {...trackProps("service", "footer", service.slug)} className="inline-flex min-h-11 items-center hover:text-foreground">
              {service.name}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
