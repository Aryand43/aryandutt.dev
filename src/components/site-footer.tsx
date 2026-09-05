import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line/80">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-subtle">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <div className="flex gap-6">
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            Email
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
