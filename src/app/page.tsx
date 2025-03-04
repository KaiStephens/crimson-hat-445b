'use client';

import { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductsGrid from './components/ProductsGrid';
// import FeaturedProducts from './components/FeaturedProducts'; // Alternative component with predefined products
import Footer from './components/Footer';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(featuredRef, { once: true, margin: "-100px" });
  
  // Parallax effect for the features section
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Featured Products Section */}
      <section id="featured-products" className="py-24" ref={featuredRef}>
        <div className="container-sm">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12 text-center"
          >
            <motion.h2 
              className="text-3xl font-light mb-4 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Featured Collection
            </motion.h2>
            <motion.p
              className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Our most popular AI-inspired pieces, crafted for those who appreciate 
              minimal design with intellectual references.
            </motion.p>
          </motion.div>
          
          <ProductsGrid />
        </div>
      </section>
      
      {/* Features Section with Parallax */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden" ref={scrollRef}>
        <div className="container-sm relative">
          {/* Background elements */}
          <motion.div 
            className="absolute inset-0 -z-10 opacity-5"
            style={{ y }}
          >
            {[...Array(20)].map((_, i) => (
              <motion.div 
                key={i}
                className="absolute rounded-full bg-gray-900 dark:bg-gray-100"
                style={{
                  width: Math.random() * 300 + 50,
                  height: Math.random() * 300 + 50,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.3,
                }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ 
                  duration: 1.5, 
                  delay: 0.1 * i,
                  ease: [0.19, 1, 0.22, 1]
                }}
                viewport={{ once: true, margin: "-100px" }}
              />
            ))}
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl font-light mb-6 tracking-tight">The Future of Fashion</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Our designs merge artificial intelligence concepts with minimalist aesthetics.
                Each piece is a conversation about how technology shapes our future, rendered in
                clean, sustainable fabrics.
              </p>
              
              <div className="space-y-4">
                {[
                  { title: 'Sustainable Materials', desc: 'Eco-friendly fabrics with minimal environmental impact' },
                  { title: 'Ethical Production', desc: 'Fair labor practices throughout our supply chain' },
                  { title: 'Carbon Neutral', desc: 'Offset emissions for all shipping and manufacturing' },
                ].map((feature, i) => (
                  <motion.div 
                    key={i}
                    className="flex gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + (i * 0.1) }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base font-medium mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              className="relative aspect-square"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gray-200 dark:text-gray-800">
                <path fill="currentColor" d="M40.5,-62.6C50.9,-55.3,56.9,-40.2,61.7,-25.8C66.5,-11.4,70.2,2.3,67.6,14.7C65,27.1,56.1,38.3,45.3,47.7C34.6,57.1,22,64.8,7.2,68.6C-7.6,72.4,-24.5,72.3,-38.5,65.6C-52.5,58.9,-63.6,45.5,-68.8,30.5C-74,15.5,-73.3,-1.2,-68.4,-15.8C-63.6,-30.3,-54.7,-42.7,-43,-52.2C-31.3,-61.8,-15.7,-68.5,0.7,-69.5C17.1,-70.6,30.1,-69.9,40.5,-62.6Z" transform="translate(100 100)" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="bg-black text-white dark:bg-white dark:text-black rounded-full w-24 h-24 flex items-center justify-center text-lg font-light"
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  QUANTUM
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Community Signup Section */}
      <section className="py-24">
        <div className="container-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-lg mx-auto text-center"
          >
            <h2 className="text-3xl font-light mb-4 tracking-tight">Join Our Community</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Sign up for updates on new drops, design insights, and early access to limited editions.
            </p>
            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <motion.input
                  type="email"
                  className="flex-1 px-4 py-2.5 sm:py-3 rounded-md bg-white dark:bg-black border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
                  placeholder="Your email"
                  required
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.button
                  type="submit"
                  className="btn-primary px-6 py-2.5 sm:py-3 rounded-md"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  Subscribe
                </motion.button>
              </div>
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-500">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
