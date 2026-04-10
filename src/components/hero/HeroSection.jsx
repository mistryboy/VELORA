import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import Button from '../ui/Button'

export default function HeroSection() {
  const heroRef = useRef(null)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] } },
  }

  const slowRevealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] } },
  }

  // --- 2.5D Parallax Logic ---
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1
    const y = (e.clientY / window.innerHeight) * 2 - 1
    mouseX.set(x)
    mouseY.set(y)
  }

  const springConfig = { damping: 40, stiffness: 150, mass: 1 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })

  // Layer 1: Background (Slow, blurry, scaled up)
  const l1_scroll = useTransform(scrollYProgress, [0, 1], [0, 100])
  const l1_mx = useTransform(smoothMouseX, [-1, 1], [-20, 20])
  const l1_my = useTransform(smoothMouseY, [-1, 1], [-20, 20])

  // Layer 2: Main Image (Moderate speed, focal point)
  const l2_scroll = useTransform(scrollYProgress, [0, 1], [0, 250])
  const l2_mx = useTransform(smoothMouseX, [-1, 1], [-45, 45])
  const l2_my = useTransform(smoothMouseY, [-1, 1], [-45, 45])

  // Layer 3: Foreground Glass (Fastest speed, deepest parallax)
  const l3_scroll = useTransform(scrollYProgress, [0, 1], [0, 500])
  const l3_mx = useTransform(smoothMouseX, [-1, 1], [-85, 85])
  const l3_my = useTransform(smoothMouseY, [-1, 1], [-85, 85])

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen overflow-hidden flex items-center bg-[#050505]"
      id="hero"
    >
      {/* --- Premium Full-Screen Background Texture --- */}
      {/* Massive subtle marble overlay to break the flat void */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-[0.03] grayscale mix-blend-screen scale-105 pointer-events-none"
        style={{ backgroundImage: "url('/images/material-marble.png')" }}
      ></div>
      
      {/* Ambient radial lighting for text area */}
      <div className="absolute top-1/2 left-[10%] -translate-y-1/2 w-[600px] h-[800px] bg-[#C6A87D]/[0.03] rounded-full blur-[120px] pointer-events-none"></div>
      {/* 2.5D PARALLAX VISUAL SCENE (Replaces 3D Model) */}
      <div className="absolute inset-0 lg:left-auto lg:right-0 lg:w-[55%] h-full pointer-events-none opacity-30 lg:opacity-100 z-0">
        
        {/* Layer 1: Blurred Background Ambient */}
        <motion.div style={{ y: l1_scroll }} className="absolute inset-0 w-full h-full flex items-center justify-center">
          <motion.div 
            style={{ x: l1_mx, y: l1_my }} 
            initial={{ opacity: 0, scale: 1.15 }} animate={{ opacity: 1, scale: 1.1 }} transition={{ duration: 2.2, ease: "easeOut" }}
            className="relative w-full h-full flex items-center justify-center pointer-events-none"
          >
            {/* Extremely dark and blurred monumental backdrop */}
            <div className="absolute w-[800px] h-[800px] bg-[#C6A87D]/10 rounded-full blur-[150px] translate-x-20 -translate-y-20"></div>
            <div className="absolute w-[500px] h-[850px] translate-x-32 border-l border-[#222]/30 shadow-2xl skew-x-[-2deg] overflow-hidden rounded-sm bg-[#0A0A0A] blur-[4px]">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-20 grayscale mix-blend-overlay scale-110" 
                style={{ backgroundImage: "url('/images/kitchen-hero.png')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-bl from-[#0A0A0A]/60 via-[#0A0A0A]/90 to-[#0A0A0A]"></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Layer 2: Core Focal Point (Main Image) */}
        <motion.div style={{ y: l2_scroll }} className="absolute inset-0 w-full h-full flex items-center justify-center">
          <motion.div 
            style={{ x: l2_mx, y: l2_my }}
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full h-full flex items-center justify-center pointer-events-none pr-10"
          >
            {/* Focal Architectural Card with Premium Gold Glow */}
            <motion.div 
              animate={{ y: [0, -12, 0] }} 
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.2 }}
              className="relative w-[420px] h-[520px] bg-[#0A0A0A] border border-[#C6A87D]/30 shadow-[0_0_50px_rgba(198,168,125,0.15)] overflow-hidden rounded-sm"
            >
              {/* Sharper, vibrant premium kitchen image (Focal area avoids dark blurs) */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-90 transition-transform duration-1000 group-hover:scale-105" 
                style={{ backgroundImage: "url('/images/kitchen-island.png')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/40 via-transparent to-[#0A0A0A]/90"></div>
              
              {/* Edge glow to highlight focal element specifically */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#C6A87D] to-transparent opacity-90"></div>
              
              {/* Luxurious Framing Line emphasizing height */}
              <div className="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-t from-[#0A0A0A] to-transparent z-10 flex items-end p-8">
                 <div className="w-[2px] h-[150px] bg-gradient-to-t from-[#C6A87D] via-[#C6A87D]/70 to-transparent shadow-[0_0_20px_rgba(198,168,125,1)] ml-4"></div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Layer 3: Sharp Foreground Glass */}
        <motion.div style={{ y: l3_scroll }} className="absolute inset-0 w-full h-full flex items-center justify-center">
          <motion.div 
            style={{ x: l3_mx, y: l3_my }}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
            className="relative w-full h-full flex items-end justify-center pointer-events-none pb-28 pl-48"
          >
            {/* Cinematic floating accent lighting */}
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-1/4 left-10 w-5 h-5 bg-[#FAF8F5] rounded-full shadow-[0_0_50px_#FAF8F5] opacity-90 z-20"
            ></motion.div>
            
            <motion.div 
              animate={{ y: [0, -15, 0] }} 
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.3 }}
              className="relative hidden md:flex w-[320px] h-[140px] bg-white/[0.04] backdrop-blur-md border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] items-center p-5 rounded-sm gap-5"
            >
                <div className="w-[90px] h-[100px] rounded shrink-0 overflow-hidden relative shadow-lg">
                   <div className="absolute inset-0 bg-cover bg-center brightness-110" style={{ backgroundImage: "url('/images/kitchen-l-shape.png')" }}></div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="w-10 h-[1px] bg-[#C6A87D] mb-3"></div>
                  <p className="font-body text-[10px] tracking-[0.35em] text-white/50 uppercase mb-1">Architecture</p>
                  <p className="font-body text-sm tracking-widest text-[#C6A87D] drop-shadow-md">Precision</p>
                </div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Deep edge vignette for cinematic contrast */}
        <div className="absolute top-0 left-0 w-64 h-full bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-20 pointer-events-none hidden lg:block" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#0A0A0A] to-transparent z-20 pointer-events-none hidden lg:block" />
      </div>

      {/* Decorative grain overlay for cinematic feel */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top subtle gradient to blend smoothly with navbar */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

      {/* Content Container - LEFT SIDE */}
      <div className="relative z-20 w-full h-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-24 pointer-events-none flex items-center">
        
        <motion.div 
          className="w-full lg:w-[45%] flex flex-col justify-center text-center lg:text-left items-center lg:items-start pt-20 lg:pt-0 pointer-events-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Brand Eyebrow */}
          <div className="overflow-hidden mb-8">
            <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start">
              <span className="font-body text-xs sm:text-sm tracking-[0.4em] uppercase text-[#C6A87D] drop-shadow-md">
                VELORA
              </span>
              <div className="w-10 h-[1px] bg-[#C6A87D]/50 mt-4" />
            </motion.div>
          </div>

          {/* Headline - Smooth Staggered Reveal */}
          <div className="mb-6 flex flex-col gap-2 relative z-20">
            <div className="overflow-hidden">
              <motion.h1 
                variants={itemVariants}
                className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[5.5rem] font-light text-white leading-tight sm:leading-none drop-shadow-2xl tracking-tight"
              >
                Crafted Luxury.
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1 
                variants={itemVariants}
                className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[5.5rem] font-light text-white/60 leading-tight sm:leading-[1.05] drop-shadow-2xl tracking-tight"
              >
                Engineered Precision.
              </motion.h1>
            </div>
          </div>

          {/* Subtext */}
          <div className="overflow-hidden mb-12">
            <motion.p 
              variants={itemVariants}
              className="font-body text-sm sm:text-base md:text-lg text-white/50 max-w-[28rem] mx-auto lg:mx-0 leading-relaxed font-light tracking-wide lg:pr-8"
            >
              Bespoke Modular Kitchens Designed for Modern Living
            </motion.p>
          </div>

          {/* Buttons */}
          <motion.div 
            variants={slowRevealVariants}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 w-full sm:w-auto"
          >
            <Button 
              variant="dark" 
              whileHover={{ scale: 1.05 }}
              className="w-full sm:w-auto shadow-[0_0_15px_rgba(198,168,125,0.15)] hover:shadow-[0_0_40px_rgba(198,168,125,0.5)] transition-all duration-300 bg-[#C6A87D] border-[#C6A87D] text-[#0A0A0A]" 
              onClick={() => scrollTo('scroll-experience')}
            >
              Explore Designs
            </Button>
            <Button 
              variant="secondary" 
              whileHover={{ scale: 1.05 }}
              className="w-full sm:w-auto hover:shadow-[0_0_20px_rgba(198,168,125,0.3)] hover:border-[#C6A87D] hover:text-[#C6A87D] transition-all duration-300 border-white/10" 
              onClick={() => {
                const chatBtn = document.getElementById('chat-toggle-btn')
                if (chatBtn) chatBtn.click()
              }}
            >
              Book Consultation
            </Button>
          </motion.div>
        </motion.div>
      </div>

    </section>
  )
}
