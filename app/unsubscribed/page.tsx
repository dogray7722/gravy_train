import Link from "next/link";

export default function UnsubscribedPage() {
  return (
    <div
      data-theme="dark"
      className="min-h-screen flex flex-col items-center justify-center p-8 bg-ink-bg text-ink-text [font-family:var(--font-lora)]"
      style={{ backgroundImage: "var(--ink-landing-gradient)" }}
    >
      <span
        className="text-[6rem] leading-none mb-6 select-none"
        style={{ color: "var(--ink-glyph-color)" }}
        aria-hidden="true"
      >
        ✦
      </span>
      <h1 className="[font-family:var(--font-playfair)] text-3xl font-bold text-ink-text text-center mb-4">
        You&apos;re unsubscribed.
      </h1>
      <p className="text-ink-warm italic text-center max-w-xs leading-relaxed mb-8">
        You won&apos;t hear from me again. Safe travels.
      </p>
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 border border-(--ink-border-subscribe) text-ink-warm text-xs tracking-widest uppercase px-6 py-3 no-underline hover:border-ink-warm hover:text-ink-text transition-colors"
      >
        <span aria-hidden="true">✦</span> Back to the blog
      </Link>
    </div>
  );
}
