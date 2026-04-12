import Link from 'next/link'
import { SITE, NAV } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="bg-[#060F1E] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-teal-gradient flex items-center justify-content-center shadow-glow-teal">
                <span className="text-white font-black text-sm mx-auto block text-center">PC</span>
              </div>
              <div>
                <span className="block font-serif font-bold text-white text-lg">Parul Chemicals</span>
                <span className="block text-[9px] font-semibold tracking-widest uppercase text-[#00C9A7]">Precision Chemistry</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Leading manufacturer of high-purity Diethyl Phthalate (DEP) and Triethyl Citrate (TEC), trusted by pharmaceutical, agrochemical, food, and cosmetics industries.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { label: 'LinkedIn', href: '#', icon: 'in' },
                { label: 'WhatsApp', href: `https://wa.me/919427784082`, icon: 'W' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:border-[#00C9A7] hover:text-[#00C9A7] transition-all text-xs font-bold"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#00C9A7] mb-5">Company</h4>
            <ul className="space-y-3">
              {NAV.map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/buy" className="text-sm text-white/50 hover:text-[#00C9A7] transition-colors">
                  Distributor Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#00C9A7] mb-5">Contact</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li className="flex items-start gap-2">
                <span className="text-[#00C9A7] mt-0.5">📍</span>
                <span>{SITE.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#00C9A7]">📞</span>
                <a href={`tel:${SITE.phone}`} className="hover:text-white transition-colors">{SITE.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#00C9A7]">✉️</span>
                <a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors break-all">{SITE.email}</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#00C9A7]">🏷️</span>
                <span>GSTIN: {SITE.gstin}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
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
