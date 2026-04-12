'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1600)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="page-loader"
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <p className="font-serif text-3xl font-bold text-white mb-1">Parul Chemicals</p>
            <p className="text-sm text-[#00C9A7] tracking-widest uppercase font-medium">Precision Chemistry</p>
          </motion.div>
          <div className="loader-bar">
            <div className="loader-fill" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
