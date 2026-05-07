import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shine Asia Estate — A small, considered portfolio. Koh Samui, by hand.',
  description:
    'Curators of exceptional properties across Koh Samui and the Thai islands. Villas, beachfront houses, and private land — placed quietly into careful hands.',
  metadataBase: new URL('https://shineasiaestate.com'),
  openGraph: {
    title: 'Shine Asia Estate',
    description: 'A small, considered portfolio. Koh Samui, by hand.',
    type: 'website',
    locale: 'en_US',
  },
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
