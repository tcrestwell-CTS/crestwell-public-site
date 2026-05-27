/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImageResponse } from "next/og";

export const runtime = "edge";

const GOLD = "#c9a84c";
const NAVY = "#0d1b2a";

const FUNNELS_URL  = "https://rrgckliwdcacxpkgjilc.supabase.co";
const FUNNELS_ANON = "sb_publishable__TOkP4x-vXdXvQsaKjgqjg_oVScDoDt";

const SLUG_PHOTO: Record<string, string> = {
  "find-your-perfect-cruise": "https://images.unsplash.com/photo-1548574505-5e239809f906?w=1080&q=80&fit=crop",
  "untitled-funnel":          "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=1080&q=80&fit=crop",
  "free-travel-quote":        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1080&q=80&fit=crop",
  "join-the-circle":          "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1080&q=80&fit=crop",
};

async function toDataUrl(url: string): Promise<string | null> {
  try {
    const r = await fetch(url);
    if (!r.ok) return null;
    const buf = await r.arrayBuffer();
    const u8  = new Uint8Array(buf);
    let b = "";
    for (let i = 0; i < u8.length; i += 8192) b += String.fromCharCode(...u8.subarray(i, i + 8192));
    return `data:${r.headers.get("content-type") ?? "image/jpeg"};base64,${btoa(b)}`;
  } catch { return null; }
}

async function getFunnel(slug: string): Promise<{ name: string; description: string; qs: number } | null> {
  try {
    const h = { apikey: FUNNELS_ANON, Authorization: `Bearer ${FUNNELS_ANON}` };
    const fr = await fetch(`${FUNNELS_URL}/rest/v1/funnels?slug=eq.${encodeURIComponent(slug)}&select=id,name,description&limit=1`, { headers: h });
    if (!fr.ok) return null;
    const rows: any[] = await fr.json();
    if (!rows?.length) return null;
    const f = rows[0];
    const sr = await fetch(`${FUNNELS_URL}/rest/v1/funnel_steps?funnel_id=eq.${f.id}&select=type`, { headers: h });
    const steps: any[] = sr.ok ? await sr.json() : [];
    const qs = steps.filter((s) => s.type !== "info" && s.type !== "end").length;
    return { name: f.name, description: f.description ?? "", qs };
  } catch { return null; }
}

export async function GET(_req: Request, context: any) {
  const { slug, size } = await context.params;
  const isV = size === "vertical";
  const W = 1080;
  const H = isV ? 1920 : 1080;

  const [funnel, photo] = await Promise.all([
    getFunnel(slug),
    toDataUrl(SLUG_PHOTO[slug] ?? SLUG_PHOTO["find-your-perfect-cruise"]),
  ]);

  if (!funnel) return new Response("Not found", { status: 404 });

  const sub = funnel.description || "A personalized quiz from Crestwell Travel Services";
  const g   = isV ? 40 : 24;
  const overlay = photo
    ? "linear-gradient(to bottom,rgba(5,14,24,.52) 0%,rgba(5,14,24,.28) 35%,rgba(5,14,24,.72) 65%,rgba(5,14,24,.97) 100%)"
    : `linear-gradient(160deg,${NAVY} 0%,#050e18 100%)`;

  return new ImageResponse(
    (
      <div style={{ width: W, height: H, position: "relative", overflow: "hidden", background: NAVY, display: "flex" }}>
        {photo && <img src={photo} width={W} height={H} style={{ position: "absolute", top: 0, left: 0, objectFit: "cover" }} />}
        <div style={{ position: "absolute", inset: 0, background: overlay, display: "flex" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 8, background: GOLD, display: "flex" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: isV ? "100px 80px" : "60px 80px" }}>
          <p style={{ color: GOLD, fontSize: isV ? 26 : 20, letterSpacing: "0.22em", textTransform: "uppercase", margin: `0 0 ${g}px`, fontFamily: "Georgia,serif", display: "flex" }}>
            CRESTWELL TRAVEL SERVICES
          </p>
          <h1 style={{ color: "white", fontSize: isV ? 88 : 68, fontWeight: 700, textAlign: "center", lineHeight: 1.15, margin: `0 0 ${g}px`, maxWidth: 920, fontFamily: "Georgia,serif", display: "flex" }}>
            {funnel.name}
          </h1>
          <div style={{ width: 100, height: 3, background: GOLD, margin: `0 0 ${g}px`, display: "flex" }} />
          <p style={{ color: "rgba(255,255,255,.88)", fontSize: isV ? 38 : 28, textAlign: "center", lineHeight: 1.55, maxWidth: 820, margin: `0 0 ${g + 8}px`, fontFamily: "Georgia,serif", display: "flex" }}>
            {sub}
          </p>
          {funnel.qs > 0 && (
            <div style={{ background: "rgba(201,168,76,.18)", border: "1.5px solid rgba(201,168,76,.65)", borderRadius: 60, padding: isV ? "18px 52px" : "14px 40px", color: GOLD, fontSize: isV ? 28 : 22, fontFamily: "Georgia,serif", display: "flex" }}>
              {funnel.qs} quick questions · Free · No obligation
            </div>
          )}
        </div>
        <div style={{ position: "absolute", bottom: 48, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
          <p style={{ color: "rgba(255,255,255,.45)", fontSize: isV ? 22 : 17, fontFamily: "Georgia,serif", margin: 0, display: "flex" }}>
            match.crestwelltravels.com
          </p>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 6, background: GOLD, opacity: 0.45, display: "flex" }} />
      </div>
    ),
    { width: W, height: H, headers: { "Cache-Control": "public,max-age=300,s-maxage=3600" } }
  );
}
