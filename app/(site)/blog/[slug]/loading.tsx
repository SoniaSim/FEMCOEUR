export default function ArticleLoading() {
  return (
    <>
      {/* Header skeleton */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary/10 via-primary/5 to-background">
        <div className="container py-10 md:py-14">
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="h-4 w-32 bg-foreground/10 rounded mb-8" />
            <div className="h-6 w-24 bg-primary/20 rounded-full mb-5" />
            <div className="h-10 md:h-14 w-full bg-foreground/15 rounded mb-3" />
            <div className="h-10 md:h-14 w-2/3 bg-foreground/15 rounded mb-6" />
            <div className="pt-4 border-t border-primary/15 flex gap-4">
              <div className="h-4 w-32 bg-foreground/10 rounded" />
              <div className="h-4 w-32 bg-foreground/10 rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* Image skeleton */}
      <section className="bg-background -mt-1">
        <div className="container">
          <div className="max-w-4xl mx-auto -translate-y-12 md:-translate-y-16">
            <div className="h-64 md:h-96 lg:h-[480px] w-full rounded-3xl bg-foreground/5 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Body skeleton */}
      <section className="bg-background -mt-12 md:-mt-16 pb-16 md:pb-24">
        <div className="container">
          <article className="max-w-3xl mx-auto animate-pulse space-y-4">
            <div className="h-4 w-full bg-foreground/10 rounded" />
            <div className="h-4 w-full bg-foreground/10 rounded" />
            <div className="h-4 w-5/6 bg-foreground/10 rounded" />
            <div className="h-4 w-full bg-foreground/10 rounded" />
            <div className="h-4 w-3/4 bg-foreground/10 rounded" />
          </article>
        </div>
      </section>
    </>
  );
}
