import { NextResponse } from 'next/server';

// Get the token from environment variables
const STOREFRONT_TOKEN = process.env.STOREFRONT_TOKEN || 'ptkn_dda67524-d1dc-4c1f-9a81-1cb75185af20';
const API_BASE_URL = 'https://storefront-api.fourthwall.com';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const collectionSlug = searchParams.get('collection') || 'all';
  const currency = searchParams.get('currency') || 'USD';

  try {
    // Fetch products from the specified collection
    const productsResponse = await fetch(
      `${API_BASE_URL}/v1/collections/${collectionSlug}/products?storefront_token=${STOREFRONT_TOKEN}&currency=${currency}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!productsResponse.ok) {
      // If we can't find the specific collection, try to get all products
      if (productsResponse.status === 404 && collectionSlug !== 'all') {
        console.log(`Collection ${collectionSlug} not found, falling back to 'all' collection`);
        
        const allProductsResponse = await fetch(
          `${API_BASE_URL}/v1/collections/all/products?storefront_token=${STOREFRONT_TOKEN}&currency=${currency}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (!allProductsResponse.ok) {
          throw new Error(`Failed to fetch products: ${allProductsResponse.status}`);
        }
        
        const allProductsData = await allProductsResponse.json();
        return formatProductsResponse(allProductsData);
      }
      
      throw new Error(`Failed to fetch products: ${productsResponse.status}`);
    }
    
    const productsData = await productsResponse.json();
    return formatProductsResponse(productsData);
  } catch (error) {
    console.error('Error fetching products:', error);
    
    // Fallback to mock data in case of error
    return NextResponse.json([
      {
        id: '1',
        name: 'Neural Network Tee',
        price: 34.99,
        imageUrl: '/images/neural-tee.jpg',
        slug: 'neural-network-tee',
        description: 'A comfortable t-shirt featuring neural network design.',
        variants: [
          { id: 'variant-1', name: 'S', price: 34.99, inStock: true },
          { id: 'variant-2', name: 'M', price: 34.99, inStock: true },
          { id: 'variant-3', name: 'L', price: 34.99, inStock: true },
        ]
      },
      {
        id: '2',
        name: 'Algorithm Hoodie',
        price: 59.99,
        imageUrl: '/images/algorithm-hoodie.jpg',
        slug: 'algorithm-hoodie',
        description: 'Stay warm with this algorithm-inspired hoodie.',
        variants: [
          { id: 'variant-4', name: 'S', price: 59.99, inStock: true },
          { id: 'variant-5', name: 'M', price: 59.99, inStock: true },
          { id: 'variant-6', name: 'L', price: 59.99, inStock: true },
        ]
      },
      {
        id: '3',
        name: 'Quantum Computing Mug',
        price: 18.99,
        imageUrl: '/images/quantum-mug.jpg',
        slug: 'quantum-computing-mug',
        description: 'Enjoy your coffee with this quantum computing-themed mug.',
        variants: [
          { id: 'variant-7', name: 'One Size', price: 18.99, inStock: true },
        ]
      },
      {
        id: '4',
        name: 'AI Ethics Cap',
        price: 24.99,
        imageUrl: '/images/ai-cap.jpg',
        slug: 'ai-ethics-cap',
        description: 'Show your support for ethical AI with this stylish cap.',
        variants: [
          { id: 'variant-8', name: 'One Size', price: 24.99, inStock: true },
        ]
      }
    ]);
  }
}

// Helper function to format the products response
function formatProductsResponse(data: any) {
  // Transform the API response to match our application's product format
  const products = data.results.map((item: any) => {
    // Process variants
    const variants = item.variants.map((variant: any) => {
      // Default to true for inStock if inventory data is missing
      // This ensures products are shown as in stock by default
      const inStock = variant.inventoryData?.isInStock ?? true;
      
      return {
        id: variant.id,
        name: variant.name || 'Default',
        price: variant.unitPrice?.value || 0,
        sku: variant.sku || '',
        inStock: inStock
      };
    });
    
    // Get the first variant's price or default to 0
    const price = variants.length > 0 ? variants[0].price : 0;
    
    // Get the first image or default to placeholder
    const imageUrl = item.images && item.images.length > 0 
      ? item.images[0].url 
      : `/images/${item.slug}.jpg`;

    // Construct a more detailed description if available
    let description = item.description || '';
    if (item.shortDescription && !description) {
      description = item.shortDescription;
    }
    
    return {
      id: item.id,
      name: item.name,
      price: price,
      imageUrl: imageUrl,
      slug: item.slug,
      description: description,
      variants: variants,
      // Include any additional data that might be useful
      category: item.category || '',
      tags: item.tags || [],
      createdAt: item.createdAt || '',
      updatedAt: item.updatedAt || ''
    };
  });
  
  return NextResponse.json(products);
} 