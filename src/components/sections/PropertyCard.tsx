'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { formatPrice, type Currency } from '@/lib/currency';

export type Property = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  price_thb: number;
  location: string;
  destination?: string;
  bedrooms: number;
  bathrooms?: number | null;
  size_sqm?: number | null;
  land_sqm?: number | null;
  type: string;
  status: 'for-sale' | 'off-plan' | 'sold';
  image: string | null;
  featured?: boolean;
  gallery?: string[];
  features?: string[];
};

const FALLBACK = 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=85';

export function PropertyCard({
  property,
  currency = 'THB',
  priority = false,
}: {
  property: Property;
  currency?: Currency;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/property/${property.slug}`}
      className="group block"
    >
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#2A2420]">
          <Image
            src={property.image || FALLBACK}
            alt={property.title}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
          {/* Subtle gold gradient on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
               style={{
                 background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%)'
               }}
          />
          {property.status === 'off-plan' && (
            <div className="absolute top-4 left-4 bg-[#0A0A0A]/85 backdrop-blur-sm px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[#C9A96E] border border-[#C9A96E]/40">
              Off plan
            </div>
          )}
          {property.featured && (
            <div className="absolute top-4 right-4 bg-[#C9A96E] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[#0A0A0A] font-medium">
              Featured
            </div>
          )}
        </div>

        <div className="pt-6">
          <div className="flex items-start justify-between gap-4 mb-2">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#6B5E54]">
              {property.location}
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#6B5E54]">
              {property.type}
            </span>
          </div>

          <h3 className="serif-italic text-2xl lg:text-[1.625rem] text-[#F8F5F0] leading-tight mb-3 group-hover:text-[#C9A96E] transition-colors duration-500">
            {property.title}
          </h3>

          <div className="flex items-baseline gap-4 text-sm text-[#F8F5F0]/70">
            <span>{property.bedrooms} bed</span>
            {property.bathrooms && <span>· {property.bathrooms} bath</span>}
            {property.size_sqm && <span>· {property.size_sqm} sqm</span>}
          </div>

          <div className="mt-4 flex items-baseline justify-between border-t border-[#3A3128] pt-4">
            <span className="font-sans text-lg text-[#F8F5F0] font-medium tracking-tight">
              {formatPrice(property.price_thb, currency)}
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#C9A96E] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Walk through →
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
