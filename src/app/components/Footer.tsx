'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const fadeInUpAnimation = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <footer className="bg-white dark:bg-black pt-16 pb-10 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <motion.div
            className="col-span-1"
            {...fadeInUpAnimation}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <div className="flex items-center mb-4">
              <Image 
                src="/images/image.png" 
                alt="Artificial Wearables Logo" 
                width={40} 
                height={40}
                className="rounded-full mr-2"
              />
              <span className="text-lg font-medium">Artificial Wearables</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Minimalist AI-inspired apparel for the modern age. Clean design, sustainable materials, and subtle technology references.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://x.com/artificialwear"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Shop */}
          <motion.div
            className="col-span-1"
            {...fadeInUpAnimation}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Shop</h3>
            <ul className="space-y-3">
              <li><Link href="/#featured-products" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/collections/tees" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">T-Shirts</Link></li>
              <li><Link href="/collections/hoodies" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Hoodies</Link></li>
              <li><Link href="/collections/accessories" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Accessories</Link></li>
            </ul>
          </motion.div>

          {/* Info */}
          <motion.div
            className="col-span-1"
            {...fadeInUpAnimation}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Info</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/sustainability" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link href="/faq" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            className="col-span-1"
            {...fadeInUpAnimation}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/size-guide" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Size Guide</Link></li>
            </ul>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div 
          className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Artificial Wearables. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/terms" className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-sm">Terms</Link>
            <Link href="/privacy" className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-sm">Privacy</Link>
            <Link href="/cookies" className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-sm">Cookies</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}