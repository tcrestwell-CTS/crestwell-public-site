import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ExcursionSearch from "@/components/ExcursionSearch";
import type { CuratedTour } from "@/components/ExcursionSearch";

export const metadata: Metadata = {
  title: "GetYourGuide Experiences | Crestwell Travel Services",
  description: "Browse top-rated tours and experiences through GetYourGuide — best for city tours, skip-the-line access, and European destinations.",
};

const GYG_P = "partner_id=IOXL78H&cmp=share_to_earn";
const gygSearch = (q: string) => `https://www.getyourguide.com/s/?${GYG_P}&q=${encodeURIComponent(q)}`;
const gygUrl = (path: string) => `https://www.getyourguide.com${path}?${GYG_P}`;

const FEATURED_TOURS: CuratedTour[] = [
  { id:"gyg-1", title:"Skip-the-Line: Colosseum, Roman Forum & Palatine Hill", description:"Skip the long queues and explore ancient Rome with a knowledgeable guide. See the iconic Colosseum arena floor, the Roman Forum, and sweeping views from Palatine Hill. One of the most popular experiences in Italy.", image:"https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80", rating:4.7, reviewCount:12483, price:49, currency:"USD", duration:"3h", destination:"Rome, Italy", category:"Skip-the-Line", freeCancellation:true, url:gygUrl("/rome-l33/colosseum-d10271/"), badge:"Best Seller" },
  { id:"gyg-2", title:"Eiffel Tower: Summit or 2nd Floor Access with Host", description:"Ascend the iconic Eiffel Tower with a dedicated host to guide your visit. Choose summit or 2nd floor access and enjoy panoramic views across Paris. Skip the ticket lines and make the most of your time.", image:"https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600&q=80", rating:4.6, reviewCount:8921, price:38, currency:"USD", duration:"1.5h", destination:"Paris, France", category:"Skip-the-Line", freeCancellation:true, url:gygUrl("/paris-l16/eiffel-tower-d891/") },
  { id:"gyg-3", title:"Alhambra Palace & Generalife Gardens Guided Tour", description:"Discover the breathtaking Nasrid Palaces, lush Generalife Gardens, and Alcazaba fortress with an expert guide. Limited daily entry makes advance booking essential for this UNESCO World Heritage site.", image:"https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=600&q=80", rating:4.8, reviewCount:6204, price:55, currency:"USD", duration:"3h", destination:"Granada, Spain", category:"Culture", freeCancellation:false, url:gygUrl("/granada-l178/alhambra-d2027/"), badge:"Top Rated" },
  { id:"gyg-4", title:"Athens: Acropolis & Museum Skip-the-Line Guided Tour", description:"Walk in the footsteps of ancient Greeks with a certified archaeologist guide. Visit the Parthenon, Erechtheion, and the world-class Acropolis Museum with skip-the-line access.", image:"https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&q=80", rating:4.7, reviewCount:9345, price:42, currency:"USD", duration:"4h", destination:"Athens, Greece", category:"Skip-the-Line", freeCancellation:true, url:gygUrl("/athens-l91/acropolis-d2687/") },
  { id:"gyg-5", title:"Amsterdam: Canal Cruise with Open Bar", description:"Float through Amsterdam\'s iconic canals on a comfortable boat with an open bar included. Pass the famous Anne Frank House, the Jordaan district, and historic houseboats as your guide shares the city\'s story.", image:"https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&q=80", rating:4.5, reviewCount:7812, price:29, currency:"USD", duration:"1.5h", destination:"Amsterdam", category:"Boat Tours", freeCancellation:true, url:gygUrl("/amsterdam-l36/canal-cruise-d2801/") },
  { id:"gyg-6", title:"Barcelona: Sagrada Família Skip-the-Line Entry", description:"Enter Gaudí\'s masterpiece without the queues. Marvel at the awe-inspiring interior, colored glass windows, and climb the towers for panoramic city views. Audio guide included.", image:"https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=600&q=80", rating:4.8, reviewCount:15621, price:35, currency:"USD", duration:"1.5h", destination:"Barcelona, Spain", category:"Skip-the-Line", freeCancellation:false, url:gygUrl("/barcelona-l45/sagrada-familia-d234/"), badge:"Most Popular" },
  { id:"gyg-7", title:"Santorini: Caldera Sunset Catamaran Cruise", description:"Sail around the stunning caldera on a private catamaran as the sun sets over the Aegean Sea. Swim at volcanic hot springs, snorkel at Red Beach, and enjoy a BBQ dinner with open bar.", image:"https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80", rating:4.9, reviewCount:4231, price:115, currency:"USD", duration:"5h", destination:"Santorini, Greece", category:"Boat Tours", freeCancellation:true, url:gygUrl("/santorini-l261/catamaran-d2547/"), badge:"Top Rated" },
  { id:"gyg-8", title:"London: Tower of London & Crown Jewels Guided Tour", description:"Explore 1,000 years of British royal history with an expert guide. See the dazzling Crown Jewels, learn about prisoners and executions, and meet the famous Tower Ravens.", image:"https://images.unsplash.com/photo-1587985064135-0366536eab42?w=600&q=80", rating:4.6, reviewCount:5678, price:32, currency:"USD", duration:"2.5h", destination:"London, England", category:"Culture", freeCancellation:true, url:gygUrl("/london-l25/tower-of-london-d2233/") },
  { id:"gyg-9", title:"Nassau, Bahamas: Snorkel & Stingray Adventure", description:"Snorkel over colorful coral reefs teeming with tropical fish, then swim with friendly southern stingrays in their natural habitat. Perfect for cruise ship passengers with limited time ashore.", image:"https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=600&q=80", rating:4.7, reviewCount:3201, price:65, currency:"USD", duration:"3h", destination:"Nassau, Bahamas", category:"Water & Beach", freeCancellation:true, url:gygUrl("/nassau-l4449/snorkel-stingray-d3021/") },
  { id:"gyg-10", title:"Dubrovnik: Game of Thrones & City Walls Walking Tour", description:"Follow in the footsteps of Cersei and Tyrion on this unforgettable tour of King\'s Landing — a.k.a. Dubrovnik. Walk the ancient city walls and hear stories from the show and the city\'s real history.", image:"https://images.unsplash.com/photo-1555990793-da11153b2473?w=600&q=80", rating:4.8, reviewCount:2987, price:28, currency:"USD", duration:"2h", destination:"Dubrovnik, Croatia", category:"Walking Tours", freeCancellation:true, url:gygUrl("/dubrovnik-l262/game-of-thrones-d2987/") },
  { id:"gyg-11", title:"Florence: Uffizi Gallery Skip-the-Line Tour", description:"See Botticelli\'s Birth of Venus, da Vinci masterpieces, and Michelangelo\'s works with an art historian guide. Skip the notoriously long lines at one of the world\'s finest art museums.", image:"https://images.unsplash.com/photo-1541370976299-4d24be63e9d3?w=600&q=80", rating:4.7, reviewCount:8102, price:58, currency:"USD", duration:"2h", destination:"Florence, Italy", category:"Skip-the-Line", freeCancellation:false, url:gygUrl("/florence-l140/uffizi-d456/") },
  { id:"gyg-12", title:"Cozumel: Tulum Ruins & Cenote Swimming Day Trip", description:"Journey to the ancient Mayan city of Tulum perched on a Caribbean cliff, then cool off in a crystal-clear cenote. Includes round-trip transport, entrance fees, and a local guide.", image:"https://images.unsplash.com/photo-1604537372136-89b3dae196e3?w=600&q=80", rating:4.6, reviewCount:4521, price:89, currency:"USD", duration:"8h", destination:"Cozumel, Mexico", category:"Day Trips", freeCancellation:true, url:gygUrl("/cozumel-l22370/tulum-cenote-d5610/") },
];

