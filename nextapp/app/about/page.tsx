'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TIMELINE, STATS } from '@/lib/data'

export default function AboutPage() {
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && lineRef.current) lineRef.current.classList.add('drawn')
    }, { threshold: 0.1 })
    if (lineRef.current) observer.observe(lineRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Hero */}
      <div className="relative pt-36 pb-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #060F1E 0%, #0B1F3A 100%)' }}>
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize: '40px 40px' }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-5 h-px bg-[#00C9A7]" />
                <span className="text-xs font-bold tracking-widest uppercase text-[#00C9A7]">About Parul Chemicals</span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Our Story of<br />
                <span className="bg-gradient-to-r from-[#00C9A7] to-[#00AEEF] bg-clip-text text-transparent">
                  Chemical Excellence
                </span>
              </h1>
              <p className="text-white/65 text-lg leading-relaxed">
                Since 2009, Parul Chemicals has been committed to producing the highest purity specialty chemicals, serving industries that demand nothing less than perfection.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.2 }}
              className="grid grid-cols-2 gap-4">
              {STATS.map(s => (
                <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-black text-white mb-1">{s.val}</div>
                  <div className="text-xs text-[#00C9A7] font-semibold">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* About content */}
      <section className="py-20 bg-[#0B1F3A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif text-3xl font-bold text-white mb-5">Who We Are</h2>
              <div className="space-y-4 text-white/60 text-base leading-relaxed">
                <p>Parul Chemicals is a Vadodara-based specialty chemical manufacturer, focused on producing high-purity Diethyl Phthalate (DEP) and Triethyl Citrate (TEC) for global industrial applications.</p>
                <p>Our manufacturing facility adheres to strict GMP guidelines, ISO certifications, and HACCP protocols, ensuring every batch meets the precise specifications required by pharmaceutical, food, cosmetics, and agrochemical industries.</p>
                <p>With 15+ years of experience, 9 international certifications, and clients in 8+ countries, we bring reliability and consistency to chemical manufacturing.</p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: '🏭', title: 'State-of-Art Facility', desc: 'Modern GMP-compliant plant in Vadodara' },
                  { icon: '🔬', title: 'Quality Labs', desc: 'In-house testing for every batch' },
                  { icon: '🌱', title: 'Eco-Conscious', desc: 'Environmentally responsible processes' },
                  { icon: '🌍', title: 'Global Reach', desc: 'Exporting to 8+ countries worldwide' },
                ].map(item => (
                  <div key={item.title} className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-2xl mb-2 block">{item.icon}</span>
                    <p className="text-sm font-bold text-white mb-1">{item.title}</p>
                    <p className="text-xs text-white/50">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Why us mini */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <h2 className="font-serif text-3xl font-bold text-white mb-5">Why Choose Us</h2>
              <div className="space-y-4">
                {[
                  { title: 'Consistent High Purity', desc: '99%+ purity guaranteed across all batches with in-house quality testing.' },
                  { title: 'Regulatory Compliance', desc: 'ISO, GMP, HACCP, Kosher certified — meeting global pharmaceutical and food standards.' },
                  { title: 'Flexible Packaging', desc: 'Available from 1L to bulk 200L drums, shipped pan-India and internationally.' },
                  { title: 'Technical Support', desc: 'Expert team available for formulation assistance and product specifications.' },
                  { title: 'Competitive Pricing', desc: 'Direct manufacturer pricing with volume discounts for distributors.' },
                ].map((item, i) => (
                  <div key={item.title} className="flex gap-4 p-4 rounded-xl border border-white/10 hover:border-[#00C9A7]/30 transition-all">
                    <div className="w-8 h-8 rounded-lg bg-[#00C9A7]/15 border border-[#00C9A7]/30 flex items-center justify-center text-[#00C9A7] text-sm font-black shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm mb-1">{item.title}</p>
                      <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-5 h-px bg-[#00C9A7]" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#00C9A7]">Our Journey</span>
              <div className="w-5 h-px bg-[#00C9A7]" />
            </div>
            <h2 className="font-serif text-4xl font-bold text-white">Milestones &amp; Growth</h2>
          </motion.div>

          <div className="relative max-w-3xl mx-auto" style={{ minHeight: '600px' }}>
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2" />
            <div ref={lineRef} className="timeline-line -translate-x-1/2" />

            {TIMELINE.map((item, i) => {
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.7 }}
                  className={`relative flex items-center mb-12 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Card */}
                  <div className={`w-5/12 ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-[#0D1B2E] border border-white/10 rounded-2xl p-5 hover:border-[#00C9A7]/30 transition-all duration-300">
                      <div className="text-2xl font-black text-[#00C9A7] mb-1">{item.year}</div>
                      <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#00C9A7] border-4 border-[#121212] z-10" />

                  {/* Spacer */}
                  <div className="w-5/12" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
