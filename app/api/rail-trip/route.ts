import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const vbrPath = searchParams.get('path');
  if (!vbrPath) return NextResponse.json({ error: 'No path' }, { status: 400 });

  const vbrUrl = vbrPath.startsWith('http')
    ? vbrPath
    : `https://www.vacationsbyrail.com${vbrPath}`;

  try {
    const res = await fetch(vbrUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CrestwellTravel/1.0)' },
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`VBR fetch ${res.status}`);
    const html = await res.text();

    // ── Parse title ───────────────────────────────────────────────────────
    const h1Start = html.indexOf('<h1');
    const h1End   = html.indexOf('</h1>', h1Start);
    const h1Inner = h1Start > -1 && h1End > -1 ? html.slice(h1Start, h1End) : '';
    const rawTitle = h1Inner.replace(/<[^>]+>/g, '').trim();

    // ── Parse price & meta ────────────────────────────────────────────────
    const priceMatch  = html.match(/data-price="(\d+)"/);
    const daysMatch   = html.match(/data-days="(\d+)"/);
    const ratingMatch = html.match(/data-rating="([^"]+)"/);
    const reviewMatch = html.match(/\((\d+)\s*reviews?\)/);

    // ── Parse day-by-day itinerary via string splitting (no /s flag) ──────
    const days: { title: string; content: string }[] = [];
    const HANDLE = 'class="h3 handle';
    let searchFrom = 0;
    while (true) {
      const handleIdx = html.indexOf(HANDLE, searchFrom);
      if (handleIdx === -1) break;
      // Find the closing > of this div
      const closeTag = html.indexOf('>', handleIdx);
      if (closeTag === -1) break;
      // Title is between > and </div>
      const titleEnd = html.indexOf('</div>', closeTag);
      if (titleEnd === -1) break;
      const title = html.slice(closeTag + 1, titleEnd).replace(/<[^>]+>/g, '').trim();
      // Content div comes right after
      const contentDivStart = html.indexOf('<div>', titleEnd);
      if (contentDivStart === -1) break;
      const contentDivEnd = html.indexOf('</div></div>', contentDivStart);
      if (contentDivEnd === -1) break;
      const rawContent = html.slice(contentDivStart + 5, contentDivEnd);
      const content = rawContent.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      if (title.match(/Day \d+/) && content.length > 20) {
        days.push({ title, content });
      }
      searchFrom = contentDivEnd + 12;
    }

    // ── Parse what's included via string splitting ─────────────────────────
    const inclItems: Record<string, string[]> = {};
    const WHATS = "What's included";
    const inclIdx = html.indexOf(WHATS);
    if (inclIdx > -1) {
      const inclSection = html.slice(inclIdx, inclIdx + 2500);
      const UPPER = '<span class="upper">';
      let pos = 0;
      while (true) {
        const catStart = inclSection.indexOf(UPPER, pos);
        if (catStart === -1) break;
        const catEnd = inclSection.indexOf('</span>', catStart);
        if (catEnd === -1) break;
        const cat = inclSection.slice(catStart + UPPER.length, catEnd).trim();
        const ulStart = inclSection.indexOf('<ul>', catEnd);
        const ulEnd   = inclSection.indexOf('</ul>', ulStart);
        if (ulStart === -1 || ulEnd === -1) break;
        const ulContent = inclSection.slice(ulStart, ulEnd);
        const items: string[] = [];
        let liPos = 0;
        while (true) {
          const liStart = ulContent.indexOf('<li>', liPos);
          if (liStart === -1) break;
          const liEnd = ulContent.indexOf('</li>', liStart);
          if (liEnd === -1) break;
          const item = ulContent.slice(liStart + 4, liEnd).replace(/<[^>]+>/g, '').trim();
          if (item) items.push(item);
          liPos = liEnd + 5;
        }
        if (items.length) inclItems[cat] = items;
        pos = ulEnd + 5;
      }
    }

    // ── Hero image ─────────────────────────────────────────────────────────
    const imgMatch = html.match(/media\/[\d]+\/[^_"]+_tourlisting\.jpg/);
    const heroImg = imgMatch
      ? `https://www.vacationsbyrail.com/${imgMatch[0].replace('_tourlisting', '')}`
      : null;

    // ── Rewrite via Claude ─────────────────────────────────────────────────
    const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
    let rewritten: { overview: string; days: { title: string; content: string }[] } | null = null;

    if (ANTHROPIC_KEY && days.length > 0) {
      const prompt = `You are writing for Crestwell Travel Services, a boutique travel agency in the Southeast US. Rewrite this rail vacation content in a warm, personal, expert travel advisor tone — as if Tim Crestwell personally recommends this trip to clients. Keep all facts accurate. Be enthusiastic but not salesy. Use "you" language. Keep each day to 2-3 sentences.

Trip: ${rawTitle}

Days:
${days.map(d => `${d.title}: ${d.content.slice(0, 350)}`).join('\n\n')}

Return JSON only, no markdown:
{"overview":"2-3 sentence overview","days":[{"title":"Day 1 - title","content":"rewritten 2-3 sentences"}]}`;

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
        const jsonStart = text.indexOf('{');
        const jsonEnd   = text.lastIndexOf('}');
        if (jsonStart > -1 && jsonEnd > jsonStart) {
          rewritten = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
        }
      } catch (_) { /* fall through */ }
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