const CRUISE_PORTS = [
  { label: "Nassau, Bahamas", url: gygUrl("/nassau-l4449/") },
  { label: "Cozumel", url: gygUrl("/cozumel-l22370/") },
  { label: "St. Thomas", url: gygUrl("/st-thomas-l4499/") },
  { label: "Grand Cayman", url: gygUrl("/grand-cayman-l4452/") },
  { label: "St. Maarten", url: gygUrl("/st-maarten-l4456/") },
  { label: "Rome (Civitavecchia)", url: gygUrl("/rome-l33/") },
  { label: "Barcelona", url: gygUrl("/barcelona-l45/") },
  { label: "Athens (Piraeus)", url: gygUrl("/athens-l91/") },
  { label: "Dubrovnik", url: gygUrl("/dubrovnik-l262/") },
  { label: "Venice", url: gygUrl("/venice-l174/") },
  { label: "Santorini", url: gygUrl("/santorini-l261/") },
  { label: "Juneau", url: gygSearch("juneau alaska") },
];

const CATEGORIES = [
  { label: "Skip-the-Line", url: gygSearch("skip the line") },
  { label: "Walking Tours", url: gygSearch("walking tour") },
  { label: "Day Trips", url: gygSearch("day trip") },
  { label: "Boat Tours", url: gygSearch("boat tour") },
  { label: "Food & Wine", url: gygSearch("food wine tasting") },
  { label: "Culture", url: gygSearch("cultural tour") },
  { label: "Water & Beach", url: gygSearch("snorkel beach") },
  { label: "Private Tours", url: gygSearch("private tour") },
];

