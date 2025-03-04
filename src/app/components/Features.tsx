'use client';

import { FiTrendingUp, FiPackage, FiSmile, FiRefreshCw } from 'react-icons/fi';

const features = [
  {
    id: 1,
    title: 'Premium Quality',
    description: 'All our merchandise is crafted with high-quality materials for long-lasting comfort and durability.',
    icon: FiTrendingUp,
  },
  {
    id: 2,
    title: 'Unique Designs',
    description: 'Each product features exclusive AI-inspired designs that are both stylish and technically accurate.',
    icon: FiPackage,
  },
  {
    id: 3,
    title: 'Satisfaction Guaranteed',
    description: 'Not happy with your purchase? We offer a 30-day money-back guarantee, no questions asked.',
    icon: FiSmile,
  },
  {
    id: 4,
    title: 'Sustainable Materials',
    description: 'We use eco-friendly materials and sustainable practices to reduce our environmental impact.',
    icon: FiRefreshCw,
  },
];

export default function Features() {
  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">Why Choose Us</h2>
          <p className="mt-2 text-3xl font-bold text-slate-800 dark:text-slate-100 sm:text-4xl">
            AI Fashion. Human Quality.
          </p>
          <p className="mt-4 max-w-2xl text-xl text-slate-600 dark:text-slate-400 lg:mx-auto">
            Blending cutting-edge AI concepts with premium craftsmanship.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div key={feature.id} className="relative p-6 bg-slate-50 dark:bg-slate-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="absolute h-24 w-24 bg-indigo-100 dark:bg-indigo-900/30 rounded-full -top-12 -right-12 opacity-20"></div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <feature.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-slate-800 dark:text-white">{feature.title}</h3>
                    <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 