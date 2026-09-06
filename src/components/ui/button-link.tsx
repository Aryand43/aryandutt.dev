import type { ComponentPropsWithoutRef } from "react";
import { Link } from "next-view-transitions";

type Variant = "primary" | "secondary" | "ghost";

const VARIANTS: Record<Variant, string> = {
  primary:
    "border-accent/40 bg-accent/10 text-accent hover:border-accent/70 hover:bg-accent/15",
  secondary: "border-line bg-raise text-ink hover:border-ink-faint",
  ghost: "border-transparent text-ink-muted hover:text-ink",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors [&_svg]:size-4 [&_svg]:shrink-0";

export function ButtonLink({
  href,
  variant = "secondary",
  external,
  className = "",
  children,
  ...props
}: {
  href: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<"a">, "href">) {
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`;

  if (external || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noreferrer noopener" }
          : {})}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
