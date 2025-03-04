import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get cart ID from query parameter
    const searchParams = request.nextUrl.searchParams;
    const cartId = searchParams.get('cartId');

    if (!cartId) {
      return NextResponse.json({ error: 'Cart ID is required' }, { status: 400 });
    }

    // Call the Fourthwall API to get cart data
    const response = await fetch(`https://api.fourthwall.com/api/v1/shop-api/carts/${cartId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.FOURTHWALL_API_KEY}`,
        'Content-Type': 'application/json',
        'X-Shop-Id': process.env.FOURTHWALL_SHOP_ID || '',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching cart from Fourthwall:', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch cart data from Fourthwall' }, 
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
      return NextResponse.json({ error: 'Variant ID is required' }, { status: 400 });
    }

    // If cartId is provided, add to existing cart
    const cartId = body.cartId || null;
    
    let url = 'https://api.fourthwall.com/api/v1/shop-api/carts';
    let method = 'POST';
    let requestBody: any = { items: [{ variantId, quantity }] };
    
    // If cart ID exists, update the cart instead of creating a new one
    if (cartId) {
      url = `${url}/${cartId}/items`;
      method = 'POST';
      requestBody = { variantId, quantity };
    }

    const response = await fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${process.env.FOURTHWALL_API_KEY}`,
        'Content-Type': 'application/json',
        'X-Shop-Id': process.env.FOURTHWALL_SHOP_ID || '',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error in cart operation:', errorData);
      return NextResponse.json(
        { error: 'Failed to perform cart operation' }, 
        { status: response.status }
      );
    }

    const data = await response.json();
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

    const response = await fetch(`https://api.fourthwall.com/api/v1/shop-api/carts/${cartId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${process.env.FOURTHWALL_API_KEY}`,
        'Content-Type': 'application/json',
        'X-Shop-Id': process.env.FOURTHWALL_SHOP_ID || '',
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