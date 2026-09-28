'use client';
import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';

// ─── All 20 operators from Widgety API (live as of March 2026) ────────────────

const WIDGETY_OPERATORS = [
  { id: "norwegian-cruise-line", title: "Norwegian Cruise Line", coverImage: "https://assets.widgety.co.uk/2025/12/04/12/21/00/c3825a9a-0308-4bb3-861d-b58731138486/NCL Pearl in Miami ©Norwegian Cruise Line.jpg", profileImage: "https://assets.widgety.co.uk/2026/01/16/13/24/48/adbe3d4c-b28f-47cb-8831-34e55810af30/NCL Its Different Out Here Logo 2026.png", shipCount: 22, cruiseType: "Ocean" },
  { id: "amawaterways", title: "AmaWaterways", coverImage: "https://assets.widgety.co.uk/2025/08/05/10/36/01/bef502a9-0f92-40f3-b694-0bb9e82535b6/AmaVida Exterior ©AmaWaterways 1.jpg", profileImage: "https://assets.widgety.co.uk/2026/01/08/11/42/47/fcc1bb25-0c77-4068-8cd2-02ed5bf9269f/AmaWaterways Off Red Logo 2026 HR.png", shipCount: 34, cruiseType: "River" },
  { id: "princess-cruises", title: "Princess Cruises", coverImage: "https://assets.widgety.co.uk/2021/01/25/14/50/35/02c07865-1f56-4cd4-acc0-8cd196a28533/Princess Cruises Royal Princess.jpg", profileImage: "https://assets.widgety.co.uk/2020/12/17/12/13/56/263baa16-5658-4a54-9783-0522d0c34daa/Princess Logo.jpg", shipCount: 17, cruiseType: "Ocean" },
  { id: "carnival-cruise-lines-operator", title: "Carnival Cruise Line", coverImage: "https://assets.widgety.co.uk/2023/08/31/11/48/33/6d544ebe-0d36-431c-b073-160e874563fd/Carnival - Mardi Gras, Exterior.jpg", profileImage: "https://assets.widgety.co.uk/2024/03/15/10/29/55/843a8d60-ffae-44f2-be74-a58a31e496a7/Carnival Cruise Line Logo 2024 1.png", shipCount: 31, cruiseType: "Ocean" },
  { id: "silversea-cruises", title: "Silversea", coverImage: "https://assets.widgety.co.uk/2023/08/29/12/37/23/38fe3ebf-290b-4087-8654-9ce0f23ed44f/Silversea Cruises Silver Dawn Exterior.jpg", profileImage: "https://assets.widgety.co.uk/2023/10/18/07/03/33/99f229ef-c3bf-4203-ae40-a26228cd0ac5/Silversea Logo 2023.png", shipCount: 12, cruiseType: "Ocean" },
  { id: "celebrity-cruises", title: "Celebrity Cruises", coverImage: "https://assets.widgety.co.uk/2024/04/09/06/47/29/8aca857a-3237-4f5a-80ff-b8a649403788/Celebrity Cruises, Nothing Comes Close 0.jpg", profileImage: "https://assets.widgety.co.uk/2021/12/10/08/11/21/543fe4de-46b9-4e56-adba-bc77fa6b6122/Celebrity Cruises Logo Dec 2021 0.png", shipCount: 16, cruiseType: "Ocean" },
  { id: "avalon-waterways", title: "Avalon Waterways", coverImage: "https://assets.widgety.co.uk/2023/08/30/11/46/25/5044178b-e991-4935-a5ce-1d33f54a1ce8/Avalon Tapestry - Exterior.jpg", profileImage: "https://assets.widgety.co.uk/2024/03/08/12/25/35/85242ef8-a0dc-417e-a79a-8abd6cdf51da/Avalon Waterways Logo 2024.jpeg", shipCount: 20, cruiseType: "River" },
  { id: "american-cruise-lines", title: "American Cruise Lines", coverImage: "https://assets.widgety.co.uk/2024/08/29/15/45/58/1092798d-a4ef-4b5c-89b9-776f75fa5b6d/ALC, American Harmony, Pacific Northwest Exterior.jpg", profileImage: "https://assets.widgety.co.uk/2024/08/21/08/12/03/afc4c592-b6c0-45ba-99dc-868638a4da02/American Cruise Lines Logo 2024.png", shipCount: 28, cruiseType: "River" },
  { id: "cunard-line", title: "Cunard", coverImage: "https://assets.widgety.co.uk/2021/10/14/05/16/10/566079f5-e5e1-4d8c-95bd-d3b3e9d84c98/Cunard Cruise Line 1.jpg", profileImage: "https://assets.widgety.co.uk/2019/12/06/08/30/09/4a1991ef-f505-44c4-b41c-8b0c1c81f054/cunard-logo.jpg", shipCount: 4, cruiseType: "Ocean" },
  { id: "holland-america-line", title: "Holland America Line", coverImage: "https://assets.widgety.co.uk/2024/06/14/08/22/03/8a8f1827-a9ee-4e4c-8a65-1d593aa9be8d/Holland America Line, Rotterdam Exterior 5.jpg", profileImage: "https://assets.widgety.co.uk/2026/02/04/06/37/04/71243b47-ed5e-45bc-a594-c047b4c276ff/HAL Logo 2026.png", shipCount: 11, cruiseType: "Ocean" },
  { id: "seabourn-cruise-line", title: "Seabourn", coverImage: "https://assets.widgety.co.uk/2024/12/12/18/19/49/5e4d329f-b89c-43c1-8eca-1c1ca0102e72/Seabourn Pursuit - Exterior 5, Credit. MUnterharnscheidt.jpg", profileImage: "https://assets.widgety.co.uk/2016/08/25/10/06/22/570/Seabourn_Latest.jpg", shipCount: 6, cruiseType: "Ocean" },
  { id: "tauck", title: "Tauck", coverImage: "https://assets.widgety.co.uk/2023/05/24/16/43/07/53b78094-7d48-4867-bfad-28d4133b9cc8/Tauck MS Sapphire Exterior.jpeg", profileImage: "https://assets.widgety.co.uk/2014/11/24/10/11/30/61/Tauck_Logo_Square.png", shipCount: 19, cruiseType: "River" },
  { id: "uniworld-boutique-river-cruises", title: "UNIWORLD Boutique River Cruises", coverImage: "https://assets.widgety.co.uk/2024/11/14/10/51/55/90d94888-6316-462e-a680-601379cb7072/Uniworld SS La Venezia - Exterior.jpg", profileImage: "https://assets.widgety.co.uk/2021/08/05/11/44/42/26cfed22-cf4e-4575-a579-f552a87ef2e0/UW-logo-RGB.jpg", shipCount: 22, cruiseType: "River" },
  { id: "explora-journeys", title: "Explora Journeys", coverImage: "https://assets.widgety.co.uk/2024/05/10/05/06/56/057a53e3-7d12-4369-b247-f3bc3c88e7e3/Explora Journeys, EXPLORA I, Exterior 3.jpg", profileImage: "https://assets.widgety.co.uk/2024/11/28/08/22/18/c9d61e62-30f0-4f37-8c10-e0379a100a92/Explora Journeys Logo Gold.png", shipCount: 5, cruiseType: "Ocean" },
  { id: "ritz-carlton-yacht-collection", title: "The Ritz-Carlton Yacht Collection", coverImage: "https://assets.widgety.co.uk/2024/06/25/15/53/27/243d22ee-734c-4b7a-88f5-11a27fc47c67/Ritz Carlton Yacht Collective Evrima - Exterior 3.PNG", profileImage: "https://assets.widgety.co.uk/2018/05/30/12/08/55/ca9720f2-af35-4cf7-aa54-617676a73a7b/Ritz Carlton Yacht Collection Logo.jpg", shipCount: 3, cruiseType: "Ocean" },
  { id: "disney-cruise-line", title: "Disney Cruise Line", coverImage: "https://assets.widgety.co.uk/2026/03/09/09/13/07/246e9408-74cf-420c-82de-b70009d70752/Disney Cruise Lines Disney Treasure MGKT © 2026 Disney. All Rights Reserved. Ships Registry The Bahamas.jpg", profileImage: "https://assets.widgety.co.uk/2026/03/09/09/34/38/05c8d46a-6866-484e-a374-8da1135c9ddb/DCL Logo 2026 MGKIT © 2026 Disney. All Rights Reserved. Ships Registry The Bahamas.png", shipCount: 8, cruiseType: "Ocean" },
  { id: "msc-cruises", title: "MSC Cruises", coverImage: "https://assets.widgety.co.uk/2025/09/15/09/48/35/078d45a4-22dd-4fc8-8f2f-ccc842816f9e/MSC Cruises MSC Virtuosa Exterior ©MSC Cruises.jpg", profileImage: "https://assets.widgety.co.uk/2025/10/16/08/27/24/633fbc1c-30ae-429c-bcb1-69ebbabde3a7/MSC Cruises Logo 2025.png", shipCount: 25, cruiseType: "Ocean" },
  { id: "royal-caribbean-international", title: "Royal Caribbean International", coverImage: "https://assets.widgety.co.uk/2023/06/09/07/59/00/5e25b590-ceb4-47eb-b753-9e4f216f9a4b/RCI Wonder of the Seas Exterior.jpg", profileImage: "https://assets.widgety.co.uk/2024/09/16/07/48/49/8a9d77f2-b9e4-474b-90fc-615c2e048e6a/RCI Logo 2024 1.png", shipCount: 30, cruiseType: "Ocean" },
  { id: "virgin-voyages", title: "Virgin Voyages", coverImage: "https://assets.widgety.co.uk/2025/03/04/10/56/11/79d0218e-2697-47f1-8143-76de60bdefb4/Virgin Voyages, Scarlet Lady Exterior 1.jpg", profileImage: "https://assets.widgety.co.uk/2025/02/27/11/23/24/db38cdcc-3552-47ad-bea7-ddb1931f8985/Virgin Voyages Logo 2025.png", shipCount: 4, cruiseType: "Ocean" },
  { id: "celebrity-river-cruises", title: "Celebrity River Cruises", coverImage: "https://assets.widgety.co.uk/2025/05/13/07/56/15/53cb3f65-077d-4866-847b-a3941fc37c38/Celebrity River Cruises.jpg", profileImage: "https://assets.widgety.co.uk/2021/12/10/08/11/21/543fe4de-46b9-4e56-adba-bc77fa6b6122/Celebrity Cruises Logo Dec 2021 0.png", shipCount: 5, cruiseType: "River" },
];

