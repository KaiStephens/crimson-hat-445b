import { NextResponse } from 'next/server';

// Get the token from environment variables
const STOREFRONT_TOKEN = process.env.STOREFRONT_TOKEN || 'ptkn_dda67524-d1dc-4c1f-9a81-1cb75185af20';
const API_BASE_URL = 'https://storefront-api.fourthwall.com';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const collectionSlug = searchParams.get('collection') || 'all';
  const currency = searchParams.get('currency') || 'USD';
  const productSlug = searchParams.get('slug');

  try {
    // If a specific product slug is provided, fetch just that product
    if (productSlug) {
      return await getProductBySlug(productSlug, currency);
    }

    // Fetch products from the specified collection
    const productsResponse = await fetch(
      `${API_BASE_URL}/v1/collections/${collectionSlug}/products?storefront_token=${STOREFRONT_TOKEN}&currency=${currency}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }, // Cache for an hour
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
            next: { revalidate: 3600 }, // Cache for an hour
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
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

async function getProductBySlug(slug: string, currency: string = 'USD') {
  try {
    // Try to find the product in all collections
    const allProductsResponse = await fetch(
      `${API_BASE_URL}/v1/collections/all/products?storefront_token=${STOREFRONT_TOKEN}&currency=${currency}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }, // Cache for an hour
      }
    );
    
    if (!allProductsResponse.ok) {
      throw new Error(`Failed to fetch products: ${allProductsResponse.status}`);
    }
    
    const allProductsData = await allProductsResponse.json();
    const products = allProductsData.results || [];
    
    // Find the product with the matching slug
    const product = products.find((p: any) => p.slug === slug);
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    // Format the individual product with enhanced details
    const formattedProduct = formatSingleProduct(product);
    return NextResponse.json(formattedProduct);
    
  } catch (error) {
    console.error(`Error fetching product by slug ${slug}:`, error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

function formatSingleProduct(item: any) {
  // Process variants with complete information
  const variants = item.variants.map((variant: any) => {
    // Default to true for inStock if inventory data is missing
    const inStock = variant.inventoryData?.isInStock ?? true;
    
    return {
      id: variant.id,
      name: variant.name || 'Default',
      price: variant.unitPrice?.value || 0,
      formattedPrice: variant.unitPrice?.formatted || `$${variant.unitPrice?.value || 0}`,
      sku: variant.sku || '',
      inStock: inStock,
      inventoryCount: variant.inventoryData?.count,
      attributes: variant.attributes || {},
      images: variant.images || []
    };
  });
  
  // Get the first variant's price or default to 0
  const price = variants.length > 0 ? variants[0].price : 0;
  const formattedPrice = variants.length > 0 ? variants[0].formattedPrice : `$${price}`;
  
  // Get all images from the product and variants
  const productImages = item.images || [];
  const variantImages = variants.flatMap((v: any) => v.images || []);
  const allImages = [...productImages, ...variantImages.filter((img: any) => 
    !productImages.some((pImg: any) => pImg.url === img.url)
  )];
  
  // Construct a more detailed description if available
  let description = item.description || '';
  if (item.shortDescription && !description) {
    description = item.shortDescription;
  }
  
  return {
    id: item.id,
    name: item.name,
    price: price,
    formattedPrice: formattedPrice,
    images: allImages.map((img: any) => ({
      url: img.url,
      alt: img.alt || item.name,
      width: img.width || 800,
      height: img.height || 800
    })),
    imageUrl: allImages.length > 0 ? allImages[0].url : `/images/${item.slug}.jpg`,
    slug: item.slug,
    description: description,
    shortDescription: item.shortDescription || '',
    variants: variants,
    // Include additional data
    category: item.category || '',
    tags: item.tags || [],
    details: item.details || {},
    shippingInfo: item.shippingInfo || {},
    metadata: item.metadata || {},
    createdAt: item.createdAt || '',
    updatedAt: item.updatedAt || ''
  };
}

function formatProductsResponse(data: any) {
  // Transform the API response to match our application's product format
  const products = data.results.map((item: any) => formatSingleProduct(item));
  
  return NextResponse.json(products);
} 