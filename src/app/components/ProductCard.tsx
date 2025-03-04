'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  onAddToCart: () => void;
}

export default function ProductCard({ id, name, price, imageUrl, category, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  
  // Fallback image for products
  const fallbackImage = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22400%22 height%3D%22400%22 viewBox%3D%220 0 400 400%22 fill%3D%22none%22%3E%3Crect width%3D%22400%22 height%3D%22400%22 fill%3D%22%23EEEEEE%22%2F%3E%3Cpath d%3D%22M200 150C178.954 150 162 166.954 162 188C162 209.046 178.954 226 200 226C221.046 226 238 209.046 238 188C238 166.954 221.046 150 200 150ZM200 214C185.641 214 174 202.359 174 188C174 173.641 185.641 162 200 162C214.359 162 226 173.641 226 188C226 202.359 214.359 214 200 214Z%22 fill%3D%22%236366F1%22%2F%3E%3Cpath d%3D%22M186 120H214C218.418 120 222 116.418 222 112C222 107.582 218.418 104 214 104H186C181.582 104 178 107.582 178 112C178 116.418 181.582 120 186 120Z%22 fill%3D%22%236366F1%22%2F%3E%3Cpath d%3D%22M270 188H296C300.418 188 304 184.418 304 180C304 175.582 300.418 172 296 172H270C265.582 172 262 175.582 262 180C262 184.418 265.582 188 270 188Z%22 fill%3D%22%236366F1%22%2F%3E%3Cpath d%3D%22M104 180C104 184.418 107.582 188 112 188H138C142.418 188 146 184.418 146 180C146 175.582 142.418 172 138 172H112C107.582 172 104 175.582 104 180Z%22 fill%3D%22%236366F1%22%2F%3E%3Cpath d%3D%22M251.028 140.028C253.9 142.9 258.566 142.9 261.438 140.028L279.972 121.494C282.844 118.622 282.844 113.956 279.972 111.084C277.1 108.212 272.434 108.212 269.562 111.084L251.028 129.618C248.156 132.49 248.156 137.156 251.028 140.028Z%22 fill%3D%22%236366F1%22%2F%3E%3Cpath d%3D%22M148.972 140.028C151.844 137.156 151.844 132.49 148.972 129.618L130.438 111.084C127.566 108.212 122.9 108.212 120.028 111.084C117.156 113.956 117.156 118.622 120.028 121.494L138.562 140.028C141.434 142.9 146.1 142.9 148.972 140.028Z%22 fill%3D%22%236366F1%22%2F%3E%3Cpath d%3D%22M251.028 236.972C248.156 234.1 248.156 229.434 251.028 226.562L269.562 208.028C272.434 205.156 277.1 205.156 279.972 208.028C282.844 210.9 282.844 215.566 279.972 218.438L261.438 236.972C258.566 239.844 253.9 239.844 251.028 236.972Z%22 fill%3D%22%236366F1%22%2F%3E%3Cpath d%3D%22M148.972 236.972C146.1 239.844 141.434 239.844 138.562 236.972L120.028 218.438C117.156 215.566 117.156 210.9 120.028 208.028C122.9 205.156 127.566 205.156 130.438 208.028L148.972 226.562C151.844 229.434 151.844 234.1 148.972 236.972Z%22 fill%3D%22%236366F1%22%2F%3E%3Cpath d%3D%22M186 272H214C218.418 272 222 268.418 222 264C222 259.582 218.418 256 214 256H186C181.582 256 178 259.582 178 264C178 268.418 181.582 272 186 272Z%22 fill%3D%22%236366F1%22%2F%3E%3C%2Fsvg%3E';
  
  return (
    <div 
      className="card relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image 
          src={imgError ? fallbackImage : imageUrl} 
          alt={name} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          onError={() => setImgError(true)}
        />
        <div className={`absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 ${isHovered ? 'bg-opacity-20' : ''}`}></div>
        <div className="absolute top-3 left-3">
          <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full uppercase tracking-wider">
            {category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">{name}</h3>
        <p className="text-indigo-600 dark:text-indigo-400 font-bold mt-1">${price.toFixed(2)}</p>
        <button 
          onClick={onAddToCart}
          className="mt-3 w-full btn-primary flex items-center justify-center space-x-2"
        >
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
} 