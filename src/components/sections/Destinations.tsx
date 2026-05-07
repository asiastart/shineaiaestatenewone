'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import propertiesData from '../../../data/properties.json';

type Property = { destination?: string };

const PROPS = propertiesData as Property[];

const COUNT = (dest: string) =>
  PROPS.filter((p) => p.destination === dest).length;

const DESTINATIONS = [
  {
    name: 'Koh Samui',
    region: 'Thailand',
    eyebrow: 'Primary market',
    image: 'https://images.pexels.com/photos/35921780/pexels-photo-35921780.jpeg?auto=compress&cs=tinysrgb&w=1600',
    href: '/properties?destination=Koh+Samui',
    description: 'Bophut, Maenam, Lipa Noi, Choeng Mon. Twelve kilometres of coastline we know by name.',
  },
  {
    name: 'Paris',
    region: 'France',
    eyebrow: 'European desk',
    image: 'https://images.pexels.com/photos/2412606/pexels-photo-2412606.jpeg?auto=compress&cs=tinysrgb&w=1600',
    href: '/properties?destination=Paris',
    description: 'Haussmannian apartments, hôtels particuliers, and a small book of central buildings.',
  },
  {
    name: 'Cannes',
    region: 'French Riviera',
    eyebrow: 'Mediterranean',
    image: 'https://images.pexels.com/photos/2363938/pexels-photo-2363938.jpeg?auto=compress&cs=tinysrgb&w=1600',
    href: '/properties?destination=Cannes',
    description: 'La Croisette, Super Cannes, Belle Époque mansions, and four-star hotels.',
  },
];

export function Destinations() {
  return (
    <section id="destinations" className="py-section">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-3xl"
        >
          <span className="eyebrow">Where we work</span>
          <h2 className="serif-italic text-3xl lg:text-5xl text-[#F8F5F0] mt-4 leading-tight">
            Three places. Each known by foot.
          </h2>
          <p className="mt-6 text-base text-[#F8F5F0]/65 leading-relaxed">
            Koh Samui is where it began, twelve years ago, and where the portfolio
            sits deepest. Paris and Cannes followed, when clients asked. We do not
            list everywhere — only where we have walked the streets ourselves.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {DESTINATIONS.map((d, i) => {
            const count = COUNT(d.name);
            return (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={d.href} className="group relative block aspect-[4/5] overflow-hidden bg-[#2A2420]">
                  <Image
                    src={d.image}
                    alt={`${d.name}, ${d.region}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(201,169,110,0.25) 100%)' }}
                  />

                  <div className="absolute inset-x-0 bottom-0 p-7 lg:p-9">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A96E] block mb-2">
                      {d.eyebrow}
                    </span>
                    <h3 className="serif-italic text-3xl lg:text-4xl text-[#F8F5F0] leading-tight">
                      {d.name}
                    </h3>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#F8F5F0]/60 mt-2">
                      {d.region}
                    </p>
                    <p className="mt-5 text-sm text-[#F8F5F0]/70 leading-relaxed">{d.description}</p>
                    <div className="mt-6 flex items-center gap-3">
                      <span className="text-xs uppercase tracking-[0.16em] text-[#C9A96E]">
                        {count > 0 ? `${count} ${count === 1 ? 'property' : 'properties'}` : 'On request'}
                      </span>
                      <span className="h-px flex-1 bg-[#C9A96E]/30 group-hover:bg-[#C9A96E] transition-colors duration-500" />
                      <span className="text-xs uppercase tracking-[0.16em] text-[#C9A96E] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        Walk →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 text-center text-xs uppercase tracking-[0.18em] text-[#6B5E54]"
        >
          Other markets — Phuket, London, Geneva, Marrakech — on private request.
        </motion.p>
      </div>
    </section>
  );
}
