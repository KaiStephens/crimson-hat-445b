'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md">
      <div className="container-sm flex items-center justify-between h-16">
        <Link href="/" className="font-bold text-lg">
          QUANTUM
        </Link>

        <button 
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <motion.span 
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-6 bg-current block"
            />
            <motion.span 
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="h-0.5 w-6 bg-current block"
            />
            <motion.span 
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-6 bg-current block"
            />
          </div>
        </button>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/shop" className="text-sm uppercase tracking-wide hover:text-primary">
            Shop
          </Link>
          <Link href="/about" className="text-sm uppercase tracking-wide hover:text-primary">
            About
          </Link>
          <button className="text-sm uppercase tracking-wide hover:text-primary">
            Cart (0)
          </button>
        </nav>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden bg-white dark:bg-black"
        >
          <div className="container-sm py-4 flex flex-col space-y-3">
            <Link href="/shop" className="text-sm uppercase tracking-wide py-2" onClick={() => setIsOpen(false)}>
              Shop
            </Link>
            <Link href="/about" className="text-sm uppercase tracking-wide py-2" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <button className="text-sm uppercase tracking-wide py-2 text-left">
              Cart (0)
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
} 