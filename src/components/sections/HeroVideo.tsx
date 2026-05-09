'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown, Play, Pause } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const TITLE_LINES = [
  ['Where', 'the', 'silence'],
  ['between', 'waves'],
  ['becomes', 'home.'],
];

const wordVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onCanPlay = () => setVideoReady(true);
    v.addEventListener('canplay', onCanPlay);
    return () => v.removeEventListener('canplay', onCanPlay);
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-black">
      {/* Poster image — discoverable by preload scanner */}
      {!videoReady && (
        <Image
          src="https://images.pexels.com/photos/35921780/pexels-photo-35921780.jpeg?auto=compress&cs=tinysrgb&w=2400"
          alt="Koh Samui aerial sunset"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover"
        />
      )}

      {/* Video background — Pexels free 4K Koh Samui aerial */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ${videoReady ? 'opacity-100' : 'opacity-0'}`}
      >
        <source
          src="https://videos.pexels.com/video-files/35175380/14902195_2560_1440_60fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Cinematic overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 70%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 70%), linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.75) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 container-luxe h-full flex flex-col justify-end pb-32 lg:pb-40">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow mb-8 lg:mb-12"
        >
          Koh Samui · Thailand
        </motion.span>

        <h1 className="serif-italic text-[#F8F5F0] leading-[1.05] tracking-tight max-w-5xl">
          {TITLE_LINES.map((line, lineIdx) => (
            <motion.span
              key={`l-${lineIdx}`}
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.08, delayChildren: 0.4 + lineIdx * 0.3 }}
              className="block"
            >
              {line.map((w, i) => (
                <motion.span
                  key={`l-${lineIdx}-${i}`}
                  variants={wordVariants}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`inline-block mr-[0.25em] ${lineIdx === 1 ? 'text-[#C9A96E]' : ''}`}
                  style={{ fontSize: 'var(--text-hero)' }}
                >
                  {w}
                </motion.span>
              ))}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 lg:mt-12 max-w-xl text-base lg:text-lg text-[#F8F5F0]/80 leading-relaxed font-sans"
        >
          Villas, pool residences, and signature properties across Koh Samui.
          A small, considered portfolio — placed quietly into careful hands.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex items-center gap-8 flex-wrap"
        >
          <a
            href="#properties"
            className="group inline-flex items-center gap-3 border border-[#C9A96E] px-8 py-4 text-xs uppercase tracking-[0.16em] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#0A0A0A] transition-all duration-500 rounded-full"
          >
            Walk the portfolio
            <span className="inline-block w-6 h-px bg-current group-hover:w-10 transition-all duration-500" />
          </a>
          <a
            href="/sell-your-property"
            className="text-xs uppercase tracking-[0.16em] text-[#F8F5F0]/70 hover:text-[#C9A96E] border-b border-[#F8F5F0]/30 hover:border-[#C9A96E] pb-2 transition-all duration-500"
          >
            Selling? Begin a private valuation →
          </a>
        </motion.div>
      </div>

      {/* Video Controls */}
      <div className="absolute top-8 right-8 z-20 flex gap-4">
        <button
          onClick={togglePlayPause}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          className="p-3 rounded-full border border-[#F8F5F0]/30 hover:border-[#C9A96E] text-[#F8F5F0]/60 hover:text-[#C9A96E] transition-colors duration-300"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>

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
