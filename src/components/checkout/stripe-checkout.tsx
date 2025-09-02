"use client";

import { useState, useEffect, useCallback } from 'react';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

// Load Stripe outside of component to avoid re-creating on every render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface OrderDetails {
  customer: {
    fullName: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    zipcode: string;
    agreeToTerms: boolean;
  };
  items: Array<{
    id: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
    selectedCapacity?: string;
    selectedColor?: string;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  timestamp: string;
}

interface StripeCheckoutProps {
  amount: number;
  orderDetails: OrderDetails;
  onSuccess: () => void;
  onFailure: (error: string) => void;
}

function CheckoutForm({ 
  amount, 
  orderDetails, 
  onSuccess, 
  onFailure 
}: StripeCheckoutProps) {
  const stripe = useStripe();
  const elements = useElements();
  
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  const createPaymentIntent = useCallback(async () => {
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to cents
          currency: 'usd',
          orderDetails,
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setClientSecret(data.clientSecret);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to initialize payment';
      console.error('Error creating payment intent:', error);
      onFailure(errorMessage);
    }
  }, [amount, orderDetails, onFailure]);

  useEffect(() => {
    createPaymentIntent();
  }, [createPaymentIntent]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setIsLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: 'if_required',
      });

      if (error) {
        onFailure(error.message || 'Payment failed');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess();
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Payment processing failed';
      onFailure(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="ml-2">Initializing payment...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement 
        options={{
          layout: 'tabs',
        }}
      />
      
      <Button
        type="submit"
        disabled={!stripe || !elements || isLoading}
        className="w-full bg-red-800 hover:bg-red-900 text-white font-medium py-3 px-6 rounded-md transition-colors disabled:opacity-50"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Processing Payment...
          </div>
        ) : (
          `Pay $${amount.toFixed(2)}`
        )}
      </Button>
    </form>
  );
}

export function StripeCheckout({ 
  amount, 
  orderDetails, 
  onSuccess, 
  onFailure 
}: StripeCheckoutProps) {
  const options = {
    mode: 'payment' as const,
    amount: amount * 100,
    currency: 'usd',
    appearance: {
      theme: 'stripe' as const,
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
        amount={amount}
        orderDetails={orderDetails}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </Elements>
  );
}
