import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ExcursionSearch from "@/components/ExcursionSearch";
import type { CuratedTour } from "@/components/ExcursionSearch";

export const metadata: Metadata = {
  title: "Civitatis Tours & Activities | Crestwell Travel Services",
  description: "Browse top-rated tours through Civitatis — best for Latin America, Spain, Portugal, and free cancellation options worldwide.",
};

const AG = "95950";
const civUrl = (path: string) => `https://www.civitatis.com/en${path}/?ag_aid=${AG}`;
const civSearch = (q: string) => `https://www.civitatis.com/en/s/?ag_aid=${AG}&q=${encodeURIComponent(q)}`;

const FEATURED_TOURS: CuratedTour[] = [
  { id:"civ-1", title:"Madrid: Prado Museum Guided Tour with Skip-the-Line Entry", description:"Explore one of the world\'s finest art collections with an expert guide. Admire masterpieces by Velázquez, Goya, and Rubens at the legendary Prado Museum with skip-the-line access included.", image:"https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80", rating:4.8, reviewCount:5821, price:28, currency:"USD", duration:"2h", destination:"Madrid, Spain", category:"Culture", freeCancellation:true, url:civUrl("/madrid/prado-museum-guided-tour"), badge:"Top Rated" },
  { id:"civ-2", title:"Barcelona: Free Walking Tour of the Gothic Quarter", description:"Discover the labyrinthine streets of Barcelona\'s ancient Gothic Quarter with a passionate local guide. Visit the Barcelona Cathedral, Plaça Reial, and hidden medieval squares on this pay-what-you-wish tour.", image:"https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=600&q=80", rating:4.7, reviewCount:9402, price:0, currency:"USD", duration:"2h", destination:"Barcelona, Spain", category:"Walking Tours", freeCancellation:true, url:civUrl("/barcelona/free-tour-gothic-quarter"), badge:"Free Tour" },
  { id:"civ-3", title:"Cancun: Chichen Itza, Cenote & Valladolid Day Trip", description:"Visit the iconic Pyramid of El Castillo at Chichen Itza, swim in a beautiful cenote, and explore the colorful colonial town of Valladolid. Includes transport, guide, and lunch.", image:"https://images.unsplash.com/photo-1518638150340-f706e86654de?w=600&q=80", rating:4.8, reviewCount:7103, price:79, currency:"USD", duration:"12h", destination:"Cancun, Mexico", category:"Day Trips", freeCancellation:true, url:civUrl("/cancun/chichen-itza-cenote-valladolid"), badge:"Best Seller" },
  { id:"civ-4", title:"Lisbon: Sintra & Cascais Full Day Tour", description:"Journey to the fairy-tale palaces of Sintra and the stunning Atlantic coastline at Cascais. Visit Pena Palace, the Moorish Castle, and enjoy fresh seafood on the Estoril coast.", image:"https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=80", rating:4.7, reviewCount:6234, price:45, currency:"USD", duration:"8h", destination:"Lisbon, Portugal", category:"Day Trips", freeCancellation:true, url:civUrl("/lisbon/sintra-cascais-day-trip") },
  { id:"civ-5", title:"Buenos Aires: Tango Show & Dinner at El Viejo Almacén", description:"Experience the passion of authentic Argentine tango at the historic El Viejo Almacén theater. Enjoy a traditional dinner with wine before watching world-class tango dancers perform.", image:"https://images.unsplash.com/photo-1612294037637-ec328d0e075e?w=600&q=80", rating:4.9, reviewCount:3821, price:89, currency:"USD", duration:"3h", destination:"Buenos Aires, Argentina", category:"Culture", freeCancellation:false, url:civUrl("/buenos-aires/tango-show-dinner"), badge:"Top Rated" },
  { id:"civ-6", title:"Cusco: Sacred Valley & Machu Picchu 2-Day Tour", description:"Visit the magnificent Inca citadel of Machu Picchu and explore the Sacred Valley of the Incas. Includes train journey on the Vistadome, guided tour, and overnight accommodation.", image:"https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&q=80", rating:4.9, reviewCount:4512, price:245, currency:"USD", duration:"2 days", destination:"Cusco, Peru", category:"Day Trips", freeCancellation:true, url:civUrl("/cusco/sacred-valley-machu-picchu-2-days"), badge:"Top Rated" },
  { id:"civ-7", title:"Cozumel: Tulum Express & Cenote Swimming", description:"Discover the ancient Mayan fortress of Tulum overlooking the turquoise Caribbean Sea, then cool off in a crystal-clear cenote. Perfect for cruise ship passengers — guaranteed return before departure.", image:"https://images.unsplash.com/photo-1604537372136-89b3dae196e3?w=600&q=80", rating:4.7, reviewCount:2987, price:65, currency:"USD", duration:"6h", destination:"Cozumel, Mexico", category:"Day Trips", freeCancellation:true, url:civUrl("/cozumel/tulum-cenote-tour") },
  { id:"civ-8", title:"Seville: Flamenco Show at Tablao El Arenal", description:"Witness authentic Andalusian flamenco at one of Seville\'s most prestigious tablaos. Professional dancers, singers, and guitarists perform in an intimate setting with optional dinner and drinks.", image:"https://images.unsplash.com/photo-1542973570-c58d09fe0b16?w=600&q=80", rating:4.8, reviewCount:5102, price:35, currency:"USD", duration:"1.5h", destination:"Seville, Spain", category:"Culture", freeCancellation:false, url:civUrl("/seville/flamenco-show-tablao-el-arenal"), badge:"Fan Favorite" },
  { id:"civ-9", title:"Nassau: Blue Lagoon Island Dolphin Encounter", description:"Swim with friendly dolphins at the stunning Blue Lagoon Island just off Nassau. Interact in shallow water, learn from expert trainers, and enjoy the island\'s pristine beaches — perfect for all ages.", image:"https://images.unsplash.com/photo-1564415637254-92c66292cd64?w=600&q=80", rating:4.8, reviewCount:3201, price:119, currency:"USD", duration:"5h", destination:"Nassau, Bahamas", category:"Water & Beach", freeCancellation:true, url:civUrl("/nassau/dolphin-encounter-blue-lagoon") },
  { id:"civ-10", title:"Rio de Janeiro: Christ the Redeemer & Sugarloaf Half Day", description:"Visit two of Rio\'s most iconic landmarks in one unforgettable half day. Ride the iconic cog train to the feet of Christ the Redeemer, then ascend Sugarloaf Mountain by cable car for breathtaking views.", image:"https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80", rating:4.7, reviewCount:4892, price:58, currency:"USD", duration:"5h", destination:"Rio de Janeiro, Brazil", category:"Culture", freeCancellation:true, url:civUrl("/rio-de-janeiro/christ-redeemer-sugarloaf") },
  { id:"civ-11", title:"Mexico City: Teotihuacan Pyramids & Tlatelolco Tour", description:"Climb the Pyramid of the Sun and Moon at the ancient city of Teotihuacan, one of the largest pre-Columbian cities in the Americas. Includes the Plaza of Three Cultures at Tlatelolco.", image:"https://images.unsplash.com/photo-1518638150340-f706e86654de?w=600&q=80", rating:4.6, reviewCount:6103, price:38, currency:"USD", duration:"8h", destination:"Mexico City, Mexico", category:"Culture", freeCancellation:true, url:civUrl("/mexico-city/teotihuacan-pyramids-tour") },
  { id:"civ-12", title:"Cartagena: Old City & Rosario Islands Boat Day", description:"Explore the colorful colonial walls of Cartagena\'s UNESCO historic center in the morning, then set sail to the crystal-clear waters of the Rosario Islands for snorkeling and beach time.", image:"https://images.unsplash.com/photo-1562618817-253e2a3b4c3f?w=600&q=80", rating:4.7, reviewCount:2341, price:75, currency:"USD", duration:"Full day", destination:"Cartagena, Colombia", category:"Water & Beach", freeCancellation:true, url:civUrl("/cartagena/old-city-rosario-islands") },
];

