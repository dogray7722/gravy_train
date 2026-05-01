import Link from "next/link";

interface PostLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function PostLink({ href, children }: PostLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-ink-gold no-underline hover:text-ink-text active:text-ink-warm transition-colors duration-150 [font-family:var(--font-lora)]"
    >
      {children}
      <span aria-hidden="true" className="text-[0.85em] opacity-70">→</span>
    </Link>
  );
}
