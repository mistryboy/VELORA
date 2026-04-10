import { motion } from 'framer-motion'

const variants = {
  primary: {
    base: 'relative inline-flex items-center justify-center overflow-hidden rounded-none border px-8 py-4 font-body text-sm tracking-[0.2em] uppercase transition-all duration-500',
    idle: 'border-velora-gold text-velora-cream bg-transparent',
    hover: 'hover:bg-velora-gold hover:text-velora-black',
  },
  secondary: {
    base: 'relative inline-flex items-center justify-center overflow-hidden rounded-none border px-8 py-4 font-body text-sm tracking-[0.2em] uppercase transition-all duration-500',
    idle: 'border-white/20 text-velora-cream bg-transparent',
    hover: 'hover:border-velora-gold hover:text-velora-gold',
  },
  dark: {
    base: 'relative inline-flex items-center justify-center overflow-hidden rounded-none border px-8 py-4 font-body text-sm tracking-[0.2em] uppercase transition-all duration-500',
    idle: 'border-velora-gold text-velora-black bg-velora-gold',
    hover: 'hover:bg-transparent hover:text-velora-gold',
  },
}

export default function Button({ children, variant = 'primary', onClick, className = '', ...props }) {
  const v = variants[variant]

  return (
    <motion.button
      className={`${v.base} ${v.idle} ${v.hover} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
