import { Link } from "next-view-transitions";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-6">
      <p className="font-mono text-xs tracking-widest text-subtle uppercase">404</p>
      <h1 className="mt-4 text-title font-medium">This page does not exist.</h1>
      <p className="mt-4 max-w-md text-pretty text-muted">
        The link may be out of date, or the page may have moved.
      </p>
      <Link
        href="/"
        className="mt-8 w-fit rounded-lg border border-line bg-surface px-4 py-2 text-sm transition-colors hover:border-accent/50"
      >
        Back home
      </Link>
    </div>
  );
}
