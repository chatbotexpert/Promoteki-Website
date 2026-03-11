import { Link } from 'react-router-dom';
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
          <p className="text-sm md:text-base uppercase tracking-widest mb-4 font-medium text-gray-500">The Promoteki Kulture — 01</p>
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
      {/* Principles Section - Professional Minimal */}
      <section className="py-40 px-6 relative bg-white">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          className="absolute top-0 left-0 w-full h-[1px] bg-black/5 origin-left"
        />
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <p className="text-xs uppercase tracking-[0.4em] mb-6 font-bold text-black/30">Company — 02</p>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase display-font leading-none">Core Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24">
            {coreValues.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: i * 0.15, ease: [0.215, 0.61, 0.355, 1] }}
                className="flex flex-col relative group"
              >
                <div className="flex items-center gap-4 mb-8 overflow-hidden">
                  <span className="text-xs font-mono text-black/20 group-hover:text-black transition-colors duration-500">0{i + 1}</span>
                  <div className="h-[1px] w-8 bg-black/10 group-hover:w-16 group-hover:bg-black transition-all duration-700" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight display-font mb-6 leading-[1.1]">{value.title}</h3>
                <p className="text-sm md:text-base text-black/50 leading-relaxed font-medium max-w-sm">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Clean Data-Grid */}
      <section className="py-40 px-6 bg-[#F4F4F0] relative">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          className="absolute top-0 left-0 w-full h-[1px] bg-black/5 origin-left"
        />
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <p className="text-xs uppercase tracking-[0.4em] mb-6 font-bold text-black/30">Our People — 03</p>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase display-font leading-none">The Team</h2>
              <p className="text-sm md:text-base text-black/40 font-medium max-w-xs mb-2">
                Unified by a shared vision of precision-engineered excellence.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-black/5">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: i * 0.05 }}
                className="group border-b border-r border-black/5 p-10 flex flex-col justify-between aspect-square hover:bg-white transition-colors duration-500"
              >
                <div className="text-[10px] font-bold uppercase tracking-widest text-black/20 group-hover:text-black transition-colors">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tighter display-font mb-1 group-hover:translate-x-1 transition-transform duration-500">{member.name}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 group-hover:translate-x-1 transition-transform duration-500 delay-75">{member.role}</p>
                </div>
              </motion.div>
            ))}
            {/* Minimalist filler to maintain grid rhythm */}
            <div className="border-b border-black/5 p-10 hidden lg:flex flex-col justify-center items-center opacity-5">
              <span className="text-[4vw] font-bold display-font select-none">P</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-48 px-6 flex flex-col items-center justify-center text-center bg-white border-t border-black/5">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="text-4xl md:text-7xl font-bold display-font uppercase tracking-tight mb-16 max-w-5xl leading-none"
        >
          Building for the <span className="text-black italic">exponential era.</span>
        </motion.h2>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group">
          <Link
            to="/contact"
            className="px-16 py-6 bg-black text-[#D4FF3F] text-xs uppercase font-bold tracking-[0.3em] hover:bg-[#D4FF3F] hover:text-black transition-all duration-500 inline-block"
          >
            Start your project
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
