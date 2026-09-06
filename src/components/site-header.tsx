import { Link } from "next-view-transitions";

import { CommandMenu } from "@/components/command-menu";
import { buildSearchIndex } from "@/lib/search";
import { navItems, siteConfig } from "@/lib/site";

/**
 * Server component. The mobile menu is a native <details>, so navigation works
 * without JS; only the command menu trigger is interactive.
 */
export function SiteHeader() {
  const entries = buildSearchIndex();

  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-base/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          className="font-mono text-sm tracking-tight text-ink transition-colors hover:text-accent"
        >
          {siteConfig.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CommandMenu entries={entries} />

          <details className="group relative md:hidden">
            <summary className="flex size-8 cursor-pointer list-none items-center justify-center rounded-lg border border-line-soft text-ink-muted transition-colors hover:text-ink [&::-webkit-details-marker]:hidden">
              <span className="sr-only">Toggle navigation menu</span>
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
              className="absolute right-0 top-10 flex w-48 flex-col rounded-lg border border-line bg-raise p-1.5 shadow-xl"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-base hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
