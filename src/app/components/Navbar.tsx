'use client';

import { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/app/context/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { cart, removeFromCart, updateQuantity, getCheckoutUrl } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate cart total
  const cartTotal = cart.reduce((total: number, item: any) => {
    return total + (Number(item.price) * item.quantity);
  }, 0);

  const handleCheckout = async () => {
    const checkoutUrl = await getCheckoutUrl();
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

  return (
    <motion.header 
      className={`fixed w-full z-50 transition-colors duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Image 
              src="/images/image.png"
              alt="Artificial Wearables Logo" 
              width={40} 
              height={40}
              className="rounded-full"
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="/#featured-products">Shop</NavLink>
          <NavLink href="/#features">Features</NavLink>
          <NavLink href="/#about">About</NavLink>
          <NavLink href="/#contact">Contact</NavLink>
        </div>

        <div className="flex items-center">
          {/* Cart button */}
          <motion.button
            onClick={() => setShowCart(true)}
            className="relative p-2 mr-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1"></circle>
              <circle cx="19" cy="21" r="1"></circle>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
            </svg>
            {cart.length > 0 && (
              <motion.span 
                className="absolute -top-1 -right-1 bg-black dark:bg-white text-white dark:text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {cart.reduce((total: number, item: any) => total + item.quantity, 0)}
              </motion.span>
            )}
          </motion.button>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="w-6 h-0.5 bg-current mb-1.5"
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
            />
            <motion.div
              className="w-6 h-0.5 bg-current mb-1.5"
              animate={{ opacity: isOpen ? 0 : 1 }}
            />
            <motion.div
              className="w-6 h-0.5 bg-current"
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden px-4 py-2 pb-6 bg-white dark:bg-black"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex flex-col space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <MobileNavLink href="/#featured-products" onClick={() => setIsOpen(false)}>Shop</MobileNavLink>
              <MobileNavLink href="/#features" onClick={() => setIsOpen(false)}>Features</MobileNavLink>
              <MobileNavLink href="/#about" onClick={() => setIsOpen(false)}>About</MobileNavLink>
              <MobileNavLink href="/#contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart drawer */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            className="fixed inset-0 bg-black/30 z-50 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowCart(false);
              }
            }}
          >
            <motion.div
              className="w-full max-w-md bg-white dark:bg-gray-900 h-full shadow-lg overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-medium">Shopping Cart</h2>
                  <motion.button
                    onClick={() => setShowCart(false)}
                    className="p-1 text-gray-500 hover:text-black dark:hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </motion.button>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">Your cart is empty</p>
                    <motion.button
                      onClick={() => setShowCart(false)}
                      className="btn-primary"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Continue Shopping
                    </motion.button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-8">
                      {cart.map((item: any) => (
                        <motion.div 
                          key={item.id} 
                          className="flex items-center py-3 border-b border-gray-200 dark:border-gray-800"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              width={64}
                              height={64}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">${Number(item.price).toFixed(2)}</p>
                            <div className="flex items-center mt-2">
                              <button 
                                className="p-1 text-gray-500 hover:text-black dark:hover:text-white"
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                              </button>
                              <span className="mx-2 text-gray-700 dark:text-gray-300">{item.quantity}</span>
                              <button 
                                className="p-1 text-gray-500 hover:text-black dark:hover:text-white"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="12" y1="5" x2="12" y2="19"></line>
                                  <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div>
                            <button 
                              className="text-gray-500 hover:text-black dark:hover:text-white"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                              </svg>
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-800 py-4 space-y-4">
                      <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                        <p>Subtotal</p>
                        <p>${cartTotal.toFixed(2)}</p>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <motion.button
                        onClick={handleCheckout}
                        className="w-full btn-primary py-3"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Checkout
                      </motion.button>
                      <motion.button
                        onClick={() => setShowCart(false)}
                        className="w-full text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                        whileHover={{ scale: 1.02 }}
                      >
                        Continue Shopping
                      </motion.button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link href={href} passHref>
      <motion.span
        className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white cursor-pointer"
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {children}
      </motion.span>
    </Link>
  );
}

interface MobileNavLinkProps {
  href: string;
  onClick: () => void;
  children: ReactNode;
}

function MobileNavLink({ href, onClick, children }: MobileNavLinkProps) {
  return (
    <Link href={href} passHref>
      <motion.span
        className="block px-2 py-2 text-lg text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white cursor-pointer"
        onClick={onClick}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.span>
    </Link>
  );
}