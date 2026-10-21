"use client";

import { useState, useEffect, useCallback } from "react";
import type { Subscriber } from "@/lib/db/schema";
import type { Post } from "@/lib/types";

interface Props {
  subscribers: Subscriber[];
  posts: Post[];
}

export default function AdminDashboard({ subscribers: initialSubs, posts }: Props) {
  const [subs, setSubs] = useState(initialSubs);
  const [selectedSlug, setSelectedSlug] = useState(posts[0]?.slug ?? "");
  const [notifyStatus, setNotifyStatus] = useState<string | null>(null);
  const [deactivating, setDeactivating] = useState<number | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [purging, setPurging] = useState(false);
  const [purgeStatus, setPurgeStatus] = useState<string | null>(null);

  const activeCount = subs.filter((s) => s.active).length;
  const inactiveCount = subs.filter((s) => !s.active).length;

  const closeConfirm = useCallback(() => {
    if (!purging) setConfirmOpen(false);
  }, [purging]);

  useEffect(() => {
    if (!confirmOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeConfirm();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [confirmOpen, closeConfirm]);

  async function handleNotify() {
    setNotifyStatus("Sending…");
    try {
      const res = await fetch("/api/admin/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postSlug: selectedSlug }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setNotifyStatus(`Sent to ${data.sent} subscriber${data.sent !== 1 ? "s" : ""}.`);
      } else {
        setNotifyStatus(`Error: ${data.error ?? `HTTP ${res.status}`}`);
      }
    } catch (err) {
      setNotifyStatus(`Error: ${err instanceof Error ? err.message : "Network error"}`);
    }
  }

  async function handleDeactivate(id: number) {
    setDeactivating(id);
    await fetch(`/api/admin/subscribers/${id}/deactivate`, { method: "POST" });
    setSubs((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: false } : s))
    );
    setDeactivating(null);
  }

  async function handlePurge() {
    setPurging(true);
    try {
      const res = await fetch("/api/admin/subscribers/purge", { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setSubs((prev) => prev.filter((s) => s.active));
        setPurgeStatus(`Purged ${data.purged} unsubscribed record${data.purged !== 1 ? "s" : ""}.`);
      } else {
        setPurgeStatus(`Error: ${data.error ?? `HTTP ${res.status}`}`);
      }
    } catch (err) {
      setPurgeStatus(`Error: ${err instanceof Error ? err.message : "Network error"}`);
    } finally {
      setPurging(false);
      setConfirmOpen(false);
    }
  }

  return (
    <div
      data-theme="dark"
      className="min-h-screen bg-ink-bg text-ink-text [font-family:var(--font-lora)] p-8"
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-ink-gold text-2xl font-bold tracking-widest uppercase [font-family:var(--font-playfair)]">
            Newsletter Admin
          </h1>
          <span className="text-ink-subtle text-sm">
            {activeCount} active subscriber{activeCount !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Send Notification */}
        <section className="border border-(--ink-border-form) p-6 flex flex-col gap-4">
          <h2 className="text-ink-warm font-bold tracking-wider uppercase text-sm">
            Send Notification
          </h2>
          <div className="flex gap-3 flex-wrap">
            <select
              value={selectedSlug}
              onChange={(e) => setSelectedSlug(e.target.value)}
              className="flex-1 bg-transparent border border-(--ink-border-input) text-ink-text px-3 py-2 text-sm outline-none [font-family:var(--font-lora)] min-w-0"
            >
              {posts.map((p) => (
                <option key={p.slug} value={p.slug} className="bg-ink-bg">
                  {p.title}
                </option>
              ))}
            </select>
            <button
              onClick={handleNotify}
              disabled={!selectedSlug || notifyStatus === "Sending…"}
              className="bg-ink-gold text-ink-bg font-bold text-xs tracking-widest uppercase px-5 py-2 cursor-pointer hover:bg-ink-gold-dim transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              Send
            </button>
          </div>
          {notifyStatus && (
            <p className="text-ink-warm text-sm">{notifyStatus}</p>
          )}
        </section>

        {/* Export */}
        <div className="flex gap-4 items-center flex-wrap">
          <a
            href="/api/admin/export"
            className="inline-flex items-center gap-2 border border-(--ink-border-subscribe) text-ink-warm text-xs tracking-widest uppercase px-5 py-2 no-underline hover:border-ink-warm hover:text-ink-text transition-colors"
          >
            Export CSV
          </a>
          <span className="text-ink-subtle text-xs">
            Downloads all subscriber records
          </span>
          <button
            onClick={() => setConfirmOpen(true)}
            disabled={inactiveCount === 0}
            className="inline-flex items-center gap-2 border border-red-500/40 text-red-400 text-xs tracking-widest uppercase px-5 py-2 hover:border-red-400 hover:text-red-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ml-auto"
          >
            Purge Unsubscribed ({inactiveCount})
          </button>
        </div>
        {purgeStatus && (
          <p className="text-ink-warm text-sm">{purgeStatus}</p>
        )}

        {/* Subscriber Table */}
        <section>
          <h2 className="text-ink-warm font-bold tracking-wider uppercase text-sm mb-4">
            Subscribers
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-(--ink-border-subtle) text-ink-subtle text-xs tracking-widest uppercase text-left">
                  <th className="pb-2 pr-4 font-normal">Email</th>
                  <th className="pb-2 pr-4 font-normal">Subscribed</th>
                  <th className="pb-2 pr-4 font-normal">Status</th>
                  <th className="pb-2 font-normal"></th>
                </tr>
              </thead>
              <tbody>
                {subs.map((sub) => (
                  <tr
                    key={sub.id}
                    className="border-b border-(--ink-border-faint) hover:bg-white/2"
                  >
                    <td className="py-2 pr-4 text-ink-text">{sub.email}</td>
                    <td className="py-2 pr-4 text-ink-subtle">
                      {new Date(sub.subscribedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="py-2 pr-4">
                      <span
                        className={
                          sub.active ? "text-green-400" : "text-ink-subtle"
                        }
                      >
                        {sub.active ? "Active" : "Unsubscribed"}
                      </span>
                    </td>
                    <td className="py-2 text-right">
                      {sub.active && (
                        <button
                          onClick={() => handleDeactivate(sub.id)}
                          disabled={deactivating === sub.id}
                          className="text-ink-subtle text-xs hover:text-red-400 transition-colors disabled:opacity-50 cursor-pointer"
                        >
                          {deactivating === sub.id ? "…" : "Remove"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {subs.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-8 text-center text-ink-subtle italic"
                    >
                      No subscribers yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {confirmOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Confirm purge"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85"
          onClick={closeConfirm}
        >
          <div
            className="bg-ink-bg border border-(--ink-border-form) p-6 max-w-sm w-full mx-4 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-ink-gold font-bold tracking-widest uppercase text-sm">
              Purge Unsubscribed Records?
            </h3>
            <p className="text-ink-subtle text-sm leading-relaxed">
              This will permanently delete {inactiveCount} unsubscribed
              record{inactiveCount !== 1 ? "s" : ""} from the database. This
              cannot be undone. Consider exporting a CSV backup first.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeConfirm}
                disabled={purging}
                className="text-ink-subtle text-xs tracking-widest uppercase px-4 py-2 hover:text-ink-text transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePurge}
                disabled={purging}
                className="bg-red-500/90 text-ink-bg font-bold text-xs tracking-widest uppercase px-4 py-2 hover:bg-red-500 transition-colors cursor-pointer disabled:opacity-50"
              >
                {purging ? "Purging…" : "Confirm Purge"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
