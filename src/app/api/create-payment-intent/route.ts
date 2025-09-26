import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe only if secret key is available and not a placeholder
const getStripeInstance = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey || secretKey === 'sk_test_placeholder' || secretKey.length < 10) {
    return null;
  }
  return new Stripe(secretKey, {
    apiVersion: '2025-08-27.basil',
  });
};

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'usd', orderDetails } = await request.json();

    // Validate required fields
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Get Stripe instance
    const stripe = getStripeInstance();
    
    // Check if Stripe is properly configured
    if (!stripe) {
      console.warn('Stripe secret key not configured, returning mock data for development');
      
      return NextResponse.json({
        clientSecret: `pi_mock_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
        paymentIntentId: `pi_mock_${Date.now()}`,
        status: 'requires_payment_method'
      });
    }

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Amount in cents
      currency,
      payment_method_types: ['card'], // Explicitly specify card instead of automatic
      metadata: {
        orderId: `order_${Date.now()}`,
        customerEmail: orderDetails?.customer?.email || '',
        customerName: orderDetails?.customer?.fullName || '',
        orderTotal: (amount / 100).toFixed(2),
        timestamp: new Date().toISOString(),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
    });

  } catch (error: unknown) {
    console.error('Stripe payment intent creation error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { 
        error: 'Failed to create payment intent',
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}
