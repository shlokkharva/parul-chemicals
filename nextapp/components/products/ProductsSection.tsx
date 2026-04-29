'use client'
import { useRef, useCallback, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { PRODUCTS } from '@/lib/data'
import ProductModal, { Product } from './ProductModal'

function ProductCard({ product, index, onOpen }: { product: Product; index: number; onOpen: (p: Product) => void }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -6
    const rotateY = ((x - centerX) / centerX) * 6
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
        onClick={() => onOpen(product)}
        className="product-card-wrap product-tilt bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden cursor-pointer h-full group"
        style={{ transition: 'transform 0.08s ease, box-shadow 0.3s ease, border-color 0.3s ease', boxShadow: '0 4px 24px rgba(15,28,51,0.07)' }}
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden" style={{ background: 'linear-gradient(135deg, #EEF4FB 0%, #E8F6F6 100%)' }}>
          <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
          {/* Badge */}
          <div
            className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-sm"
            style={{ background: 'rgba(255, 255, 255, 0.95)', border: `1.5px solid ${product.color}`, color: '#0F1C33' }}
          >
            {product.badge}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="text-xl font-bold text-[#0F1C33] leading-tight group-hover:text-[#4DA8DA] transition-colors">{product.name}</h3>
              <p className="text-sm font-mono font-bold mt-1" style={{ color: product.color }}>{product.abbr}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-[#94A3B8]">CAS No.</p>
              <p className="text-xs font-mono text-[#4A5568] mt-0.5">{product.cas}</p>
            </div>
          </div>

          <p className="text-[#4A5568] text-sm leading-relaxed mb-4 line-clamp-3">{product.desc}</p>

          {/* Features */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {product.features.slice(0, 3).map(f => (
              <span key={f} className="px-2 py-1 text-[10px] font-semibold rounded-lg bg-[#F4F6FA] text-[#4A5568] border border-[#E2E8F0]">
                {f}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              className="flex-1 py-2.5 rounded-xl text-sm font-bold text-center transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${product.color}, ${product.color}DD)`,
                border: `1.5px solid ${product.color}`,
                color: '#FFFFFF',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              View Detailed Specs
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProductsSection() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <section id="products" className="py-28 hex-bg relative overflow-hidden">
      <div className="absolute inset-0 chemical-grid opacity-[0.4] pointer-events-none" />
      
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(77,168,218,0.08) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(14,165,160,0.07) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="section-tag mb-3">OUR PRODUCTS</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0F1C33] mb-4">
            Precision-Engineered<br />
            <span style={{ background: 'linear-gradient(135deg, #4DA8DA, #0EA5A0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Chemical Solutions</span>
          </h2>
          <p className="text-[#4A5568] text-lg max-w-xl mx-auto">
            High-purity plasticizers manufactured to international standards for pharmaceutical, food, and cosmetics industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p as Product} index={i} onOpen={setSelectedProduct} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/products" className="btn-navy px-8 py-3.5 rounded-full text-sm font-bold inline-flex items-center gap-2">
            Explore All Products
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  )
}
