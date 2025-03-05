'use client';

import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useCart } from '@/app/context/CartContext';

// Separate client component that uses useSearchParams
function OrderDetails() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [orderId, setOrderId] = useState<string>('');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  
  useEffect(() => {
    // Get order ID from URL or generate a random one as fallback
    const orderIdFromUrl = searchParams.get('orderId') || '';
    const checkoutSessionId = searchParams.get('checkoutSessionId') || '';
    
    // Use either orderId or checkoutSessionId (from Fourthwall)
    const displayOrderId = orderIdFromUrl || checkoutSessionId || `ORD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    setOrderId(displayOrderId);
    
    // Clear the cart when the success page loads
    clearCart();
    
    // If we have a checkoutSessionId from Fourthwall, we could fetch more order details
    // but we'll keep it simple for now
  }, [clearCart, searchParams]);

  return (
    <div className="space-y-4 mb-8">
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
        <h2 className="font-medium mb-2">Order Details</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Order #: {orderId}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Date: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}

// Loading fallback
function OrderDetailsSkeleton() {
  return (
    <div className="space-y-4 mb-8">
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-1"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/4"></div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
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
          
          <Suspense fallback={<OrderDetailsSkeleton />}>
            <OrderDetails />
          </Suspense>
          
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