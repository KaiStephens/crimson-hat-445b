'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type CartItem = {
  id: string;
  productId: string;
  variantId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

type CartContextType = {
  cartId: string | null;
  cart: CartItem[];
  itemCount: number;
  isLoading: boolean;
  addToCart: (product: any, variantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  getCheckoutUrl: () => Promise<string>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCartId = localStorage.getItem('cartId');
    if (savedCartId) {
      setCartId(savedCartId);
      fetchCart(savedCartId);
    }
  }, []);
  
  // Fetch cart data
  const fetchCart = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/cart?cartId=${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }
      
      const data = await response.json();
      
      // Map the cart items to our format
      const cartItems = data.items.map((item: any) => ({
        id: item.id,
        productId: item.product.id,
        variantId: item.variant.id,
        name: item.product.name,
        price: item.variant.unitPrice.value,
        quantity: item.quantity,
        imageUrl: item.product.images?.[0]?.url || `/images/${item.product.slug}.jpg`,
      }));
      
      setCart(cartItems);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Add item to cart
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
            productId: product.id,
            variantId,
            quantity,
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to create cart');
        }
        
        const newCart = await response.json();
        setCartId(newCart.id);
        localStorage.setItem('cartId', newCart.id);
        
        // Fetch the cart to get the updated items
        await fetchCart(newCart.id);
      } else {
        // Add to existing cart
        response = await fetch('/api/cart/items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cartId,
            productId: product.id,
            variantId,
            quantity,
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to add item to cart');
        }
        
        // Fetch the cart to get the updated items
        await fetchCart(cartId);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update item quantity
  const updateQuantity = async (itemId: string, quantity: number) => {
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
          itemId,
          quantity,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update item quantity');
      }
      
      // Fetch the cart to get the updated items
      await fetchCart(cartId);
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Remove item from cart
  const removeFromCart = async (itemId: string) => {
    if (!cartId) return;
    
    try {
      setIsLoading(true);
      
      const response = await fetch(`/api/cart/items?cartId=${cartId}&itemId=${itemId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }
      
      // Fetch the cart to get the updated items
      await fetchCart(cartId);
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Checkout
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
  
  // Calculate total number of items
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <CartContext.Provider
      value={{
        cartId,
        cart,
        itemCount,
        isLoading,
        addToCart,
        updateQuantity,
        removeFromCart,
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