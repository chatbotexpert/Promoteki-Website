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
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(30px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[200] bg-[#111111]/95 flex flex-col items-center justify-center p-6"
          >
            <motion.button
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-3 rounded-full border border-white/5 bg-white/5"
              onClick={() => setMobileOpen(false)}
            >
              <X size={28} />
            </motion.button>
            
            <div className="flex flex-col items-center gap-6">
              <motion.div
                initial={{ scale: 0, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-[#D4FF3F] flex items-center justify-center mb-6 shadow-2xl"
              >
                <span className="text-black font-black text-4xl pt-1">P</span>
              </motion.div>
              
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + (i * 0.1), ease: "easeOut" }}
                >
                  <Link
                    to={link.to}
                    className="display-font text-5xl font-bold text-white uppercase tracking-tighter hover:text-[#D4FF3F] transition-all"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
              >
                <Link 
                  to="/contact" 
                  className="mt-10 px-12 py-5 bg-[#D4FF3F] text-black text-xl font-extrabold rounded-full shadow-[0_20px_40px_rgba(212,255,63,0.2)]"
                >
                  Let's Chat
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
