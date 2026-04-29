'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'

interface Review {
  id?: number;
  name: string;
  role: string;
  company: string;
  location: string;
  text: string;
  stars: number;
  avatar?: string;
  image?: string;
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [showAll, setShowAll] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newReview, setNewReview] = useState<Review>({
    name: '',
    role: '',
    company: '',
    location: '',
    text: '',
    stars: 5
  })

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews')
      const data = await res.json()
      setReviews(data)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      })
      if (res.ok) {
        await fetchReviews()
        setShowForm(false)
        setNewReview({ name: '', role: '', company: '', location: '', text: '', stars: 5 })
      }
    } catch (error) {
      console.error('Error adding review:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Choose reviews to display
  const visibleReviews = showAll ? reviews : reviews.slice(0, 3)

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
                key={review.id || review.name}
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
                      <span>{review.avatar || review.name.charAt(0)}</span>
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
                    <svg 
                      key={j} 
                      width="12" 
                      height="12" 
                      viewBox="0 0 24 24" 
                      fill={j < review.stars ? "#FBBF24" : "rgba(255,255,255,0.1)"} 
                      className={j < review.stars ? "opacity-80" : ""}
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Actions */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          {reviews.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border-2 border-[#4DA8DA]/30 text-white hover:border-[#4DA8DA] hover:bg-[#4DA8DA] shadow-lg shadow-blue-500/10"
            >
              {showAll ? 'Show Less' : 'View All Global Reviews'}
            </button>
          )}
          <button 
            onClick={() => setShowForm(true)}
            className="px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 bg-[#F59E0B] text-white hover:bg-[#D97706] shadow-lg shadow-orange-500/20"
          >
            Add a Review
          </button>
        </div>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#0D2137] border border-white/10 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6">
                <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">Write a Review</h3>
              <p className="text-white/50 text-sm mb-8">Share your experience with our products and service.</p>

              <form onSubmit={handleAddReview} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    required
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder:text-white/20 focus:border-[#4DA8DA] outline-none transition-all"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  />
                  <input
                    required
                    type="text"
                    placeholder="Location (e.g. London, UK)"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder:text-white/20 focus:border-[#4DA8DA] outline-none transition-all"
                    value={newReview.location}
                    onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    required
                    type="text"
                    placeholder="Role"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder:text-white/20 focus:border-[#4DA8DA] outline-none transition-all"
                    value={newReview.role}
                    onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                  />
                  <input
                    required
                    type="text"
                    placeholder="Company"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder:text-white/20 focus:border-[#4DA8DA] outline-none transition-all"
                    value={newReview.company}
                    onChange={(e) => setNewReview({ ...newReview, company: e.target.value })}
                  />
                </div>
                
                <textarea
                  required
                  placeholder="Your Review"
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder:text-white/20 focus:border-[#4DA8DA] outline-none transition-all resize-none"
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                />

                <div className="flex items-center gap-4 py-2">
                  <span className="text-white/50 text-sm">Rating:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, stars: star })}
                        className="transition-transform hover:scale-110"
                      >
                        <svg 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill={star <= newReview.stars ? "#FBBF24" : "rgba(255,255,255,0.1)"}
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full btn-primary py-4 rounded-2xl text-lg font-bold shadow-xl shadow-orange-500/20 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
