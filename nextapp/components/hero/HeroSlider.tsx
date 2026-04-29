'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

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
        instanceRef.current = new Swiper(swiperRef.current!, {
          modules: [Autoplay, EffectFade, Pagination],
          effect: 'fade',
          fadeEffect: { crossFade: true },
          autoplay: { delay: 8000, disableOnInteraction: false },
          loop: true,
          speed: 1600,
          pagination: { el: '.swiper-pagination', clickable: true },
        })
      })
    })
    return () => { isMounted = false; instanceRef.current?.destroy?.() }
  }, [])

  return (
    <section className="relative h-screen overflow-hidden" id="hero">
      {/* Swiper */}
      <div ref={swiperRef} className="hero-swiper swiper">
        <div className="swiper-wrapper">
          {SLIDES.map((s, i) => (
            <div key={i} className="swiper-slide">
              <div className="hero-slide-bg" style={{ backgroundImage: `url(${s.bg})` }} />
              {/* Dark overlay — reference site uses very dark navy overlay */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,33,55,0.82) 0%, rgba(13,33,55,0.72) 60%, rgba(13,33,55,0.88) 100%)' }} />
            </div>
          ))}
        </div>
        <div className="swiper-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-20" />
      </div>

      {/* Floating 3D molecule decoration */}
      <div className="absolute inset-0 pointer-events-none z-5 overflow-hidden">
        {/* Large rotating ring */}
        <div className="absolute -right-24 top-1/4 w-[400px] h-[400px] opacity-10">
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin-slow w-full h-full">
            <circle cx="200" cy="200" r="180" stroke="#4DA8DA" strokeWidth="1.5" strokeDasharray="8 12"/>
            <circle cx="200" cy="200" r="130" stroke="#4DA8DA" strokeWidth="1" strokeDasharray="4 8"/>
            <circle cx="200" cy="60" r="12" fill="#4DA8DA"/>
            <circle cx="340" cy="200" r="12" fill="#0EA5A0"/>
            <circle cx="200" cy="340" r="12" fill="#4DA8DA"/>
            <circle cx="60" cy="200" r="12" fill="#0EA5A0"/>
            <line x1="200" y1="60" x2="200" y2="340" stroke="#4DA8DA" strokeWidth="0.8" opacity="0.5"/>
            <line x1="60" y1="200" x2="340" y2="200" stroke="#4DA8DA" strokeWidth="0.8" opacity="0.5"/>
          </svg>
        </div>
        {/* Small molecule top-left */}
        <div className="absolute left-8 top-1/3 w-[160px] h-[160px] opacity-15 animate-float">
          <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="80" cy="80" r="12" fill="#4DA8DA"/>
            <circle cx="80" cy="30" r="8" fill="#0EA5A0"/>
            <circle cx="122" cy="55" r="8" fill="#F59E0B"/>
            <circle cx="122" cy="105" r="8" fill="#4DA8DA"/>
            <circle cx="80" cy="130" r="8" fill="#0EA5A0"/>
            <circle cx="38" cy="105" r="8" fill="#F59E0B"/>
            <circle cx="38" cy="55" r="8" fill="#4DA8DA"/>
            <line x1="80" y1="80" x2="80" y2="30" stroke="white" strokeWidth="1" opacity="0.4"/>
            <line x1="80" y1="80" x2="122" y2="55" stroke="white" strokeWidth="1" opacity="0.4"/>
            <line x1="80" y1="80" x2="122" y2="105" stroke="white" strokeWidth="1" opacity="0.4"/>
            <line x1="80" y1="80" x2="80" y2="130" stroke="white" strokeWidth="1" opacity="0.4"/>
            <line x1="80" y1="80" x2="38" y2="105" stroke="white" strokeWidth="1" opacity="0.4"/>
            <line x1="80" y1="80" x2="38" y2="55" stroke="white" strokeWidth="1" opacity="0.4"/>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-4xl"
          >

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.9 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-4 tracking-tight"
            >
              Welcome to<br />
              <span style={{ color: '#4DA8DA' }}>Parul Chemicals.</span><br />
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl opacity-90">Precision Chemistry.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed mb-6 max-w-2xl"
            >
              Parul Chemicals is committed to offering high-quality and innovative plasticizers to enrich all forms of life. 
              We serve Pharmaceutical, Nutrition, Agrochemical, and Industrial customers with customized, cost-effective solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex flex-wrap gap-3 sm:gap-4"
            >
              <Link href="/products"
                className="btn-primary px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm lg:text-base font-bold flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/>
                  <path d="M16 3H8l-2 4h12l-2-4z"/>
                </svg>
                View Products
              </Link>
              <Link href="/about"
                className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm lg:text-base font-bold text-white flex items-center gap-2 transition-all duration-300 border-2 border-white/30 bg-white/8 hover:bg-white/16 hover:border-white/55"
              >
                Know More →
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="grid grid-cols-2 sm:flex sm:gap-8 gap-y-6 mt-10 pt-6"
              style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
            >
              {[['15+','Years'], ['500+','Clients'], ['9+','Certifications'], ['8+','Countries']].map(([v, l]) => (
                <div key={l} className="text-center sm:text-left">
                  <div className="text-xl sm:text-2xl font-black text-white tracking-tight">{v}</div>
                  <div className="text-[10px] sm:text-xs text-white/40 font-medium mt-1">{l}</div>
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
        <div className="w-px h-12 bg-gradient-to-b from-[#4DA8DA] to-transparent" />
      </motion.div>
    </section>
  )
}
