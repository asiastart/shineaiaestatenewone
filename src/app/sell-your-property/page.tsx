import Image from 'next/image';
import Link from 'next/link';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppButton } from '@/components/sections/WhatsAppButton';
import { CounterStat } from '@/components/sections/CounterStat';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { RevealOnScroll } from '@/components/sections/RevealOnScroll';
import sellContent from '../../../data/sell-content.json';

export const metadata = {
  title: 'Sell Your Property — Shine Asia Estate, Koh Samui',
  description:
    'A private, considered sale process. Bilingual representation, photography, drone film, and direct access to our private buyer book in Singapore, Hong Kong, Dubai, and Europe.',
};

export default function SellYourPropertyPage() {
  return (
    <>
      <Nav />
      <main>
        {/* HERO */}
        <section className="relative min-h-[88vh] flex items-end overflow-hidden bg-black pt-32 pb-20">
          <Image
            src="https://images.pexels.com/photos/36424877/pexels-photo-36424877.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85"
            alt="Koh Samui sunset with spectacular clouds — the Thailand we keep for ourselves"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0"
               style={{
                 background:
                   'radial-gradient(ellipse at 30% 70%, transparent 0%, rgba(0,0,0,0.5) 70%), linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.85) 100%)',
               }}
          />
          <div className="relative z-10 container-luxe">
            <RevealOnScroll>
              <span className="eyebrow">{sellContent.hero.eyebrow}</span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h1 className="serif-italic text-[#F8F5F0] mt-8 max-w-5xl leading-[1.05]"
                  style={{ fontSize: 'clamp(2.5rem, 1.5rem + 4vw, 6rem)' }}
              >
                {sellContent.hero.headline}
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={0.25}>
              <p className="mt-10 max-w-2xl text-lg text-[#F8F5F0]/80 leading-relaxed">
                {sellContent.hero.subhead}
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.35}>
              <div className="mt-12 flex items-center gap-6 flex-wrap">
                <Link
                  href="#valuation"
                  className="border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#0A0A0A] px-8 py-4 text-xs uppercase tracking-[0.16em] transition-all duration-500"
                >
                  {sellContent.hero.cta_primary}
                </Link>
                <a
                  href="https://wa.me/66658314819"
                  className="text-xs uppercase tracking-[0.16em] text-[#F8F5F0]/70 hover:text-[#C9A96E] border-b border-[#F8F5F0]/30 hover:border-[#C9A96E] pb-2 transition-all duration-500"
                >
                  {sellContent.hero.cta_secondary} →
                </a>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* STATS */}
        <section className="border-y border-[#3A3128] py-20 lg:py-28">
          <div className="container-luxe">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {sellContent.stats.map((s, i) => (
                <RevealOnScroll key={s.label} delay={i * 0.1}>
                  <div className="flex flex-col gap-2">
                    <div className="serif-italic text-5xl lg:text-6xl text-[#F8F5F0] leading-none">
                      <CounterStat target={s.value} suffix={s.suffix} />
                    </div>
                    <div className="text-xs uppercase tracking-[0.16em] text-[#6B5E54] mt-3">
                      {s.label}
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* PROMISE */}
        <section className="py-section">
          <div className="container-luxe">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <RevealOnScroll className="lg:col-span-5">
                <span className="eyebrow">Our promise</span>
                <h2 className="serif-italic text-3xl lg:text-5xl text-[#F8F5F0] mt-6 leading-tight">
                  {sellContent.promise_intro}
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={0.15} className="lg:col-span-6 lg:col-start-7">
                <p className="text-lg text-[#F8F5F0]/75 leading-relaxed">
                  {sellContent.promise_body}
                </p>
                <ul className="mt-10 space-y-5">
                  {sellContent.guarantee.lines.map((line, i) => (
                    <li key={i} className="flex gap-4 text-base text-[#F8F5F0]/80 leading-relaxed">
                      <span className="text-[#C9A96E] mt-1.5 shrink-0">—</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* TIERS */}
        <section className="py-section border-t border-[#3A3128]">
          <div className="container-luxe">
            <RevealOnScroll className="mb-16 max-w-3xl">
              <span className="eyebrow">Two ways we work</span>
              <h2 className="serif-italic text-3xl lg:text-5xl text-[#F8F5F0] mt-6 leading-tight">
                Considered. Or Xclusive.
              </h2>
              <p className="mt-6 text-base text-[#F8F5F0]/65 leading-relaxed">
                Two contracts, both honest. The right one depends on your property
                and how privately you want to sell.
              </p>
            </RevealOnScroll>

            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
              {sellContent.tiers.map((tier, i) => (
                <RevealOnScroll key={tier.name} delay={i * 0.15}>
                  <article
                    className={`relative h-full p-8 lg:p-12 border ${
                      tier.featured
                        ? 'border-[#C9A96E] bg-[#1F1A15]'
                        : 'border-[#3A3128] bg-transparent'
                    }`}
                  >
                    {tier.featured && (
                      <span className="absolute top-0 right-8 -translate-y-1/2 bg-[#C9A96E] text-[#0A0A0A] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-medium">
                        Recommended
                      </span>
                    )}
                    <div className="text-xs uppercase tracking-[0.16em] text-[#C9A96E] mb-3">
                      {tier.price_label}
                    </div>
                    <h3 className="serif-italic text-4xl text-[#F8F5F0] mb-6">{tier.name}</h3>
                    <p className="text-base text-[#F8F5F0]/70 leading-relaxed mb-10">
                      {tier.intro}
                    </p>
                    <ul className="space-y-4 mb-10">
                      {tier.features.map((f, j) => (
                        <li key={j} className="flex gap-3 text-sm text-[#F8F5F0]/85 leading-relaxed">
                          <span className="text-[#C9A96E] mt-1 shrink-0">·</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-6 border-t border-[#3A3128]">
                      <div className="text-xs uppercase tracking-[0.16em] text-[#6B5E54] mb-2">
                        Commission
                      </div>
                      <div className="text-base text-[#F8F5F0]">{tier.commission}</div>
                    </div>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="py-section">
          <div className="container-luxe">
            <RevealOnScroll className="mb-20 max-w-3xl">
              <span className="eyebrow">How we sell</span>
              <h2 className="serif-italic text-3xl lg:text-5xl text-[#F8F5F0] mt-6 leading-tight">
                Six steps. The first one is the longest.
              </h2>
            </RevealOnScroll>

            <div className="grid gap-px bg-[#3A3128]">
              {sellContent.process.map((p, i) => (
                <RevealOnScroll key={p.step} delay={i * 0.08}>
                  <div className="bg-[#0A0A0A] grid lg:grid-cols-12 gap-8 p-8 lg:p-12 hover:bg-[#1F1A15] transition-colors duration-500 group">
                    <div className="lg:col-span-1">
                      <span className="serif-italic text-5xl text-[#C9A96E]">{p.step}</span>
                    </div>
                    <div className="lg:col-span-7">
                      <h3 className="serif-italic text-2xl lg:text-3xl text-[#F8F5F0] mb-4 group-hover:translate-x-2 transition-transform duration-500">
                        {p.title}
                      </h3>
                      <p className="text-base text-[#F8F5F0]/70 leading-relaxed">{p.body}</p>
                    </div>
                    <div className="lg:col-span-3 lg:col-start-10 lg:text-right">
                      <span className="text-xs uppercase tracking-[0.16em] text-[#6B5E54]">
                        {p.duration}
                      </span>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-section border-t border-[#3A3128] bg-[#0A0A0A] relative overflow-hidden">
          <div className="container-luxe">
            <RevealOnScroll className="mb-16 max-w-3xl">
              <span className="eyebrow">From owners</span>
              <h2 className="serif-italic text-3xl lg:text-5xl text-[#F8F5F0] mt-6 leading-tight">
                What sellers say, after the keys change hands.
              </h2>
            </RevealOnScroll>

            <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
              {sellContent.testimonials.map((t, i) => (
                <RevealOnScroll key={i} delay={i * 0.15}>
                  <blockquote className="flex flex-col h-full">
                    <span className="text-[#C9A96E] serif-italic text-5xl leading-none mb-6">"</span>
                    <p className="serif-italic text-xl lg:text-2xl text-[#F8F5F0] leading-relaxed flex-1">
                      {t.quote}
                    </p>
                    <footer className="mt-10 pt-6 border-t border-[#3A3128]">
                      <div className="text-sm font-medium text-[#F8F5F0]">{t.author}</div>
                      <div className="text-xs uppercase tracking-[0.16em] text-[#6B5E54] mt-1">
                        {t.role}
                      </div>
                    </footer>
                  </blockquote>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-section">
          <div className="container-luxe">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <RevealOnScroll className="lg:col-span-4 lg:sticky lg:top-32">
                <span className="eyebrow">Frequently asked</span>
                <h2 className="serif-italic text-3xl lg:text-5xl text-[#F8F5F0] mt-6 leading-tight">
                  The questions every owner asks.
                </h2>
                <p className="mt-6 text-base text-[#F8F5F0]/65 leading-relaxed">
                  If yours is not here, write to us. We will answer.
                </p>
              </RevealOnScroll>
              <div className="lg:col-span-8">
                <FaqAccordion items={sellContent.faq} />
              </div>
            </div>
          </div>
        </section>

        {/* CTA / VALUATION FORM */}
        <section id="valuation" className="py-section border-t border-[#3A3128] relative overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/33240623/pexels-photo-33240623.jpeg?auto=compress&cs=tinysrgb&w=2400"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-10"
          />
          <div className="relative z-10 container-luxe">
            <div className="max-w-3xl mx-auto text-center">
              <span className="eyebrow">Begin a private valuation</span>
              <h2 className="serif-italic text-3xl lg:text-6xl text-[#F8F5F0] mt-6 leading-tight">
                Write to us. We will answer in the language you reach out in.
              </h2>
              <p className="mt-8 text-base text-[#F8F5F0]/70 leading-relaxed max-w-xl mx-auto">
                A first conversation, by phone or in person at your property.
                No obligation. No pressure. We listen first.
              </p>
            </div>

            <form className="mt-16 max-w-2xl mx-auto space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your name"
                  className="bg-transparent border-b border-[#3A3128] focus:border-[#C9A96E] text-[#F8F5F0] py-4 px-1 placeholder:text-[#6B5E54] outline-none transition-colors"
                />
                <input
                  type="text"
                  placeholder="Where to reach you (phone, email, WhatsApp)"
                  className="bg-transparent border-b border-[#3A3128] focus:border-[#C9A96E] text-[#F8F5F0] py-4 px-1 placeholder:text-[#6B5E54] outline-none transition-colors"
                />
              </div>
              <input
                type="text"
                placeholder="Where is the property? (Bo Put, Maenam, Lipa Noi…)"
                className="w-full bg-transparent border-b border-[#3A3128] focus:border-[#C9A96E] text-[#F8F5F0] py-4 px-1 placeholder:text-[#6B5E54] outline-none transition-colors"
              />
              <textarea
                rows={4}
                placeholder="A few words about your property — bedrooms, year, anything we should know."
                className="w-full bg-transparent border-b border-[#3A3128] focus:border-[#C9A96E] text-[#F8F5F0] py-4 px-1 placeholder:text-[#6B5E54] outline-none transition-colors resize-none"
              />
              <div className="pt-6 flex flex-col sm:flex-row items-center gap-6">
                <button
                  type="submit"
                  className="border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#0A0A0A] px-8 py-4 text-xs uppercase tracking-[0.16em] transition-all duration-500"
                >
                  Send the note
                </button>
                <span className="text-xs text-[#6B5E54]">
                  Or call directly: <a href="tel:+66658314819" className="text-[#F8F5F0] hover:text-[#C9A96E]">+66 65 831 4819</a>
                </span>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
