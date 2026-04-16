'use client'
import Link from 'next/link'
import { SITE, NAV } from '@/lib/data'

export default function Footer() {
  return (
    <footer style={{ background: '#0D2137', borderTop: '1px solid rgba(255,255,255,0.05)' }} className="pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-2">
              <img src="/parul_logo.webp" alt="Parul Chemicals" className="h-8 w-auto object-contain drop-shadow-md" />
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Leading manufacturer of high-purity Diethyl Phthalate (DEP) and Triethyl Citrate (TEC), trusted by pharmaceutical, agrochemical, food, and cosmetics industries.
            </p>
            <div className="flex gap-3 mt-2">
              {[
                { label: 'LinkedIn', href: 'https://www.linkedin.com/company/parul-chemicals/', icon: 'in' },
                { label: 'WhatsApp', href: `https://wa.me/919427784082`, icon: 'W' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 transition-all text-xs font-bold border border-white/10 hover:border-[#4DA8DA] hover:text-[#4DA8DA]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#4DA8DA] mb-2">Company</h4>
            <ul className="space-y-1">
              {NAV.map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#4DA8DA] mb-2">Contact</h4>
            <ul className="space-y-1 text-sm text-white/50">
              <li className="flex items-start gap-2">
                <span className="text-[#4DA8DA] mt-0.5 shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                <span>{SITE.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#4DA8DA] shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                </span>
                <a href={`tel:${SITE.phone}`} className="hover:text-white transition-colors">{SITE.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#4DA8DA] shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </span>
                <a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors break-all">{SITE.email}</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#4DA8DA] shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-4 0v2M8 7V5a2 2 0 014 0"/></svg>
                </span>
                <span>GSTIN: {SITE.gstin}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Parul Chemicals. All rights reserved.
          </p>
          <p className="text-xs text-white/20 italic">
            Also manufacturers of F.S. Calcival — Animal Nutrition Supplement
          </p>
        </div>
      </div>
    </footer>
  )
}
