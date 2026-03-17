import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <>
      {/* Giant CTA */}
      <section className="pt-32 pb-16 px-6 bg-black text-[#F4F4F0] flex flex-col items-center justify-center text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Bring Ideas To Life —</p>
        <motion.h2 
          className="text-4xl md:text-[8vw] leading-[1.1] md:leading-none font-bold display-font uppercase tracking-tighter mb-12 cursor-pointer select-none"
          initial="initial"
          whileHover="hover"
        >
          {["Ready to", "Start", "Today?"].map((line, lineIdx) => (
            <span key={lineIdx} className={`${lineIdx === 0 ? 'block' : 'block md:inline'} py-1`}>
              {line.split("").map((char, charIdx) => (
                <motion.span
                  key={charIdx}
                  className="inline-block text-white/70"
                  variants={{
                    initial: { y: 0, color: "rgba(255, 255, 255, 0.7)" },
                    hover: { 
                      y: -5, 
                      color: "#ffffff",
                      transition: { 
                        duration: 0.3,
                        ease: [0.215, 0.61, 0.355, 1], // cubic-bezier for smooth finish
                        delay: (lineIdx * 5 + charIdx) * 0.008
                      }
                    }
                  }}
                  transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h2>
        <a href="mailto:contact@promoteki.com" className="inline-block border border-[#F4F4F0] px-8 py-4 uppercase text-sm tracking-widest font-bold hover:bg-[#F4F4F0] hover:text-black transition-colors">
          Contact Now
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-12 px-6 text-sm b-top border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div>
              <h4 className="text-[#F4F4F0] uppercase font-bold mb-4">Navigate</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">Work</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Let's Chat</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#F4F4F0] uppercase font-bold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li><Link to="/contact" className="hover:text-white transition-colors">Get Started</Link></li>
                <li><a href="mailto:contact@promoteki.com" className="hover:text-white transition-colors">contact@promoteki.com</a></li>
                <li className="pt-2">+92 3090483683</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#F4F4F0] uppercase font-bold mb-4">Visit</h4>
              <p>Welfenstrasse 22<br/>81541 Munich<br/>Germany</p>
            </div>
            <div>
              <h4 className="text-[#F4F4F0] uppercase font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/terms-of-use" className="hover:text-white transition-colors">Terms of Use</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center b-top border-gray-800 pt-8">
            <div className="flex items-center gap-6">
              <p>© 2026 Promoteki. All Rights Reserved.</p>
              <Link to="/admin" className="text-[10px] font-bold uppercase tracking-widest text-gray-800 hover:text-white transition-colors">Admin Console</Link>
            </div>
            <button
              onClick={() => (window as any).lenis ? (window as any).lenis.scrollTo(0) : window.scrollTo(0, 0)}
              className="uppercase tracking-widest mt-4 md:mt-0 hover:text-white transition-colors cursor-pointer bg-transparent border-none text-gray-400 text-sm"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
