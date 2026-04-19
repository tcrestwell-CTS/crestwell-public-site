import type { Metadata } from 'next';
import VacationsByRailClient from '@/components/VacationsByRailClient';

export const metadata: Metadata = {
  title: 'Vacations by Rail | Scenic Train Packages | Crestwell Travel Services',
  description: `Explore the world by train with Crestwell Travel. We partner with Vacations By Rail to book scenic rail vacations across the USA, Canada, Europe, and beyond. Independent journeys, escorted tours, and rail & cruise combos. Planning is always free.`,
  openGraph: {
    title: 'Vacations by Rail — Crestwell Travel Services',
    description: `Scenic train vacations across the USA, Canada, Europe, and beyond. Independent rail journeys and escorted tours booked through Vacations By Rail. Planning is always free.`,
    url: 'https://crestwellgetaways.com/vacations-by-rail',
    siteName: 'Crestwell Travel Services',
    type: 'website',
  },
};

export default function VacationsByRailPage() {
  return <VacationsByRailClient />;
}
