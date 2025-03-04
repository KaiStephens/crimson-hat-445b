'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  // Track scroll position to fade out EXPLORE indicator
  const { scrollYProgress } = useScroll();
  // Transform scrollYProgress (0-1) to opacity (1-0)
  // This will make the indicator fully visible at the top and fade out as scrolling down
  const exploreOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden bg-black">
      <div className="container-sm">
        <div className="text-center max-w-3xl mx-auto relative">
          {/* Sun Glare Effect - positioned behind the title */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
            animate={{ 
              scale: [0.95, 1.15, 0.95], 
              opacity: [0.6, 0.9, 0.6]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut"
            }}
          >
            {/* Sun core - ENHANCED */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 rounded-full bg-yellow-50 blur-xl" 
                 style={{ 
                   opacity: 0.9,
                   boxShadow: '0 0 80px 40px rgba(255, 255, 200, 0.8)'
                 }}
            />
            
            {/* Sun rays - ENHANCED */}
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 origin-center"
                style={{ 
                  height: '180%',
                  width: '4px',
                  background: 'linear-gradient(to bottom, rgba(255, 255, 200, 0.9) 0%, rgba(255, 230, 150, 0) 80%)',
                  transform: `translate(-50%, -50%) rotate(${i * 15}deg)`,
                  filter: 'blur(1px)'
                }}
                animate={{
                  opacity: [0.5, 0.9, 0.5],
                  height: ['160%', '200%', '160%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1 % 1
                }}
              />
            ))}
            
            {/* Lens flare circles - ENHANCED */}
            {[
              { size: 40, x: '60%', y: '30%', opacity: 0.6 },
              { size: 60, x: '-70%', y: '20%', opacity: 0.5 },
              { size: 30, x: '40%', y: '-60%', opacity: 0.7 },
              { size: 25, x: '-30%', y: '-40%', opacity: 0.8 },
              { size: 20, x: '-50%', y: '50%', opacity: 0.9 }
            ].map((flare, i) => (
              <motion.div
                key={`flare-${i}`}
                className="absolute rounded-full bg-yellow-50"
                style={{ 
                  width: flare.size,
                  height: flare.size,
                  top: '50%',
                  left: '50%',
                  transform: `translate(${flare.x}, ${flare.y})`,
                  filter: 'blur(2px)',
                  opacity: flare.opacity
                }}
                animate={{
                  scale: [0.8, 1.4, 0.8],
                  opacity: [flare.opacity * 0.7, flare.opacity, flare.opacity * 0.7]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.7
                }}
              />
            ))}
            
            {/* Light beam sweeps - ENHANCED */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400%] h-[20px] origin-center opacity-50"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 200, 0.9) 50%, transparent 100%)',
                filter: 'blur(5px)'
              }}
              animate={{
                rotate: [0, 360]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
          
          {/* Main heading with enhanced text effect */}
          <motion.h1 
            className="text-5xl md:text-7xl font-light mb-8 tracking-tight text-gray-900 dark:text-white relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {['Minimal.', 'Sustainable.', 'AI-inspired.'].map((word, i) => (
              <motion.span 
                key={i}
                className="inline-block mr-4 relative backdrop-blur-sm"
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
          
          {/* Subheading with subtle animation */}
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Minimalist apparel crafted for the digital age. Clean lines, thoughtful designs, and subtle references to the AI technologies shaping our future.
          </motion.p>
          
          {/* CTA buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.a
              href="#sustainability"
              className="btn-primary relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Collection
              
              {/* Button hover effect */}
              <motion.div 
                className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(45deg, rgba(100,150,255,0.2) 0%, rgba(255,255,255,0.2) 100%)',
                }}
                transition={{ duration: 0.2 }}
              />
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
      
      {/* EXPLORE indicator */}
      <motion.div 
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        style={{ 
          opacity: exploreOpacity,
          willChange: 'transform, opacity'
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