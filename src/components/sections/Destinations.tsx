'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import propertiesData from '../../../data/properties.json';

type Property = { destination?: string };
const PROPS = propertiesData as Property[];
const COUNT = (dest: string) => PROPS.filter((p) => p.destination === dest).length;

const DESTINATIONS = [
  {
    name: 'Chaweng',
    region: 'North Koh Samui',
    eyebrow: 'Main beach',
    image: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=1600',
    href: '/properties?destination=Chaweng',
    description: "The island's most connected beach. White sand, turquoise water, and villas within minutes of everything.",
  },
  {
    name: 'Bophut',
    region: "Fisherman's Village",
    eyebrow: 'North coast',
    image: 'https://images.pexels.com/photos/1449824/pexels-photo-1449824.jpeg?auto=compress&cs=tinysrgb&w=1600',
    href: '/properties?destination=Bophut',
    description: "The old fishing village, quieter than Chaweng, with a Friday night market and a Chinese shophouse strip.",
  },
  {
    name: 'Maenam',
    region: 'North Koh Samui',
    eyebrow: 'Quiet coast',
    image: 'https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=1600',
    href: '/properties?destination=Maenam',
    description: "Four kilometres of undeveloped beach facing Koh Phangan. The island's quietest northern shore.",
  },
  {
    name: 'Lamai',
    region: 'South Koh Samui',
    eyebrow: 'Second beach',
    image: 'https://images.pexels.com/photos/1179156/pexels-photo-1179156.jpeg?auto=compress&cs=tinysrgb&w=1600',
    href: '/properties?destination=Lamai',
    description: "Rocky headlands, a Sunday night market, and villas perched on the hillside above the bay.",
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
            One island. Four coasts.
          </h2>
          <p className="mt-6 text-base text-[#F8F5F0]/65 leading-relaxed">
            We work across Koh Samui's four most considered neighbourhoods.
            Every property in the book has been walked — at the hour the
            light is right, and often more than once.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(201,169,110,0.25) 100%)' }}
                  />

                  <div className="absolute inset-x-0 bottom-0 p-7 lg:p-8">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A96E] block mb-2">
                      {d.eyebrow}
                    </span>
                    <h3 className="serif-italic text-2xl lg:text-3xl text-[#F8F5F0] leading-tight">
                      {d.name}
                    </h3>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#F8F5F0]/60 mt-2">
                      {d.region}
                    </p>
                    <p className="mt-4 text-sm text-[#F8F5F0]/70 leading-relaxed">{d.description}</p>
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
      </div>
    </section>
  );
}
