'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'

const FAQS = [
  {
    q: "What are the primary applications of Diethyl Phthalate (DEP)?",
    a: "Our pharma-grade DEP is primarily used as a solvent in fragrance fixatives, an incense stick binder, and as a specialized plasticizer in pharmaceutical coatings and cosmetic formulations."
  },
  {
    q: "Is your Triethyl Citrate (TEC) approved for food contact?",
    a: "Yes, our Triethyl Citrate is food-safe and manufactured to USP/BP/IP standards. It is widely used in food flavors, soft drinks, and pharmaceutical film coatings due to its non-toxic and biodegradable nature."
  },
  {
    q: "Which international quality certifications do you hold?",
    a: "Parul Chemicals is ISO 9001:2015, ISO 22000:2018 (Food Safety), ISO 45001:2018 (OH&S), and ISO 9235 certified. We also hold GMP, HACCP, and Kosher certifications for our key products."
  },
  {
    q: "Do you offer export services outside of India?",
    a: "Yes, we currently export to over 8 countries across multiple continents. We provide comprehensive export documentation, including TDS, COA, and MSDS for all international shipments."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  // Mouse tracking for 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for tilt
  const springConfig = { damping: 25, stiffness: 150 }
  const rotateX = useSpring(useTransform(mouseY, [0, 800], [4, -4]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [0, 1200], [-4, 4]), springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="py-28 bg-[#F8FAFC] relative overflow-hidden perspective-1000"
    >
      {/* Interactive 3D Decorative elements */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none dot-pattern" />
      <div className="absolute top-0 right-0 w-80 h-80 accent-blue-blob opacity-40 pointer-events-none" />

      {/* 3D Geometric Orbit Ornament (Left Bottom) */}
      <motion.div 
        style={{ rotateX, rotateY, perspective: 1000 }}
        className="absolute -bottom-20 -left-20 w-[450px] h-[450px] opacity-[0.15] pointer-events-none hidden lg:block"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#4DA8DA]">
          <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M100 15 L100 185 M15 100 L185 100" stroke="currentColor" strokeWidth="0.2" />
          <motion.circle 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            cx="100" cy="15" r="3" fill="currentColor"
            style={{ transformOrigin: '100px 100px' }}
          />
        </svg>
      </motion.div>

      {/* Reactive Micro-Nodes */}
      {[...Array(5)].map((_, i) => (
        <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.12 }}
            viewport={{ once: true }}
            whileHover={{ scale: 2.5, opacity: 0.3, backgroundColor: '#4DA8DA' }}
            className="absolute w-2 h-2 rounded-full border border-[#4DA8DA] pointer-events-auto cursor-none hidden lg:block"
            style={{ 
              top: `${(i * 22) % 60 + 20}%`, 
              right: `${(i * 28) % 60 + 10}%`,
              transition: 'all 0.4s ease'
            }}
          />
      ))}

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <div className="w-8 h-[2px] bg-[#4DA8DA] opacity-20" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#4DA8DA]">
              Resources & support
            </span>
            <div className="w-8 h-[2px] bg-[#4DA8DA] opacity-20" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-[#0F1C33] tracking-tight"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-[1.5rem] border transition-all duration-300 ${
                openIndex === i ? 'border-[#4DA8DA]/60 bg-white shadow-xl shadow-blue-500/5' : 'border-slate-200 bg-white/60 backdrop-blur-sm hover:border-[#4DA8DA]/40'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-8 py-7 flex items-center justify-between text-left"
              >
                <span className={`font-bold text-lg transition-colors duration-300 ${openIndex === i ? 'text-[#0F1C33]' : 'text-[#4A5568]'}`}>
                  {faq.q}
                </span>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${openIndex === i ? 'bg-[#4DA8DA] border-[#4DA8DA] rotate-180' : 'border-slate-200'}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={openIndex === i ? 'text-white' : 'text-slate-300'}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 text-[#4A5568] text-base leading-relaxed font-medium">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
