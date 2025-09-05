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

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  // Get Stripe instance
  const stripe = getStripeInstance();

  if (!signature || !endpointSecret || !stripe) {
    console.error('Missing Stripe signature, webhook secret, or Stripe not configured');
    return NextResponse.json(
      { error: 'Webhook not properly configured' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Webhook signature verification failed: ${errorMessage}`);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentSuccess(paymentIntent);
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        await handlePaymentFailure(failedPayment);
        break;

      case 'payment_intent.canceled':
        const canceledPayment = event.data.object as Stripe.PaymentIntent;
        await handlePaymentCancellation(canceledPayment);
        break;

      case 'payment_method.attached':
        const paymentMethod = event.data.object as Stripe.PaymentMethod;
        // console.log('PaymentMethod attached:', paymentMethod.id);
        break;

      default:
        // console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  // console.log('Payment succeeded:', paymentIntent.id);
  
  // Extract order information from metadata
  const orderId = paymentIntent.metadata.orderId;
  const customerEmail = paymentIntent.metadata.customerEmail;
  const orderTotal = paymentIntent.metadata.orderTotal;
  
  try {
    // Here you would typically:
    // 1. Update order status in your database
    // 2. Send confirmation email to customer
    // 3. Trigger order fulfillment process
    // 4. Update inventory
    
    // console.log(`Order ${orderId} completed successfully for ${customerEmail}`);
    // console.log(`Payment amount: $${orderTotal}`);
    
    // Example: Send confirmation email (you would implement this)
    // await sendOrderConfirmationEmail(customerEmail, orderId, orderTotal);
    
    // Example: Update order status in database
    // await updateOrderStatus(orderId, 'completed');
    
  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  // console.log('Payment failed:', paymentIntent.id);
  
  const orderId = paymentIntent.metadata.orderId;
  const customerEmail = paymentIntent.metadata.customerEmail;
  
  try {
    // Handle failed payment
    // 1. Update order status to failed
    // 2. Send notification to customer about payment failure
    // 3. Optionally retry payment or request new payment method
    
    // console.log(`Payment failed for order ${orderId}, customer: ${customerEmail}`);
    
    // Example: Update order status
    // await updateOrderStatus(orderId, 'payment_failed');
    
  } catch (error) {
    console.error('Error handling failed payment:', error);
  }
}

async function handlePaymentCancellation(paymentIntent: Stripe.PaymentIntent) {
  // console.log('Payment canceled:', paymentIntent.id);
  
  const orderId = paymentIntent.metadata.orderId;
  
  try {
    // Handle canceled payment
    // 1. Update order status to canceled
    // 2. Release any reserved inventory
    
    // console.log(`Payment canceled for order ${orderId}`);
    
    // Example: Update order status
    // await updateOrderStatus(orderId, 'canceled');
    
  } catch (error) {
    console.error('Error handling canceled payment:', error);
  }
}
