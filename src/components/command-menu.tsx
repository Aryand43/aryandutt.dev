"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Search } from "lucide-react";

import type { SearchEntry } from "@/lib/search";

/**
 * The palette itself is code-split: the trigger is tiny, and the dialog plus
 * its search logic only download once someone actually opens it.
 */
const CommandPalette = dynamic(
  () => import("@/components/command-palette").then((m) => m.CommandPalette),
  { ssr: false },
);

const subscribe = () => () => {};

export function CommandMenu({ entries }: { entries: SearchEntry[] }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Server renders the mac glyph; the client corrects it after hydration
  // without a state write inside an effect.
  const isMac = React.useSyncExternalStore(
    subscribe,
    () => /Mac|iPhone|iPad/u.test(navigator.platform),
    () => true,
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-lg border border-line-soft px-2.5 py-1.5 text-ink-faint transition-colors hover:border-line hover:text-ink"
      >
        <Search aria-hidden className="size-3.5" />
        <span className="sr-only">Search the site</span>
        <kbd
          aria-hidden
          className="hidden font-mono text-[0.6875rem] tracking-wider sm:block"
        >
          {isMac ? "⌘" : "Ctrl "}K
        </kbd>
      </button>

      {open ? (
        <CommandPalette
          entries={entries}
          open={open}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}
