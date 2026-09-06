import { ButtonLink } from "@/components/ui/button-link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-5xl flex-col justify-center px-6 py-20">
      <p className="label">404 / NOT FOUND</p>
      <h1 className="mt-5 text-display font-medium">This page does not exist.</h1>
      <p className="mt-5 max-w-md text-pretty leading-relaxed text-ink-muted">
        The link may be out of date, or the page may have moved. Press{" "}
        <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-xs">
          ⌘K
        </kbd>{" "}
        to search the site.
      </p>
      <div className="mt-8 flex flex-wrap gap-2.5">
        <ButtonLink href="/" variant="primary">
          Back home
        </ButtonLink>
        <ButtonLink href="/work">Selected work</ButtonLink>
      </div>
    </div>
  );
}
