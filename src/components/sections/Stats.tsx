'use client';

import { motion } from 'framer-motion';
import { CounterStat } from './CounterStat';

const STATS = [
  { value: 671, suffix: '+', label: 'Assets placed' },
  { value: 12, suffix: '', label: 'Years operating' },
  { value: 3, suffix: '', label: 'Active markets' },
  { value: 4, suffix: '', label: 'Languages spoken' },
];

export function Stats() {
  return (
    <section className="border-y border-[#3A3128] py-20 lg:py-28">
      <div className="container-luxe">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-2"
            >
              <div className="serif-italic text-5xl lg:text-6xl text-[#F8F5F0] leading-none">
                <CounterStat target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs uppercase tracking-[0.16em] text-[#6B5E54] mt-3">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
