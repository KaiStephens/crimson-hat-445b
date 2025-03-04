'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { items, itemCount, removeItem, checkout } = useCart();

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Calculate cart total
  const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Handle checkout
  const handleCheckout = async () => {
    try {
      const checkoutUrl = await checkout();
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };
  
  return (
    <>
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 py-4 ${isScrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      >
        <div className="container-sm">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-lg font-medium tracking-tight">
              QUANTUM
            </Link>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-6">
              <NavLink href="/products">Products</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </nav>
            
            {/* Cart and Menu buttons */}
            <div className="flex items-center space-x-2">
              {/* Cart button */}
              <motion.button
                onClick={() => setShowCart(true)}
                className="relative p-2"
                whileHover={{ scale: 1.05 }}
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
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-1 -right-1 bg-black dark:bg-white text-white dark:text-black text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </motion.button>
              
              {/* Mobile menu button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2"
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-6 flex flex-col items-end space-y-1.5">
                  <motion.span 
                    animate={{ 
                      width: isOpen ? '1.5rem' : '1.5rem',
                      rotate: isOpen ? 45 : 0,
                      y: isOpen ? 8 : 0
                    }}
                    className="h-0.5 bg-current inline-block"
                  />
                  <motion.span 
                    animate={{ 
                      width: isOpen ? 0 : '1rem',
                      opacity: isOpen ? 0 : 1
                    }}
                    className="h-0.5 bg-current inline-block"
                  />
                  <motion.span 
                    animate={{ 
                      width: isOpen ? '1.5rem' : '0.75rem',
                      rotate: isOpen ? -45 : 0,
                      y: isOpen ? -8 : 0
                    }}
                    className="h-0.5 bg-current inline-block"
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 z-40 bg-white dark:bg-black pt-24"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="container px-4">
              <nav className="flex flex-col space-y-6 text-lg">
                {['Products', 'About', 'Contact'].map((item, i) => (
                  <motion.a
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="text-xl hover:opacity-60 transition-opacity"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (i * 0.1) }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Cart drawer */}
      <AnimatePresence>
        {showCart && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/40 dark:bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
            />
            
            {/* Cart panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white dark:bg-gray-900 shadow-lg flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <h2 className="text-lg font-medium">Your Cart ({itemCount})</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-2 -mr-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
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
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mb-4 text-gray-400"
                  >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Your cart is empty</p>
                  <button
                    onClick={() => setShowCart(false)}
                    className="btn-primary py-2 px-4"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto px-6 py-4">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-800">
                      {items.map((item) => (
                        <motion.li
                          key={item.id}
                          className="py-4 flex"
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <div
                            className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm bg-gray-100 dark:bg-gray-800"
                          >
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-4 flex flex-1 flex-col">
                            <div className="flex justify-between">
                              <h3 className="text-sm font-medium">{item.name}</h3>
                              <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                            <div className="flex-1"></div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="w-max text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                            >
                              Remove
                            </button>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-800 px-6 py-4">
                    <div className="flex justify-between mb-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Subtotal</p>
                      <p className="text-sm font-medium">${cartTotal.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full btn-primary py-3"
                    >
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// NavLink component with animation
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative group">
      <span className="text-sm">{children}</span>
      <motion.span
        className="absolute bottom-0 left-0 w-full h-0.5 bg-current transform origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  );
} 