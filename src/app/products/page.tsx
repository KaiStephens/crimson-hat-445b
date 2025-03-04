'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  imageUrl: string | null;
}

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

// Client component to handle search params
function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const collectionSlug = searchParams.get('collection') || 'all';
  
  const [collections, setCollections] = useState<Collection[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
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
  
  // Fetch collections
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch('/api/collections');
        
        if (!response.ok) {
          throw new Error('Failed to fetch collections');
        }
        
        const data = await response.json();
        setCollections(data);
      } catch (err) {
        console.error('Error fetching collections:', err);
        // We don't need to set an error state for collections, as we can fallback to just 'All Products'
      }
    };
    
    fetchCollections();
  }, []);
  
  // Fetch products from the selected collection
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`/api/products?collection=${collectionSlug}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [collectionSlug]);
  
  // Change the collection
  const handleCollectionChange = (slug: string) => {
    router.push(`/products?collection=${slug}`);
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white">Shop Our Products</h1>
            <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
              Browse our collection of tech-inspired merchandise designed for the modern enthusiast.
            </p>
          </div>
          
          {/* Collection Filters */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-2 justify-center">
              {collections.map((collection) => (
                <button
                  key={collection.id}
                  onClick={() => handleCollectionChange(collection.slug)}
                  className={`px-4 py-2 rounded-sm transition-colors ${
                    collectionSlug === collection.slug
                      ? 'bg-white text-black'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {collection.name}
                  {collection.productCount > 0 && ` (${collection.productCount})`}
                </button>
              ))}
            </div>
          </div>
          
          {/* Products Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 8 }).map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  variants={itemVariants}
                  className="bg-gray-900 rounded-sm p-4 animate-pulse"
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
            ) : products.length === 0 ? (
              // No products found
              <div className="col-span-full text-center py-8">
                <p className="text-xl text-gray-400">No products found in this collection.</p>
              </div>
            ) : (
              // Products
              products.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    imageUrl={product.imageUrl}
                    slug={product.slug}
                  />
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

// Main page component with Suspense boundary
export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading products...</p>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
} 