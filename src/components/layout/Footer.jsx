import TextReveal from '../ui/TextReveal'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-velora-black text-velora-cream">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-velora-gold/40 to-transparent" />

      <div className="section-padding container-center">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <TextReveal>
              <h3 className="font-heading text-4xl font-light tracking-[0.2em] mb-6">VELORA</h3>
            </TextReveal>
            <TextReveal delay={0.1}>
              <p className="font-body text-sm text-velora-cream/50 leading-relaxed max-w-md">
                Crafting bespoke kitchen experiences since 2018. Every VELORA kitchen is a symphony of 
                precision engineering, artisan materials, and timeless design philosophy.
              </p>
            </TextReveal>
          </div>

          {/* Quick Links */}
          <div>
            <TextReveal>
              <h4 className="font-body text-xs tracking-[0.3em] uppercase text-velora-gold mb-6">Explore</h4>
            </TextReveal>
            {['Our Designs', 'Materials', 'Portfolio', 'Consultation'].map((item, i) => (
              <TextReveal key={item} delay={0.05 * i}>
                <p className="font-body text-sm text-velora-cream/40 hover:text-velora-gold transition-colors duration-500 cursor-pointer mb-3">
                  {item}
                </p>
              </TextReveal>
            ))}
          </div>

          {/* Contact */}
          <div>
            <TextReveal>
              <h4 className="font-body text-xs tracking-[0.3em] uppercase text-velora-gold mb-6">Reach Us</h4>
            </TextReveal>
            <TextReveal delay={0.05}>
              <p className="font-body text-sm text-velora-cream/40 mb-3">hello@velora.in</p>
            </TextReveal>
            <TextReveal delay={0.1}>
              <p className="font-body text-sm text-velora-cream/40 mb-3">+91 98765 43210</p>
            </TextReveal>
            <TextReveal delay={0.15}>
              <p className="font-body text-sm text-velora-cream/40">Mumbai • Bangalore • Delhi</p>
            </TextReveal>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-velora-cream/30 tracking-wider">
            © {currentYear} VELORA Kitchens. All rights reserved.
          </p>
          <div className="flex gap-8">
            {['Instagram', 'Pinterest', 'LinkedIn'].map((social) => (
              <a
                key={social}
                href="#"
                className="font-body text-xs text-velora-cream/30 hover:text-velora-gold transition-colors duration-500 tracking-wider"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
