'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV } from '@/lib/data'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // On all pages, the hero is now dark/video, so links should be white when not scrolled
  const linksWhite = !scrolled

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'nav-scrolled' 
            : 'bg-gradient-to-b from-black/40 via-black/10 to-transparent py-5'
        }`}
      >
        <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-[72px]' : 'h-[110px]'}`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <img 
              src="/parul_logo.webp" 
              alt="Parul Chemicals" 
              className={`w-auto object-contain transition-all duration-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] group-hover:scale-105 ${scrolled ? 'h-16' : 'h-28'}`} 
            />
          </Link>

          {/* Desktop Nav in Glass Pill */}
          <nav className={`hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-300 ${
            linksWhite ? 'bg-[#0F1C33]/60 backdrop-blur-lg border border-white/15 shadow-2xl' : ''
          }`}>
            {NAV.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 relative group ${
                  linksWhite
                    ? 'text-white hover:text-[#4DA8DA] hover:bg-white/5'
                    : 'text-[#4A5568] hover:text-[#0F1C33] hover:bg-black/5'
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-1.5 left-4 right-4 h-[2px] bg-[#4DA8DA] rounded-full shadow-[0_0_8px_rgba(77,168,218,0.6)]"
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="btn-primary px-6 py-3 text-sm font-bold tracking-wide flex items-center gap-2 shadow-lg"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Get in Touch
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden flex flex-col gap-[6px] p-2 relative z-50"
            aria-label="Menu"
          >
            <motion.span animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-[2.5px] rounded transition-all shadow-sm ${linksWhite ? 'bg-white' : 'bg-[#0F1C33]'}`}/>
            <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }}
              className={`block w-6 h-[2.5px] rounded transition-all shadow-sm ${linksWhite ? 'bg-white' : 'bg-[#0F1C33]'}`}/>
            <motion.span animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-[2.5px] rounded transition-all shadow-sm ${linksWhite ? 'bg-white' : 'bg-[#0F1C33]'}`}/>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white flex flex-col pt-24 px-8 shadow-2xl"
          >
            {NAV.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-2xl font-semibold text-[#0F1C33] hover:text-[#4DA8DA] border-b border-[#E2E8F0] transition-colors"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-8 px-6 py-4 rounded-2xl text-lg font-bold text-center"
            >
              Get in Touch
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
