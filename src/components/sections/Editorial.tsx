'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function Editorial() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <section ref={ref} className="py-section bg-[#0A0A0A] relative overflow-hidden">
      <div className="container-luxe">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-[#2A2420]">
              <motion.div style={{ y }} className="absolute inset-[-10%]">
                <Image
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=85"
                  alt="Tropical pavilion at dusk, lanterns glowing, polished concrete and frangipani"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <span className="eyebrow">Journal</span>
            <h2 className="serif-italic text-3xl lg:text-5xl text-[#F8F5F0] mt-6 mb-10 leading-[1.1]">
              The hour after rain.
            </h2>

            <div className="space-y-6 text-base lg:text-lg text-[#F8F5F0]/75 leading-relaxed font-sans">
              <p>
                The first thing the island does, after a monsoon afternoon, is exhale.
                Frangipani opens. Lateritic stone darkens to the colour of wet brick.
                Down in Bophut, the longtails knock against their moorings in a rhythm
                older than any of us, and the light comes back in the slow way it does
                here — not as a sunrise, but as a returning.
              </p>
              <p className="text-[#F8F5F0]/85 serif-italic text-xl lg:text-2xl leading-relaxed py-2">
                This is the hour we tend to walk a property for the first time.
              </p>
              <p>
                We are a small house. We do not list everything that comes onto
                the market — not in Chaweng, not in Bophut, not in Maenam. Every
                property in this book has been chosen one address at a time.
                Sometimes after months of conversation with an owner. Sometimes
                after walking the house, room by room, in the hour after rain.
              </p>
              <p className="text-[#C9A96E] serif-italic text-xl lg:text-2xl pt-4">
                We do not sell square metres. We place sanctuaries — quietly, into careful hands.
              </p>
            </div>

            <div className="mt-12 inline-flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-[#F8F5F0]/60">
              <span>— Shine Asia Estate, Koh Samui</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
