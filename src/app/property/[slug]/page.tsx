import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppButton } from '@/components/sections/WhatsAppButton';
import { PropertyCard, type Property } from '@/components/sections/PropertyCard';
import { RevealOnScroll } from '@/components/sections/RevealOnScroll';
import { formatPrice } from '@/lib/currency';
import propertiesData from '../../../../data/properties.json';

const ALL = propertiesData as Property[];

const FALLBACK_GALLERY = [
  'https://images.pexels.com/photos/35921780/pexels-photo-35921780.jpeg?auto=compress&cs=tinysrgb&w=2000',
  'https://images.pexels.com/photos/33240623/pexels-photo-33240623.jpeg?auto=compress&cs=tinysrgb&w=2000',
  'https://images.pexels.com/photos/36424877/pexels-photo-36424877.jpeg?auto=compress&cs=tinysrgb&w=2000',
  'https://images.pexels.com/photos/33271606/pexels-photo-33271606.jpeg?auto=compress&cs=tinysrgb&w=2000',
];

export function generateStaticParams() {
  return ALL.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = ALL.find((p) => p.slug === slug);
  if (!property) return { title: 'Property — Shine Asia Estate' };
  return {
    title: `${property.title} — Shine Asia Estate`,
    description: `${property.bedrooms} bedroom ${property.type.toLowerCase()} in ${property.location}, ${property.destination || 'Koh Samui'}. ${formatPrice(property.price_thb, 'THB')}.`,
  };
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = ALL.find((p) => p.slug === slug);
  if (!property) notFound();

  // Build gallery — use real property images, fall back to Pexels if not enough
  const realGallery = [
    ...(property.image ? [property.image] : []),
    ...(property.gallery ?? []),
  ];
  const gallery = realGallery.length >= 4
    ? realGallery
    : [...realGallery, ...FALLBACK_GALLERY].slice(0, Math.max(4, realGallery.length));

  // Similar properties — same destination, exclude current, max 3
  const similar = ALL
    .filter((p) => p.id !== property.id && p.destination === property.destination)
    .slice(0, 3);

  return (
    <>
      <Nav />
      <main>
        {/* Hero — full-bleed primary image */}
        <section className="relative h-[88vh] min-h-[600px] overflow-hidden bg-black pt-20">
          <Image
            src={property.image || FALLBACK_GALLERY[0]}
            alt={property.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0"
               style={{
                 background:
                   'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.85) 100%)',
               }}
          />

          <div className="absolute inset-x-0 bottom-0 z-10 container-luxe pb-16 lg:pb-24">
            <RevealOnScroll>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs uppercase tracking-[0.18em] text-[#C9A96E]">
                  {property.id} · {property.location}
                </span>
                {property.status === 'off-plan' && (
                  <span className="px-3 py-1 border border-[#C9A96E]/40 text-[10px] uppercase tracking-[0.18em] text-[#C9A96E]">
                    Off plan
                  </span>
                )}
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h1 className="serif-italic text-[#F8F5F0] leading-[1.05] max-w-5xl"
                  style={{ fontSize: 'clamp(2.5rem, 1.5rem + 4vw, 5.5rem)' }}>
                {property.title}
              </h1>
            </RevealOnScroll>
            {property.subtitle && (
              <RevealOnScroll delay={0.2}>
                <p className="mt-6 max-w-2xl text-lg text-[#F8F5F0]/80">{property.subtitle}</p>
              </RevealOnScroll>
            )}
          </div>
        </section>

        {/* Specs bar + Price */}
        <section className="border-y border-[#3A3128] py-12">
          <div className="container-luxe grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
              {[
                { label: 'Bedrooms', value: property.bedrooms },
                { label: 'Bathrooms', value: property.bathrooms ?? '—' },
                { label: 'Built', value: property.size_sqm ? `${property.size_sqm} sqm` : '—' },
                { label: 'Type', value: property.type },
              ].map((spec) => (
                <div key={spec.label}>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#6B5E54] mb-2">
                    {spec.label}
                  </div>
                  <div className="serif-italic text-2xl text-[#F8F5F0]">{spec.value}</div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-5 lg:text-right">
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#6B5E54] mb-2">
                Price
              </div>
              <div className="serif-italic text-4xl lg:text-5xl text-[#F8F5F0]">
                {formatPrice(property.price_thb, 'THB')}
              </div>
              <div className="text-sm text-[#6B5E54] mt-2">
                ≈ {formatPrice(property.price_thb, 'USD')} · {formatPrice(property.price_thb, 'EUR')}
              </div>
            </div>
          </div>
        </section>

        {/* Gallery editorial split */}
        <section className="py-section">
          <div className="container-luxe">
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
              <RevealOnScroll className="lg:col-span-8">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#2A2420]">
                  <Image
                    src={gallery[1]}
                    alt={`${property.title} — view 1`}
                    fill
                    sizes="(min-width: 1024px) 66vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1} className="lg:col-span-4 grid grid-rows-2 gap-6 lg:gap-8">
                <div className="relative aspect-square overflow-hidden bg-[#2A2420]">
                  <Image src={gallery[2]} alt={`${property.title} — view 2`} fill sizes="33vw" className="object-cover" />
                </div>
                <div className="relative aspect-square overflow-hidden bg-[#2A2420]">
                  <Image src={gallery[3]} alt={`${property.title} — view 3`} fill sizes="33vw" className="object-cover" />
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* Description + Contact sticky */}
        <section className="py-section border-t border-[#3A3128]">
          <div className="container-luxe grid lg:grid-cols-12 gap-12">
            <RevealOnScroll className="lg:col-span-7">
              <span className="eyebrow">About this house</span>
              <h2 className="serif-italic text-3xl lg:text-4xl text-[#F8F5F0] mt-6 leading-tight">
                A house we have walked, at the hour after rain.
              </h2>

              <div className="mt-10 space-y-6 text-base lg:text-lg text-[#F8F5F0]/75 leading-relaxed">
                <p>
                  This {property.bedrooms}-bedroom {property.type.toLowerCase()} sits in {property.location},
                  {property.destination ? ` on the ${property.destination} coast` : ''}, and reads
                  as architecture rather than as a listing. {property.subtitle}.
                </p>
                <p>
                  We will tell you what we know about it — the wind it stands in, the
                  road that brings you here, what the building cost to make properly.
                  We will tell you what we do not know, and what is worth verifying
                  at the Land Office. The viewing is arranged at the time of day the
                  property is at its best.
                </p>
                <p className="text-[#C9A96E] serif-italic text-xl pt-2">
                  Walking it together is the only way to know if it is right.
                </p>
              </div>

              <div className="mt-12 grid sm:grid-cols-2 gap-x-8 gap-y-6 pt-12 border-t border-[#3A3128]">
                {[
                  ['Bedrooms', property.bedrooms],
                  ['Bathrooms', property.bathrooms ?? '—'],
                  ['Built area', property.size_sqm ? `${property.size_sqm} sqm` : 'On request'],
                  ['Title', 'Chanote — verified'],
                  ['Foreign ownership', 'Leasehold available'],
                  ['Pool', 'Private'],
                  ['Distance to beach', '5-15 min by foot'],
                  ['Year built', 'On request'],
                ].map(([k, v]) => (
                  <div key={k as string} className="flex justify-between border-b border-[#3A3128]/50 pb-3">
                    <span className="text-sm text-[#6B5E54]">{k}</span>
                    <span className="text-sm text-[#F8F5F0]">{v}</span>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            <aside className="lg:col-span-4 lg:col-start-9 lg:sticky lg:top-32 lg:self-start">
              <RevealOnScroll delay={0.15}>
                <div className="bg-[#1F1A15] border border-[#3A3128] p-8 lg:p-10">
                  <span className="text-xs uppercase tracking-[0.18em] text-[#C9A96E]">
                    Arrange a viewing
                  </span>
                  <h3 className="serif-italic text-2xl text-[#F8F5F0] mt-4 leading-tight">
                    We will walk it with you.
                  </h3>
                  <p className="mt-4 text-sm text-[#F8F5F0]/65 leading-relaxed">
                    Mr. Zakaria personally arranges all viewings. By appointment.
                    Often at golden hour.
                  </p>

                  <form className="mt-8 space-y-5">
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full bg-transparent border-b border-[#3A3128] focus:border-[#C9A96E] text-[#F8F5F0] py-3 px-1 text-sm placeholder:text-[#6B5E54] outline-none transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Phone, email, or WhatsApp"
                      className="w-full bg-transparent border-b border-[#3A3128] focus:border-[#C9A96E] text-[#F8F5F0] py-3 px-1 text-sm placeholder:text-[#6B5E54] outline-none transition-colors"
                    />
                    <textarea
                      rows={3}
                      placeholder="When would you like to walk through?"
                      className="w-full bg-transparent border-b border-[#3A3128] focus:border-[#C9A96E] text-[#F8F5F0] py-3 px-1 text-sm placeholder:text-[#6B5E54] outline-none transition-colors resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full mt-4 border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#0A0A0A] px-6 py-3 text-xs uppercase tracking-[0.16em] transition-all duration-500"
                    >
                      Arrange a viewing
                    </button>
                  </form>

                  <div className="mt-8 pt-6 border-t border-[#3A3128] space-y-3 text-sm">
                    <a href="tel:+66658314819" className="flex items-center justify-between text-[#F8F5F0]/70 hover:text-[#C9A96E] transition">
                      <span>Phone</span>
                      <span>+66 65 831 4819</span>
                    </a>
                    <a href={`https://wa.me/66658314819?text=${encodeURIComponent(`I'm interested in: ${property.title}`)}`} className="flex items-center justify-between text-[#F8F5F0]/70 hover:text-[#C9A96E] transition">
                      <span>WhatsApp</span>
                      <span>Open conversation →</span>
                    </a>
                  </div>
                </div>
              </RevealOnScroll>
            </aside>
          </div>
        </section>

        {/* Similar properties */}
        {similar.length > 0 && (
          <section className="py-section border-t border-[#3A3128]">
            <div className="container-luxe">
              <RevealOnScroll className="mb-16">
                <span className="eyebrow">Similar properties</span>
                <h2 className="serif-italic text-3xl lg:text-5xl text-[#F8F5F0] mt-4">
                  Other houses, same coast.
                </h2>
              </RevealOnScroll>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
                {similar.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
              <div className="mt-16 text-center">
                <Link
                  href="/properties"
                  className="text-xs uppercase tracking-[0.16em] text-[#C9A96E] border-b border-[#C9A96E] pb-2 hover:gap-5 transition-all duration-500"
                >
                  Walk the full portfolio →
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
