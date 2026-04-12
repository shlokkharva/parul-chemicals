'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { CERTIFICATIONS } from '@/lib/data'

export default function CertificationsPage() {
  const [selected, setSelected] = useState<typeof CERTIFICATIONS[0] | null>(null)

  return (
    <>
      {/* Hero */}
      <div className="relative pt-36 pb-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #060F1E 0%, #0B1F3A 100%)' }}>
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize: '40px 40px' }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-5 h-px bg-[#00AEEF]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#00AEEF]">Certifications</span>
            <div className="w-5 h-px bg-[#00AEEF]" />
          </div>
          <h1 className="font-serif text-5xl font-bold text-white mb-4">Quality Certifications</h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Every batch meets the highest international standards. Certified by globally recognized bodies.
          </p>
        </div>
      </div>

      {/* Grid */}
      <section className="py-20 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setSelected(cert)}
                className="cert-card bg-[#0D1B2E] border border-white/10 rounded-2xl overflow-hidden group"
              >
                {/* Thumbnail */}
                <div className="relative h-52 overflow-hidden bg-white">
                  <Image
                    src={cert.image}
                    alt={cert.name}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{cert.icon}</span>
                    <h3 className="text-lg font-bold text-white">{cert.name}</h3>
                  </div>
                  <p className="text-sm text-white/50">{cert.desc}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#00AEEF]">
                    <span>View Certificate</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="cert-lightbox-overlay"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={e => e.stopPropagation()}
              className="relative"
            >
              <Image
                src={selected.image}
                alt={selected.name}
                width={900}
                height={700}
                className="cert-lightbox-img bg-white"
                style={{ objectFit: 'contain' }}
              />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center hover:bg-[#00C9A7]/80 transition-all text-xl"
              >
                ×
              </button>
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="px-4 py-2 rounded-full bg-black/70 text-white text-sm font-bold">{selected.name}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
