import { Badge } from "@/components/ui/badge";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import type { Experience } from "@/lib/data/experience";

const kindLabel: Record<Experience["kind"], string> = {
  research: "Research",
  engineering: "Engineering",
  service: "National Service",
};

export function Timeline({ items }: { items: Experience[] }) {
  return (
    <Stagger as="ol" className="relative space-y-10" gap={0.06}>
      {/* The rail sits behind the markers and stops at the last entry. */}
      <span
        aria-hidden
        className="absolute left-[7px] top-2 -z-10 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary/50 via-border to-transparent"
      />

      {items.map((item) => (
        <StaggerItem as="li" key={item.slug} className="relative pl-8">
          <span
            aria-hidden
            className="absolute left-0 top-1.5 size-[15px] rounded-full border-2 border-primary bg-background"
          />

          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-lg font-semibold tracking-tight">
              {item.role}
            </h3>
            <p className="font-mono text-xs text-muted-foreground">
              {item.period}
            </p>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <span className="font-medium text-primary">{item.company}</span>
            <span className="text-muted-foreground">{item.location}</span>
            <Badge variant="outline" className="font-mono text-[10px]">
              {kindLabel[item.kind]}
            </Badge>
          </div>

          <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
            {item.summary}
          </p>

          <ul className="mt-3 space-y-1.5">
            {item.highlights.map((highlight) => (
              <li
                key={highlight}
                className="relative pl-4 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-[0.6em] before:size-1 before:rounded-full before:bg-primary/60"
              >
                {highlight}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
