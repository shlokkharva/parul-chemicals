'use client'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const PARTNERS = [
  { name: 'PharmaTech Solutions', logo: 'PTS', color: '#0ea5e9' },
  { name: 'Global Logistics Corp', logo: 'GLC', color: '#6366f1' },
  { name: 'Industrial Biotics', logo: 'IB', color: '#10b981' },
  { name: 'Apex Agrochemicals', logo: 'AA', color: '#f59e0b' },
  { name: 'PureFlow Labs', logo: 'PFL', color: '#8b5cf6' },
  { name: 'Summit Healthcare', logo: 'SHC', color: '#06b6d4' },
]

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
      className="py-24 relative overflow-hidden perspective-1000 bg-[#F8FAFC]"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(14,165,160,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="glass rounded-[3rem] p-10 md:p-16 flex flex-col items-center justify-between md:flex-row gap-12 bg-white/60 backdrop-blur-2xl shadow-2xl shadow-blue-900/10 border border-white/80"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,249,255,0.7) 100%)' }}>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black tracking-widest uppercase mb-6 shadow-sm"
              style={{ background: 'rgba(14,165,160,0.1)', border: '1.5px solid rgba(14,165,160,0.2)', color: '#0EA5A0' }}>
              🤝 Partner With Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-[#0F1C33] mb-6 leading-[1.1] tracking-tight">
              Scale Your Growth<br />
              <span className="text-[#4DA8DA]">with Bulk Orders</span>
            </h2>
            <p className="text-[#4A5568] text-lg font-medium max-w-xl mb-8 leading-relaxed">
              Join our growing network of trusted distributors across India and internationally. Get exclusive wholesale pricing, priority support, and an authorized distributor certificate.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Wholesale Pricing', 'Priority Delivery', 'Dedicated Manager', 'Free TDS & COA'].map(p => (
                <span key={p} className="text-[11px] font-bold text-[#1F4E79] bg-white px-5 py-3 rounded-2xl border border-[#E2E8F0] flex items-center gap-2.5 shadow-sm hover:shadow-md transition-shadow">
                  <span className="w-2 h-2 rounded-full bg-[#0EA5A0] shrink-0" />
                  {p}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6 min-w-[320px] bg-white/40 p-10 rounded-[2.5rem] border border-white/60 shadow-inner"
          >
            <Link href="/contact"
              className="btn-primary w-full px-10 py-6 rounded-fill font-black text-xl text-center flex items-center justify-center gap-4 shadow-2xl shadow-blue-600/30 active:scale-[0.98] transition-all hover:-translate-y-1"
              style={{ borderRadius: '2rem' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Get in Touch
            </Link>
            <div className="text-sm text-slate-500 font-bold">

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
