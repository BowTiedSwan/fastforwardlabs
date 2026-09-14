import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { trackProps } from "@/lib/analytics";
import { introBookingHref } from "@/lib/site";

const navigation = [
  { href: "/#services", label: "Services" },
  { href: "/#how-we-work", label: "How we work" },
  // { href: "/blog", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between md:px-10">
        <Link
          href="/"
          className="inline-flex min-h-11 shrink-0 items-center gap-3 whitespace-nowrap font-mono text-xs uppercase tracking-[0.24em] sm:text-sm sm:tracking-[0.28em]"
        >
          <Image src="/logo.svg" alt="" width={36} height={24} className="h-auto w-9 shrink-0 dark:invert" />
          <span>Fast Forward Labs</span>
        </Link>
        <nav aria-label="Main navigation" className="flex w-full flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted sm:text-sm md:w-auto md:justify-end md:gap-6">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
          <Link href={introBookingHref("header")} {...trackProps("cta", "header", "intro_booking")} className="inline-flex min-h-11 items-center gap-2 border-b border-accent font-medium text-foreground">Book an intro call <ArrowUpRight aria-hidden="true" className="size-3.5" /></Link>
        </nav>
      </div>
    </header>
  );
}
