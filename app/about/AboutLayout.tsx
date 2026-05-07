"use client";

import Link from "next/link";
import BlogHeader from "@/app/components/blog/BlogHeader";

export default function AboutLayout() {
  return (
    <div
      className="min-h-screen bg-ink-bg text-ink-text [font-family:var(--font-lora)]"
      style={{ backgroundImage: "var(--ink-page-gradient)" }}
    >
      <BlogHeader
        sidebarOpen={false}
        onToggleSidebar={() => {}}
        archiveYears={[]}
        activeArchive={null}
        onArchiveChange={() => {}}
        hideSidebar
        hideArchive
      />

      <main
        id="main-content"
        className="max-w-3xl mx-auto px-4 sm:px-8 py-12 sm:py-20 animate-[fadeUp_0.6s_ease_both]"
      >
        {/* Section label */}
        <p className="flex items-center gap-3 text-[0.75rem] tracking-[0.25em] uppercase text-ink-warm italic mb-8 after:content-[''] after:flex-1 after:h-px after:bg-linear-to-r after:from-(--ink-decor-line-strong) after:to-transparent">
          About
        </p>

        {/* Name & tagline */}
        <h1 className="[font-family:var(--font-playfair)] text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-ink-text leading-[1.1] mb-2">
          David Gray
        </h1>
        <p className="text-[0.75rem] tracking-[0.18em] uppercase text-ink-warm italic mb-10">
          Traveler · Blogger · Human on the Internet
        </p>

        <div className="h-px bg-linear-to-r from-(--ink-decor-line-strong) via-(--ink-decor-line) to-transparent mb-10" />

        {/* Lorem ipsum body copy */}
        <div className="space-y-6 text-ink-warm leading-[1.85] text-base italic">
          <p>
            When we pay attention to the loudest rather than the most
            informative-- when we stop seeking information based out of our own
            curiosity, and simply just accept and engage with that which is
            presented, we waste our potential as conscientious, creative beings.
            I saw it, and still see it happening daily, and I know you see it,
            too: an unchallenged habituation of picking up that phone or
            navigating to your favorite sites on your computer for instant
            gratification, for affirmation, or for low-effort entertainment. We
            become addicted to the digital junk food for our brain, and
            we&apos;ve been doing it for so long we hardly even notice our
            addiction. In the before times I used to have an attention span. I
            used to read. I used to take the time to collect my own thoughts and
            write things down. I missed that, so instead of allowing myself to
            mindlessly scroll I decided to create my own content. I decided to
            create my own custom blog.
          </p>
          <p>
            I put this together because I didn&apos;t like what I was becoming.
            I also got sick of the lack of choice when it came to sharing my
            life events with people on the internet. I no longer wanted to be
            the product, nor did I want to be manipulated by some algorithm. I
            just wanted to share my experiences without being exploited. I mean,
            why, with something gifted with such unlimited potential as the
            internet have we all just accepted a few major players as vessels
            for our thoughts, our creations, and our memories? For this project
            I wanted to minimize as much as possible any external ownership, so
            instead of just creating an account on Medium or Substack or even
            using a platform like WordPress, I decided to roll my own. After
            all, the very first blogs were just straight HTML, and I want to
            bring back that spirit of democratization, of ownership.
          </p>
          <p>
            In the short time that this site has been live, I have found a new
            addiction. It is a much healthier one than I had before. I have
            become addicted to patient contemplation, to crafting what I want to
            express rather than just swallowing or regurgitating the thoughts of
            others. There is one thing I know for certain based on this new
            experience: it feels a hell of a lot better to produce than to
            consume. Pour the gravy!
          </p>
        </div>

        <div className="h-px bg-linear-to-r from-(--ink-decor-line-strong) via-(--ink-decor-line) to-transparent my-12" />

        {/* Subscribe CTA */}
        <div className="border border-(--ink-border-mid) p-6 sm:p-10 bg-(--ink-surface-cta)">
          <p className="text-[0.75rem] tracking-[0.22em] uppercase text-ink-warm italic mb-3">
            Stay in the loop
          </p>
          <h2 className="[font-family:var(--font-playfair)] text-2xl sm:text-3xl font-bold text-ink-text leading-tight mb-4">
            Get new posts delivered to your inbox.
          </h2>
          <p className="text-ink-warm italic leading-[1.8] mb-6 text-base">
            My thoughts. My media. Your eyeballs.
          </p>
          <Link
            href="/#subscribe"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-(--ink-border-subscribe) bg-(--ink-surface-subscribe) text-ink-warm text-[0.75rem] italic tracking-[0.12em] uppercase transition-colors hover:bg-(--ink-surface-subscribe-hover) hover:border-ink-warm hover:text-ink-text"
          >
            <span aria-hidden="true">✦</span> Subscribe
          </Link>
        </div>

        {/* Back to blog */}
        <div className="mt-12 pt-8 border-t border-(--ink-border-subtle)">
          <Link
            href="/blog"
            className="text-[0.75rem] tracking-[0.16em] uppercase text-ink-warm hover:text-ink-text transition-colors"
          >
            ← Back to the blog
          </Link>
        </div>
      </main>

      <footer className="border-t border-(--ink-border-soft) py-10 px-8 text-center">
        <p className="text-[0.75rem] text-ink-muted tracking-[0.12em] italic">
          The Gravy Train · Est. 2026
        </p>
      </footer>
    </div>
  );
}
