'use client';

import { useState, FormEvent } from 'react';

const WA_NUMBER = '66658314819';

export function ContactForm() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [intent, setIntent] = useState('Buying');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = [
      `Hi, my name is ${name}.`,
      `Contact: ${contact}`,
      `Intent: ${intent}`,
      message ? `Message: ${message}` : '',
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
      <div className="py-16 text-center space-y-6">
        <p className="serif-italic text-3xl lg:text-4xl text-[#F8F5F0] leading-tight">
          WhatsApp is opening.
        </p>
        <p className="text-sm text-[#F8F5F0]/65 leading-relaxed max-w-md mx-auto">
          Your message is pre-filled. Send it when you are ready — Mr. Zakaria reads every note personally.
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
    <form onSubmit={handleSubmit} className="space-y-7">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contact-name" className="sr-only">Your name</label>
          <input
            id="contact-name"
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
          <label htmlFor="contact-reach" className="sr-only">Phone, email, or WhatsApp</label>
          <input
            id="contact-reach"
            type="text"
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Phone, email, or WhatsApp"
            maxLength={200}
            className="w-full bg-transparent border-b border-[#3A3128] focus:border-[#C9A96E] text-[#F8F5F0] py-4 px-1 placeholder:text-[#6B5E54] outline-none transition-colors"
          />
        </div>
      </div>

      <fieldset>
        <legend className="text-xs uppercase tracking-[0.18em] text-[#6B5E54] block mb-3">
          What are you reaching out about?
        </legend>
        <div className="flex flex-wrap gap-3">
          {['Buying', 'Selling', 'Both', 'Just curious'].map((opt) => (
            <label key={opt} className="cursor-pointer">
              <input
                type="radio"
                name="intent"
                value={opt}
                checked={intent === opt}
                onChange={() => setIntent(opt)}
                className="peer sr-only"
              />
              <span className="block px-5 py-3 border border-[#3A3128] text-xs uppercase tracking-[0.16em] text-[#F8F5F0]/70 peer-checked:bg-[#C9A96E] peer-checked:text-[#0A0A0A] peer-checked:border-[#C9A96E] hover:border-[#C9A96E] transition-all rounded-full">
                {opt}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label htmlFor="contact-message" className="sr-only">
        Tell us about what you are looking for or would like to place
      </label>
      <textarea
        id="contact-message"
        rows={6}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Tell us a little about what you are looking for — or what you would like to place. We read everything."
        maxLength={2000}
        className="w-full bg-transparent border-b border-[#3A3128] focus:border-[#C9A96E] text-[#F8F5F0] py-4 px-1 placeholder:text-[#6B5E54] outline-none transition-colors resize-none"
      />

      <div className="pt-4 flex items-center gap-6 flex-wrap">
        <button
          type="submit"
          className="border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#0A0A0A] px-8 py-4 text-xs uppercase tracking-[0.16em] transition-all duration-500 rounded-full"
        >
          Send the note
        </button>
        <span className="text-xs text-[#6B5E54] uppercase tracking-[0.16em]">
          Opens WhatsApp with your message
        </span>
      </div>
    </form>
  );
}
