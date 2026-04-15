'use client'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { STATS } from '@/lib/data'

export default function AboutPreview() {
  // Mouse tracking for 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for tilt
  const springConfig = { damping: 25, stiffness: 150 }
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
      className="py-28 bg-white relative overflow-hidden dot-pattern perspective-1000"
    >
      {/* Decorative designer elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] accent-blue-blob opacity-60 pointer-events-none" />
      <div className="absolute top-20 right-10 w-64 h-64 border border-[#4DA8DA]/10 rounded-full animate-pulse-slow pointer-events-none" />
      
      {/* Abstract Orbital Design - INTERACTIVE 3D TILT */}
      <motion.div 
        style={{ rotateX, rotateY, perspective: 1000 }}
        animate={{ rotate: 360 }}
        transition={{ rotate: { duration: 50, repeat: Infinity, ease: "linear" } }}
        className="absolute -right-20 top-20 w-96 h-96 opacity-[0.25] pointer-events-none hidden lg:block drop-shadow-2xl"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#4DA8DA" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="#4DA8DA" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="100" cy="20" r="4" fill="#4DA8DA" />
          <circle cx="150" cy="100" r="3" fill="#4DA8DA" />
          <circle cx="50" cy="100" r="2.5" fill="#4DA8DA" />
        </svg>
      </motion.div>

      {/* Interactive Chemical Micro-Nodes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          viewport={{ once: true }}
          whileHover={{ scale: 3, opacity: 0.4, backgroundColor: '#4DA8DA', filter: 'blur(3px)' }}
          className="absolute w-2 h-2 rounded-full border border-[#4DA8DA] pointer-events-auto cursor-none hidden lg:block"
          style={{ 
            top: `${(i * 15) % 70 + 15}%`, 
            left: `${(i * 23) % 70 + 10}%`,
            transition: 'background-color 0.3s ease'
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <p className="section-tag mb-2">WHO WE ARE</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — visual card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden relative shadow-xl bg-gray-100 border border-gray-200" style={{ minHeight: '420px', height: '100%' }}>
              <iframe 
                src="https://maps.google.com/maps?q=Parul%20Chemicals,%20Ranjan%20Society%202,%20Near%20Lions%20Hall,%20Race%20Course,%20Vadodara,%20Gujarat&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0, position: 'absolute', top: 0, left: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
              
              <div className="absolute bottom-6 left-6 right-6 flex justify-between pointer-events-none">
                <div className="bg-[#0D2137] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg">
                  Est. 2009
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0F1C33] mb-6 leading-tight">
              Welcome to<br />Parul Chemicals
            </h2>
            <p className="text-[#4A5568] text-base leading-relaxed mb-5 font-medium">
              Parul Chemicals is committed to offering high-quality and innovative plasticizers to enrich all forms of life.
            </p>
            <p className="text-[#4A5568] text-base leading-relaxed mb-8 font-medium">
              We want to be a global Innovative Solutions provider serving Pharmaceutical, Nutrition, Agrochemical, Consumer and Industrial customers with our customised products and solutions that are innovative, cost-effective and conforming to excellent quality standards.
            </p>

            <Link href="/about" className="btn-navy px-7 py-3.5 rounded-full text-sm font-bold inline-flex items-center gap-2 shadow-lg shadow-navy/20">
              Know More →
            </Link>

            <div className="flex gap-10 mt-10 pt-8" style={{ borderTop: '1px solid #E2E8F0' }}>
              {STATS.map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl font-black text-[#1F4E79] tracking-tight">{s.val}</div>
                  <div className="text-xs text-[#94A3B8] font-bold mt-1 max-w-[80px] leading-tight uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
