'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const fadeInUpAnimation = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };
  
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container-sm py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Brand column */}
          <motion.div 
            className="md:col-span-4"
            {...fadeInUpAnimation}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Link href="/" className="block text-lg font-medium mb-4 tracking-tight">
              QUANTUM
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs mb-6">
              Minimalist AI-inspired apparel with clean design aesthetics. The future of fashion in the digital age.
            </p>
            <div className="flex space-x-4">
              {['Twitter', 'Instagram', 'LinkedIn'].map((platform, i) => (
                <motion.a
                  key={platform}
                  href={`https://${platform.toLowerCase()}.com`}
                  className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-label={platform}
                  >
                    {platform === 'Twitter' ? (
                      <>
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </>
                    ) : platform === 'Instagram' ? (
                      <>
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </>
                    ) : (
                      <>
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </>
                    )}
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Navigation columns */}
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Shop',
                links: ['All Products', 'Clothing', 'Accessories', 'New Arrivals']
              },
              {
                title: 'Info',
                links: ['About Us', 'Sustainability', 'FAQ', 'Blog']
              },
              {
                title: 'Support',
                links: ['Contact', 'Shipping', 'Returns', 'Privacy Policy']
              }
            ].map((column, columnIndex) => (
              <motion.div 
                key={column.title}
                {...fadeInUpAnimation} 
                transition={{ duration: 0.5, delay: 0.1 + (columnIndex * 0.1) }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h3 className="text-sm font-medium uppercase tracking-wider mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link}>
                      <Link 
                        href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Footer bottom */}
        <motion.div 
          className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p>© {currentYear} QUANTUM. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="#terms" className="hover:text-black dark:hover:text-white transition-colors">Terms</Link>
            <Link href="#privacy" className="hover:text-black dark:hover:text-white transition-colors">Privacy</Link>
            <Link href="#cookies" className="hover:text-black dark:hover:text-white transition-colors">Cookies</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}