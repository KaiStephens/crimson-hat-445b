# Artificial Wearables - Minimalist AI-Inspired Apparel

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

1. Clone the repository:
```bash
git clone <repository-url>
cd artificial-wearables
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with your Fourthwall Storefront API token:
```
FOURTHWALL_STOREFRONT_TOKEN=your_token_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to see the site

## Fourthwall Integration

This site uses the Fourthwall Storefront API to fetch products and handle checkout. To set up the integration:

1. Make sure your `.env.local` file includes your valid Fourthwall Storefront token
2. The API routes in `/app/api/` handle the connection to Fourthwall
3. Ensure your Fourthwall store has products created with images

## Placeholder Images

The store uses placeholder images for demonstration purposes. The required images are:

- `public/images/logo.png` - Logo for the site
- `public/images/neural-tee.jpg` - T-shirt product image
- `public/images/algorithm-hoodie.jpg` - Hoodie product image
- `public/images/quantum-mug.jpg` - Mug product image
- `public/images/ai-cap.jpg` - Cap product image

## Customization

The design is intentionally minimalist and can be easily customized:

- Colors and theme variables are defined in `src/app/globals.css`
- Typography and spacing in components can be adjusted to match your brand
- Product grid layout and card design can be modified in the respective components

## License

MIT
