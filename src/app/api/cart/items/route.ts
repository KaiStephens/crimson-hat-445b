import { NextRequest, NextResponse } from 'next/server';

const STOREFRONT_TOKEN = process.env.STOREFRONT_TOKEN || 'ptkn_dda67524-d1dc';
const API_BASE_URL = 'https://storefront-api.fourthwall.com';

// Add item to cart
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cartId, productId, variantId, quantity = 1 } = body;
    
    if (!cartId || !productId || !variantId) {
      return NextResponse.json(
        { error: 'Cart ID, Product ID, and Variant ID are required' },
        { status: 400 }
      );
    }
    
    const response = await fetch(`${API_BASE_URL}/v1/carts/${cartId}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storefront_token: STOREFRONT_TOKEN,
        productId,
        variantId,
        quantity
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to add item to cart: ${JSON.stringify(errorData)}`);
    }
    
    const updatedCartData = await response.json();
    return NextResponse.json(updatedCartData);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
      { status: 500 }
    );
  }
}

// Update item quantity
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { cartId, itemId, quantity } = body;
    
    if (!cartId || !itemId || quantity === undefined) {
      return NextResponse.json(
        { error: 'Cart ID, Item ID, and quantity are required' },
        { status: 400 }
      );
    }
    
    const response = await fetch(`${API_BASE_URL}/v1/carts/${cartId}/items/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storefront_token: STOREFRONT_TOKEN,
        quantity
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to update item quantity: ${JSON.stringify(errorData)}`);
    }
    
    const updatedCartData = await response.json();
    return NextResponse.json(updatedCartData);
  } catch (error) {
    console.error('Error updating item quantity:', error);
    return NextResponse.json(
      { error: 'Failed to update item quantity' },
      { status: 500 }
    );
  }
}

// Remove item from cart
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cartId = searchParams.get('cartId');
    const itemId = searchParams.get('itemId');
    
    if (!cartId || !itemId) {
      return NextResponse.json(
        { error: 'Cart ID and Item ID are required' },
        { status: 400 }
      );
    }
    
    const response = await fetch(
      `${API_BASE_URL}/v1/carts/${cartId}/items/${itemId}?storefront_token=${STOREFRONT_TOKEN}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to remove item from cart: ${response.status}`);
    }
    
    const updatedCartData = await response.json();
    return NextResponse.json(updatedCartData);
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return NextResponse.json(
      { error: 'Failed to remove item from cart' },
      { status: 500 }
    );
  }
} 