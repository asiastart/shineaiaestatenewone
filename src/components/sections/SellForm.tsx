'use client';

import { useState, FormEvent } from 'react';

const WA_NUMBER = '66658314819';

export function SellForm() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = [
      `I'd like a private valuation for my property.`,
      `Name: ${name}`,
      `Contact: ${contact}`,
      location ? `Location: ${location}` : '',
      details ? `Details: ${details}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
    setSent(true);
  };

  if (sent) {
    return (
      <div className="mt-16 max-w-2xl mx-auto py-16 text-center space-y-6">
        <p className="serif-italic text-3xl lg:text-4xl text-[#F8F5F0] leading-tight">
          WhatsApp is opening.
        </p>
        <p className="text-sm text-[#F8F5F0]/65 leading-relaxed max-w-md mx-auto">
          Your valuation request is pre-filled. Mr. Zakaria will respond within twenty-four hours.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="text-xs uppercase tracking-[0.16em] text-[#6B5E54] hover:text-[#C9A96E] border-b border-[#6B5E54] hover:border-[#C9A96E] pb-1 transition-colors"
        >
          Send another note
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-16 max-w-2xl mx-auto space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="sell-name" className="sr-only">Your name</label>
          <input
            id="sell-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            maxLength={100}
            className="w-full bg-transparent border-b border-[#3A3128] focus:border-[#C9A96E] text-[#F8F5F0] py-4 px-1 placeholder:text-[#6B5E54] outline-none transition-colors"
          />
        </div>
        <div>
          <label htmlFor="sell-contact" className="sr-only">
            Where to reach you (phone, email, WhatsApp)
          </label>
          <input
            id="sell-contact"
            type="text"
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Where to reach you (phone, email, WhatsApp)"
            maxLength={200}
            className="w-full bg-transparent border-b border-[#3A3128] focus:border-[#C9A96E] text-[#F8F5F0] py-4 px-1 placeholder:text-[#6B5E54] outline-none transition-colors"
          />
        </div>
      </div>
      <label htmlFor="sell-location" className="sr-only">
        Where is the property? (Bo Put, Maenam, Lipa Noi…)
      </label>
      <input
        id="sell-location"
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Where is the property? (Bo Put, Maenam, Lipa Noi…)"
        maxLength={200}
        className="w-full bg-transparent border-b border-[#3A3128] focus:border-[#C9A96E] text-[#F8F5F0] py-4 px-1 placeholder:text-[#6B5E54] outline-none transition-colors"
      />
      <label htmlFor="sell-details" className="sr-only">
        Tell us about your property — bedrooms, year, anything we should know
      </label>
      <textarea
        id="sell-details"
        rows={4}
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="A few words about your property — bedrooms, year, anything we should know."
        maxLength={1000}
        className="w-full bg-transparent border-b border-[#3A3128] focus:border-[#C9A96E] text-[#F8F5F0] py-4 px-1 placeholder:text-[#6B5E54] outline-none transition-colors resize-none"
      />
      <div className="pt-6 flex flex-col sm:flex-row items-center gap-6">
        <button
          type="submit"
          className="border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#0A0A0A] px-8 py-4 text-xs uppercase tracking-[0.16em] transition-all duration-500 rounded-full"
        >
          Send the note
        </button>
        <span className="text-xs text-[#6B5E54]">
          Or call directly:{' '}
          <a href="tel:+66658314819" className="text-[#F8F5F0] hover:text-[#C9A96E]">
            +66 65 831 4819
          </a>
        </span>
      </div>
    </form>
  );
}
