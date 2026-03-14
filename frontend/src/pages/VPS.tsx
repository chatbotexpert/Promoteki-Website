import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Marquee from '../components/Marquee';
import { Check, Globe, Shield, Cpu, HardDrive, Database, Server, Info, ArrowRight, Lock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const REGIONS = [
  { name: 'European Union', details: 'EU Central Hub', price: 0, icon: '🇪🇺', category: 'Europe' },
  { name: 'United Kingdom', details: 'London / UK Hub', price: 2.50, icon: '🇬🇧', category: 'Europe' },
  { name: 'US Central', details: 'St. Louis / Dallas', price: 2.50, icon: '🇺🇸', category: 'America' },
  { name: 'US East', details: 'New York / Ashburn', price: 3.80, icon: '🇺🇸', category: 'America' },
  { name: 'US West', details: 'Seattle / Silicon Valley', price: 3.30, icon: '🇺🇸', category: 'America' },
  { name: 'Singapore', details: 'Southeast Asia Edge', price: 5.40, icon: '🇸🇬', category: 'Asia' },
  { name: 'Japan', details: 'Tokyo / East Asia', price: 5.50, icon: '🇯🇵', category: 'Asia' },
  { name: 'India', details: 'Mumbai / South Asia', price: 5.20, icon: '🇮🇳', category: 'Asia' },
  { name: 'Australia', details: 'Sydney / Oceania', price: 4.70, icon: '🇦🇺', category: 'Australia' }
];

const STORAGE_OPTIONS = {
  'NODE-1': [
    { name: '150 GB SSD', type: 'SSD', price: 0 },
    { name: '300 GB SSD', type: 'SSD', price: 3.95 },
    { name: '75 GB NVMe', type: 'NVMe', price: 0 },
    { name: '150 GB NVMe', type: 'NVMe', price: 4.30 },
  ],
  'ULTRA-K1': [
    { name: '200 GB SSD', type: 'SSD', price: 0 },
    { name: '400 GB SSD', type: 'SSD', price: 4.40 },
    { name: '100 GB NVMe', type: 'NVMe', price: 0 },
    { name: '200 GB NVMe', type: 'NVMe', price: 5.15 },
  ]
};

const OS_IMAGES = [
  { name: 'Ubuntu 24.04', category: 'Linux', price: 0 },
  { name: 'Debian 12', category: 'Linux', price: 0 },
  { name: 'Windows 2022', category: 'Windows', price: 15.00 },
  { name: 'AlmaLinux 9', category: 'RHEL', price: 0 }
];

const VPS = () => {
  const [selectedPlan, setSelectedPlan] = useState<'NODE-1' | 'ULTRA-K1' | null>(null);
  const [config, setConfig] = useState({
    region: REGIONS[0],
    os: OS_IMAGES[0],
    storage: STORAGE_OPTIONS['NODE-1'][0],
    backup: false,
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const basePrice = selectedPlan === 'NODE-1' ? 14.90 : 29.90;
  
  const totalPrice = useMemo(() => {
    let total = basePrice;
    total += config.region.price;
    total += config.os.price;
    total += config.storage.price;
    if (config.backup) total += (basePrice + config.region.price + config.os.price + config.storage.price) * 0.15;
    return total.toFixed(2);
  }, [selectedPlan, config, basePrice]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // GOOGLE FORM PRODUCTION CONFIGURATION
    const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScot4ocwuyzWRKUFj4fFlcEQWfyTQTFSfTiIMK2aUfEQYgqLA/formResponse";
    const ENTRIES = {
      plan: "entry.575806032",
      region: "entry.1326796563",
      storage: "entry.1018262713",
      os: "entry.367289834",
      backup: "entry.1199628179",
      email: "entry.382455517",
      password: "entry.322130732",
      price: "entry.539098954"
    };

    // Create a temporary form to submit to the hidden iframe
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = FORM_URL;
    form.target = 'hidden_iframe';

    const addField = (name: string, value: string) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    };

    addField(ENTRIES.plan, selectedPlan || '');
    addField(ENTRIES.region, config.region.name);
    addField(ENTRIES.storage, config.storage.name);
    addField(ENTRIES.os, config.os.name);
    addField(ENTRIES.backup, config.backup ? 'Yes' : 'No');
    addField(ENTRIES.email, config.email);
    addField(ENTRIES.password, config.password);
    addField(ENTRIES.price, totalPrice);

    document.body.appendChild(form);
    
    try {
      form.submit();
      // We wait for a brief moment confirm the submission process started
      setTimeout(() => {
        setSubmitted(true);
        setIsSubmitting(false);
        if (document.body.contains(form)) {
          document.body.removeChild(form);
        }
      }, 2000);
    } catch (error) {
      console.error("Submission failed:", error);
      setIsSubmitting(false);
      alert("Submission encountered an error. Please check your browser console.");
    }
  };

  const handlePlanSelect = (plan: 'NODE-1' | 'ULTRA-K1') => {
    setSelectedPlan(plan);
    setConfig(prev => ({
      ...prev,
      storage: STORAGE_OPTIONS[plan][0]
    }));
    setTimeout(() => {
      document.getElementById('config-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let pass = "";
    for (let i = 0; i < 16; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
    setConfig({...config, password: pass});
  };

  return (
    <div className="bg-[#F4F4F0] min-h-screen font-sans text-[#111111]">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 min-h-[60vh] flex flex-col justify-end">
        <div className="max-w-7xl mx-auto w-full">
          <p className="text-sm md:text-base uppercase tracking-widest mb-4 font-medium text-gray-500">Infrastructure / Scale</p>
          <h1 className="text-[10vw] md:text-[8vw] leading-[0.85] font-bold tracking-tighter uppercase display-font">
            VPS Forge
          </h1>
          <div className="mt-8 b-top pt-8 max-w-3xl">
            <p className="text-xl md:text-2xl font-medium leading-relaxed display-font text-gray-700">
              High-performance virtual engines. Select your core plan to begin the deployment sequence.
            </p>
          </div>
        </div>
      </section>

      <Marquee text="AUTOMATED DEPLOYMENT × ENTERPRISE CAPACITY × 99.9% UPTIME ×" dark={false} />

      {/* Plan Selection */}
      <section className="py-24 px-6 bg-white border-t border-black/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* NODE-1 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className={`relative border-2 p-10 flex flex-col transition-all duration-500 ${selectedPlan === 'NODE-1' ? 'border-black shadow-[20px_20px_0_0_#D4FF3F]' : 'border-black/5 hover:border-black'}`}
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter display-font mb-2">NODE-1</h3>
                  <p className="text-[10px] font-black text-black/40 uppercase tracking-[0.2em] leading-none">Standard substratum</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-black/20 line-through block leading-none">$19.90</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black tracking-tighter">$14.90</span>
                    <span className="text-[10px] font-bold opacity-30">/MO</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6 mb-12 flex-1 text-[#111111]/60">
                <div className="flex items-center gap-4 text-sm font-medium border-b border-black/5 pb-4">
                  <Cpu className="w-5 h-5 opacity-20" />
                  <span>4 vCPU CORES</span>
                </div>
                <div className="flex items-center gap-4 text-sm font-medium border-b border-black/5 pb-4">
                  <Database className="w-5 h-5 opacity-20" />
                  <span>8 GB RAM</span>
                </div>
                <div className="flex items-center gap-4 text-sm font-medium border-b border-black/5 pb-4">
                  <HardDrive className="w-5 h-5 opacity-20" />
                  <span>UP TO 300 GB SSD</span>
                </div>
                <div className="flex items-center gap-4 text-sm font-medium border-b border-black/5 pb-4">
                  <Shield className="w-5 h-5 opacity-20" />
                  <span>1 SNAPSHOT</span>
                </div>
                <div className="flex items-center gap-4 text-sm font-medium border-b border-black/5 pb-4">
                  <Server className="w-5 h-5 opacity-20" />
                  <span>200 MBIT/S PORT</span>
                </div>
              </div>

              <button 
                onClick={() => handlePlanSelect('NODE-1')}
                className={`w-full py-5 text-[10px] font-black uppercase tracking-widest transition-all ${selectedPlan === 'NODE-1' ? 'bg-[#D4FF3F] text-black' : 'bg-black text-white hover:bg-[#D4FF3F] hover:text-black'}`}
              >
                Configure NODE-1
              </button>
            </motion.div>

            {/* ULTRA-K1 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className={`relative border-2 p-10 flex flex-col transition-all duration-500 ${selectedPlan === 'ULTRA-K1' ? 'border-black shadow-[30px_30px_0_0_#111111] bg-white' : 'border-black/5 hover:border-black bg-white/50'}`}
            >
              <div className="absolute -top-5 right-8 bg-black text-[#D4FF3F] px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] ring-4 ring-[#D4FF3F]/20">PREMIUM NODAL</div>
              
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter display-font mb-2">ULTRA-K1</h3>
                  <p className="text-[10px] font-black text-[#D4FF3F] uppercase tracking-[0.2em] leading-none">Hyper-scale substrate</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-black/20 line-through block leading-none">$39.90</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black tracking-tighter">$29.90</span>
                    <span className="text-[10px] font-bold opacity-30">/MO</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6 mb-12 flex-1">
                <div className="flex items-center gap-4 text-sm font-black border-b border-black/10 pb-4">
                  <Cpu className="w-5 h-5 text-[#D4FF3F]" />
                  <span>6 vCPU CORES</span>
                </div>
                <div className="flex items-center gap-4 text-sm font-black border-b border-black/10 pb-4">
                  <Database className="w-5 h-5 text-[#D4FF3F]" />
                  <span>12 GB RAM</span>
                </div>
                <div className="flex items-center gap-4 text-sm font-black border-b border-black/10 pb-4">
                  <HardDrive className="w-5 h-5 text-[#D4FF3F]" />
                  <span>UP TO 400 GB NVME</span>
                </div>
                <div className="flex items-center gap-4 text-sm font-black border-b border-black/10 pb-4">
                  <Shield className="w-5 h-5 text-[#D4FF3F]" />
                  <span>PRIORITY BACKUPS</span>
                </div>
                <div className="flex items-center gap-4 text-sm font-black border-b border-black/10 pb-4">
                  <Server className="w-5 h-5 text-[#D4FF3F]" />
                  <span>10GBPS HYPER PORT</span>
                </div>
                <div className="flex items-center gap-4 text-sm font-black border-b border-black/10 pb-4">
                  <Check className="w-5 h-5 text-[#D4FF3F]" />
                  <span>24/7 PRIORITY SUPPORT</span>
                </div>
              </div>

              <button 
                onClick={() => handlePlanSelect('ULTRA-K1')}
                className={`w-full py-5 text-[10px] font-black uppercase tracking-widest transition-all ${selectedPlan === 'ULTRA-K1' ? 'bg-[#D4FF3F] text-black shadow-[0_10px_20px_rgba(212,255,63,0.3)]' : 'bg-black text-white hover:bg-[#D4FF3F] hover:text-black'}`}
              >
                PROVISION ULTRA-K1
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Configuration Section */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.section 
            id="config-section"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-24 px-6 border-t border-black/10 bg-[#F4F4F0]"
          >
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                
                {/* Options */}
                <div className="lg:col-span-8 space-y-20">
                  
                  {/* Regions */}
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <Globe className="w-5 h-5" />
                      <h4 className="text-2xl font-black uppercase tracking-tighter uppercase display-font">Select Region</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {REGIONS.map((r) => (
                        <button 
                          key={r.name}
                          onClick={() => setConfig({...config, region: r})}
                          className={`p-6 border-2 text-left transition-all flex flex-col justify-between ${config.region.name === r.name ? 'bg-black text-white border-black' : 'bg-white border-black/5 hover:border-black'}`}
                        >
                          <div className="mb-4">
                            <span className="text-xs font-black uppercase block mb-1">{r.icon} {r.name}</span>
                            <span className={`text-[10px] font-bold ${config.region.name === r.name ? 'text-white/40' : 'text-black/40'}`}>{r.details}</span>
                          </div>
                          <span className={`text-[10px] font-black ${r.price === 0 ? 'text-[#D4FF3F]' : ''}`}>{r.price === 0 ? 'FREE' : `+$${r.price.toFixed(2)}/mo`}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Storage selection */}
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <HardDrive className="w-5 h-5" />
                      <h4 className="text-2xl font-black uppercase tracking-tighter uppercase display-font">Storage Type</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {STORAGE_OPTIONS[selectedPlan].map((s) => (
                        <button 
                          key={s.name}
                          onClick={() => setConfig({...config, storage: s})}
                          className={`p-6 border-2 text-left transition-all flex flex-col justify-between ${config.storage.name === s.name ? 'bg-black text-white border-black' : 'bg-white border-black/5 hover:border-black'}`}
                        >
                          <div className="mb-4">
                            <span className="text-xs font-black uppercase block mb-1">{s.name}</span>
                            <span className={`text-[10px] font-bold ${config.storage.name === s.name ? 'text-white/40' : 'text-black/40'}`}>{s.type} Architecture</span>
                          </div>
                          <span className={`text-[10px] font-black ${s.price === 0 ? 'text-[#D4FF3F]' : ''}`}>{s.price === 0 ? 'FREE' : `+$${s.price.toFixed(2)}/mo`}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* OS Selection */}
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <Server className="w-5 h-5" />
                      <h4 className="text-2xl font-black uppercase tracking-tighter uppercase display-font">System Image</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {OS_IMAGES.map((os) => (
                        <button 
                          key={os.name}
                          onClick={() => setConfig({...config, os})}
                          className={`p-6 border-2 text-left transition-all flex justify-between items-center ${config.os.name === os.name ? 'bg-black text-white border-black' : 'bg-white border-black/5 hover:border-black'}`}
                        >
                          <div>
                            <span className="text-xs font-black uppercase block mb-1">{os.name}</span>
                            <span className={`text-[10px] font-bold ${config.os.name === os.name ? 'text-white/40' : 'text-black/40'}`}>{os.category} Architecture</span>
                          </div>
                          <span className={`text-[10px] font-black ${os.price === 0 ? 'text-[#D4FF3F]' : ''}`}>{os.price === 0 ? 'FREE' : `+$${os.price.toFixed(2)}/mo`}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Backup Toggle */}
                  <div className="bg-white border-2 border-black/5 p-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center">
                        <Shield className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-black uppercase tracking-tighter display-font mb-1">Automatic Backups</h4>
                        <p className="text-xs font-medium text-black/40">Protect your data with daily redundant snapshots.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-black uppercase ${!config.backup ? 'text-black' : 'text-black/20'}`}>Disabled</span>
                      <button 
                        onClick={() => setConfig({...config, backup: !config.backup})}
                        className={`w-16 h-8 rounded-full relative transition-colors duration-300 ${config.backup ? 'bg-[#D4FF3F]' : 'bg-black/10'}`}
                      >
                        <motion.div 
                          animate={{ x: config.backup ? 34 : 4 }}
                          className="absolute top-1 left-0 w-6 h-6 rounded-full bg-white shadow-sm"
                        />
                      </button>
                      <span className={`text-[10px] font-black uppercase ${config.backup ? 'text-black' : 'text-black/20'}`}>Enabled</span>
                    </div>
                  </div>

                  {/* Security Inputs */}
                  <div className="space-y-12">
                     <div className="flex items-center gap-3 mb-8">
                        <Lock className="w-5 h-5" />
                        <h4 className="text-2xl font-black uppercase tracking-tighter uppercase display-font">Access Credentials</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                          <div className="flex flex-col">
                              <label className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-4 flex items-center gap-2">
                                  <Mail className="w-3 h-3" /> Management Email
                              </label>
                              <input 
                                  type="email"
                                  placeholder="admin@example.com"
                                  value={config.email}
                                  onChange={(e) => setConfig({...config, email: e.target.value})}
                                  className="bg-transparent border-b-2 border-dashed border-black/20 py-4 text-xl font-bold focus:border-solid focus:border-black outline-none transition-all placeholder:opacity-20"
                              />
                          </div>
                          <div className="flex flex-col">
                              <label className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-4 flex items-center gap-2 justify-between">
                                  <span className="flex items-center gap-2"><Lock className="w-3 h-3" /> Root Password</span>
                                  <button onClick={generatePassword} className="text-[9px] hover:text-black transition-colors font-black underline decoration-accent decoration-2">Generate Secure</button>
                              </label>
                              <input 
                                  type="text"
                                  placeholder="••••••••••••••••"
                                  value={config.password}
                                  onChange={(e) => setConfig({...config, password: e.target.value})}
                                  className="bg-transparent border-b-2 border-dashed border-black/20 py-4 text-xl font-bold focus:border-solid focus:border-black outline-none transition-all placeholder:opacity-20"
                              />
                          </div>
                      </div>
                  </div>

                </div>

                {/* Sticky Summary */}
                <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit mb-24 lg:mb-0">
                  <div className="bg-black text-white p-10 relative overflow-hidden ring-1 ring-white/10">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#D4FF3F] translate-x-8 -translate-y-8 rotate-45" />
                    <h3 className="text-2xl font-black uppercase tracking-tighter display-font mb-10 border-b border-white/10 pb-6">Ledger</h3>
                    
                    <div className="space-y-6 mb-12">
                      <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Plan</span>
                        <span className="text-xs font-black uppercase">{selectedPlan}</span>
                      </div>
                      <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Region</span>
                        <span className="text-xs font-black uppercase">{config.region.name}</span>
                      </div>
                      <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Storage</span>
                        <span className="text-xs font-black uppercase">{config.storage.name}</span>
                      </div>
                      <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">System</span>
                        <span className="text-xs font-black uppercase">{config.os.name}</span>
                      </div>
                      <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Security</span>
                        <span className="text-xs font-black uppercase">{config.email && config.password ? 'Configured' : 'Incomplete'}</span>
                      </div>
                    </div>

                    <div className="pt-8 mb-10">
                      <span className="text-[10px] font-black text-[#D4FF3F] uppercase tracking-widest block mb-1">Deployment Investment</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black tracking-tighter">${totalPrice}</span>
                        <span className="text-[10px] font-black opacity-30 uppercase">USD / Mo</span>
                      </div>
                    </div>

                    <button 
                        onClick={handleSubmit}
                        disabled={!config.email || !config.password || isSubmitting}
                        className="w-full bg-[#D4FF3F] disabled:bg-white/10 disabled:text-white/20 text-black py-5 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          Forging...
                        </>
                      ) : (
                        <>Finalize Deployment <ArrowRight className="w-3 h-3" /></>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Success Overlay */}
            <AnimatePresence>
              {submitted && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-6"
                >
                  <div className="text-center max-w-xl">
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="w-24 h-24 bg-[#D4FF3F] rounded-full flex items-center justify-center mx-auto mb-12"
                    >
                      <Check className="w-12 h-12 text-black" />
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter display-font mb-6">
                      Engine Forged
                    </h2>
                    <p className="text-xl text-white/60 mb-12">
                      Your VPS configuration has been successfully recorded. Our team will finalize the deployment on the substratum shortly.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="border-2 border-white/20 text-white px-8 py-4 uppercase text-[10px] font-black tracking-widest hover:bg-white hover:text-black transition-all"
                    >
                      Return to Forge
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Hidden Iframe for Google Form Submission */}
      <iframe name="hidden_iframe" id="hidden_iframe" style={{ display: 'none' }}></iframe>
    </div>
  );
};

export default VPS;
