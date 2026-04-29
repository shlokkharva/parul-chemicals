'use client'
import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { TIMELINE, STATS, PHILOSOPHY, CORE_PILLARS, EXPORT_COUNTRIES } from '@/lib/data'
import PageHero from '@/components/PageHero'

export default function AboutPage() {
  const lineRef = useRef<HTMLDivElement>(null)
  
  // Mouse tracking for 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for tilt
  const springConfig = { damping: 25, stiffness: 150 }
  const rotateX = useSpring(useTransform(mouseY, [0, 1000], [5, -5]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [0, 1500], [-5, 5]), springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && lineRef.current) lineRef.current.classList.add('drawn')
    }, { threshold: 0.1 })
    if (lineRef.current) observer.observe(lineRef.current)
    return () => observer.disconnect()
  }, [])

  const processedTimeline = []
  for (let i = 0; i < TIMELINE.length; i += 3) {
    processedTimeline.push(TIMELINE.slice(i, i + 3))
  }

  return (
    <div onMouseMove={handleMouseMove} className="perspective-1000">
      <PageHero 
        tag="ABOUT PARUL CHEMICALS" 
        title={<>Our Story of <span className="text-[#4DA8DA]">Chemical Excellence</span></>} 
        subtitle="Global Innovative Solutions Provider committed to reaching new heights through excellence and cutting-edge technology." 
      />

      {/* Philosophy Section */}
      <section className="py-24 bg-gradient-to-br from-white to-[#F0F9FF] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none dot-pattern" />
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] accent-blue-blob opacity-40 pointer-events-none" />
        
        {/* Abstract Orbital Design - INTERACTIVE 3D TILT */}
        <motion.div 
          style={{ rotateX, rotateY, perspective: 1000 }}
          animate={{ rotate: 360 }}
          transition={{ rotate: { duration: 40, repeat: Infinity, ease: "linear" } }}
          className="absolute -right-20 top-20 w-96 h-96 opacity-[0.35] pointer-events-none hidden lg:block drop-shadow-2xl"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="100" cy="100" r="80" fill="none" stroke="#4DA8DA" strokeWidth="1.2" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="50" fill="none" stroke="#4DA8DA" strokeWidth="1.2" strokeDasharray="2 2" />
            <circle cx="100" cy="20" r="4" fill="#4DA8DA" />
            <circle cx="150" cy="100" r="3" fill="#4DA8DA" />
            <circle cx="50" cy="100" r="2.5" fill="#4DA8DA" />
          </svg>
        </motion.div>

        {/* Interactive Chemical Particles (Mini 3D Elements) */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 0.2, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 4, opacity: 0.7, backgroundColor: '#4DA8DA', filter: 'blur(3px)', z: 50 }}
            className="absolute w-1.5 h-1.5 rounded-full border border-[#4DA8DA] pointer-events-auto cursor-none hidden lg:block"
            style={{ 
              top: `${(i * 13) % 80 + 10}%`, 
              left: `${(i * 17) % 80 + 10}%`,
              transition: 'background-color 0.3s ease, filter 0.3s ease'
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[#4DA8DA] font-black tracking-widest text-[10px] uppercase mb-4">Our Foundations</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-[#0F1C33] leading-tight">Driven by a Clear <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA8DA] to-[#0EA5A0]">Vision & Philosophy</span></motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Mission', content: PHILOSOPHY.mission, color: '#4DA8DA' },
              { title: 'Vision', content: PHILOSOPHY.vision, color: '#0EA5A0' },
              { title: 'Goal', content: PHILOSOPHY.goal, color: '#1F4E79' },
            ].map((p, i) => (
              <motion.div 
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, rotateX: 2, rotateY: 2 }}
                className="group p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_4px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 relative overflow-hidden"
              >
                <div className="w-12 h-1 bg-gradient-to-r mb-8" style={{ backgroundImage: `linear-gradient(to right, ${p.color}, transparent)` }} />
                <h3 className="text-2xl font-bold text-[#0F1C33] mb-4 uppercase tracking-tighter">{p.title}</h3>
                <p className="text-[#4A5568] leading-relaxed text-sm font-medium">{p.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Pillars Section */}
      <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
        {/* Hexagonal chemical grid background */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none chemical-grid" />
        <div className="absolute -left-20 bottom-10 w-[400px] h-[400px] accent-teal-blob opacity-30 pointer-events-none" />

        {/* Abstract Structural Lattice - INTERACTIVE 3D TILT */}
        <motion.div 
          style={{ rotateX: rotateY, rotateY: rotateX, perspective: 1000 }} // Contrasting tilt
          animate={{ rotate: -360 }}
          transition={{ rotate: { duration: 50, repeat: Infinity, ease: "linear" } }}
          className="absolute -left-10 bottom-20 w-80 h-80 opacity-[0.35] pointer-events-none hidden lg:block drop-shadow-2xl"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path d="M100 20 L170 60 L170 140 L100 180 L30 140 L30 60 Z" fill="none" stroke="#0EA5A0" strokeWidth="1.2" />
            <circle cx="100" cy="100" r="40" fill="none" stroke="#0EA5A0" strokeWidth="1.2" strokeDasharray="3 3" />
            <circle cx="100" cy="20" r="5" fill="none" stroke="#0EA5A0" strokeWidth="1.5" />
            <circle cx="170" cy="140" r="5" fill="none" stroke="#0EA5A0" strokeWidth="1.5" />
            <circle cx="30" cy="140" r="5" fill="none" stroke="#0EA5A0" strokeWidth="1.5" />
          </svg>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center mb-16">
            <div className="lg:w-1/2">
              <p className="text-[#4DA8DA] font-black tracking-widest text-[10px] uppercase mb-4">Technical Advantage</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F1C33] mb-6">Expertise and Innovation<br/>At Every Level</h2>
              <p className="text-[#4A5568] leading-relaxed">Parul Chemicals is a Global Innovative Solutions Provider. We are inspired by the opportunity to add value through our commitment to excellence and cutting-edge technology, ensuring we remain at the forefront of the industries we serve.</p>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4 w-full">
              {STATS.map((stat, i) => (
                <div key={i} className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <p className="text-2xl font-black text-[#4DA8DA] mb-1">{stat.val}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_PILLARS.map((pillar, i) => (
              <motion.div 
                key={pillar.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-8 bg-white/60 backdrop-blur-md rounded-[2rem] border border-white hover:border-[#4DA8DA]/30 hover:bg-white transition-all duration-300 group"
              >
                <h3 className="text-lg font-bold text-[#0F1C33] mb-3">{pillar.title}</h3>
                <p className="text-xs text-[#4A5568] leading-relaxed font-medium">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Footprint Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%">
            <pattern id="world-dots" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#4DA8DA" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#world-dots)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <p className="section-tag mb-4">GLOBAL REACH</p>
                <h2 className="text-3xl md:text-5xl font-bold text-[#0F1C33] leading-tight mb-6">
                  Serving Industries <br/>
                  <span className="text-[#4DA8DA]">Across the Globe</span>
                </h2>
                <p className="text-[#4A5568] leading-relaxed mb-8 max-w-xl">
                  Parul Chemicals has established a strong international presence, delivering high-purity Triethyl Citrate and Diethyl Phthalate to diverse markets. Our commitment to quality and regulatory compliance (USP/FCC/REACH) has made us a trusted partner for global manufacturers.
                </p>
                <div className="inline-flex items-center gap-4 p-4 rounded-3xl bg-[#F0F9FF] border border-[#4DA8DA]/20">
                  <div className="w-12 h-12 rounded-2xl bg-[#4DA8DA] flex items-center justify-center text-white shadow-lg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0F1C33]">Trusted Supplier</p>
                    <p className="text-xs text-[#4A5568]">Reach out to us now for global inquiries!</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {EXPORT_COUNTRIES.map((country, i) => (
                  <motion.div
                    key={country.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -5, borderColor: '#4DA8DA' }}
                    className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-3 group-hover:bg-[#4DA8DA]/10 transition-colors">
                      <img 
                        src={`https://flagcdn.com/w80/${country.code.toLowerCase()}.png`} 
                        alt={country.name}
                        className="w-8 h-auto rounded shadow-sm"
                      />
                    </div>
                    <p className="text-xs font-bold text-[#0F1C33] group-hover:text-[#4DA8DA] transition-colors">{country.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline - S-Type Snake */}
      <section className="pt-16 pb-48 bg-white relative overflow-hidden">
        {/* Topographic chemical connector lines background */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none topo-pattern" />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#F8FAFC] to-transparent" />

        <div className="max-w-7xl mx-auto px-6 mb-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <p className="section-tag mb-2">OUR EVOLUTION</p>
            <h2 className="font-display text-4xl font-bold text-[#0F1C33]">The Journey of 15+ Years</h2>
            <p className="text-slate-400 text-sm mt-3">Exploring our history from 2009 to the future vision of 2025</p>
          </motion.div>
        </div>

        <div className="relative w-full max-w-5xl mx-auto overflow-visible px-4 md:px-0" style={{ minHeight: '600px' }}>
          {/* Mobile View Timeline — Visible only on sm/md screens */}
          <div className="md:hidden flex flex-col gap-12 relative z-10 pb-12">
            {/* Vertical Line */}
            <div className="absolute left-[20px] top-4 bottom-0 w-[3px] bg-slate-100 rounded-full" />
            
            {TIMELINE.map((item, i) => {
              const color = ['#4DA8DA', '#0EA5A0', '#6366f1', '#8b5cf6', '#f59e0b'][i % 5]
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-6 items-start relative"
                >
                  <div 
                    className="w-10 h-10 rounded-full bg-white border-[6px] shadow-lg flex items-center justify-center z-20 shrink-0"
                    style={{ borderColor: color }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                  </div>
                  <div 
                    className="flex-1 bg-white p-6 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border-t-[5px]"
                    style={{ borderTopColor: color, borderLeft: '1px solid #f1f5f9', borderRight: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}
                  >
                    <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-black tracking-widest text-white mb-3" style={{ backgroundColor: color }}>
                      {item.year}
                    </div>
                    <h3 className="text-lg font-bold text-[#0F1C33] mb-2 leading-tight">{item.title}</h3>
                    <p className="text-xs text-[#4A5568] leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Desktop View Timeline — Snake Zig-Zag — Hidden on mobile */}
          <div className="hidden md:block relative w-full h-full" style={{ aspectRatio: '1.2 / 1', minHeight: '800px' }}>
            {/* SVG Snake Path - 3 Column Zig Zag */}
            <svg 
              className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible" 
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="snakeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4DA8DA" />
                  <stop offset="50%" stopColor="#0EA5A0" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
              <motion.path
                d={`
                  M 166 150 L 833 150 
                  A 175 175 0 0 1 833 500 L 166 500 
                  A 175 175 0 0 0 166 850 L 833 850
                `}
                fill="none"
                stroke="url(#snakeGradient)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="12 12"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 4, ease: "easeInOut" }}
              />
            </svg>

            {/* Timeline Milestones - 3 Col Percentage Locked */}
            {TIMELINE.map((item, i) => {
              const row = Math.floor(i / 3)
              const colInRow = i % 3
              const isReverse = row % 2 !== 0
              const col = isReverse ? (2 - colInRow) : colInRow
              
              const xPercent = 16.66 + (col * 33.33)
              const yPercent = 15 + (row * 35)
              
              const color = ['#4DA8DA', '#0EA5A0', '#6366f1', '#8b5cf6', '#f59e0b'][i % 5]

              return (
                <div 
                  key={item.year}
                  className="absolute group z-20"
                  style={{ 
                    left: `${xPercent}%`,
                    top: `${yPercent}%`,
                    transform: 'translateX(-50%)' 
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 3) * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    {/* Node on Path */}
                    <div 
                      className="w-10 h-10 rounded-full bg-white border-[6px] shadow-lg flex items-center justify-center transition-transform group-hover:scale-125 translate-y-[-50%]"
                      style={{ borderColor: color }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                    </div>

                    {/* Content Card */}
                    <div 
                      className="w-[200px] md:w-[260px] text-center p-6 bg-white rounded-3xl shadow-[0_4px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 border-t-4 mt-2"
                      style={{ borderTopColor: color, borderLeft: '1px solid #f1f5f9', borderRight: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}
                    >
                      <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-black tracking-widest text-white mb-3" style={{ backgroundColor: color }}>
                        {item.year}
                      </div>
                      <h3 className="text-base font-bold text-[#0F1C33] mb-2 leading-tight">{item.title}</h3>
                      <p className="text-[11px] text-[#4A5568] leading-relaxed font-medium line-clamp-4">{item.desc}</p>
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
