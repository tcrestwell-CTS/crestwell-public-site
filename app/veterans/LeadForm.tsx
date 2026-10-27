"use client";

import { useState, type FormEvent } from "react";
import { trackGenerateLead } from "@/lib/track-generate-lead";

export default function LeadForm() {
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
      data.affiliation && `Affiliation: ${data.affiliation}`,
      data.branch && `Service branch: ${data.branch}`,
      data.group_size && `Estimated group size: ${data.group_size}`,
      data.timeframe && `Ideal timeframe: ${data.timeframe}`,
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
          trip_type: data.trip_type || "Veterans Day at Sea 2027",
          message: notes,
          lead_source: "veterans-page",
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      trackGenerateLead({
        lead_source: "veterans-page",
        trip_type: data.trip_type || "Veterans Day at Sea 2027",
      });
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="form-card">
        <div className="f-ok" style={{ display: "block" }}>
          <p className="big">Got it — welcome aboard. 🇺🇸</p>
          <p style={{ color: "var(--text-secondary)" }}>
            We&apos;ll reach out within one business day. Thank you for your service — the travel
            part is on us now.
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
            <label htmlFor="vl-name">Full name <span className="req">*</span></label>
            <input id="vl-name" name="name" required autoComplete="name" />
          </div>
          <div>
            <label htmlFor="vl-email">Email <span className="req">*</span></label>
            <input id="vl-email" name="email" type="email" required autoComplete="email" />
          </div>
          <div>
            <label htmlFor="vl-phone">Phone</label>
            <input id="vl-phone" name="phone" type="tel" autoComplete="tel" />
          </div>
          <div>
            <label htmlFor="vl-affil">I am a…</label>
            <select id="vl-affil" name="affiliation" defaultValue="">
              <option value="">Select (optional)</option>
              <option>Veteran</option>
              <option>Active duty</option>
              <option>Military family</option>
              <option>Friend or supporter</option>
              <option>Organization / post</option>
            </select>
          </div>
          <div>
            <label htmlFor="vl-branch">Service branch</label>
            <select id="vl-branch" name="branch" defaultValue="">
              <option value="">Select (optional)</option>
              <option>Army</option>
              <option>Navy</option>
              <option>Air Force</option>
              <option>Marine Corps</option>
              <option>Coast Guard</option>
              <option>Space Force</option>
              <option>National Guard / Reserve</option>
            </select>
          </div>
          <div>
            <label htmlFor="vl-type">Trip type</label>
            <select id="vl-type" name="trip_type" defaultValue="Veterans Day at Sea 2027">
              <option>Veterans Day at Sea 2027</option>
              <option>Group cruise</option>
              <option>All-inclusive resort</option>
              <option>Reunion or milestone event</option>
              <option>Family vacation</option>
              <option>Something else</option>
            </select>
          </div>
          <div>
            <label htmlFor="vl-size">Estimated group size</label>
            <select id="vl-size" name="group_size" defaultValue="">
              <option value="">Select</option>
              <option>1–2</option>
              <option>3–5</option>
              <option>6–10</option>
              <option>11–20</option>
              <option>21+</option>
            </select>
          </div>
          <div>
            <label htmlFor="vl-when">Ideal timeframe</label>
            <input id="vl-when" name="timeframe" placeholder="e.g. Fall 2027" />
          </div>
          <div className="f-full">
            <label htmlFor="vl-notes">Anything else?</label>
            <textarea
              id="vl-notes"
              name="notes"
              rows={3}
              placeholder="Occasion, destinations on your mind, questions…"
            />
          </div>
          <input type="text" name="company" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
        </div>
        <div className="f-sub">
          <button className="btn-gold" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Start Planning My Trip"}
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
          </a>{" "}
          — no planning fees, ever.
        </p>
      </form>
    </div>
  );
}
