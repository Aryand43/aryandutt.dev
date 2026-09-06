"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import type { SearchEntry } from "@/lib/search";

const GROUP_ORDER: SearchEntry["group"][] = [
  "Pages",
  "Work",
  "Experience",
  "Writing",
];

function score(entry: SearchEntry, query: string): boolean {
  if (!query) return true;
  const haystack = `${entry.title} ${entry.subtitle} ${entry.keywords}`.toLowerCase();
  // Every whitespace-separated term must appear somewhere in the entry.
  return query
    .toLowerCase()
    .split(/\s+/u)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export function CommandPalette({
  entries,
  open,
  onClose,
}: {
  entries: SearchEntry[];
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const previouslyFocused = React.useRef<HTMLElement | null>(null);

  const results = React.useMemo(
    () => entries.filter((entry) => score(entry, query)),
    [entries, query],
  );

  const grouped = React.useMemo(
    () =>
      GROUP_ORDER.map((group) => ({
        group,
        items: results.filter((entry) => entry.group === group),
      })).filter((section) => section.items.length > 0),
    [results],
  );

  // Flattened in render order so arrow keys move through what is on screen.
  const flat = React.useMemo(
    () => grouped.flatMap((section) => section.items),
    [grouped],
  );

  React.useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
      previouslyFocused.current?.focus();
    };
  }, [open]);

  const go = React.useCallback(
    (entry: SearchEntry | undefined) => {
      if (!entry) return;
      onClose();
      router.push(entry.href);
    },
    [onClose, router],
  );

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => (flat.length ? (index + 1) % flat.length : 0));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) =>
        flat.length ? (index - 1 + flat.length) % flat.length : 0,
      );
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      go(flat[active]);
      return;
    }
    // Keep focus inside the dialog: it only ever holds the input.
    if (event.key === "Tab") event.preventDefault();
  }

  React.useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  let cursor = -1;

  return (
    <div
      className="fixed inset-0 z-100 flex items-start justify-center p-4 pt-[12vh]"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div aria-hidden className="animate-fade fixed inset-0 bg-black/70" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search the site"
        onKeyDown={onKeyDown}
        className="animate-rise relative w-full max-w-xl overflow-hidden rounded-lg border border-line bg-raise shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-line-soft px-4">
          <Search aria-hidden className="size-4 shrink-0 text-ink-faint" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            placeholder="Search projects, experience, writing"
            aria-label="Search projects, experience, and writing"
            aria-controls="command-results"
            className="w-full bg-transparent py-3.5 text-sm text-ink outline-none placeholder:text-ink-faint"
          />
          <kbd className="label hidden shrink-0 rounded border border-line px-1.5 py-0.5 sm:block">
            Esc
          </kbd>
        </div>

        <div
          id="command-results"
          ref={listRef}
          role="listbox"
          aria-label="Results"
          className="max-h-[52vh] overflow-y-auto py-2"
        >
          {grouped.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-ink-faint">
              No matches for &ldquo;{query}&rdquo;.
            </p>
          ) : (
            grouped.map((section) => (
              <div key={section.group} className="px-2 py-1">
                <p className="label px-2 py-1.5">{section.group}</p>
                {section.items.map((entry) => {
                  cursor += 1;
                  const isActive = cursor === active;

                  return (
                    <button
                      key={entry.id}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      data-active={isActive}
                      tabIndex={-1}
                      onMouseMove={() => setActive(flat.indexOf(entry))}
                      onClick={() => go(entry)}
                      className={`flex w-full flex-col items-start gap-0.5 rounded px-2 py-2 text-left transition-colors ${
                        isActive ? "bg-base" : ""
                      }`}
                    >
                      <span
                        className={`text-sm ${isActive ? "text-accent" : "text-ink"}`}
                      >
                        {entry.title}
                      </span>
                      <span className="line-clamp-1 text-xs text-ink-faint">
                        {entry.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
