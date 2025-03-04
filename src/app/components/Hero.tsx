'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Background decoration */}
      <div className="hidden sm:block sm:absolute sm:inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-indigo-100 to-transparent dark:from-indigo-900/20 dark:to-transparent opacity-50 rounded-bl-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-violet-100 to-transparent dark:from-violet-900/20 dark:to-transparent opacity-50 rounded-tr-[100px]"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-300/30 dark:bg-cyan-600/10 rounded-full filter blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-indigo-300/30 dark:bg-indigo-600/10 rounded-full filter blur-xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 md:py-40">
        <motion.div 
          className="text-center sm:text-left max-w-3xl mx-auto sm:mx-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block text-slate-800 dark:text-slate-100">Wear The Future</span>
            <span className="block bg-gradient-to-r from-indigo-600 to-violet-500 text-transparent bg-clip-text mt-2">
              AI-Inspired Fashion
            </span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto sm:mx-0">
            Express your passion for artificial intelligence with our premium collection of AI-inspired merchandise. From neural network patterns to algorithm aesthetics.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
            <Link href="/products" className="btn-primary text-center px-8 py-3 rounded-lg text-base font-medium">
              Shop Collection
            </Link>
            <Link href="/about" className="border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 px-8 py-3 rounded-lg text-base font-medium text-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 