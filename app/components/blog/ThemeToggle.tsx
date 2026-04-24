"use client";

import { useTheme } from "@/app/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  // Icon shows the destination theme (e.g. ☀ = "switch to light")
  return (
    <button
      onClick={toggleTheme}
      className="w-11 h-11 flex items-center justify-center text-lg text-ink-warm hover:text-ink-text transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink-dark"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? "☀" : "☾"}
    </button>
  );
}
