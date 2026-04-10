import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'


export default function DesignModal({ isOpen, onClose }) {
  const [step, setStep] = useState(0)
  const [budget, setBudget] = useState('')
  const [size, setSize] = useState('')
  const [style, setStyle] = useState('')
  const [result, setResult] = useState(null)

  const reset = () => {
    setStep(0)
    setBudget('')
    setSize('')
    setStyle('')
    setResult(null)
  }

  const handleSizeSelect = (s) => {
    setSize(s)
    setStep(2)
  }

  const handleStyleSelect = (s) => {
    setStyle(s)
    onClose()
    reset()
    const el = document.getElementById('lead-capture')
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-velora-black/90 backdrop-blur-md" onClick={() => { onClose(); reset() }} />

          <motion.div
            className="relative z-10 w-full max-w-lg bg-velora-charcoal border border-white/5 overflow-hidden"
            initial={{ scale: 0.9, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="px-6 md:px-8 pt-6 md:pt-8 pb-4 border-b border-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-body text-[10px] tracking-[0.5em] uppercase text-velora-gold block mb-1">
                    AI Kitchen Designer
                  </span>
                  <h3 className="font-heading text-2xl font-light text-velora-cream">
                    Design in 10 Seconds
                  </h3>
                </div>
                <button
                  onClick={() => { onClose(); reset() }}
                  className="text-velora-cream/30 hover:text-velora-cream transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              {/* Progress bar */}
              <div className="flex gap-2 mt-4">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-[2px] flex-1 transition-all duration-500 ${
                      step >= i ? 'bg-velora-gold' : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="px-6 md:px-8 py-6 md:py-8 min-h-[280px]">
              <AnimatePresence mode="wait">
                {/* Step 0: Budget */}
                {step === 0 && (
                  <motion.div
                    key="budget"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="font-heading text-xl text-velora-cream mb-6">What's your budget range?</h4>
                    <div className="space-y-3">
                      {['₹3L – ₹5L', '₹5L – ₹8L', '₹8L – ₹12L', '₹12L+'].map((b) => (
                        <button
                          key={b}
                          onClick={() => { setBudget(b); setStep(1) }}
                          className="w-full text-left px-5 py-4 border border-white/10 text-velora-cream/60 hover:border-velora-gold/50 hover:text-velora-gold font-body text-sm tracking-wide transition-all duration-300"
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 1: Size */}
                {step === 1 && (
                  <motion.div
                    key="size"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="font-heading text-xl text-velora-cream mb-6">Kitchen size?</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Compact', sub: '< 80 sq ft', value: 'small' },
                        { label: 'Medium', sub: '80–120 sq ft', value: 'medium' },
                        { label: 'Large', sub: '120–180 sq ft', value: 'large' },
                        { label: 'XL', sub: '180+ sq ft', value: 'large' },
                      ].map((s) => (
                        <button
                          key={s.label}
                          onClick={() => handleSizeSelect(s.value)}
                          className="px-5 py-5 border border-white/10 text-center hover:border-velora-gold/50 transition-all duration-300"
                        >
                          <span className="font-heading text-lg text-velora-cream block">{s.label}</span>
                          <span className="font-body text-[10px] text-velora-cream/30 tracking-wider">{s.sub}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Style */}
                {step === 2 && (
                  <motion.div
                    key="style"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="font-heading text-xl text-velora-cream mb-6">Your preferred style?</h4>
                    <div className="space-y-3">
                      {['modern', 'classic', 'contemporary', 'industrial'].map((s) => (
                        <button
                          key={s}
                          onClick={() => handleStyleSelect(s)}
                          className="w-full text-left px-5 py-4 border border-white/10 text-velora-cream/60 hover:border-velora-gold/50 hover:text-velora-gold font-body text-sm tracking-wide transition-all duration-300 capitalize"
                        >
                          {s === 'modern' ? 'Modern Minimal' :
                           s === 'classic' ? 'Classic Elegant' :
                           s === 'contemporary' ? 'Contemporary' : 'Industrial Chic'}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* No Step 3 result here, we skip to consultation */}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
