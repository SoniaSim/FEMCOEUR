import type { PortableTextComponents } from "@portabletext/react";

export const basePortableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-base md:text-lg text-foreground/70 leading-relaxed mb-5 last:mb-0">
        {children}
      </p>
    ),
    center: ({ children }) => (
      <p className="text-base md:text-lg text-foreground/70 leading-relaxed mb-5 last:mb-0 text-center">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl md:text-2xl font-bold text-foreground mt-8 mb-3 first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg md:text-xl font-semibold text-foreground mt-6 mb-2">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-base md:text-lg font-semibold text-foreground mt-4 mb-1">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-5 italic text-foreground/60 my-6">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-primary">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => (
      <span className="underline decoration-primary/50 underline-offset-2">{children}</span>
    ),
    code: ({ children }) => (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        className="text-primary font-medium underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors"
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-none pl-0 mb-5 space-y-3">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-5 space-y-2 text-foreground/70">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-base md:text-lg text-foreground/70 leading-relaxed">
        <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="text-base md:text-lg text-foreground/70 leading-relaxed">{children}</li>
    ),
  },
};
