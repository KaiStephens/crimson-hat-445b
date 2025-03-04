'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  slug: string;
  variants?: any[];
  category?: string;
  onAddToCart?: () => void;
}

export default function ProductCard({ id, name, price, imageUrl, slug, variants, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  
  // Fallback image for products
  const fallbackImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjgwMCIgdmlld0JveD0iMCAwIDgwMCA4MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI4MDAiIGZpbGw9IiNGMkYyRjIiLz48cGF0aCBkPSJNNDAwIDI1MEMzMDUuOTY0IDI1MCAyMzAgMzI1Ljk2NCAyMzAgNDIwQzIzMCA1MTQuMDM2IDMwNS45NjQgNTkwIDQwMCA1OTBDNDk0LjAzNiA1OTAgNTcwIDUxNC4wMzYgNTcwIDQyMEM1NzAgMzI1Ljk2NCA0OTQuMDM2IDI1MCA0MDAgMjUwWiIgZmlsbD0iI0U1RTVFNSIvPjwvc3ZnPg==';
  
  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      
      // Use the first variant if variants are provided, otherwise use a default one
      let variantId;
      
      if (variants && variants.length > 0) {
        // Find first in-stock variant if available
        const inStockVariant = variants.find(v => v.inStock !== false);
        variantId = inStockVariant ? inStockVariant.id : variants[0].id;
      } else {
        // Fallback variant ID - This would need to be replaced with a real variant ID
        variantId = id; // Using product ID as fallback
      }
      
      // Call addToCart with product details and variant ID
      await addToCart({ 
        id, 
        name, 
        price, 
        imageUrl, 
        slug 
      }, variantId);
      
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
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href={`/product/${slug}`} className="block">
        <div className="relative aspect-square mb-4 overflow-hidden bg-gray-100 dark:bg-gray-900 rounded-sm">
          <div
            className="h-full w-full transition-transform duration-300"
            style={{ 
              transform: isHovered ? 'scale(1.03)' : 'scale(1)',
              willChange: 'transform' // Performance hint
            }}
          >
            <Image 
              src={imgError ? fallbackImage : imageUrl} 
              alt={name} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-1 text-gray-900 dark:text-gray-100">{name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">${price.toFixed(2)}</p>
        </div>
      </a>
      
      <button
        onClick={handleAddToCart}
        disabled={isAdding || (variants && variants.length > 0 && !variants.some(v => v.inStock !== false))}
        className="mt-2 px-3 py-1.5 text-xs font-medium bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all rounded-sm w-full opacity-0 group-hover:opacity-100 disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
        style={{ 
          opacity: isAdding ? 1 : (isHovered ? 1 : 0),
          transition: 'opacity 0.2s ease-in-out, background-color 0.2s ease-in-out'
        }}
      >
        {isAdding ? (
          <span className="inline-block animate-spin">⟳</span>
        ) : variants && variants.length > 0 && !variants.some(v => v.inStock !== false) ? (
          'Out of stock'
        ) : (
          'Add to cart'
        )}
      </button>
    </div>
  );
} 