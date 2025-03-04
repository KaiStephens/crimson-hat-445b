'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      <div className="container-sm">
        <div className="text-center max-w-3xl mx-auto relative">
          {/* Background gradient animation */}
          <motion.div 
            className="absolute inset-0 -z-10 rounded-full opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(200,200,255,1) 0%, rgba(255,255,255,0) 70%)' }}
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Animated lines */}
          <div className="absolute inset-0 -z-10">
            {[...Array(3)].map((_, i) => (
              <motion.div 
                key={i}
                className="absolute top-1/2 left-1/2 h-[1px] w-full bg-gray-200 dark:bg-gray-800"
                style={{ 
                  originX: 0,
                  rotate: i * 60,
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ 
                  duration: 1.5,
                  delay: 0.2 + (i * 0.2),
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
          
          {/* Main heading with word staggering */}
          <motion.h1 
            className="text-4xl md:text-6xl font-light mb-6 tracking-tight text-gray-900 dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {['Minimal.', 'Sustainable.', 'AI-inspired.'].map((word, i) => (
              <motion.span 
                key={i}
                className="inline-block mr-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.7, 
                  delay: 0.3 + (i * 0.2),
                  ease: [0.19, 1, 0.22, 1]
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          
          {/* Subheading with fade in */}
          <motion.p 
            className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            Minimalist apparel crafted for the digital age. Clean lines, thoughtful designs, and subtle references to the AI technologies shaping our future.
          </motion.p>
          
          {/* CTA buttons with staggered animations */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <motion.a
              href="#featured-products"
              className="btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Shop Collection
            </motion.a>
            <motion.a
              href="#about"
              className="btn border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Our Story
            </motion.a>
          </motion.div>
          
          {/* Scroll hint */}
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 bottom-0 transform translate-y-20 opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0], y: [10, 20, 30] }}
            transition={{ 
              delay: 2,
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            <svg 
              width="20" 
              height="32" 
              viewBox="0 0 20 32" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-500 dark:text-gray-400"
            >
              <rect x="1" y="1" width="18" height="30" rx="9" stroke="currentColor" strokeWidth="2"/>
              <motion.circle 
                animate={{ y: [5, 20, 5] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                cx="10" 
                cy="10" 
                r="4" 
                fill="currentColor"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 