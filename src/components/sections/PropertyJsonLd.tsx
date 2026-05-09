type PropertyJsonLdProps = {
  property: {
    slug: string;
    title: string;
    bedrooms: number;
    type: string;
    location: string;
    destination?: string | null;
    price_thb: number;
    size_sqm?: number | null;
    image?: string | null;
  };
};

export function PropertyJsonLd({ property }: PropertyJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: `${property.bedrooms} bedroom ${property.type} in ${property.location}, Koh Samui, Thailand`,
    url: `https://shineasiaestate.com/property/${property.slug}`,
    ...(property.image ? { image: property.image } : {}),
    offers: {
      '@type': 'Offer',
      price: property.price_thb,
      priceCurrency: 'THB',
      availability: 'https://schema.org/InStock',
    },
    numberOfRooms: property.bedrooms,
    ...(property.size_sqm
      ? {
          floorSize: {
            '@type': 'QuantitativeValue',
            value: property.size_sqm,
            unitCode: 'MTK',
          },
        }
      : {}),
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.location,
      addressRegion: 'Surat Thani',
      addressCountry: 'TH',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
