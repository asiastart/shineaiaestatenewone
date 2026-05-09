import { Nav } from '@/components/sections/Nav';
import { HeroVideo } from '@/components/sections/HeroVideo';
import { Stats } from '@/components/sections/Stats';
import { Featured } from '@/components/sections/Featured';
import { Destinations } from '@/components/sections/Destinations';
import { Editorial } from '@/components/sections/Editorial';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppButton } from '@/components/sections/WhatsAppButton';
import { PropertyCard, type Property } from '@/components/sections/PropertyCard';
import propertiesData from '../../data/properties.json';
import { OrganizationJsonLd } from '@/components/sections/OrganizationJsonLd';
import blogData from '../../data/blog.json';
import Image from 'next/image';
import Link from 'next/link';

const ALL_PROPERTIES = propertiesData as Property[];

export default function HomePage() {
  const featured = ALL_PROPERTIES.find((p) => p.featured) || ALL_PROPERTIES[0];
  const grid = ALL_PROPERTIES.filter((p) => p.id !== featured.id).slice(0, 9);
  const blog = blogData.slice(0, 3);

  return (
    <>
      <OrganizationJsonLd />
      <Nav />
      <main id="main-content">
        <HeroVideo />
        <Stats />
        <Featured property={featured} />
        <Destinations />

        <section id="properties" className="py-section">
          <div className="container-luxe">
            <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
              <div className="max-w-2xl">
                <span className="eyebrow">Currently in the portfolio</span>
                <h2 className="serif-italic text-3xl lg:text-5xl text-[#F8F5F0] mt-4">
                  A small selection. The rest, on request.
                </h2>
              </div>
              <Link
                href="/properties"
                className="text-xs uppercase tracking-[0.16em] text-[#C9A96E] border-b border-[#C9A96E]/40 pb-2 hover:border-[#C9A96E] transition-colors duration-500"
              >
                See all 671 properties →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {grid.map((p, i) => (
                <PropertyCard key={p.id} property={p} priority={i < 3} />
              ))}
            </div>
          </div>
        </section>

        <Editorial />

        <section className="py-section border-t border-[#3A3128]">
          <div className="container-luxe">
            <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
              <div className="max-w-2xl">
                <span className="eyebrow">Journal</span>
                <h2 className="serif-italic text-3xl lg:text-5xl text-[#F8F5F0] mt-4">
                  Notes from the island.
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-xs uppercase tracking-[0.16em] text-[#C9A96E] border-b border-[#C9A96E]/40 pb-2 hover:border-[#C9A96E] transition-colors duration-500"
              >
                Read more →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blog.map((article, i) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#2A2420] mb-6">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#C9A96E]">
                    {article.category} · {article.reading_time} min
                  </span>
                  <h3 className="serif-italic text-2xl text-[#F8F5F0] mt-3 leading-tight group-hover:text-[#C9A96E] transition-colors duration-500">
                    {article.title}
                  </h3>
                  <p className="mt-4 text-sm text-[#F8F5F0]/65 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-section">
          <div className="container-luxe">
            <div className="max-w-3xl mx-auto text-center">
              <span className="eyebrow">Begin an inquiry</span>
              <h2 className="serif-italic text-3xl lg:text-6xl text-[#F8F5F0] mt-6 leading-tight">
                Write to us. We answer in the language you reach out in.
              </h2>
              <p className="mt-8 text-base text-[#F8F5F0]/65 leading-relaxed max-w-xl mx-auto">
                English, French, Thai, Arabic. By email, by phone, on WhatsApp.
                We will tell you what we know and what we do not.
              </p>
              <div className="mt-12 flex items-center justify-center gap-4 flex-wrap">
                <Link
                  href="/contact"
                  className="border border-[#C9A96E] text-[#C9A96E] px-8 py-4 text-xs uppercase tracking-[0.16em] hover:bg-[#C9A96E] hover:text-[#0A0A0A] transition-all duration-500"
                >
                  Open conversation
                </Link>
                <a
                  href="tel:+66658314819"
                  className="text-xs uppercase tracking-[0.16em] text-[#F8F5F0]/60 hover:text-[#C9A96E] transition px-4 py-4"
                >
                  +66 65 831 4819
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
