import { NextRequest, NextResponse } from 'next/server';

function stripTags(s: string) {
  return s
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const vbrPath = searchParams.get('path');
  if (!vbrPath) return NextResponse.json({ error: 'No path' }, { status: 400 });

  const vbrUrl = vbrPath.startsWith('http')
    ? vbrPath
    : 'https://www.vacationsbyrail.com' + vbrPath;

  try {
    const res = await fetch(vbrUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CrestwellTravel/1.0)' },
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error('VBR fetch ' + res.status);
    const html = await res.text();

    // Title
    const h1Open  = html.indexOf('<h1 ');
    const h1Close = html.indexOf('</h1>', h1Open);
    const rawTitle = h1Open > -1 && h1Close > -1
      ? stripTags(html.slice(h1Open, h1Close))
      : '';

    // Price / meta
    const priceMatch  = html.match(/data-price="(\d+)"/);
    const daysMatch   = html.match(/data-days="(\d+)"/);
    const ratingMatch = html.match(/data-rating="([^"]+)"/);
    const reviewMatch = html.match(/\((\d+)\s*reviews?\)/);

    // Day-by-day itinerary
    const days: { title: string; content: string }[] = [];
    const HANDLE = 'class="h3 handle';
    let pos = 0;
    while (days.length < 15) {
      const hIdx = html.indexOf(HANDLE, pos);
      if (hIdx === -1) break;
      const divEnd = html.indexOf('>', hIdx);
      if (divEnd === -1) break;
      const svgEnd = html.indexOf('</svg>', divEnd);
      const titleDivClose = html.indexOf('</div>', divEnd);
      if (titleDivClose === -1) break;
      const titleStart = svgEnd > -1 && svgEnd < titleDivClose ? svgEnd + 6 : divEnd + 1;
      const title = html.slice(titleStart, titleDivClose).replace(/<[^>]+>/g, '').trim();
      const contentOpen = html.indexOf('<div>', titleDivClose);
      if (contentOpen === -1) break;
      const contentClose = html.indexOf('</div></div>', contentOpen);
      if (contentClose === -1) break;
      const content = stripTags(html.slice(contentOpen + 5, contentClose));
      if (title.length > 2 && content.length > 20) {
        days.push({ title, content });
      }
      pos = contentClose + 12;
    }

    // What's included
    const inclItems: Record<string, string[]> = {};
    const inclMarkers = ['’s included', "What's included", 'whatsIncluded'];
    let inclIdx = -1;
    for (const marker of inclMarkers) {
      inclIdx = html.indexOf(marker);
      if (inclIdx > -1) { inclIdx = Math.max(0, inclIdx - 5); break; }
    }
    if (inclIdx > -1) {
      const sect = html.slice(inclIdx, inclIdx + 3000);
      const UPPER = '<span class="upper">';
      let uPos = 0;
      while (true) {
        const catStart = sect.indexOf(UPPER, uPos);
        if (catStart === -1) break;
        const catEnd = sect.indexOf('</span>', catStart);
        if (catEnd === -1) break;
        const cat = sect.slice(catStart + UPPER.length, catEnd).replace(/&amp;/g, '&').trim();
        const ulStart = sect.indexOf('<ul>', catEnd);
        const ulEnd   = sect.indexOf('</ul>', ulStart);
        if (ulStart === -1 || ulEnd === -1) break;
        const ulContent = sect.slice(ulStart + 4, ulEnd);
        const items: string[] = [];
        let liPos = 0;
        while (true) {
          const liStart = ulContent.indexOf('<li>', liPos);
          if (liStart === -1) break;
          const liEnd = ulContent.indexOf('</li>', liStart);
          if (liEnd === -1) break;
          const item = stripTags(ulContent.slice(liStart + 4, liEnd));
          if (item) items.push(item);
          liPos = liEnd + 5;
        }
        if (items.length) inclItems[cat] = items;
        uPos = ulEnd + 5;
      }
    }

    // Hero image
    const imgMatch = html.match(/media\/[\d]+\/[^"_]+_tourlisting\.jpg/);
    const heroImg = imgMatch
      ? 'https://www.vacationsbyrail.com/' + imgMatch[0].replace('_tourlisting', '')
      : null;

    // Rewrite via Claude — build prompt using string concat to avoid backtick issues
    const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
    let rewritten: { overview: string; days: { title: string; content: string }[] } | null = null;

    if (ANTHROPIC_KEY && days.length > 0) {
      const dayLines = days.map(function(d) { return d.title + ': ' + d.content.slice(0, 350); }).join('\n\n');
      const prompt = [
        'You are writing for Crestwell Travel Services, a boutique travel agency in the Southeast US.',
        'Rewrite this rail vacation in a warm, personal, expert travel advisor tone — as if Tim Crestwell personally recommends this trip.',
        'Keep all facts accurate. Be enthusiastic but not salesy. Use "you" language. Keep each day to 2-3 sentences.',
        '',
        'Trip: ' + rawTitle,
        '',
        'Days:',
        dayLines,
        '',
        'Return JSON only, no markdown:',
        '{"overview":"2-3 sentence overview","days":[{"title":"day title","content":"rewritten 2-3 sentences"}]}',
      ].join('\n');

      try {
        const aiRes = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': ANTHROPIC_KEY,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 2000,
            messages: [{ role: 'user', content: prompt }],
          }),
        });
        const aiData = await aiRes.json();
        const text = aiData.content?.[0]?.text || '';
        const jStart = text.indexOf('{');
        const jEnd   = text.lastIndexOf('}');
        if (jStart > -1 && jEnd > jStart) {
          rewritten = JSON.parse(text.slice(jStart, jEnd + 1));
        }
      } catch (_) { /* use raw */ }
    }

    return NextResponse.json({
      title: rawTitle,
      price: priceMatch ? parseInt(priceMatch[1]) : null,
      days_count: daysMatch ? parseInt(daysMatch[1]) : null,
      rating: ratingMatch ? parseFloat(ratingMatch[1]) : null,
      reviews: reviewMatch ? parseInt(reviewMatch[1]) : null,
      heroImg,
      vbrUrl,
      inclusions: inclItems,
      overview: rewritten?.overview || (days[0]?.content?.slice(0, 300) ?? ''),
      days: rewritten?.days || days,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
