'use client';

import { useEffect } from 'react';

// Performance monitoring hook
export function usePerformanceMonitoring() {
  useEffect(() => {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Log performance metrics
          console.log(`${entry.name}: ${entry.duration}`);
          
          // You can send this data to your analytics service
          // analytics.track('performance_metric', {
          //   name: entry.name,
          //   duration: entry.duration
          // });
        }
      });

      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
      
      return () => observer.disconnect();
    }
  }, []);
}

// Loading skeleton components
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-200" />
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded mb-2" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-6 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
}

export function TestimonialSkeleton() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md animate-pulse">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full mr-4" />
        <div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-16" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded" />
        <div className="h-3 bg-gray-200 rounded" />
        <div className="h-3 bg-gray-200 rounded w-3/4" />
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="h-16 bg-gray-200 mb-4" />
      
      {/* Hero skeleton */}
      <div className="h-96 bg-gray-200 mb-8" />
      
      {/* Content skeleton */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Loading spinner component
export function LoadingSpinner({ size = 'md', className = '' }: { 
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin`} />
    </div>
  );
}

// Progress bar component
export function ProgressBar({ progress, className = '' }: { 
  progress: number;
  className?: string;
}) {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div 
        className={`bg-purple-600 h-2 rounded-full transition-all duration-300 ${
          progress === 25 ? 'w-1/4' :
          progress === 50 ? 'w-2/4' :
          progress === 75 ? 'w-3/4' :
          progress === 100 ? 'w-full' :
          'w-0'
        }`}
      />
    </div>
  );
}

// Error boundary component
export function ErrorFallback({ 
  error, 
  resetErrorBoundary 
}: { 
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
        <p className="text-gray-600 mb-6">
          We apologize for the inconvenience. Please try refreshing the page.
        </p>
        <button
          onClick={resetErrorBoundary}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          Try Again
        </button>
        <details className="mt-4 text-left">
          <summary className="cursor-pointer text-sm text-gray-500">Error Details</summary>
          <pre className="mt-2 text-xs text-gray-400 bg-gray-50 p-2 rounded overflow-auto">
            {error.message}
          </pre>
        </details>
      </div>
    </div>
  );
}

// Lazy loading wrapper
export function LazyWrapper({ 
  children, 
  fallback = <LoadingSpinner />,
  className = '' 
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <React.Suspense fallback={fallback}>
        {children}
      </React.Suspense>
    </div>
  );
}

// Import React for Suspense
import React from 'react';