'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

// Sample product data
const featuredProducts = [
  {
    id: '1',
    name: 'Neural Network Tee',
    price: 34.99,
    imageUrl: '/images/neural-tee.jpg',
    category: 'Clothing',
    slug: 'neural-network-tee'
  },
  {
    id: '2',
    name: 'Algorithm Hoodie',
    price: 59.99,
    imageUrl: '/images/algorithm-hoodie.jpg',
    category: 'Clothing',
    slug: 'algorithm-hoodie'
  },
  {
    id: '3',
    name: 'Quantum Computing Mug',
    price: 18.99,
    imageUrl: '/images/quantum-mug.jpg',
    category: 'Accessories',
    slug: 'quantum-computing-mug'
  },
  {
    id: '4',
    name: 'AI Ethics Cap',
    price: 24.99,
    imageUrl: '/images/ai-cap.jpg',
    category: 'Accessories',
    slug: 'ai-ethics-cap'
  }
];

export default function FeaturedProducts() {
  const [cartCount, setCartCount] = useState(0);
  
  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };
  
  // Simplified and optimized animation variants
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
    <section id="featured-products" className="py-16 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Featured Products</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
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
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              style={{ willChange: 'transform, opacity' }} // Performance hint
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
          ))}
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