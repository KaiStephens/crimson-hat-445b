'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container-sm text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            About Artificial Wearables
          </motion.h1>
          
          <motion.div
            className="w-20 h-1 bg-gray-200 dark:bg-gray-800 mx-auto mb-8"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Crafting minimalist apparel at the intersection of AI and design since 2023.
          </motion.p>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-light mb-6">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Artificial Wearables was born from a simple idea: that clothing inspired by AI and technology could be both minimalist and meaningful.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our founder, a designer with a background in both fashion and machine learning, wanted to create apparel that celebrated the elegance of algorithms and neural networks through clean, thoughtful design.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                What began as a small collection has grown into a brand that resonates with tech enthusiasts, AI professionals, and anyone who appreciates the beauty in simplicity and technology.
              </p>
            </motion.div>
            
            <motion.div
              className="relative h-96 rounded-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image 
                src="/images/about-story.jpg" 
                alt="Our design studio" 
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.h2 
            className="text-3xl font-light mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Our Values
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Minimalism",
                description: "We believe in the power of simplicity. Our designs remove the unnecessary to focus on what truly matters.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )
              },
              {
                title: "Sustainability",
                description: "From materials to manufacturing, we make choices that minimize our environmental impact.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                )
              },
              {
                title: "Innovation",
                description: "We're constantly exploring new ideas at the intersection of fashion, technology, and artificial intelligence.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                  </svg>
                )
              }
            ].map((value, i) => (
              <motion.div 
                key={i}
                className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mb-4 text-gray-800 dark:text-gray-200">
                  {value.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.h2 
            className="text-3xl font-light mb-4 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Our Team
          </motion.h2>
          
          <motion.p
            className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            A small, dedicated team passionate about creating thoughtful designs that bridge the gap between technology and fashion.
          </motion.p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Morgan",
                role: "Founder & Creative Director",
                bio: "With a background in both fashion design and machine learning, Alex brings a unique perspective to every product we create."
              },
              {
                name: "Jordan Chen",
                role: "Lead Designer",
                bio: "Jordan's minimalist aesthetic and deep understanding of technical concepts create the perfect balance in our designs."
              },
              {
                name: "Taylor Kim",
                role: "Sustainability Lead",
                bio: "Taylor ensures that our commitment to environmental responsibility is reflected in every decision we make."
              }
            ].map((member, i) => (
              <motion.div 
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-32 h-32 mx-auto bg-gray-200 dark:bg-gray-800 rounded-full mb-4"></div>
                <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 max-w-xs mx-auto">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-light mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Join Our Journey
          </motion.h2>
          
          <motion.p
            className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Be part of our story as we continue to explore the beautiful intersection of technology, design, and fashion.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Link href="/products" passHref>
              <span className="btn-primary inline-block transition-transform hover:scale-105 active:scale-95">
                Shop Our Collection
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 