'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  slug: string;
  category?: string;
  onAddToCart?: () => void;
}

export default function ProductCard({ id, name, price, imageUrl, slug, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  
  // Fallback image for products
  const fallbackImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjgwMCIgdmlld0JveD0iMCAwIDgwMCA4MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI4MDAiIGZpbGw9IiNGMkYyRjIiLz48cGF0aCBkPSJNNDAwIDI1MEMzMDUuOTY0IDI1MCAyMzAgMzI1Ljk2NCAyMzAgNDIwQzIzMCA1MTQuMDM2IDMwNS45NjQgNTkwIDQwMCA1OTBDNDk0LjAzNiA1OTAgNTcwIDUxNC4wMzYgNTcwIDQyMEM1NzAgMzI1Ljk2NCA0OTQuMDM2IDI1MCA0MDAgMjUwWiIgZmlsbD0iI0U1RTVFNSIvPjwvc3ZnPg==';
  
  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      
      // In a real implementation, you would get the variant ID from the product data
      // For now, we'll use a placeholder
      const variantId = `variant-${id}`;
      
      await addToCart({ id, name, price, imageUrl, slug }, variantId);
      
      // Call the parent's onAddToCart if provided
      if (onAddToCart) {
        onAddToCart();
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };
  
  return (
    <motion.div
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <a href={`/product/${slug}`} className="block">
        <div className="relative aspect-square mb-4 overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-sm">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="h-full w-full"
          >
            <Image 
              src={imgError ? fallbackImage : imageUrl} 
              alt={name} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              onError={() => setImgError(true)}
            />
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-sm font-medium mb-1 text-gray-900 dark:text-gray-100">{name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">${price.toFixed(2)}</p>
        </motion.div>
      </a>
      
      <motion.button
        onClick={handleAddToCart}
        disabled={isAdding}
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: isHovered || isAdding ? 1 : 0,
          y: isHovered || isAdding ? 0 : 10
        }}
        whileTap={{ scale: 0.95 }}
        className="mt-2 px-3 py-1.5 text-xs font-medium bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors rounded-sm w-full"
      >
        {isAdding ? (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            ⟳
          </motion.span>
        ) : (
          'Add to cart'
        )}
      </motion.button>
    </motion.div>
  );
} 