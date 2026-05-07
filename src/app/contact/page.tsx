import Image from 'next/image';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppButton } from '@/components/sections/WhatsAppButton';
import { RevealOnScroll } from '@/components/sections/RevealOnScroll';

export const metadata = {
  title: 'Contact — Shine Asia Estate, Koh Samui',
  description:
    'Open a conversation. By phone, by email, on WhatsApp. We answer in the language you reach out in.',
};

const CONTACT_METHODS = [
  {
    label: 'Phone',
    value: '+66 65 831 4819',
    href: 'tel:+66658314819',
    note: 'Mon–Sun · 9:00–20:00 ICT',
  },
  {
    label: 'WhatsApp',
    value: 'Open conversation',
    href: 'https://wa.me/66658314819',
    note: 'Faster on weekends',
  },
  {
    label: 'Email',
    value: 'zakaria@shineasiaestate.com',
    href: 'mailto:zakaria@shineasiaestate.com',
    note: 'Direct to Mr. Zakaria',
  },
];

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero — minimal */}
        <section className="relative pt-40 pb-20 lg:pb-32 bg-black overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/33240564/pexels-photo-33240564.jpeg?auto=compress&cs=tinysrgb&w=2400"
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
          <div className="relative z-10 container-luxe">
            <RevealOnScroll>
              <span className="eyebrow">Open conversation</span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h1 className="serif-italic text-[#F8F5F0] mt-8 max-w-5xl leading-[1.05]"
                  style={{ fontSize: 'clamp(2.5rem, 1.5rem + 4vw, 6rem)' }}>
                Write to us. We answer in the language you reach out in.
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p className="mt-8 max-w-2xl text-lg text-[#F8F5F0]/75 leading-relaxed">
                English, French, Thai, Arabic. By phone, email, or WhatsApp.
                Mr. Zakaria reads every message that arrives.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* Contact methods */}
        <section className="py-section border-t border-[#3A3128]">
          <div className="container-luxe">
            <div className="grid lg:grid-cols-3 gap-px bg-[#3A3128]">
              {CONTACT_METHODS.map((m, i) => (
                <RevealOnScroll key={m.label} delay={i * 0.1}>
                  <a
                    href={m.href}
                    className="block bg-[#0A0A0A] p-10 lg:p-14 hover:bg-[#1F1A15] transition-colors duration-500 group h-full"
                  >
                    <span className="text-xs uppercase tracking-[0.18em] text-[#C9A96E]">{m.label}</span>
                    <div className="serif-italic text-3xl lg:text-4xl text-[#F8F5F0] mt-6 group-hover:translate-x-2 transition-transform duration-500">
                      {m.value}
                    </div>
                    <div className="text-xs uppercase tracking-[0.16em] text-[#6B5E54] mt-6">
                      {m.note}
                    </div>
                  </a>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="py-section">
          <div className="container-luxe">
            <div className="grid lg:grid-cols-12 gap-12">
              <RevealOnScroll className="lg:col-span-5">
                <span className="eyebrow">Send the note</span>
                <h2 className="serif-italic text-3xl lg:text-5xl text-[#F8F5F0] mt-6 leading-tight">
                  A first conversation, by message.
                </h2>
                <p className="mt-6 text-base text-[#F8F5F0]/65 leading-relaxed">
                  Tell us what you are looking for, or what you would like to sell.
                  No obligation. We answer within twenty-four hours, in your language.
                </p>

                <div className="mt-12 pt-8 border-t border-[#3A3128] space-y-2 text-sm">
                  <div className="text-xs uppercase tracking-[0.18em] text-[#C9A96E] mb-4">The office</div>
                  <p className="text-[#F8F5F0]/70 leading-relaxed">
                    151, 31 Village No.1<br />
                    Bo Put, Surat Thani 84320<br />
                    Thailand
                  </p>
                  <p className="text-[#6B5E54] text-xs uppercase tracking-[0.16em] pt-4">
                    Visit by appointment.
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.15} className="lg:col-span-7">
                <form className="space-y-7">
                  <div className="grid md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="Your name"
                      className="bg-transparent border-b border-[#3A3128] focus:border-[#C9A96E] text-[#F8F5F0] py-4 px-1 placeholder:text-[#6B5E54] outline-none transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Phone, email, or WhatsApp"
                      className="bg-transparent border-b border-[#3A3128] focus:border-[#C9A96E] text-[#F8F5F0] py-4 px-1 placeholder:text-[#6B5E54] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-[0.18em] text-[#6B5E54] block mb-3">
                      What are you reaching out about?
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {['Buying', 'Selling', 'Both', 'Just curious'].map((opt) => (
                        <label key={opt} className="cursor-pointer">
                          <input type="radio" name="intent" value={opt} className="peer sr-only" defaultChecked={opt === 'Buying'} />
                          <span className="block px-5 py-3 border border-[#3A3128] text-xs uppercase tracking-[0.16em] text-[#F8F5F0]/70 peer-checked:bg-[#C9A96E] peer-checked:text-[#0A0A0A] peer-checked:border-[#C9A96E] hover:border-[#C9A96E] transition-all">
                            {opt}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <textarea
                    rows={6}
                    placeholder="Tell us a little about what you are looking for — or what you would like to place. We read everything."
                    className="w-full bg-transparent border-b border-[#3A3128] focus:border-[#C9A96E] text-[#F8F5F0] py-4 px-1 placeholder:text-[#6B5E54] outline-none transition-colors resize-none"
                  />

                  <div className="pt-4 flex items-center gap-6 flex-wrap">
                    <button
                      type="submit"
                      className="border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#0A0A0A] px-8 py-4 text-xs uppercase tracking-[0.16em] transition-all duration-500"
                    >
                      Send the note
                    </button>
                    <span className="text-xs text-[#6B5E54] uppercase tracking-[0.16em]">
                      Or reach us directly at the numbers above
                    </span>
                  </div>
                </form>
              </RevealOnScroll>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
