import { ImageResponse } from 'next/og';
import propertiesData from '../../../../data/properties.json';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

type Prop = {
  slug: string;
  title: string;
  price_thb: number;
  bedrooms: number;
  type: string;
  destination: string | null;
  image: string | null;
};

const ALL = propertiesData as Prop[];

function formatThb(n: number): string {
  if (n <= 0) return 'Price on request';
  if (n >= 1_000_000) return `฿${(n / 1_000_000).toFixed(1)}M`;
  return `฿${Math.round(n).toLocaleString('en-US')}`;
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = ALL.find((p) => p.slug === slug);

  // Brand-only fallback
  if (!property) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#0A0A0A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: 56, color: '#F8F5F0', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
            Shine Asia Estate
          </span>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  const price = formatThb(property.price_thb);
  const title =
    property.title.length > 72
      ? property.title.slice(0, 72) + '…'
      : property.title;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#0A0A0A',
          display: 'flex',
          position: 'relative',
        }}
      >
        {/* Hero image */}
        {property.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={property.image}
            alt=""
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        )}

        {/* Dark gradient overlay — bottom-heavy for text legibility */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(to top, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.80) 35%, rgba(10,10,10,0.30) 65%, rgba(10,10,10,0.55) 100%)',
            display: 'flex',
          }}
        />

        {/* Content layer */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '52px 60px',
          }}
        >
          {/* Top: logo */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span
              style={{
                fontSize: 30,
                color: '#F8F5F0',
                fontStyle: 'italic',
                fontFamily: 'Georgia, serif',
                lineHeight: 1,
              }}
            >
              Shine
            </span>
            <span
              style={{
                fontSize: 10,
                color: '#C9A96E',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontFamily: 'sans-serif',
              }}
            >
              ASIA ESTATE
            </span>
          </div>

          {/* Bottom: property info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Location chip */}
            {property.destination && (
              <div
                style={{
                  display: 'flex',
                  width: 'fit-content',
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    color: '#C9A96E',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    fontFamily: 'sans-serif',
                  }}
                >
                  {property.destination} · KOH SAMUI
                </span>
              </div>
            )}

            {/* Title */}
            <div
              style={{
                fontSize: property.title.length > 50 ? 38 : 46,
                color: '#F8F5F0',
                fontStyle: 'italic',
                fontFamily: 'Georgia, serif',
                lineHeight: 1.18,
                maxWidth: 820,
              }}
            >
              {title}
            </div>

            {/* Stats row */}
            <div
              style={{
                display: 'flex',
                gap: 32,
                alignItems: 'center',
                paddingTop: 4,
              }}
            >
              <span
                style={{
                  fontSize: 22,
                  color: '#C9A96E',
                  fontFamily: 'Georgia, serif',
                }}
              >
                {price}
              </span>
              <span
                style={{
                  width: 1,
                  height: 18,
                  backgroundColor: 'rgba(201,169,110,0.4)',
                }}
              />
              {property.bedrooms > 0 && (
                <span
                  style={{
                    fontSize: 13,
                    color: 'rgba(248,245,240,0.65)',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontFamily: 'sans-serif',
                  }}
                >
                  {property.bedrooms} bed
                </span>
              )}
              <span
                style={{
                  fontSize: 13,
                  color: 'rgba(248,245,240,0.65)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontFamily: 'sans-serif',
                }}
              >
                {property.type}
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
