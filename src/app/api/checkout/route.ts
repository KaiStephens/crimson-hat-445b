import { NextRequest, NextResponse } from 'next/server';

const STOREFRONT_TOKEN = process.env.STOREFRONT_TOKEN || 'ptkn_dda67524-d1dc';
const API_BASE_URL = 'https://storefront-api.fourthwall.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cartId } = body;
    
    if (!cartId) {
      return NextResponse.json(
        { error: 'Cart ID is required' },
        { status: 400 }
      );
    }
    
    // Get the checkout URL for the cart
    const response = await fetch(`${API_BASE_URL}/v1/carts/${cartId}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storefront_token: STOREFRONT_TOKEN,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to create checkout: ${JSON.stringify(errorData)}`);
    }
    
    const checkoutData = await response.json();
    return NextResponse.json({ checkoutUrl: checkoutData.checkoutUrl });
  } catch (error) {
    console.error('Error creating checkout:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout' },
      { status: 500 }
    );
  }
} 