import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="[font-family:var(--font-playfair)] text-ink-text text-[1.5rem] font-bold not-italic mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="[font-family:var(--font-playfair)] text-ink-text text-[1.2rem] font-semibold not-italic mt-8 mb-3">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-ink-text leading-[1.9] mb-6 text-[1.0625rem]">{children}</p>
    ),
    strong: ({ children }) => (
      <strong className="text-ink-text font-semibold">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="text-ink-warm italic">{children}</em>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-ink-warm hover:text-ink-text underline underline-offset-2 transition-colors"
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-ink-gold-dim pl-6 my-6 text-ink-warm italic">
        {children}
      </blockquote>
    ),
    hr: () => (
      <hr className="border-none h-px bg-gradient-to-r from-transparent via-[rgba(180,140,80,0.3)] to-transparent my-10" />
    ),
    ...components,
  };
}
