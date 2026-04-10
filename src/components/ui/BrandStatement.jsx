import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from '../ui/TextReveal'

gsap.registerPlugin(ScrollTrigger)

export default function BrandStatement() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current,
        { width: '0%' },
        {
          width: '100%',
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-velora-cream overflow-hidden">
      <div className="py-32 md:py-48 px-8 max-w-5xl mx-auto text-center w-full">
        {/* Decorative line */}
        <div className="flex justify-center mb-12">
          <div ref={lineRef} className="h-[1px] bg-velora-gold/40 max-w-[120px]" style={{ width: 0 }} />
        </div>

        <TextReveal>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light text-velora-black leading-[1.3] mb-8">
            "A kitchen is not just a room.<br />
            <span className="text-velora-gold">It is where life unfolds.</span>"
          </h2>
        </TextReveal>

        <TextReveal delay={0.2}>
          <p className="font-body text-xs tracking-[0.4em] uppercase text-velora-stone">
            — VELORA Design Philosophy
          </p>
        </TextReveal>

        {/* Decorative elements */}
        <div className="absolute top-12 left-12 w-24 h-24 border border-velora-gold/10 rounded-full opacity-50" />
        <div className="absolute bottom-12 right-12 w-16 h-16 border border-velora-gold/10 rounded-full opacity-30" />
      </div>
    </section>
  )
}
