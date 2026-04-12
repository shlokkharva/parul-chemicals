'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { STATS } from '@/lib/data'

export default function AboutPreview() {
  return (
    <section className="py-24 bg-[#0B1F3A] relative overflow-hidden">
      {/* bg decoration */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-[#00C9A7]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-5 h-px bg-[#00C9A7]" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#00C9A7]">About Us</span>
            </div>
            <h2 className="font-serif text-4xl font-bold text-white mb-5 leading-tight">
              15+ Years of Chemical<br />
              <span className="text-[#00C9A7]">Manufacturing Excellence</span>
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-5">
              Founded in 2009 in Vadodara, Gujarat, Parul Chemicals has grown into a trusted name in specialty chemical manufacturing. We produce high-purity Diethyl Phthalate (DEP) and Triethyl Citrate (TEC) for pharmaceutical, food, cosmetics and agrochemical applications.
            </p>
            <p className="text-white/60 text-base leading-relaxed mb-8">
              Our state-of-the-art manufacturing facility complies with GMP, HACCP, and multiple ISO standards, ensuring consistent quality for every batch delivered globally.
            </p>

            <Link href="/about" className="btn-glow px-7 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2">
              <span>Our Full Story</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </motion.div>

          {/* Right — Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-5"
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0D1B2E] border border-white/10 rounded-2xl p-6 hover:border-[#00C9A7]/30 hover:shadow-glow-teal transition-all duration-300"
              >
                <div className="text-4xl font-black text-white tracking-tight mb-1">{s.val}</div>
                <div className="text-sm text-[#00C9A7] font-semibold">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