type FilterType = 'All' | 'Ocean' | 'River';

type OperatorDetail = {
  id: string;
  title: string;
  description: string | null;
  unique_text: string | null;
  reasons_to_book: string | null;
  video_url: string | null;
  website_url: string | null;
  facebook_url: string | null;
  brochures: { name: string; href: string }[];
  ships: { name: string; id: string; cover_image_href: string }[];
  cover_image_href: string;
  profile_image_href: string;
};

type SampleHoliday = {
  holiday_ref: string;
  name: string;
  operator_title: string;
};

export default function CruiseLinesPage() {
  const [filter, setFilter] = useState<FilterType>('All');
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set());
  const [hovered, setHovered] = useState<string | null>(null);
  const [selectedOp, setSelectedOp] = useState<typeof WIDGETY_OPERATORS[0] | null>(null);

  const filtered = filter === 'All'
    ? WIDGETY_OPERATORS
    : WIDGETY_OPERATORS.filter(o => o.cruiseType === filter);

  const quoteUrl = (op: typeof WIDGETY_OPERATORS[0]) =>
    `/request-quote?trip_type=${op.cruiseType === 'River' ? 'River+Cruise' : 'Cruise+Vacation'}&destination=${encodeURIComponent(op.title)}`;

  const searchUrl = (op: typeof WIDGETY_OPERATORS[0]) =>
    `/cruises?operator=${op.id}`;

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--navy)', paddingTop: 140, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://assets.widgety.co.uk/2023/06/09/07/59/00/5e25b590-ceb4-47eb-b753-9e4f216f9a4b/RCI Wonder of the Seas Exterior.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.18 }} />
        <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', position: 'absolute', top: 72, left: 0, right: 0 }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Our Partners</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 300, color: 'white', lineHeight: 1.1, marginBottom: 20 }}>
            Cruise Lines
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', maxWidth: 520, lineHeight: 1.75, marginBottom: 0 }}>
            We work with 20 of the world's top ocean and river cruise lines — from family-friendly mega-ships to intimate luxury yachts. Every line, every itinerary, one expert team.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <div style={{ background: 'var(--navy)', borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', flexWrap: 'wrap' }}>
          {[
            { label: 'Cruise Lines', value: '20' },
            { label: 'Ships', value: '370+' },
            { label: 'Ocean Lines', value: '14' },
            { label: 'River Lines', value: '6' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '20px 0', flex: '1 1 120px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none', paddingRight: i < 3 ? 32 : 0, paddingLeft: i > 0 ? 32 : 0, textAlign: 'center' }}>
              <div className="font-display" style={{ fontSize: '1.8rem', color: 'var(--gold)', fontWeight: 300, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter */}
      <section style={{ background: 'white', borderBottom: '1px solid #eee', position: 'sticky', top: 72, zIndex: 50 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', gap: 0 }}>
          {(['All', 'Ocean', 'River'] as FilterType[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '16px 28px', background: 'transparent', border: 'none',
                borderBottom: filter === f ? '2px solid var(--gold)' : '2px solid transparent',
                color: filter === f ? 'var(--navy)' : 'var(--slate)',
                fontSize: '0.75rem', fontFamily: 'var(--font-body)',
                fontWeight: filter === f ? 500 : 400,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              {f === 'All' ? `All Lines (${WIDGETY_OPERATORS.length})` : `${f} Cruises (${WIDGETY_OPERATORS.filter(o => o.cruiseType === f).length})`}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section style={{ background: 'var(--cream)', padding: '56px 32px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {filtered.map(op => {
              const isHovered = hovered === op.id;
              const imgFailed = imgErrors.has(op.id);
              return (
                <article
                  key={op.id}
                  onMouseEnter={() => setHovered(op.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    background: 'white',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    transform: isHovered ? 'translateY(-4px)' : 'none',
                    boxShadow: isHovered ? '0 12px 40px rgba(13,27,42,0.15)' : '0 2px 8px rgba(13,27,42,0.06)',
                  }}
                >
                  {/* Cover image */}
                  <div style={{ height: 200, position: 'relative', overflow: 'hidden', background: 'var(--navy)', flexShrink: 0 }}>
                    {!imgFailed ? (
                      <img
                        src={op.coverImage}
                        alt={op.title}
                        onError={() => setImgErrors(prev => new Set(prev).add(op.id))}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', opacity: 0.2 }}>🚢</div>
                    )}
                    {/* Cruise type badge */}
                    <div style={{ position: 'absolute', top: 12, right: 12, background: op.cruiseType === 'River' ? 'rgba(13,27,42,0.85)' : 'var(--gold)', padding: '4px 10px' }}>
                      <span style={{ fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: op.cruiseType === 'River' ? 'var(--gold)' : 'var(--navy)' }}>
                        {op.cruiseType}
                      </span>
                    </div>
                    {/* Logo overlay */}
                    <div style={{ position: 'absolute', bottom: 12, left: 12, width: 44, height: 44, background: 'rgba(255,255,255,0.92)', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
                      <img
                        src={op.profileImage}
                        alt={`${op.title} logo`}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        onError={e => { (e.currentTarget.parentElement as HTMLElement).style.display = 'none'; }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h2 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 400, color: 'var(--navy)', marginBottom: 8, lineHeight: 1.3 }}>
                      {op.title}
                    </h2>
                    <div style={{ fontSize: '0.78rem', color: 'var(--slate)', marginBottom: 20 }}>
                      {op.shipCount} ships · {op.cruiseType} cruises
                    </div>
                    <div style={{ flex: 1 }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <button
                        onClick={() => setSelectedOp(op)}
                        style={{
                          width: '100%', padding: '10px',
                          background: isHovered ? 'var(--navy)' : 'transparent',
                          color: isHovered ? 'white' : 'var(--navy)',
                          border: '1px solid var(--navy)',
                          fontSize: '0.68rem', fontWeight: 500,
                          letterSpacing: '0.1em', textTransform: 'uppercase',
                          fontFamily: 'var(--font-body)', cursor: 'pointer',
                          transition: 'all 0.25s',
                        }}
                      >
                        Explore Line
                      </button>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <Link
                          href={searchUrl(op)}
                          style={{
                            flex: 1, textAlign: 'center', padding: '9px 6px',
                            background: 'transparent', color: 'var(--slate)',
                            border: '1px solid rgba(13,27,42,0.2)',
                            fontSize: '0.65rem', fontWeight: 500,
                            letterSpacing: '0.08em', textTransform: 'uppercase',
                            textDecoration: 'none', fontFamily: 'var(--font-body)',
                            transition: 'all 0.25s',
                          }}
                        >
                          View Cruises
                        </Link>
                        <Link
                          href={quoteUrl(op)}
                          style={{
                            flex: 1, textAlign: 'center', padding: '9px 6px',
                            background: 'var(--gold)', color: 'var(--navy)',
                            border: '1px solid var(--gold)',
                            fontSize: '0.65rem', fontWeight: 600,
                            letterSpacing: '0.08em', textTransform: 'uppercase',
                            textDecoration: 'none', fontFamily: 'var(--font-body)',
                            transition: 'all 0.25s',
                          }}
                        >
                          Get Quote
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {selectedOp && typeof document !== 'undefined' && createPortal(
        <CruiseLineModal op={selectedOp} onClose={() => setSelectedOp(null)} />,
        document.body
      )}

      {/* CTA */}
      <section style={{ background: 'var(--navy)', padding: '64px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://assets.widgety.co.uk/2025/12/04/12/21/00/c3825a9a-0308-4bb3-861d-b58731138486/NCL Pearl in Miami ©Norwegian Cruise Line.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08 }} />
        <div style={{ position: 'relative', maxWidth: 560, margin: '0 auto' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Not Sure Which Line?</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: 'white', marginBottom: 16 }}>
            We'll Find the Perfect Match
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: 32 }}>
            Tell us your travel style, budget, and destinations — our specialists know every line inside and out.
          </p>
          <Link href="/request-quote" className="btn-primary" style={{ textDecoration: 'none' }}>
            Request a Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}

// ─── Cruise Line Detail Modal ─────────────────────────────────────────────────

type CruiseLineModalOp = typeof WIDGETY_OPERATORS[0];

function CruiseLineModal({ op, onClose }: { op: CruiseLineModalOp; onClose: () => void }) {
  const [detail, setDetail]   = useState<OperatorDetail | null>(null);
  const [holidays, setHolidays] = useState<SampleHoliday[]>([]);
  const [ships, setShips]     = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'about' | 'ships' | 'itineraries'>('about');

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    setLoading(true);
    setDetail(null); setHolidays([]); setShips([]);

    // Fetch operator detail, sample holidays and ships in parallel
    Promise.all([
      fetch(`/api/widgety/cruises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'operators' }),
      }).then(r => r.json()),
      fetch(`/api/widgety/cruises?operator=${op.id}&page=1`, {
        method: 'GET',
      }).then(r => r.json()),
      fetch(`/api/widgety/cruises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'ships', operators: op.id }),
      }).then(r => r.json()),
    ]).then(([opsData, holidaysData, shipsData]) => {
      // Find this operator in the full list
      const found = (opsData.operators || []).find((o: any) => o.id === op.id || o.slug === op.id);
      if (found) setDetail(found as OperatorDetail);
      setHolidays((holidaysData.holidays || holidaysData.cruises || []).slice(0, 6));
      setShips((shipsData.ships || []).slice(0, 8));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [op.id]);

  const stripHtml = (html: string) => html?.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() || '';

  const TABS = [
    { id: 'about' as const,       label: 'About' },
    { id: 'ships' as const,       label: `Ships${ships.length ? ` (${ships.length}+)` : ''}` },
    { id: 'itineraries' as const, label: `Itineraries${holidays.length ? ` (${holidays.length}+)` : ''}` },
  ];

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(7,14,24,0.88)',
        backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
        animation: 'clFadeIn 0.2s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'white',
          width: '100%', maxWidth: 860,
          maxHeight: '90vh',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
          animation: 'clSlideUp 0.25s ease',
        }}
      >
        {/* Hero header with cover image */}
        <div style={{ position: 'relative', height: 200, flexShrink: 0, overflow: 'hidden', background: 'var(--navy)' }}>
          <img
            src={op.coverImage}
            alt={op.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
            onError={e => { (e.target as HTMLElement).style.display = 'none'; }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(13,27,42,0.9) 40%, rgba(13,27,42,0.3))' }} />
          {/* Gold accent line */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--gold), transparent)' }} />

          <div style={{ position: 'absolute', inset: 0, padding: '24px 28px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {/* Logo */}
              <div style={{ width: 52, height: 52, background: 'rgba(255,255,255,0.95)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5, flexShrink: 0 }}>
                <img src={op.profileImage} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} onError={e => { (e.target as HTMLElement).parentElement!.style.display = 'none'; }} />
              </div>
              <div>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 4 }}>
                  {op.cruiseType} Cruises · {op.shipCount} Ships
                </div>
                <h2 className="font-display" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.75rem)', fontWeight: 300, color: 'white', margin: 0 }}>
                  {op.title}
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', width: 34, height: 34, cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, alignSelf: 'flex-start' }}
            >×</button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(13,27,42,0.1)', background: 'white', flexShrink: 0 }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '13px 22px', background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                fontFamily: 'var(--font-body)', transition: 'all 0.2s',
                borderBottom: activeTab === tab.id ? '2px solid var(--gold)' : '2px solid transparent',
                color: activeTab === tab.id ? 'var(--navy)' : 'var(--slate)',
                fontWeight: activeTab === tab.id ? 600 : 400,
              }}
            >{tab.label}</button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, gap: 12 }}>
              <div style={{ width: 32, height: 32, border: '2px solid rgba(13,27,42,0.15)', borderTopColor: 'var(--navy)', borderRadius: '50%', animation: 'clSpin 0.8s linear infinite' }} />
              <span style={{ fontSize: '0.8rem', color: 'var(--slate)' }}>Loading...</span>
            </div>
          ) : (
            <>
              {/* ── About tab ── */}
              {activeTab === 'about' && (
                <div style={{ padding: '28px 32px' }}>
                  {detail?.description && (
                    <div style={{ marginBottom: 24 }}>
                      <div style={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 10 }}>About</div>
                      <p style={{ fontSize: '0.9rem', color: 'var(--navy)', lineHeight: 1.8 }}>
                        {stripHtml(detail.description)}
                      </p>
                    </div>
                  )}
                  {detail?.reasons_to_book && (
                    <div style={{ marginBottom: 24, background: 'var(--cream)', padding: '20px 24px', borderLeft: '3px solid var(--gold)' }}>
                      <div style={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 10 }}>Why Sail With Them</div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--navy)', lineHeight: 1.8 }}>
                        {stripHtml(detail.reasons_to_book).slice(0, 600)}{stripHtml(detail.reasons_to_book).length > 600 ? '…' : ''}
                      </p>
                    </div>
                  )}
                  {/* Links row */}
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
                    {detail?.website_url && (
                      <a href={detail.website_url} target="_blank" rel="noopener noreferrer"
                        style={{ padding: '8px 16px', border: '1px solid rgba(13,27,42,0.2)', color: 'var(--navy)', textDecoration: 'none', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                        Official Website ↗
                      </a>
                    )}
                    {detail?.brochures?.[0]?.href && (
                      <a href={detail.brochures[0].href} target="_blank" rel="noopener noreferrer"
                        style={{ padding: '8px 16px', border: '1px solid rgba(13,27,42,0.2)', color: 'var(--navy)', textDecoration: 'none', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                        Download Brochure ↗
                      </a>
                    )}
                  </div>
                  {/* Quick stats */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                    {[
                      { label: 'Fleet Size', value: `${op.shipCount} ships` },
                      { label: 'Cruise Type', value: op.cruiseType },
                      { label: 'Available Voyages', value: holidays.length ? `${holidays.length}+ itineraries` : 'View on request' },
                    ].map((stat, i) => (
                      <div key={i} style={{ background: 'var(--cream)', padding: '14px 16px' }}>
                        <div style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 4 }}>{stat.label}</div>
                        <div style={{ fontSize: '1rem', color: 'var(--navy)', fontFamily: 'var(--font-display)', fontWeight: 300 }}>{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Ships tab ── */}
              {activeTab === 'ships' && (
                <div style={{ padding: '24px 32px' }}>
                  {ships.length === 0 ? (
                    <p style={{ color: 'var(--slate)', fontSize: '0.85rem', padding: '20px 0' }}>Ship information not available for this line.</p>
                  ) : (
                    <>
                      <p style={{ fontSize: '0.78rem', color: 'var(--slate)', marginBottom: 20 }}>
                        {op.title} operates {op.shipCount} ships. Showing {ships.length} from the fleet.
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
                        {ships.map((ship: any, i: number) => (
                          <div key={i} style={{ border: '1px solid rgba(13,27,42,0.1)', overflow: 'hidden', background: 'white' }}>
                            {ship.cover_image_href && (
                              <div style={{ height: 110, overflow: 'hidden', background: 'var(--cream)' }}>
                                <img
                                  src={ship.cover_image_href}
                                  alt={ship.title}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  onError={e => { (e.target as HTMLElement).parentElement!.style.background = 'var(--cream)'; (e.target as HTMLElement).style.display = 'none'; }}
                                />
                              </div>
                            )}
                            <div style={{ padding: '10px 12px' }}>
                              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy)', lineHeight: 1.3 }}>{ship.title}</div>
                              {ship.ship_type && (
                                <div style={{ fontSize: '0.62rem', color: 'var(--slate)', marginTop: 3, textTransform: 'capitalize' }}>{ship.ship_type} · {ship.size || ''}</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* ── Itineraries tab ── */}
              {activeTab === 'itineraries' && (
                <div style={{ padding: '24px 32px' }}>
                  {holidays.length === 0 ? (
                    <p style={{ color: 'var(--slate)', fontSize: '0.85rem', padding: '20px 0' }}>
                      No itineraries available. <Link href={`/cruises?operator=${op.id}`} style={{ color: 'var(--navy)' }}>Search all cruises →</Link>
                    </p>
                  ) : (
                    <>
                      <p style={{ fontSize: '0.78rem', color: 'var(--slate)', marginBottom: 20 }}>
                        Sample itineraries from {op.title}. <Link href={`/cruises?operator=${op.id}`} style={{ color: 'var(--navy)', fontWeight: 500 }}>View all {op.title} cruises →</Link>
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {holidays.map((h: any, i: number) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', border: '1px solid rgba(13,27,42,0.08)', background: i % 2 === 0 ? 'white' : 'var(--cream)', gap: 12 }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--navy)', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {h.name}
                              </div>
                              {h.date_from && (
                                <div style={{ fontSize: '0.68rem', color: 'var(--slate)', marginTop: 3 }}>
                                  {new Date(h.date_from).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                  {h.cruise_nights && ` · ${h.cruise_nights} nights`}
                                </div>
                              )}
                            </div>
                            <Link
                              href={`/cruises?operator=${op.id}`}
                              onClick={onClose}
                              style={{ padding: '7px 14px', background: 'transparent', border: '1px solid var(--navy)', color: 'var(--navy)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', flexShrink: 0 }}
                            >
                              Details
                            </Link>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid rgba(13,27,42,0.1)', padding: '14px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', flexShrink: 0, gap: 12, flexWrap: 'wrap' }}>
          <Link
            href={`/cruises?operator=${op.id}`}
            onClick={onClose}
            style={{ padding: '10px 20px', border: '1px solid var(--navy)', color: 'var(--navy)', textDecoration: 'none', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}
          >
            Search All {op.title} Cruises
          </Link>
          <Link
            href={`/request-quote?line=${encodeURIComponent(op.title)}&trip_type=${op.cruiseType === 'River' ? 'River+Cruise' : 'Cruise+Vacation'}`}
            onClick={onClose}
            style={{ padding: '10px 24px', background: 'var(--gold)', color: 'var(--navy)', textDecoration: 'none', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}
          >
            Get a Quote
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes clFadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes clSlideUp { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes clSpin    { to { transform: rotate(360deg) } }
      `}</style>
    </div>
  );
}
