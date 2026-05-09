'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppButton } from '@/components/sections/WhatsAppButton';
import { PropertyCard, type Property } from '@/components/sections/PropertyCard';
import { CURRENCIES } from '@/lib/currency';
import { useCurrency } from '@/hooks/useCurrency';
import propertiesData from '../../../data/properties.json';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ALL = propertiesData as Property[];

const LOCATIONS = [...new Set(ALL.map((p) => p.location).filter(Boolean))].sort() as string[];
const TYPES = [...new Set(ALL.map((p) => p.type))].sort();
const PRICE_BRACKETS = [
  { label: 'Up to ฿10M', max: 10_000_000 },
  { label: '฿10–25M', min: 10_000_000, max: 25_000_000 },
  { label: '฿25–50M', min: 25_000_000, max: 50_000_000 },
  { label: '฿50M+', min: 50_000_000 },
] as const;

function PropertiesContent() {
  const searchParams = useSearchParams();
  const initialDestination = searchParams.get('destination') ?? '';

  const [destination, setDestination] = useState<string>(initialDestination);
  const [location, setLocation] = useState<string>('All');
  const [propertyType, setPropertyType] = useState<string>('All');
  const [bracket, setBracket] = useState<number | null>(null);
  const { currency, setCurrency } = useCurrency();
  const [showOffPlan, setShowOffPlan] = useState<'all' | 'for-sale' | 'off-plan'>('all');

  const filtered = useMemo(() => {
    return ALL.filter((p) => {
      if (destination && p.destination !== destination) return false;
      if (location !== 'All' && p.location !== location) return false;
      if (propertyType !== 'All' && p.type !== propertyType) return false;
      if (showOffPlan !== 'all' && p.status !== showOffPlan) return false;
      if (bracket !== null) {
        const br = PRICE_BRACKETS[bracket];
        const min = 'min' in br ? br.min : 0;
        const max = 'max' in br ? br.max : Number.POSITIVE_INFINITY;
        if (p.price_thb < (min ?? 0) || p.price_thb >= (max ?? Number.POSITIVE_INFINITY)) return false;
      }
      return true;
    });
  }, [destination, location, propertyType, bracket, showOffPlan]);

  const reset = () => {
    setDestination('');
    setLocation('All');
    setPropertyType('All');
    setBracket(null);
    setShowOffPlan('all');
  };

  return (
    <>
      <Nav />
      <main>
        {/* Hero band */}
        <section className="relative h-[60vh] min-h-[420px] overflow-hidden bg-black pt-32 pb-16 flex items-end">
          <Image
            src="https://images.pexels.com/photos/35921780/pexels-photo-35921780.jpeg?auto=compress&cs=tinysrgb&w=2400"
            alt="Aerial view of Koh Samui — the Thailand we keep for ourselves"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0"
               style={{
                 background:
                   'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.9) 100%)',
               }}
          />
          <div className="relative z-10 container-luxe">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="eyebrow"
            >
              The portfolio
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="serif-italic text-[#F8F5F0] mt-6 max-w-4xl leading-[1.05]"
              style={{ fontSize: 'clamp(2.5rem, 1.5rem + 4vw, 5.5rem)' }}
            >
              A small selection. The rest, on request.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-2xl text-base text-[#F8F5F0]/75 leading-relaxed"
            >
              {ALL.length} properties currently visible. Another six hundred plus,
              held privately. We share them with the right buyer, at the right time.
            </motion.p>
          </div>
        </section>

        {/* Filters */}
        <section className="border-y border-[#3A3128] py-8 sticky top-[72px] z-20 bg-[#0A0A0A]/95 backdrop-blur-md">
          <div className="container-luxe">
            <div className="flex flex-wrap items-center gap-3 lg:gap-4">
              {/* Location */}
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent border border-[#3A3128] text-[#F8F5F0] text-xs uppercase tracking-[0.16em] px-4 py-3 outline-none focus:border-[#C9A96E] cursor-pointer"
              >
                <option value="All">All locations</option>
                {LOCATIONS.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>

              {/* Type */}
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="bg-transparent border border-[#3A3128] text-[#F8F5F0] text-xs uppercase tracking-[0.16em] px-4 py-3 outline-none focus:border-[#C9A96E] cursor-pointer"
              >
                <option value="All">All types</option>
                {TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              {/* Status segmented */}
              <div className="flex border border-[#3A3128]">
                {(['all', 'for-sale', 'off-plan'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setShowOffPlan(s)}
                    className={`px-4 py-3 text-xs uppercase tracking-[0.16em] transition-colors ${
                      showOffPlan === s
                        ? 'bg-[#C9A96E] text-[#0A0A0A]'
                        : 'text-[#F8F5F0]/70 hover:text-[#C9A96E]'
                    }`}
                  >
                    {s === 'all' ? 'All' : s.replace('-', ' ')}
                  </button>
                ))}
              </div>

              {/* Price brackets */}
              <div className="flex border border-[#3A3128]">
                {PRICE_BRACKETS.map((b, i) => (
                  <button
                    key={b.label}
                    type="button"
                    onClick={() => setBracket(bracket === i ? null : i)}
                    className={`px-4 py-3 text-xs uppercase tracking-[0.16em] transition-colors ${
                      bracket === i
                        ? 'bg-[#C9A96E] text-[#0A0A0A]'
                        : 'text-[#F8F5F0]/70 hover:text-[#C9A96E]'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>

              {destination && (
                <button
                  type="button"
                  onClick={() => setDestination('')}
                  className="flex items-center gap-2 border border-[#C9A96E] px-4 py-3 text-xs uppercase tracking-[0.16em] text-[#C9A96E]"
                >
                  {destination} <span className="opacity-60">×</span>
                </button>
              )}

              <div className="ml-auto flex items-center gap-4">
                {/* Currency */}
                <div className="flex border border-[#3A3128]">
                  {CURRENCIES.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCurrency(c)}
                      className={`px-3 py-3 text-xs uppercase tracking-[0.16em] transition-colors ${
                        currency === c
                          ? 'bg-[#C9A96E] text-[#0A0A0A]'
                          : 'text-[#F8F5F0]/70 hover:text-[#C9A96E]'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                {(destination || location !== 'All' || propertyType !== 'All' || bracket !== null || showOffPlan !== 'all') && (
                  <button
                    type="button"
                    onClick={reset}
                    className="text-xs uppercase tracking-[0.16em] text-[#6B5E54] hover:text-[#C9A96E] transition"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4 text-xs uppercase tracking-[0.18em] text-[#6B5E54]">
              {filtered.length} {filtered.length === 1 ? 'property' : 'properties'} visible
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="py-section">
          <div className="container-luxe">
            {filtered.length === 0 ? (
              <div className="py-20 text-center">
                <p className="serif-italic text-3xl text-[#F8F5F0]/70 mb-6">
                  Nothing matches that combination.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="text-xs uppercase tracking-[0.16em] text-[#C9A96E] border-b border-[#C9A96E] pb-1"
                >
                  Adjust the filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {filtered.map((p, i) => (
                  <PropertyCard key={p.id} property={p} currency={currency} priority={i < 6} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense>
      <PropertiesContent />
    </Suspense>
  );
}
