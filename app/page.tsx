"use client";

import { useState } from "react";
import Link from "next/link";

export default function LandingInk() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div
      id="main-content"
      data-theme="dark"
      className="relative min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden bg-ink-bg text-ink-text [font-family:var(--font-lora)]"
      style={{ backgroundImage: "var(--ink-landing-gradient)" }}
    >
      {/* Decorative background blobs */}
      <div
        className="absolute -top-[20%] -left-[10%] w-125 h-125 rounded-full pointer-events-none"
        style={{ background: "var(--ink-blob-warm)" }}
      />
      <div
        className="absolute -bottom-[10%] -right-[5%] w-100 h-100 rounded-full pointer-events-none"
        style={{ background: "var(--ink-blob-cool)" }}
      />

      {/* Large decorative glyph */}
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-bold pointer-events-none select-none whitespace-nowrap [font-family:var(--font-playfair)]"
        style={{ color: "var(--ink-glyph-color)" }}
        aria-hidden="true"
      >
        ✦
      </span>

      <h1 className="[font-family:var(--font-playfair)] text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[1.05] text-center text-ink-text m-0 animate-[fadeUp_0.9s_ease_0.1s_both]">
        All Aboard
        <br />
        the <em className="not-italic text-ink-gold">Gravy Train</em>
      </h1>

      <div className="w-20 h-px bg-linear-to-r from-transparent via-ink-gold-dim to-transparent my-7 mx-auto" />

      <p className="text-base italic text-ink-warm text-center max-w-100 leading-[1.8] m-0 animate-[fadeUp_1s_ease_0.2s_both]">
        Taking back my life history from the cess pool that is social media.
        What I create here is from my own mind and my own experience. Everything
        I build here, I own.
      </p>

      <div className="w-20 h-px bg-linear-to-r from-transparent via-ink-gold-dim to-transparent my-7 mx-auto" />

      <div className="flex flex-col items-center gap-5 w-full max-w-95 animate-[fadeUp_1s_ease_0.35s_both]">
        {subscribed ? (
          <p className="italic text-ink-warm text-[0.9rem] text-center">
            <span aria-hidden="true">✦</span> You&apos;re on the list. Thank
            you.
          </p>
        ) : (
          <form
            className="flex w-full border border-(--ink-border-form) bg-white/3"
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSubscribed(true);
            }}
          >
            <label htmlFor="subscribe-email" className="sr-only">
              Email address
            </label>
            <input
              id="subscribe-email"
              className="flex-1 py-[0.85rem] px-4 bg-transparent border-0 outline-none text-ink-text [font-family:var(--font-lora)] text-[0.9rem] placeholder:text-ink-subtle"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              className="py-[0.85rem] px-[1.4rem] bg-ink-gold border-0 text-ink-bg [font-family:var(--font-lora)] text-[0.8rem] font-bold tracking-widest uppercase cursor-pointer transition-colors duration-200 whitespace-nowrap hover:bg-ink-gold-dim"
              type="submit"
            >
              Subscribe
            </button>
          </form>
        )}

        <Link
          href="/blog"
          className="inline-flex items-center justify-center gap-2 py-3 px-8 border border-(--ink-border-subscribe) text-ink-warm text-[0.82rem] tracking-[0.18em] uppercase no-underline italic [font-family:var(--font-lora)] bg-(--ink-surface-cta) w-full transition-colors duration-200 hover:border-ink-warm hover:text-ink-text hover:bg-(--ink-surface-btn)"
        >
          <span aria-hidden="true">✦</span> Read the Blog
        </Link>
      </div>
    </div>
  );
}
