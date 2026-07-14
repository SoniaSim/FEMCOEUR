import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { JoinTestimonial } from "@/lib/types/sanity";

interface TestimonialsSectionProps {
  testimonials: JoinTestimonial[];
}

// Coins asymétriques variés → galets organiques plutôt que carrés (sans inclinaison).
const SHAPES = [
  "rounded-[2.75rem_1.75rem_2.5rem_2rem]",
  "rounded-[1.75rem_2.75rem_2rem_2.5rem]",
  "rounded-[2.5rem_2rem_2.75rem_1.75rem]",
];

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

export function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  const count = testimonials.length;
  const gridClass =
    count === 1
      ? "max-w-xl mx-auto"
      : count === 2
        ? "sm:grid-cols-2 max-w-4xl mx-auto"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section
      aria-labelledby="testimonials-title"
      className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-16 md:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -left-16 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 bg-primary/10 border border-primary/20">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Elles en parlent
            </span>
          </div>
          <h2
            id="testimonials-title"
            className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground leading-tight"
          >
            Pourquoi elles ont adhéré
          </h2>
          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
        </div>

        <ul className={`mt-14 grid gap-8 ${gridClass}`}>
          {testimonials.map((testimonial, index) => {
            const photoUrl = testimonial.image?.url
              ? `${testimonial.image.url}?w=128&h=128&fit=crop&auto=format`
              : null;
            const shape = SHAPES[index % SHAPES.length];
            return (
              <li key={testimonial._id}>
                <figure
                  className={`relative flex h-full flex-col bg-card p-7 shadow-2xl shadow-primary/10 sm:p-9 ${shape}`}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-7 top-4 select-none font-serif text-7xl leading-none text-primary/15"
                  >
                    &rdquo;
                  </span>
                  <blockquote className="relative flex-1">
                    <p className="text-base leading-relaxed text-foreground/80">
                      {testimonial.content}
                    </p>
                  </blockquote>
                  <figcaption className="mt-7 flex items-center gap-4">
                    <Avatar className="size-16 shadow-md ring-4 ring-white">
                      {photoUrl && (
                        <AvatarImage
                          src={photoUrl}
                          alt=""
                          className="object-cover"
                        />
                      )}
                      <AvatarFallback className="bg-primary/10 text-base font-bold text-primary">
                        {getInitials(testimonial.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <span className="block font-bold text-foreground">
                        {testimonial.name}
                      </span>
                      {testimonial.role && (
                        <span className="block text-sm text-foreground/60">
                          {testimonial.role}
                        </span>
                      )}
                    </div>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
