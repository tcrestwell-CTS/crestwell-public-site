import type { Metadata } from 'next';
import CircleClient from './CircleClient';

export const metadata: Metadata = {
  title: 'The Crestwell Circle — Members-Only Travel Community',
  description: 'A small, members-only community of travelers who want honest advice, first access to hosted trips, and a real person on the other end. Free to join.',
  openGraph: {
    title: 'The Crestwell Circle',
    description: 'First access. Honest advice. Monthly port intel. Free to join.',
  },
};

export default function CirclePage() {
  return <CircleClient />;
}
