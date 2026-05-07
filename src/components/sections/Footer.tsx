import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-[#3A3128] py-20 lg:py-28">
      <div className="container-luxe">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-baseline gap-2 mb-6">
              <span className="serif-italic text-3xl tracking-tight text-[#F8F5F0]">Shine</span>
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#C9A96E] mt-1">Asia Estate</span>
            </Link>
            <p className="serif-italic text-2xl text-[#F8F5F0]/85 max-w-md leading-tight">
              The Thailand we keep for ourselves.
            </p>
            <p className="mt-6 text-sm text-[#F8F5F0]/55 max-w-md leading-relaxed">
              A small, considered portfolio of hotels, immeubles, and signature
              residences across Paris, Cannes, and Dubai. Heritage portfolio in
              Koh Samui. Curated since 2013.
            </p>
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <h4 className="text-xs uppercase tracking-[0.18em] text-[#C9A96E] mb-6">Visit</h4>
            <ul className="space-y-3 text-sm text-[#F8F5F0]/70">
              <li><Link href="/properties" className="hover:text-[#C9A96E] transition">Portfolio</Link></li>
              <li><Link href="/about" className="hover:text-[#C9A96E] transition">About the house</Link></li>
              <li><Link href="/blog" className="hover:text-[#C9A96E] transition">Journal</Link></li>
              <li><Link href="/contact" className="hover:text-[#C9A96E] transition">Open conversation</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.18em] text-[#C9A96E] mb-6">Reach us</h4>
            <ul className="space-y-3 text-sm text-[#F8F5F0]/70">
              <li>
                <a href="tel:+66658314819" className="hover:text-[#C9A96E] transition">+66 65 831 4819</a>
              </li>
              <li>
                <a href="https://wa.me/66658314819" className="hover:text-[#C9A96E] transition">WhatsApp</a>
              </li>
              <li>
                <a href="mailto:zakaria@shineasiaestate.com" className="hover:text-[#C9A96E] transition">
                  zakaria@shineasiaestate.com
                </a>
              </li>
              <li className="text-[#F8F5F0]/40 text-xs leading-relaxed pt-2">
                151, 31 Village No.1<br />Bo Put, Surat Thani 84320<br />Thailand
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-[#3A3128] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.18em] text-[#6B5E54]">
            © 2026 Shine Asia Estate · Koh Samui, Thailand
          </p>
          <p className="text-xs uppercase tracking-[0.18em] text-[#6B5E54]">
            EN · FR · TH · العربية
          </p>
        </div>
      </div>
    </footer>
  );
}
