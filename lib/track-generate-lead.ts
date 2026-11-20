// One generate_lead per successful submission:
// a single plain dataLayer push (GTM custom event — the container only has
// Google Ads tags) and a single gtag event (the direct GA4 tag).
// gtag.js ignores the plain object, so GA4 records the event once.
// Call only after the server has confirmed the submission succeeded,
// and before any navigation. transport_type beacon lets the hit leave
// the page even if the browser unloads immediately after.

import { isLiveAnalyticsHost, isPaymentPath } from '@/lib/analytics-config';

export type GenerateLeadParams = {
  lead_source: string;
  trip_type?: string;
  destination?: string;
};

function installGtagStub(): void {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === 'function') return;
  // Must push the Arguments object. gtag.js does not run a plain array as a command,
  // so a lead fired before gtag.js loads would otherwise be dropped.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  } as Window['gtag'];
}

function knownValue(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function canSendAnalytics(): boolean {
  return typeof window !== 'undefined' && isLiveAnalyticsHost(window.location.hostname);
}

export function trackGenerateLead({ lead_source, trip_type, destination }: GenerateLeadParams): void {
  if (!canSendAnalytics()) return;

  const source = knownValue(lead_source);
  if (!source) return;

  const tripType = knownValue(trip_type);
  const destinationValue = knownValue(destination);

  const leadPayload: Record<string, unknown> = {
    event: 'generate_lead',
    lead_source: source,
  };
  if (tripType) leadPayload.trip_type = tripType;
  if (destinationValue) leadPayload.destination = destinationValue;

  installGtagStub();
  window.dataLayer.push(leadPayload);

  const eventParams: Record<string, unknown> = {
    event_category: 'engagement',
    event_label: tripType || source,
    lead_source: source,
    value: 1,
    transport_type: 'beacon',
  };
  if (tripType) eventParams.trip_type = tripType;
  if (destinationValue) eventParams.destination = destinationValue;

  const path = window.location.pathname;
  if (isPaymentPath(path)) {
    eventParams.page_path = path;
    eventParams.page_location = window.location.origin + path;
  }

  window.gtag('event', 'generate_lead', eventParams);
}
