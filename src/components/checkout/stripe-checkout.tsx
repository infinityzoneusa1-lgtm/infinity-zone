"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// Load Stripe outside of component to avoid re-creating on every render
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

interface OrderDetails {
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
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
  onFailure,
}: {
  amount: number;
  orderDetails: OrderDetails;
  onSuccess: () => void;
  onFailure: (error: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const createOrder = async (paymentIntentId: string) => {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000"
        }/api/orders/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer: orderDetails.customer,
            items: orderDetails.items,
            subtotal: orderDetails.subtotal,
            shipping: orderDetails.shipping,
            tax: orderDetails.tax,
            total: orderDetails.total,
            paymentIntentId,
            paymentStatus: "completed",
          }),
        }
      );

      const result = await response.json();

      if (!result.success) {
        console.error("Order creation failed:", result.message);
        // Don't fail the entire flow if order creation fails
      } else {
        // console.log("Order created successfully:", result.data.orderNumber);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      // Don't fail the entire flow if order creation fails
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      onFailure("Payment system not ready. Please try again.");
      return;
    }

    setIsLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: "if_required",
      });

      if (error) {
        console.error("Payment error:", error);
        onFailure(error.message || "Payment failed");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // console.log("Payment succeeded:", paymentIntent);

        // Create order in database after successful payment
        await createOrder(paymentIntent.id);

        onSuccess();
      } else {
        console.warn("Unexpected payment status:", paymentIntent?.status);
        onFailure("Payment processing incomplete");
      }
    } catch (error: unknown) {
      console.error("Payment processing error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Payment processing failed";
      onFailure(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement
        options={{
          layout: "tabs",
          paymentMethodOrder: ["card"],
          fields: {
            billingDetails: {
              name: "auto",
              email: "auto",
            },
          },
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
  onFailure,
}: StripeCheckoutProps) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amount * 100,
            currency: "usd",
            orderDetails,
          }),
        });

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
        onFailure(
          error instanceof Error
            ? error.message
            : "Failed to initialize payment"
        );
      }
    };

    createPaymentIntent();
  }, [amount, orderDetails, onFailure]);

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe" as const,
      variables: {
        colorPrimary: "#450209",
      },
    },
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
