import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Car Rental Request | Crestwell Travel Services',
  description: 'Request a car rental through Crestwell Travel Services. We work with Enterprise, Alamo, National, Hertz, Thrifty, Dollar, and Sixt. One-way and round-trip options.',
};

export default function CarRentalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
