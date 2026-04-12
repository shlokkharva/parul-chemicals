'use client'
import { useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { PRODUCTS } from '@/lib/data'

function ProductCard({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)'
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="product-card-wrap product-tilt bg-[#0D1B2E] border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 h-full"
        style={{ transition: 'transform 0.08s ease, box-shadow 0.3s ease, border-color 0.3s ease' }}
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E] via-transparent to-transparent" />
          <div
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold tracking-wide text-white"
            style={{ background: `${product.color}22`, border: `1px solid ${product.color}55`, color: product.color }}
          >
            {product.badge}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="text-xl font-bold text-white leading-tight">{product.name}</h3>
              <p className="text-sm font-mono font-bold mt-1" style={{ color: product.color }}>{product.abbr}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-white/40">CAS No.</p>
              <p className="text-xs font-mono text-white/70 mt-0.5">{product.cas}</p>
            </div>
          </div>

          <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-3">{product.desc}</p>

          {/* Features */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {product.features.slice(0, 3).map(f => (
              <span key={f} className="px-2 py-1 text-[10px] font-semibold rounded-md bg-white/5 text-white/50 border border-white/10">
                {f}
              </span>
            ))}
          </div>

          {/* Apps */}
          <p className="text-xs text-white/30 mb-5">{product.apps}</p>

          <div className="flex gap-3">
            <Link
              href={`/products#${product.id}`}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold text-center transition-all duration-300 text-white"
              style={{
                background: `linear-gradient(135deg, ${product.color}22, ${product.color}11)`,
                border: `1px solid ${product.color}44`,
                color: product.color,
              }}
            >
              View Details
            </Link>
            {product.msds && (
              <a
                href={product.msds}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl text-sm font-bold border border-white/10 text-white/50 hover:border-white/30 hover:text-white transition-all"
              >
                MSDS
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProductsSection() {
  return (
    <section id="products" className="py-24 bg-[#0B1F3A]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-5 h-px bg-[#00C9A7]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#00C9A7]">Our Products</span>
            <div className="w-5 h-px bg-[#00C9A7]" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Precision-Engineered<br />
            <span className="bg-gradient-to-r from-[#00C9A7] to-[#00AEEF] bg-clip-text text-transparent">Chemical Solutions</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            High-purity plasticizers manufactured to international standards for pharmaceutical, food, and cosmetics industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/products" className="btn-glow px-8 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2">
            <span>View Full Product Details</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
