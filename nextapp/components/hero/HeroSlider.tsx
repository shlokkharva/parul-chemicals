'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const SLIDES = [
  { bg: '/hero/background1.webp', tag: 'ISO 9001 Certified Manufacturing' },
  { bg: '/hero/background2.webp', tag: 'GMP & HACCP Certified Facility' },
  { bg: '/hero/background3.webp', tag: 'Food-Safe Chemical Production' },
  { bg: '/hero/background4.webp', tag: 'Trusted by 500+ Global Clients' },
]

export default function HeroSlider() {
  const swiperRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<any>(null)

  useEffect(() => {
    let isMounted = true
    import('swiper').then(({ Swiper }) => {
      return import('swiper/modules').then(({ Autoplay, EffectFade, Pagination }) => {
        if (!swiperRef.current || !isMounted) return
        import('swiper/css')
        import('swiper/css/effect-fade')
        import('swiper/css/pagination')

        instanceRef.current = new Swiper(swiperRef.current!, {
          modules: [Autoplay, EffectFade, Pagination],
          effect: 'fade',
          fadeEffect: { crossFade: true },
          autoplay: { delay: 4500, disableOnInteraction: false },
          loop: true,
          speed: 1200,
          pagination: { el: '.swiper-pagination', clickable: true },
        })
      })
    })
    return () => { isMounted = false; instanceRef.current?.destroy?.() }
  }, [])

  return (
    <section className="relative h-screen overflow-hidden" id="hero">
      <div ref={swiperRef} className="hero-swiper swiper">
        <div className="swiper-wrapper">
          {SLIDES.map((s, i) => (
            <div key={i} className="swiper-slide">
              {/* Background */}
              <div
                className="hero-slide-bg"
                style={{ backgroundImage: `url(${s.bg})` }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#060F1E]/90 via-[#0B1F3A]/70 to-[#060F1E]/50" />
            </div>
          ))}
        </div>
        <div className="swiper-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-20" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00C9A7]/30 bg-[#00C9A7]/10 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#00C9A7] animate-pulse-slow" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#00C9A7]">
                Vadodara, Gujarat, India
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.9 }}
              className="font-serif text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-4 tracking-tight"
            >
              Parul<br />
              <span className="bg-gradient-to-r from-[#00C9A7] to-[#00AEEF] bg-clip-text text-transparent">
                Chemicals
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
            >
              Leading Manufacturer of Diethyl Phthalate &amp; Triethyl Citrate —
              trusted by pharmaceutical, food, cosmetics &amp; agrochemical industries worldwide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/products" className="btn-glow px-8 py-4 rounded-xl text-base font-bold flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/>
                  <path d="M16 3H8l-2 4h12l-2-4z"/>
                </svg>
                <span>Explore Products</span>
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl text-base font-bold text-white border border-white/25 hover:border-white/50 hover:bg-white/5 transition-all duration-300 flex items-center gap-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                Contact Us
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex gap-8 mt-12 pt-8 border-t border-white/10"
            >
              {[['15+','Years'], ['500+','Clients'], ['9','Certifications'], ['8+','Countries']].map(([v, l]) => (
                <div key={l} className="text-center">
                  <div className="text-2xl font-black text-white tracking-tight">{v}</div>
                  <div className="text-xs text-white/40 font-medium mt-1">{l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-white/30 tracking-widest uppercase rotate-90 origin-center">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#00C9A7] to-transparent" />
      </motion.div>
    </section>
  )
}
