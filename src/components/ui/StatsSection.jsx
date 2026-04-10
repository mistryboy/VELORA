import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from '../ui/TextReveal'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '500+', label: 'Kitchens Delivered' },
  { value: '12', label: 'Cities' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '15+', label: 'Design Awards' },
]

export default function StatsSection() {
  const sectionRef = useRef(null)
  const countersRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      countersRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-velora-black border-y border-white/5">
      <div className="py-20 md:py-28 px-8 max-w-6xl w-full mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => (countersRef.current[i] = el)}
              className="text-center"
            >
              <span className="font-heading text-4xl md:text-5xl font-light text-velora-gold block mb-2">
                {stat.value}
              </span>
              <span className="font-body text-[10px] tracking-[0.3em] uppercase text-velora-cream/60">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
