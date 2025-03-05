import { NextRequest, NextResponse } from 'next/server';

// Fourthwall Storefront API token
const STOREFRONT_TOKEN = process.env.STOREFRONT_TOKEN || 'ptkn_dda67524-d1dc-4c1f-9a81-1cb75185af20';
// Make sure we're using the specific store domain, not the generic checkout domain
const CHECKOUT_DOMAIN = process.env.NEXT_PUBLIC_FW_CHECKOUT_DOMAIN || 'artificialwearables-shop.fourthwall.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cartId } = body;

    if (!cartId) {
      console.error('Missing cartId in checkout request');
      return NextResponse.json({ error: 'Cart ID is required' }, { status: 400 });
    }

    console.log('Processing checkout for cart:', cartId);
    console.log('Using checkout domain:', CHECKOUT_DOMAIN);

    // Create checkout URL with the configured domain - use store-specific domain
    const checkoutUrl = `https://${CHECKOUT_DOMAIN}/checkout/?cartCurrency=USD&cartId=${cartId}`;
    
    console.log('Generated checkout URL:', checkoutUrl);
    
    // Return the URL directly - Fourthwall's hosted checkout handles the rest
    return NextResponse.json({
      success: true,
      redirectUrl: checkoutUrl
    });
  } catch (error) {
    console.error('Unexpected error in checkout API:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during checkout' }, 
      { status: 500 }
    );
  }
} 