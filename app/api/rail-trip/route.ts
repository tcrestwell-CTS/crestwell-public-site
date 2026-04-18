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

    // ── Parse title ─────────────────────────────────────────────────────
    const titleMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/s);
    const rawTitle = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';

    // ── Parse price & meta ───────────────────────────────────────────────
    const priceMatch = html.match(/data-price="(\d+)"/);
    const daysMatch  = html.match(/data-days="(\d+)"/);
    const codeMatch  = html.match(/data-code="([^"]+)"/);
    const ratingMatch = html.match(/data-rating="([^"]+)"/);
    const reviewMatch = html.match(/\((\d+)\s*reviews?\)/);

    // ── Parse day-by-day itinerary ────────────────────────────────────────
    const dayRegex = /class="h3 handle[^"]*"[^>]*>(Day \d+[^<]+)<\/div><div>(.*?)<\/div><\/div>/gs;
    const days: { title: string; content: string }[] = [];
    let m;
    while ((m = dayRegex.exec(html)) !== null) {
      const content = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      if (content.length > 20) days.push({ title: m[1].trim(), content });
    }

    // ── Parse what's included ────────────────────────────────────────────
    const inclIdx = html.indexOf("What\'s included");
    const inclSection = inclIdx > 0 ? html.slice(inclIdx, inclIdx + 2000) : '';
    const inclItems: Record<string, string[]> = {};
    const catRegex = /<span class="upper">([^<]+)<\/span><ul>(.*?)<\/ul>/gs;
    let cm;
    while ((cm = catRegex.exec(inclSection)) !== null) {
      const cat = cm[1].trim();
      const items = [...cm[2].matchAll(/<li>(.*?)<\/li>/gs)]
        .map(x => x[1].replace(/<[^>]+>/g, '').trim())
        .filter(Boolean);
      if (items.length) inclItems[cat] = items;
    }

    // ── Hero image ────────────────────────────────────────────────────────
    const imgMatch = html.match(/media\/[\d]+\/([^_"]+)_tourlisting\.jpg/);
    const heroImg = imgMatch
      ? `https://www.vacationsbyrail.com/media/${imgMatch[0].replace('_tourlisting', '')}`
      : null;

    // ── Rewrite content via Claude API ───────────────────────────────────
    const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
    let rewritten: { overview: string; days: { title: string; content: string }[] } | null = null;

    if (ANTHROPIC_KEY && days.length > 0) {
      const prompt = `You are writing for Crestwell Travel Services, a boutique travel agency in the Southeast US (Georgia, Tennessee, Alabama). Rewrite the following rail vacation content in a warm, personal, expert travel advisor tone — as if Tim Crestwell personally recommends this trip to his clients. Keep all factual details accurate. Be enthusiastic but not salesy. Use "you" language. Keep each day description to 2-3 sentences.

Trip: ${rawTitle}

Original overview (first day): ${days[0]?.content?.slice(0, 500)}

Days:
${days.map(d => `${d.title}: ${d.content.slice(0, 400)}`).join('\n\n')}

Return valid JSON only:
{
  "overview": "2-3 sentence overview of the whole trip",
  "days": [{"title": "Day 1 - [title]", "content": "rewritten 2-3 sentence description"}, ...]
}`;

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
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) rewritten = JSON.parse(jsonMatch[0]);
      } catch (_) {
        // fall through to raw content
      }
    }

    return NextResponse.json({
      title: rawTitle,
      price: priceMatch ? parseInt(priceMatch[1]) : null,
      days_count: daysMatch ? parseInt(daysMatch[1]) : null,
      code: codeMatch?.[1] || null,
      rating: ratingMatch ? parseFloat(ratingMatch[1]) : null,
      reviews: reviewMatch ? parseInt(reviewMatch[1]) : null,
      heroImg,
      vbrUrl,
      inclusions: inclItems,
      rawDays: days,
      overview: rewritten?.overview || days[0]?.content?.slice(0, 300) || '',
      days: rewritten?.days || days,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
