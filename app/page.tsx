"use client";

import { useState } from "react";
import Link from "next/link";

export default function LandingInk() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div
      id="main-content"
      className="relative min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden bg-ink-bg text-ink-text [font-family:var(--font-lora)]"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 80% 50% at 20% 80%, rgba(180,140,90,0.14) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 80% 20%, rgba(200,160,100,0.10) 0%, transparent 50%)
        `
      }}
    >
      {/* Decorative background blobs */}
      <div
        className="absolute -top-[20%] -left-[10%] w-125 h-125 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(180,140,80,0.07) 0%, transparent 70%)"
        }}
      />
      <div
        className="absolute -bottom-[10%] -right-[5%] w-100 h-100 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(180,140,80,0.08) 0%, transparent 70%)"
        }}
      />

      {/* Large decorative glyph */}
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-bold text-[rgba(180,140,80,0.04)] pointer-events-none select-none whitespace-nowrap [font-family:var(--font-playfair)]"
        aria-hidden="true"
      >
        ✦
      </span>

      <h1 className="[font-family:var(--font-playfair)] text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[1.05] text-center text-ink-text m-0 animate-[fadeUp_0.9s_ease_0.1s_both]">
        All Aboard
        <br />
        the <em className="not-italic text-ink-gold">Gravy Train</em>
      </h1>

      <div className="w-20 h-px bg-linear-to-r from-transparent via-[#b48c50] to-transparent my-7 mx-auto" />

      <p className="text-base italic text-ink-warm text-center max-w-100 leading-[1.8] m-0 animate-[fadeUp_1s_ease_0.2s_both]">
        Taking back my life echoes from the cess pool that is social media. What
        I create here is from my own mind and my own experience. Everything I
        build here, I own.
      </p>

      <div className="w-20 h-px bg-linear-to-r from-transparent via-[#b48c50] to-transparent my-7 mx-auto" />

      <div className="flex flex-col items-center gap-5 w-full max-w-95 animate-[fadeUp_1s_ease_0.35s_both]">
        {subscribed ? (
          <p className="italic text-ink-warm text-[0.9rem] text-center">
            <span aria-hidden="true">✦</span> You&apos;re on the list. Thank you.
          </p>
        ) : (
          <form
            className="flex w-full border border-[rgba(180,140,80,0.3)] bg-white/3"
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
              className="flex-1 py-[0.85rem] px-4 bg-transparent border-0 outline-none text-[#e8dfc8] [font-family:var(--font-lora)] text-[0.9rem] placeholder:text-[#8a7e6e]"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              className="py-[0.85rem] px-[1.4rem] bg-ink-gold border-0 text-[#1a1410] [font-family:var(--font-lora)] text-[0.8rem] font-bold tracking-widest uppercase cursor-pointer transition-colors duration-200 whitespace-nowrap hover:bg-[#dbbe86]"
              type="submit"
            >
              Subscribe
            </button>
          </form>
        )}

        <Link
          href="/blog"
          className="inline-flex items-center justify-center gap-2 py-3 px-8 border border-[rgba(180,140,80,0.5)] text-ink-warm text-[0.82rem] tracking-[0.18em] uppercase no-underline italic [font-family:var(--font-lora)] bg-[rgba(180,140,80,0.06)] w-full transition-colors duration-200 hover:border-ink-warm hover:text-ink-text hover:bg-[rgba(255,255,255,0.06)]"
        >
          <span aria-hidden="true">✦</span> Read the Blog
        </Link>
      </div>
    </div>
  );
}
