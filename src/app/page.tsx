'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import FeaturedProducts from './components/FeaturedProducts';
import Footer from './components/Footer';

export default function Home() {
  const featuredRef = useRef<HTMLDivElement>(null);
  const featuredInView = useInView(featuredRef, { once: true, amount: 0.2 });

  const featuresRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: featuresRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 1, 0.1]);

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Navbar />
      <Hero />
      
      {/* Featured Products */}
      <motion.section 
        id="featured-products"
        ref={featuredRef}
        className="py-24 relative"
      >
        <div className="container-sm">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={featuredInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-14 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-tight">Featured Collection</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Minimalist designs with subtle AI-inspired elements. Each piece tells a story at the intersection of technology and human creativity.
            </p>
          </motion.div>
          <FeaturedProducts />
        </div>
      </motion.section>

      {/* Features */}
      <section 
        id="features" 
        ref={featuresRef}
        className="py-28 relative overflow-hidden"
      >
        {/* Background elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            style={{ 
              y, 
              opacity,
              background: 'linear-gradient(45deg, rgba(235,235,235,0.3) 0%, rgba(255,255,255,0) 70%)'
            }}
            className="absolute top-0 right-0 w-full h-full rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4"
          />
          
          {/* Create abstract design elements */}
          {[...Array(5)].map((_, i) => (
            <motion.div 
              key={i}
              className="absolute rounded-full bg-gray-100 dark:bg-gray-800"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 150 + 50}px`,
                height: `${Math.random() * 150 + 50}px`,
                opacity: 0.1,
              }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: [0, 0.1, 0.05] }}
              transition={{ 
                duration: 2, 
                delay: i * 0.2,
                ease: "easeOut"
              }}
            />
          ))}
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="absolute inset-0"
          >
            <div className="absolute top-1/4 left-1/4 w-40 h-40 border border-gray-200 dark:border-gray-800 rounded-full" />
            <div className="absolute top-1/3 right-1/3 w-60 h-60 border border-gray-200 dark:border-gray-800 rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-20 h-20 border border-gray-200 dark:border-gray-800 rounded-full" />
          </motion.div>
        </div>
        
        <div className="container-sm relative z-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-light mb-8 tracking-tight text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            The Artificial Wearables Experience
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              className="p-6 flex flex-col"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 3a2 2 0 0 0-2 2"></path>
                    <path d="M19 3a2 2 0 0 1 2 2"></path>
                    <path d="M21 19a2 2 0 0 1-2 2"></path>
                    <path d="M5 21a2 2 0 0 1-2-2"></path>
                    <path d="M9 3h1"></path>
                    <path d="M9 21h1"></path>
                    <path d="M14 3h1"></path>
                    <path d="M14 21h1"></path>
                    <path d="M3 9v1"></path>
                    <path d="M21 9v1"></path>
                    <path d="M3 14v1"></path>
                    <path d="M21 14v1"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Minimalist Design</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Clean lines and thoughtful design elements create a modern aesthetic that speaks to the digital age while remaining timeless.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="p-6 flex flex-col"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m2 12 5.45 5.45"></path>
                    <path d="m2 12 5.45-5.45"></path>
                    <path d="M22 12l-5.45 5.45"></path>
                    <path d="M22 12l-5.45-5.45"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Sustainable Materials</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Ethically sourced fabrics and eco-friendly production methods align with our commitment to sustainability and responsible innovation.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="p-6 flex flex-col"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">AI-Inspired Patterns</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Subtle patterns and textures inspired by neural networks, algorithms, and data structures create an elegant homage to artificial intelligence.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="p-6 flex flex-col"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Crafted with Care</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Each item is produced with attention to detail and quality, ensuring both comfort and durability for everyday wear.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Community Sign Up */}
      <section className="py-20 bg-gray-50 dark:bg-black">
        <div className="container-sm text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-tight">Join Our Community</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-8">
              Be the first to know about new releases, limited editions, and community events. No spam, just the good stuff.
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <motion.input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                />
                <motion.button 
                  className="btn-primary py-3 px-6"
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Subscribe
                </motion.button>
              </div>
              <motion.p 
                className="text-xs text-gray-500 dark:text-gray-400 mt-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
