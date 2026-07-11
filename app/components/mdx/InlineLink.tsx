import Link from "next/link";

interface InlineLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function InlineLink({ href, children }: InlineLinkProps) {
  return (
    <Link
      href={href}
      className="text-ink-gold underline underline-offset-2 hover:text-ink-text active:text-ink-warm transition-colors duration-150"
    >
      {children}
    </Link>
  );
}
