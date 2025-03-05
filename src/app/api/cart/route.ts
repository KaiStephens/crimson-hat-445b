import { NextRequest, NextResponse } from 'next/server';

// Use the storefront token for public API access
const STOREFRONT_TOKEN = process.env.STOREFRONT_TOKEN || 'ptkn_dda67524-d1dc-4c1f-9a81-1cb75185af20';
const STOREFRONT_API_URL = 'https://storefront-api.fourthwall.com/v1';

export async function GET(request: NextRequest) {
  try {
    // Get cart ID from query parameter
    const searchParams = request.nextUrl.searchParams;
    const cartId = searchParams.get('cartId');

    if (!cartId) {
      return NextResponse.json({ error: 'Cart ID is required' }, { status: 400 });
    }

    console.log('Fetching cart with ID:', cartId);

    // Call the Fourthwall Storefront API to get cart data
    const response = await fetch(`${STOREFRONT_API_URL}/carts/${cartId}?storefront_token=${STOREFRONT_TOKEN}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching cart:', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch cart data' }, 
        { status: response.status }
      );
    }

    const cartData = await response.json();
    return NextResponse.json(cartData);
  } catch (error) {
    console.error('Unexpected error in cart API route:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { variantId, quantity = 1 } = body;
    
    if (!variantId) {
      console.error('Missing variantId in request body:', body);
      return NextResponse.json({ error: 'Variant ID is required' }, { status: 400 });
    }

    // Create a new cart with the Fourthwall Storefront API
    console.log('Creating new cart with item:', { variantId, quantity });
    
    const response = await fetch(`${STOREFRONT_API_URL}/carts?storefront_token=${STOREFRONT_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [{ variantId, quantity }]
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error in cart creation:', errorData);
      return NextResponse.json(
        { error: 'Failed to create cart', details: errorData }, 
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Cart created successfully:', data.id);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error in cart API route:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Get cart ID from query parameter
    const searchParams = request.nextUrl.searchParams;
    const cartId = searchParams.get('cartId');

    if (!cartId) {
      return NextResponse.json({ error: 'Cart ID is required' }, { status: 400 });
    }

    console.log('Deleting cart with ID:', cartId);

    const response = await fetch(`${STOREFRONT_API_URL}/carts/${cartId}?storefront_token=${STOREFRONT_TOKEN}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error deleting cart:', errorData);
      return NextResponse.json(
        { error: 'Failed to delete cart' }, 
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error in cart API route:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
} 