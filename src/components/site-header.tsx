import { Link } from "next-view-transitions";

import { navItems, siteConfig } from "@/lib/site";

/**
 * Server component. The mobile menu is a native <details> element, so the
 * whole header ships without a byte of client JS.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-sm font-medium tracking-tight transition-colors hover:text-accent"
        >
          {siteConfig.name}
        </Link>

        <nav aria-label="Main" className="hidden gap-7 sm:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <details className="group relative sm:hidden">
          <summary className="flex size-8 cursor-pointer list-none items-center justify-center rounded-lg text-muted transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Toggle menu</span>
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              className="size-4 fill-none stroke-current stroke-[1.5]"
            >
              <path d="M2 4.5h12M2 11.5h12" strokeLinecap="round" />
            </svg>
          </summary>
          <nav
            aria-label="Mobile"
            className="absolute right-0 top-10 flex w-44 flex-col rounded-lg border border-line bg-surface p-1.5"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-background hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
