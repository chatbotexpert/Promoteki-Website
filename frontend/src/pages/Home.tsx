import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Marquee from '../components/Marquee';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  { num: '01', title: 'Web Development', desc: 'Modern, high-performance web applications built with the latest frameworks to drive conversions and user engagement.', image: '/images/web_dev.png' },
  { num: '02', title: 'CRM Solutions', desc: 'Custom CRM development and automation to streamline your customer relationships and business operations.', image: '/images/rpa_solutions.png' },
  { num: '03', title: 'API Integration', desc: 'Design and integrate secure, reliable APIs to connect your systems, third-party apps, and business tools seamlessly.', image: '/images/api_integration.png' },
  { num: '04', title: 'SaaS Development', desc: 'Build scalable and secure SaaS applications that can be easily deployed and scaled for growing user bases.', image: '/images/saas_dev.png' },
  { num: '05', title: 'Custom Bots', desc: 'Build intelligent bots for data scraping, reporting, and system integrations to save time and eliminate manual errors.', image: '/images/custom_bots.png' },
];

const ArrowIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const Home = () => {
  const [aiInput, setAiInput] = useState('');
  const [aiResult, setAiResult] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(false);
  const [pitchResult, setPitchResult] = useState('');
  const [pitchLoading, setPitchLoading] = useState(false);

  const [industryInput, setIndustryInput] = useState('');
  const [tailoredServices, setTailoredServices] = useState(null);
  const [industryLoading, setIndustryLoading] = useState(false);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const fetchGemini = async (payload) => {
    const apiKey = '';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    for (let i = 0; i < 5; i++) {
      try {
        const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text;
      } catch (e) {
        if (i === 4) throw e;
        await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)));
      }
    }
  };

  const handleGenerate = async () => {
    if (!aiInput.trim()) return;
    setAiLoading(true); setAiError(false); setAiResult(null); setPitchResult('');
    const payload = {
      contents: [{ parts: [{ text: `The user's manual task is: "${aiInput}"` }] }],
      systemInstruction: { parts: [{ text: "You are an expert automation architect for 'Promoteki'. Respond ONLY with valid JSON: {\"solutionName\": \"String\", \"description\": \"String (2-3 sentences)\", \"techStack\": [\"String\"], \"estimatedHoursSaved\": \"String (e.g. '15 HRS/WK')\"}" }] },
      generationConfig: { responseMimeType: "application/json", responseSchema: { type: "OBJECT", properties: { solutionName: { type: "STRING" }, description: { type: "STRING" }, techStack: { type: "ARRAY", items: { type: "STRING" } }, estimatedHoursSaved: { type: "STRING" } }, required: ["solutionName", "description", "techStack", "estimatedHoursSaved"] } }
    };
    try {
      const text = await fetchGemini(payload);
      setAiResult(JSON.parse(text));
    } catch { setAiError(true); }
    setAiLoading(false);
  };

  const handlePitch = async () => {
    if (!aiResult) return;
    setPitchLoading(true);
    const payload = {
      contents: [{ parts: [{ text: `Solution: ${aiResult.solutionName}\nDescription: ${aiResult.description}\nImpact: ${aiResult.estimatedHoursSaved}` }] }],
      systemInstruction: { parts: [{ text: "Write a 3-sentence email to a boss pitching this automation project. Tone: Brutalist, confident, ROI-focused. Plain text, no greetings." }] }
    };
    try { const pitch = await fetchGemini(payload); setPitchResult(pitch); } catch { setPitchResult('> ERROR: UNABLE TO SYNTHESIZE PITCH.'); }
    setPitchLoading(false);
  };

  const handleTailor = async () => {
    if (!industryInput.trim()) return;
    setIndustryLoading(true);
    const payload = {
      contents: [{ parts: [{ text: `Industry: ${industryInput}` }] }],
      systemInstruction: { parts: [{ text: "Adapt Promoteki's 5 services (Web Dev, RPA, API Integration, SaaS, Custom Bots) for this industry. Make titles specific and edgy. Output JSON." }] },
      generationConfig: { responseMimeType: "application/json", responseSchema: { type: "OBJECT", properties: { services: { type: "ARRAY", items: { type: "OBJECT", properties: { title: { type: "STRING" }, description: { type: "STRING" }, num: { type: "STRING" } }, required: ["title", "description", "num"] } } }, required: ["services"] } }
    };
    try { const text = await fetchGemini(payload); setTailoredServices(JSON.parse(text).services); } catch { console.error('Tailor failed'); }
    setIndustryLoading(false);
  };

  const displayServices = tailoredServices || services;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 min-h-[80vh] flex flex-col justify-end">
        <p className="text-sm md:text-base uppercase tracking-widest mb-4 font-medium max-w-xl">
          CRM Development and Automation.
        </p>
        <h1 className="text-[12vw] leading-[0.85] font-bold tracking-tighter uppercase display-font">
          Promoteki
        </h1>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 b-top pt-8">
          <div className="col-span-1 md:col-span-2">
            <p className="text-xl md:text-3xl font-medium leading-tight max-w-3xl display-font">
              Providing high-end CRM development and business automation. We transform customer workflows into seamless digital experiences.
            </p>
          </div>
          <div className="col-span-1 flex items-end justify-start md:justify-end">
            <p className="text-sm uppercase tracking-widest text-gray-500">Based in South Asia<br />Working Globally</p>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* About Section */}
      <section className="py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">About Promoteki</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tighter display-font text-[#111111]">
                Empowering brands to scale through automation™.
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pl-12 border-t lg:border-t-0 lg:border-l border-black/10 pt-8 lg:pt-0">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium mb-10">
                By combining strategy, development, and advanced RPA technology, we transform ideas into scalable business solutions. Our work blends technical precision with modern design to create bold outcomes that drive growth.
              </p>
              <div className="grid grid-cols-2 gap-8 border-t border-black/10 pt-10">
                <div>
                  <h4 className="text-4xl md:text-5xl font-bold display-font mb-2">150+</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Workflows Automated</p>
                </div>
                <div className="border-l border-black/10 pl-8">
                  <h4 className="text-4xl md:text-5xl font-bold display-font mb-2">99%</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Client Satisfaction</p>
                </div>
              </div>
              <Link to="/services" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-bold mt-12 b-bottom border-black pb-1 hover:pr-4 transition-all">
                Explore Our Services <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#F4F4F0] border-t border-black/10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Why Choose Us</p>
          <h2 className="text-4xl md:text-5xl font-bold display-font tracking-tighter mb-16 text-[#111111]">Built on precision.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Expert Engineers', desc: 'A dedicated team of senior developers and automation specialists who deliver with absolute precision.' },
              { title: 'Proven Track Record', desc: 'Successful launches across industries with measurable business outcomes and scalable architectures.' },
              { title: 'Automation-First', desc: 'We automate workflows to reduce manual effort, eliminate errors, and free your team to focus on growth.' },
            ].map((v, i) => (
              <div key={i} className="border-t border-black/10 pt-8">
                <span className="text-xs font-mono text-gray-400 mb-4 block">0{i + 1}</span>
                <h3 className="text-xl font-bold display-font mb-3 text-[#111111]">{v.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        className="pt-32 pb-24 bg-white border-t border-black/10 relative"
        onMouseMove={handleMouseMove}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-10">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-widest mb-4 text-gray-500">Our Services</p>
              <h2 className="text-4xl md:text-6xl font-bold display-font leading-tight text-[#111111]">Technical Solutions</h2>
            </div>
            {/* Industry Tailor */}
            <div className="w-full xl:w-auto bg-[#F4F4F0] p-6 border border-black/10">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 block">Contextualize for your industry:</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input type="text" value={industryInput} onChange={e => setIndustryInput(e.target.value)} placeholder="e.g. Healthcare, Real Estate..." className="bg-white border border-black/10 w-full sm:w-64 text-sm font-medium px-4 py-3 focus:outline-none focus:border-black transition-colors text-black" />
                <button onClick={handleTailor} disabled={industryLoading} className="bg-black text-[#F4F4F0] px-6 py-3 uppercase text-xs tracking-widest font-bold whitespace-nowrap hover:bg-gray-800 transition-colors disabled:opacity-50">
                  {industryLoading ? 'Working...' : '✨ Tailor'}
                </button>
              </div>
            </div>
          </div>

          {industryLoading && (
            <p className="text-xs font-mono text-gray-500 mb-8 animate-pulse">&gt; RECALIBRATING AGENCY SERVICES FOR DOMAIN...</p>
          )}

          <div className="border-t border-black/10 relative">
            {/* Floating Image Component */}
            <motion.div
              className="pointer-events-none fixed z-50 w-64 aspect-[4/5] overflow-hidden rounded-xl shadow-2xl hidden lg:block"
              style={{
                left: mousePos.x,
                top: mousePos.y,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                scale: hoveredIndex !== null ? 1 : 0,
                opacity: hoveredIndex !== null ? 1 : 0,
                rotate: hoveredIndex !== null ? 0 : 10,
              }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 20,
                mass: 0.5
              }}
            >
              <AnimatePresence mode="wait">
                {hoveredIndex !== null && (
                  <motion.img
                    key={hoveredIndex}
                    src={displayServices[hoveredIndex]?.image || services[hoveredIndex]?.image}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                  />
                )}
              </AnimatePresence>
            </motion.div>

            {displayServices.map((svc, i) => (
              <div 
                key={i} 
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group border-b border-black/10 py-8 min-[400px]:py-10 flex flex-col md:flex-row justify-between md:items-center gap-6 cursor-pointer hover:bg-[#F4F4F0] transition-colors px-6 -mx-6 relative z-10"
              >
                <div className="flex items-start gap-8">
                  <span className="text-sm font-mono text-gray-400 mt-2">{svc.num}</span>
                  <div>
                    <h3 className="text-2xl min-[400px]:text-3xl md:text-5xl font-bold display-font uppercase tracking-tighter mb-3 group-hover:pl-4 transition-all duration-300">{svc.title}</h3>
                    <p className="text-gray-600 max-w-xl group-hover:pl-4 transition-all duration-300 delay-75 text-sm md:text-base leading-relaxed">{svc.desc}</p>
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

      {/* AI Advisor */}
      <section className="py-24 px-6 bg-[#111111] text-[#F4F4F0]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/3">
              <div className="inline-block border border-[#F4F4F0]/30 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest mb-6">System.Gemini_API</div>
              <h2 className="text-4xl md:text-5xl font-bold display-font leading-tight mb-4 uppercase">Generate<br />Your Scope.</h2>
              <p className="text-gray-400 text-sm">Describe a manual task tying up your team. Our AI Architect will instantly output a technical blueprint to automate it.</p>
            </div>
            <div className="w-full md:w-2/3 flex flex-col justify-center">
              <div className="relative">
                <input type="text" value={aiInput} onChange={e => setAiInput(e.target.value)} placeholder="e.g. We manually copy invoice data from PDFs into Excel..." className="brutalist-input dark-mode w-full text-xl md:text-2xl font-medium" onKeyDown={e => e.key === 'Enter' && handleGenerate()} />
                <button onClick={handleGenerate} disabled={aiLoading} className="mt-8 bg-[#F4F4F0] text-[#111111] px-8 py-4 uppercase font-bold tracking-widest text-sm hover:bg-gray-300 transition-colors w-full md:w-auto disabled:opacity-50">
                  {aiLoading ? 'Analyzing...' : 'Execute Analysis ↵'}
                </button>
              </div>

              {(aiLoading || aiResult || aiError) && (
                <div className="mt-12 border border-[#F4F4F0]/20 p-6 md:p-8 bg-black font-mono text-sm relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F4F4F0]/50 to-transparent"></div>

                  {aiLoading && (
                    <div className="text-gray-500 animate-pulse">
                      &gt; INITIALIZING NEURAL UPLINK...<br />
                      &gt; ANALYZING WORKFLOW INEFFICIENCIES...<br />
                      &gt; COMPILING AUTOMATION BLUEPRINT...
                    </div>
                  )}

                  {aiError && <div className="text-red-500">&gt; ERROR: CONNECTION LOST. PLEASE RETRY COMMAND.</div>}

                  {aiResult && !aiLoading && (
                    <div>
                      <div className="mb-6 pb-6 border-b border-[#F4F4F0]/20">
                        <span className="text-xs text-gray-500 block mb-1">PROJECT_CODENAME:</span>
                        <h3 className="text-2xl text-white uppercase display-font">{aiResult.solutionName}</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                        <div>
                          <span className="text-xs text-gray-500 block mb-2">PROPOSED_ARCHITECTURE:</span>
                          <p className="text-gray-300 leading-relaxed">{aiResult.description}</p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 block mb-2">IMPACT_METRIC:</span>
                          <span className="bg-green-900 text-green-300 px-3 py-1 inline-block uppercase">SAVINGS: {aiResult.estimatedHoursSaved}</span>
                          <span className="text-xs text-gray-500 block mt-6 mb-2">TECH_STACK:</span>
                          <div className="flex flex-wrap gap-2">
                            {aiResult.techStack.map((t, i) => (
                              <span key={i} className="border border-[#F4F4F0]/30 text-[#F4F4F0] text-xs px-2 py-1">{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-8 pt-6 border-t border-[#F4F4F0]/20">
                        <button onClick={handlePitch} disabled={pitchLoading} className="bg-[#F4F4F0] text-[#111111] px-6 py-3 uppercase font-bold tracking-widest text-xs hover:bg-gray-300 transition-colors disabled:opacity-50">
                          {pitchLoading ? 'Synthesizing...' : '✨ DRAFT EXEC PITCH'}
                        </button>
                        {pitchLoading && <p className="mt-4 text-gray-500 animate-pulse text-xs font-mono">&gt; SYNTHESIZING C-LEVEL BUSINESS CASE...</p>}
                        {pitchResult && <div className="mt-4 bg-[#1a1a1a] border border-[#F4F4F0]/10 p-6 text-[#F4F4F0] font-mono text-sm leading-relaxed whitespace-pre-wrap">{pitchResult}</div>}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-24 px-6 b-bottom">
        <p className="text-xs font-bold uppercase tracking-widest mb-12">Selected Work —</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 max-w-7xl mx-auto">
          {[
            { title: 'Analytics Dashboard', tag: 'SaaS / Web App', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop' },
            { title: 'Social Media Aggregator', tag: 'Automation / Translator', img: '/images/social_media_aggregator.png', offset: true },
            { title: 'Invoice Automation Bot', tag: 'RPA Solution', img: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=800&auto=format&fit=crop' },
            { title: 'Hyper RSS', tag: 'Automation / Integration', img: '/images/hyper_rss.png', offset: true },
          ].map((work, i) => (
            <div key={i} className={`group cursor-pointer ${work.offset ? 'md:mt-24' : ''}`}>
              <div className="aspect-[4/3] bg-gray-200 overflow-hidden mb-6 relative">
                <img src={work.img} className="w-full h-full object-cover img-reveal" alt={work.title} loading="lazy" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold display-font uppercase mb-1 group-hover:underline">{work.title}</h3>
                  <p className="text-sm text-gray-500">{work.tag}</p>
                </div>
                <span className="text-xs uppercase border border-black rounded-full px-3 py-1">View</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
