'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CERTIFICATIONS } from '@/lib/data'

export default function CertificationsPreview() {
  return (
    <section className="py-24 bg-[#121212]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-5 h-px bg-[#00AEEF]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#00AEEF]">Certifications</span>
            <div className="w-5 h-px bg-[#00AEEF]" />
          </div>
          <h2 className="font-serif text-4xl font-bold text-white mb-3">
            International Quality Standards
          </h2>
          <p className="text-white/50 text-base max-w-lg mx-auto">
            Certified by globally recognized bodies ensuring product purity, food safety and occupational health.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
          {CERTIFICATIONS.slice(0, 9).map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="bg-[#0D1B2E] border border-white/10 rounded-xl p-4 flex flex-col items-center gap-2 hover:border-[#00AEEF]/40 hover:shadow-glow-blue transition-all duration-300 cursor-pointer"
            >
              <span className="text-2xl">{cert.icon}</span>
              <span className="text-xs font-bold text-white text-center leading-tight">{cert.name}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link href="/certifications" className="px-8 py-3.5 rounded-xl text-sm font-bold border border-[#00AEEF]/30 text-[#00AEEF] hover:bg-[#00AEEF]/10 transition-all inline-flex items-center gap-2">
            View All Certifications
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
