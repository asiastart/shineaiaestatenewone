export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Shine Asia Estate',
    url: 'https://shineasiaestate.com',
    telephone: '+66658314819',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Koh Samui',
      addressRegion: 'Surat Thani',
      addressCountry: 'TH',
    },
    areaServed: 'Koh Samui, Thailand',
    description:
      'Luxury real estate agency specialising in Koh Samui villas and properties for international buyers.',
    priceRange: '฿฿฿฿',
    openingHours: 'Mo-Su 09:00-19:00',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
