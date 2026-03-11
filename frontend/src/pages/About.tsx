import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Marquee from '../components/Marquee';

const team = [
  { name: 'Zeeshan Bilal', role: 'Founder, CEO' },
  { name: 'Muhammad Awais Anwar', role: 'Chief Technology Officer' },
  { name: 'Qazi Zubair', role: 'MERN Stack Developer' },
  { name: 'Muhammad Zaid Nehal', role: 'Senior Software Engineer' },
  { name: 'Maaz Ahmad', role: 'AI Automation Engineer' },
  { name: 'Muhammad Abubakar', role: 'React/Next.js Developer' },
  { name: 'Ahmad Wasim', role: 'DevOps Engineer' },
];

const coreValues = [
  { title: 'Innovation First', desc: 'We constantly push boundaries and embrace emerging technologies to deliver cutting-edge solutions that keep our clients ahead of the curve.' },
  { title: 'Excellence in Execution', desc: 'We maintain the highest standards in every project, ensuring quality, reliability, and performance that exceeds expectations.' },
  { title: 'Client Partnership', desc: 'We build long-term relationships based on trust, transparency, and shared success, treating every project as a collaborative journey.' },
];

const About = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="bg-[#F4F4F0] min-h-screen selection:bg-black selection:text-[#D4FF3F]">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 min-h-[60vh] flex flex-col justify-end relative overflow-hidden">
        <motion.div
          style={{ y: useTransform(useScroll().scrollY, [0, 500], [0, -100]) }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-sm md:text-base uppercase tracking-widest mb-4 font-medium text-gray-500">The Studio — 01</p>
          <h1 className="text-[10vw] md:text-[8vw] leading-[0.85] font-bold tracking-tighter uppercase display-font">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%", filter: "blur(10px)" }}
                animate={{ y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block text-black"
              >
                About
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%", filter: "blur(10px)" }}
                animate={{ y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block text-black"
              >
                Us.
              </motion.span>
            </span>
          </h1>
        </motion.div>
        
        <div className="mt-12 max-w-3xl relative">
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 w-full h-[1px] bg-black/10 origin-left"
          />
          <div className="pt-8">
            <p className="text-xl md:text-2xl font-medium leading-relaxed display-font text-gray-700 italic">
              "We believe in the power of precision and the beauty of scale."
            </p>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed mt-4 font-medium">
              Promoteki is a forward-thinking digital solutions provider specializing in RPA and modern web development.
            </p>
          </div>
        </div>
      </section>

      <Marquee text="DESIGN × DEVELOP × AUTOMATE —" dark={true} />

      {/* Principles Section - Simple Layout */}
      <section className="py-32 px-6 relative">
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 left-0 w-full h-[1px] bg-black/10 origin-left"
        />
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-black/40">Company — 02</p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase display-font">Core Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {coreValues.map((value, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-sm font-mono text-black/40 mb-6">0{i + 1}</span>
                <h3 className="text-2xl font-bold uppercase tracking-tight display-font mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed font-medium">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Simple Grid */}
      <section className="py-32 px-6 bg-white relative">
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 left-0 w-full h-[1px] bg-black/10 origin-left"
        />
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-black/40">Our People — 03</p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase display-font">The Team</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {team.map((member, i) => (
              <div key={i} className="flex flex-col p-8 border border-black/5 hover:border-black/10 transition-colors">
                <h3 className="text-xl font-bold uppercase display-font mb-1">{member.name}</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-40 px-6 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl md:text-6xl font-black display-font uppercase tracking-tighter mb-12 max-w-4xl text-black">
          We're constantly looking for the <span className="text-black/20 italic">next big challenge.</span>
        </h2>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <button className="px-12 py-5 bg-black text-[#D4FF3F] text-sm uppercase font-black tracking-widest hover:bg-[#D4FF3F] hover:text-black transition-all duration-300">
            Join the collective
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
