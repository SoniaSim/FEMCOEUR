import type { HomeKeyStat } from "@/lib/types/sanity";

interface KeyStatsSectionProps {
  stats: HomeKeyStat[];
  eyebrow: string;
  title: string;
}

// Typo FR : espace fine insécable (U+202F) avant %, : ; ! ? — « 56 % » ne casse jamais.
function frTypo(text: string): string {
  return text.replace(/ ([%:;!?])/g, " $1");
}

export function KeyStatsSection({
  stats,
  eyebrow,
  title,
}: KeyStatsSectionProps) {
  const count = stats.length;
  const gridClass =
    count >= 5
      ? "grid-cols-2 lg:grid-cols-5"
      : count === 4
        ? "grid-cols-2 lg:grid-cols-4"
        : count === 3
          ? "grid-cols-1 sm:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2";
  // Séparateur vertical seulement quand les stats tiennent sur une seule rangée :
  // 4-5 stats n'y passent qu'à partir de lg (2 colonnes avant), 2-3 stats dès sm.
  const dividerBreakpoint = count >= 4 ? "lg:border-l" : "sm:border-l";
  const valueSizeClass =
    count >= 5
      ? "text-4xl sm:text-6xl lg:text-4xl xl:text-5xl"
      : "text-4xl sm:text-6xl";

  return (
    <section
      aria-labelledby="key-stats-title"
      className="bg-secondary py-16 md:py-24"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 bg-primary/15 border border-primary/30">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {eyebrow}
            </span>
          </div>
          <h2
            id="key-stats-title"
            className="text-2xl sm:text-3xl md:text-4xl font-black text-secondary-foreground leading-tight"
          >
            {title}
          </h2>
          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
        </div>

        <ul className={`mt-14 grid gap-x-4 gap-y-12 ${gridClass}`}>
          {stats.map((stat, index) => (
            <li
              key={stat._key}
              className={`flex flex-col items-center gap-3 px-4 text-center sm:px-6 ${
                index > 0 ? `border-white/12 ${dividerBreakpoint}` : ""
              } ${
                count === 5 && index === 4 ? "col-span-2 lg:col-span-1" : ""
              }`}
            >
              <span
                className={`whitespace-nowrap font-black tracking-tight text-primary ${valueSizeClass}`}
              >
                {frTypo(stat.value)}
              </span>
              <span className="max-w-[15rem] text-sm leading-snug text-secondary-foreground/80 sm:text-base">
                {frTypo(stat.label)}
              </span>
              {stat.sourceLabel &&
                (stat.sourceUrl?.startsWith("http") ? (
                  <a
                    href={stat.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto pt-2 text-[11px] uppercase tracking-wide text-secondary-foreground/40 transition-colors hover:text-secondary-foreground/70"
                  >
                    <span className="sr-only">Source : </span>
                    {frTypo(stat.sourceLabel)}
                  </a>
                ) : (
                  <span className="mt-auto pt-2 text-[11px] uppercase tracking-wide text-secondary-foreground/40">
                    <span className="sr-only">Source : </span>
                    {frTypo(stat.sourceLabel)}
                  </span>
                ))}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
