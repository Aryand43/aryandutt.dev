export function PageIntro({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="border-b border-line/80 pt-20 pb-14 sm:pt-24">
      <h1 className="animate-rise text-title text-balance font-medium">{title}</h1>
      <p
        className="animate-rise mt-5 max-w-xl text-pretty leading-relaxed text-muted"
        style={{ animationDelay: "80ms" }}
      >
        {description}
      </p>
    </header>
  );
}
