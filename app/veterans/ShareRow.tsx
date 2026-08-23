"use client";

import { useState } from "react";

const PAGE_URL = "https://www.crestwellgetaways.com/veterans";
const SHARE_TEXT =
  "Veterans, Family & Group Travel — planned start to finish by Crestwell Travel Services";

export default function ShareRow() {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(PAGE_URL);
  const t = encodeURIComponent(SHARE_TEXT);

  async function copy() {
    try {
      await navigator.clipboard.writeText(PAGE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="share-row">
      <a className="share-btn" href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} target="_blank" rel="noopener noreferrer">Facebook</a>
      <a className="share-btn" href={`https://twitter.com/intent/tweet?url=${u}&text=${t}`} target="_blank" rel="noopener noreferrer">X</a>
      <a className="share-btn" href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a className="share-btn" href={`https://wa.me/?text=${t}%20${u}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      <button className="share-btn" type="button" onClick={copy}>
        {copied ? "Copied ✓" : "Copy Link"}
      </button>
    </div>
  );
}
