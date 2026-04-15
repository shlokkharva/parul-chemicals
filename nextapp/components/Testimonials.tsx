'use client'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const REVIEWS = [
  {
    name: 'Dr. Arpit Mehta',
    role: 'Procurement Head, Pharma Solutions',
    text: "The purity levels of DEP from Parul Chemicals are consistently superior. Their reliability in delivery schedules has made them our preferred partner for over 5 years.",
    avatar: 'AM'
  },
  {
    name: 'Suresh Prajapati',
    role: 'R&D Director, Agrochemicals Ltd',
    text: "Parul's Triethyl Citrate is world-class. Being food-safe and biodegradable, it met all our stringent regulatory requirements for our new product line.",
    avatar: 'SP'
  },
  {
    name: 'Elena Rodriguez',
    role: 'Supply Chain Manager, Global Fragrances',
    text: "Scaling our production for the EU market required partners with ISO and REACH compliance. Parul Chemicals delivered beyond expectations.",
    avatar: 'ER'
  }
]

export default function Testimonials() {
  // Mouse tracking for 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for tilt
  const springConfig = { damping: 30, stiffness: 120 }
  const rotateX = useSpring(useTransform(mouseY, [0, 800], [5, -5]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [0, 1500], [-5, 5]), springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="py-28 bg-[#0D2137] relative overflow-hidden perspective-1000"
    >
      {/* Interactive 3D Decorative patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="hex-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M30 0 L60 18 L60 42 L30 60 L0 42 L0 18 Z" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hex-pattern)" />
        </svg>
      </div>

      {/* 3D Floating Atom (Top Right) */}
      <motion.div 
        style={{ rotateX, rotateY, perspective: 1000 }}
        animate={{ y: [0, -30, 0] }}
        transition={{ y: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute top-10 right-10 w-[300px] h-[300px] opacity-[0.08] pointer-events-none hidden lg:block"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#4DA8DA]">
          <circle cx="50" cy="50" r="10" fill="currentColor" className="animate-pulse" />
          <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(60 50 50)" />
          <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(120 50 50)" />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <div className="w-10 h-[2px] bg-gradient-to-r from-transparent to-[#4DA8DA]" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#4DA8DA]">
              Voice of our Partners
            </span>
            <div className="w-10 h-[2px] bg-gradient-to-l from-transparent to-[#4DA8DA]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white tracking-tight"
          >
            Global Client Reviews
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="bg-white/5 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/10 relative group hover:bg-white/[0.08] transition-all duration-500 shadow-2xl"
            >
              <div className="absolute top-8 right-10 text-8xl font-serif text-[#4DA8DA]/10 select-none group-hover:text-[#4DA8DA]/20 transition-all duration-500">
                “
              </div>
              
              <div className="flex items-center gap-5 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4DA8DA] to-[#0EA5A0] flex items-center justify-center text-base font-bold text-white shadow-xl group-hover:rotate-6 transition-transform">
                  {review.avatar}
                </div>
                <div>
                  <h4 className="text-white font-bold text-base tracking-wide">{review.name}</h4>
                  <p className="text-[#4DA8DA] text-[10px] font-bold uppercase tracking-[0.2em] mt-1">{review.role}</p>
                </div>
              </div>

              <p className="text-white/70 text-lg leading-relaxed italic font-medium">
                "{review.text}"
              </p>
              
              <div className="mt-8 flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#FBBF24" className="opacity-80">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
