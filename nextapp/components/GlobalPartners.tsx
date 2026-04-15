'use client'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const PARTNERS = [
  { name: 'PharmaTech Solutions', logo: 'PTS', color: '#0ea5e9' },
  { name: 'Global Logistics Corp', logo: 'GLC', color: '#6366f1' },
  { name: 'Industrial Biotics', logo: 'IB', color: '#10b981' },
  { name: 'Apex Agrochemicals', logo: 'AA', color: '#f59e0b' },
  { name: 'PureFlow Labs', logo: 'PFL', color: '#8b5cf6' },
  { name: 'Summit Healthcare', logo: 'SHC', color: '#06b6d4' },
]

export default function GlobalPartners() {
  // Mouse tracking for 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for tilt
  const springConfig = { damping: 25, stiffness: 150 }
  const rotateX = useSpring(useTransform(mouseY, [0, 600], [3, -3]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [0, 1500], [-3, 3]), springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="py-24 bg-gradient-to-b from-white to-[#F8FAFC] relative overflow-hidden perspective-1000"
    >
      {/* Decorative INTERACTIVE 3D Elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid-pattern" />
      
      <motion.div 
        style={{ rotateX, rotateY, perspective: 1000 }}
        className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.12] pointer-events-none hidden lg:block"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#4DA8DA]">
          <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
          <path d="M100 20 L100 180 M20 100 L180 100" stroke="currentColor" strokeWidth="0.2" />
        </svg>
      </motion.div>

      <div className="absolute top-0 right-0 w-96 h-96 bg-[#4DA8DA]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00C9A7]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      {/* Reactive Micro-Nodes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          viewport={{ once: true }}
          whileHover={{ scale: 3, opacity: 0.4, backgroundColor: '#4DA8DA' }}
          className="absolute w-2 h-2 rounded-full border border-[#4DA8DA] pointer-events-auto cursor-none hidden lg:block"
          style={{ 
            top: `${(i * 20) % 60 + 20}%`, 
            left: `${(i * 35) % 60 + 10}%`,
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        />
      ))}
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#4DA8DA] opacity-30" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#4DA8DA]">
              Global Network
            </span>
            <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#4DA8DA] opacity-30" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-[#0F1C33] tracking-tight"
          >
            Our Industry Partners
          </motion.h2>
          <p className="text-slate-500 text-base mt-6 max-w-2xl mx-auto font-medium leading-relaxed">
            Strategic collaborations with leading organizations across the chemical and pharmaceutical landscape.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {PARTNERS.map((partner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="flex flex-col items-center justify-center p-10 bg-white rounded-[2rem] border border-slate-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] transition-all duration-500 group relative overflow-hidden"
            >
              <div 
                className="absolute inset-x-0 top-0 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundColor: partner.color }}
              />
              
              <div 
                className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 shadow-inner"
                style={{ backgroundColor: `${partner.color}08` }}
              >
                <span 
                  className="text-2xl font-black transition-colors duration-500"
                  style={{ color: partner.color }}
                >
                  {partner.logo}
                </span>
              </div>
              <span className="text-[11px] font-bold text-slate-500 text-center uppercase tracking-widest leading-tight group-hover:text-[#0F1C33] transition-colors">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
