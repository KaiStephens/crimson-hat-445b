'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

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
  
  // Fallback image for products
  const fallbackImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjgwMCIgdmlld0JveD0iMCAwIDgwMCA4MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI4MDAiIGZpbGw9IiNGMkYyRjIiLz48cGF0aCBkPSJNNDAwIDI1MEMzMDUuOTY0IDI1MCAyMzAgMzI1Ljk2NCAyMzAgNDIwQzIzMCA1MTQuMDM2IDMwNS45NjQgNTkwIDQwMCA1OTBDNDk0LjAzNiA1OTAgNTcwIDUxNC4wMzYgNTcwIDQyMEM1NzAgMzI1Ljk2NCA0OTQuMDM2IDI1MCA0MDAgMjUwWiIgZmlsbD0iI0U1RTVFNSIvPjwvc3ZnPg==';
  
  return (
    <motion.a 
      href={`/product/${slug}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative aspect-square mb-3 overflow-hidden">
        <Image 
          src={imgError ? fallbackImage : imageUrl} 
          alt={name} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          onError={() => setImgError(true)}
        />
      </div>
      <h3 className="text-sm font-medium mb-1">{name}</h3>
      <p className="text-sm text-gray-500">${price.toFixed(2)}</p>
      {onAddToCart && (
        <button 
          onClick={(e) => {
            e.preventDefault();
            onAddToCart();
          }}
          className="mt-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
        >
          Add to cart
        </button>
      )}
    </motion.a>
  );
} 