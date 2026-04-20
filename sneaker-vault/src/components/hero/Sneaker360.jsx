import { motion } from 'framer-motion';

export default function Sneaker360() {
  const sneakerImageUrl = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop";

  return (
    <div className="relative w-full h-full flex items-center justify-end pr-24 overflow-hidden select-none bg-black">
      
      {/* 
          ULTRA-CLEAN STATIC SHOWCASE
          No Red Box. No ambient glows. No mouse-tilt.
          Just the product on pure black.
      */}

      <div className="absolute right-0 bottom-0 top-0 z-10 w-[60vw] h-full flex items-center justify-end pointer-events-none pr-12">
        <motion.div 
          initial={{ opacity: 0, x: 60, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="w-full h-full relative flex items-center justify-center pt-16"
        >
          <img 
            src={sneakerImageUrl}
            alt="SNEAKER VAULT Premium Focus"
            className="w-full h-full object-contain filter drop-shadow-[-20px_40px_80px_rgba(0,0,0,0.8)]"
          />
        </motion.div>
      </div>

    </div>
  );
}
