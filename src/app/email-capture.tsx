"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/capture-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed to send");
      track("email-capture-workshop");
      setSent(true);
    } catch {
      setError("Something went wrong. Try again or email me directly.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="bg-surface border border-border rounded-xl p-8 text-center">
        <p className="text-lg text-navy font-semibold mb-2">Got it!</p>
        <p className="text-sm text-gray">
          I&apos;ll send you the details. If you have questions in the meantime,
          email me at{" "}
          <a href="mailto:pelinsu@mottoworkshop.com" className="text-accent hover:text-navy transition-colors">
            pelinsu@mottoworkshop.com
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-xl p-8">
      <h2 className="text-xl text-navy font-semibold mb-2">
        Want the details?
      </h2>
      <p className="text-sm text-gray leading-relaxed mb-6">
        Leave your email and I&apos;ll send you the workshop overview:
        what we cover, how it works, and how to book.
        No spam, just the info.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg border border-border bg-white text-sm text-navy outline-none focus:border-accent transition-colors placeholder:text-gray-light"
        />
        <button
          type="submit"
          disabled={sending || !email}
          className="px-6 py-3 rounded-lg bg-accent text-white text-sm font-medium hover:bg-navy transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending ? "..." : "Send me the info"}
        </button>
      </form>
      {error && <p className="text-sm text-red-500 mt-3">{error}</p>}
    </div>
  );
}
