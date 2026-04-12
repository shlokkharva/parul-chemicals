'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { SITE } from '@/lib/data'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSent(true)
  }

  return (
    <>
      {/* Hero */}
      <div className="relative pt-36 pb-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #060F1E 0%, #0B1F3A 100%)' }}>
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize: '40px 40px' }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-5 h-px bg-[#00C9A7]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#00C9A7]">Contact</span>
            <div className="w-5 h-px bg-[#00C9A7]" />
          </div>
          <h1 className="font-serif text-5xl font-bold text-white mb-4">Get In Touch</h1>
          <p className="text-white/50 text-lg max-w-lg mx-auto">Inquire about our products, request a quote, or download technical specifications.</p>
        </div>
      </div>

      <section className="py-20 bg-[#0B1F3A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 space-y-5">
              <h2 className="font-serif text-2xl font-bold text-white mb-6">Contact Details</h2>
              {[
                { icon: '📍', label: 'Our Address', value: SITE.address },
                { icon: '📞', label: 'Phone', value: SITE.phone, href: `tel:${SITE.phone}` },
                { icon: '✉️', label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
                { icon: '🏷️', label: 'GSTIN', value: SITE.gstin },
              ].map(item => (
                <div key={item.label} className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00C9A7]/30 transition-all">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-xs font-bold tracking-wider uppercase text-[#00C9A7] mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-white/70 hover:text-white transition-colors">{item.value}</a>
                    ) : (
                      <p className="text-sm text-white/70">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3">
              <div className="bg-[#0D1B2E] border border-white/10 rounded-3xl p-8">
                <h2 className="font-serif text-2xl font-bold text-white mb-6">Send an Inquiry</h2>

                {sent ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-[#00C9A7]/15 border border-[#00C9A7]/30 flex items-center justify-center mx-auto mb-4 text-3xl">✅</div>
                    <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-white/50">We'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-white/40 mb-2">Full Name *</label>
                        <input required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00C9A7]/50 transition-all" placeholder="Rajesh Patel" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-white/40 mb-2">Email *</label>
                        <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00C9A7]/50 transition-all" placeholder="rajesh@example.com" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-white/40 mb-2">Company</label>
                        <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00C9A7]/50 transition-all" placeholder="Patel Traders" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-white/40 mb-2">Product of Interest</label>
                        <select className="w-full bg-[#0D1B2E] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00C9A7]/50 transition-all">
                          <option>— Select Product —</option>
                          <option>Diethyl Phthalate (DEP)</option>
                          <option>Triethyl Citrate (TEC)</option>
                          <option>Both Products</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/40 mb-2">Message *</label>
                      <textarea required rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00C9A7]/50 transition-all resize-none" placeholder="Hi, I'm interested in placing a bulk order for..." />
                    </div>
                    <button type="submit" disabled={loading}
                      className="btn-glow w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2">
                      {loading ? (
                        <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>Sending...</span></>
                      ) : (
                        <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg><span>Send Message</span></>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
