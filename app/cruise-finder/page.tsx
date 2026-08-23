import type { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import CruiseFinderSearch from '@/components/CruiseFinderSearch';

export const metadata: Metadata = {
  title: 'Cruise Finder — Three Hand-Picked Cruises | Crestwell Travel Services',
  description: 'Answer one quick question and get three hand-picked cruise options from your Crestwell advisor — free, in about a minute.',
};

export default function CruiseFinderPage() {
  return (
    <main style={{ background: 'var(--warm-white)', color: 'var(--navy)' }}>
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Cruise Finder' }]} />
      <CruiseFinderSearch />
    </main>
  );
}
