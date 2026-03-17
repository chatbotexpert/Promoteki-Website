import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Marquee from '../components/Marquee';
import { motion, AnimatePresence } from 'framer-motion';

const plans = [
  { 
    title: 'Web Platforms', 
    desc: 'High-performance digital products engineered for global scale and mission-critical reliability.', 
    features: ['Next.js / TypeScript Core', 'Advanced SEO Architecture', 'Performance Engineering', 'E2E Testing & CI/CD'], 
    featured: true,
    price: 300
  },
  { 
    title: 'RPA Solutions', 
    desc: 'Intelligent automation systems designed to eliminate manual bottlenecks and maximize efficiency.', 
    features: ['Workflow Logic Mapping', 'Autonomous Bot Builds', 'Process Optimization', 'Real-time Monitoring'],
    price: 100
  },
  { 
    title: 'API Integration', 
    desc: 'Secure, robust integration layers connecting disparate systems into a unified business mesh.', 
    features: ['GraphQL / REST Mesh', 'Third-party Orchestration', 'E2E Encryption', 'Schema-first Design'],
    price: 200
  },
  { 
    title: 'VPS Forge', 
    desc: 'High-performance virtual engines. Scalable nodal infrastructure with hyper-speed I/O and mission-critical uptime.', 
    features: ['4 vCPU / 8GB RAM', 'NVMe / SSD Options', 'Global Edge Regions', '24/7 System Forge'],
    price: 29.90
  },
  { 
    title: 'Custom Forge', 
    desc: 'Bespoke software solutions crafted for complex enterprise requirements and unique scale.', 
    features: ['Strategic Consulting', 'Custom Architecture', 'Scalable Infrastructure', 'Full Lifecycle Docs'],
    price: null 
  },
];

const Pricing = () => {
  const [isLongTerm, setIsLongTerm] = useState(false);

  // Type-safe variants to avoid lint errors
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen font-sans">
      {/* Page Hero - 1:1 with Services Style */}
      <section className="pt-32 pb-16 px-6 min-h-[60vh] flex flex-col justify-end">
        <div className="max-w-7xl mx-auto w-full">
          <p className="text-sm md:text-base uppercase tracking-widest mb-4 font-medium text-gray-500">Pricing Models</p>
          <h1 className="text-[10vw] md:text-[8vw] leading-[0.85] font-bold tracking-tighter uppercase display-font">
            Pricing
          </h1>
          <div className="mt-8 b-top pt-8 max-w-3xl">
            <p className="text-xl md:text-2xl font-medium leading-relaxed display-font text-gray-700">
              Transparent, competitive investment plans tailored for startups and established enterprises. Choose a cycle that fits your project timeline.
            </p>
          </div>
        </div>
      </section>

      <Marquee text="QUALITY × RELIABILITY × TRANSPARENCY —" dark={true} />

      {/* Pricing Grid Section */}
      <section className="py-24 bg-white border-t border-black/10 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Billing Toggle - Positioned above cards */}
          <div className="mb-16 flex justify-center">
            <div className="bg-black/5 p-1 rounded-full border border-black/[0.03] flex items-center ring-1 ring-black/[0.02]">
              <div className="relative flex items-center">
                <motion.div 
                  className="absolute h-full bg-[#111111] rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.1)] z-0"
                  animate={{ 
                    x: isLongTerm ? 110 : 0,
                    width: isLongTerm ? 130 : 110
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
                <button 
                  onClick={() => setIsLongTerm(false)}
                  className={`relative z-10 w-[110px] py-2.5 text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${!isLongTerm ? 'text-white' : 'text-black/40 hover:text-black/60'}`}
                >
                  Monthly
                </button>
                <button 
                  onClick={() => setIsLongTerm(true)}
                  className={`relative z-10 w-[130px] py-2.5 text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2 ${isLongTerm ? 'text-white' : 'text-black/40 hover:text-black/60'}`}
                >
                  Annually 
                  <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold ${isLongTerm ? 'bg-[#D4FF3F] text-black' : 'bg-black/10 text-black/40'}`}>-10%</span>
                </button>
              </div>
            </div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
          >
            {plans.map((plan, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className={`flex flex-col bg-[#FAF9F6] border border-black/[0.05] p-8 transition-shadow duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] group relative overflow-hidden ${plan.featured ? 'ring-2 ring-black' : ''}`}
              >
                {plan.featured && (
                  <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 bg-[#D4FF3F] text-black text-[9px] font-black py-1 px-10 translate-x-[30%] translate-y-[100%] rotate-45 uppercase tracking-widest text-center">
                      Optimal
                    </div>
                  </div>
                )}
                
                <h3 className="text-xl font-bold tracking-tight text-[#111111] mb-6">{plan.title}</h3>
                
                <div className="mb-10 min-h-[72px] flex flex-col justify-end">
                  <AnimatePresence mode="wait">
                    {plan.price ? (
                      <motion.div 
                        key={isLongTerm ? 'long' : 'one'}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col items-baseline"
                      >
                        <span className="text-[10px] font-black text-black/20 uppercase tracking-[0.2em] mb-3">Starts From</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-black text-[#111111] tracking-tighter">
                            ${isLongTerm ? (plan.price * 0.9).toFixed(0) : plan.price}
                          </span>
                          <span className="text-[10px] font-bold text-black/30 uppercase tracking-widest">USD</span>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-black/20 uppercase tracking-[0.2em] mb-3">Custom Scope</span>
                        <span className="text-xl font-black text-[#111111] uppercase">Custom Quote</span>
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                <p className="text-[12px] text-gray-500 leading-relaxed mb-10 border-t border-black/[0.03] pt-8 min-h-[72px]">
                  {plan.desc}
                </p>
                
                <ul className="space-y-3 mb-12 flex-1">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="text-[11px] text-gray-600 font-medium flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: `${fi * 50}ms` }}>
                      <div className={`w-1 h-1 rounded-full ${plan.featured ? 'bg-[#D4FF3F]' : 'bg-black/20'}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link 
                  to={plan.title === 'VPS Hosting' ? "/vps" : "/contact"} 
                  className={`block text-center py-4 text-[10px] font-black uppercase tracking-widest transition-all duration-300 border border-black relative overflow-hidden active:scale-95 ${plan.featured 
                    ? 'bg-black text-white hover:bg-gray-800' 
                    : 'bg-transparent text-black hover:bg-black hover:text-white'}`}
                >
                  <span className="relative z-10">{plan.price ? 'Get Started' : 'Consult Us'}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA Unified with Services Style */}
      <section className="py-24 bg-[#F4F4F0] border-t border-black/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold display-font tracking-tighter mb-8 text-[#111111] uppercase">Need something custom?</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">Contact us to discuss your specific requirements and we'll tailor a solution that fits your business perfectly.</p>
          <Link to="/contact" className="inline-block bg-black text-[#F4F4F0] px-8 py-4 uppercase text-sm tracking-widest font-bold hover:bg-gray-800 transition-colors">
            Let's Talk →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
