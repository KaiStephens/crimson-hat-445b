'use client';

import { useState, useRef, useEffect } from 'react';
import ProductCard from './ProductCard';
import { motion, useInView } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category?: string;
  slug: string;
  description?: string;
  variants?: any[];
}

export default function FeaturedProducts() {
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        
        // Use only the first 4 products for the featured section
        setProducts(data.slice(0, 4));
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.4,
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <section id="featured-products" ref={sectionRef} className="py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white pb-4">
            Featured Products
          </h2>
          
          <p className="mt-2 text-gray-300 max-w-2xl mx-auto">
            Our most popular AI-inspired merchandise, carefully designed for tech enthusiasts and AI lovers.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                variants={itemVariants}
                className="bg-gray-900 rounded-sm p-4 animate-pulse"
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="aspect-square bg-gray-800 mb-4"></div>
                <div className="h-4 bg-gray-800 w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-800 w-1/4"></div>
              </motion.div>
            ))
          ) : error ? (
            // Error state
            <div className="col-span-full text-center text-red-500">
              <p>{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-800 text-white rounded-sm"
              >
                Retry
              </button>
            </div>
          ) : (
            // Products
            products.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                style={{ willChange: 'transform, opacity' }}
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  category={product.category}
                  slug={product.slug}
                  onAddToCart={handleAddToCart}
                />
              </motion.div>
            ))
          )}
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <a href="/products" className="btn-secondary inline-block transition-transform hover:scale-105 active:scale-95">
            View All Products
          </a>
        </motion.div>
      </div>
    </section>
  );
} 