'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  // Track scroll position to fade out EXPLORE indicator
  const { scrollYProgress } = useScroll();
  // Transform scrollYProgress (0-1) to opacity (1-0)
  // This will make the indicator fully visible at the top and fade out as scrolling down
  const exploreOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container-sm">
        <div className="text-center max-w-3xl mx-auto relative">
          {/* Simplified background gradient animation */}
          <motion.div 
            className="absolute inset-0 -z-10 rounded-full opacity-60 blur-[100px]"
            style={{ 
              background: 'radial-gradient(circle, rgba(100,150,255,1) 0%, rgba(255,255,255,0) 70%)',
              filter: 'blur(40px)',
              willChange: 'transform, opacity' // Performance hint
            }}
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.5, 0.4],
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Simplified glare effect */}
          <motion.div 
            className="absolute -z-10 w-[200%] h-[200%] left-[-50%] top-[-50%]"
            style={{
              background: 'conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0) 0%, rgba(100,150,255,0.2) 50%, rgba(255,255,255,0) 100%)',
              willChange: 'transform' // Performance hint
            }}
            animate={{
              rotate: [0, 360]
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Reduced animated lines (only 3 instead of 6) */}
          <div className="absolute inset-0 -z-10">
            {[...Array(3)].map((_, i) => (
              <motion.div 
                key={i}
                className="absolute top-1/2 left-1/2 h-[1px] w-full"
                style={{ 
                  originX: 0,
                  rotate: i * 60,
                  background: 'linear-gradient(90deg, rgba(100,150,255,0) 0%, rgba(100,150,255,0.3) 50%, rgba(100,150,255,0) 100%)',
                  boxShadow: '0 0 10px rgba(100,150,255,0.5)',
                  willChange: 'transform, opacity' // Performance hint
                }}
                initial={{ scaleX: 0 }}
                animate={{ 
                  scaleX: [0, 1, 0],
                  opacity: [0, 0.5, 0]
                }}
                transition={{ 
                  duration: 4,
                  delay: i * 0.5,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              />
            ))}
          </div>
          
          {/* Main heading with optimized animations */}
          <motion.h1 
            className="text-5xl md:text-7xl font-light mb-8 tracking-tight text-gray-900 dark:text-white relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {['Minimal.', 'Sustainable.', 'AI-inspired.'].map((word, i) => (
              <motion.span 
                key={i}
                className="inline-block mr-4 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.7, 
                  delay: 0.2 + (i * 0.15),
                  ease: [0.19, 1, 0.22, 1]
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          
          {/* Simplified subheading without glow effect */}
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Minimalist apparel crafted for the digital age. Clean lines, thoughtful designs, and subtle references to the AI technologies shaping our future.
          </motion.p>
          
          {/* Enhanced CTA buttons - fixed Twitter link */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.a
              href="#featured-products"
              className="btn-primary relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Collection
            </motion.a>
            <motion.a
              href="https://x.com/artificialwear"
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors relative overflow-hidden flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg 
                className="w-4 h-4" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Follow on X
            </motion.a>
          </motion.div>
        </div>
      </div>
      
      {/* Optimized EXPLORE indicator */}
      <motion.div 
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        style={{ 
          opacity: exploreOpacity,
          willChange: 'transform, opacity' // Performance hint
        }}
      >
        <motion.div
          className="flex flex-col items-center"
          animate={{ 
            y: [0, 5, 0]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <motion.span 
            className="text-sm tracking-widest font-medium px-6 py-2 rounded-full mb-3"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)', 
              color: 'white',
              textShadow: '0 0 5px rgba(100,150,255,0.8)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(100,150,255,0.3)',
              boxShadow: '0 4px 10px rgba(0,0,0,0.4)'
            }}
          >
            EXPLORE
          </motion.span>
          <div
            className="w-[2px] h-10 bg-gradient-to-b from-white to-transparent"
            style={{
              boxShadow: '0 0 5px rgba(100,150,255,0.6)'
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
} 