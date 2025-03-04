'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-16">
      <div className="container-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            AI-inspired design.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-300">
              Minimal aesthetics.
            </span>
          </h1>
          <p className="text-lg mb-8 text-gray-600 dark:text-gray-400">
            Clothing that speaks to the future without saying too much.
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.a 
              href="/shop"
              className="btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Shop Now
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 