import Image from 'next/image';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppButton } from '@/components/sections/WhatsAppButton';
import { RevealOnScroll } from '@/components/sections/RevealOnScroll';
import teamData from '../../../data/team.json';

export const metadata = {
  title: 'About — Shine Asia Estate, Koh Samui',
  description:
    'A small house. Twelve years curating exceptional properties across Koh Samui and the Thai islands. Founded by Mr. Oussama Zakaria.',
};

const VALUES = [
  {
    title: 'Place over price',
    body:
      'We work with the houses that understand the wind they stand in. We refuse listings we cannot honestly defend.',
  },
  {
    title: 'Walk before you sell',
    body:
      'Every property is visited at the hour it is at its best. Photography, paperwork, valuation — all done before the first buyer sees it.',
  },
  {
    title: 'Quiet, properly',
    body:
      'Discretion at every step. Our private buyer book sees properties eight weeks before any public listing.',
  },
  {
    title: 'On your side',
    body:
      'We represent the owner, not the buyer. Bilingual at the Land Office. We let no one sign what they do not understand.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative min-h-[80vh] flex items-end pt-32 pb-20 overflow-hidden bg-black">
          <Image
            src="https://images.pexels.com/photos/33271606/pexels-photo-33271606.jpeg?auto=compress&cs=tinysrgb&w=2400"
            alt="Coastal road, Koh Samui — twelve kilometres of coastline we know by name"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0"
               style={{
                 background:
                   'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.9) 100%)',
               }}
          />
          <div className="relative z-10 container-luxe">
            <RevealOnScroll>
              <span className="eyebrow">About the house</span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h1 className="serif-italic text-[#F8F5F0] mt-8 max-w-5xl leading-[1.05]"
                  style={{ fontSize: 'clamp(2.5rem, 1.5rem + 4vw, 6rem)' }}>
                A small house. Twelve years on the island.
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p className="mt-10 max-w-2xl text-lg text-[#F8F5F0]/80 leading-relaxed">
                We are not the largest agency on Koh Samui. We are not trying to be.
                We curate one address at a time, and we keep the portfolio small enough
                to honour every property in it.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* Story */}
        <section className="py-section">
          <div className="container-luxe">
            <div className="grid lg:grid-cols-12 gap-12">
              <RevealOnScroll className="lg:col-span-5">
                <span className="eyebrow">The story</span>
                <h2 className="serif-italic text-3xl lg:text-5xl text-[#F8F5F0] mt-6 leading-tight">
                  Founded in 2013. Built one address at a time.
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={0.15} className="lg:col-span-6 lg:col-start-7">
                <div className="space-y-6 text-base lg:text-lg text-[#F8F5F0]/75 leading-relaxed">
                  <p>
                    Mr. Oussama Zakaria moved to Koh Samui in 2013, looking for one house.
                    He found three. The first one became his home. The other two became
                    his first two listings — sold within four months, to families who still
                    write to him at Christmas.
                  </p>
                  <p>
                    Twelve years later, Shine Asia Estate has placed more than six hundred
                    properties — quietly, into careful hands. We have grown the team
                    deliberately small. We have refused listings we could not defend.
                    We have walked every coastline between Lipa Noi and Choeng Mon.
                  </p>
                  <p className="text-[#C9A96E] serif-italic text-xl pt-2">
                    We do not sell square metres. We place sanctuaries.
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-section border-t border-[#3A3128]">
          <div className="container-luxe">
            <RevealOnScroll className="mb-16 max-w-3xl">
              <span className="eyebrow">What we hold to</span>
              <h2 className="serif-italic text-3xl lg:text-5xl text-[#F8F5F0] mt-6 leading-tight">
                Four principles. Held loosely. Worked hard.
              </h2>
            </RevealOnScroll>
            <div className="grid sm:grid-cols-2 gap-px bg-[#3A3128]">
              {VALUES.map((v, i) => (
                <RevealOnScroll key={v.title} delay={i * 0.1}>
                  <div className="bg-[#0A0A0A] p-10 lg:p-14 h-full">
                    <span className="serif-italic text-5xl text-[#C9A96E]/60">0{i + 1}</span>
                    <h3 className="serif-italic text-2xl lg:text-3xl text-[#F8F5F0] mt-6 mb-4">
                      {v.title}
                    </h3>
                    <p className="text-base text-[#F8F5F0]/70 leading-relaxed">{v.body}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-section">
          <div className="container-luxe">
            <RevealOnScroll className="mb-16 max-w-3xl">
              <span className="eyebrow">The team</span>
              <h2 className="serif-italic text-3xl lg:text-5xl text-[#F8F5F0] mt-6 leading-tight">
                A small house. Real people. The same number to call.
              </h2>
            </RevealOnScroll>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {teamData.map((member, i) => (
                <RevealOnScroll key={member.id} delay={i * 0.1}>
                  <article>
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#2A2420] mb-6">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="serif-italic text-7xl text-[#C9A96E]/20">
                          {member.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    <div className="text-xs uppercase tracking-[0.18em] text-[#C9A96E] mb-2">
                      {member.role}
                    </div>
                    <h3 className="serif-italic text-3xl text-[#F8F5F0] mb-4 leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-sm text-[#F8F5F0]/65 leading-relaxed mb-6">{member.bio}</p>

                    <div className="space-y-2 pt-4 border-t border-[#3A3128] text-xs uppercase tracking-[0.16em]">
                      {member.languages && (
                        <div className="text-[#6B5E54]">
                          {member.languages.join(' · ')}
                        </div>
                      )}
                      <div className="flex gap-4 pt-2">
                        {member.whatsapp && (
                          <a
                            href={`https://wa.me/${member.whatsapp.replace(/\D/g, '')}`}
                            className="text-[#C9A96E] hover:underline"
                          >
                            WhatsApp
                          </a>
                        )}
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="text-[#C9A96E] hover:underline"
                          >
                            Email
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="py-section border-t border-[#3A3128]">
          <div className="container-luxe">
            <div className="max-w-3xl mx-auto text-center">
              <span className="eyebrow">A first conversation</span>
              <h2 className="serif-italic text-3xl lg:text-5xl text-[#F8F5F0] mt-6 leading-tight">
                Write to us. We answer in the language you reach out in.
              </h2>
              <div className="mt-10 flex items-center justify-center gap-6 flex-wrap">
                <a
                  href="/contact"
                  className="border border-[#C9A96E] text-[#C9A96E] px-8 py-4 text-xs uppercase tracking-[0.16em] hover:bg-[#C9A96E] hover:text-[#0A0A0A] transition-all duration-500"
                >
                  Open conversation
                </a>
                <a
                  href="tel:+66658314819"
                  className="text-xs uppercase tracking-[0.16em] text-[#F8F5F0]/60 hover:text-[#C9A96E]"
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
