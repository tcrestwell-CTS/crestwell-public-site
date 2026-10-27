// Same generate_lead dispatch as app/request-quote/page.tsx:
// one plain dataLayer push for GTM, then one gtag event for the direct GA4 tag.
// Call only after the server has confirmed the submission succeeded.
// The quote form keeps its own inline copy so its payload (including the
// triton / cruise / website lead_source split) stays unchanged.

export type GenerateLeadParams = {
  lead_source: string;
  trip_type?: string;
  destination?: string;
};

export function trackGenerateLead({ lead_source, trip_type, destination }: GenerateLeadParams): void {
  if (typeof window === 'undefined') return;

  const tripType = trip_type?.trim() || 'quote_request';
  const destinationValue = destination?.trim() || undefined;

  const leadPayload: Record<string, unknown> = {
    event: 'generate_lead',
    trip_type: tripType,
    lead_source,
    destination: destinationValue,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(leadPayload);

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', {
      event_category: 'engagement',
      event_label: tripType,
      trip_type: tripType,
      lead_source,
      value: 1,
    });
  }
}
