// lib/utm-capture.ts
// UTM + gclid attribution capture for Google Ads conversion tracking

/**
 * Read attribution values stored in localStorage.
 * Merge the returned object into your quote form submission payload.
 * Safe to call — returns empty object server-side or if localStorage is unavailable.
 */
export function getAttribution(): Record<string, string | null> {
  if (typeof window === 'undefined') return {};
  try {
    return {
      gclid:        localStorage.getItem('gclid'),
      utm_source:   localStorage.getItem('utm_source'),
      utm_medium:   localStorage.getItem('utm_medium'),
      utm_campaign: localStorage.getItem('utm_campaign'),
      utm_term:     localStorage.getItem('utm_term'),
      utm_content:  localStorage.getItem('utm_content'),
    };
  } catch {
    return {};
  }
}

/**
 * Clear attribution data from localStorage.
 * Call this after a successful form submission if needed.
 */
export function clearAttribution(): void {
  if (typeof window === 'undefined') return;
  try {
    ['gclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
      .forEach(k => localStorage.removeItem(k));
  } catch {
    // ignore
  }
}
