'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

interface Variant {
  id: string;
  name: string;
  price: number;
  sku: string;
  inStock: boolean;
}

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  slug: string;
  variants: Variant[];
  category?: string;
  tags?: string[];
}

function ProductDetailContent() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [imgError, setImgError] = useState(false);
  
  const { addToCart } = useCart();
  
  // Fallback image for products
  const fallbackImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjgwMCIgdmlld0JveD0iMCAwIDgwMCA4MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI4MDAiIGZpbGw9IiNGMkYyRjIiLz48cGF0aCBkPSJNNDAwIDI1MEMzMDUuOTY0IDI1MCAyMzAgMzI1Ljk2NCAyMzAgNDIwQzIzMCA1MTQuMDM2IDMwNS45NjQgNTkwIDQwMCA1OTBDNDk0LjAzNiA1OTAgNTcwIDUxNC4wMzYgNTcwIDQyMEM1NzAgMzI1Ljk2NCA0OTQuMDM2IDI1MCA0MDAgMjUwWiIgZmlsbD0iI0U1RTVFNSIvPjwvc3ZnPg==';
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // First get all products
        const productsResponse = await fetch('/api/products');
        
        if (!productsResponse.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const products = await productsResponse.json();
        
        // Find the product with matching slug
        const foundProduct = products.find((p: any) => p.slug === slug);
        
        if (!foundProduct) {
          throw new Error('Product not found');
        }
        
        console.log('Found product data:', foundProduct);
        setProduct(foundProduct);
        
        // Select the first variant by default
        if (foundProduct.variants && foundProduct.variants.length > 0) {
          // Find first in-stock variant if available, otherwise select the first one
          const inStockVariant = foundProduct.variants.find((v: Variant) => v.inStock === true);
          setSelectedVariant(inStockVariant || foundProduct.variants[0]);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (slug) {
      fetchProduct();
    }
  }, [slug]);
  
  const handleAddToCart = async () => {
    if (!product || !selectedVariant) return;
    
    try {
      setAddingToCart(true);
      
      // Call addToCart with product details and the selected variant ID
      await addToCart({
        id: product.id,
        name: product.name,
        price: selectedVariant.price,
        imageUrl: product.imageUrl,
        slug: product.slug
      }, selectedVariant.id);
      
      // Show a success message or feedback
      const notification = document.createElement('div');
      notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-out';
      notification.textContent = 'Added to cart';
      document.body.appendChild(notification);
      
      // Remove the notification after a delay
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      
      // Show error message
      const errorNotification = document.createElement('div');
      errorNotification.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50';
      errorNotification.textContent = 'Failed to add to cart';
      document.body.appendChild(errorNotification);
      
      // Remove the error notification after a delay
      setTimeout(() => {
        if (document.body.contains(errorNotification)) {
          document.body.removeChild(errorNotification);
        }
      }, 2000);
    } finally {
      setAddingToCart(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-pulse">
              <div className="aspect-square bg-gray-900"></div>
              <div>
                <div className="h-8 bg-gray-900 w-3/4 mb-4"></div>
                <div className="h-6 bg-gray-900 w-1/4 mb-6"></div>
                <div className="h-20 bg-gray-900 w-full mb-6"></div>
                <div className="h-10 bg-gray-900 w-1/2 mb-4"></div>
                <div className="h-12 bg-gray-900 w-full"></div>
              </div>
            </div>
          ) : error ? (
            // Error state
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-red-800 text-white rounded-sm"
              >
                Retry
              </button>
            </div>
          ) : product ? (
            // Product details
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Product Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-square bg-gray-100 dark:bg-gray-900 rounded-sm overflow-hidden"
              >
                <Image
                  src={imgError ? fallbackImage : product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  onError={() => setImgError(true)}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
              
              {/* Product Details */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {product.category && (
                  <div className="text-sm text-gray-500 mb-2 uppercase tracking-wider">
                    {product.category}
                  </div>
                )}
                
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-2xl text-gray-300 mb-6">
                  ${selectedVariant ? selectedVariant.price.toFixed(2) : product.price.toFixed(2)}
                </p>
                
                <div className="mb-6">
                  <p className="text-gray-400">{product.description || 'No description available.'}</p>
                </div>
                
                {/* Variant Selection */}
                {product.variants && product.variants.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      Select Size/Variant
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant)}
                          disabled={!variant.inStock}
                          className={`px-4 py-2 border transition-colors ${
                            selectedVariant?.id === variant.id
                              ? 'border-white bg-white bg-opacity-10'
                              : 'border-gray-700 hover:border-gray-500'
                          } ${!variant.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {variant.name}
                          {!variant.inStock && ' (Out of stock)'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Tags if available */}
                {product.tags && product.tags.length > 0 && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="inline-block px-2 py-1 text-xs bg-gray-800 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart || (product.variants && product.variants.length > 0 && !selectedVariant?.inStock)}
                  className={`w-full py-3 px-6 transition-colors text-black bg-white hover:bg-gray-100 disabled:bg-gray-400 disabled:cursor-not-allowed`}
                >
                  {addingToCart ? (
                    <span className="inline-block animate-spin mr-2">⟳</span>
                  ) : null}
                  {selectedVariant && !selectedVariant.inStock
                    ? 'Out of Stock'
                    : 'Add to Cart'
                  }
                </button>
              </motion.div>
            </div>
          ) : (
            // Product not found
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold mb-4">Product not found</h2>
              <a href="/products" className="underline text-blue-500">
                Back to all products
              </a>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

// Main page component with Suspense boundary
export default function ProductDetailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    }>
      <ProductDetailContent />
    </Suspense>
  );
} 