export default function GetYourGuidePage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Excursions", href: "/excursions" }, { name: "GetYourGuide" }]} />

      <section style={{ background: "var(--navy)", padding: "48px 32px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#C0392B", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "white", fontSize: "1.2rem", fontWeight: 700, fontFamily: "var(--font-body)" }}>G</span>
              </div>
              <div>
                <h1 className="font-display" style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 300, color: "white", margin: 0 }}>GetYourGuide Experiences</h1>
                <span style={{ fontSize: "0.72rem", color: "#C0392B", background: "rgba(192,57,43,0.2)", border: "1px solid rgba(192,57,43,0.4)", padding: "2px 10px", borderRadius: 20, fontFamily: "var(--font-body)", fontWeight: 600 }}>Skip-the-Line Specialists</span>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem", maxWidth: 500, lineHeight: 1.75, margin: 0, fontFamily: "var(--font-body)" }}>
              200,000+ curated experiences. Europe&apos;s #1 platform for city tours, museum entry, and skip-the-line access to the world&apos;s top landmarks.
            </p>
          </div>
          <Link href="/excursions" style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", padding: "8px 18px", textDecoration: "none", fontFamily: "var(--font-body)", fontSize: "0.8rem", borderRadius: 4 }}>← All Platforms</Link>
        </div>
      </section>

      <section style={{ background: "white", padding: "48px 32px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ExcursionSearch
            tours={FEATURED_TOURS}
            accentColor="#C0392B"
            searchUrl={gygSearch}
            searchPlaceholder="e.g. Santorini, Dubrovnik, Kyoto, Lisbon..."
            cruisePorts={CRUISE_PORTS}
            categories={CATEGORIES}
            providerName="GetYourGuide"
          />
        </div>
      </section>

      <section style={{ background: "#fff5f4", borderTop: "3px solid #C0392B", padding: "40px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
          {[
            { icon: "⚡", title: "Skip-the-Line", desc: "Priority entry at the world\'s most visited landmarks" },
            { icon: "🎯", title: "Curated Quality", desc: "Vetted local guides and top-rated operators" },
            { icon: "🇪🇺", title: "Europe\'s Best", desc: "Unmatched coverage across European cities" },
            { icon: "🔄", title: "Flexible Booking", desc: "Free cancellation on thousands of experiences" },
          ].map(f => (
            <div key={f.title} style={{ textAlign: "center", padding: "16px" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#C0392B", marginBottom: 4, fontFamily: "var(--font-body)" }}>{f.title}</div>
              <div style={{ fontSize: "0.82rem", color: "var(--slate)", lineHeight: 1.6, fontFamily: "var(--font-body)" }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
