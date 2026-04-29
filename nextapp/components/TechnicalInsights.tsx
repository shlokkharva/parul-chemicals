'use client'
import { motion } from 'framer-motion'

const INSIGHTS = [
  {
    title: 'What',
    desc: 'High-purity specialty chemicals (DEP & TEC) engineered for sensitive industrial applications.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    )
  },
  {
    title: 'Why',
    desc: 'Essential for industries where absolute safety, extreme purity, and international compliance are non-negotiable.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    )
  },
  {
    title: 'Where',
    desc: 'Widely used in food flavors, pharmaceuticals, premium fragrances, coatings, and textile industries.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    )
  },
  {
    title: 'When',
    desc: 'Acts as a critical fixative, stabilizer, and carrier. Preferred as a non-phthalate alternative with USP/FCC acceptance.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    )
  },
  {
    title: 'How',
    desc: 'Manufactured through precise esterification and fractional distillation in ISO-certified facilities.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    )
  },
  {
    title: 'Environmental Benefits',
    desc: 'Our products are non-toxic and fully biodegradable, serving as eco-friendly plasticizers and solvents.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C10.9 14.36 12 14 14 12c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
      </svg>
    )
  }
]

export default function TechnicalInsights() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="section-tag mb-3">TECHNICAL EXPERTISE</p>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0F1C33] tracking-tight">
            Understanding Our Solutions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INSIGHTS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2rem] border border-[#E2E8F0] hover:border-[#4DA8DA] hover:shadow-xl transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#4DA8DA]/10 text-[#4DA8DA] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0F1C33] mb-3">{item.title}</h3>
              <p className="text-[#4A5568] text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
