import { Link } from "next-view-transitions";

import { navItems, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line-soft">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 sm:grid-cols-[1fr_auto]">
        <div>
          <p className="font-mono text-sm text-ink">{siteConfig.name}</p>
          <p className="mt-2 max-w-xs text-pretty text-sm leading-relaxed text-ink-faint">
            {siteConfig.role}. Low-latency systems, scientific machine learning,
            and LLM evaluation.
          </p>
          <p className="label mt-4">{siteConfig.coordinates}</p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-muted transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm text-ink-muted transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
        </nav>
      </div>

      <div className="mx-auto flex max-w-5xl flex-col gap-2 border-t border-line-soft px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="label">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <p className="label">Built with Next.js and Tailwind</p>
      </div>
    </footer>
  );
}
