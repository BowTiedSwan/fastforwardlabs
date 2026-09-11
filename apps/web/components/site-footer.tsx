import Link from "next/link";

import { services } from "@/lib/services";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="site-shell grid gap-8 py-10 text-sm text-muted sm:grid-cols-2">
        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-foreground">
            Fast Forward Labs
          </p>
          <p>Practical AI advice. Working systems. Capable teams.</p>
          <p className="text-xs">© {new Date().getFullYear()} Fast Forward Labs</p>
          <Link href="/contact" className="inline-flex min-h-11 items-center border-b border-accent text-foreground">
            Discuss your project
          </Link>
        </div>
        <nav aria-label="Service navigation" className="grid gap-x-6 sm:grid-cols-2">
          {services.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="inline-flex min-h-11 items-center hover:text-foreground">
              {service.name}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
