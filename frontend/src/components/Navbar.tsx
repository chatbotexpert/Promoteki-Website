import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services', hasDropdown: true },
  { to: '/about', label: 'About Us' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/blog', label: 'Blog' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      // Small threshold for earlier, smoother transition
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Berlin', // Munich, DE
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setCurrentTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Spring transition config for that "creamy" feel
  const springConfig = { type: "spring", stiffness: 200, damping: 25, mass: 1 } as const;

  return (
    <>
      <div className="fixed top-6 left-0 w-full z-[100] flex justify-center px-4 pointer-events-none">
        <motion.nav
          layout
          initial={false}
          animate={{ 
            maxWidth: isScrolled ? 640 : 1200,
            paddingLeft: isScrolled ? "12px" : "16px",
            paddingRight: isScrolled ? "12px" : "16px",
            gap: isScrolled ? "12px" : "24px"
          }}
          transition={springConfig}
          className="flex items-center justify-between w-full bg-[#111111]/60 backdrop-blur-3xl border border-white/5 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden py-2 pointer-events-auto mx-auto"
        >
          {/* Logo Section */}
          <motion.div layout className="flex items-center">
            <Link to="/" className="flex items-center gap-2.5 relative z-10 group flex-shrink-0">
              <motion.div
                layout
                whileHover={{ rotate: 90, scale: 1.1, boxShadow: "0 0 20px rgba(212, 255, 63, 0.4)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shadow-inner relative border border-white/20 flex-shrink-0"
                style={{
                  background: "radial-gradient(circle at center, #D4FF3F, #A3D900)",
                  boxShadow: "inset 0 2px 4px rgba(255, 255, 255, 0.3), 0 0 10px rgba(212, 255, 63, 0.2)"
                }}
              >
                <motion.span 
                  layout
                  className="text-black font-black text-xl leading-none pt-0.5 select-none"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  P
                </motion.span>
              </motion.div>
              
              <div className="overflow-hidden flex items-center">
                <AnimatePresence>
                  {!isScrolled && (
                    <motion.span
                      layout
                      initial={{ opacity: 0, width: 0, x: -10 }}
                      animate={{ opacity: 1, width: "auto", x: 0 }}
                      exit={{ opacity: 0, width: 0, x: -10 }}
                      transition={{ 
                        opacity: { duration: 0.2 },
                        width: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                      }}
                      className="text-white font-black text-xs sm:text-lg tracking-tighter whitespace-nowrap pr-2 block"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      PROMOTEKI
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Links (Shrinking layout) */}
          <motion.div
            layout
            className="hidden md:flex items-center gap-0.5 relative py-1"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onMouseEnter={() => setHoveredLink(link.to)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative px-3.5 py-2 text-white/70 hover:text-white text-[13px] font-medium transition-colors duration-300 flex items-center gap-1.5 z-10 whitespace-nowrap"
              >
                {link.label}
                {link.hasDropdown && (
                  <motion.div
                    animate={{ rotate: hoveredLink === link.to ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={13} className="opacity-40" />
                  </motion.div>
                )}

                {hoveredLink === link.to && (
                  <motion.div
                    layoutId="nav-pill-bg"
                    className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                  />
                )}
              </Link>
            ))}
          </motion.div>

          {/* Action Area */}
          <div className="flex items-center gap-2 z-10 flex-shrink-0 pr-1">
            <AnimatePresence mode="popLayout">
            </AnimatePresence>

            <motion.div
              layout
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative hidden sm:block flex-shrink-0"
            >
              <Link
                to="/contact"
                className="px-5 py-2 bg-white text-black text-[12px] font-bold rounded-full transition-all duration-300 shadow-lg border border-white/5 whitespace-nowrap inline-flex justify-center min-w-[80px] flex-shrink-0"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isScrolled ? 'min' : 'full'}
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -5, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isScrolled ? 'Hire' : 'Get a Quote'}
                  </motion.span>
                </AnimatePresence>
              </Link>
            </motion.div>

            <button
              className="md:hidden w-10 h-10 flex items-center justify-center text-white bg-white/10 rounded-full"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 z-[200] bg-[#0a0a0a]/80 backdrop-blur-2xl flex flex-col pt-24 px-0 overflow-hidden"
          >
            {/* Minimal Header */}
            <div className="px-8 pb-8 border-b border-white/5 flex justify-between items-center relative z-10">
              <span className="text-white/20 font-mono text-[10px] uppercase tracking-[0.3em]">Navigation Menu</span>
              <button
                className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors border border-white/10 rounded-full"
                onClick={() => setMobileOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col relative z-10 px-8 py-4 overflow-y-auto">
              {navLinks.map((link, i) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group relative py-5 border-b border-white/5 flex items-center justify-between"
                >
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (i * 0.05) }}
                    className="display-font text-2xl font-bold text-white uppercase tracking-tight group-hover:text-[#D4FF3F] transition-colors"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {link.label}
                  </motion.span>
                  <ChevronDown size={16} className="text-white/10 -rotate-90 group-hover:text-[#D4FF3F] transition-colors" />
                </Link>
              ))}

              {/* Clean Professional CTA - Moved under Blog */}
              <div className="py-8">
                <Link
                  to="/contact"
                  className="group/cta w-full py-5 bg-[#D4FF3F] text-black text-center text-base font-black uppercase tracking-widest flex items-center justify-center gap-3 border border-[#D4FF3F] hover:bg-transparent hover:text-[#D4FF3F] transition-all duration-300"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Let's Talk
                  <ArrowRight size={18} className="translate-x-0 group-hover/cta:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="pt-4 pb-8 flex justify-between items-center text-[9px] text-white/20 uppercase tracking-widest font-mono border-t border-white/5">
                <span>©2026 Promoteki</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
