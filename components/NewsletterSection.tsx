"use client";
import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("success");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section style={{ background: "var(--navy-mid)", padding: "64px 32px", textAlign: "center" }}>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <div className="overline" style={{ marginBottom: 16 }}>Stay in the Loop</div>
        <h2 className="font-display" style={{ fontSize: "2rem", fontWeight: 300, color: "white", marginBottom: 12 }}>
          Deals & Inspiration, Delivered
        </h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", marginBottom: 32 }}>
          Get exclusive cruise deals, travel tips, and destination guides straight to your inbox.
        </p>

        {status === "success" ? (
          <div style={{
            background: "rgba(201,168,76,0.12)",
            border: "1px solid rgba(201,168,76,0.4)",
            padding: "24px 32px",
            maxWidth: 440,
            margin: "0 auto",
          }}>
            <div style={{ color: "var(--gold)", fontSize: "1.5rem", marginBottom: 8 }}>✓</div>
            <p style={{ color: "var(--gold)", fontSize: "0.9rem", fontWeight: 500, marginBottom: 4 }}>You&apos;re subscribed!</p>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8rem" }}>
              Look out for exclusive deals and travel inspiration in your inbox.
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: 0, maxWidth: 440, margin: "0 auto" }}>
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                aria-label="Email address for newsletter signup"
                required
                disabled={status === "loading"}
                style={{
                  flex: 1, padding: "14px 20px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRight: "none", color: "white",
                  fontSize: "0.875rem", fontFamily: "var(--font-body)",
                  outline: "none",
                  opacity: status === "loading" ? 0.6 : 1,
                }}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary"
                style={{ whiteSpace: "nowrap", cursor: status === "loading" ? "not-allowed" : "pointer", opacity: status === "loading" ? 0.7 : 1 }}
              >
                {status === "loading" ? "Subscribing…" : "Subscribe"}
              </button>
            </form>
            {status === "error" && (
              <p style={{ color: "rgba(255,100,100,0.85)", fontSize: "0.8rem", marginTop: 12 }}>
                {errorMsg}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
