import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { auditBookingUrl } from "@/lib/site";

const navigation = [
  { href: "/#services", label: "Services" },
  { href: "/#how-we-work", label: "How we work" },
  { href: "/blog", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 md:px-10">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-[0.24em] sm:text-sm sm:tracking-[0.28em]"
        >
          Fast Forward Labs
        </Link>
        <nav aria-label="Main navigation" className="flex w-full flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted sm:w-auto sm:justify-end sm:text-sm md:gap-6">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
          <Link href={auditBookingUrl} className="inline-flex min-h-11 items-center gap-2 border-b border-accent font-medium text-foreground">Book an audit <ArrowUpRight aria-hidden="true" className="size-3.5" /></Link>
        </nav>
      </div>
    </header>
  );
}
