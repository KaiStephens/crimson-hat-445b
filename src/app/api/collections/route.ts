import { NextResponse } from 'next/server';

const STOREFRONT_TOKEN = process.env.STOREFRONT_TOKEN || 'ptkn_dda67524-d1dc-4c1f-9a81-1cb75185af20';
const API_BASE_URL = 'https://storefront-api.fourthwall.com';

interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  imageUrl: string | null;
}

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/collections?storefront_token=${STOREFRONT_TOKEN}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch collections: ${response.status}`);
    }
    
    const collectionsData = await response.json();
    
    // If no collections found, return empty array with a default "all" collection
    if (!collectionsData.results || collectionsData.results.length === 0) {
      return NextResponse.json([
        {
          id: 'all',
          name: 'All Products',
          slug: 'all',
          description: 'All available products',
          productCount: 0,
          imageUrl: null
        }
      ]);
    }
    
    // Transform the API response to match our application's format
    const collections: Collection[] = collectionsData.results.map((item: any) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      description: item.description || '',
      productCount: item.productCount || 0,
      imageUrl: item.coverImage?.url || null
    }));
    
    // Make sure "All Products" is always available as an option
    const hasAllCollection = collections.some(collection => collection.slug === 'all');
    
    if (!hasAllCollection) {
      collections.unshift({
        id: 'all',
        name: 'All Products',
        slug: 'all',
        description: 'All available products',
        productCount: collections.reduce((total: number, collection: Collection) => total + collection.productCount, 0),
        imageUrl: null
      });
    }
    
    return NextResponse.json(collections);
  } catch (error) {
    console.error('Error fetching collections:', error);
    
    // Fallback to a default collection in case of error
    return NextResponse.json([
      {
        id: 'all',
        name: 'All Products',
        slug: 'all',
        description: 'All available products',
        productCount: 0,
        imageUrl: null
      }
    ]);
  }
} 