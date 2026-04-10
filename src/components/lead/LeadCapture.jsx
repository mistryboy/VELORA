import { useState } from 'react'
import { motion } from 'framer-motion'
import { db } from '../../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import TextReveal from '../ui/TextReveal'

export default function LeadCapture() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', budget: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [focused, setFocused] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.phone) return

    setLoading(true)
    setError('')

    try {
      await addDoc(collection(db, 'leads'), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message || 'No message provided',
        budget: formData.budget || 'Not specified',
        createdAt: serverTimestamp(),
      })
      
      setSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Try again.')
      console.error('Firestore error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="lead-capture" className="relative bg-velora-black overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'url(/images/kitchen-island.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-velora-black via-velora-black/95 to-velora-black/70" />

      <div className="section-padding container-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Copy */}
          <div>
            <TextReveal>
              <span className="font-body text-xs tracking-[0.5em] uppercase text-velora-gold block mb-6">
                Get Started
              </span>
            </TextReveal>
            <TextReveal delay={0.1}>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-velora-cream leading-[1.1] mb-6">
                Book Your Free<br />Design Consultation
              </h2>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="font-body text-sm text-velora-cream/40 leading-relaxed max-w-md mb-8">
                Our design team will create a personalized 3D render of your dream kitchen,
                complete with material selections and a detailed cost breakdown — all complimentary.
              </p>
            </TextReveal>
            <TextReveal delay={0.3}>
              <div className="space-y-4">
                {[
                  'Free 3D kitchen visualization',
                  'Expert material consultation',
                  'Transparent pricing — no hidden costs',
                  'Response within 24 hours',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-velora-gold rounded-full" />
                    <span className="font-body text-xs text-velora-cream/50 tracking-wide">{item}</span>
                  </div>
                ))}
              </div>
            </TextReveal>
          </div>

          {/* Right: Form */}
          <div>
            {!submitted ? (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-8"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Name */}
                <div className="relative">
                  <label className="font-body text-[10px] tracking-[0.3em] uppercase text-velora-cream/30 block mb-3">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused('')}
                    className="w-full bg-transparent border-b border-white/10 pb-3 text-velora-cream font-body text-sm focus:outline-none focus:border-velora-gold transition-colors duration-500 placeholder:text-velora-cream/15"
                    placeholder="Enter your name"
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 h-[1px] bg-velora-gold"
                    initial={{ width: '0%' }}
                    animate={{ width: focused === 'name' ? '100%' : '0%' }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <label className="font-body text-[10px] tracking-[0.3em] uppercase text-velora-cream/60 block mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused('')}
                    className="w-full bg-transparent border-b border-white/10 pb-4 text-velora-cream font-body text-sm focus:outline-none focus:border-velora-gold transition-colors duration-500 placeholder:text-velora-cream/15"
                    placeholder="Enter your email"
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 h-[1px] bg-velora-gold"
                    initial={{ width: '0%' }}
                    animate={{ width: focused === 'email' ? '100%' : '0%' }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <label className="font-body text-[10px] tracking-[0.3em] uppercase text-velora-cream/30 block mb-3">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    onFocus={() => setFocused('phone')}
                    onBlur={() => setFocused('')}
                    className="w-full bg-transparent border-b border-white/10 pb-3 text-velora-cream font-body text-sm focus:outline-none focus:border-velora-gold transition-colors duration-500 placeholder:text-velora-cream/15"
                    placeholder="+91 XXXXX XXXXX"
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 h-[1px] bg-velora-gold"
                    initial={{ width: '0%' }}
                    animate={{ width: focused === 'phone' ? '100%' : '0%' }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Budget */}
                <div className="relative">
                  <label className="font-body text-[10px] tracking-[0.3em] uppercase text-velora-cream/30 block mb-3">
                    Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    onFocus={() => setFocused('budget')}
                    onBlur={() => setFocused('')}
                    className="w-full bg-transparent border-b border-white/10 pb-3 text-velora-cream font-body text-sm focus:outline-none focus:border-velora-gold transition-colors duration-500 appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-velora-charcoal">Select budget range</option>
                    <option value="3-5" className="bg-velora-charcoal">₹3L – ₹5L</option>
                    <option value="5-8" className="bg-velora-charcoal">₹5L – ₹8L</option>
                    <option value="8-12" className="bg-velora-charcoal">₹8L – ₹12L</option>
                    <option value="12+" className="bg-velora-charcoal">₹12L+</option>
                  </select>
                  <motion.div
                    className="absolute bottom-0 left-0 h-[1px] bg-velora-gold"
                    initial={{ width: '0%' }}
                    animate={{ width: focused === 'budget' ? '100%' : '0%' }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Message */}
                <div className="relative">
                  <label className="font-body text-[10px] tracking-[0.3em] uppercase text-velora-cream/30 block mb-3">
                    Message
                  </label>
                  <textarea
                    rows="3"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused('')}
                    className="w-full bg-transparent border-b border-white/10 pb-3 text-velora-cream font-body text-sm focus:outline-none focus:border-velora-gold transition-colors duration-500 placeholder:text-velora-cream/15 resize-none"
                    placeholder="Tell us about your kitchen project..."
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 h-[1px] bg-velora-gold"
                    initial={{ width: '0%' }}
                    animate={{ width: focused === 'message' ? '100%' : '0%' }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 mt-4 text-velora-black font-body text-xs tracking-[0.3em] uppercase transition-all duration-500 ${
                    loading ? 'bg-velora-gold/50 cursor-not-allowed' : 'bg-velora-gold hover:bg-velora-gold-light'
                  }`}
                  whileHover={!loading ? { scale: 1.01 } : {}}
                  whileTap={!loading ? { scale: 0.99 } : {}}
                >
                  {loading ? 'Sending...' : 'Book Free Consultation'}
                </motion.button>

                {error && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-body text-[10px] text-red-400 text-center tracking-wider"
                  >
                    {error}
                  </motion.p>
                )}

                <p className="font-body text-[10px] text-velora-cream/20 text-center tracking-wider">
                  No spam. We respect your privacy.
                </p>
              </motion.form>
            ) : (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                {/* Success checkmark */}
                <motion.div
                  className="w-20 h-20 rounded-full border-2 border-velora-gold mx-auto mb-8 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <motion.svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C9A96E"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </motion.svg>
                </motion.div>
                <h3 className="font-heading text-3xl font-light text-velora-cream mb-4">
                  Thank You, {formData.name}!
                </h3>
                <p className="font-body text-sm text-velora-cream/40">
                  Thanks! We'll contact you soon.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
