"use client";

import * as React from "react";
import dynamic from "next/dynamic";

import { GlobeFallback } from "./globe-fallback";
import { locations, plottedRoleCount, type GlobeLocation } from "@/lib/data/locations";

/**
 * The WebGL scene is code-split and never server rendered, so Three.js stays
 * out of the initial bundle entirely and the hero text paints first.
 */
const GlobeScene = dynamic(() => import("./globe-scene"), {
  ssr: false,
  loading: () => <GlobeFallback />,
});

type Capability = "pending" | "full" | "static";

function detectCapability(): Capability {
  if (typeof window === "undefined") return "pending";

  // Small viewports and low-core devices get the static projection: the 3D
  // scene is the first thing worth dropping on a phone.
  const small = window.matchMedia("(max-width: 900px)").matches;
  const lowCore =
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency <= 4;

  if (small || lowCore) return "static";

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    return gl ? "full" : "static";
  } catch {
    return "static";
  }
}

export function Globe() {
  const [capability, setCapability] = React.useState<Capability>("pending");
  const [active, setActive] = React.useState<GlobeLocation | null>(null);

  const reducedMotion = React.useSyncExternalStore(
    (notify) => {
      if (typeof window === "undefined") return () => {};
      const query = window.matchMedia("(prefers-reduced-motion: reduce)");
      query.addEventListener("change", notify);
      return () => query.removeEventListener("change", notify);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  React.useEffect(() => {
    // Defer past first paint so nothing here blocks the hero, but never wait
    // indefinitely: idle callbacks do not fire in a backgrounded or throttled
    // tab, which would leave the globe stuck on the fallback forever.
    const useIdle = typeof window.requestIdleCallback === "function";

    const handle = useIdle
      ? window.requestIdleCallback(() => setCapability(detectCapability()), {
          timeout: 1200,
        })
      : window.setTimeout(() => setCapability(detectCapability()), 200);

    return () => {
      if (useIdle) {
        window.cancelIdleCallback(handle as number);
      } else {
        window.clearTimeout(handle as number);
      }
    };
  }, []);

  return (
    <div className="relative aspect-square w-full">
      <div className="absolute inset-0">
        {capability === "full" ? (
          <GlobeScene
            animate={!reducedMotion}
            onHover={setActive}
            activeId={active?.id ?? null}
          />
        ) : (
          <GlobeFallback />
        )}
      </div>

      {/* Tooltip lives in the DOM, not the canvas, so it inherits site type. */}
      {active ? (
        <div className="pointer-events-none absolute bottom-0 left-0 max-w-[15rem] rounded-lg border border-line bg-raise/95 p-3 backdrop-blur-sm">
          <p className="text-sm font-medium">{active.name}</p>
          <p className="label mt-0.5">{active.region}</p>
          <ul className="mt-2 space-y-1">
            {active.roles.map((role) => (
              <li key={role.org} className="flex gap-2 text-xs text-ink-muted">
                <span className="truncate">{role.org}</span>
                <span className="ml-auto shrink-0 text-ink-faint">
                  {role.mode}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/*
        The same information in text. Hover is an enhancement here, never the
        only route to the content, and this is what a screen reader announces.
      */}
      <div className="sr-only">
        <h3>Work locations</h3>
        <p>{plottedRoleCount} roles across three cities.</p>
        <ul>
          {locations.map((location) => (
            <li key={location.id}>
              {location.name}:{" "}
              {location.roles
                .map((role) => `${role.org} (${role.mode})`)
                .join(", ")}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
