'use client';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductsGrid from './components/ProductsGrid';
// import FeaturedProducts from './components/FeaturedProducts'; // Alternative component with predefined products
import Footer from './components/Footer';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      <section className="py-16">
        <div className="container-sm">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-8"
          >
            <h2 className="text-xl font-medium mb-8">Featured Products</h2>
            <ProductsGrid />
            
            {/* Or use FeaturedProducts which has predefined products */}
            {/* <FeaturedProducts /> */}
          </motion.div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-lg mx-auto text-center"
          >
            <h2 className="text-xl font-medium mb-4">Join our community</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Sign up for updates on new products and special promotions.
            </p>
            <form className="max-w-md mx-auto">
              <div className="flex">
                <input
                  type="email"
                  className="flex-1 px-4 py-2 rounded-l-md bg-white dark:bg-black border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
                  placeholder="Your email"
                  required
                />
                <button
                  type="submit"
                  className="btn-primary rounded-l-none"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
