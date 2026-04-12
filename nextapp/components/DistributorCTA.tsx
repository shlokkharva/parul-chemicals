'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function DistributorCTA() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #060F1E 0%, #0B1F3A 60%, #121212 100%)' }}>
      <div className="absolute inset-0 opacity-20"
        style={{ backgroundImage: 'linear-gradient(rgba(0,201,167,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,201,167,0.03) 1px,transparent 1px)', backgroundSize: '40px 40px' }}
      />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#00C9A7]/8 rounded-full blur-3xl translate-x-1/2 translate-y-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="glass rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C9A7]/15 border border-[#00C9A7]/30 text-[#00C9A7] text-xs font-bold tracking-widest uppercase mb-4">
              🤝 Partner With Us
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">
              Become an Authorized Distributor
            </h2>
            <p className="text-white/60 text-base max-w-lg">
              Join our growing network of trusted distributors across India. Get exclusive wholesale pricing, priority support, and an authorized distributor certificate.
            </p>
            <div className="flex flex-wrap gap-3 mt-5">
              {['✅ Wholesale Pricing', '✅ Priority Delivery', '✅ Dedicated Manager', '✅ Free TDS & COA'].map(p => (
                <span key={p} className="text-xs font-semibold text-white/80 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">{p}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4 min-w-[260px]"
          >
            <Link href="/buy?tab=register" className="btn-glow w-full px-8 py-4 rounded-xl text-base font-bold text-center flex items-center justify-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
                <line x1="19" y1="8" x2="19" y2="14"/>
                <line x1="22" y1="11" x2="16" y2="11"/>
              </svg>
              <span>Register Now</span>
            </Link>
            <Link href="/buy?tab=login" className="text-sm text-white/50 hover:text-[#00C9A7] transition-colors">
              Already approved? <strong className="text-[#00C9A7]">Login →</strong>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
