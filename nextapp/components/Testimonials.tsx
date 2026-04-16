'use client'
import { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'

const REVIEWS = [
  {
    name: 'Sophie Lefebvre',
    role: 'Operations Manager',
    company: 'EuroChem Distribution',
    location: 'Lyon, France',
    text: "Parul Chemicals is a dependable pillar in our luxury fragrance supply chain. Their DEP purity levels are consistently superior for the EU market.",
    avatar: 'SL',
    image: '/images/reviews/sophie.webp'
  },
  {
    name: 'Hans Müller',
    role: 'Quality Assurance',
    company: 'Rheinland Pharma',
    location: 'Mannheim, Germany',
    text: "For our strict European pharmaceutical standards, Parul's DEP has passed every lab test with flying colors. A reliable global manufacturer.",
    avatar: 'HM',
    image: '/images/reviews/hans.webp'
  },
  {
    name: 'Marco Rossi',
    role: 'Purchasing Director',
    company: 'Milan Flavors',
    location: 'Milan, Italy',
    text: "The Triethyl Citrate from Parul Chemicals is of exceptional quality. It has become a key stabilizer in our high-end food-grade formulations.",
    avatar: 'MR',
    image: '/images/reviews/marco.webp'
  },
  {
    name: 'Jan de Vries',
    role: 'Procurement Manager',
    company: 'Dutch Chemical Trading',
    location: 'Rotterdam, Netherlands',
    text: "Seamless logistics into the Port of Rotterdam and flawless REACH documentation. They are our most trusted partner for DEP imports.",
    avatar: 'JV',
    image: '/images/reviews/jan.webp'
  },
  {
    name: 'James Whitmore',
    role: 'Technical Director',
    company: 'British Pharma Labs',
    location: 'London, UK',
    text: "Their DEP exceeds our stringent British Pharmacopoeia (BP) standards. Parul Chemicals stands out for their technical transparency.",
    avatar: 'JW',
    image: '/images/reviews/james.webp'
  },
  {
    name: 'Dr. Lukas Steiner',
    role: 'Global Sourcing',
    company: 'Swiss Bio-Pharma',
    location: 'Basel, Switzerland',
    text: "REACH compliance and documentation excellence. We trust Parul for our sensitive global formulations across our European sites.",
    avatar: 'LS',
    image: '/images/reviews/lukas.webp'
  }
]

export default function Testimonials() {
  const [showAll, setShowAll] = useState(false)
  
  // Choose reviews to display
  const visibleReviews = showAll ? REVIEWS : REVIEWS.slice(0, 3)

  // Mouse tracking for 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for tilt
  const springConfig = { damping: 30, stiffness: 120 }
  const rotateX = useSpring(useTransform(mouseY, [0, 800], [5, -5]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [0, 1500], [-5, 5]), springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="py-28 bg-[#0D2137] relative overflow-hidden perspective-1000"
    >
      {/* Interactive 3D Decorative patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="hex-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M30 0 L60 18 L60 42 L30 60 L0 42 L0 18 Z" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hex-pattern)" />
        </svg>
      </div>

      {/* 3D Floating Atom (Top Right) */}
      <motion.div 
        style={{ rotateX, rotateY, perspective: 1000 }}
        animate={{ y: [0, -30, 0] }}
        transition={{ y: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute top-10 right-10 w-[300px] h-[300px] opacity-[0.08] pointer-events-none hidden lg:block"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#4DA8DA]">
          <circle cx="50" cy="50" r="10" fill="currentColor" className="animate-pulse" />
          <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(60 50 50)" />
          <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(120 50 50)" />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <div className="w-10 h-[2px] bg-gradient-to-r from-transparent to-[#4DA8DA]" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#4DA8DA]">
              Voice of our Partners
            </span>
            <div className="w-10 h-[2px] bg-gradient-to-l from-transparent to-[#4DA8DA]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white tracking-tight"
          >
            Global Client Reviews
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {visibleReviews.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="bg-white/5 backdrop-blur-2xl p-7 rounded-3xl border border-white/10 relative group hover:bg-white/[0.08] transition-all duration-500 shadow-xl"
              >
                <div className="absolute top-6 right-8 text-6xl font-serif text-[#4DA8DA]/10 select-none group-hover:text-[#4DA8DA]/20 transition-all duration-500">
                  “
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-[#4DA8DA] to-[#0EA5A0] flex items-center justify-center text-sm font-bold text-white shadow-lg group-hover:rotate-6 transition-transform relative">
                    {review.image ? (
                      <img 
                        src={review.image} 
                        alt={review.name} 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <span>{review.avatar}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm tracking-wide">{review.name}</h4>
                    <p className="text-[#4DA8DA] text-[9px] font-bold uppercase tracking-[0.2em] mt-1">{review.role} — {review.company}</p>
                    <div className="flex items-center gap-1.5 mt-1 opacity-60">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#4DA8DA" strokeWidth="2.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span className="text-white/60 text-[9px] font-medium tracking-wide italic">{review.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-white/70 text-base leading-relaxed italic font-medium">
                  "{review.text}"
                </p>
                
                <div className="mt-6 flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="12" height="12" viewBox="0 0 24 24" fill="#FBBF24" className="opacity-80">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View More Button */}
        {REVIEWS.length > 3 && (
          <div className="mt-16 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border-2 border-[#4DA8DA]/30 text-white hover:border-[#4DA8DA] hover:bg-[#4DA8DA] shadow-lg shadow-blue-500/10"
            >
              {showAll ? 'Show Less' : 'View All Global Reviews'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
