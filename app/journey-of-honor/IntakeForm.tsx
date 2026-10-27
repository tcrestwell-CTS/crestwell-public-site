"use client";

import { useState, type FormEvent } from "react";
import { trackGenerateLead } from "@/lib/track-generate-lead";

export default function IntakeForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (data.company) return; // honeypot — silently drop bots
    setStatus("sending");

    const nameParts = data.name.trim().split(/\s+/);
    const first_name = nameParts[0] || "";
    const last_name = nameParts.slice(1).join(" ") || "-";

    const notes = [
      data.status && `Status: ${data.status}`,
      data.branch && `Branch of service: ${data.branch}`,
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
          trip_type: "Journey of Honor",
          message: notes,
          lead_source: "journey-of-honor",
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      trackGenerateLead({
        lead_source: "journey-of-honor",
        trip_type: "Journey of Honor",
      });
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
            Thank you for your service. 🇺🇸
          </p>
          <p style={{ color: "var(--text-secondary)" }}>
            A Journey of Honor advisor will reach out within one business day to start
            planning your trip.
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
            <label htmlFor="joh-name">Full name <span className="req">*</span></label>
            <input id="joh-name" name="name" required autoComplete="name" />
          </div>
          <div>
            <label htmlFor="joh-email">Email <span className="req">*</span></label>
            <input id="joh-email" name="email" type="email" required autoComplete="email" />
          </div>
          <div>
            <label htmlFor="joh-phone">Phone <span className="req">*</span></label>
            <input id="joh-phone" name="phone" type="tel" required autoComplete="tel" />
          </div>
          <div>
            <label htmlFor="joh-status">Status <span className="req">*</span></label>
            <select id="joh-status" name="status" required defaultValue="">
              <option value="" disabled>Select</option>
              <option>Active Duty</option>
              <option>Retired / Veteran</option>
              <option>Military Family Member</option>
            </select>
          </div>
          <div className="f-full">
            <label htmlFor="joh-branch">Branch of service <span className="req">*</span></label>
            <select id="joh-branch" name="branch" required defaultValue="">
              <option value="" disabled>Select</option>
              <option>Army</option>
              <option>Navy</option>
              <option>Air Force</option>
              <option>Marine Corps</option>
              <option>Coast Guard</option>
              <option>Space Force</option>
              <option>National Guard / Reserve</option>
              <option>Family member — not applicable</option>
            </select>
          </div>
          <div className="f-full">
            <label htmlFor="joh-notes">What kind of trip are you dreaming of?</label>
            <textarea
              id="joh-notes"
              name="notes"
              rows={3}
              placeholder="Cruise, all-inclusive resort, a specific destination, travel dates…"
            />
          </div>
          <input type="text" name="company" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
        </div>
        <div className="f-sub">
          <button className="btn-gold" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Join Journey of Honor"}
          </button>
        </div>
        {status === "error" && (
          <p className="f-fine" style={{ color: "#dc2626" }}>
            Something went wrong — please try again, or call us at 888.508.6893.
          </p>
        )}
        <p className="f-fine">
          Prefer to talk? Call{" "}
          <a href="tel:8885086893" style={{ color: "var(--navy)", fontWeight: 600 }}>
            888.508.6893
          </a>
        </p>
      </form>
    </div>
  );
}
