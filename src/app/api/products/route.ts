import { NextResponse } from 'next/server';

// Replace with your actual token
const STOREFRONT_TOKEN = process.env.STOREFRONT_TOKEN || 'ptkn_dda67524-d1dc';

export async function GET() {
  try {
    // In a real implementation, you would fetch products from your Storefront API
    // This is a simplified example
    
    // Mock products for development
    const products = [
      {
        id: '1',
        name: 'Neural Network Tee',
        price: 34.99,
        imageUrl: '/images/neural-tee.jpg',
        slug: 'neural-network-tee'
      },
      {
        id: '2',
        name: 'Algorithm Hoodie',
        price: 59.99,
        imageUrl: '/images/algorithm-hoodie.jpg',
        slug: 'algorithm-hoodie'
      },
      {
        id: '3',
        name: 'Quantum Computing Mug',
        price: 18.99,
        imageUrl: '/images/quantum-mug.jpg',
        slug: 'quantum-computing-mug'
      },
      {
        id: '4',
        name: 'AI Ethics Cap',
        price: 24.99,
        imageUrl: '/images/ai-cap.jpg',
        slug: 'ai-ethics-cap'
      }
    ];

    // In production you would use:
    // const response = await fetch('https://api.your-storefront-provider.com/products', {
    //   headers: {
    //     'Authorization': `Bearer ${STOREFRONT_TOKEN}`
    //   }
    // });
    // const data = await response.json();
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
} 