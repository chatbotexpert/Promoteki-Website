import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Work', hasDropdown: true },
  { to: '/about', label: 'About Us' },
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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Spring transition config for that "creamy" feel
  const springConfig = { type: "spring", stiffness: 260, damping: 30, mass: 1 } as const;

  return (
    <>
      <div className="fixed top-6 left-0 w-full z-[100] flex justify-center px-4 pointer-events-none">
        <motion.nav
          initial={false}
          animate={{
            maxWidth: isScrolled ? "540px" : "940px",
            // Padding-X also shifts to help the circular feel
            paddingLeft: isScrolled ? "10px" : "16px",
            paddingRight: isScrolled ? "10px" : "16px",
            gap: isScrolled ? "8px" : "24px"
          }}
          transition={springConfig}
          className="flex items-center justify-between w-full bg-[#111111]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden py-2 pointer-events-auto"
        >
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2.5 relative z-10 group flex-shrink-0">
            <motion.div
              whileHover={{ rotate: 90, scale: 1.1, boxShadow: "0 0 20px rgba(212, 255, 63, 0.4)" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shadow-inner relative border border-white/20"
              style={{
                background: "radial-gradient(circle at center, #D4FF3F, #A3D900)",
                boxShadow: "inset 0 2px 4px rgba(255, 255, 255, 0.3), 0 0 10px rgba(212, 255, 63, 0.2)"
              }}
            >
              <span
                className="text-black font-black text-xl leading-none pt-0.5 select-none"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                P
              </span>
            </motion.div>

            <AnimatePresence mode="popLayout">
              {!isScrolled && (
                <motion.span
                  key="logo-text"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-white font-black text-sm sm:text-lg tracking-tighter block"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  PROMOTEKI
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

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
          <div className="flex items-center gap-2 z-10 flex-shrink-0">
            <AnimatePresence mode="popLayout">
              {!isScrolled && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="hidden lg:block truncate"
                >
                  <Link to="/pricing" className="text-white/60 hover:text-white text-[13px] font-medium px-3 transition-colors">
                    Pricing
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              layout
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative"
            >
              <Link
                to="/contact"
                className="px-6 py-2.5 bg-white text-black text-[13px] font-bold rounded-full transition-all duration-300 shadow-lg border border-white/5 whitespace-nowrap inline-flex justify-center min-w-[100px]"
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
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-[#111111] flex flex-col pt-32 px-0"
          >
            {/* Header / Info bar */}
            <div className="px-8 pb-8 border-b border-white/10 flex justify-between items-end">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2"> Menu</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#D4FF3F] animate-pulse" />
                  <span className="text-white font-bold text-xs">Promoteki</span>
                </div>
              </div>
              <button
                className="text-white/50 hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col flex-grow">
              {navLinks.map((link, i) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group relative px-8 py-8 border-b border-white/10 flex items-center justify-between"
                >
                  <motion.span
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + (i * 0.05) }}
                    className="display-font text-4xl font-black text-white uppercase tracking-tighter group-hover:text-[#D4FF3F] transition-colors"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {link.label}
                  </motion.span>
                  <span className="text-white/20 group-hover:text-[#D4FF3F] transition-colors text-sm font-mono">
                    0{i + 1}
                  </span>
                </Link>
              ))}

              <div className="p-8 mt-auto border-t border-white/10 bg-white/[0.02]">
                <Link
                  to="/contact"
                  className="w-full py-6 bg-[#D4FF3F] text-black text-center text-xl font-black uppercase tracking-tighter flex items-center justify-center gap-3 border-2 border-[#D4FF3F] hover:bg-transparent hover:text-[#D4FF3F] transition-all duration-300"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Let's Chat
                  <div className="w-2 h-2 bg-black group-hover:bg-[#D4FF3F]" />
                </Link>
                <div className="flex justify-between items-center mt-6 text-[10px] text-white/20 uppercase tracking-widest font-mono">
                  <span>©2026 PROMOTEKI</span>
                  <span>EST. MULTAN, PK</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
