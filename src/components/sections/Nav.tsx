'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/cn';

const NAV_LINKS = [
  { label: 'Portfolio', href: '/properties' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors duration-500',
        scrolled || open ? 'bg-[#0A0A0A]/85 backdrop-blur-md border-b border-[#3A3128]' : 'bg-transparent',
      )}
    >
      <div className="container-luxe flex items-center justify-between py-5 lg:py-7">
        <Link href="/" className="flex items-baseline gap-2 group">
          <span className="serif-italic text-2xl tracking-tight text-[#F8F5F0]">Shine</span>
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#C9A96E] mt-1">Asia Estate</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#F8F5F0]/80 hover:text-[#C9A96E] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <button className="text-xs uppercase tracking-[0.16em] text-[#F8F5F0]/60 hover:text-[#C9A96E] transition">
            EN
          </button>
          <Link
            href="/contact"
            className="border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#0A0A0A] px-5 py-2.5 text-xs uppercase tracking-[0.16em] transition-all duration-300 rounded-full"
          >
            Open conversation
          </Link>
        </div>

        <button
          aria-label={open ? 'Close menu' : 'Toggle menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-[#F8F5F0]"
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <motion.nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden border-t border-[#3A3128] bg-[#0A0A0A]"
        >
          <div className="container-luxe py-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="serif-italic text-2xl text-[#F8F5F0]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 border border-[#C9A96E] text-[#C9A96E] px-5 py-3 text-xs uppercase tracking-[0.16em] text-center rounded-full"
            >
              Open conversation
            </Link>
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
}
