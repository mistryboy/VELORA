import { motion } from 'framer-motion';
import Sneaker360 from './Sneaker360';
import { Search, User, ShoppingBag, LogOut } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const relatedProducts = [
  { name: "Running Edge", price: "$165", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop" },
  { name: "Maxim Wear", price: "$114", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop" },
  { name: "Geer to Glare", price: "$250", img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1964&auto=format&fit=crop" }
];

// Stagger container for orchestrated child animations
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    }
  }
};

// Individual line animation
const lineReveal = {
  hidden: { opacity: 0, y: 60, skewY: 3 },
  visible: {
    opacity: 1, y: 0, skewY: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
  }
};

// Fade-in from below
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function Hero() {
  const { totalItems, setCartOpen } = useCart();
  const { user, setAuthModalOpen, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Products', href: '/store' },
    { name: 'Drops', href: '/#drops' },
    { name: 'Vault', href: '/#vault' },
    { name: 'Brand', href: '/#brand' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (href.startsWith('/#')) {
      const hash = href.split('#')[1];
      if (location.pathname === '/') {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(href);
      }
    } else {
      navigate(href);
      window.scrollTo(0, 0);
    }
  };

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden select-none font-inter text-white">
      
      {/* 
          CLEAN NAVIGATION LAYER (Restored Branding)
      */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 z-50 px-12 py-8 flex items-center justify-between pointer-events-auto overflow-hidden"
      >
        <div className="flex items-center gap-16">
            <span onClick={() => { navigate('/'); window.scrollTo(0,0); }} className="font-heading text-xl font-[900] tracking-tighter uppercase cursor-pointer hover:opacity-80 transition-opacity duration-300">
                SNEAKER<span className="text-vault-purple">VAULT</span>
            </span>
            <nav className="hidden lg:flex items-center gap-8">
                {navLinks.map(item => (
                    <a key={item.name} href={item.href} onClick={(e) => handleNavClick(e, item.href)} className="font-body text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white hover:text-glow-purple transition-all duration-400 relative group cursor-pointer">
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-vault-purple transition-all duration-400 group-hover:w-full" />
                    </a>
                ))}
            </nav>
        </div>
        <div className="flex items-center gap-6">
            <div className="relative group">
                <input 
                    type="text" 
                    placeholder="Search your style" 
                    className="bg-white/[0.03] border border-white/10 px-4 py-2 rounded-md text-[10px] w-48 text-white placeholder:text-white/20 focus:outline-none focus:border-vault-purple/50 focus:shadow-[0_0_15px_rgba(168,85,247,0.1)] transition-all duration-500 font-body"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white/30 group-hover:text-vault-purple transition-colors duration-300" />
            </div>
            
            {user ? (
              <div onClick={logout} className="relative group cursor-pointer w-6 h-6 rounded-full bg-vault-purple text-white flex items-center justify-center font-heading text-[10px] font-bold hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all duration-300">
                {user.initial}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-vault-black border border-white/10 px-3 py-2 rounded-md flex items-center gap-2 pointer-events-none group-hover:pointer-events-auto">
                    <span className="font-body text-[8px] uppercase tracking-widest text-white/60 whitespace-nowrap">Sign Out</span>
                </div>
              </div>
            ) : (
               <User onClick={() => setAuthModalOpen(true)} className="w-4 h-4 text-white/50 cursor-pointer hover:text-vault-purple hover:scale-110 transition-all duration-300" />
            )}

            <button onClick={() => setCartOpen(true)} className="relative cursor-pointer group">
                <ShoppingBag className="w-4 h-4 text-white/50 group-hover:text-vault-purple group-hover:scale-110 transition-all duration-300" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-vault-purple text-white rounded-full text-[8px] flex items-center justify-center font-bold group-hover:scale-125 transition-transform duration-300">{totalItems}</span>
                )}
            </button>
        </div>
      </motion.header>

      {/* 
          MAIN CONTENT (PURE STATIC EDITORIAL) 
      */}
      <div className="relative w-full h-full flex flex-col justify-center p-0 bg-black">
        
        {/* COMPOSITION: Typography + Sneaker360 Focus */}
        <div className="flex items-end relative h-full bg-black pb-40">
            
            {/* TYPOGRAPHY: ALIGNED TO BOTTOM LEFT — Staggered Line Reveal */}
            <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="relative z-40 flex flex-col pl-24 pointer-events-none"
            >
                <h1 className="font-heading text-[6.5rem] md:text-[9.5rem] lg:text-[12rem] font-[900] text-white leading-[0.78] tracking-tightest uppercase">
                    {['IN', 'MOTION', 'WE FIND', 'FREEDOM'].map((line, i) => (
                      <span key={i} className="block overflow-hidden">
                        <motion.span variants={lineReveal} className="block">
                          {line}
                        </motion.span>
                      </span>
                    ))}
                </h1>
                
                <motion.div variants={fadeUp} className="mt-8 ml-6">
                    <p className="font-body text-[10px] leading-relaxed tracking-[0.4em] uppercase text-white/20 max-w-sm">
                        The ultimate destination for athletes <br />
                        seeking the perfect blend of style <br />
                        and performance. Step into the future.
                    </p>
                </motion.div>
            </motion.div>

            {/* SNEAKER SHOWCASE: STATIC RIGHT ALIGNMENT (NO BG) */}
            <div className="absolute inset-0 z-0 flex items-center justify-end overflow-hidden bg-black">
                <div className="w-full h-full max-w-[1700px]">
                    <Sneaker360 />
                </div>
            </div>

        </div>

      </div>

      {/* FOOTER: HOT SEARCH BAR (Clean Integrated Architecture) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 z-50 flex flex-col lg:flex-row items-stretch h-32 bg-black border-t border-white/5"
      >
            
            {/* Hot Search Title Box */}
            <div className="bg-[#050505] px-12 flex items-center gap-6 min-w-[320px] border-r border-white/5">
                <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:border-vault-purple/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] transition-all duration-500">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/20">
                        <path d="M12 2v10M18.4 4.6l-4.4 4.4M5.6 4.6l4.4 4.4M2 12h10" />
                    </svg>
                </div>
                <div className="flex flex-col">
                    <span className="font-heading text-2xl font-black text-white leading-none uppercase">HOT</span>
                    <span className="font-body text-[9px] tracking-[0.4em] text-white/20 uppercase mt-1">SEARCH</span>
                </div>
            </div>

            {/* Product Cards Track */}
            <div className="flex-1 bg-black flex px-20 items-center justify-between">
                {relatedProducts.map((product, i) => (
                    <motion.div 
                        key={product.name} 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.4 + (i * 0.12) }}
                        className="flex items-center gap-8 group cursor-pointer"
                        whileHover={{ x: 4 }}
                    >
                        <div className="w-16 h-16 bg-white/[0.02] border border-white/10 p-1 flex items-center justify-center group-hover:bg-white/[0.05] group-hover:border-vault-purple/20 transition-all duration-500">
                            <img src={product.img} alt={product.name} className="w-full h-full object-contain filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] group-hover:scale-110 transition-all duration-700" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-heading text-[11px] font-bold uppercase tracking-widest group-hover:text-vault-purple transition-colors duration-400">{product.name}</span>
                            <span className="font-body text-[9px] text-white/10 mt-1 group-hover:text-white/30 transition-colors duration-400">{product.price}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

      </motion.div>

    </section>
  );
}
