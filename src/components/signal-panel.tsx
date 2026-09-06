import { signals } from "@/lib/site";

/** Dense, factual key/value panel. Information first, ornament never. */
export function SignalPanel() {
  return (
    <dl className="grid grid-cols-1 border-t border-line-soft sm:grid-cols-2 lg:grid-cols-3">
      {signals.map((signal) => (
        <div
          key={signal.label}
          className="border-b border-line-soft px-5 py-5 sm:odd:border-r lg:odd:border-r-0 lg:[&:not(:nth-child(3n))]:border-r"
        >
          <dt className="label">{signal.label}</dt>
          <dd className="mt-2 text-pretty text-sm leading-relaxed text-ink">
            {signal.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
