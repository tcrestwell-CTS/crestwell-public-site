import {
  ADDRESS_COUNTRY,
  ADDRESS_LOCALITY,
  ADDRESS_REGION,
  BUSINESS_NAME,
  EMAIL,
  FLORIDA_SELLER_OF_TRAVEL,
  ORGANIZATION_ID,
  PHONE_E164,
  SAME_AS,
  SERVICE_AREA_STATES,
  SITE_DOMAIN,
  SITE_URL,
  WEBSITE_ID,
} from '@/lib/site';

export type Faq = { question: string; answer: string };

/** Organization + TravelAgency. Only fields that are visible site-wide. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['TravelAgency', 'LocalBusiness'],
    '@id': ORGANIZATION_ID,
    name: BUSINESS_NAME,
    url: SITE_URL,
    telephone: PHONE_E164,
    email: EMAIL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: ADDRESS_LOCALITY,
      addressRegion: ADDRESS_REGION,
      addressCountry: ADDRESS_COUNTRY,
    },
    areaServed: [
      ...SERVICE_AREA_STATES.map((name) => ({ '@type': 'State', name })),
      { '@type': 'Country', name: 'United States' },
    ],
    description:
      'Crestwell Travel Services plans cruises, all-inclusive resorts, and group travel for families, couples, and groups. Based in Chattanooga, TN. The website is crestwellgetaways.com.',
    knowsAbout: [
      'Cruise vacations',
      'All-inclusive resorts',
      'Group travel',
      'Family vacations',
      'Journey of Honor veteran and military family travel',
      'Signature Experiences',
    ],
    identifier: {
      '@type': 'PropertyValue',
      name: 'Florida Seller of Travel',
      value: FLORIDA_SELLER_OF_TRAVEL,
    },
    sameAs: [...SAME_AS],
  };
}

/** WebSite node. No SearchAction: the site has no search-results URL. */
export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: BUSINESS_NAME,
    url: SITE_URL,
    description: `Travel planning from ${BUSINESS_NAME}. Website: ${SITE_DOMAIN}.`,
    publisher: { '@id': ORGANIZATION_ID },
  };
}

export function breadcrumbJsonLd(items: { name: string; path?: string }[], id?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    ...(id ? { '@id': id } : {}),
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: item.path === '/' ? SITE_URL : `${SITE_URL}${item.path}` } : {}),
    })),
  };
}

export function faqPageJsonLd(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
