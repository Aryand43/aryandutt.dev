export function PageIntro({
  index,
  title,
  description,
  children,
}: {
  index: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b border-line-soft pt-16 pb-12">
      <p className="label animate-fade">
        <span className="text-ink-muted">{index}</span>
        <span className="mx-2 text-line">/</span>
        <span>{title.toUpperCase()}</span>
      </p>
      <h1 className="animate-rise mt-5 max-w-3xl text-balance text-display font-medium">
        {title}
      </h1>
      <p
        className="animate-rise mt-5 max-w-2xl text-pretty text-lead text-ink-muted"
        style={{ animationDelay: "60ms" }}
      >
        {description}
      </p>
      {children ? <div className="mt-8">{children}</div> : null}
    </header>
  );
}
