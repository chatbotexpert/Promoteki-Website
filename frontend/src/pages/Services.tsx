import React from 'react';
import { Link } from 'react-router-dom';
import Marquee from '../components/Marquee';

const services = [
  { num: '01', title: 'CRM Integration', desc: 'Modern and responsive CRMs built with the latest frameworks and best practices.' },
  { num: '02', title: 'RPA Solutions', desc: 'Automate repetitive tasks and business workflows with Robotic Process Automation, improving efficiency and reducing costs.' },
  { num: '03', title: 'API Development & Integration', desc: 'Design and integrate secure, reliable APIs to connect your systems, third-party apps, and business tools seamlessly.' },
  { num: '04', title: 'SaaS Development', desc: 'Build scalable and secure SaaS applications that can be easily deployed and scaled.' },
  { num: '05', title: 'Ecommerce Solutions', desc: 'Build and manage your online store with a robust, scalable platform that integrates with your existing systems.' },
  { num: '06', title: 'Custom Automation Bots', desc: 'Build intelligent bots for data scraping, reporting, and system integrations to save time and eliminate manual errors.' },
];

const ArrowIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const Services = () => {
  return (
    <>
      {/* Page Hero */}
      <section className="pt-32 pb-16 px-6 min-h-[60vh] flex flex-col justify-end">
        <p className="text-sm md:text-base uppercase tracking-widest mb-4 font-medium text-gray-500">Our Services</p>
        <h1 className="text-[10vw] md:text-[8vw] leading-[0.85] font-bold tracking-tighter uppercase display-font">
          Services
        </h1>
        <div className="mt-8 b-top pt-8 max-w-3xl">
          <p className="text-xl md:text-2xl font-medium leading-relaxed display-font text-gray-700">
            Our innovative IT solutions streamline your operations, enhancing efficiency and productivity. Experience the future of automation.
          </p>
        </div>
      </section>

      <Marquee text="WEB × RPA × API × SAAS × BOTS —" />

      {/* Services List */}
      <section className="py-24 bg-white border-t border-black/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="border-t border-black/10">
            {services.map((svc, i) => (
              <div key={i} className="group border-b border-black/10 py-10 flex flex-col md:flex-row justify-between md:items-center gap-6 cursor-pointer hover:bg-[#F4F4F0] transition-colors px-6 -mx-6">
                <div className="flex items-start gap-8">
                  <span className="text-sm font-mono text-gray-400 mt-2">{svc.num}</span>
                  <div>
                    <h3 className="text-3xl md:text-5xl font-bold display-font uppercase tracking-tighter mb-3 group-hover:pl-4 transition-all duration-300">{svc.title}</h3>
                    <p className="text-gray-600 max-w-xl group-hover:pl-4 transition-all duration-300 delay-75 text-sm md:text-base">{svc.desc}</p>
                  </div>
                </div>
                <div className="hidden md:flex w-12 h-12 rounded-full border border-black/20 items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300 group-hover:-rotate-45 flex-shrink-0">
                  <ArrowIcon />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-[#F4F4F0] border-t border-black/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold display-font tracking-tighter mb-8 text-[#111111]">Need something custom?</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">Contact us to discuss your specific requirements and we'll tailor a solution that fits your business perfectly.</p>
          <Link to="/contact" className="inline-block bg-black text-[#F4F4F0] px-8 py-4 uppercase text-sm tracking-widest font-bold hover:bg-gray-800 transition-colors">
            Let's Talk →
          </Link>
        </div>
      </section>
    </>
  );
};

export default Services;
