'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const PERKS = [
  { icon: '💰', text: 'Competitive wholesale pricing' },
  { icon: '🚚', text: 'Priority delivery & logistics support' },
  { icon: '📋', text: 'Dedicated account manager' },
  { icon: '📄', text: 'Access to full TDS & COA documents' },
  { icon: '🏅', text: 'Authorized distributor certificate' },
  { icon: '📞', text: '24/7 technical support' },
]

const PRODUCTS_LIST = ['Diethyl Phthalate (DEP)', 'Triethyl Citrate (TEC)', 'Both Products']

export default function BuyPage() {
  const [tab, setTab]             = useState<'register' | 'login'>('register')
  const [success, setSuccess]     = useState(false)
  const [loginError, setLoginError] = useState('')
  const [regError, setRegError]   = useState('')
  const [loadingReg, setLoadingReg] = useState(false)
  const [loadingLogin, setLoadingLogin] = useState(false)
  const [showPwd, setShowPwd]     = useState(false)

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoadingReg(true)
    setRegError('')
    const form = new FormData(e.currentTarget)
    const res = await fetch('/api/buy/register', { method: 'POST', body: form })
    const data = await res.json()
    setLoadingReg(false)
    if (data.error === 'phone_exists') { setRegError('A registration with this phone number already exists.'); return }
    if (data.success) setSuccess(true)
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoadingLogin(true)
    setLoginError('')
    const form = new FormData(e.currentTarget)
    const res = await fetch('/api/buy/login', { method: 'POST', body: form })
    const data = await res.json()
    setLoadingLogin(false)
    if (data.error) { setLoginError(data.error); return }
    if (data.redirect) window.location.href = data.redirect
  }

  return (
    <>
      {/* Hero */}
      <div className="relative pt-36 pb-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #060F1E 0%, #0B1F3A 100%)' }}>
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize: '40px 40px' }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-5 h-px bg-[#00C9A7]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#00C9A7]">Distributor Portal</span>
            <div className="w-5 h-px bg-[#00C9A7]" />
          </div>
          <h1 className="font-serif text-5xl font-bold text-white mb-4">Buy Parul Chemicals Products</h1>
          <p className="text-white/50 text-lg">Register as an authorized distributor or login with your approved credentials.</p>
        </div>
      </div>

      <section className="py-16 bg-[#0B1F3A] min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          {/* Tabs */}
          <div className="flex gap-1 bg-white/5 rounded-2xl p-1 mb-10 max-w-sm">
            {(['register', 'login'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${tab === t ? 'bg-[#00C9A7] text-[#0B1F3A]' : 'text-white/50 hover:text-white'}`}>
                {t === 'register' ? '🙋 Register' : '🔐 Login'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* REGISTER */}
            {tab === 'register' && (
              <motion.div key="register" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                {success ? (
                  <div className="max-w-lg mx-auto text-center py-16 bg-[#0D1B2E] border border-[#00C9A7]/25 rounded-3xl px-8">
                    <div className="w-20 h-20 rounded-full bg-[#00C9A7]/15 border border-[#00C9A7]/30 flex items-center justify-center mx-auto mb-6 text-4xl">✅</div>
                    <h2 className="font-serif text-3xl font-bold text-white mb-3">Application Submitted!</h2>
                    <p className="text-white/60 mb-6">Your distributor application has been received. Our admin team will review it within <strong className="text-white">24–48 hours</strong>.</p>
                    <p className="text-sm text-white/40">Once approved, your Login ID will be your <strong className="text-[#00C9A7]">phone number</strong> and a secure password will be shared.</p>
                    <button onClick={() => setSuccess(false)} className="mt-8 px-6 py-3 rounded-xl border border-white/15 text-white/60 hover:text-white text-sm font-semibold transition-all">
                      Register Another
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Left info */}
                    <div className="lg:col-span-2">
                      <h2 className="font-serif text-3xl font-bold text-white mb-3">Become an Authorized Distributor</h2>
                      <p className="text-white/55 text-base leading-relaxed mb-6">Join our trusted distributor network and get exclusive access to wholesale pricing, priority logistics, and full technical support.</p>
                      <div className="space-y-3">
                        {PERKS.map(p => (
                          <div key={p.text} className="flex items-center gap-3 text-sm text-white/60">
                            <span className="text-xl shrink-0">{p.icon}</span>
                            <span>{p.text}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 p-4 rounded-xl bg-[#00C9A7]/10 border border-[#00C9A7]/25">
                        <p className="text-sm text-white/70">
                          🔐 <strong className="text-white">After approval:</strong> Your <strong className="text-[#00C9A7]">Login ID = Phone Number</strong>. A secure password will be generated and shared with you.
                        </p>
                      </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-3">
                      {regError && (
                        <div className="mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-400">{regError}</div>
                      )}
                      <form onSubmit={handleRegister} className="space-y-4">
                        <p className="text-xs font-bold tracking-widest uppercase text-[#00C9A7] mb-4">Personal Information</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-white/40 mb-2 font-semibold">Full Name *</label>
                            <input name="name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00C9A7]/50 transition-all" placeholder="Rajesh Patel" />
                          </div>
                          <div>
                            <label className="block text-xs text-white/40 mb-2 font-semibold">Phone Number * <small className="text-[#00C9A7]">(Your Login ID)</small></label>
                            <input name="phone" type="tel" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00C9A7]/50 transition-all" placeholder="+91 98765 43210" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-white/40 mb-2 font-semibold">Email *</label>
                            <input name="email" type="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00C9A7]/50 transition-all" placeholder="rajesh@example.com" />
                          </div>
                          <div>
                            <label className="block text-xs text-white/40 mb-2 font-semibold">Company Name *</label>
                            <input name="company" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00C9A7]/50 transition-all" placeholder="Patel Traders" />
                          </div>
                        </div>
                        <p className="text-xs font-bold tracking-widest uppercase text-[#00C9A7] pt-2">Business Details</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-white/40 mb-2 font-semibold">City / State *</label>
                            <input name="location" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00C9A7]/50 transition-all" placeholder="Ahmedabad, Gujarat" />
                          </div>
                          <div>
                            <label className="block text-xs text-white/40 mb-2 font-semibold">Product Interest *</label>
                            <select name="product" required className="w-full bg-[#0D1B2E] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00C9A7]/50 transition-all">
                              <option value="">— Select —</option>
                              {PRODUCTS_LIST.map(p => <option key={p}>{p}</option>)}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-white/40 mb-2 font-semibold">Expected Monthly Quantity *</label>
                          <input name="quantity" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00C9A7]/50 transition-all" placeholder="e.g. 500 Litres/month" />
                        </div>
                        <button type="submit" disabled={loadingReg} className="btn-glow w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 mt-2">
                          {loadingReg ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>Submitting...</span></> : <span>Submit Registration Request</span>}
                        </button>
                        <p className="text-center text-xs text-white/30 mt-2">
                          Already approved? <button onClick={() => setTab('login')} className="text-[#00C9A7] font-semibold hover:underline">Login here →</button>
                        </p>
                      </form>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* LOGIN */}
            {tab === 'login' && (
              <motion.div key="login" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div>
                  <div className="w-16 h-16 rounded-full bg-navy/80 border border-white/10 flex items-center justify-center mx-auto mb-5 text-3xl">🔐</div>
                  <h2 className="font-serif text-2xl font-bold text-white text-center mb-1">Distributor Login</h2>
                  <p className="text-white/45 text-sm text-center mb-6">Enter your approved credentials to access the portal.</p>

                  {loginError && (
                    <div className="mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-400">
                      {loginError === 'invalid_credentials' && 'Invalid phone or password.'}
                      {loginError === 'pending' && 'Your application is still pending admin approval.'}
                      {loginError === 'rejected' && 'Your application was not approved. Contact us for info.'}
                    </div>
                  )}

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs text-white/40 mb-2 font-semibold">Phone Number (Login ID) *</label>
                      <input name="phone" type="tel" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00C9A7]/50 transition-all" placeholder="+91 98765 43210" />
                    </div>
                    <div className="relative">
                      <label className="block text-xs text-white/40 mb-2 font-semibold">Password *</label>
                      <input name="password" type={showPwd ? 'text' : 'password'} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00C9A7]/50 transition-all pr-12" placeholder="••••••••" />
                      <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-4 top-8 text-white/30 hover:text-white/70 transition-colors">
                        {showPwd ? '🙈' : '👁️'}
                      </button>
                    </div>
                    <button type="submit" disabled={loadingLogin} className="btn-glow w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2">
                      {loadingLogin ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>Logging in...</span></> : <span>Login to Portal</span>}
                    </button>
                  </form>
                  <div className="flex items-center gap-4 my-5">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-xs text-white/30">Don't have an account?</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>
                  <button onClick={() => setTab('register')} className="w-full py-3 rounded-xl text-sm font-bold border border-white/10 text-white/50 hover:border-[#00C9A7]/30 hover:text-[#00C9A7] transition-all">
                    Register as Distributor
                  </button>
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-6">Distributor Benefits</h3>
                  {[
                    { icon: '📦', title: 'Bulk Order Access', desc: 'Place large quantity orders with negotiated pricing.' },
                    { icon: '🚀', title: 'Priority Processing', desc: 'Your orders get processed before retail customers.' },
                    { icon: '📊', title: 'Order Tracking', desc: 'Track your order history and monthly volumes.' },
                    { icon: '🤝', title: 'Dedicated Support', desc: 'Direct line to your personal account manager.' },
                  ].map(b => (
                    <div key={b.title} className="flex gap-4 mb-5 p-4 rounded-xl border border-white/10 hover:border-[#00C9A7]/25 transition-all">
                      <span className="text-2xl shrink-0">{b.icon}</span>
                      <div>
                        <p className="font-bold text-white text-sm mb-1">{b.title}</p>
                        <p className="text-xs text-white/50">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
