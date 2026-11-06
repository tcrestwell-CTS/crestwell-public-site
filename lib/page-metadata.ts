import type { Metadata } from 'next';
import { BUSINESS_NAME, SITE_URL } from '@/lib/site';

export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}): Metadata {
  const title = opts.title.includes(BUSINESS_NAME) ? opts.title : `${opts.title} | ${BUSINESS_NAME}`;
  const url = opts.path === '/' ? SITE_URL : `${SITE_URL}${opts.path}`;
  const robots = opts.index === false
    ? { index: false, follow: false }
    : { index: true, follow: true };

  return {
    title,
    description: opts.description,
    alternates: { canonical: url },
    robots,
    openGraph: {
      title,
      description: opts.description,
      url,
      siteName: BUSINESS_NAME,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: opts.description,
    },
  };
}
