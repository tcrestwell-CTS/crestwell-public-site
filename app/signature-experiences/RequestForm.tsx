"use client";

import { useState, type FormEvent } from "react";

export default function RequestForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    if (data.company) return; // honeypot — silently drop bots
    setStatus("sending");

    const nameParts = data.name.trim().split(/\s+/);
    const first_name = nameParts[0] || "";
    const last_name = nameParts.slice(1).join(" ") || "-";

    const message = [
      "Signature Experiences invitation request",
      data.interest && `Most interested in: ${data.interest}`,
      data.occasion && `Upcoming occasion: ${data.occasion}`,
      data.referred && `Referred by / existing client: ${data.referred}`,
      data.notes,
    ].filter(Boolean).join("\n");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name,
          last_name,
          email: data.email,
          phone: data.phone || "",
          trip_type: "Signature Experiences",
          budget: data.budget || "",
          message,
          lead_source: "signature-experiences",
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="form-card">
        <div className="center">
          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", marginBottom: 8 }}>
            Thank you — your request is in.
          </p>
          <p style={{ color: "var(--text-secondary)" }}>
            A member of our team will review it and reach out personally within one
            business day.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-card">
      <form onSubmit={onSubmit}>
        <div className="f-grid">
          <div>
            <label htmlFor="se-name">Full name <span className="req">*</span></label>
            <input id="se-name" name="name" required autoComplete="name" />
          </div>
          <div>
            <label htmlFor="se-email">Email <span className="req">*</span></label>
            <input id="se-email" name="email" type="email" required autoComplete="email" />
          </div>
          <div>
            <label htmlFor="se-phone">Phone <span className="req">*</span></label>
            <input id="se-phone" name="phone" type="tel" required autoComplete="tel" />
          </div>
          <div>
            <label htmlFor="se-budget">Typical trip investment</label>
            <select id="se-budget" name="budget" defaultValue="">
              <option value="">Prefer not to say</option>
              <option>Under $5,000</option>
              <option>$5,000 – $10,000</option>
              <option>$10,000 – $25,000</option>
              <option>$25,000 – $50,000</option>
              <option>$50,000+</option>
            </select>
          </div>
          <div>
            <label htmlFor="se-interest">Most interested in</label>
            <select id="se-interest" name="interest" defaultValue="">
              <option value="">Select</option>
              <option>Luxury cruise</option>
              <option>Luxury resort or villa</option>
              <option>Premium sports or event travel</option>
              <option>Private group or family trip</option>
              <option>Celebration travel (anniversary, birthday, milestone)</option>
              <option>Something else</option>
            </select>
          </div>
          <div>
            <label htmlFor="se-occasion">Upcoming occasion (if any)</label>
            <input id="se-occasion" name="occasion" placeholder="e.g. 25th anniversary, spring 2027" />
          </div>
          <div className="f-full">
            <label htmlFor="se-referred">Existing client or referred by</label>
            <input id="se-referred" name="referred" placeholder="Optional" />
          </div>
          <div className="f-full">
            <label htmlFor="se-notes">Tell us what you have in mind</label>
            <textarea id="se-notes" name="notes" rows={3} placeholder="Destinations, dates, who is traveling, anything that matters to you…" />
          </div>
          <input type="text" name="company" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
        </div>
        <div className="f-sub">
          <button className="btn-gold" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Request an Invitation"}
          </button>
        </div>
        {status === "error" && (
          <p className="f-fine" style={{ color: "#dc2626" }}>
            Something went wrong — please try again, or call us at 888.508.6893.
          </p>
        )}
        <p className="f-fine">
          Prefer to talk? Call{" "}
          <a href="tel:8885086893" style={{ color: "var(--navy)", fontWeight: 600 }}>888.508.6893</a>
        </p>
      </form>
    </div>
  );
}
