"use client";
import { useState } from "react";
import { EmailField, useEmailValidation } from "@/components/EmailField";
import { trackGenerateLead } from "@/lib/track-generate-lead";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const emailValidation = useEmailValidation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailValidation.state === 'invalid') { setErrorMsg('Please enter a valid email address.'); return; }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, city: "homepage" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      trackGenerateLead({
        lead_source: "homepage-port-guide",
        trip_type: "Southeast Port Guide",
      });
      setStatus("success");
      setEmail("");
      setName("");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section style={{ background: "var(--navy-mid)", padding: "64px 32px", textAlign: "center" }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <div className="overline" style={{ marginBottom: 16 }}>Free Download</div>
        <h2 className="font-display" style={{ fontSize: "2rem", fontWeight: 300, color: "white", marginBottom: 12 }}>
          The Southeast Cruiser's Port Guide
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", marginBottom: 8, lineHeight: 1.6 }}>
          12 pages. Drive times, parking costs, cruise lines, and Tim's honest take on every major port within reach of Georgia, Tennessee, Alabama, and Florida.
        </p>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginBottom: 32 }}>
          Free. No spam. Unsubscribe any time.
        </p>

        {status === "success" ? (
          <div style={{
            background: "rgba(201,168,76,0.12)",
            border: "1px solid rgba(201,168,76,0.4)",
            padding: "24px 32px",
            maxWidth: 440,
            margin: "0 auto",
          }}>
            <div style={{ color: "var(--gold)", fontSize: "1.5rem", marginBottom: 8 }}>📬</div>
            <p style={{ color: "var(--gold)", fontSize: "0.95rem", fontWeight: 500, marginBottom: 4 }}>Check your inbox!</p>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Your guide is on its way. Don&apos;t see it? Check your spam folder.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 440, margin: "0 auto" }}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First name (optional)"
              style={{ padding: "12px 16px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "white", fontSize: "0.9rem", outline: "none" }}
            />
            <div style={{ display: "flex", gap: 10 }}>
              <EmailField value={email} onChange={v => { setEmail(v); emailValidation.validate(v); }} required placeholder="your@email.com" label="" />
              <button
                type="submit"
                disabled={status === "loading"}
                style={{ padding: "12px 24px", background: "var(--gold)", color: "var(--navy)", border: "none", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase", opacity: status === "loading" ? 0.7 : 1, whiteSpace: "nowrap" }}
              >
                {status === "loading" ? "Sending..." : "Send My Guide"}
              </button>
            </div>
            {status === "error" && (
              <p style={{ color: "#f87171", fontSize: "0.8rem", textAlign: "center" }}>{errorMsg}</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
