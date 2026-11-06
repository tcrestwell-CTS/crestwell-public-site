// Practical answers for questions travelers ask before they request a quote.
// Every factual claim here is already stated elsewhere on the site
// (FAQ, group travel, Journey of Honor, Signature Experiences, quote form,
// or the cruise lines the site says it plans).
//
// TODO(Tim Crestwell) markers are for firsthand examples only you can add.
// Do not fill them with invented client stories, prices, or ship reviews.

export type PlanningLink = { href: string; label: string };

export type PlanningFaq = {
  id: string;
  question: string;
  /** Plain text. Shown on /planning-guide and /faq, and copied into FAQPage JSON-LD. */
  answer: string;
  links: PlanningLink[];
};

export const PLANNING_FAQS: PlanningFaq[] = [
  {
    id: 'multigenerational-cruise',
    // TODO(Tim Crestwell): Add one or two ships you have personally sailed with a multigenerational family, and what you would book again for that mix of ages. Do not add client names, savings amounts, or cabin numbers unless you are publishing a real booking you have permission to describe.
    question: 'Which cruise fits a multigenerational family?',
    answer: `Start with the people, not a ship advertisement. Write down the youngest and oldest traveler, anyone who needs an elevator-close cabin or a shorter walk to the dining room, and whether the group wants to be together at dinner or free to split up. Those three facts narrow the choice faster than a "best cruise for families" list.

Crestwell's cruise FAQ already sorts the lines this way: Disney Cruise Line when younger children need the ship itself to be the entertainment; Royal Caribbean when you want a large ship with activities across ages, including teen programming; Norwegian when freestyle dining matters because a big family will not share one fixed seating; Carnival when the group is watching the fare. River cruises are a different product — smaller ships, a sightseeing pace, and little kids' programming — so they are usually a poor fit once children are in the group, and a reasonable one when the party is adults.

Cabins matter as much as the line. On the group travel page, family reunions are planned around adjacent cabin blocking, not one cabin that sleeps everyone. Ask whether nearby cabins can be held before anyone pays a deposit. If the group is large enough to be a formal cruise group, the group page describes group pricing as starting around 8 cabins.

Where you sail from changes the trip for Southeast families. A drive to Mobile, Jacksonville, Port Canaveral, New Orleans, or Tampa is a different vacation from a flight out of Atlanta, Nashville, or another regional airport. The city pages and the Southeast Cruiser's Port Guide cover those choices. Say which home city you are leaving from when you request a quote.

The cruises page is the place to compare ocean, river, family, and adults-only styles before you write in.`,
    links: [
      { href: '/cruises', label: 'Cruise vacations' },
      { href: '/group-travel', label: 'Group travel' },
      { href: '/faq', label: 'Cruise FAQ' },
      { href: '/southeast-port-guide.pdf', label: 'Southeast Cruiser\'s Port Guide (PDF)' },
      { href: '/request-quote?trip_type=Cruise+Vacation', label: 'Request a cruise quote' },
    ],
  },
  {
    id: 'group-organizer-prep',
    // TODO(Tim Crestwell): Add the checklist you actually send organizers today, including any cruise-line group minimums you want stated in public. The site currently says about 8 cabins for cruise groups and about 10 rooms for resorts; the FAQ says 6–12 months of lead time for groups of 10–20, while the group page says 6–9 months. Reconcile those before they are quoted as policy.
    question: 'What should a group organizer prepare before requesting a quote?',
    answer: `You do not need final legal names or a locked headcount. You do need enough for an advisor to price a real option instead of a brochure.

Have this ready when you use the quote form:

Group type. The group travel page plans church and faith groups, family reunions, friend groups, and corporate or incentive trips. Say which one this is.

Size in cabins or rooms, not only in people. The group page describes cruise group pricing as unlocking around 8 cabins, and resort group rates around 10 rooms. Smaller parties can still be coordinated together; they may simply miss formal group pricing.

A date range, and how flexible it is. The FAQ recommends 12–18 months ahead for groups of 20 or more, especially on holiday sailings, and 6–12 months for groups of about 10–20. A single must-have date is fine if that is the reunion. A range gets more options.

Who decides, and who pays. The group FAQ says members can have individual payment profiles and pay their own deposit and balance, as long as payments land before the supplier's final-payment deadline. Say whether you are collecting money or each traveler is paying Crestwell directly.

Must-haves and limits. Connecting or nearby cabins, a meeting or fellowship space, a celebration, adults only versus children, and a budget range per person. The quote form already lists budget bands from under $1,000 per person through $10,000 or more, plus "flexible / not sure."

What not to promise the group yet. A free berth is described on the group page as something that can apply once enough cabins are booked, or the value can go to a group fund. It is not automatic on every sailing. Do not collect deposits from members, or announce a specific perk, until the cabin block and the line's rules for that sailing are confirmed. Cancellation terms belong to the cruise line or resort; the booking FAQ recommends travel insurance for that reason.

The quote form is the request. Group trips can also start on the planning form, which is the path the group travel page uses.`,
    links: [
      { href: '/request-quote?trip_type=Group+Trip', label: 'Request a group quote' },
      { href: '/plan?trip_type=Group+Travel', label: 'Group planning form' },
      { href: '/group-travel', label: 'How group travel works' },
      { href: '/faq', label: 'Booking and payment FAQ' },
    ],
  },
  {
    id: 'cruise-or-resort',
    // TODO(Tim Crestwell): Add the first question you ask when a family is stuck between a cruise and an all-inclusive resort, and one resort or ship you send them toward after that answer. No invented prices or "clients saved" examples.
    question: 'Should a mixed-age group book a cruise or an all-inclusive resort?',
    answer: `Use a cruise when the group wants more than one place and is willing to live on a ship between ports. Use an all-inclusive resort when the group wants one property, a short transfer, and meals and drinks covered in the stay.

The resort FAQ draws a hard line on ages. Sandals is couples-only. Secrets is adults-only. Beaches, Dreams, Hyatt Ziva, and Club Med are the family names that page lists, with kids clubs and family dining. Do not put a Sandals or Secrets stay in front of a group that includes children.

If ages, budgets, or energy levels are far apart, say so on the quote. A resort with a kids club and a quieter pool solves a different problem than a large ocean ship. The cruise FAQ's ocean-versus-river explanation is the other split: ocean ships for the Caribbean, Bahamas, Alaska, and the Mediterranean; river ships for a smaller, more sightseeing-heavy trip, usually for adults.

You can ask for both in one quote. Name the trip type you are leaning toward, or choose "Other" and say you want the cruise and the resort compared.`,
    links: [
      { href: '/all-inclusive', label: 'All-inclusive resorts' },
      { href: '/cruises', label: 'Cruise vacations' },
      { href: '/faq', label: 'Resort and cruise FAQ' },
      { href: '/request-quote', label: 'Request a quote' },
    ],
  },
  {
    id: 'journey-of-honor',
    // TODO(Tim Crestwell): The Journey of Honor page says a portion of every booking supports causes that serve veterans and military families, and that members generally receive 10% off cruises and other vacation packages. Add the cause names, and any eligibility edge cases, only if you want them public. Do not invent a discount beyond what that page already says.
    question: 'How is Journey of Honor different from a regular quote?',
    answer: `Journey of Honor is a Crestwell Travel Services program for veterans, active-duty service members, and their families. The page says it covers any branch, including retirees, people currently serving, and spouses, children, and other family members.

Joining is free. The page says there is no membership fee and no planning fee; you pay for the trip itself. It also says members generally receive 10% off cruises and other vacation packages, and that the advisor confirms the exact discount on the specific trip. Documentation is not required to join or to start planning. A supplier may still ask for ID later for a particular benefit.

The program plans cruises (the page names Carnival, Royal Caribbean, Norwegian, and MSC), all-inclusive resorts in the Caribbean and Mexico, and guided land trips. Family can travel with the service member. A portion of every Journey of Honor booking is described as supporting causes that serve veterans and military families. The page does not name those causes.

Use the Journey of Honor form if this describes you. Use the regular quote form if you are planning a trip that is not part of the program, including a veterans group sailing that is listed on the veterans page rather than inside Journey of Honor.`,
    links: [
      { href: '/journey-of-honor', label: 'Join Journey of Honor' },
      { href: '/veterans', label: 'Veterans and military family travel' },
      { href: '/request-quote', label: 'Request a regular quote' },
    ],
  },
  {
    id: 'signature-experiences',
    // TODO(Tim Crestwell): "Qualified clients" is not defined on the Signature Experiences page. Add a plain description of who you invite, if you are willing to say it publicly.
    question: 'When should I request a quote, and when should I ask about Signature Experiences?',
    answer: `Request a quote when you want options and pricing for a specific kind of trip: a cruise, a resort, a group, a rail vacation, a destination package, or a trip you have not narrowed down yet. That form is open to anyone. You do not need a membership to use it.

Signature Experiences is separate. It is an invitation-based concierge service: one dedicated advisor, curated luxury cruise and resort options, private group planning, and celebration travel. The page says membership is currently complimentary for qualified clients, and that trips are booked and priced separately. Sports and other premium requests are worked with suppliers; the page says availability varies and cannot be guaranteed.

If you already know the trip, use the quote form. If you want to be considered for the concierge membership, request an invitation on the Signature Experiences page. You can do both.`,
    links: [
      { href: '/request-quote', label: 'Request a quote' },
      { href: '/signature-experiences', label: 'Signature Experiences' },
    ],
  },
  {
    id: 'first-cruise-quote',
    // TODO(Tim Crestwell): The quote confirmation says a specialist will be in touch within 24 hours. The FAQ says within one business day. The contact page says within 24 hours on business days. Pick one public response time and use it in all three places.
    question: 'What should I have ready for a first cruise quote?',
    answer: `The quote form asks for a name, email, phone, trip type, destination, departure date, number of adults and children, a budget band, how flexible the dates are, and anything you want the advisor to know. You can leave the destination blank in the message if you are not sure, and you can say so.

Useful extras, if you know them: your home city (so port and flight choices are real), whether anyone in the party is uneasy about flying home from a foreign port, and whether you want the cruise only or flights and a hotel as well. Passport and closed-loop cruise document rules are covered on the FAQ page; you do not have to solve them before you write in.

The quote page says a travel specialist will be in touch within 24 hours. The FAQ describes follow-up within one business day. Planning is described across the site as complimentary, with Crestwell compensated by the cruise lines and resorts rather than by a planning fee added to your fare.

If you would rather answer the questions in a shorter planner, the plan page collects the same kind of trip brief and links to the budget calculator.`,
    links: [
      { href: '/request-quote?trip_type=Cruise+Vacation', label: 'Request a cruise quote' },
      { href: '/plan', label: 'Start planning' },
      { href: '/budget', label: 'Budget calculator' },
      { href: '/faq', label: 'Documents, deposits, and insurance FAQ' },
      { href: '/travel-agent-chattanooga', label: 'City pages, starting with Chattanooga' },
    ],
  },
];
