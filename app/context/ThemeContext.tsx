"use client";

import { createContext, useContext, useSyncExternalStore } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): Theme {
  return localStorage.getItem("theme") === "light" ? "light" : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
    // Same-tab writes don't fire 'storage'; dispatch a synthetic event so useSyncExternalStore re-reads.
    window.dispatchEvent(new StorageEvent("storage", { key: "theme", newValue: next }));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
