import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppButton } from '@/components/sections/WhatsAppButton';
import { RevealOnScroll } from '@/components/sections/RevealOnScroll';
import blogData from '../../../../data/blog.json';

export function generateStaticParams() {
  return blogData.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = blogData.find((x) => x.slug === slug);
  return {
    title: a ? `${a.title} — Shine Asia Estate Journal` : 'Journal — Shine Asia Estate',
    description: a?.excerpt,
  };
}

const PLACEHOLDER_BODY = [
  'There is a particular hour, on Koh Samui, when the island remembers itself. The light changes. The frangipani opens. The longtails come back to their moorings, knocking against each other in a rhythm that has not changed in fifty years.',
  'We tend to walk a property at this hour, when we can. The buildings that understand the wind, the shade, the way the southwest breeze finds its way through deep eaves and across polished concrete — they reveal themselves only at this hour. The buildings that do not, also reveal themselves.',
  'This is the hour the photographs in our portfolio were taken. Not because of fashion, but because it is the hour the houses are most truly themselves.',
  'The piece below was written at exactly that hour, with the kind of care we try to bring to every conversation that begins on this site.',
];

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = blogData.find((a) => a.slug === slug);
  if (!article) notFound();

  const otherArticles = blogData.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <Nav />
      <main id="main-content">
        {/* Hero */}
        <section className="relative pt-40 pb-20 bg-black overflow-hidden">
          <Image
            src={article.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black" />
          <div className="relative z-10 container-luxe max-w-4xl">
            <RevealOnScroll>
              <Link href="/blog" className="text-xs uppercase tracking-[0.18em] text-[#C9A96E] hover:text-[#F8F5F0] transition">
                ← Back to journal
              </Link>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <span className="block mt-12 text-xs uppercase tracking-[0.18em] text-[#C9A96E]">
                {article.category} · {article.reading_time} min · {article.date}
              </span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.15}>
              <h1 className="serif-italic text-[#F8F5F0] mt-6 leading-[1.05]"
                  style={{ fontSize: 'clamp(2.25rem, 1.5rem + 3.5vw, 5rem)' }}>
                {article.title}
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={0.25}>
              <p className="mt-8 max-w-2xl text-lg text-[#F8F5F0]/75 leading-relaxed">
                {article.excerpt}
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* Featured image */}
        <section className="py-section">
          <div className="container-luxe">
            <RevealOnScroll>
              <div className="relative aspect-[16/9] overflow-hidden bg-[#2A2420]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* Body */}
        <section className="pb-section">
          <div className="container-luxe max-w-3xl">
            <RevealOnScroll>
              <article className="space-y-8 text-lg text-[#F8F5F0]/80 leading-relaxed">
                {PLACEHOLDER_BODY.map((p, i) => (
                  <p key={i} className={i === 0 ? 'first-letter:serif-italic first-letter:text-7xl first-letter:float-left first-letter:mr-4 first-letter:leading-[0.85] first-letter:text-[#C9A96E]' : ''}>
                    {p}
                  </p>
                ))}
                <p className="serif-italic text-2xl text-[#C9A96E] py-4">
                  We do not sell square metres. We place sanctuaries — quietly, into careful hands.
                </p>
                <p className="text-base text-[#6B5E54] uppercase tracking-[0.18em] pt-12 border-t border-[#3A3128]">
                  — Shine Asia Estate, Koh Samui
                </p>
              </article>
            </RevealOnScroll>
          </div>
        </section>

        {/* More articles */}
        {otherArticles.length > 0 && (
          <section className="py-section border-t border-[#3A3128]">
            <div className="container-luxe">
              <RevealOnScroll className="mb-12">
                <span className="eyebrow">Continue reading</span>
              </RevealOnScroll>
              <div className="grid md:grid-cols-3 gap-12">
                {otherArticles.map((a, i) => (
                  <RevealOnScroll key={a.slug} delay={i * 0.1}>
                    <Link href={`/blog/${a.slug}`} className="group block">
                      <div className="relative aspect-[4/5] overflow-hidden bg-[#2A2420] mb-6">
                        <Image
                          src={a.image}
                          alt={a.title}
                          fill
                          sizes="33vw"
                          className="object-cover transition-transform duration-[1500ms] group-hover:scale-[1.04]"
                        />
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[#C9A96E]">
                        {a.category} · {a.reading_time} min
                      </span>
                      <h3 className="serif-italic text-xl text-[#F8F5F0] mt-3 leading-tight group-hover:text-[#C9A96E] transition-colors">
                        {a.title}
                      </h3>
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
