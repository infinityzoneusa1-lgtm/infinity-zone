'use client';

import { useState, useEffect } from 'react';

// Fade in animation hook
export function useFadeIn(delay = 0) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
  };
}

// Stagger animation for lists
export function useStaggerAnimation(itemCount: number, delay = 100) {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(itemCount).fill(false));

  useEffect(() => {
    visibleItems.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, index * delay);
    });
  }, [itemCount, delay]);

  return visibleItems;
}

// Scroll reveal hook
export function useScrollReveal(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [element, threshold]);

  return { isVisible, setElement };
}

// Animated counter component
export function AnimatedCounter({ 
  end, 
  duration = 2000, 
  prefix = '', 
  suffix = '',
  className = '' 
}: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const { isVisible, setElement } = useScrollReveal();

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span ref={setElement} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// Button with loading state
export function AnimatedButton({
  children,
  isLoading = false,
  loadingText = 'Loading...',
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  [key: string]: any;
}) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-4 focus:ring-purple-200',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-4 focus:ring-gray-200',
    outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white focus:ring-4 focus:ring-purple-200'
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {isLoading ? loadingText : children}
    </button>
  );
}

// Card with hover animation
export function AnimatedCard({
  children,
  className = '',
  hoverScale = true,
  hoverShadow = true,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  hoverScale?: boolean;
  hoverShadow?: boolean;
  [key: string]: any;
}) {
  const hoverClasses = [];
  if (hoverScale) hoverClasses.push('hover:scale-105');
  if (hoverShadow) hoverClasses.push('hover:shadow-xl');

  return (
    <div
      className={`bg-white rounded-lg shadow-md transition-all duration-300 ${hoverClasses.join(' ')} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

// Floating action button
export function FloatingButton({
  children,
  position = 'bottom-right',
  className = '',
  ...props
}: {
  children: React.ReactNode;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  className?: string;
  [key: string]: any;
}) {
  const positionClasses = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-left': 'fixed bottom-6 left-6',
    'top-right': 'fixed top-6 right-6',
    'top-left': 'fixed top-6 left-6'
  };

  return (
    <button
      className={`${positionClasses[position]} bg-purple-600 text-white w-14 h-14 rounded-full shadow-lg hover:bg-purple-700 hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-purple-200 z-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// Notification toast
export function Toast({
  message,
  type = 'info',
  isVisible,
  onClose,
  duration = 5000
}: {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const typeClasses = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-black',
    info: 'bg-blue-500 text-white'
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 transform transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    } ${typeClasses[type]}`}>
      <div className="flex items-center">
        <span className="mr-2 text-lg">{icons[type]}</span>
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-lg font-bold hover:opacity-70"
        >
          ×
        </button>
      </div>
    </div>
  );
}

// Progress indicator
export function StepIndicator({
  steps,
  currentStep,
  className = ''
}: {
  steps: string[];
  currentStep: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        
        return (
          <div key={index} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
              isCompleted 
                ? 'bg-green-500 border-green-500 text-white'
                : isCurrent
                ? 'bg-purple-600 border-purple-600 text-white'
                : 'bg-white border-gray-300 text-gray-500'
            }`}>
              {isCompleted ? '✓' : index + 1}
            </div>
            <span className={`ml-2 text-sm font-medium ${
              isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'
            }`}>
              {step}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-4 ${
                isCompleted ? 'bg-green-500' : 'bg-gray-300'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}