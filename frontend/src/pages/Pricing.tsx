import React from 'react';
import { Link } from 'react-router-dom';
import Marquee from '../components/Marquee';

const plans = [
  { title: 'Custom Solutions', desc: "We'll work with you to create a customized solution that meets your specific needs.", features: ['Dedicated project manager', 'Custom architecture', 'Scalable infrastructure', 'Full documentation'] },
  { title: 'Web Development', desc: 'Our team of experts will help you build a modern, scalable, and secure web application.', features: ['React / Next.js stack', 'Responsive design', 'SEO optimization', 'Performance tuning'], featured: true },
  { title: 'RPA Solutions', desc: "We'll help you automate repetitive tasks and business workflows with Robotic Process Automation.", features: ['Workflow analysis', 'Bot development', 'Process optimization', 'ROI tracking'] },
  { title: 'API Development', desc: 'Our team will design and integrate secure, reliable APIs to connect your systems seamlessly.', features: ['RESTful / GraphQL APIs', 'Third-party integration', 'Security & auth', 'Documentation'] },
];

const Pricing = () => {
  return (
    <>
      {/* Page Hero */}
      <section className="pt-32 pb-16 px-6 min-h-[60vh] flex flex-col justify-end">
        <p className="text-sm md:text-base uppercase tracking-widest mb-4 font-medium text-gray-500">Investment</p>
        <h1 className="text-[10vw] md:text-[8vw] leading-[0.85] font-bold tracking-tighter uppercase display-font">
          Pricing
        </h1>
        <div className="mt-8 b-top pt-8 max-w-3xl">
          <p className="text-xl md:text-2xl font-medium leading-relaxed display-font text-gray-700">
            Our services are tailored to meet your unique needs. Get a quote today.
          </p>
        </div>
      </section>

      <Marquee text="TAILORED × SCALABLE × TRANSPARENT —" dark={false} />

      {/* Pricing Grid */}
      <section className="py-24 bg-white border-t border-black/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, i) => (
              <div key={i} className={`border ${plan.featured ? 'border-black bg-[#111111] text-[#F4F4F0]' : 'border-black/10 bg-[#F4F4F0]'} p-8 flex flex-col relative group hover:-translate-y-1 transition-transform`}>
                {plan.featured && (
                  <span className="absolute top-4 right-4 bg-white text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest">Popular</span>
                )}
                <span className="text-xs font-mono text-gray-400 mb-6 block">0{i + 1}</span>
                <h3 className="text-2xl font-bold display-font uppercase tracking-tighter mb-4">{plan.title}</h3>
                <p className={`text-sm leading-relaxed mb-8 ${plan.featured ? 'text-gray-300' : 'text-gray-600'}`}>{plan.desc}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className={`text-sm flex items-center gap-2 ${plan.featured ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className={`w-1.5 h-1.5 ${plan.featured ? 'bg-white' : 'bg-black'} flex-shrink-0`}></span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={`block text-center border ${plan.featured ? 'border-[#F4F4F0] hover:bg-[#F4F4F0] hover:text-black' : 'border-black hover:bg-black hover:text-[#F4F4F0]'} px-6 py-3 uppercase text-xs tracking-widest font-bold transition-colors`}>
                  Get a Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
