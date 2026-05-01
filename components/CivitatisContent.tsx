"use client";
import ExcursionSearch from "@/components/ExcursionSearch";
import type { CuratedTour } from "@/components/ExcursionSearch";

const AG = "95950";
const civUrl = (path: string) => `https://www.civitatis.com/en${path}/?ag_aid=${AG}`;
const civSearch = (q: string) => `https://www.civitatis.com/en/s/?ag_aid=${AG}&q=${encodeURIComponent(q)}`;

const FEATURED_TOURS: CuratedTour[] = [
  { id:"civ-1", title:"Madrid: Prado Museum Guided Tour with Skip-the-Line Entry", description:"Explore one of the world's finest art collections with an expert guide. Admire masterpieces by Velázquez, Goya, and Rubens at the legendary Prado Museum with skip-the-line access included.", image:"https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80", rating:4.8, reviewCount:5821, price:28, currency:"USD", duration:"2h", destination:"Madrid, Spain", category:"Culture", freeCancellation:true, url:civUrl("/madrid/prado-museum-guided-tour"), badge:"Top Rated" },
  { id:"civ-2", title:"Barcelona: Free Walking Tour of the Gothic Quarter", description:"Discover the labyrinthine streets of Barcelona's ancient Gothic Quarter with a passionate local guide. Visit the Barcelona Cathedral, Plaça Reial, and hidden medieval squares on this pay-what-you-wish tour.", image:"https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=600&q=80", rating:4.7, reviewCount:9402, price:0, currency:"USD", duration:"2h", destination:"Barcelona, Spain", category:"Walking Tours", freeCancellation:true, url:civUrl("/barcelona/free-tour-gothic-quarter"), badge:"Free Tour" },
  { id:"civ-3", title:"Cancun: Chichen Itza, Cenote & Valladolid Day Trip", description:"Visit the iconic Pyramid of El Castillo at Chichen Itza, swim in a beautiful cenote, and explore the colorful colonial town of Valladolid. Includes transport, guide, and lunch.", image:"https://images.unsplash.com/photo-1518638150340-f706e86654de?w=600&q=80", rating:4.8, reviewCount:7103, price:79, currency:"USD", duration:"12h", destination:"Cancun, Mexico", category:"Day Trips", freeCancellation:true, url:civUrl("/cancun/chichen-itza-cenote-valladolid"), badge:"Best Seller" },
  { id:"civ-4", title:"Lisbon: Sintra & Cascais Full Day Tour", description:"Journey to the fairy-tale palaces of Sintra and the stunning Atlantic coastline at Cascais. Visit Pena Palace, the Moorish Castle, and enjoy fresh seafood on the Estoril coast.", image:"https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=80", rating:4.7, reviewCount:6234, price:45, currency:"USD", duration:"8h", destination:"Lisbon, Portugal", category:"Day Trips", freeCancellation:true, url:civUrl("/lisbon/sintra-cascais-day-trip") },
  { id:"civ-5", title:"Buenos Aires: Tango Show & Dinner at El Viejo Almacén", description:"Experience the passion of authentic Argentine tango at the historic El Viejo Almacén theater. Enjoy a traditional dinner with wine before watching world-class tango dancers perform.", image:"https://images.unsplash.com/photo-1612294037637-ec328d0e075e?w=600&q=80", rating:4.9, reviewCount:3821, price:89, currency:"USD", duration:"3h", destination:"Buenos Aires, Argentina", category:"Culture", freeCancellation:false, url:civUrl("/buenos-aires/tango-show-dinner"), badge:"Top Rated" },
  { id:"civ-6", title:"Cusco: Sacred Valley & Machu Picchu 2-Day Tour", description:"Visit the magnificent Inca citadel of Machu Picchu and explore the Sacred Valley of the Incas. Includes train journey on the Vistadome, guided tour, and overnight accommodation.", image:"https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&q=80", rating:4.9, reviewCount:4512, price:245, currency:"USD", duration:"2 days", destination:"Cusco, Peru", category:"Day Trips", freeCancellation:true, url:civUrl("/cusco/sacred-valley-machu-picchu-2-days"), badge:"Top Rated" },
  { id:"civ-7", title:"Cozumel: Tulum Express & Cenote Swimming", description:"Discover the ancient Mayan fortress of Tulum overlooking the turquoise Caribbean Sea, then cool off in a crystal-clear cenote. Perfect for cruise ship passengers — guaranteed return before departure.", image:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80", rating:4.7, reviewCount:2987, price:65, currency:"USD", duration:"6h", destination:"Cozumel, Mexico", category:"Day Trips", freeCancellation:true, url:civUrl("/cozumel/tulum-cenote-tour") },
  { id:"civ-8", title:"Seville: Flamenco Show at Tablao El Arenal", description:"Witness authentic Andalusian flamenco at one of Seville's most prestigious tablaos. Professional dancers, singers, and guitarists perform in an intimate setting with optional dinner and drinks.", image:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", rating:4.8, reviewCount:5102, price:35, currency:"USD", duration:"1.5h", destination:"Seville, Spain", category:"Culture", freeCancellation:false, url:civUrl("/seville/flamenco-show-tablao-el-arenal"), badge:"Fan Favorite" },
  { id:"civ-9", title:"Nassau: Blue Lagoon Island Dolphin Encounter", description:"Swim with friendly dolphins at the stunning Blue Lagoon Island just off Nassau. Interact in shallow water, learn from expert trainers, and enjoy the island's pristine beaches.", image:"https://images.unsplash.com/photo-1564415637254-92c66292cd64?w=600&q=80", rating:4.8, reviewCount:3201, price:119, currency:"USD", duration:"5h", destination:"Nassau, Bahamas", category:"Water & Beach", freeCancellation:true, url:civUrl("/nassau/dolphin-encounter-blue-lagoon") },
  { id:"civ-10", title:"Rio de Janeiro: Christ the Redeemer & Sugarloaf Half Day", description:"Visit two of Rio's most iconic landmarks in one unforgettable half day. Ride the cog train to Christ the Redeemer, then ascend Sugarloaf Mountain by cable car for breathtaking views.", image:"https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80", rating:4.7, reviewCount:4892, price:58, currency:"USD", duration:"5h", destination:"Rio de Janeiro, Brazil", category:"Culture", freeCancellation:true, url:civUrl("/rio-de-janeiro/christ-redeemer-sugarloaf") },
  { id:"civ-11", title:"Mexico City: Teotihuacan Pyramids & Tlatelolco Tour", description:"Climb the Pyramid of the Sun and Moon at the ancient city of Teotihuacan, one of the largest pre-Columbian cities in the Americas. Includes the Plaza of Three Cultures.", image:"https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=600&q=80", rating:4.6, reviewCount:6103, price:38, currency:"USD", duration:"8h", destination:"Mexico City, Mexico", category:"Culture", freeCancellation:true, url:civUrl("/mexico-city/teotihuacan-pyramids-tour") },
  { id:"civ-12", title:"Cartagena: Old City & Rosario Islands Boat Day", description:"Explore the colorful colonial walls of Cartagena's UNESCO historic center in the morning, then set sail to the crystal-clear Rosario Islands for snorkeling and beach time.", image:"https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&q=80", rating:4.7, reviewCount:2341, price:75, currency:"USD", duration:"Full day", destination:"Cartagena, Colombia", category:"Water & Beach", freeCancellation:true, url:civUrl("/cartagena/old-city-rosario-islands") },
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

export default function CivitatisContent() {
  return (
    <ExcursionSearch
      tours={FEATURED_TOURS}
      accentColor="#1a7f5a"
      searchUrl={civSearch}
      searchPlaceholder="e.g. Seville, Bogota, Playa del Carmen, Marrakech..."
      cruisePorts={CRUISE_PORTS}
      categories={CATEGORIES}
      providerName="Civitatis"
    />
  );
}
