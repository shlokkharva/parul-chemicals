'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function DistributorPortal({ params }: { params: { id: string } }) {
  const [dist, setDist] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDist = async () => {
      // Small trick: since we don't have a specific API to fetch me by ID from the client,
      // and finding by phone requires auth. Let's just create a fast API to fetch by ID.
      const res = await fetch(`/api/distributor/${params.id}`)
      const data = await res.json()
      setDist(data.distributor || null)
      setLoading(false)
    }
    fetchDist()
  }, [params.id])

  if (loading) return <div className="min-h-screen bg-[#0B1F3A] flex items-center justify-center text-white/50 animate-pulse">Loading secure portal...</div>
  if (!dist) return <div className="min-h-screen bg-[#0B1F3A] flex items-center justify-center text-white/50">Session expired or invalid. Please <Link href="/buy" className="text-[#00C9A7] mx-1">login again</Link>.</div>

  return (
    <div className="min-h-screen bg-[#0B1F3A] pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-96 h-96 bg-[#00C9A7]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-[#0D1B2E] border border-white/10 rounded-3xl p-8">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-teal-gradient flex items-center justify-center shadow-glow-teal text-2xl">
              {dist.name.charAt(0)}
            </div>
            <div>
              <h1 className="font-serif text-3xl font-bold text-white mb-1">Welcome, {dist.name}!</h1>
              <p className="text-[#00C9A7] text-sm font-semibold">{dist.company} <span className="text-white/40 font-normal mx-1">•</span> Authorized Distributor</p>
            </div>
          </div>
          <button onClick={() => window.location.href='/buy'} className="px-5 py-2.5 rounded-xl border border-white/15 text-white/50 hover:text-white hover:border-[#00C9A7]/50 text-sm font-bold transition-all">
            Logout
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Account info */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="md:col-span-1 space-y-6">
            <div className="bg-[#0D1B2E] border border-white/10 rounded-3xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Account Details</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-[10px] uppercase text-white/30 mb-0.5">Phone (Login ID)</div>
                  <div className="text-sm text-white font-mono">{dist.phone}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-white/30 mb-0.5">Email</div>
                  <div className="text-sm text-white">{dist.email}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-white/30 mb-0.5">Location</div>
                  <div className="text-sm text-white">{dist.location}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-white/30 mb-0.5">Approval Date</div>
                  <div className="text-sm text-white">{new Date(dist.approvedAt).toLocaleDateString()}</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#00C9A7]/20 to-transparent border border-[#00C9A7]/30 rounded-3xl p-6">
              <h3 className="text-sm font-bold text-white mb-2 text-[#00C9A7]">Dedicated Support</h3>
              <p className="text-xs text-white/60 mb-4">Your account manager is available 24/7 for order placements and inquiries.</p>
              <a href="tel:+919427784082" className="block w-full py-2 bg-[#00C9A7] text-[#0B1F3A] text-center rounded-lg text-sm font-bold hover:bg-[#00AEEF] transition-colors">Call Manager</a>
            </div>
          </motion.div>

          {/* Quick Actions / Place Order */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="md:col-span-2">
            <div className="bg-[#0D1B2E] border border-white/10 rounded-3xl p-8 mb-6">
              <h3 className="font-serif text-2xl font-bold text-white mb-2">Request New Order</h3>
              <p className="text-sm text-white/50 mb-6">Select products and specify quantities. Our team will generate an invoice with your wholesale discounts applied.</p>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-white/10 rounded-xl bg-white/5 cursor-pointer hover:border-[#00C9A7]/50 transition-colors">
                    <div className="text-[#00AEEF] font-bold text-lg mb-1">DEP</div>
                    <div className="text-xs text-white/60">Diethyl Phthalate</div>
                  </div>
                  <div className="p-4 border border-white/10 rounded-xl bg-white/5 cursor-pointer hover:border-[#00C9A7]/50 transition-colors">
                    <div className="text-[#00C9A7] font-bold text-lg mb-1">TEC</div>
                    <div className="text-xs text-white/60">Triethyl Citrate</div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-white/40 mb-2">Order Quantity / Comments</label>
                  <textarea rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#00C9A7]/50" placeholder="e.g. Need 5 drums of TEC ASAP..." />
                </div>
                <button className="btn-glow w-full py-3 rounded-xl font-bold text-sm">Send Order Request</button>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-[#0D1B2E] border border-white/10 rounded-3xl p-8">
              <h3 className="font-serif text-xl font-bold text-white mb-4">Technical Documents (TDS/COA)</h3>
              <div className="grid grid-cols-2 gap-3">
                {['DEP - Technical Data Sheet', 'TEC - Technical Data Sheet', 'DEP - Certificate of Analysis', 'TEC - Certificate of Analysis'].map(doc => (
                  <div key={doc} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                    <span className="text-xs font-medium text-white/70 group-hover:text-white">{doc}</span>
                    <span className="text-white/30 group-hover:text-[#00C9A7]">↓</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