const CRUISE_PORTS = [
  { label: "Nassau, Bahamas", url: civUrl("/nassau") },
  { label: "Cozumel, Mexico", url: civUrl("/cozumel") },
  { label: "Cancun, Mexico", url: civUrl("/cancun") },
  { label: "Cartagena, Colombia", url: civUrl("/cartagena") },
  { label: "Costa Maya", url: civUrl("/costa-maya") },
  { label: "Roatan, Honduras", url: civUrl("/roatan") },
  { label: "Barcelona, Spain", url: civUrl("/barcelona") },
  { label: "Lisbon, Portugal", url: civUrl("/lisbon") },
  { label: "Rome, Italy", url: civUrl("/rome") },
  { label: "Seville, Spain", url: civUrl("/seville") },
  { label: "Madrid, Spain", url: civUrl("/madrid") },
  { label: "Buenos Aires", url: civUrl("/buenos-aires") },
];

const CATEGORIES = [
  { label: "Free Tours", url: civSearch("free tour") },
  { label: "Day Trips", url: civSearch("day trip") },
  { label: "Culture", url: civSearch("cultural tour") },
  { label: "Walking Tours", url: civSearch("walking tour") },
  { label: "Water & Beach", url: civSearch("snorkel beach") },
  { label: "Food Tours", url: civSearch("food tour") },
  { label: "Flamenco Shows", url: civSearch("flamenco") },
  { label: "Private Tours", url: civSearch("private tour") },
];

