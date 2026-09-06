"use client";

import * as React from "react";

const subscribe = () => () => {};

/**
 * Reading progress. Where CSS scroll-driven animations exist the bar is pure
 * CSS and no scroll listener is ever attached; the JS path is the fallback.
 */
export function ScrollProgress() {
  const supported = React.useSyncExternalStore(
    subscribe,
    () =>
      typeof CSS !== "undefined" && CSS.supports("animation-timeline: scroll()"),
    // Assume support on the server so the markup starts on the CSS path.
    () => true,
  );

  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (supported) return;

    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    }

    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [supported]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-100 h-px"
    >
      <div
        className="h-full origin-left bg-accent"
        style={
          supported
            ? { animation: "grow linear", animationTimeline: "scroll()" }
            : { transform: `scaleX(${progress})` }
        }
      />
      <style>{`@keyframes grow { from { transform: scaleX(0) } to { transform: scaleX(1) } }`}</style>
    </div>
  );
}
