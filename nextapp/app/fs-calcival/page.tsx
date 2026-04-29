'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import PageHero from '@/components/PageHero'
import { FS_CALCIVAL_DATA } from '@/lib/data'

export default function FSCalcivalPage() {
  const [selectedPack, setSelectedPack] = useState<string | null>(null)

  return (
    <div className="bg-white">
      <PageHero 
        tag="ANIMAL NUTRITION" 
        title={<>F. S. <span className="text-[#F59E0B]">Calcival</span></>} 
        subtitle={FS_CALCIVAL_DATA.tagline} 
      />

      {/* Intro Section */}
      <section className="py-24 bg-gradient-to-br from-white to-[#FFFBEB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-bold text-[#0F1C33] mb-8"
              >
                Welcome to a New Era in <br/>
                <span className="text-[#F59E0B]">Animal Nutrition</span>
              </motion.h2>
              <p className="text-[#4A5568] text-lg leading-relaxed mb-6">
                {FS_CALCIVAL_DATA.description}
              </p>
              <p className="text-[#4A5568] text-lg leading-relaxed mb-10">
                {FS_CALCIVAL_DATA.longDescription}
              </p>
              <div className="flex flex-wrap gap-4">
                {FS_CALCIVAL_DATA.brochures.map(b => (
                  <a 
                    key={b.lang}
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-2xl bg-white border border-[#F59E0B]/20 text-sm font-bold text-[#0F1C33] hover:bg-[#F59E0B] hover:text-white transition-all shadow-sm"
                  >
                    {b.lang} Brochure
                  </a>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative flex justify-center items-center">
              <div className="flex flex-col gap-4 max-w-md w-full">
                <div className="flex gap-4">
                  <div className="w-1/2 relative rounded-[2rem] overflow-hidden shadow-xl border-2 border-white">
                    <img src="/f.s calcival/healthy cow.webp" alt="Healthy Cow" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-1/2 flex flex-col gap-4">
                    <div className="relative rounded-[1.5rem] overflow-hidden shadow-lg border-2 border-white aspect-[3/2]">
                      <img src="/f.s calcival/majestic horse.webp" alt="Majestic Horse" className="w-full h-full object-cover" />
                    </div>
                    <div className="relative rounded-[1.5rem] overflow-hidden shadow-lg border-2 border-white aspect-[3/2]">
                      <img src="/f.s calcival/feeding.webp" alt="Feeding" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-lg border-2 border-white">
                  <img src="/f.s calcival/Proven result.webp" alt="Proven Results" className="w-full h-auto object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 bg-[#0D2137] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <svg width="100%" height="100%">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <p className="text-[#F59E0B] font-black tracking-widest text-xs uppercase mb-4">THE SUPERIOR CHOICE</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white">Why Choose F.S. Calcival?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FS_CALCIVAL_DATA.benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/20 text-[#F59E0B] flex items-center justify-center mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{benefit.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 p-10 rounded-[3rem] bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="max-w-2xl">
                <h3 className="text-2xl font-bold mb-4">Unlocking the Energy of Calcium</h3>
                <p className="opacity-90 leading-relaxed mb-6">
                  While traditional calcium supplements can lead to issues like weight loss and irregular heat cycles, F.S. Calcival stands apart. Our formulation contains essential multivitamins, herbs, and minerals, ensuring increased food intake and superior milk production.
                </p>
                <div className="flex gap-4">
                  <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">Trusted</span>
                  <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">Verified</span>
                  <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">Proven</span>
                </div>
              </div>
              <div className="text-center lg:text-right">
                <p className="text-sm opacity-80 mb-2 uppercase tracking-widest font-bold">Monthly Profit Potential</p>
                <p className="text-6xl font-black">₹1,500+</p>
                <p className="text-xs opacity-70 mt-2">Up to ₹5,988 in summer months</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packaging Selection Section */}
      <section className="py-24 bg-white" id="products">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-tag mb-4">OUR PACKAGING</p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0F1C33]">Available Variants</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {FS_CALCIVAL_DATA.packaging.map((pack, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedPack(`${pack.size} ${pack.type}`)}
                className={`p-6 rounded-[2.5rem] border-2 transition-all cursor-pointer text-center group ${
                  selectedPack === `${pack.size} ${pack.type}` 
                  ? 'border-[#F59E0B] bg-[#FFFBEB] shadow-xl shadow-orange-500/10' 
                  : 'border-slate-100 hover:border-[#F59E0B]/30 hover:bg-slate-50'
                }`}
              >
                <div className="aspect-[4/5] rounded-3xl bg-white mb-6 p-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src={pack.image} 
                    alt={pack.size} 
                    className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/400x500?text=FS+Calcival'
                    }}
                  />
                </div>
                <h4 className="font-black text-[#0F1C33] text-lg">{pack.size}</h4>
                <p className="text-xs font-bold text-[#4A5568] uppercase tracking-widest mt-1">{pack.type}</p>
                
                {selectedPack === `${pack.size} ${pack.type}` && (
                  <Link 
                    href={`/contact?product=FS+Calcival&variant=${pack.size}+${pack.type}`}
                    className="mt-6 block py-3 rounded-2xl bg-[#F59E0B] text-white text-xs font-bold uppercase tracking-widest animate-pulse"
                  >
                    Select & Inquire
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dosage Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/2">
              <p className="section-tag mb-4">RECOMMENDED USAGE</p>
              <h2 className="text-3xl md:text-5xl font-bold text-[#0F1C33] mb-8">Dosage Pattern</h2>
              <div className="space-y-6">
                {FS_CALCIVAL_DATA.dosage.map((d, i) => (
                  <div key={i} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
                    <h3 className="text-xl font-bold text-[#F59E0B] mb-3">{d.stage}</h3>
                    <p className="text-[#4A5568] leading-relaxed">{d.instruction}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 rounded-2xl border border-blue-100 bg-blue-50/50 flex items-start gap-4">
                <div className="text-blue-500 mt-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                </div>
                <p className="text-sm text-blue-800 italic">
                  Always consult your local animal doctor for personalized advice and get ready to witness the difference with F.S. Calcival.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 bg-[#0D2137] rounded-[3rem] p-12 text-white flex flex-col justify-center">
              <h3 className="text-3xl font-bold mb-6">Your Livestock Deserves the Best</h3>
              <p className="text-white/60 text-lg leading-relaxed mb-10">
                F.S. Calcival is more than a calcium supplement; it’s a game-changer for livestock. Invest in their health, and watch your profits and production soar.
              </p>
              <Link 
                href="/contact"
                className="w-full py-5 rounded-2xl bg-[#F59E0B] text-white text-center font-bold text-lg hover:bg-[#D97706] transition-all shadow-xl shadow-orange-500/20"
              >
                Contact Now to Order
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
