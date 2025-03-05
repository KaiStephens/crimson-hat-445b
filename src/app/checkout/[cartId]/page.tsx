'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '@/app/context/CartContext';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const cartId = params.cartId as string;
  const { cart, cartTotal, clearCart, isLoading: isCartLoading, cartId: contextCartId, getCheckoutUrl } = useCart();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [cartError, setCartError] = useState<boolean>(false);
  
  // Directly fetch cart data from the API to ensure we have the latest data
  const fetchCartDirectly = async (id: string) => {
    try {
      const response = await fetch(`/api/cart?cartId=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cart data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching cart directly:', error);
      throw error;
    }
  };
  
  useEffect(() => {
    const validateCart = async () => {
      try {
        setIsLoading(true);
        setCartError(false);
        setError(null);
        
        if (!cartId) {
          throw new Error('Cart ID is missing');
        }
        
        // Check if the context cart ID matches the URL parameter
        if (contextCartId && contextCartId !== cartId) {
          console.warn('Cart ID mismatch between context and URL');
        }
        
        // Fetch cart data directly from the API to ensure it's up to date
        const cartData = await fetchCartDirectly(cartId);
        
        if (!cartData || !cartData.items || cartData.items.length === 0) {
          setCartError(true);
          throw new Error('Your shopping cart is empty');
        }
        
        // Set cart items for display in the checkout
        setCartItems(cartData.items.map((item: any) => ({
          id: item.id || Math.random().toString(36).substring(2, 15),
          variantId: item.variant.id,
          name: item.variant.name,
          price: item.variant.unitPrice?.value || item.variant.price || 0,
          quantity: item.quantity,
          imageUrl: item.variant.images?.[0]?.url || '/placeholder-image.jpg',
        })));
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error validating cart:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        setIsLoading(false);
      }
    };

    // Only validate when we're sure the cart context has loaded
    if (!isCartLoading) {
      validateCart();
    }
  }, [cartId, contextCartId, isCartLoading]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      if (!cartId) {
        throw new Error('Cart ID is missing');
      }
      
      // Call the getCheckoutUrl function from the cart context
      const checkoutUrl = await getCheckoutUrl();
      
      if (!checkoutUrl) {
        throw new Error('Failed to create checkout');
      }
      
      // Redirect to the success page
      router.push(checkoutUrl);
    } catch (error) {
      console.error('Error submitting order:', error);
      setError('Failed to process your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Show loading state when either the cart context is loading or the page is loading
  if (isCartLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
            <div className="h-60 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (error || cartError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
          <p className="mb-6">{error || "Your shopping cart is empty"}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black"
            >
              Continue Shopping
            </button>
            {cartError && (
              <button
                onClick={() => router.push('/')}
                className="px-6 py-3 bg-transparent border border-black text-black dark:border-white dark:text-white"
              >
                View Products
              </button>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Check if we have cart items to display
  const displayItems = cartItems.length > 0 ? cartItems : cart;
  const displayTotal = cartItems.length > 0 
    ? cartItems.reduce((total, item) => total + (item.price * item.quantity), 0) 
    : cartTotal;
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Order summary */}
            <div className="md:col-span-1 bg-white dark:bg-gray-900 p-6 rounded shadow-sm">
              <h2 className="text-xl font-medium mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {displayItems.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex items-center">
                      {item.imageUrl && (
                        <div className="w-10 h-10 rounded overflow-hidden mr-3 hidden sm:block">
                          <Image 
                            src={item.imageUrl}
                            alt={item.name}
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t dark:border-gray-800 pt-4">
                <div className="flex justify-between font-bold">
                  <p>Total</p>
                  <p>${displayTotal.toFixed(2)}</p>
                </div>
              </div>
            </div>
            
            {/* Checkout form */}
            <div className="md:col-span-2 bg-white dark:bg-gray-900 p-6 rounded shadow-sm">
              <h2 className="text-xl font-medium mb-4">Payment Details</h2>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded"
                    />
                  </div>
                </div>
                
                <hr className="border-gray-200 dark:border-gray-800" />
                
                <div>
                  <label className="block text-sm font-medium mb-1">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    placeholder="**** **** **** ****"
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                      placeholder="MM/YY"
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      placeholder="***"
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded"
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 mt-6 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? (
                    <span className="inline-block animate-spin mr-2">⟳</span>
                  ) : null}
                  {isSubmitting ? 'Processing...' : 'Complete Order'}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
} 