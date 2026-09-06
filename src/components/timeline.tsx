import type { Experience } from "@/lib/data/experience";

const KIND_LABEL: Record<Experience["kind"], string> = {
  research: "Research",
  engineering: "Engineering",
  service: "Service",
};

/** Compact, high-signal preview. The full record lives on /experience. */
export function TimelinePreview({ items }: { items: Experience[] }) {
  return (
    <ol>
      {items.map((role) => (
        <li
          key={role.slug}
          className="grid gap-x-6 gap-y-1 border-b border-line-soft py-5 sm:grid-cols-[8rem_1fr_auto]"
        >
          <p className="label pt-1">{KIND_LABEL[role.kind]}</p>
          <div>
            <p className="font-medium text-ink">{role.company}</p>
            <p className="mt-0.5 text-sm text-ink-muted">{role.role}</p>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-faint">
              {role.impact}
            </p>
          </div>
          <p className="label pt-1 sm:text-right">{role.period}</p>
        </li>
      ))}
    </ol>
  );
}
