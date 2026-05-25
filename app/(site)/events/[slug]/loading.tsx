export default function EventLoading() {
  return (
    <>
      {/* Header skeleton */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="container py-10 md:py-14">
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="h-4 w-40 bg-foreground/10 rounded mb-8" />
            <div className="h-6 w-20 bg-primary/20 rounded-full mb-5" />
            <div className="h-10 md:h-14 w-full bg-foreground/15 rounded mb-3" />
            <div className="h-10 md:h-14 w-2/3 bg-foreground/15 rounded mb-6" />
            <div className="pt-4 border-t border-primary/15 flex gap-4">
              <div className="h-7 w-44 bg-foreground/10 rounded" />
              <div className="h-7 w-44 bg-foreground/10 rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* Image skeleton */}
      <section className="bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto -translate-y-12 md:-translate-y-16">
            <div className="h-64 md:h-96 lg:h-[480px] w-full rounded-3xl bg-foreground/5 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Description skeleton */}
      <section className="bg-background -mt-12 md:-mt-16 pb-10 md:pb-14">
        <div className="container">
          <article className="max-w-3xl mx-auto animate-pulse space-y-4">
            <div className="h-4 w-full bg-foreground/10 rounded" />
            <div className="h-4 w-5/6 bg-foreground/10 rounded" />
            <div className="h-4 w-full bg-foreground/10 rounded" />
            <div className="h-4 w-4/5 bg-foreground/10 rounded" />
          </article>
        </div>
      </section>
    </>
  );
}
