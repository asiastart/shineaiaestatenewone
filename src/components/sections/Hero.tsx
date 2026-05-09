'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const TITLE_LINE_1 = ['Where', 'the', 'silence'];
const TITLE_LINE_2 = ['between', 'waves'];
const TITLE_LINE_3 = ['becomes', 'home.'];

const wordVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-black">
      {/* Background image with parallax */}
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=2400&q=85"
          alt="Architectural pool villa at twilight, warm interior light spilling through glazed walls — Koh Samui"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Cinematic overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 30% 70%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 70%), linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)',
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 container-luxe h-full flex flex-col justify-end pb-32 lg:pb-40"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow mb-8 lg:mb-12"
        >
          Koh Samui · Thailand
        </motion.span>

        <h1 className="serif-italic text-[#F8F5F0] leading-[1.05] tracking-tight max-w-5xl">
          <motion.span
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.08, delayChildren: 0.4 }}
            className="block"
          >
            {TITLE_LINE_1.map((w, i) => (
              <motion.span
                key={`l1-${i}`}
                variants={wordVariants}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block mr-[0.25em]"
                style={{ fontSize: 'var(--text-hero)' }}
              >
                {w}
              </motion.span>
            ))}
          </motion.span>
          <motion.span
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.08, delayChildren: 0.7 }}
            className="block"
          >
            {TITLE_LINE_2.map((w, i) => (
              <motion.span
                key={`l2-${i}`}
                variants={wordVariants}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block mr-[0.25em] text-[#C9A96E]"
                style={{ fontSize: 'var(--text-hero)' }}
              >
                {w}
              </motion.span>
            ))}
          </motion.span>
          <motion.span
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.08, delayChildren: 0.95 }}
            className="block"
          >
            {TITLE_LINE_3.map((w, i) => (
              <motion.span
                key={`l3-${i}`}
                variants={wordVariants}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block mr-[0.25em]"
                style={{ fontSize: 'var(--text-hero)' }}
              >
                {w}
              </motion.span>
            ))}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 lg:mt-12 max-w-xl text-base lg:text-lg text-[#F8F5F0]/75 leading-relaxed font-sans"
        >
          Properties chosen with care across Koh Samui and the Thai islands.
          A small, considered portfolio — placed quietly into careful hands.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex items-center gap-8"
        >
          <a
            href="#properties"
            className="group inline-flex items-center gap-3 border border-[#C9A96E] px-8 py-4 text-xs uppercase tracking-[0.16em] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#0A0A0A] transition-all duration-500 rounded-full"
          >
            Walk the portfolio
            <span className="inline-block w-6 h-px bg-current group-hover:w-10 transition-all duration-500" />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-[#F8F5F0]/40"
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
