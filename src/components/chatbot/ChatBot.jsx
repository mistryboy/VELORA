import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const chatFlows = {
  welcome: {
    message: "Hello! I'm your VELORA Kitchen Design Assistant. I'd love to help you envision your dream kitchen. Let's start — what's your approximate budget range?",
    options: [
      { label: '₹3L – ₹5L', value: 'budget-3-5', next: 'size' },
      { label: '₹5L – ₹8L', value: 'budget-5-8', next: 'size' },
      { label: '₹8L – ₹12L', value: 'budget-8-12', next: 'size' },
      { label: '₹12L+', value: 'budget-12+', next: 'size' },
    ],
  },
  size: {
    message: "Great choice! Now, what's the size of your kitchen space?",
    options: [
      { label: 'Compact (< 80 sq ft)', value: 'small', next: 'style' },
      { label: 'Medium (80–120 sq ft)', value: 'medium', next: 'style' },
      { label: 'Large (120–180 sq ft)', value: 'large', next: 'style' },
      { label: 'XL (180+ sq ft)', value: 'xl', next: 'style' },
    ],
  },
  style: {
    message: "Wonderful! What design aesthetic speaks to you?",
    options: [
      { label: 'Modern Minimal', value: 'modern', next: 'result' },
      { label: 'Classic Elegant', value: 'classic', next: 'result' },
      { label: 'Contemporary', value: 'contemporary', next: 'result' },
      { label: 'Industrial Chic', value: 'industrial', next: 'result' },
    ],
  },
}


export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [currentStep, setCurrentStep] = useState('welcome')
  const [answers, setAnswers] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const startChat = () => {
    if (hasStarted) return
    setHasStarted(true)
    setIsTyping(true)
    setTimeout(() => {
      setMessages([{ type: 'bot', text: chatFlows.welcome.message, options: chatFlows.welcome.options }])
      setIsTyping(false)
    }, 1200)
  }

  useEffect(() => {
    if (isOpen && !hasStarted) {
      startChat()
    }
  }, [isOpen])

  const handleOption = (option, stepKey) => {
    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: option.label }])
    setAnswers(prev => [...prev, { step: stepKey, value: option.value }])

    // Show typing
    setIsTyping(true)

    setTimeout(() => {
      if (option.next === 'result') {
        setMessages(prev => [
          ...prev,
          { type: 'bot', text: "Wonderful choice! I've captured your design preferences. \n\nPlease fill out the consultation form below, and our experts will reach out with a personalized 3D render. 🌟" },
        ])
        const el = document.getElementById('lead-capture')
        if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 1500)
        setCurrentStep('done')
      } else if (option.next === 'restart') {
        setMessages([])
        setAnswers([])
        setHasStarted(false)
        setCurrentStep('welcome')
        setTimeout(() => startChat(), 300)
      } else if (option.next === 'done') {
        setMessages(prev => [
          ...prev,
          { type: 'bot', text: "Wonderful! Please fill out the consultation form below, and our design team will reach out within 24 hours. Thank you for choosing VELORA! 🌟" },
        ])
        const el = document.getElementById('lead-capture')
        if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 1500)
      } else {
        const nextFlow = chatFlows[option.next]
        setMessages(prev => [
          ...prev,
          { type: 'bot', text: nextFlow.message, options: nextFlow.options },
        ])
        setCurrentStep(option.next)
      }
      setIsTyping(false)
    }, 800 + Math.random() * 600)
  }

  // Format message text with basic markdown
  const formatText = (text) => {
    return text.split('\n').map((line, i) => {
      const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      return <span key={i} dangerouslySetInnerHTML={{ __html: formatted }} style={{ display: 'block', marginBottom: line === '' ? '8px' : '2px' }} />
    })
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        id="chat-toggle-btn"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-velora-gold text-velora-black flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-500"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 3, type: 'spring', stiffness: 200, damping: 15 }}
        style={{ animation: !isOpen ? 'pulse-glow 3s infinite' : 'none' }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg key="close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </motion.svg>
          ) : (
            <motion.svg key="chat" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[520px] flex flex-col rounded-sm overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="bg-velora-black px-6 py-4 flex items-center gap-3 border-b border-white/5">
              <div className="w-8 h-8 rounded-full bg-velora-gold/20 flex items-center justify-center">
                <span className="text-velora-gold text-sm">V</span>
              </div>
              <div>
                <h4 className="font-body text-sm text-velora-cream font-medium">VELORA AI Designer</h4>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="font-body text-[10px] text-velora-cream/40">Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-velora-charcoal" data-lenis-prevent>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <div className={`max-w-[85%] ${msg.type === 'user' ? 'order-1' : ''}`}>
                    <div
                      className={`px-4 py-3 text-sm leading-relaxed ${
                        msg.type === 'user'
                          ? 'bg-velora-gold text-velora-black rounded-t-lg rounded-bl-lg'
                          : 'bg-velora-dark text-velora-cream/80 rounded-t-lg rounded-br-lg'
                      }`}
                    >
                      {formatText(msg.text)}
                    </div>
                    {/* Options */}
                    {msg.options && msg.type === 'bot' && i === messages.length - 1 && (
                      <div className="mt-2 space-y-1.5">
                        {msg.options.map((opt) => (
                          <motion.button
                            key={opt.value}
                            onClick={() => handleOption(opt, currentStep)}
                            className="w-full text-left px-4 py-2.5 text-xs tracking-wide border border-white/10 text-velora-cream/60 hover:border-velora-gold/50 hover:text-velora-gold transition-all duration-300 rounded-sm"
                            whileHover={{ x: 4 }}
                          >
                            {opt.label}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="bg-velora-dark px-4 py-3 rounded-t-lg rounded-br-lg flex items-center gap-1.5">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            <div className="bg-velora-black px-4 py-3 border-t border-white/5">
              <p className="font-body text-[10px] text-velora-cream/20 text-center tracking-wider">
                Powered by VELORA AI • Select an option above
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
