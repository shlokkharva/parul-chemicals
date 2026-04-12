'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function AdminPage() {
  const [distributors, setDistributors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [flash, setFlash] = useState('')
  const [genDist, setGenDist] = useState<any>(null)
  const [filter, setFilter] = useState('all')

  const fetchDistributors = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/distributors')
    const data = await res.json()
    setDistributors(data.distributors || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchDistributors()
  }, [])

  const handleAction = async (action: string, id: string) => {
    const res = await fetch('/api/admin/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, id })
    })
    const data = await res.json()
    if (data.success) {
      if (action === 'approve') {
        setGenDist(data.distributor)
        setFlash('approved')
      } else if (action === 'reject') {
        setFlash('rejected')
        setGenDist(null)
      } else if (action === 'delete') {
        setFlash('deleted')
        setGenDist(null)
      }
      fetchDistributors()
    }
  }

  const filtered = filter === 'all' ? distributors : distributors.filter(d => d.status === filter)

  return (
    <div className="min-h-screen bg-[#0B1F3A] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-white/50 text-sm">Manage distributor applications and access.</p>
          </div>
          <div className="flex gap-2">
            {['all', 'pending', 'approved', 'rejected'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  filter === f
                    ? 'bg-[#00C9A7] text-[#0B1F3A]'
                    : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {flash === 'approved' && genDist && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-6 bg-[#00C9A7]/10 border border-[#00C9A7]/30 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-[#00C9A7] font-bold text-lg mb-1 flex items-center gap-2">✅ Application Approved!</div>
              <p className="text-white/60 text-sm">Credentials have been generated for <strong className="text-white">{genDist.name}</strong> ({genDist.company}).</p>
            </div>
            <div className="bg-[#0D1B2E] border border-white/10 rounded-xl p-4 flex gap-6 shrink-0 shadow-lg">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#00C9A7] mb-1 font-bold">Login ID (Phone)</p>
                <code className="text-white bg-white/5 px-2 py-1 rounded text-sm select-all">{genDist.phone}</code>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#00C9A7] mb-1 font-bold">Generated Password</p>
                <code className="text-white bg-white/5 px-2 py-1 rounded text-sm select-all">{genDist.password}</code>
              </div>
            </div>
          </motion.div>
        )}

        {flash === 'rejected' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm font-semibold">
            Application rejected.
          </motion.div>
        )}
        {flash === 'deleted' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 p-4 bg-white/5 border border-white/10 rounded-xl text-white/60 text-sm font-semibold">
            Record deleted successfully.
          </motion.div>
        )}

        {loading ? (
          <div className="text-center py-20 text-white/40 animate-pulse">Loading data...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-[#0D1B2E] border border-white/5 rounded-3xl">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-white/50 text-base">No {filter === 'all' ? '' : filter} distributor requests found.</p>
          </div>
        ) : (
          <div className="bg-[#0D1B2E] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5">
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Date</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Applicant</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Details</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Product Int.</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/40 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.map(d => (
                    <tr key={d.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-5 align-top">
                        <div className="text-xs text-white/60">{new Date(d.appliedAt).toLocaleDateString()}</div>
                        <div className="text-[10px] text-white/30 truncate">{d.id.substring(0,8)}</div>
                      </td>
                      <td className="px-6 py-5 align-top">
                        <div className="font-bold text-white text-sm mb-1">{d.name}</div>
                        <div className="text-xs text-[#00C9A7] font-mono">{d.phone}</div>
                        <div className="text-xs text-white/40">{d.email}</div>
                      </td>
                      <td className="px-6 py-5 align-top">
                        <div className="font-medium text-white/80 text-sm mb-1">{d.company}</div>
                        <div className="text-xs text-white/50">📍 {d.location}</div>
                      </td>
                      <td className="px-6 py-5 align-top">
                        <div className="text-sm text-white/80 mb-1">{d.product}</div>
                        <div className="text-xs font-semibold text-white/40 bg-white/5 inline-block px-2 py-0.5 rounded">{d.quantity}</div>
                      </td>
                      <td className="px-6 py-5 align-top">
                        {d.status === 'pending' && <span className="inline-flex px-2 py-1 bg-yellow-500/20 text-yellow-500 text-[10px] font-bold uppercase tracking-widest rounded">Pending</span>}
                        {d.status === 'approved' && <span className="inline-flex px-2 py-1 bg-[#00C9A7]/20 text-[#00C9A7] text-[10px] font-bold uppercase tracking-widest rounded">Approved</span>}
                        {d.status === 'rejected' && <span className="inline-flex px-2 py-1 bg-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded">Rejected</span>}
                      </td>
                      <td className="px-6 py-5 align-top text-right">
                        <div className="flex justify-end gap-2">
                          {d.status === 'pending' && (
                            <>
                              <button onClick={() => handleAction('approve', d.id)} className="px-3 py-1.5 bg-[#00C9A7]/20 text-[#00C9A7] hover:bg-[#00C9A7] hover:text-[#0B1F3A] rounded shadow text-xs font-bold transition-all">Approve</button>
                              <button onClick={() => handleAction('reject', d.id)} className="px-3 py-1.5 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded shadow text-xs font-bold transition-all">Reject</button>
                            </>
                          )}
                          <button onClick={() => handleAction('delete', d.id)} className="px-3 py-1.5 text-white/30 hover:text-red-400 rounded transition-all text-sm" title="Delete">🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
