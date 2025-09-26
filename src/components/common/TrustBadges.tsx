'use client';

import { Shield, Lock, CheckCircle, Award, Truck, CreditCard } from 'lucide-react';

export function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: 'SSL Secured',
      description: '256-bit encryption',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Lock,
      title: 'Secure Payments',
      description: 'PCI DSS compliant',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: CheckCircle,
      title: 'Verified Reviews',
      description: '100% authentic',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Award,
      title: 'Quality Guarantee',
      description: '30-day return',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Orders over $50',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      icon: CreditCard,
      title: 'Safe Checkout',
      description: 'Multiple payment options',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className="bg-white py-8 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Why Shop With Confidence</h3>
          <p className="text-gray-600">Your security and satisfaction are our top priorities</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <div
                key={index}
                className={`${badge.bgColor} rounded-lg p-4 text-center hover:shadow-md transition-shadow duration-200`}
              >
                <div className="flex justify-center mb-2">
                  <IconComponent className={`w-6 h-6 ${badge.color}`} />
                </div>
                <h4 className="font-semibold text-sm text-gray-900 mb-1">{badge.title}</h4>
                <p className="text-xs text-gray-600">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function SecuritySection() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center mb-6">
          <Shield className="w-12 h-12 text-green-600 mr-3" />
          <div className="text-left">
            <h3 className="text-xl font-bold text-gray-900">Your Information is Protected</h3>
            <p className="text-gray-600">Bank-level security with 256-bit SSL encryption</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="flex items-center justify-center space-x-3">
            <Lock className="w-6 h-6 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">Secure Checkout</span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <span className="text-sm font-medium text-gray-900">Data Protection</span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <Award className="w-6 h-6 text-purple-600" />
            <span className="text-sm font-medium text-gray-900">Trusted Platform</span>
          </div>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>Protected by industry-standard security protocols. Your privacy is guaranteed.</p>
        </div>
      </div>
    </div>
  );
}