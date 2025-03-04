'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useCart } from '@/app/context/CartContext';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [orderId, setOrderId] = useState<string>('');
  
  useEffect(() => {
    // Get order ID from URL or generate a random one as fallback
    const orderIdFromUrl = searchParams.get('orderId');
    setOrderId(orderIdFromUrl || `ORD-${Math.floor(Math.random() * 1000000)}`);
    
    // Clear the cart when the success page loads
    clearCart();
  }, [clearCart, searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-900 p-10 rounded-lg shadow-sm"
        >
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-10 w-10 text-green-500"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Thank you for your purchase. We&apos;ve received your order and will process it shortly.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
              <h2 className="font-medium mb-2">Order Details</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Order #: {orderId}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/" passHref>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors rounded-sm"
              >
                Continue Shopping
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
} 