'use client'
import type { JSX } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>
      </svg>
    ),
    title: 'Uncompromising Purity',
    desc: 'Our chemicals meet USP, BP and food-grade purity standards with rigorous in-process QC at every batch.',
    color: '#3ABEF9', 
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    title: 'Quality Assurance',
    desc: 'ISO 9001:2015, GMP & HACCP certified operations — compliance with global quality standards is non-negotiable.',
    color: '#4ADE80', 
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
      </svg>
    ),
    title: 'Global Supply',
    desc: 'Reliable supply chain serving manufacturers in 8+ countries with consistent lead times and competitive pricing.',
    color: '#60A5FA', 
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    title: '9+ Certifications',
    desc: 'Kosher, Halal, ISO 22000, ISO 45001, ISO 9235 — our certifications open doors to regulated industries worldwide.',
    color: '#FBBF24', 
  },
]

const CERT_ICONS: Record<string, JSX.Element> = {
  'ISO 9001:2015': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  'ISO 22000:2018': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 2l1.5 1.5M12 2v3M21 2l-1.5 1.5M7 7a5 5 0 0010 0M5 21h14M12 12v9"/>
    </svg>
  ),
  'ISO 45001:2018': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  ),
  'ISO 9235:2013': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  'GMP': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-4 0v2M8 7V5a2 2 0 014 0"/>
    </svg>
  ),
  'HACCP': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  'Kosher (TEC)': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  'Kosher (DEP)': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  'Registration': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
    </svg>
  ),
}

export default function CertificationsPreview() {
  // Mouse tracking for 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for tilt
  const springConfig = { damping: 30, stiffness: 120 }
  const rotateX = useSpring(useTransform(mouseY, [0, 1000], [8, -8]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [0, 1500], [-8, 8]), springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <>
      {/* ── WHY CHOOSE US — dark navy section ── */}
      <section className="py-28 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #0D2137 0%, #1F4E79 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(77,168,218,0.6) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #4DA8DA, #0EA5A0, #4DA8DA)' }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="section-tag text-[#4DA8DA] mb-3">WHY CHOOSE US</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              The Parul Chemicals<br />Advantage
            </h2>
            <p className="text-white/60 text-lg max-w-lg mx-auto">
              From precision manufacturing to on-time delivery — here is why leading companies trust us.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="feature-card p-7 rounded-2xl group transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform"
                  style={{ background: f.color, color: 'white' }}>
                  {f.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{f.title}</h3>
                <ul className="space-y-1.5 font-medium">
                  {f.desc.split(' — ').map((part, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-white/65 leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: '#4DA8DA' }} />
                      {part}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS STRIP — light section — UPDATED WITH 3D ORNAMENTS ── */}
      <section 
        onMouseMove={handleMouseMove}
        className="py-24 hex-bg relative overflow-hidden grid-pattern perspective-1000 bg-white"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] accent-blue-blob opacity-30 pointer-events-none" />

        {/* INTERACTIVE 3D LATTICE DECOR (Left) */}
        <motion.div 
          style={{ rotateX, rotateY, perspective: 1000 }}
          className="absolute top-10 left-[5%] opacity-[0.1] pointer-events-none hidden lg:block"
        >
          <svg width="300" height="300" viewBox="0 0 100 100" className="drop-shadow-2xl">
            <path d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z" fill="none" stroke="#4DA8DA" strokeWidth="0.8" />
            <path d="M50 10 L50 90 M15 30 L85 70 M15 70 L85 30" stroke="#4DA8DA" strokeWidth="0.5" strokeDasharray="2 2" />
            <circle cx="50" cy="10" r="2.5" fill="#4DA8DA" />
            <circle cx="85" cy="30" r="2.5" fill="#4DA8DA" />
            <circle cx="85" cy="70" r="2.5" fill="#4DA8DA" />
            <circle cx="50" cy="90" r="2.5" fill="#4DA8DA" />
            <circle cx="15" cy="70" r="2.5" fill="#4DA8DA" />
            <circle cx="15" cy="30" r="2.5" fill="#4DA8DA" />
          </svg>
        </motion.div>

        {/* INTERACTIVE 3D ATOM DECOR (Right) */}
        <motion.div 
          style={{ rotateX, rotateY, perspective: 1000 }}
          animate={{ rotate: -360 }}
          transition={{ rotate: { duration: 60, repeat: Infinity, ease: "linear" } }}
          className="absolute bottom-10 right-[8%] opacity-[0.1] pointer-events-none hidden lg:block"
        >
          <svg width="250" height="250" viewBox="0 0 100 100">
            <ellipse cx="50" cy="50" rx="45" ry="18" fill="none" stroke="#0EA5A0" strokeWidth="0.8" />
            <ellipse cx="50" cy="50" rx="45" ry="18" fill="none" stroke="#0EA5A0" strokeWidth="0.8" transform="rotate(60 50 50)" />
            <ellipse cx="50" cy="50" rx="45" ry="18" fill="none" stroke="#0EA5A0" strokeWidth="0.8" transform="rotate(120 50 50)" />
            <circle cx="50" cy="50" r="8" fill="#1F4E79" />
          </svg>
        </motion.div>

        {/* Reactive Particle System */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 2.5, opacity: 0.3, backgroundColor: '#4DA8DA' }}
            className="absolute w-2 h-2 rounded-full border border-[#4DA8DA] pointer-events-auto cursor-none hidden lg:block"
            style={{ 
              top: `${(i * 18) % 70 + 15}%`, 
              left: `${(i * 31) % 70 + 15}%`,
              transition: 'all 0.4s ease'
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="section-tag mb-3">CERTIFICATIONS</p>
            <h2 className="font-display text-4xl font-bold text-[#0F1C33] mb-3">
              International Quality Standards
            </h2>
            <p className="text-[#4A5568] text-base font-medium max-w-lg mx-auto">
              Certified by globally recognized bodies ensuring product purity, food safety and occupational health.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {['ISO 9001:2015','ISO 22000:2018','ISO 45001:2018','ISO 9235:2013','GMP','HACCP','Kosher (TEC)','Kosher (DEP)','Registration'].map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -5, borderColor: '#4DA8DA' }}
                className="cert-card bg-white border border-[#E2E8F0] rounded-2xl p-4 flex flex-col items-center gap-2 transition-all duration-300 shadow-sm"
              >
                <span className="text-[#1F4E79] scale-110">{CERT_ICONS[name]}</span>
                <span className="text-[11px] font-bold text-[#1F4E79] text-center leading-tight uppercase tracking-tight">{name}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/certifications"
              className="px-8 py-3.5 rounded-full text-sm font-bold inline-flex items-center gap-2 transition-all duration-300 border-2 border-[#4DA8DA] text-[#1F4E79] hover:bg-[#4DA8DA] hover:text-white shadow-lg shadow-blue-500/5"
            >
              View All Certifications
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
