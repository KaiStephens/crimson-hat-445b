'use client';

import Image from 'next/image';
import { FiStar } from 'react-icons/fi';

const testimonials = [
  {
    id: 1,
    name: 'Alex Chen',
    role: 'AI Researcher',
    content: 'I love my Neural Network tee! The design is both technically accurate and aesthetically pleasing. The quality of the print and fabric is excellent.',
    avatar: '/images/avatar-1.jpg',
    rating: 5
  },
  {
    id: 2,
    name: 'Sophia Martinez',
    role: 'Software Engineer',
    content: 'The Algorithm Hoodie is so comfortable and I get compliments on it all the time. Perfect for those chilly days in the office or working from home.',
    avatar: '/images/avatar-2.jpg',
    rating: 5
  },
  {
    id: 3,
    name: 'Noah Wilson',
    role: 'Data Scientist',
    content: 'These products aren\'t just fashion statements—they\'re conversation starters. Every time I wear my Quantum Computing cap, people ask about it!',
    avatar: '/images/avatar-3.jpg',
    rating: 4
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">What Our Customers Say</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Join the growing community of AI enthusiasts who love our products.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6 relative">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 mr-4 overflow-hidden rounded-full">
                  <Image 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">{testimonial.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <FiStar 
                    key={i} 
                    className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}`} 
                  />
                ))}
              </div>
              
              <p className="text-slate-600 dark:text-slate-300">"{testimonial.content}"</p>
              
              <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-indigo-100 dark:bg-indigo-900/30 rounded-full opacity-20"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 