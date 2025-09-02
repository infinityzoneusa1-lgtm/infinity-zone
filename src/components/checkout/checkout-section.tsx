"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/contexts/cart-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { StripeCheckout } from "./stripe-checkout";

export function CheckoutSection() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showFailurePopup, setShowFailurePopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    zipcode: "",
    agreeToTerms: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeToTerms || cartItems.length === 0) {
      return;
    }

    // Show Stripe payment form
    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentForm(false);
    setShowSuccessPopup(true);
    clearCart();
  };

  const handlePaymentFailure = (error: string) => {
    setShowPaymentForm(false);
    setErrorMessage(error);
    setShowFailurePopup(true);
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
    // Optionally redirect to home or order confirmation page
    window.location.href = "/";
  };

  const closeFailurePopup = () => {
    setShowFailurePopup(false);
    setErrorMessage("");
  };

  const subtotal = getTotalPrice();
  const shipping = 5.0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <>
      <Header />
      <section className="py-8 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Shipping Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Shipping Information
              </h2>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <Label
                    htmlFor="fullName"
                    className="text-sm font-medium text-gray-700 mb-1 block"
                  >
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    className="w-full border border-gray-300"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 mb-1 block"
                  >
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full border border-gray-300"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700 mb-1 block"
                  >
                    Phone *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full border border-gray-300"
                    required
                  />
                </div>

                {/* Country */}
                <div>
                  <Label
                    htmlFor="country"
                    className="text-sm font-medium text-gray-700 mb-1 block"
                  >
                    Country *
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("country", value)
                    }
                  >
                    <SelectTrigger className="w-full border border-gray-300">
                      <SelectValue placeholder="United States" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="fr">France</SelectItem>
                      <SelectItem value="jp">Japan</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* City */}
                <div>
                  <Label
                    htmlFor="city"
                    className="text-sm font-medium text-gray-700 mb-1 block"
                  >
                    City/Location *
                  </Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="City/Location"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="w-full border border-gray-300"
                    required
                  />
                </div>

                {/* Zip Code */}
                <div>
                  <Label
                    htmlFor="zipcode"
                    className="text-sm font-medium text-gray-700 mb-1 block"
                  >
                    ZIP Code *
                  </Label>
                  <Input
                    id="zipcode"
                    type="text"
                    placeholder="ZIP Code"
                    value={formData.zipcode}
                    onChange={(e) =>
                      handleInputChange("zipcode", e.target.value)
                    }
                    className="w-full border border-gray-300"
                    required
                  />
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start space-x-2 pt-4">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      handleInputChange("agreeToTerms", checked as boolean)
                    }
                    className="mt-1"
                  />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    I have read and agree to the Terms and Conditions
                  </span>
                </div>
              </form>
            </div>

            {/* Right Column - Order Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Review your cart
              </h2>

              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No items in cart
                </p>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 text-sm">
                            {item.title}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            Quantity: {item.quantity}
                          </p>
                          {item.selectedCapacity && (
                            <p className="text-gray-500 text-xs">
                              Capacity: {item.selectedCapacity}
                            </p>
                          )}
                          {item.selectedColor && (
                            <p className="text-gray-500 text-xs">
                              Color: {item.selectedColor}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="border-t border-gray-200 pt-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-gray-900">
                        ${shipping.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax</span>
                      <span className="text-gray-900">${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between text-lg font-semibold">
                        <span className="text-gray-900">Total</span>
                        <span className="text-gray-900">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Options */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="secure-checkout" checked={true} />
                      <span className="text-sm text-gray-600">
                        Secure Checkout - SSL Encrypted
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      If shipping outside of Personal Marketplace please details
                      along service charge by location. Please note our charges
                      from the business.
                    </p>
                  </div>

                  {/* Pay Now Button */}
                  <Button
                    type="submit"
                    onClick={handleFormSubmit}
                    className="w-full bg-red-800 hover:bg-red-900 text-white font-medium py-3 px-6 rounded-md transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!formData.agreeToTerms || cartItems.length === 0}
                  >
                    Continue to Payment
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stripe Payment Modal */}
        {showPaymentForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
              <button
                onClick={() => setShowPaymentForm(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Complete Payment
              </h2>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                  <span>Total Amount:</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="text-xs text-gray-500">
                  Secure payment powered by Stripe
                </div>
              </div>

              <StripeCheckout
                amount={total}
                orderDetails={{
                  customer: formData,
                  items: cartItems.map(item => ({
                    ...item,
                    id: item.id.toString()
                  })),
                  subtotal,
                  shipping,
                  tax,
                  total,
                  timestamp: new Date().toISOString(),
                }}
                onSuccess={handlePaymentSuccess}
                onFailure={handlePaymentFailure}
              />
            </div>
          </div>
        )}

        {/* Success Popup */}
        {showSuccessPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center relative animate-in fade-in duration-300">
              <button
                onClick={closeSuccessPopup}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-6">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Payment Successful!
                </h2>
                <p className="text-gray-600">
                  Thank you for your purchase. Your order has been confirmed and
                  you will receive an email confirmation shortly.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={closeSuccessPopup}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
                >
                  Continue Shopping
                </Button>
                <p className="text-sm text-gray-500">
                  Order ID: #{Date.now().toString().slice(-8)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Failure Popup */}
        {showFailurePopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center relative animate-in fade-in duration-300">
              <button
                onClick={closeFailurePopup}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-6">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Payment Failed
                </h2>
                <p className="text-gray-600">
                  {errorMessage ||
                    "Sorry, there was an issue processing your payment. Please check your payment details and try again."}
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={closeFailurePopup}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
                >
                  Try Again
                </Button>
                <p className="text-sm text-gray-500">
                  Need help? Contact our support team
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
