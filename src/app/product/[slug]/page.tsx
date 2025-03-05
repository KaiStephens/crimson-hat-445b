'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Custom description for the Scaling Laws Beanie
const customProductDescriptions: Record<string, string> = {
  'scaling-laws-beanie': `
    <p>The Scaling Laws Beanie features the elegant mathematical formula that revolutionized machine learning: L = E + (A/Nᵅ) + (B/Dᵝ).</p>
    <p>This formula represents the foundational scaling laws of neural networks that guide modern AI development. Perfect for computer scientists, ML engineers, and anyone fascinated by the mathematics behind artificial intelligence.</p>
    <p>Made from premium material with a comfortable fit, this beanie not only keeps you warm but also showcases your appreciation for the theoretical underpinnings of deep learning.</p>
    <p>Features:</p>
    <ul>
      <li>Soft, double-layered knit fabric</li>
      <li>Ribbed construction for a snug fit</li>
      <li>Embroidered formula using durable thread</li>
      <li>One size fits most</li>
      <li>Machine washable (gentle cycle recommended)</li>
    </ul>
    <p>Let the world know you understand the mathematical beauty behind neural network scaling while staying warm and stylish.</p>
  `,
  // Add more product descriptions as needed
};

// Interface definitions
interface ProductImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

interface Variant {
  id: string;
  name: string;
  price: number;
  formattedPrice?: string;
  sku: string;
  inStock: boolean;
  inventoryCount?: number;
  attributes?: Record<string, any>;
  images?: any[];
}

interface Product {
  id: string;
  name: string;
  price: number;
  formattedPrice?: string;
  images: ProductImage[];
  imageUrl: string;
  description: string;
  shortDescription?: string;
  slug: string;
  variants: Variant[];
  category?: string;
  tags?: string[];
  details?: Record<string, any>;
  shippingInfo?: Record<string, any>;
  metadata?: Record<string, any>;
}

function ProductDetailContent() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [imgError, setImgError] = useState(false);
  
  const { addToCart } = useCart();
  
  // Fallback image for products
  const fallbackImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjgwMCIgdmlld0JveD0iMCAwIDgwMCA4MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI4MDAiIGZpbGw9IiNGMkYyRjIiLz48cGF0aCBkPSJNNDAwIDI1MEMzMDUuOTY0IDI1MCAyMzAgMzI1Ljk2NCAyMzAgNDIwQzIzMCA1MTQuMDM2IDMwNS45NjQgNTkwIDQwMCA1OTBDNDk0LjAzNiA1OTAgNTcwIDUxNC4wMzYgNTcwIDQyMEM1NzAgMzI1Ljk2NCA0OTQuMDM2IDI1MCA0MDAgMjUwWiIgZmlsbD0iI0U1RTVFNSIvPjwvc3ZnPg==';
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch the specific product by slug
        const productResponse = await fetch(`/api/products?slug=${slug}`);
        
        if (!productResponse.ok) {
          throw new Error('Failed to fetch product');
        }
        
        const productData = await productResponse.json();
        
        if (!productData || productData.error) {
          throw new Error(productData?.error || 'Product not found');
        }
        
        console.log('Found product data:', productData);
        
        // If we have a custom description for this product, use it
        if (customProductDescriptions[slug]) {
          productData.description = customProductDescriptions[slug];
        }
        
        setProduct(productData);
        
        // Set the first image as selected
        if (productData.images && productData.images.length > 0) {
          setSelectedImage(productData.images[0].url);
        }
        
        // Select the first variant by default
        if (productData.variants && productData.variants.length > 0) {
          // Find first in-stock variant if available, otherwise select the first one
          const inStockVariant = productData.variants.find((v: Variant) => v.inStock === true);
          setSelectedVariant(inStockVariant || productData.variants[0]);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (slug) {
      fetchProduct();
    }
  }, [slug]);
  
  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };
  
  const handleAddToCart = async () => {
    if (!product || !selectedVariant) return;
    
    try {
      setAddingToCart(true);
      
      // Call addToCart with product details and the selected variant ID
      await addToCart({
        id: product.id,
        name: product.name,
        slug: product.slug,
        variantId: selectedVariant.id,
        variantName: selectedVariant.name,
        price: selectedVariant.price,
        imageUrl: selectedImage || product.imageUrl
      }, selectedVariant.id);
      
      setAddingToCart(false);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setAddingToCart(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-800 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-800 rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-800 rounded w-3/4"></div>
                <div className="h-6 bg-gray-800 rounded w-1/2"></div>
                <div className="h-32 bg-gray-800 rounded"></div>
                <div className="h-10 bg-gray-800 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 py-32 text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
          <p className="mb-6">{error || "Product not found"}</p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-white text-black"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative h-[500px] w-full bg-gray-900 overflow-hidden">
              <Image
                src={selectedImage || product.imageUrl || fallbackImage}
                alt={product.name}
                fill
                style={{ objectFit: 'contain' }}
                priority
                onError={() => setImgError(true)}
              />
            </div>
            
            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageSelect(image.url)}
                    className={`relative w-20 h-20 bg-gray-900 flex-shrink-0 ${selectedImage === image.url ? 'border-2 border-white' : 'border border-gray-700'}`}
                  >
                    <Image
                      src={image.url}
                      alt={`${product.name} - view ${index + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            
            <p className="text-2xl font-semibold">
              {selectedVariant?.formattedPrice || product.formattedPrice || `$${selectedVariant?.price || product.price}`}
            </p>
            
            {/* Short Description */}
            {product.shortDescription && (
              <div className="text-gray-300 text-lg">
                {product.shortDescription}
              </div>
            )}
            
            {/* Variant Selection */}
            {product.variants.length > 1 && (
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Select {Object.keys(product.variants[0]?.attributes || {}).length > 0 ? 'Options' : 'Size'}:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2 border ${selectedVariant?.id === variant.id 
                        ? 'border-white bg-white text-black' 
                        : 'border-gray-700'} 
                        ${!variant.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={!variant.inStock}
                    >
                      {variant.name}
                      {!variant.inStock && " (Out of Stock)"}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={addingToCart || !selectedVariant?.inStock}
              className="w-full py-3 px-4 bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {addingToCart ? 'Adding...' : selectedVariant?.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            
            {/* Full Description */}
            <div className="prose prose-invert max-w-none mt-8">
              <h2 className="text-xl font-semibold">Description</h2>
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
            
            {/* Product Details Table */}
            {product.details && Object.keys(product.details).length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Product Details</h2>
                <div className="border-t border-gray-700">
                  {Object.entries(product.details).map(([key, value]) => (
                    <div key={key} className="py-4 border-b border-gray-700 grid grid-cols-3">
                      <div className="col-span-1 font-medium">{key}</div>
                      <div className="col-span-2">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Shipping Info */}
            {product.shippingInfo && Object.keys(product.shippingInfo).length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                <div className="border-t border-gray-700">
                  {Object.entries(product.shippingInfo).map(([key, value]) => (
                    <div key={key} className="py-4 border-b border-gray-700 grid grid-cols-3">
                      <div className="col-span-1 font-medium">{key}</div>
                      <div className="col-span-2">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <div key={index} className="px-3 py-1 bg-gray-800 text-sm rounded-full">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>}>
        <ProductDetailContent />
      </Suspense>
      <Footer />
    </>
  );
} 