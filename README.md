# QUANTUM - Minimalist AI-Inspired Apparel

A super minimalist e-commerce store for AI-inspired merchandise with clean design aesthetics and subtle animations.

## Features

- **Ultra Minimalist Design**: Clean, uncluttered interface that puts the focus on products
- **Subtle Animations**: Tasteful motion effects that enhance the user experience without overwhelming
- **Responsive**: Fully responsive layout that works beautifully on all devices
- **Dark Mode Support**: Automatic dark/light theme based on user preference
- **Storefront Integration**: Ready for integration with your e-commerce backend

## Tech Stack

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework for minimal styling
- **Framer Motion**: Animation library for subtle motion effects

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your Storefront token:
   ```
   STOREFRONT_TOKEN=your_storefront_token
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Storefront Integration

This project is designed to work with a Storefront API. The integration is currently set up with a placeholder implementation in `/src/app/api/products/route.ts`. To connect it to your actual storefront:

1. Update the API route to use your specific Storefront provider's API endpoints
2. Make sure your Storefront token is set in the `.env.local` file
3. Adjust the data mapping in the API route to match your storefront's data structure

## Image Placeholders

This project uses placeholder images for demonstration purposes. The required images are:

- `/public/images/neural-tee.jpg`
- `/public/images/algorithm-hoodie.jpg`
- `/public/images/quantum-mug.jpg`
- `/public/images/ai-cap.jpg`

## Customization

The design is intentionally minimalist and can be easily customized:

- Colors and theme variables are defined in `src/app/globals.css`
- Typography and spacing in components can be adjusted to match your brand
- Product grid layout and card design can be modified in the respective components

## License

MIT
