import Image from 'next/image';
import Link from 'next/link';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppButton } from '@/components/sections/WhatsAppButton';
import { RevealOnScroll } from '@/components/sections/RevealOnScroll';
import blogData from '../../../data/blog.json';

export const metadata = {
  title: 'Journal — Shine Asia Estate, Koh Samui',
  description:
    'Notes from the island. Market intelligence, cultural pieces, and quiet observations from twelve years on Koh Samui.',
};

export default function BlogPage() {
  const [first, second, ...rest] = blogData;

  return (
    <>
      <Nav />
      <main>
        {/* Hero band */}
        <section className="pt-40 pb-20 border-b border-[#3A3128]">
          <div className="container-luxe">
            <RevealOnScroll>
              <span className="eyebrow">The journal</span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h1 className="serif-italic text-[#F8F5F0] mt-8 max-w-5xl leading-[1.05]"
                  style={{ fontSize: 'clamp(2.5rem, 1.5rem + 4vw, 6rem)' }}>
                Notes from the island.
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p className="mt-8 max-w-2xl text-lg text-[#F8F5F0]/70 leading-relaxed">
                Market intelligence, cultural pieces, quiet observations.
                Written by people who walk the place.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* Featured + secondary */}
        {first && (
          <section className="py-section">
            <div className="container-luxe">
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                <RevealOnScroll className="lg:col-span-7">
                  <Link href={`/blog/${first.slug}`} className="group block">
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#2A2420] mb-8">
                      <Image
                        src={first.image}
                        alt={first.title}
                        fill
                        priority
                        sizes="(min-width: 1024px) 60vw, 100vw"
                        className="object-cover transition-transform duration-[1500ms] group-hover:scale-[1.04]"
                      />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#C9A96E]">
                      {first.category} · {first.reading_time} min · {first.date}
                    </span>
                    <h2 className="serif-italic text-3xl lg:text-5xl text-[#F8F5F0] mt-4 leading-tight group-hover:text-[#C9A96E] transition-colors duration-500">
                      {first.title}
                    </h2>
                    <p className="mt-6 text-base text-[#F8F5F0]/65 leading-relaxed max-w-2xl">
                      {first.excerpt}
                    </p>
                  </Link>
                </RevealOnScroll>

                {second && (
                  <RevealOnScroll delay={0.15} className="lg:col-span-5 lg:pt-10">
                    <Link href={`/blog/${second.slug}`} className="group block">
                      <div className="relative aspect-[4/5] overflow-hidden bg-[#2A2420] mb-8">
                        <Image
                          src={second.image}
                          alt={second.title}
                          fill
                          priority
                          sizes="(min-width: 1024px) 40vw, 100vw"
                          className="object-cover transition-transform duration-[1500ms] group-hover:scale-[1.04]"
                        />
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[#C9A96E]">
                        {second.category} · {second.reading_time} min
                      </span>
                      <h3 className="serif-italic text-2xl lg:text-3xl text-[#F8F5F0] mt-4 leading-tight group-hover:text-[#C9A96E] transition-colors duration-500">
                        {second.title}
                      </h3>
                      <p className="mt-4 text-sm text-[#F8F5F0]/65 leading-relaxed">
                        {second.excerpt}
                      </p>
                    </Link>
                  </RevealOnScroll>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Grid of remaining */}
        {rest.length > 0 && (
          <section className="py-section border-t border-[#3A3128]">
            <div className="container-luxe">
              <RevealOnScroll className="mb-16">
                <span className="eyebrow">More from the journal</span>
              </RevealOnScroll>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {rest.map((article, i) => (
                  <RevealOnScroll key={article.slug} delay={i * 0.08}>
                    <Link href={`/blog/${article.slug}`} className="group block">
                      <div className="relative aspect-[4/5] overflow-hidden bg-[#2A2420] mb-6">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          priority={i === 0}
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-[1500ms] group-hover:scale-[1.04]"
                        />
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[#C9A96E]">
                        {article.category} · {article.reading_time} min
                      </span>
                      <h3 className="serif-italic text-2xl text-[#F8F5F0] mt-3 leading-tight group-hover:text-[#C9A96E] transition-colors duration-500">
                        {article.title}
                      </h3>
                      <p className="mt-4 text-sm text-[#F8F5F0]/60 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </Link>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
