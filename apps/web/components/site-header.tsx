import Link from "next/link";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/strategy", label: "Strategy" },
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
        <nav className="flex w-full flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted sm:w-auto sm:justify-end sm:text-sm md:gap-6">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
