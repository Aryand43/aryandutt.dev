import { Link } from "next-view-transitions";

/** `01 / SELECTED WORK` with an optional trailing link. */
export function SectionHeader({
  index,
  title,
  action,
}: {
  index: string;
  title: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-line-soft pb-4">
      <h2 className="label">
        <span className="text-ink-muted">{index}</span>
        <span className="mx-2 text-line">/</span>
        <span>{title}</span>
      </h2>
      {action ? (
        <Link
          href={action.href}
          className="shrink-0 text-sm text-ink-muted transition-colors hover:text-accent"
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}