export default function CivitatisPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Excursions", href: "/excursions" }, { name: "Civitatis" }]} />

      <section style={{ background: "var(--navy)", padding: "48px 32px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#1a7f5a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "white", fontSize: "1.2rem", fontWeight: 700, fontFamily: "var(--font-body)" }}>C</span>
              </div>
              <div>
                <h1 className="font-display" style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 300, color: "white", margin: 0 }}>Civitatis Tours & Activities</h1>
                <span style={{ fontSize: "0.72rem", color: "#1a7f5a", background: "rgba(26,127,90,0.2)", border: "1px solid rgba(26,127,90,0.4)", padding: "2px 10px", borderRadius: 20, fontFamily: "var(--font-body)", fontWeight: 600 }}>Free Cancellation Leader</span>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem", maxWidth: 500, lineHeight: 1.75, margin: 0, fontFamily: "var(--font-body)" }}>
              70,000+ activities across 160+ countries. The top choice for Latin America, Spain, and Portugal — with free cancellation on thousands of tours.
            </p>
          </div>
          <Link href="/excursions" style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", padding: "8px 18px", textDecoration: "none", fontFamily: "var(--font-body)", fontSize: "0.8rem", borderRadius: 4 }}>← All Platforms</Link>
        </div>
      </section>

      <section style={{ background: "white", padding: "48px 32px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ExcursionSearch
            tours={FEATURED_TOURS}
            accentColor="#1a7f5a"
            searchUrl={civSearch}
            searchPlaceholder="e.g. Seville, Bogota, Playa del Carmen, Marrakech..."
            cruisePorts={CRUISE_PORTS}
            categories={CATEGORIES}
            providerName="Civitatis"
          />
        </div>
      </section>

      <section style={{ background: "#f0faf6", borderTop: "3px solid #1a7f5a", padding: "40px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
          {[
            { icon: "🔄", title: "Free Cancellation", desc: "Thousands of tours with generous free cancellation" },
            { icon: "🌎", title: "Latin America Leader", desc: "Unmatched coverage across Mexico, Central & South America" },
            { icon: "💰", title: "Best Prices", desc: "Competitive pricing including many free walking tours" },
            { icon: "🗣️", title: "Multilingual", desc: "Spanish, English, Portuguese tours available" },
          ].map(f => (
            <div key={f.title} style={{ textAlign: "center", padding: "16px" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1a7f5a", marginBottom: 4, fontFamily: "var(--font-body)" }}>{f.title}</div>
              <div style={{ fontSize: "0.82rem", color: "var(--slate)", lineHeight: 1.6, fontFamily: "var(--font-body)" }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
