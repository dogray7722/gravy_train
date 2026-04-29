"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.refresh();
    } else {
      setError("Incorrect password.");
      setLoading(false);
    }
  }

  return (
    <div
      data-theme="dark"
      className="min-h-screen flex items-center justify-center bg-ink-bg"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <h1 className="text-ink-gold text-xl font-bold tracking-widest uppercase text-center [font-family:var(--font-playfair)]">
          Admin
        </h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="bg-transparent border border-(--ink-border-form) text-ink-text px-4 py-3 outline-none placeholder:text-ink-subtle text-sm [font-family:var(--font-lora)]"
        />
        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="bg-ink-gold text-ink-bg font-bold text-xs tracking-widest uppercase py-3 cursor-pointer hover:bg-ink-gold-dim transition-colors disabled:opacity-50"
        >
          {loading ? "Verifying…" : "Enter"}
        </button>
      </form>
    </div>
  );
}
