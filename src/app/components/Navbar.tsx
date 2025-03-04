'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(0);

  return (
    <nav className="fixed w-full bg-white dark:bg-slate-900 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-500 text-transparent bg-clip-text">
                Quantum Threads
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Products
            </Link>
            <Link href="/collections" className="text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Collections
            </Link>
            <Link href="/about" className="text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              About
            </Link>
            <button className="relative text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <FiShoppingCart className="w-6 h-6" />
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-slate-900 shadow-md">
            <Link href="/products" className="block px-3 py-2 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400">
              Products
            </Link>
            <Link href="/collections" className="block px-3 py-2 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400">
              Collections
            </Link>
            <Link href="/about" className="block px-3 py-2 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400">
              About
            </Link>
            <button className="relative flex items-center px-3 py-2 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400">
              <FiShoppingCart className="w-6 h-6 mr-2" />
              <span>Cart {cartItems > 0 && `(${cartItems})`}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
} 