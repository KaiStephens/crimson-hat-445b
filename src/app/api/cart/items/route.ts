import { NextRequest, NextResponse } from 'next/server';

const STOREFRONT_TOKEN = process.env.STOREFRONT_TOKEN || 'ptkn_dda67524-d1dc-4c1f-9a81-1cb75185af20';
const API_BASE_URL = 'https://storefront-api.fourthwall.com';

// Add item to cart
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cartId, items } = body;
    
    if (!cartId || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart ID and at least one item are required' },
        { status: 400 }
      );
    }
    
    const response = await fetch(`${API_BASE_URL}/v1/carts/${cartId}/add?storefront_token=${STOREFRONT_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: items.map(item => ({
          variantId: item.variantId,
          quantity: item.quantity || 1
        }))
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

// Change cart items quantity
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { cartId, items } = body;
    
    if (!cartId || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart ID and items are required' },
        { status: 400 }
      );
    }
    
    const response = await fetch(`${API_BASE_URL}/v1/carts/${cartId}/change?storefront_token=${STOREFRONT_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: items.map(item => ({
          variantId: item.variantId,
          quantity: item.quantity
        }))
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to update item quantity: ${JSON.stringify(errorData)}`);
    }
    
    const updatedCartData = await response.json();
    return NextResponse.json(updatedCartData);
  } catch (error) {
    console.error('Error updating quantity:', error);
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
    const variantId = searchParams.get('variantId');
    
    if (!cartId || !variantId) {
      return NextResponse.json(
        { error: 'Cart ID and Variant ID are required' },
        { status: 400 }
      );
    }
    
    const response = await fetch(
      `${API_BASE_URL}/v1/carts/${cartId}/remove?storefront_token=${STOREFRONT_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [{ variantId }]
        })
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to remove item from cart: ${JSON.stringify(errorData)}`);
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