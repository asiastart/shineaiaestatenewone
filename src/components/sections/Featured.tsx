'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { formatPrice } from '@/lib/currency';
import type { Property } from './PropertyCard';

export function Featured({ property }: { property: Property }) {
  return (
    <section className="py-section">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="eyebrow">Currently in the portfolio</span>
          <h2 className="serif-italic text-3xl lg:text-5xl text-[#F8F5F0] mt-4 max-w-3xl">
            One house we have walked at sunrise.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <Link href={`/property/${property.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#2A2420]">
                <Image
                  src={property.image || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=2400&q=85'}
                  alt={property.title}
                  fill
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 lg:pb-8"
          >
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#C9A96E]">
              {property.location} · {property.destination || 'Koh Samui'}
            </span>
            <h3 className="serif-italic text-3xl lg:text-4xl text-[#F8F5F0] mt-4 leading-tight">
              {property.title}
            </h3>
            {property.subtitle && (
              <p className="mt-4 text-base text-[#F8F5F0]/70 leading-relaxed">
                {property.subtitle}
              </p>
            )}

            <div className="mt-8 flex items-baseline gap-6 text-sm text-[#F8F5F0]/70">
              <span>{property.bedrooms} bed</span>
              {property.bathrooms && <span>{property.bathrooms} bath</span>}
              {property.size_sqm && <span>{property.size_sqm} sqm</span>}
            </div>

            <div className="mt-8 pt-8 border-t border-[#3A3128]">
              <div className="serif-italic text-3xl text-[#F8F5F0] mb-6">
                {formatPrice(property.price_thb, 'THB')}
              </div>
              <Link
                href={`/property/${property.slug}`}
                className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-[#C9A96E] border-b border-[#C9A96E] pb-2 hover:gap-5 transition-all duration-500"
              >
                Walk through
                <span className="inline-block">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
