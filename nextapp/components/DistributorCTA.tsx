'use client'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function DistributorCTA() {
  // Mouse tracking for 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for tilt
  const springConfig = { damping: 25, stiffness: 150 }
  const rotateX = useSpring(useTransform(mouseY, [0, 600], [4, -4]), springConfig)
  const rotateY = useSpring(useSpring(useTransform(mouseX, [0, 1500], [-4, 4]), springConfig))

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="py-20 relative overflow-hidden topo-pattern perspective-1000 bg-white"
    >
      {/* Interactive 3D Network Orbit Background */}
      <motion.div 
        style={{ rotateX, rotateY, perspective: 1000 }}
        className="absolute inset-0 opacity-[0.2] pointer-events-none hidden lg:block"
      >
        <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4DA8DA" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#4DA8DA" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Connecting technical lines */}
          <line x1="100" y1="100" x2="300" y2="250" stroke="#4DA8DA" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="300" y1="250" x2="150" y2="450" stroke="#4DA8DA" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="300" y1="250" x2="600" y2="150" stroke="#4DA8DA" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="600" y1="150" x2="900" y2="300" stroke="#4DA8DA" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="600" y1="150" x2="800" y2="100" stroke="#4DA8DA" strokeWidth="0.5" strokeDasharray="4 4" />
          
          {/* Nodes */}
          <circle cx="100" cy="100" r="3" fill="#4DA8DA" />
          <circle cx="300" cy="250" r="5" fill="#4DA8DA" />
          <circle cx="150" cy="450" r="4" fill="#4DA8DA" />
          <circle cx="600" cy="150" r="6" fill="#4DA8DA" />
          <circle cx="900" cy="300" r="4" fill="#4DA8DA" />
          <circle cx="800" cy="100" r="3" fill="#4DA8DA" />
        </svg>
      </motion.div>

      {/* Subtle blue blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3 accent-blue-blob opacity-40 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none -translate-x-1/4 translate-y-1/4 accent-teal-blob opacity-30 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="glass rounded-[2.5rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 bg-white/60 backdrop-blur-xl"
          style={{ boxShadow: '0 20px 60px rgba(15,28,51,0.12)', border: '1px solid rgba(255,255,255,0.8)' }}>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
              style={{ background: 'rgba(14,165,160,0.1)', border: '1.5px solid rgba(14,165,160,0.2)', color: '#0EA5A0' }}>
              Partner With Us
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-[#0F1C33] mb-6 leading-tight">
              Scale Your Growth with Bulk Orders
            </h2>
            <p className="text-[#4A5568] text-base font-medium max-w-lg mb-8 leading-relaxed">
              Join our growing network of trusted distributors across India and internationally. Get exclusive wholesale pricing, priority support, and an authorized distributor certificate.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Wholesale Pricing', 'Priority Delivery', 'Dedicated Manager', 'Free TDS & COA'].map(p => (
                <span key={p} className="text-xs font-bold text-[#1F4E79] bg-white px-4 py-2.5 rounded-xl border border-[#E2E8F0] flex items-center gap-2 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5A0] shrink-0" />
                  {p}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4 min-w-[280px]"
          >
            <Link href="/contact"
              className="btn-primary w-full px-8 py-5 rounded-fill font-bold text-lg text-center flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 active:scale-[0.98] transition-transform"
              style={{ borderRadius: '1.5rem' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
