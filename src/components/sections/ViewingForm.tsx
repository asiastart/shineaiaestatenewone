'use client';

import { useState, FormEvent } from 'react';

const WA_NUMBER = '66658314819';

export function ViewingForm({ propertyTitle }: { propertyTitle: string }) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [timing, setTiming] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = [
      `I'd like to arrange a viewing for: ${propertyTitle}`,
      `Name: ${name}`,
      `Contact: ${contact}`,
      timing ? `Preferred time: ${timing}` : '',
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
      <div className="mt-8 py-8 text-center space-y-4">
        <p className="serif-italic text-xl text-[#F8F5F0]">WhatsApp is opening.</p>
        <p className="text-xs text-[#F8F5F0]/55 leading-relaxed">
          Your viewing request is pre-filled. Mr. Zakaria will confirm within a few hours.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="text-xs uppercase tracking-[0.16em] text-[#6B5E54] hover:text-[#C9A96E] border-b border-[#6B5E54] hover:border-[#C9A96E] pb-1 transition-colors"
        >
          Start again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <label htmlFor="view-name" className="sr-only">Your name</label>
      <input
        id="view-name"
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        maxLength={100}
        className="w-full bg-transparent border-b border-[#3A3128] focus:border-[#C9A96E] text-[#F8F5F0] py-3 px-1 text-sm placeholder:text-[#6B5E54] outline-none transition-colors"
      />
      <label htmlFor="view-contact" className="sr-only">Phone, email, or WhatsApp</label>
      <input
        id="view-contact"
        type="text"
        required
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        placeholder="Phone, email, or WhatsApp"
        maxLength={200}
        className="w-full bg-transparent border-b border-[#3A3128] focus:border-[#C9A96E] text-[#F8F5F0] py-3 px-1 text-sm placeholder:text-[#6B5E54] outline-none transition-colors"
      />
      <label htmlFor="view-timing" className="sr-only">
        When would you like to walk through?
      </label>
      <textarea
        id="view-timing"
        rows={3}
        value={timing}
        onChange={(e) => setTiming(e.target.value)}
        placeholder="When would you like to walk through?"
        maxLength={500}
        className="w-full bg-transparent border-b border-[#3A3128] focus:border-[#C9A96E] text-[#F8F5F0] py-3 px-1 text-sm placeholder:text-[#6B5E54] outline-none transition-colors resize-none"
      />
      <button
        type="submit"
        className="w-full mt-4 border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#0A0A0A] px-6 py-3 text-xs uppercase tracking-[0.16em] transition-all duration-500 rounded-full"
      >
        Arrange a viewing
      </button>
    </form>
  );
}
