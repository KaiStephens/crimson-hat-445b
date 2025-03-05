import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import AnimatedBackground from "./components/AnimatedBackground";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Artificial Wearables | Minimalist AI-Inspired Apparel",
  description: "Minimalist, AI-inspired clothing and accessories with clean design aesthetics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Script to handle redirects from Fourthwall emails */}
        <Script id="fourthwall-redirect" strategy="beforeInteractive">
          {`
            // Get the current path of the URL
            const currentPath = window.location.pathname;
            const currentHostname = window.location.hostname;
            const storeUrl = "${process.env.NEXT_PUBLIC_STORE_URL || 'http://localhost:3000'}";
            const checkoutDomain = "${process.env.NEXT_PUBLIC_FW_CHECKOUT_DOMAIN || 'checkout.fourthwall.com'}";
            
            // Check if we're on the Fourthwall domain and not on the checkout path
            if (currentHostname.includes(checkoutDomain) && currentPath !== '/checkout') {
              // Redirect to our store
              window.location.href = storeUrl;
            }
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <CartProvider>
          <AnimatedBackground />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
