import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from '../ui/TextReveal'

gsap.registerPlugin(ScrollTrigger)

const layouts = [
  {
    name: 'L-Shape',
    image: '/images/kitchen-l-shape.png',
    desc: 'Maximizes corner space with an elegant flow between cooking zones. Perfect for open-plan living.',
    tag: 'Most Popular',
  },
  {
    name: 'U-Shape',
    image: '/images/kitchen-u-shape.png',
    desc: 'Three walls of luxury, creating an immersive culinary sanctuary with maximum counter space.',
    tag: 'Premium',
  },
  {
    name: 'Island',
    image: '/images/kitchen-island.png',
    desc: 'The centerpiece kitchen. A freestanding island for entertaining, cooking, and conversation.',
    tag: 'Signature',
  },
]

const materials = [
  {
    name: 'Carrara Marble',
    image: '/images/material-marble.png',
    desc: 'Timeless Italian elegance with unique veining patterns.',
    color: '#E8E4DF',
  },
  {
    name: 'Black Galaxy Granite',
    image: '/images/material-granite.png',
    desc: 'Dramatic depth with shimmering golden flecks.',
    color: '#2A2A2A',
  },
  {
    name: 'Pure White Quartz',
    image: '/images/kitchen-hero.png',
    desc: 'Engineered perfection. Non-porous, stain-resistant, eternal.',
    color: '#F0EDE8',
  },
  {
    name: 'Heritage Walnut',
    image: '/images/kitchen-island.png',
    desc: 'Warm, rich grain that tells a story in every surface.',
    color: '#6B4E32',
  },
]

