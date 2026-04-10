import { useState } from 'react'
import SmoothScroll from './components/ui/SmoothScroll'
import Navbar from './components/layout/Navbar'
import HeroSection from './components/hero/HeroSection'
import BrandStatement from './components/ui/BrandStatement'
import ScrollSequence from './components/scroll/ScrollSequence'
import StatsSection from './components/ui/StatsSection'
import CustomizerPanel from './components/customizer/CustomizerPanel'
import PortfolioGrid from './components/portfolio/PortfolioGrid'
import LeadCapture from './components/lead/LeadCapture'
import Footer from './components/layout/Footer'
import ChatBot from './components/chatbot/ChatBot'
import DesignModal from './components/ui/DesignModal'

function App() {
  const [designModalOpen, setDesignModalOpen] = useState(false)

  return (
    <SmoothScroll>
      <div className="relative">
        <Navbar />

        {/* Hero */}
        <HeroSection />

        {/* Brand Statement */}
        <BrandStatement />

        {/* Design in 10 Seconds CTA */}
        <section className="bg-velora-black relative overflow-hidden">
          <div className="py-20 px-8 max-w-4xl w-full mx-auto text-center">
            <span className="font-body text-xs tracking-[0.5em] uppercase text-velora-gold block mb-4">
              Instant Inspiration
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-velora-cream mb-6">
              Design Your Kitchen in 10 Seconds
            </h2>
            <p className="font-body text-sm text-velora-cream/40 max-w-md mx-auto mb-8">
              Tell us your budget and space — our AI creates a personalized concept instantly.
            </p>
            <button
              onClick={() => setDesignModalOpen(true)}
              className="inline-flex items-center gap-3 px-8 py-4 border border-velora-gold text-velora-gold font-body text-xs tracking-[0.2em] uppercase hover:bg-velora-gold hover:text-velora-black transition-all duration-500"
            >
              <span>Try It Now</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>

        {/* Cinematic Scroll Experience */}
        <ScrollSequence />

        {/* Stats */}
        <StatsSection />

        {/* Customizer */}
        <CustomizerPanel />

        {/* Portfolio */}
        <PortfolioGrid />

        {/* Lead Capture */}
        <LeadCapture />

        {/* Footer */}
        <Footer />

        {/* Floating ChatBot */}
        <ChatBot />

        {/* Design Modal */}
        <DesignModal isOpen={designModalOpen} onClose={() => setDesignModalOpen(false)} />
      </div>
    </SmoothScroll>
  )
}

export default App
