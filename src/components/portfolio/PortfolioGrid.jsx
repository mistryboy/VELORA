import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TextReveal from '../ui/TextReveal'

const projects = [
  {
    id: 1,
    title: 'The Marble Suite',
    location: 'Bandra, Mumbai',
    style: 'Modern Minimal',
    image: '/images/kitchen-hero.png',
    size: 'large',
  },
  {
    id: 2,
    title: 'Sage & Stone',
    location: 'Koramangala, Bangalore',
    style: 'Contemporary',
    image: '/images/kitchen-l-shape.png',
    size: 'small',
  },
  {
    id: 3,
    title: 'Navy Luxe',
    location: 'Golf Links, Delhi',
    style: 'Classic Elegant',
    image: '/images/kitchen-u-shape.png',
    size: 'small',
  },
  {
    id: 4,
    title: 'Walnut Retreat',
    location: 'Jubilee Hills, Hyderabad',
    style: 'Warm Contemporary',
    image: '/images/kitchen-island.png',
    size: 'large',
  },
  {
    id: 5,
    title: 'Cloud Kitchen',
    location: 'Whitefield, Bangalore',
    style: 'Scandinavian',
    image: '/images/material-marble.png',
    size: 'small',
  },
  {
    id: 6,
    title: 'The Dark Atelier',
    location: 'Powai, Mumbai',
    style: 'Industrial Luxe',
    image: '/images/material-granite.png',
    size: 'small',
  },
]

export default function PortfolioGrid() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section id="portfolio" className="bg-velora-cream relative">
      <div className="section-padding container-center">
        <TextReveal className="text-center mb-16">
          <span className="font-body text-xs tracking-[0.5em] uppercase text-velora-gold block mb-4">
            Our Work
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-velora-black mb-4">
            Portfolio
          </h2>
          <p className="font-body text-sm text-velora-mid max-w-md mx-auto">
            A curated selection of our most beloved kitchen transformations.
          </p>
        </TextReveal>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className={`group relative overflow-hidden cursor-pointer w-full bg-velora-charcoal ${
                project.size === 'large' ? 'md:row-span-2 aspect-[4/5] md:aspect-auto md:h-full' : 'aspect-[4/3] md:aspect-auto md:h-full min-h-[300px]'
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/95 via-[#1a1a1a]/30 to-transparent flex flex-col justify-end p-6 md:p-8 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700">
                <motion.div
                  initial={false}
                  className="transform translate-y-0 md:translate-y-6 md:group-hover:translate-y-0 transition-transform duration-700"
                >
                  <span className="font-body text-[10px] tracking-[0.3em] uppercase text-velora-gold block mb-2 md:mb-3">
                    {project.style}
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-light text-velora-cream mb-1">
                    {project.title}
                  </h3>
                  <p className="font-body text-[10px] sm:text-xs text-velora-cream/50">{project.location}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-velora-black/90 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />

            {/* Content */}
            <motion.div
              className="relative z-10 max-w-4xl w-full"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full aspect-[16/10] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-velora-black/90 to-transparent">
                  <span className="font-body text-[10px] tracking-[0.3em] uppercase text-velora-gold block mb-2">
                    {selectedProject.style} • {selectedProject.location}
                  </span>
                  <h3 className="font-heading text-3xl md:text-4xl font-light text-velora-cream">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-velora-cream/60 hover:text-velora-cream transition-colors duration-300"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
