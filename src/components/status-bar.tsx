import { siteConfig } from "@/lib/site";

const formatted = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date(siteConfig.lastUpdated));

/**
 * Editorial status strip. Static metadata rendered at build time, deliberately
 * not styled to imply a live telemetry feed.
 */
export function StatusBar() {
  return (
    <div className="border-b border-line-soft bg-sunken/60">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-2.5">
        <p className="label text-ink-muted">
          {siteConfig.name} / {siteConfig.location.toUpperCase()}
        </p>
        <p className="label hidden sm:block">{siteConfig.role}</p>
        <p className="label ml-auto flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block size-1.5 rounded-full bg-accent"
          />
          Available for research and engineering opportunities
        </p>
        <p className="label hidden lg:block">Updated {formatted}</p>
      </div>
    </div>
  );
}
