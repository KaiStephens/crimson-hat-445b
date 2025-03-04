import { NextRequest, NextResponse } from 'next/server';

const STOREFRONT_TOKEN = process.env.STOREFRONT_TOKEN || 'ptkn_dda67524-d1dc';
const API_BASE_URL = 'https://storefront-api.fourthwall.com';

// Create a new cart
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, variantId, quantity = 1 } = body;
    
    if (!productId || !variantId) {
      return NextResponse.json(
        { error: 'Product ID and Variant ID are required' },
        { status: 400 }
      );
    }
    
    // Create a new cart with the item
    const response = await fetch(`${API_BASE_URL}/v1/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storefront_token: STOREFRONT_TOKEN,
        items: [
          {
            productId,
            variantId,
            quantity
          }
        ]
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to create cart: ${JSON.stringify(errorData)}`);
    }
    
    const cartData = await response.json();
    return NextResponse.json(cartData);
  } catch (error) {
    console.error('Error creating cart:', error);
    return NextResponse.json(
      { error: 'Failed to create cart' },
      { status: 500 }
    );
  }
}

// Get cart by ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cartId = searchParams.get('cartId');
    
    if (!cartId) {
      return NextResponse.json(
        { error: 'Cart ID is required' },
        { status: 400 }
      );
    }
    
    const response = await fetch(
      `${API_BASE_URL}/v1/carts/${cartId}?storefront_token=${STOREFRONT_TOKEN}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch cart: ${response.status}`);
    }
    
    const cartData = await response.json();
    return NextResponse.json(cartData);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
} 