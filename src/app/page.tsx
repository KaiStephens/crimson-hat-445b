'use client';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <Hero />
        <FeaturedProducts />
        <Features />
        <Testimonials />
        <NewsletterSignup />
        <Footer />
      </div>
    </main>
  );
}

function NewsletterSignup() {
  return (
    <section className="py-16 bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Join our AI fashion community
            </h2>
            <p className="mt-3 text-lg text-indigo-200">
              Get early access to new products, exclusive offers, and AI fashion insights.
            </p>
          </div>
          <div className="mt-8 lg:mt-0 lg:flex-shrink-0">
            <form className="sm:flex">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-5 py-3 placeholder-slate-400 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white sm:max-w-xs"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white"
                >
                  Notify me
                </button>
              </div>
            </form>
            <p className="mt-3 text-sm text-indigo-200">
              We care about your data. Read our{' '}
              <a href="/privacy" className="font-medium text-white underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
