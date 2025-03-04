'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type CartItem = {
  id: string;
  variantId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  productSlug?: string;
};

type CartContextType = {
  cartId: string | null;
  cart: CartItem[];
  itemCount: number;
  cartTotal: number;
  isLoading: boolean;
  error: string | null;
  addToCart: (product: any, variantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  removeFromCart: (variantId: string) => Promise<void>;
  clearCart: () => void;
  getCheckoutUrl: () => Promise<string>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Calculate cart total whenever cart changes
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calculate total number of items
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const loadCart = async () => {
      setIsLoading(true);
      try {
        // First check if we have a cart ID in localStorage
        const savedCartId = localStorage.getItem('cartId');
        
        if (savedCartId) {
          setCartId(savedCartId);
          
          // Fetch the latest cart data from our API
          const response = await fetch(`/api/cart?cartId=${savedCartId}`);
          
          if (!response.ok) {
            // If cart not found or other error, clear the stored cart ID
            if (response.status === 404) {
              localStorage.removeItem('cartId');
              setCartId(null);
              setCart([]);
            } else {
              const errorData = await response.json();
              console.error('Error loading cart:', errorData);
              setError('Failed to load cart. Please try again.');
            }
          } else {
            // Successfully fetched cart
            const cartData = await response.json();
            
            if (cartData && cartData.items && cartData.items.length > 0) {
              // Convert the API response format to our CartItem format
              const cartItems: CartItem[] = cartData.items.map((item: any) => ({
                id: item.id || Math.random().toString(36).substring(2, 15),
                variantId: item.variant.id,
                name: item.variant.name,
                price: item.variant.unitPrice?.value || item.variant.price || 0,
                quantity: item.quantity,
                imageUrl: item.variant.images?.[0]?.url || '/placeholder-image.jpg',
                productSlug: item.variant.product?.slug || '',
              }));
              
              setCart(cartItems);
            } else {
              // Cart exists but has no items
              setCart([]);
            }
          }
        } else {
          // No cart ID saved, start with empty cart
          setCart([]);
        }
      } catch (err) {
        console.error('Error loading cart:', err);
        setError('Failed to load cart. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCart();
  }, []);
  
  // Function to add item to cart
  const addToCart = async (product: any, variantId: string, quantity = 1) => {
    try {
      setIsLoading(true);
      
      let response;
      
      // If we don't have a cart yet, create one
      if (!cartId) {
        response = await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: [
              {
                variantId,
                quantity
              }
            ]
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to create cart');
        }
        
        const newCart = await response.json();
        setCartId(newCart.id);
        localStorage.setItem('cartId', newCart.id);
        
        // Fetch the cart to get the updated items
        await loadCart();
      } else {
        // Add to existing cart
        response = await fetch('/api/cart/items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cartId,
            items: [
              {
                variantId,
                quantity
              }
            ]
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to add item to cart');
        }
        
        // Optimistically update the cart
        const newItem: CartItem = {
          id: Math.random().toString(36).substring(2, 15), // Temporary ID until we refresh
          variantId,
          name: product.name,
          price: product.price,
          quantity,
          imageUrl: product.imageUrl,
          productSlug: product.slug,
        };
        
        // Check if the item is already in the cart
        const existingItemIndex = cart.findIndex(item => item.variantId === variantId);
        
        if (existingItemIndex >= 0) {
          // Update quantity if the item already exists
          const updatedCart = [...cart];
          updatedCart[existingItemIndex].quantity += quantity;
          setCart(updatedCart);
        } else {
          // Add new item to cart
          setCart(prev => [...prev, newItem]);
        }
      }
      
      setError(null);
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError(err instanceof Error ? err.message : 'Failed to add to cart');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update item quantity
  const updateQuantity = async (variantId: string, quantity: number) => {
    if (!cartId) return;
    
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/cart/items', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartId,
          items: [
            {
              variantId,
              quantity
            }
          ]
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update item quantity');
      }
      
      // Optimistically update the cart UI
      setCart(prevCart => 
        prevCart.map(item => 
          item.variantId === variantId 
            ? { ...item, quantity } 
            : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Remove item from cart
  const removeFromCart = async (variantId: string) => {
    if (!cartId) return;
    
    try {
      setIsLoading(true);
      
      const response = await fetch(`/api/cart/items?cartId=${cartId}&variantId=${variantId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }
      
      // Optimistically update the cart UI
      setCart(prevCart => prevCart.filter(item => item.variantId !== variantId));
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Clear the cart
  const clearCart = () => {
    setCart([]);
    setCartId(null);
    localStorage.removeItem('cartId');
  };

  // Get checkout URL 
  const getCheckoutUrl = async (): Promise<string> => {
    if (!cartId) {
      throw new Error('No cart available');
    }
    
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartId,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error creating checkout:', errorData);
        throw new Error('Failed to create checkout');
      }
      
      const data = await response.json();
      return data.checkoutUrl;
    } catch (error) {
      console.error('Error creating checkout:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Helper function to refresh cart data
  const loadCart = async () => {
    if (!cartId) return;
    
    try {
      const response = await fetch(`/api/cart?cartId=${cartId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }
      
      const cartData = await response.json();
      
      if (cartData && cartData.items && cartData.items.length > 0) {
        // Convert the API response format to our CartItem format
        const cartItems: CartItem[] = cartData.items.map((item: any) => ({
          id: item.id || Math.random().toString(36).substring(2, 15),
          variantId: item.variant.id,
          name: item.variant.name,
          price: item.variant.unitPrice?.value || item.variant.price || 0,
          quantity: item.quantity,
          imageUrl: item.variant.images?.[0]?.url || '/placeholder-image.jpg',
          productSlug: item.variant.product?.slug || '',
        }));
        
        setCart(cartItems);
      } else {
        // Cart exists but has no items
        setCart([]);
      }
    } catch (err) {
      console.error('Error refreshing cart:', err);
    }
  };
  
  return (
    <CartContext.Provider
      value={{
        cart,
        cartId,
        itemCount,
        cartTotal,
        isLoading,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCheckoutUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 