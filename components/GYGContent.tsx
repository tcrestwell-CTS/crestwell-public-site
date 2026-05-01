"use client";
import ExcursionSearch from "@/components/ExcursionSearch";
import type { CuratedTour } from "@/components/ExcursionSearch";

const GYG_P = "partner_id=IOXL78H&cmp=share_to_earn";
const gygSearch = (q: string) => `https://www.getyourguide.com/s/?${GYG_P}&q=${encodeURIComponent(q)}`;
const gygUrl = (path: string) => `https://www.getyourguide.com${path}?${GYG_P}`;

const FEATURED_TOURS: CuratedTour[] = [
  { id:"gyg-1", title:"Skip-the-Line: Colosseum, Roman Forum & Palatine Hill", description:"Skip the long queues and explore ancient Rome with a knowledgeable guide. See the iconic Colosseum arena floor, the Roman Forum, and sweeping views from Palatine Hill. One of the most popular experiences in Italy.", image:"https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80", rating:4.7, reviewCount:12483, price:49, currency:"USD", duration:"3h", destination:"Rome, Italy", category:"Skip-the-Line", freeCancellation:true, url:gygUrl("/rome-l33/colosseum-d10271/"), badge:"Best Seller" },
  { id:"gyg-2", title:"Eiffel Tower: Summit or 2nd Floor Access with Host", description:"Ascend the iconic Eiffel Tower with a dedicated host to guide your visit. Choose summit or 2nd floor access and enjoy panoramic views across Paris. Skip the ticket lines and make the most of your time.", image:"https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600&q=80", rating:4.6, reviewCount:8921, price:38, currency:"USD", duration:"1.5h", destination:"Paris, France", category:"Skip-the-Line", freeCancellation:true, url:gygUrl("/paris-l16/eiffel-tower-d891/") },
  { id:"gyg-3", title:"Alhambra Palace & Generalife Gardens Guided Tour", description:"Discover the breathtaking Nasrid Palaces, lush Generalife Gardens, and Alcazaba fortress with an expert guide. Limited daily entry makes advance booking essential for this UNESCO World Heritage site.", image:"https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=600&q=80", rating:4.8, reviewCount:6204, price:55, currency:"USD", duration:"3h", destination:"Granada, Spain", category:"Culture", freeCancellation:false, url:gygUrl("/granada-l178/alhambra-d2027/"), badge:"Top Rated" },
  { id:"gyg-4", title:"Athens: Acropolis & Museum Skip-the-Line Guided Tour", description:"Walk in the footsteps of ancient Greeks with a certified archaeologist guide. Visit the Parthenon, Erechtheion, and the Acropolis Museum with skip-the-line access.", image:"https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&q=80", rating:4.7, reviewCount:9345, price:42, currency:"USD", duration:"4h", destination:"Athens, Greece", category:"Skip-the-Line", freeCancellation:true, url:gygUrl("/athens-l91/acropolis-d2687/") },
  { id:"gyg-5", title:"Amsterdam: Canal Cruise with Open Bar", description:"Float through Amsterdam's iconic canals on a comfortable boat with an open bar included. Pass the famous Anne Frank House, the Jordaan district, and historic houseboats.", image:"https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&q=80", rating:4.5, reviewCount:7812, price:29, currency:"USD", duration:"1.5h", destination:"Amsterdam", category:"Boat Tours", freeCancellation:true, url:gygUrl("/amsterdam-l36/canal-cruise-d2801/") },
  { id:"gyg-6", title:"Barcelona: Sagrada Família Skip-the-Line Entry", description:"Enter Gaudí's masterpiece without the queues. Marvel at the awe-inspiring interior, colored glass windows, and climb the towers for panoramic city views. Audio guide included.", image:"https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=600&q=80", rating:4.8, reviewCount:15621, price:35, currency:"USD", duration:"1.5h", destination:"Barcelona, Spain", category:"Skip-the-Line", freeCancellation:false, url:gygUrl("/barcelona-l45/sagrada-familia-d234/"), badge:"Most Popular" },
  { id:"gyg-7", title:"Santorini: Caldera Sunset Catamaran Cruise", description:"Sail around the stunning caldera on a private catamaran as the sun sets over the Aegean Sea. Swim at volcanic hot springs, snorkel at Red Beach, and enjoy a BBQ dinner with open bar.", image:"https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80", rating:4.9, reviewCount:4231, price:115, currency:"USD", duration:"5h", destination:"Santorini, Greece", category:"Boat Tours", freeCancellation:true, url:gygUrl("/santorini-l261/catamaran-d2547/"), badge:"Top Rated" },
  { id:"gyg-8", title:"London: Tower of London & Crown Jewels Guided Tour", description:"Explore 1,000 years of British royal history with an expert guide. See the dazzling Crown Jewels, learn about prisoners and executions, and meet the famous Tower Ravens.", image:"https://images.unsplash.com/photo-1587985064135-0366536eab42?w=600&q=80", rating:4.6, reviewCount:5678, price:32, currency:"USD", duration:"2.5h", destination:"London, England", category:"Culture", freeCancellation:true, url:gygUrl("/london-l25/tower-of-london-d2233/") },
  { id:"gyg-9", title:"Nassau, Bahamas: Snorkel & Stingray Adventure", description:"Snorkel over colorful coral reefs teeming with tropical fish, then swim with friendly southern stingrays in their natural habitat. Perfect for cruise ship passengers.", image:"https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=80", rating:4.7, reviewCount:3201, price:65, currency:"USD", duration:"3h", destination:"Nassau, Bahamas", category:"Water & Beach", freeCancellation:true, url:gygUrl("/nassau-l4449/snorkel-stingray-d3021/") },
  { id:"gyg-10", title:"Dubrovnik: Game of Thrones & City Walls Walking Tour", description:"Follow in the footsteps of Cersei and Tyrion on this unforgettable tour of King's Landing. Walk the ancient city walls and hear stories from the show and the city's real history.", image:"https://images.unsplash.com/photo-1555990793-da11153b2473?w=600&q=80", rating:4.8, reviewCount:2987, price:28, currency:"USD", duration:"2h", destination:"Dubrovnik, Croatia", category:"Walking Tours", freeCancellation:true, url:gygUrl("/dubrovnik-l262/game-of-thrones-d2987/") },
  { id:"gyg-11", title:"Florence: Uffizi Gallery Skip-the-Line Tour", description:"See Botticelli's Birth of Venus, da Vinci masterpieces, and Michelangelo's works with an art historian guide. Skip the notoriously long lines at one of the world's finest art museums.", image:"https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80", rating:4.7, reviewCount:8102, price:58, currency:"USD", duration:"2h", destination:"Florence, Italy", category:"Skip-the-Line", freeCancellation:false, url:gygUrl("/florence-l140/uffizi-d456/") },
  { id:"gyg-12", title:"Cozumel: Tulum Ruins & Cenote Swimming Day Trip", description:"Journey to the ancient Mayan city of Tulum perched on a Caribbean cliff, then cool off in a crystal-clear cenote. Includes round-trip transport, entrance fees, and a local guide.", image:"https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?w=600&q=80", rating:4.6, reviewCount:4521, price:89, currency:"USD", duration:"8h", destination:"Cozumel, Mexico", category:"Day Trips", freeCancellation:true, url:gygUrl("/cozumel-l22370/tulum-cenote-d5610/") },
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

export default function GYGContent() {
  return (
    <ExcursionSearch
      tours={FEATURED_TOURS}
      accentColor="#C0392B"
      searchUrl={gygSearch}
      searchPlaceholder="e.g. Santorini, Dubrovnik, Kyoto, Lisbon..."
      cruisePorts={CRUISE_PORTS}
      categories={CATEGORIES}
      providerName="GetYourGuide"
    />
  );
}
