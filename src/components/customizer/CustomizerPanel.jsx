import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TextReveal from '../ui/TextReveal'

const countertops = [
  { name: 'Carrara Marble', image: '/images/material-marble.png', color: '#E8E4DF' },
  { name: 'Black Granite', image: '/images/material-granite.png', color: '#2A2A2A' },
  { name: 'White Quartz', image: '/images/kitchen-hero.png', color: '#F0EDE8' },
  { name: 'Warm Walnut', image: '/images/kitchen-island.png', color: '#6B4E32' },
]

const finishes = ['Matte', 'Gloss']

export default function CustomizerPanel() {
  const [selectedCounter, setSelectedCounter] = useState(countertops[0])
  const [selectedFinish, setSelectedFinish] = useState('Matte')

  return (
    <section id="customizer" className="relative bg-velora-black overflow-hidden">
      <div className="section-padding container-center">
        <TextReveal className="text-center mb-16">
          <span className="font-body text-xs tracking-[0.5em] uppercase text-velora-gold block mb-4">
            Interactive Customizer
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-velora-cream mb-4">
            Design Your Vision
          </h2>
          <p className="font-body text-sm text-velora-cream/40 max-w-md mx-auto">
            Experiment with materials and finishes to preview your perfect kitchen.
          </p>
        </TextReveal>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* Preview Area */}
          <div className="w-full lg:w-3/5 relative">
            <div
              className="aspect-[4/3] rounded-sm overflow-hidden relative transition-all duration-700 border border-white/5"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedCounter.name}
                  src={selectedCounter.image}
                  alt="Kitchen preview"
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </AnimatePresence>

              {/* Gloss effect */}
              {selectedFinish === 'Gloss' && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
              )}

              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-velora-black/80 to-transparent">
                <div className="flex items-center gap-4">
                  <span className="font-body text-xs tracking-[0.2em] uppercase text-velora-cream/70">
                    {selectedCounter.name} • {selectedFinish}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="w-full lg:w-2/5 space-y-10">
            {/* Countertop Material */}
            <div>
              <h4 className="font-body text-xs tracking-[0.3em] uppercase text-velora-gold mb-6">
                Countertop Material
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {countertops.map((ct) => (
                  <button
                    key={ct.name}
                    onClick={() => setSelectedCounter(ct)}
                    className={`relative overflow-hidden aspect-[3/2] rounded-sm transition-all duration-500 ${
                      selectedCounter.name === ct.name
                        ? 'ring-2 ring-velora-gold'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={ct.image} alt={ct.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-velora-black/40 flex items-end p-3">
                      <span className="font-body text-[10px] tracking-[0.2em] uppercase text-velora-cream">
                        {ct.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Finish */}
            <div>
              <h4 className="font-body text-xs tracking-[0.3em] uppercase text-velora-gold mb-6">
                Finish
              </h4>
              <div className="flex gap-3">
                {finishes.map((finish) => (
                  <button
                    key={finish}
                    onClick={() => setSelectedFinish(finish)}
                    className={`px-6 py-3 border font-body text-xs tracking-[0.2em] uppercase transition-all duration-500 ${
                      selectedFinish === finish
                        ? 'border-velora-gold text-velora-gold bg-velora-gold/10'
                        : 'border-white/10 text-velora-cream/40 hover:border-white/30 hover:text-velora-cream/70'
                    }`}
                  >
                    {finish}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.button
              className="w-full py-4 bg-velora-gold text-velora-black font-body text-xs tracking-[0.3em] uppercase transition-all duration-500 hover:bg-velora-gold-light"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              Get a Quote for This Design
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
