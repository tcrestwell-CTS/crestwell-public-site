// Public identity for Crestwell Travel Services.
// Use these constants for metadata, visible labels, and JSON-LD.
// Do not add a street address, rating, price range, or social profile
// that is not already published on the site.

export const BUSINESS_NAME = 'Crestwell Travel Services';

/** Canonical origin. The public site is served at this host (no www). */
export const SITE_URL = 'https://crestwellgetaways.com';

export const SITE_DOMAIN = 'crestwellgetaways.com';

export const PHONE_DISPLAY = '888.508.6893';
export const PHONE_E164 = '+18885086893';
export const EMAIL = 'info@crestwellgetaways.com';

export const ADDRESS_LOCALITY = 'Chattanooga';
export const ADDRESS_REGION = 'TN';
export const ADDRESS_COUNTRY = 'US';

/** Florida Seller of Travel reference printed in the site footer. */
export const FLORIDA_SELLER_OF_TRAVEL = 'ST46414';

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Profiles linked from the homepage (and, for Facebook, the contact page).
 * Contact uses a different Instagram path (`/crestwelltravels/`) and a
 * numeric LinkedIn company URL. Those are not included here until Tim
 * confirms which profiles are official. See the PR description.
 * Trustpilot is the review listing linked from the homepage.
 */
export const SAME_AS = [
  'https://www.facebook.com/profile.php?id=61572819131364',
  'https://www.instagram.com/crestwelltravel',
  'https://www.linkedin.com/company/crestwell-travel-services',
  'https://www.tiktok.com/@crestwelltravel',
  'https://www.trustpilot.com/review/crestwellgetaways.com',
] as const;

export const SERVICE_AREA_STATES = ['Georgia', 'Tennessee', 'Alabama', 'Florida'] as const;
