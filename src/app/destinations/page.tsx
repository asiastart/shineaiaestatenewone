import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Destinations — Shine Asia Estate',
  description: 'Explore our curated portfolio across Koh Samui, Paris, and the French Riviera.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function DestinationsPage() {
  redirect('/properties');
}
