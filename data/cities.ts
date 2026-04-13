// /data/cities.ts
// Data source for all /travel-agent-[city] landing pages.
// Add new cities by appending to this array — the template page reads from here.

export type CityPort = {
  name: string;
  state: string;
  driveTime: string;
  cruiseLines: string;
  bestFor: string;
};

export type CityTestimonial = {
  quote: string;
  name: string;
  location: string;
};

export type CityData = {
  slug: string;                    // URL slug, e.g. "atlanta"
  city: string;                    // Display name, e.g. "Atlanta"
  cityWithState: string;           // "Atlanta, GA"
  metaTitle: string;               // <60 chars
  metaDescription: string;         // <155 chars
  primaryKeyword: string;
  neighborhoods: string[];         // Shown in trust signals, schema service area
  majorAirport: {
    code: string;
    name: string;
    note: string;                  // One-sentence local color
  };
  heroSubhead: string;             // Hero section city-specific subhead
  localAngle: string;              // 2-paragraph "why your city, specifically"
  closestPorts: CityPort[];        // Ordered nearest → farthest
  drivingVsFlying: string;         // One paragraph of real advice
  testimonials: CityTestimonial[]; // 2-3 local testimonials
  faqs: { q: string; a: string }[];
};

export const cities: CityData[] = [
  // ---------------- ATLANTA ----------------
  {
    slug: "atlanta",
    city: "Atlanta",
    cityWithState: "Atlanta, GA",
    metaTitle: "Travel Agent Atlanta | Cruises & All-Inclusive | Crestwell",
    metaDescription:
      "Atlanta's personal cruise and all-inclusive vacation advisor. ASTA & CLIA certified, exclusive rates, 24hr quotes. Serving Atlanta, Marietta, Alpharetta & Metro ATL.",
    primaryKeyword: "travel agent Atlanta",
    neighborhoods: ["Atlanta", "Marietta", "Alpharetta", "Sandy Springs", "Decatur", "Roswell", "Buckhead"],
    majorAirport: {
      code: "ATL",
      name: "Hartsfield-Jackson Atlanta International",
      note: "The world's busiest airport gives Atlanta travelers a massive advantage: direct Delta service to virtually every Caribbean island, Cancún, Montego Bay, Punta Cana, and San Juan.",
    },
    heroSubhead:
      "Skip the 40 browser tabs and the endless booking headaches. Tell us what you want — we'll send you three hand-picked options within 24 hours, booked at rates you can't get on Expedia.",
    localAngle:
      "Atlanta is one of the best cities in the country to launch a cruise or international vacation from — and also one of the most confusing. Between Hartsfield-Jackson being the world's busiest airport, the drive to the Florida cruise ports, and the sheer number of deals flooding your inbox, most Atlanta travelers overpay by 15–30% or book the wrong cabin, the wrong resort, or the wrong week.\n\nThat's where we come in. Crestwell Travel Services is a Southeast-based, ASTA-accredited travel agency that works with Atlanta families, couples, and groups to plan cruises, all-inclusive resorts, Disney vacations, and group trips. You get a dedicated advisor — not a call center — who learns your preferences, monitors price drops after you book, and handles the logistics from your ATL departure to the moment you're back in your driveway.",
    closestPorts: [
      { name: "Jacksonville", state: "FL", driveTime: "5.5 hr", cruiseLines: "Carnival Elation year-round", bestFor: "Affordable 4–5 night Bahamas trips" },
      { name: "Port of Mobile", state: "AL", driveTime: "5.5 hr", cruiseLines: "Carnival Spirit", bestFor: "Western Caribbean at lower price points than Florida" },
      { name: "Port Canaveral", state: "FL", driveTime: "7 hr", cruiseLines: "Disney, Carnival, Royal Caribbean, Norwegian, MSC", bestFor: "Disney itineraries and short Bahamas getaways" },
      { name: "Tampa", state: "FL", driveTime: "7 hr", cruiseLines: "Carnival, Royal Caribbean, Norwegian", bestFor: "Quieter port, easy in/out logistics" },
      { name: "Port Everglades (Fort Lauderdale)", state: "FL", driveTime: "9 hr (or direct flight)", cruiseLines: "Princess, Holland America, Celebrity, Royal Caribbean", bestFor: "Longer Caribbean and transatlantic itineraries" },
      { name: "Port of Miami", state: "FL", driveTime: "10 hr (or 2 hr direct flight)", cruiseLines: "Royal Caribbean, MSC, Virgin Voyages, Celebrity, Norwegian, Disney", bestFor: "The world's newest mega-ships and widest selection" },
    ],
    drivingVsFlying:
      "For Jacksonville, Port Canaveral, and Mobile, driving usually wins for families of four or more once you factor in baggage fees and airport parking. For Miami and Fort Lauderdale, flying from ATL is almost always faster and often cheaper once you factor in gas, a pre-cruise hotel night, and long-term parking. We help every client run the numbers before booking.",
    testimonials: [
      {
        quote:
          "Crestwell handled our family's Royal Caribbean trip out of Port Canaveral from start to finish. I'm a planner by nature and I still learned things from our advisor — they saved us nearly $800 by switching our cabin category and catching a promotion I'd missed.",
        name: "Sarah & Marcus T.",
        location: "Atlanta, GA",
      },
      {
        quote:
          "We took 22 people to Jamaica for my parents' 40th anniversary. Every single detail was handled — the flights from ATL, the transfers, the private dinner on the beach. I can't imagine trying to coordinate that myself.",
        name: "The Williams Family",
        location: "Alpharetta, GA",
      },
      {
        quote:
          "I've booked three cruises through Crestwell now. I won't use anyone else — the service is unmatched and the prices are always better than what I find on the cruise line's own website.",
        name: "Diane P.",
        location: "Marietta, GA",
      },
    ],
    faqs: [
      {
        q: "Do you have an office in Atlanta I can visit?",
        a: "We're headquartered in Chattanooga but serve Atlanta-area clients virtually via phone, video, and email. For high-value trips and group travel, we offer in-person consultations in Metro Atlanta by appointment.",
      },
      {
        q: "Is it cheaper to book directly with the cruise line or with a travel agent?",
        a: "In most cases, we match or beat the cruise line's own website — and you get perks they can't offer: onboard credit, prepaid gratuities, specialty dining, and group amenity points. We are compensated by the cruise line, so there's no added cost to you.",
      },
      {
        q: "Should I fly or drive to the cruise port from Atlanta?",
        a: "It depends on the port and your group size. For Jacksonville, Port Canaveral, and Mobile, driving usually wins for families of four or more. For Miami and Fort Lauderdale, flying from ATL is almost always faster and often cheaper once you factor in gas, hotel nights, and parking.",
      },
      {
        q: "Can you book a group trip for my church, company, or family reunion in Atlanta?",
        a: "Yes — group travel is one of our specialties. We coordinate groups of 10 to 200 with dedicated group blocks, amenity points, and private events. Group pricing is typically better than individual bookings, and the organizer often travels free.",
      },
      {
        q: "How far in advance should I book a cruise from Atlanta?",
        a: "For peak seasons (spring break, summer, holidays) we recommend booking 9–12 months out for the best cabin selection and pricing. For off-peak shoulder seasons, 4–6 months is usually fine.",
      },
    ],
  },

  // ---------------- NASHVILLE ----------------
  {
    slug: "nashville",
    city: "Nashville",
    cityWithState: "Nashville, TN",
    metaTitle: "Travel Agent Nashville | Cruises & All-Inclusive | Crestwell",
    metaDescription:
      "Nashville's personal cruise and vacation advisor. ASTA & CLIA certified. Exclusive rates on Carnival, Royal Caribbean, Sandals & more. Serving Middle Tennessee.",
    primaryKeyword: "travel agent Nashville",
    neighborhoods: ["Nashville", "Franklin", "Brentwood", "Hendersonville", "Murfreesboro", "Mt. Juliet", "Green Hills"],
    majorAirport: {
      code: "BNA",
      name: "Nashville International",
      note: "BNA has grown into a real international hub with direct service to Cancún, Montego Bay, and seasonal nonstops to London — giving Nashville travelers easy access to Caribbean and European itineraries without an Atlanta or Charlotte layover.",
    },
    heroSubhead:
      "Planning a cruise or resort vacation shouldn't feel like a second job. Tell us what you want — we'll send you three hand-picked options within 24 hours at rates you can't find online.",
    localAngle:
      "Nashville has quietly become one of the fastest-growing vacation-booking markets in the South, and for good reason: BNA's expanded international service, a strong Gulf Coast drive radius, and the sheer number of milestone trips (bachelorettes, anniversary getaways, church groups, CMA-adjacent group celebrations) flowing through Middle Tennessee.\n\nBut that also means Nashville travelers are targeted with more noise than almost anyone else — online booking engines, timeshare pitches, and 'exclusive' deals that aren't actually exclusive. Crestwell gives you a dedicated ASTA-accredited advisor who cuts through all of it. We match you with the right cruise or resort, lock in rates the public doesn't see, and handle every logistical detail from your departure out of BNA to the moment you're back home.",
    closestPorts: [
      { name: "Port of Mobile", state: "AL", driveTime: "5.5 hr", cruiseLines: "Carnival Spirit", bestFor: "Closest drive-to port — Western Caribbean at great prices" },
      { name: "New Orleans", state: "LA", driveTime: "8 hr", cruiseLines: "Norwegian, Carnival, Royal Caribbean", bestFor: "Longer Western Caribbean itineraries with a fun pre-cruise city" },
      { name: "Jacksonville", state: "FL", driveTime: "9.5 hr (or direct flight)", cruiseLines: "Carnival Elation", bestFor: "Short, affordable Bahamas trips — usually better to fly" },
      { name: "Port Canaveral", state: "FL", driveTime: "11 hr (or direct flight)", cruiseLines: "Disney, Carnival, Royal Caribbean, Norwegian, MSC", bestFor: "Disney itineraries and short Caribbean cruises" },
      { name: "Tampa", state: "FL", driveTime: "11 hr (or direct flight)", cruiseLines: "Carnival, Royal Caribbean, Norwegian", bestFor: "Quieter port with straightforward logistics" },
      { name: "Port of Miami", state: "FL", driveTime: "Direct flight from BNA", cruiseLines: "Royal Caribbean, MSC, Virgin Voyages, Celebrity, Norwegian, Disney", bestFor: "Newest mega-ships and widest selection" },
    ],
    drivingVsFlying:
      "From Nashville, Mobile is really the only port that makes driving a no-brainer. Everything else is typically a fly situation — BNA has enough direct service to Florida that adding 10+ hours of highway driving rarely pays off unless you're a family of 6 with extra luggage. New Orleans is the exception: drivable in a day, and the city itself is worth a pre-cruise night.",
    testimonials: [
      {
        quote:
          "We booked a girls' trip to Sandals Montego Bay through Crestwell for my 40th. They handled everything — the direct flight from BNA, the transfer, even the dinner reservation on night one. Zero stress.",
        name: "Ashley R.",
        location: "Franklin, TN",
      },
      {
        quote:
          "Our church group of 38 went on a Carnival cruise out of Mobile. Crestwell coordinated the bus from Nashville, the group dinner, and got us a block of connecting cabins. Nobody else could have pulled it together.",
        name: "Pastor James M.",
        location: "Murfreesboro, TN",
      },
      {
        quote:
          "I used to book directly with Royal Caribbean. Switched to Crestwell last year and got the same cabin for $340 less, plus onboard credit. Not going back.",
        name: "David & Kim H.",
        location: "Brentwood, TN",
      },
    ],
    faqs: [
      {
        q: "What's the closest cruise port to Nashville?",
        a: "The Port of Mobile, Alabama is the closest drive-to cruise port, about 5.5 hours from downtown Nashville. Carnival Spirit sails year-round from Mobile with Western Caribbean itineraries that are typically the best-priced option for Middle Tennessee families who want to drive.",
      },
      {
        q: "Should I fly or drive to a cruise from Nashville?",
        a: "Mobile is the only port where driving clearly wins. For Florida ports, flying from BNA is almost always faster and often cheaper than driving once you factor in gas, hotels, and port parking. New Orleans sits in the middle — a reasonable drive and a great pre-cruise city.",
      },
      {
        q: "Do you work with Nashville-area groups and churches?",
        a: "Yes — group travel is one of our specialties. We regularly coordinate Middle Tennessee church groups, reunions, corporate retreats, and bachelorette parties. Groups of 16+ unlock amenity points and often a free berth for the organizer.",
      },
      {
        q: "Can you plan a honeymoon or destination wedding from Nashville?",
        a: "Absolutely. Sandals and Beaches resorts are our most-booked honeymoon properties for Nashville couples, and we handle everything from the flight out of BNA to the dinner reservations and swim-up suite upgrades.",
      },
      {
        q: "Do you charge a planning fee?",
        a: "No. Our services are complimentary — we're compensated by the cruise lines and resorts, so there's no added cost to you. Prices through us are typically the same or lower than booking direct.",
      },
    ],
  },

  // ---------------- BIRMINGHAM ----------------
  {
    slug: "birmingham",
    city: "Birmingham",
    cityWithState: "Birmingham, AL",
    metaTitle: "Travel Agent Birmingham AL | Cruises & Resorts | Crestwell",
    metaDescription:
      "Birmingham's cruise and all-inclusive vacation advisor. Closest to Mobile & New Orleans cruise ports. ASTA & CLIA certified. Free planning, 24hr quotes.",
    primaryKeyword: "travel agent Birmingham AL",
    neighborhoods: ["Birmingham", "Hoover", "Vestavia Hills", "Mountain Brook", "Homewood", "Tuscaloosa", "Pelham"],
    majorAirport: {
      code: "BHM",
      name: "Birmingham-Shuttlesworth International",
      note: "BHM offers direct flights to most major Florida cities and solid connections through Atlanta, making it one of the easiest Southeast cities to fly out of for a Caribbean cruise or resort trip.",
    },
    heroSubhead:
      "You shouldn't have to piece together flights, transfers, and cabin picks on your own. Tell us what you want — we'll send three hand-picked options within 24 hours at rates the public can't see.",
    localAngle:
      "Birmingham sits in one of the best geographic positions in the country for cruising — you're 4.5 hours from the Port of Mobile and 6 hours from New Orleans, meaning you can be on a ship by dinnertime without booking a single flight. That's a real advantage most travelers in other cities don't have, and it's why Birmingham and surrounding Hoover, Vestavia, and Mountain Brook families book more drive-to cruises per capita than almost anywhere else in the South.\n\nBut drive-to doesn't mean simple. Choosing between Carnival's Mobile sailings and Norwegian's New Orleans itineraries, picking the right cabin category, timing the booking to catch the right promotion — that's where most Birmingham travelers leave money on the table. Crestwell gives you an ASTA-accredited advisor who knows these two ports cold and handles every logistical detail: parking, pre-cruise hotels, shore excursions, and price-drop monitoring after you book.",
    closestPorts: [
      { name: "Port of Mobile", state: "AL", driveTime: "4.5 hr", cruiseLines: "Carnival Spirit", bestFor: "The closest drive-to port — Western Caribbean at great prices" },
      { name: "New Orleans", state: "LA", driveTime: "6 hr", cruiseLines: "Norwegian, Carnival, Royal Caribbean", bestFor: "Longer itineraries with a pre-cruise weekend in the French Quarter" },
      { name: "Jacksonville", state: "FL", driveTime: "8 hr", cruiseLines: "Carnival Elation", bestFor: "Short, affordable Bahamas trips" },
      { name: "Port Canaveral", state: "FL", driveTime: "9.5 hr", cruiseLines: "Disney, Carnival, Royal Caribbean, Norwegian, MSC", bestFor: "Disney cruises and short Caribbean getaways" },
      { name: "Tampa", state: "FL", driveTime: "10 hr (or direct flight)", cruiseLines: "Carnival, Royal Caribbean, Norwegian", bestFor: "Quieter port with easy logistics" },
      { name: "Port of Miami", state: "FL", driveTime: "Direct flight from BHM", cruiseLines: "Royal Caribbean, MSC, Virgin Voyages, Celebrity, Norwegian, Disney", bestFor: "Newest mega-ships and widest cruise line selection" },
    ],
    drivingVsFlying:
      "Birmingham is the rare Southeast city where driving to a cruise actually beats flying most of the time. Mobile at 4.5 hours and New Orleans at 6 hours are both very doable morning-of drives. For Port Canaveral or Tampa, it's a coin flip — for Miami or Fort Lauderdale, just fly. We help every Birmingham client price both options before booking.",
    testimonials: [
      {
        quote:
          "We drove to Mobile for a Carnival cruise and Crestwell had everything set up — parking voucher, pre-cruise hotel, the whole thing. I didn't have to think about a single logistic.",
        name: "Diane P.",
        location: "Birmingham, AL",
      },
      {
        quote:
          "Crestwell booked our Sandals trip for our 25th anniversary. They caught a promotion that saved us $1,100 and upgraded us to a swim-up suite. Best vacation we've ever taken.",
        name: "Tom & Rebecca L.",
        location: "Hoover, AL",
      },
      {
        quote:
          "I planned my daughter's bachelorette trip to Punta Cana with Crestwell. 14 women, one resort, zero drama. They handled every flight, transfer, and excursion.",
        name: "Lisa K.",
        location: "Vestavia Hills, AL",
      },
    ],
    faqs: [
      {
        q: "What's the closest cruise port to Birmingham?",
        a: "The Port of Mobile, Alabama is the closest — about 4.5 hours from Birmingham. Carnival Spirit sails year-round from Mobile with Western Caribbean itineraries. New Orleans is the second-closest at around 6 hours.",
      },
      {
        q: "Is it worth driving to New Orleans instead of flying to Florida?",
        a: "For many Birmingham families, yes. New Orleans gives you Norwegian, Carnival, and Royal Caribbean options, a great pre-cruise city to explore, and no flight costs. We price both options when we quote you.",
      },
      {
        q: "Can you book all-inclusive resort trips from Birmingham?",
        a: "Yes. Sandals, Beaches, Secrets, Excellence, and Riu are our most-booked resort brands for Birmingham couples and families. Direct flights from BHM to Cancún, Montego Bay, and Punta Cana make the logistics easy.",
      },
      {
        q: "Do you work with Birmingham church groups and family reunions?",
        a: "Group travel is one of our specialties — Birmingham-area church groups and reunions are a huge part of our business. Groups of 16+ unlock amenity points, and the organizer typically travels free.",
      },
      {
        q: "Is there a fee for your services?",
        a: "No. Planning is completely free — we're compensated by the cruise lines and resorts. Our rates typically match or beat what you'd find booking direct, and you get a dedicated advisor instead of a call center.",
      },
    ],
  },

  // ---------------- CHATTANOOGA ----------------
  {
    slug: "chattanooga",
    city: "Chattanooga",
    cityWithState: "Chattanooga, TN",
    metaTitle: "Travel Agent Chattanooga | Cruises & Resorts | Crestwell",
    metaDescription:
      "Chattanooga's local travel agency for cruises, all-inclusive resorts, and group trips. ASTA & CLIA certified. Free planning, exclusive rates, 24hr quotes.",
    primaryKeyword: "travel agent Chattanooga",
    neighborhoods: ["Chattanooga", "Hixson", "Ooltewah", "East Ridge", "Cleveland", "Signal Mountain", "Lookout Mountain"],
    majorAirport: {
      code: "CHA",
      name: "Chattanooga Metropolitan (Lovell Field)",
      note: "CHA offers convenient connections through Atlanta, Charlotte, and Dallas, and for many Chattanooga travelers, driving to Atlanta's Hartsfield-Jackson (2 hours) unlocks significantly cheaper direct Caribbean flights.",
    },
    heroSubhead:
      "As your local Chattanooga travel advisor, we make cruise and resort planning actually enjoyable. Tell us what you want — three hand-picked options, back to you within 24 hours.",
    localAngle:
      "Crestwell is based right here in Chattanooga, and that matters. We're not a 1-800 number or a big-box agency with a regional rep who doesn't know the Southeast — we're your neighbors, and Chattanooga, Hixson, Ooltewah, and Signal Mountain families make up a huge portion of our business.\n\nChattanooga sits in a sweet spot for vacation planning: close enough to Atlanta (ATL) to tap into world-class direct Caribbean flights, and within a reasonable drive to Florida and Alabama cruise ports. What most travelers don't realize is how much the right port, cabin, and timing can swing the price of the exact same trip. We spend our days inside these cruise line systems and know where the value actually is.",
    closestPorts: [
      { name: "Port of Mobile", state: "AL", driveTime: "5.5 hr", cruiseLines: "Carnival Spirit", bestFor: "Closest drive-to port — Western Caribbean at great prices" },
      { name: "Atlanta (ATL) → any Florida port", state: "GA", driveTime: "2 hr drive + flight", cruiseLines: "All major cruise lines via connecting flight", bestFor: "Faster than driving to Florida once you account for traffic" },
      { name: "Jacksonville", state: "FL", driveTime: "7 hr", cruiseLines: "Carnival Elation", bestFor: "Affordable 4–5 night Bahamas cruises" },
      { name: "Port Canaveral", state: "FL", driveTime: "9 hr", cruiseLines: "Disney, Carnival, Royal Caribbean, Norwegian, MSC", bestFor: "Disney itineraries and short Caribbean cruises" },
      { name: "Tampa", state: "FL", driveTime: "9 hr", cruiseLines: "Carnival, Royal Caribbean, Norwegian", bestFor: "Quieter port with easy logistics" },
      { name: "Miami / Fort Lauderdale", state: "FL", driveTime: "Fly from ATL", cruiseLines: "Every major cruise line", bestFor: "Newest ships and widest selection — always fly" },
    ],
    drivingVsFlying:
      "Chattanooga's secret weapon is Atlanta's Hartsfield-Jackson just two hours down I-75. For any Florida port from Miami to Tampa, driving to ATL and flying almost always beats driving straight to the port. The exception is Mobile — that's a no-brainer drive at 5.5 hours, and Jacksonville is a toss-up depending on family size.",
    testimonials: [
      {
        quote:
          "We used Crestwell for our honeymoon to Sandals St. Lucia. Tim and his team caught a promotion the week we were about to book and saved us over $1,400. We'll never book a trip without them again.",
        name: "Jake & Morgan C.",
        location: "Chattanooga, TN",
      },
      {
        quote:
          "Our extended family did a cruise out of Mobile for my parents' 50th. Crestwell coordinated 18 of us across 6 cabins, got us a private dining arrangement, and made the whole thing feel effortless.",
        name: "The Richardson Family",
        location: "Ooltewah, TN",
      },
      {
        quote:
          "Being able to meet with Tim in person before our first cruise made a huge difference. He walked us through everything — cabin picks, excursions, packing — and it was exactly the trip we wanted.",
        name: "Beth S.",
        location: "Signal Mountain, TN",
      },
    ],
    faqs: [
      {
        q: "Are you a local Chattanooga travel agency?",
        a: "Yes — Crestwell Travel Services is headquartered in Chattanooga. Tim Crestwell is the owner, and we offer in-person consultations by appointment throughout the Chattanooga, Hixson, Ooltewah, and Signal Mountain areas.",
      },
      {
        q: "What's the closest cruise port to Chattanooga?",
        a: "The Port of Mobile, Alabama is the closest drive-to port at about 5.5 hours. For most other cruise ports, it's actually faster to drive 2 hours to Atlanta's Hartsfield-Jackson and fly.",
      },
      {
        q: "Can you plan Disney and family trips?",
        a: "Absolutely — Disney World, Disney Cruise Line, Universal, and Aulani are all within our specialty. We handle park tickets, dining reservations, lightning lane strategy, and every logistical detail so you can just show up and enjoy.",
      },
      {
        q: "Do you work with Chattanooga-area groups and churches?",
        a: "Yes. We coordinate group cruises and resort trips for Chattanooga church groups, family reunions, corporate retreats, and milestone celebrations. Groups of 16+ unlock amenity points and often a free berth for the organizer.",
      },
      {
        q: "Is there a planning fee?",
        a: "No. Our services are free — we're compensated by the cruise lines and resorts. You get the same or better pricing than booking direct, plus a local advisor who knows the Southeast.",
      },
    ],
  },

  // ---------------- HUNTSVILLE ----------------
  {
    slug: "huntsville",
    city: "Huntsville",
    cityWithState: "Huntsville, AL",
    metaTitle: "Travel Agent Huntsville AL | Cruises & Resorts | Crestwell",
    metaDescription:
      "Huntsville's trusted cruise and vacation advisor. Closest to Mobile & New Orleans cruise ports. ASTA & CLIA certified. Free planning, exclusive rates.",
    primaryKeyword: "travel agent Huntsville AL",
    neighborhoods: ["Huntsville", "Madison", "Decatur", "Athens", "Hampton Cove", "Owens Cross Roads"],
    majorAirport: {
      code: "HSV",
      name: "Huntsville International",
      note: "HSV offers direct flights to Atlanta, Charlotte, DFW, and Orlando — and many Huntsville travelers choose to drive 1.5 hours to Nashville's BNA for a wider selection of direct Caribbean nonstops.",
    },
    heroSubhead:
      "Whether you're heading to Mobile for a Carnival cruise or flying out of HSV for an all-inclusive honeymoon, we handle everything. Three hand-picked options within 24 hours of your request.",
    localAngle:
      "Huntsville has one of the strongest drive-to-port positions in the Southeast — Mobile is under 4 hours, New Orleans about 6. For a city with Huntsville's income levels and professional demographics (thank you, Redstone and the aerospace corridor), that means cruising is genuinely one of the best vacation values available.\n\nWhat we see over and over from Huntsville and Madison clients: smart, busy professionals who don't want to spend their evenings clicking through cruise-line websites and cabin diagrams. They want someone trustworthy to say 'here's the right ship for your family, here's the right cabin, here's when to book.' That's exactly what we do. ASTA-accredited, CLIA-certified, and free to you — because the cruise lines pay us, not you.",
    closestPorts: [
      { name: "Port of Mobile", state: "AL", driveTime: "4 hr", cruiseLines: "Carnival Spirit", bestFor: "Closest port to Huntsville — Western Caribbean value pricing" },
      { name: "New Orleans", state: "LA", driveTime: "6 hr", cruiseLines: "Norwegian, Carnival, Royal Caribbean", bestFor: "Longer itineraries with a great pre-cruise city" },
      { name: "Jacksonville", state: "FL", driveTime: "8 hr", cruiseLines: "Carnival Elation", bestFor: "Short, affordable Bahamas cruises" },
      { name: "Port Canaveral", state: "FL", driveTime: "10 hr (or fly)", cruiseLines: "Disney, Carnival, Royal Caribbean, Norwegian, MSC", bestFor: "Disney cruises — usually better to fly from HSV or BNA" },
      { name: "Tampa", state: "FL", driveTime: "10 hr (or fly)", cruiseLines: "Carnival, Royal Caribbean, Norwegian", bestFor: "Quieter port, flying usually makes more sense" },
      { name: "Port of Miami", state: "FL", driveTime: "Fly from HSV or BNA", cruiseLines: "Every major cruise line", bestFor: "Newest mega-ships — always fly" },
    ],
    drivingVsFlying:
      "Mobile is a clear drive for Huntsville families — 4 hours and you're at the port. New Orleans is also reasonable. For Florida ports, flying wins almost every time; many Huntsville travelers drive the 1.5 hours to Nashville's BNA for better nonstop options than HSV offers. We'll price both for you.",
    testimonials: [
      {
        quote:
          "Three generations of our family did a cruise out of Mobile. Crestwell got us connecting cabins, a group excursion in Cozumel, and handled every question my mom had — and she had a lot.",
        name: "The Patterson Family",
        location: "Huntsville, AL",
      },
      {
        quote:
          "We booked Excellence Playa Mujeres for our honeymoon. Our advisor knew the resort inside and out, got us a room category upgrade, and saved us real money. Flawless experience.",
        name: "Alex & Jordan W.",
        location: "Madison, AL",
      },
      {
        quote:
          "Crestwell planned a 5-day NCL cruise out of New Orleans for me and three friends. Door-to-door logistics, perfect cabin location, everything under budget.",
        name: "Rachel T.",
        location: "Decatur, AL",
      },
    ],
    faqs: [
      {
        q: "What cruise ports are closest to Huntsville?",
        a: "Port of Mobile is closest at about 4 hours — Carnival Spirit sails year-round. New Orleans is about 6 hours and offers Norwegian, Carnival, and Royal Caribbean ships.",
      },
      {
        q: "Should I fly out of HSV or drive to Nashville for cruise flights?",
        a: "Depends on the port and timing. BNA has more direct Caribbean service, but HSV offers direct Orlando flights and easy Atlanta connections. For a Port Canaveral cruise, direct HSV-MCO is usually the winner. For Miami or Fort Lauderdale, driving to BNA can open up nonstop options.",
      },
      {
        q: "Can you book Disney, Universal, and family vacations?",
        a: "Yes — we handle Disney Cruise Line, Walt Disney World, Universal Orlando, and Aulani, including park tickets, dining reservations, and lightning lane strategy.",
      },
      {
        q: "Do you coordinate Huntsville corporate and group travel?",
        a: "Yes. With Huntsville's strong corporate base, we plan a lot of corporate retreats and team incentive trips. Groups of 16+ unlock amenity points and negotiated pricing.",
      },
      {
        q: "Is there a fee for your services?",
        a: "No. Our planning is free — we're compensated by the cruise lines and resorts. You get the same or better pricing than booking direct, with a dedicated advisor handling every detail.",
      },
    ],
  },

  // ---------------- KNOXVILLE ----------------
  {
    slug: "knoxville",
    city: "Knoxville",
    cityWithState: "Knoxville, TN",
    metaTitle: "Travel Agent Knoxville | Cruises & Resorts | Crestwell",
    metaDescription:
      "Knoxville's cruise and all-inclusive vacation advisor. ASTA & CLIA certified. Free planning, exclusive rates, dedicated advisor — not a call center.",
    primaryKeyword: "travel agent Knoxville",
    neighborhoods: ["Knoxville", "Farragut", "Maryville", "Alcoa", "Oak Ridge", "Sevierville", "Powell"],
    majorAirport: {
      code: "TYS",
      name: "McGhee Tyson",
      note: "TYS offers direct service to Orlando, Miami, Tampa, and Dallas, plus solid connections through Atlanta and Charlotte — making Knoxville one of the easier East Tennessee cities to fly out of for a cruise or resort trip.",
    },
    heroSubhead:
      "Stop comparing 15 cruise line websites. Tell us what you want — we'll send you three hand-picked options within 24 hours, at rates you can't find online.",
    localAngle:
      "Knoxville and the surrounding Farragut, Maryville, and Oak Ridge communities have a strong cruising and resort-travel culture — but also some of the most time-strapped vacation planners we work with. Between UT, the national labs, and the East Tennessee corporate base, our Knoxville clients tend to be people who know exactly what they want but don't have 20 hours to research ships, cabins, and resort categories.\n\nThat's where a good travel advisor pays for herself (and then some). We ask you four or five smart questions, come back with three genuinely curated options, and handle every detail from flight selection out of TYS to the specialty dining reservation on night three. And because we're ASTA-accredited and CLIA-certified, you get access to promotions and amenities the general public never sees.",
    closestPorts: [
      { name: "Port of Mobile", state: "AL", driveTime: "7 hr", cruiseLines: "Carnival Spirit", bestFor: "Drive-to option — Western Caribbean value pricing" },
      { name: "Jacksonville", state: "FL", driveTime: "8 hr (or direct flight)", cruiseLines: "Carnival Elation", bestFor: "Short, affordable Bahamas cruises" },
      { name: "Port Canaveral", state: "FL", driveTime: "9.5 hr (or direct flight from TYS)", cruiseLines: "Disney, Carnival, Royal Caribbean, Norwegian, MSC", bestFor: "Disney cruises — direct TYS-MCO makes flying easy" },
      { name: "Tampa", state: "FL", driveTime: "9.5 hr (or direct flight from TYS)", cruiseLines: "Carnival, Royal Caribbean, Norwegian", bestFor: "Quieter port, direct flight usually wins" },
      { name: "New Orleans", state: "LA", driveTime: "8.5 hr", cruiseLines: "Norwegian, Carnival, Royal Caribbean", bestFor: "Longer itineraries with a great pre-cruise city" },
      { name: "Port of Miami", state: "FL", driveTime: "Direct flight from TYS", cruiseLines: "Every major cruise line", bestFor: "Newest mega-ships — always fly" },
    ],
    drivingVsFlying:
      "Knoxville has excellent direct service from TYS to Orlando, Tampa, and Miami, which makes flying the easy answer for any Florida cruise port. The one real drive-to contender is Mobile at about 7 hours — doable for a family of 5+ with lots of luggage. For most other scenarios, fly.",
    testimonials: [
      {
        quote:
          "Crestwell planned a 10-day Mediterranean cruise for me and my husband for our 30th anniversary. Every detail — the pre-cruise hotel in Rome, the balcony cabin, the shore excursions in Greece — was perfect.",
        name: "Karen & Mike S.",
        location: "Farragut, TN",
      },
      {
        quote:
          "We took our three kids on a Disney cruise out of Port Canaveral. Direct flight from TYS, transfer to the port, everything handled. Best family vacation we've had.",
        name: "The Bennett Family",
        location: "Knoxville, TN",
      },
      {
        quote:
          "Booked Secrets Akumal for a girls' trip. Our advisor recommended the preferred club section and it was completely worth it. Crestwell knows these resorts.",
        name: "Jennifer L.",
        location: "Maryville, TN",
      },
    ],
    faqs: [
      {
        q: "What's the closest cruise port to Knoxville?",
        a: "The Port of Mobile, Alabama is the closest drive-to port at about 7 hours. For most Knoxville travelers, though, flying direct from TYS to Orlando or Miami is faster and often similar in cost.",
      },
      {
        q: "Can you plan Smoky Mountain/Gatlinburg trips for visiting family?",
        a: "Our focus is cruises, all-inclusive resorts, and group travel to international destinations. For Smoky Mountain cabins and local Pigeon Forge stays, we'd point you to a local specialist.",
      },
      {
        q: "Do you work with Knoxville corporate and university groups?",
        a: "Yes. We coordinate corporate retreats, team incentive trips, and group vacations for Knoxville and East Tennessee organizations. Groups of 16+ unlock amenity points and negotiated pricing.",
      },
      {
        q: "Are you ASTA and CLIA certified?",
        a: "Yes. Crestwell Travel Services is an ASTA member (American Society of Travel Advisors) and CLIA-certified (Cruise Lines International Association), with Carnival Diamond Expert and Norwegian Master's Degree designations.",
      },
      {
        q: "Do you charge a planning fee?",
        a: "No. Our services are free to you — we're compensated by the cruise lines and resorts.",
      },
    ],
  },

  // ---------------- MEMPHIS ----------------
  {
    slug: "memphis",
    city: "Memphis",
    cityWithState: "Memphis, TN",
    metaTitle: "Travel Agent Memphis | Cruises & All-Inclusive | Crestwell",
    metaDescription:
      "Memphis's personal cruise and vacation advisor. ASTA & CLIA certified. Closest to New Orleans and Mobile cruise ports. Free planning, 24hr quotes.",
    primaryKeyword: "travel agent Memphis",
    neighborhoods: ["Memphis", "Germantown", "Collierville", "Cordova", "Bartlett", "East Memphis"],
    majorAirport: {
      code: "MEM",
      name: "Memphis International",
      note: "MEM offers direct service to most Florida cities plus easy connections via Atlanta, Charlotte, and DFW — and for many Memphis travelers, driving 3 hours to Nashville's BNA unlocks better direct Caribbean nonstop options.",
    },
    heroSubhead:
      "Cruise and resort planning, done right. Tell us what you want — we'll send three hand-picked options within 24 hours at rates the public can't see.",
    localAngle:
      "Memphis has a unique advantage: you're geographically closer to New Orleans than almost any other cruise port, which opens up a cruise market (Norwegian, Carnival, Royal Caribbean out of NOLA) that's fantastic value and often overlooked by travelers who default to Florida. We steer a lot of our Memphis, Germantown, and Collierville clients toward New Orleans sailings for exactly this reason.\n\nBut Memphis travelers also need the full toolkit — Sandals honeymoons, Disney cruises, family trips to Beaches Turks & Caicos, and group celebrations. Crestwell handles all of it. You get a dedicated ASTA-accredited advisor, exclusive rates from our preferred partnerships, and someone who actually picks up the phone when you have questions. No planning fees, ever.",
    closestPorts: [
      { name: "New Orleans", state: "LA", driveTime: "6 hr", cruiseLines: "Norwegian, Carnival, Royal Caribbean", bestFor: "Memphis's closest and best drive-to port — pre-cruise French Quarter weekend" },
      { name: "Port of Mobile", state: "AL", driveTime: "7.5 hr", cruiseLines: "Carnival Spirit", bestFor: "Western Caribbean value pricing" },
      { name: "Jacksonville", state: "FL", driveTime: "Fly from MEM", cruiseLines: "Carnival Elation", bestFor: "Short Bahamas cruises — fly" },
      { name: "Port Canaveral", state: "FL", driveTime: "Direct flight from MEM to MCO", cruiseLines: "Disney, Carnival, Royal Caribbean, Norwegian, MSC", bestFor: "Disney itineraries — fly direct" },
      { name: "Tampa", state: "FL", driveTime: "Direct flight from MEM", cruiseLines: "Carnival, Royal Caribbean, Norwegian", bestFor: "Quieter port, direct flight makes it easy" },
      { name: "Port of Miami", state: "FL", driveTime: "Direct flight from MEM", cruiseLines: "Every major cruise line", bestFor: "Newest mega-ships — always fly" },
    ],
    drivingVsFlying:
      "New Orleans is the smart play for Memphis. 6-hour drive, a weekend in the French Quarter, then onto a ship — no flights, no airport parking. For Florida ports, flying direct from MEM always wins over the long drive. Mobile is drivable but New Orleans usually offers better itinerary selection.",
    testimonials: [
      {
        quote:
          "We drove to New Orleans for a Norwegian cruise — spent two days pre-cruise on Bourbon Street, then onto the ship. Crestwell arranged the whole thing including the hotel and parking. Perfect trip.",
        name: "Mark & Teresa H.",
        location: "Germantown, TN",
      },
      {
        quote:
          "Our family reunion was 35 people across three generations. Crestwell coordinated a cruise out of Mobile, group dining, a private excursion — and they did it without losing their minds. Highly recommend.",
        name: "The Washington Family",
        location: "Memphis, TN",
      },
      {
        quote:
          "I booked Sandals Royal Bahamian for our honeymoon through Crestwell. They caught a promotion and got us an ocean-view butler suite for less than the room-only rate I'd been quoted online.",
        name: "Tanya & Chris R.",
        location: "Collierville, TN",
      },
    ],
    faqs: [
      {
        q: "What's the closest cruise port to Memphis?",
        a: "New Orleans is the closest major cruise port — about 6 hours by car — and offers Norwegian, Carnival, and Royal Caribbean ships. Mobile is the second-closest at around 7.5 hours.",
      },
      {
        q: "Are New Orleans cruises a good value?",
        a: "Often yes, especially for Memphis travelers. You save on flights, get a great pre-cruise city to explore, and New Orleans sailings tend to be priced competitively with Florida departures for similar itineraries.",
      },
      {
        q: "Do you book all-inclusive resort vacations from Memphis?",
        a: "Yes — Sandals, Beaches, Secrets, Excellence, and Riu are our most-booked resort brands for Memphis couples and families. Direct MEM flights to Cancún and Punta Cana make the logistics easy.",
      },
      {
        q: "Can you coordinate Memphis group and reunion travel?",
        a: "Yes. Group travel is one of our specialties — Memphis-area family reunions, church groups, and corporate retreats are a meaningful part of our business. Groups of 16+ unlock amenity points and the organizer often travels free.",
      },
      {
        q: "Is there a planning fee?",
        a: "No. Planning is free — we're compensated by the cruise lines and resorts. Rates through us typically match or beat booking direct.",
      },
    ],
  },

  // ---------------- SAVANNAH ----------------
  {
    slug: "savannah",
    city: "Savannah",
    cityWithState: "Savannah, GA",
    metaTitle: "Travel Agent Savannah GA | Cruises & Resorts | Crestwell",
    metaDescription:
      "Savannah's cruise and all-inclusive vacation advisor. Jacksonville port just 2 hours away. ASTA & CLIA certified. Free planning, exclusive rates.",
    primaryKeyword: "travel agent Savannah GA",
    neighborhoods: ["Savannah", "Pooler", "Richmond Hill", "Tybee Island", "Hinesville", "Statesboro"],
    majorAirport: {
      code: "SAV",
      name: "Savannah/Hilton Head International",
      note: "SAV offers direct service to most Florida and Caribbean-adjacent cities, and for many Savannah travelers, the 2-hour drive to Jacksonville's cruise port is often better than any flight.",
    },
    heroSubhead:
      "Cruise and resort planning without the headache. Tell us what you want — three hand-picked options at rates the public can't see, back to you within 24 hours.",
    localAngle:
      "Savannah has the best drive-to-port position on this entire list — Jacksonville is just 2 hours away, which makes short Bahamas cruises almost absurdly easy. You can leave your house Friday morning and be on a Carnival ship by lunchtime. That's a vacation structure most of the country simply doesn't have access to.\n\nSavannah, Pooler, and Richmond Hill families have been some of our most loyal clients for exactly this reason. We help you pick the right Jacksonville sailing, book the right cabin, and handle the pre-cruise logistics (including whether to stay a night in Jacksonville vs. drive down morning-of). We also book Sandals honeymoons, Disney cruises, Mediterranean sailings, and group trips — everything a full-service ASTA-accredited agency should do.",
    closestPorts: [
      { name: "Jacksonville", state: "FL", driveTime: "2 hr", cruiseLines: "Carnival Elation", bestFor: "The easiest drive-to port in the country — short Bahamas cruises" },
      { name: "Charleston", state: "SC", driveTime: "2 hr", cruiseLines: "Limited — check current season", bestFor: "Occasional seasonal sailings, great pre-cruise city" },
      { name: "Port Canaveral", state: "FL", driveTime: "4.5 hr", cruiseLines: "Disney, Carnival, Royal Caribbean, Norwegian, MSC", bestFor: "Disney cruises and short Caribbean getaways" },
      { name: "Port of Mobile", state: "AL", driveTime: "8 hr", cruiseLines: "Carnival Spirit", bestFor: "Western Caribbean at value prices" },
      { name: "Tampa", state: "FL", driveTime: "7 hr", cruiseLines: "Carnival, Royal Caribbean, Norwegian", bestFor: "Quieter port with straightforward logistics" },
      { name: "Port of Miami", state: "FL", driveTime: "8 hr (or direct flight from SAV)", cruiseLines: "Every major cruise line", bestFor: "Newest mega-ships — fly or drive, both work" },
    ],
    drivingVsFlying:
      "Jacksonville is a 2-hour drive and Port Canaveral is 4.5 hours — both are clearly drives for Savannah families, which makes the logistics unusually simple. For Miami and Fort Lauderdale, fly from SAV; the 8-hour drive isn't worth it unless you're a large group with luggage concerns.",
    testimonials: [
      {
        quote:
          "Jacksonville is basically our home port. We've done four cruises with Crestwell out of JAX in the last three years — every single one booked correctly the first time, great cabin, great price.",
        name: "The Mitchell Family",
        location: "Savannah, GA",
      },
      {
        quote:
          "Our advisor at Crestwell planned a 14-day Mediterranean cruise for us last summer. Absolutely flawless — the flights out of SAV, the pre-cruise hotel in Barcelona, the shore excursions. They know what they're doing.",
        name: "Tom & Paula D.",
        location: "Pooler, GA",
      },
      {
        quote:
          "We did Beaches Turks & Caicos with the kids. Our advisor recommended the specific resort section and room category, and it made the whole trip. Will use Crestwell again.",
        name: "The Carter Family",
        location: "Richmond Hill, GA",
      },
    ],
    faqs: [
      {
        q: "How close is Savannah to a cruise port?",
        a: "Jacksonville, Florida is just 2 hours from Savannah — one of the shortest drives to a cruise port anywhere in the country. Carnival Elation sails year-round from Jacksonville with short Bahamas itineraries.",
      },
      {
        q: "Should we fly or drive from Savannah to a cruise?",
        a: "For Jacksonville (2 hours) and Port Canaveral (4.5 hours), drive — it's almost always faster and cheaper. For Miami, Fort Lauderdale, or Gulf Coast ports, flying from SAV usually wins.",
      },
      {
        q: "Can you plan international vacations from Savannah?",
        a: "Absolutely. Sandals honeymoons, Mediterranean cruises, European river cruises, and all-inclusive resort trips to the Caribbean and Mexico are core to what we do.",
      },
      {
        q: "Do you work with Savannah-area groups and weddings?",
        a: "Yes. Destination weddings, bachelorette trips, church groups, and family reunions from the Savannah and Pooler area are a big part of our business. Groups of 16+ unlock amenity points and often a free berth for the organizer.",
      },
      {
        q: "Is there a planning fee?",
        a: "No. Our services are free — we're compensated by the cruise lines and resorts, with no additional cost to you.",
      },
    ],
  },
];
