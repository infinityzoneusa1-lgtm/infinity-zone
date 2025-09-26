'use client';

import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar: string;
  rating: number;
  content: string;
  product?: string;
  verified: boolean;
  location: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Michelle',
    role: 'Beauty Influencer',
    company: '@SarahGlowUp',
    avatar: '/placeholder-user.jpg',
    rating: 5,
    content: 'InfinityZone has completely transformed my skincare routine. The quality of products is exceptional, and the customer service is outstanding. I\'ve been using their premium skincare line for 6 months now and the results are incredible!',
    product: 'Premium Skincare Set',
    verified: true,
    location: 'Los Angeles, CA',
    date: '2024-12-15'
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    role: 'Entrepreneur',
    company: 'Johnson Enterprises',
    avatar: '/placeholder-user.jpg',
    rating: 5,
    content: 'As a vendor on InfinityZone, I\'ve seen my business grow exponentially. Their platform is user-friendly, and their support team is always there to help. The commission structure is fair and transparent.',
    product: 'Vendor Program',
    verified: true,
    location: 'New York, NY',
    date: '2024-12-10'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    role: 'Content Creator',
    company: '@ElenaBeauty',
    avatar: '/placeholder-user.jpg',
    rating: 5,
    content: 'The affiliate program at InfinityZone is amazing! I\'ve been able to monetize my content while promoting products I genuinely love. The tracking system is accurate and payments are always on time.',
    product: 'Affiliate Program',
    verified: true,
    location: 'Miami, FL',
    date: '2024-12-08'
  },
  {
    id: '4',
    name: 'David Chen',
    role: 'Professional Makeup Artist',
    company: 'Chen Beauty Studio',
    avatar: '/placeholder-user.jpg',
    rating: 5,
    content: 'The professional services directory has connected me with so many clients. The platform is professional, and the quality of leads is excellent. My business has grown 200% since joining.',
    product: 'Professional Services',
    verified: true,
    location: 'San Francisco, CA',
    date: '2024-12-05'
  },
  {
    id: '5',
    name: 'Aisha Patel',
    role: 'Beauty Blogger',
    company: 'Beauty & Beyond Blog',
    avatar: '/placeholder-user.jpg',
    rating: 5,
    content: 'InfinityZone\'s blogger partnership program is fantastic. They provide excellent products for review and their collaboration process is seamless. It\'s been a game-changer for my blog.',
    product: 'Blogger Program',
    verified: true,
    location: 'Chicago, IL',
    date: '2024-12-01'
  },
  {
    id: '6',
    name: 'James Wilson',
    role: 'Customer',
    avatar: '/placeholder-user.jpg',
    rating: 5,
    content: 'I\'ve been shopping with InfinityZone for over a year now. The product quality is consistently excellent, shipping is fast, and customer service is top-notch. Highly recommended!',
    product: 'Luxury Beauty Products',
    verified: true,
    location: 'Dallas, TX',
    date: '2024-11-28'
  }
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Community Says
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers, vendors, and partners who trust InfinityZone
          </p>
          
          {/* Trust Stats */}
          <div className="grid grid-cols-3 gap-8 mt-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">25K+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">4.9/5</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">500+</div>
              <div className="text-sm text-gray-600">Partners</div>
            </div>
          </div>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="relative bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="transition-all duration-500 ease-in-out">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`${
                  index === currentIndex ? 'block' : 'hidden'
                }`}
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="relative">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="rounded-full object-cover"
                    />
                    {testimonial.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">
                          {testimonial.role}
                          {testimonial.company && (
                            <span className="ml-1 text-purple-600">• {testimonial.company}</span>
                          )}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < testimonial.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 w-8 h-8 text-purple-200" />
                      <p className="text-gray-700 text-lg leading-relaxed pl-6">
                        {testimonial.content}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                      <span>📍 {testimonial.location}</span>
                      {testimonial.product && (
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                          {testimonial.product}
                        </span>
                      )}
                      <span>{new Date(testimonial.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grid of Mini Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div key={`mini-${testimonial.id}`} className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover mr-3"
                />
                <div>
                  <h5 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h5>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < testimonial.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm line-clamp-3">
                {testimonial.content}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Ready to Join Our Success Stories?
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/vendor-app"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Become a Vendor
            </a>
            <a
              href="/affiliates"
              className="bg-white text-purple-600 border-2 border-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors"
            >
              Join Affiliate Program
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CompactTestimonials() {
  return (
    <div className="bg-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.slice(0, 2).map((testimonial) => (
            <div key={testimonial.id} className="flex space-x-4">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={48}
                height={48}
                className="rounded-full object-cover flex-shrink-0"
              />
              <div>
                <div className="flex items-center mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-2 line-clamp-2">
                  "{testimonial.content}"
                </p>
                <div className="text-xs text-gray-500">
                  <span className="font-medium">{testimonial.name}</span>
                  {testimonial.verified && (
                    <span className="ml-1 text-green-600">✓ Verified</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}