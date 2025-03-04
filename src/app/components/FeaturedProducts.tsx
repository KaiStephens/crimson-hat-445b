'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';

// Sample product data
const featuredProducts = [
  {
    id: '1',
    name: 'Neural Network Tee',
    price: 34.99,
    imageUrl: '/images/neural-tee.jpg',
    category: 'Clothing'
  },
  {
    id: '2',
    name: 'Algorithm Hoodie',
    price: 59.99,
    imageUrl: '/images/algorithm-hoodie.jpg',
    category: 'Clothing'
  },
  {
    id: '3',
    name: 'Quantum Computing Mug',
    price: 18.99,
    imageUrl: '/images/quantum-mug.jpg',
    category: 'Accessories'
  },
  {
    id: '4',
    name: 'AI Ethics Cap',
    price: 24.99,
    imageUrl: '/images/ai-cap.jpg',
    category: 'Accessories'
  }
];

export default function FeaturedProducts() {
  const [cartCount, setCartCount] = useState(0);
  
  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };
  
  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Featured Products</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Our most popular AI-inspired merchandise, carefully designed for tech enthusiasts and AI lovers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
              category={product.category}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a href="/products" className="btn-secondary inline-block">
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
} 