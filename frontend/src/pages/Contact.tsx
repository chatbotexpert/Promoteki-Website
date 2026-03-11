import React, { useState } from 'react';
import Marquee from '../components/Marquee';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      {/* Page Hero */}
      <section className="pt-32 pb-16 px-6 min-h-[60vh] flex flex-col justify-end">
        <p className="text-sm md:text-base uppercase tracking-widest mb-4 font-medium text-gray-500">Get In Touch</p>
        <h1 className="text-[10vw] md:text-[8vw] leading-[0.85] font-bold tracking-tighter uppercase display-font">
          Contact
        </h1>
        <div className="mt-8 b-top pt-8 max-w-3xl">
          <p className="text-xl md:text-2xl font-medium leading-relaxed display-font text-gray-700">
            Have questions, suggestions, or want to work with us? We'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      <Marquee text="LET'S BUILD TOGETHER —" />

      {/* Contact Form */}
      <section className="py-24 bg-white border-t border-black/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Info */}
            <div className="lg:col-span-4">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Our Office</p>
              <div className="space-y-6">
                <div className="border-t border-black/10 pt-6">
                  <h4 className="font-bold display-font text-sm mb-2 uppercase tracking-wider">Address</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">Office No 43/43A City Tower<br/>Chungi No 9, Multan<br/>Pakistan</p>
                </div>
                <div className="border-t border-black/10 pt-6">
                  <h4 className="font-bold display-font text-sm mb-2 uppercase tracking-wider">Email</h4>
                  <a href="mailto:contact@promoteki.com" className="text-gray-600 text-sm hover:text-black transition-colors">contact@promoteki.com</a>
                </div>
                <div className="border-t border-black/10 pt-6">
                  <h4 className="font-bold display-font text-sm mb-2 uppercase tracking-wider">Phone</h4>
                  <a href="tel:+923090483683" className="text-gray-600 text-sm hover:text-black transition-colors">+92 309 048 3683</a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-8 lg:pl-12 border-t lg:border-t-0 lg:border-l border-black/10 pt-8 lg:pt-0">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-8">Send a Message</p>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                  <div className="mb-8">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 block">Name</label>
                    <input type="text" className="brutalist-input w-full text-lg font-medium" placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                  </div>
                  <div className="mb-8">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 block">Email</label>
                    <input type="email" className="brutalist-input w-full text-lg font-medium" placeholder="your@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                  </div>
                </div>
                <div className="mb-8">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 block">Subject</label>
                  <input type="text" className="brutalist-input w-full text-lg font-medium" placeholder="What's this about?" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required />
                </div>
                <div className="mb-8">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 block">Message</label>
                  <textarea className="brutalist-input w-full text-lg font-medium resize-none" rows="4" placeholder="Tell us more..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} required></textarea>
                </div>
                <button type="submit" className="bg-black text-[#F4F4F0] px-8 py-4 uppercase text-sm tracking-widest font-bold hover:bg-gray-800 transition-colors w-full md:w-auto">
                  {sent ? '✓ Message Sent' : 'Send Message →'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
