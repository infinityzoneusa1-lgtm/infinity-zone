'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { CheckoutData } from '@/types/product';
import { Lock, CreditCard, Truck, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function CheckoutPage() {
  const { state } = useCart();
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    email: '',
    billingAddress: {
      firstName: '',
      lastName: '',
      company: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US',
      phone: ''
    },
    sameAsShipping: true,
    shippingMethod: 'standard',
    paymentMethod: 'card'
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (section: keyof CheckoutData, field: string, value: string) => {
    if (section === 'billingAddress') {
      setCheckoutData(prev => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [field]: value
        }
      }));
    } else {
      setCheckoutData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle checkout submission
    console.log('Checkout data:', checkoutData);
    // Integrate with Stripe or other payment processor
  };

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            You need to add some items to your cart before you can checkout.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center bg-[#450209] text-white px-6 py-3 rounded-lg hover:bg-[#5a0a0a] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/cart"
              className="inline-flex items-center text-[#450209] hover:text-[#5a0a0a] transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div className={`flex items-center ${currentStep >= 1 ? 'text-[#450209]' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-[#450209] text-white' : 'bg-gray-200'}`}>
                  1
                </div>
                <span className="ml-2 font-medium">Shipping</span>
              </div>
              <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-[#450209]' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center ${currentStep >= 2 ? 'text-[#450209]' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-[#450209] text-white' : 'bg-gray-200'}`}>
                  2
                </div>
                <span className="ml-2 font-medium">Payment</span>
              </div>
              <div className={`w-16 h-1 ${currentStep >= 3 ? 'bg-[#450209]' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center ${currentStep >= 3 ? 'text-[#450209]' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-[#450209] text-white' : 'bg-gray-200'}`}>
                  3
                </div>
                <span className="ml-2 font-medium">Review</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <span className="w-6 h-6 bg-[#450209] text-white rounded-full flex items-center justify-center text-sm mr-3">1</span>
                    Contact Information
                  </h2>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={checkoutData.email}
                        onChange={(e) => setCheckoutData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#450209] focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <span className="w-6 h-6 bg-[#450209] text-white rounded-full flex items-center justify-center text-sm mr-3">2</span>
                    Shipping Address
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={checkoutData.billingAddress.firstName}
                        onChange={(e) => handleInputChange('billingAddress', 'firstName', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#450209] focus:border-transparent"
                        placeholder="Enter your first name"
                        title="First name is required"
                        aria-label="First name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={checkoutData.billingAddress.lastName}
                        onChange={(e) => handleInputChange('billingAddress', 'lastName', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#450209] focus:border-transparent"
                        placeholder="Enter your last name"
                        title="Last name is required"
                        aria-label="Last name"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company (Optional)
                      </label>
                      <input
                        type="text"
                        value={checkoutData.billingAddress.company}
                        onChange={(e) => handleInputChange('billingAddress', 'company', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#450209] focus:border-transparent"
                        placeholder="Company name (optional)"
                        title="Company name (optional)"
                        aria-label="Company name"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={checkoutData.billingAddress.address1}
                        onChange={(e) => handleInputChange('billingAddress', 'address1', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#450209] focus:border-transparent"
                        placeholder="Street address"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={checkoutData.billingAddress.city}
                        onChange={(e) => handleInputChange('billingAddress', 'city', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#450209] focus:border-transparent"
                        placeholder="Enter your city"
                        title="City is required"
                        aria-label="City"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <select
                        required
                        value={checkoutData.billingAddress.state}
                        onChange={(e) => handleInputChange('billingAddress', 'state', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#450209] focus:border-transparent"
                        aria-label="Select your state"
                      >
                        <option value="">Select State</option>
                        <option value="CA">California</option>
                        <option value="NY">New York</option>
                        <option value="TX">Texas</option>
                        {/* Add more states */}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={checkoutData.billingAddress.zipCode}
                        onChange={(e) => handleInputChange('billingAddress', 'zipCode', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#450209] focus:border-transparent"
                        placeholder="Enter ZIP code"
                        title="ZIP code is required"
                        aria-label="ZIP code"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={checkoutData.billingAddress.phone}
                        onChange={(e) => handleInputChange('billingAddress', 'phone', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#450209] focus:border-transparent"
                        placeholder="Enter your phone number"
                        title="Phone number is required"
                        aria-label="Phone number"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <Truck className="w-5 h-5 mr-3 text-[#450209]" />
                    Shipping Method
                  </h2>
                  
                  <div className="space-y-3">
                    <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#450209] transition-colors">
                      <input
                        type="radio"
                        id="standard"
                        name="shipping"
                        value="standard"
                        checked={checkoutData.shippingMethod === 'standard'}
                        onChange={(e) => setCheckoutData(prev => ({ ...prev, shippingMethod: e.target.value }))}
                        className="text-[#450209] focus:ring-[#450209]"
                        aria-label="Standard shipping 5-7 business days"
                      />
                      <label htmlFor="standard" className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">Standard Shipping</p>
                            <p className="text-sm text-gray-500">5-7 business days</p>
                          </div>
                          <p className="font-medium">{state.shipping === 0 ? 'Free' : `$${state.shipping.toFixed(2)}`}</p>
                        </div>
                      </label>
                    </div>
                    
                    <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#450209] transition-colors">
                      <input
                        type="radio"
                        id="express"
                        name="shipping"
                        value="express"
                        checked={checkoutData.shippingMethod === 'express'}
                        onChange={(e) => setCheckoutData(prev => ({ ...prev, shippingMethod: e.target.value }))}
                        className="text-[#450209] focus:ring-[#450209]"
                        aria-label="Express shipping 2-3 business days"
                      />
                      <label htmlFor="express" className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">Express Shipping</p>
                            <p className="text-sm text-gray-500">2-3 business days</p>
                          </div>
                          <p className="font-medium">$15.00</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <CreditCard className="w-5 h-5 mr-3 text-[#450209]" />
                    Payment Method
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                      <input
                        type="radio"
                        id="card"
                        name="payment"
                        value="card"
                        checked={checkoutData.paymentMethod === 'card'}
                        onChange={(e) => setCheckoutData(prev => ({ ...prev, shippingMethod: e.target.value }))}
                        className="text-[#450209] focus:ring-[#450209]"
                        aria-label="Pay with credit or debit card"
                      />
                      <label htmlFor="card" className="ml-3 flex-1">
                        <p className="font-medium">Credit / Debit Card</p>
                        <p className="text-sm text-gray-500">Visa, Mastercard, American Express</p>
                      </label>
                    </div>
                    
                    {checkoutData.paymentMethod === 'card' && (
                      <div className="ml-8 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Card Number *
                          </label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#450209] focus:border-transparent"
                            aria-label="Credit card number"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Expiry Date *
                            </label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#450209] focus:border-transparent"
                              aria-label="Card expiry date"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              CVC *
                            </label>
                            <input
                              type="text"
                              placeholder="123"
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#450209] focus:border-transparent"
                              aria-label="Card security code"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#450209] text-white py-4 px-6 rounded-lg hover:bg-[#5a0a0a] transition-colors font-medium text-lg flex items-center justify-center"
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Complete Order - ${state.total.toFixed(2)}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-6">
                <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {state.items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-3">
                      <div className="relative w-12 h-12 bg-gray-50 rounded-lg overflow-hidden">
                        <Image
                          src={item.product.images[0] || '/placeholder.jpg'}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.product.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">${state.subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium">
                      {state.shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${state.shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax:</span>
                    <span className="font-medium">${state.tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
                    <span>Total:</span>
                    <span className="text-[#450209]">${state.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}