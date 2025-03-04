import { NextResponse } from 'next/server';

// Get the token from environment variables
const STOREFRONT_TOKEN = process.env.STOREFRONT_TOKEN || 'ptkn_dda67524-d1dc';
const API_BASE_URL = 'https://storefront-api.fourthwall.com';

export async function GET() {
  try {
    // Get the first collection to display its products
    const collectionsResponse = await fetch(`${API_BASE_URL}/v1/collections?storefront_token=${STOREFRONT_TOKEN}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!collectionsResponse.ok) {
      throw new Error(`Failed to fetch collections: ${collectionsResponse.status}`);
    }
    
    const collectionsData = await collectionsResponse.json();
    
    // If no collections found, return mock data
    if (!collectionsData.results || collectionsData.results.length === 0) {
      return NextResponse.json([
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
      ]);
    }
    
    const firstCollection = collectionsData.results[0];
    
    // Get products from the first collection
    const productsResponse = await fetch(
      `${API_BASE_URL}/v1/collections/${firstCollection.slug}/products?storefront_token=${STOREFRONT_TOKEN}&currency=USD`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!productsResponse.ok) {
      throw new Error(`Failed to fetch products: ${productsResponse.status}`);
    }
    
    const productsData = await productsResponse.json();
    
    // Transform the API response to match our application's product format
    const products = productsData.results.map((item: any) => {
      // Get the first variant's price or default to 0
      const firstVariant = item.variants && item.variants.length > 0 ? item.variants[0] : null;
      const price = firstVariant?.unitPrice?.value || 0;
      
      // Get the first image or default to placeholder
      const imageUrl = item.images && item.images.length > 0 
        ? item.images[0].url 
        : `/images/${item.slug}.jpg`;
      
      return {
        id: item.id,
        name: item.name,
        price: price,
        imageUrl: imageUrl,
        slug: item.slug
      };
    });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    
    // Fallback to mock data in case of error
    return NextResponse.json([
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
    ]);
  }
} 