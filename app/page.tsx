"use client";

import { useState } from "react";
import Link from "next/link";
import { Playfair_Display, DM_Sans } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair"
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans"
});

export default function LandingInk() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.ChangeEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <div
      className={`${playfair.variable} ${dmSans.variable} relative min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden bg-[#2c2620] text-[#f0e8d5] [font-family:var(--font-dm-sans)]`}
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
        aria-hidden
      >
        ✦
      </span>

      <h1 className="[font-family:var(--font-playfair)] text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[1.05] text-center text-[#f0e8d5] m-0 animate-[fadeUp_0.9s_ease_0.1s_both]">
        Words
        <br />
        in <em className="not-italic text-[#c9a96e]">Ink</em>
      </h1>

      <div className="w-20 h-px bg-linear-to-r from-transparent via-[#b48c50] to-transparent my-7 mx-auto" />

      <p className="text-base italic text-[#c4b89a] text-center max-w-100 leading-[1.8] m-0 animate-[fadeUp_1s_ease_0.2s_both]">
        Taking back the imprints of my life from the cess pool that is social
        media. What I create here, I own.
      </p>

      <div className="w-20 h-px bg-linear-to-r from-transparent via-[#b48c50] to-transparent my-7 mx-auto" />

      <div className="flex flex-col items-center gap-5 w-full max-w-95 animate-[fadeUp_1s_ease_0.35s_both]">
        {subscribed ? (
          <p className="italic text-[#b48c50] text-[0.9rem] text-center">
            ✦ You&apos;re on the list. Thank you.
          </p>
        ) : (
          <form
            className="flex w-full border border-[rgba(180,140,80,0.3)] bg-white/3"
            onSubmit={handleSubscribe}
          >
            <input
              className="flex-1 py-[0.85rem] px-4 bg-transparent border-0 outline-none text-[#e8dfc8] [font-family:var(--font-dm-sans)] text-[0.9rem] placeholder:text-[#8a7e6e]"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              className="py-[0.85rem] px-[1.4rem] bg-[#c9a96e] border-0 text-[#1a1410] [font-family:var(--font-dm-sans)] text-[0.8rem] font-bold tracking-widest uppercase cursor-pointer transition-colors duration-200 whitespace-nowrap hover:bg-[#dbbe86]"
              type="submit"
            >
              Subscribe
            </button>
          </form>
        )}

        <Link
          href="/blog"
          className="inline-flex items-center justify-center gap-2 py-3 px-8 border border-[rgba(180,140,80,0.5)] text-[#c9a96e] text-[0.82rem] tracking-[0.18em] uppercase no-underline italic [font-family:var(--font-dm-sans)] bg-[rgba(180,140,80,0.06)] w-full transition-colors duration-200 hover:border-[#c9a96e] hover:text-[#e8d5a8] hover:bg-[rgba(180,140,80,0.12)]"
        >
          ✦ Read the Blog
        </Link>
      </div>
    </div>
  );
}
