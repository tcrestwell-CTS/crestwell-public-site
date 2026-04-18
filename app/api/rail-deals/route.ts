import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export const revalidate = 3600; // cache for 1 hour

export async function GET() {
  try {
    const res = await fetch('https://www.vacationsbyrail.com/late-availability/', {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CrestwellTravel/1.0)' },
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`VBR fetch failed: ${res.status}`);
    const html = await res.text();
    const $ = cheerio.load(html);

    const deals: any[] = [];

    // Each tour card — VBR uses article or div with tour listing pattern
    $('a[href*="/tours/"]').each((_, el) => {
      const $el = $(el);
      const href = $el.attr('href') || '';
      if (!href.includes('/tours/')) return;

      // Get the parent card container
      const $card = $el.closest('div[class*="tour"], li, article').first();
      if (!$card.length) return;

      const name = $card.find('h3, h2, .tour-name, [class*="title"]').first().text().trim();
      if (!name || deals.find(d => d.name === name)) return;

      const priceText = $card.find('[class*="price"], .from-price, strong').text();
      const priceMatch = priceText.match(/\$([\d,]+)/);
      const price = priceMatch ? parseInt(priceMatch[1].replace(',', '')) : null;

      const days = $card.find('[class*="day"], .duration').text().match(/(\d+)\s*day/i)?.[1] || null;

      const save = $card.find('[class*="save"], .discount, .badge').first().text().trim() || null;

      const img = $card.find('img').first().attr('src') || null;
      const desc = $card.find('p').first().text().trim().substring(0, 200) || null;

      const months = $card.find('[class*="month"], .departure-dates').text().trim() || null;

      const type = $card.find('img[alt*="Escorted"], img[alt*="Independent"]').first().attr('alt') || 'Independent';

      if (name && price) {
        deals.push({
          name,
          url: href.startsWith('http') ? href : `https://www.vacationsbyrail.com${href}`,
          price,
          days: days ? parseInt(days) : null,
          save,
          img: img && img.startsWith('http') ? img : img ? `https://www.vacationsbyrail.com${img}` : null,
          desc,
          months,
          type,
        });
      }
    });

    // Deduplicate by name and limit to 12
    const unique = Array.from(new Map(deals.map(d => [d.name, d])).values()).slice(0, 12);

    return NextResponse.json({
      deals: unique,
      count: unique.length,
      source: 'vacationsbyrail.com/late-availability',
      fetched_at: new Date().toISOString(),
    });
  } catch (err: any) {
    // Fallback static deals if scrape fails
    return NextResponse.json({
      deals: FALLBACK_DEALS,
      count: FALLBACK_DEALS.length,
      source: 'fallback',
      fetched_at: new Date().toISOString(),
    });
  }
}

const FALLBACK_DEALS = [
  {
    name: 'Grand Canyon Railway Rails to the Rim Adventure',
    url: 'https://www.vacationsbyrail.com/tours/grand-canyon-railway-rails-to-the-rim-adventure-chicago/',
    price: 1595,
    days: 6,
    save: 'Save 10%',
    img: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=600&q=80',
    desc: 'Join Amtrak Southwest Chief from Chicago to Flagstaff, then board the 120-year-old Grand Canyon Railway.',
    months: 'May · Jun · Jul 2026',
    type: 'Independent',
  },
  {
    name: 'Alaska Wilderness Tour',
    url: 'https://www.vacationsbyrail.com/tours/alaska-wilderness-tour/',
    price: 2695,
    days: 7,
    save: 'Save 10%',
    img: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600&q=80',
    desc: 'Denali Star, Talkeetna jetboat, tundra wilderness tours, and Alaska Railroad through the Last Frontier.',
    months: 'May · Jun · Jul 2026',
    type: 'Independent',
  },
  {
    name: 'Colorado Rail Experience',
    url: 'https://www.vacationsbyrail.com/tours/colorado-rail-experience/',
    price: 3415,
    days: 8,
    save: 'Save 10%',
    img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80',
    desc: 'Six scenic railways including Durango & Silverton, Georgetown Loop, and the Royal Gorge Route.',
    months: 'Jun · Jul 2026',
    type: 'Escorted',
  },
  {
    name: 'Alaska the Greatland',
    url: 'https://www.vacationsbyrail.com/tours/alaska-the-greatland/',
    price: 4945,
    days: 9,
    save: 'Save 10%',
    img: 'https://images.unsplash.com/photo-1527489377706-5bf97e608852?w=600&q=80',
    desc: 'Fairbanks riverboat, Denali dog sledding, Alaska Railroad southbound — nine days in the wild.',
    months: 'May · Jun · Jul 2026',
    type: 'Escorted',
  },
  {
    name: 'Zermatt & St. Moritz featuring Glacier Express',
    url: 'https://www.vacationsbyrail.com/tours/zermatt-st-moritz-glacier-express/',
    price: 3295,
    days: 8,
    save: 'Save 10%',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    desc: 'Swiss Alps resort towns, the legendary Glacier Express, and panoramic mountain scenery.',
    months: 'May · Jun 2026',
    type: 'Independent',
  },
  {
    name: 'Canadian Rockies by Rail',
    url: 'https://www.vacationsbyrail.com/tours/canadian-rockies-by-rail/',
    price: 3995,
    days: 9,
    save: 'Save 10%',
    img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80',
    desc: 'Rocky Mountaineer daylight journey through BC and Alberta — Jasper, Banff, Lake Louise.',
    months: 'May · Jun · Jul 2026',
    type: 'Independent',
  },
];
