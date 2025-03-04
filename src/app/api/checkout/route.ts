import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get cart ID from request body
    const { cartId } = await request.json();

    if (!cartId) {
      console.error('No cartId provided in checkout request');
      return NextResponse.json(
        { error: 'Cart ID is required' },
        { status: 400 }
      );
    }

    console.log(`Processing checkout for cart ID: ${cartId}`);

    // First, try to fetch the cart data
    let cartData;
    let isUsingMockData = false;

    try {
      // Try to fetch cart from Fourthwall API
      const cartResponse = await fetch(`https://api.fourthwall.com/api/v1/shop-api/carts/${cartId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.FOURTHWALL_API_KEY || 'mock-api-key'}`,
          'Content-Type': 'application/json',
          'X-Shop-Id': process.env.FOURTHWALL_SHOP_ID || 'mock-shop-id',
        },
      });

      if (!cartResponse.ok) {
        console.warn(`Couldn't fetch real cart data. Status: ${cartResponse.status}. Using mock data instead.`);
        isUsingMockData = true;
        
        // Try to get cart data from the local cart API as a fallback
        try {
          const localCartResponse = await fetch(`${request.nextUrl.origin}/api/cart?cartId=${cartId}`);
          if (localCartResponse.ok) {
            cartData = await localCartResponse.json();
            console.log('Successfully fetched cart data from local API');
          } else {
            throw new Error('Failed to fetch cart from local API');
          }
        } catch (localErr) {
          console.warn('Error fetching from local cart API, using mock data:', localErr);
          // Use mock data as a last resort
          cartData = { 
            id: cartId,
            items: [{ id: 'mock-item', quantity: 1, variant: { id: 'mock-variant', price: 29.99 } }] 
          };
        }
      } else {
        cartData = await cartResponse.json();
        console.log('Successfully fetched cart data from Fourthwall API');
      }
    } catch (err) {
      console.warn('Error fetching cart, using mock data:', err);
      isUsingMockData = true;
      
      // Use mock data if real API fails
      cartData = { 
        id: cartId,
        items: [{ id: 'mock-item', quantity: 1, variant: { id: 'mock-variant', price: 29.99 } }]
      };
    }
    
    // Verify cart has items
    if (!cartData || !cartData.items || cartData.items.length === 0) {
      console.error('Cart is empty during checkout');
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    console.log(`Cart verified ${isUsingMockData ? '(using mock data)' : ''}, creating checkout...`);

    // Generate a unique order ID for reference
    const orderId = `ORD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    
    // Create the checkout URL - in a real implementation this would come from Fourthwall
    // For our implementation, we'll redirect to the success page
    const checkoutUrl = `/checkout/success?orderId=${orderId}`;

    console.log(`Checkout created successfully. Order ID: ${orderId}`);

    return NextResponse.json({
      success: true,
      cartId,
      orderId,
      checkoutUrl,
      message: 'Checkout created successfully',
      isUsingMockData
    });
  } catch (error) {
    console.error('Error creating checkout:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout. Please try again.' },
      { status: 500 }
    );
  }
} 