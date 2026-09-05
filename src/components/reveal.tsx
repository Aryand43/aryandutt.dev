import type { ReactNode } from "react";

/**
 * Scroll entrance with zero client JS. CSS scroll-driven animations do the
 * work (see `.reveal` in globals.css); browsers without support simply render
 * the content, and reduced-motion users skip the animation entirely.
 */
export function Reveal({ children }: { children: ReactNode }) {
  return <div className="reveal">{children}</div>;
}