export default function ScrollSequence() {
  const containerRef = useRef(null)
  const entryImageRef = useRef(null)
  const layoutsRef = useRef(null)
  const materialsRef = useRef(null)
  const storageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ===== ENTRY SCENE: Slow zoom into kitchen =====
      gsap.fromTo(
        entryImageRef.current,
        { scale: 1 },
        {
          scale: 1.35,
          ease: 'none',
          scrollTrigger: {
            trigger: entryImageRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            pin: true,
            pinSpacing: true,
          },
        }
      )

      // Entry text animations
      gsap.fromTo('.entry-text-1', 
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          scrollTrigger: {
            trigger: entryImageRef.current,
            start: 'top top',
            end: '30% top',
            scrub: 1,
          },
        }
      )
      gsap.fromTo('.entry-text-1',
        { opacity: 1 },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: entryImageRef.current,
            start: '60% top',
            end: '80% top',
            scrub: 1,
          },
        }
      )

      // ===== LAYOUT TRANSITION SECTION =====
      const layoutCards = gsap.utils.toArray('.layout-card')
      layoutCards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, x: i % 2 === 0 ? -80 : 80 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // ===== MATERIALS CARDS =====
      const matCards = gsap.utils.toArray('.material-card')
      matCards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // ===== STORAGE INTERACTION =====
      const drawers = gsap.utils.toArray('.drawer-item')
      drawers.forEach((drawer, i) => {
        gsap.fromTo(drawer,
          { x: -100 * (i % 2 === 0 ? 1 : -1), opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: drawer,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} id="scroll-experience" className="relative">
      {/* ===== 1. ENTRY SCENE ===== */}
      <section className="relative h-screen overflow-hidden">
        <div
          ref={entryImageRef}
          className="w-full h-full relative"
          style={{
            backgroundImage: 'url(/images/kitchen-hero.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            willChange: 'transform',
          }}
        >
          <div className="absolute inset-0 bg-velora-black/50" />
          <div className="entry-text-1 absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <span className="font-body text-xs tracking-[0.5em] uppercase text-velora-gold mb-6">
              The VELORA Experience
            </span>
            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-light text-velora-cream max-w-4xl leading-[1.1] mb-6">
              Every Detail,<br />Intentionally Crafted
            </h2>
            <p className="font-body text-sm text-velora-cream/50 max-w-md">
              Scroll to explore our design philosophy and discover the art behind every VELORA kitchen.
            </p>
          </div>
        </div>
      </section>

      {/* ===== 2. LAYOUT TRANSITIONS ===== */}
      <section ref={layoutsRef} className="bg-velora-cream relative">
        <div className="section-padding container-center">
          <TextReveal className="text-center mb-20">
            <span className="font-body text-xs tracking-[0.5em] uppercase text-velora-gold block mb-4">
              Kitchen Layouts
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-velora-black">
              Choose Your Canvas
            </h2>
          </TextReveal>

          <div className="space-y-24 md:space-y-32">
            {layouts.map((layout, i) => (
              <div
                key={layout.name}
                className={`layout-card flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center`}
              >
                {/* Image */}
                <div className="w-full md:w-3/5 relative overflow-hidden group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={layout.image}
                      alt={layout.name}
                      className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute top-6 right-6 px-4 py-2 glass-dark">
                    <span className="font-body text-[10px] tracking-[0.3em] uppercase text-velora-gold">
                      {layout.tag}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className="w-full md:w-2/5 space-y-6">
                  <span className="font-body text-xs tracking-[0.3em] uppercase text-velora-stone">
                    Layout 0{i + 1}
                  </span>
                  <h3 className="font-heading text-4xl md:text-5xl font-light text-velora-black">
                    {layout.name}
                  </h3>
                  <div className="w-12 h-[1px] bg-velora-gold" />
                  <p className="font-body text-sm text-velora-mid leading-relaxed">
                    {layout.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. MATERIALS SHOWCASE ===== */}
      <section ref={materialsRef} className="bg-velora-black relative overflow-hidden">
        <div className="section-padding container-center">
          <TextReveal className="text-center mb-20">
            <span className="font-body text-xs tracking-[0.5em] uppercase text-velora-gold block mb-4">
              Premium Materials
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-velora-cream">
              Touch the Extraordinary
            </h2>
          </TextReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {materials.map((mat, i) => (
              <div
                key={mat.name}
                className="material-card group relative overflow-hidden cursor-pointer"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={mat.image}
                    alt={mat.name}
                    className="w-full h-full object-cover transition-all duration-[1.5s] ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-velora-black/80 via-velora-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div
                    className="w-4 h-4 rounded-full mb-4 border border-white/20"
                    style={{ backgroundColor: mat.color }}
                  />
                  <h3 className="font-heading text-2xl md:text-3xl font-light text-velora-cream mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                    {mat.name}
                  </h3>
                  <p className="font-body text-xs text-velora-cream/50 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                    {mat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. STORAGE INTERACTION ===== */}
      <section ref={storageRef} className="bg-velora-cream relative">
        <div className="section-padding container-center">
          <TextReveal className="text-center mb-20">
            <span className="font-body text-xs tracking-[0.5em] uppercase text-velora-gold block mb-4">
              Smart Storage
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-velora-black">
              Engineered Elegance
            </h2>
          </TextReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Soft-Close Drawers',
                desc: 'German-engineered mechanisms with feather-light touch and whisper-quiet closure.',
                icon: '⬛',
              },
              {
                title: 'Corner Carousel',
                desc: 'Revolutionary 360° rotating shelves. Zero wasted space, maximum accessibility.',
                icon: '🔲',
              },
              {
                title: 'Pull-Out Pantry',
                desc: 'Full-extension tall units with integrated lighting and adjustable shelving.',
                icon: '📐',
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="drawer-item group relative p-8 md:p-10 bg-white border border-velora-beige hover:border-velora-gold/30 transition-all duration-700 cursor-pointer"
              >
                {/* Animated top bar */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-velora-gold group-hover:w-full transition-all duration-700" />
                
                <span className="font-body text-xs tracking-[0.3em] uppercase text-velora-stone block mb-6">
                  0{i + 1}
                </span>
                <h3 className="font-heading text-2xl font-light text-velora-black mb-4">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-velora-mid leading-relaxed">
                  {item.desc}
                </p>
                
                {/* Hover arrow */}
                <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
                  <span className="font-body text-xs tracking-[0.2em] uppercase text-velora-gold">Learn More</span>
                  <span className="text-velora-gold">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
