'use client'
import { useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { PRODUCTS } from '@/lib/data'
import DistributorCTA from '@/components/DistributorCTA'

function ProductDetailCard({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current; if (!card) return
    const rect = card.getBoundingClientRect()
    const rotateX = ((e.clientY - rect.top - rect.height/2) / (rect.height/2)) * -6
    const rotateY = ((e.clientX - rect.left - rect.width/2) / (rect.width/2)) * 6
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`
  }, [])
  const resetTilt = useCallback(() => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)'
  }, [])

  return (
    <motion.div
      id={product.id}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="scroll-mt-24"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        className="product-card-wrap bg-[#0D1B2E] border border-white/10 rounded-3xl overflow-hidden"
        style={{ transition: 'transform 0.08s ease, box-shadow 0.3s ease, border-color 0.3s ease' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="relative h-72 lg:h-full min-h-[320px]">
            <Image src={product.image} alt={product.name} fill className="object-cover" />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(135deg, ${product.color}22 0%, transparent 70%)` }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                style={{ background: `${product.color}22`, color: product.color, border: `1px solid ${product.color}44` }}
              >
                {product.badge}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="p-8 lg:p-10">
            <h2 className="font-serif text-3xl font-bold text-white mb-1">{product.name}</h2>
            <p className="font-mono font-bold text-lg mb-4" style={{ color: product.color }}>{product.abbr}</p>

            <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-xl bg-white/5">
              <div>
                <p className="text-xs text-white/30 mb-1">CAS Number</p>
                <p className="font-mono text-sm text-white/80 font-bold">{product.cas}</p>
              </div>
              <div>
                <p className="text-xs text-white/30 mb-1">Formula</p>
                <p className="font-mono text-sm text-white/80 font-bold">{product.formula}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-white/30 mb-1">Applications</p>
                <p className="text-sm text-white/70 font-medium">{product.apps}</p>
              </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed mb-6">{product.desc}</p>

            {/* Features */}
            <div className="mb-6">
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: product.color }}>Key Features</p>
              <div className="grid grid-cols-2 gap-2">
                {product.features.map(f => (
                  <div key={f} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: product.color }} />
                    <span className="text-sm text-white/60">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Industries */}
            <div className="mb-8">
              <p className="text-xs font-bold tracking-widest uppercase mb-3 text-white/40">Industries Served</p>
              <div className="flex flex-wrap gap-2">
                {product.industries.map(ind => (
                  <span key={ind} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 border border-white/10 text-white/60">{ind}</span>
                ))}
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <Link href="/contact" className="btn-glow px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
                <span>Request Quote</span>
              </Link>
              {product.msds && (
                <a href={product.msds} target="_blank" rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl text-sm font-bold border border-white/15 text-white/60 hover:border-white/30 hover:text-white transition-all flex items-center gap-2">
                  Download MSDS
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProductsPage() {
  return (
    <>
      {/* Page Hero */}
      <div className="relative pt-36 pb-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #060F1E 0%, #0B1F3A 100%)' }}>
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize: '40px 40px' }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00C9A7]/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-5 h-px bg-[#00C9A7]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#00C9A7]">Our Products</span>
            <div className="w-5 h-px bg-[#00C9A7]" />
          </div>
          <h1 className="font-serif text-5xl font-bold text-white mb-4">Chemical Products</h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            High-purity specialty plasticizers manufactured to international standards.
          </p>
        </div>
      </div>

      {/* Products */}
      <section className="py-20 bg-[#0B1F3A]">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          {PRODUCTS.map((p, i) => (
            <ProductDetailCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      <DistributorCTA />
    </>
  )
}
