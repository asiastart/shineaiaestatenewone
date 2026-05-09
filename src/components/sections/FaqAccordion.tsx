'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

type FaqItem = { q: string; a: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="border-t border-[#3A3128]">
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `faq-btn-${i}`;
        const panelId = `faq-panel-${i}`;
        return (
          <li key={i} className="border-b border-[#3A3128]">
            <button
              type="button"
              id={buttonId}
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full flex items-center justify-between gap-6 py-7 text-left group"
            >
              <span className="serif-italic text-xl lg:text-2xl text-[#F8F5F0] leading-tight group-hover:text-[#C9A96E] transition-colors duration-300">
                {item.q}
              </span>
              <span className="shrink-0 text-[#C9A96E]" aria-hidden="true">
                {isOpen ? <Minus size={20} /> : <Plus size={20} />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-7 pr-12 text-base text-[#F8F5F0]/70 leading-relaxed">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
