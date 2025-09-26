const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const Product = require('../models/Product');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @desc    Create payment intent
// @route   POST /api/stripe/create-payment-intent
// @access  Public
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd', orderDetails } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount'
      });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Stripe expects amount in cents
      currency,
      metadata: {
        orderDetails: JSON.stringify(orderDetails)
      }
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Stripe payment intent error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment intent',
      error: error.message
    });
  }
});

// @desc    Handle Stripe webhooks
// @route   POST /api/stripe/webhook
// @access  Public (Stripe webhook)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        await handleSuccessfulPayment(paymentIntent);
        break;
        
      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        await handleFailedPayment(failedPayment);
        break;
        
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
});

// Handle successful payment
async function handleSuccessfulPayment(paymentIntent) {
  try {
    const orderDetails = JSON.parse(paymentIntent.metadata.orderDetails);
    
    // Create order in database
    const order = await Order.create({
      customer: orderDetails.customer.userId || null, // If user is logged in
      items: orderDetails.items,
      pricing: {
        subtotal: orderDetails.subtotal,
        shipping: orderDetails.shipping,
        tax: orderDetails.tax,
        total: orderDetails.total
      },
      shippingAddress: orderDetails.customer,
      payment: {
        method: 'stripe',
        status: 'completed',
        transactionId: paymentIntent.id,
        stripePaymentIntentId: paymentIntent.id,
        paidAt: new Date()
      },
      status: 'confirmed'
    });

    // Update product inventory
    for (const item of orderDetails.items) {
      await Product.findByIdAndUpdate(
        item.id,
        { $inc: { 'inventory.stock': -item.quantity } }
      );
    }

    console.log('Order created successfully:', order.orderNumber);
  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
}

// Handle failed payment
async function handleFailedPayment(paymentIntent) {
  try {
    console.log('Payment failed for:', paymentIntent.id);
    // You can add logic here to handle failed payments
    // e.g., send notification emails, update records, etc.
  } catch (error) {
    console.error('Error handling failed payment:', error);
  }
}

// @desc    Get payment status
// @route   GET /api/stripe/payment-status/:paymentIntentId
// @access  Public
router.get('/payment-status/:paymentIntentId', async (req, res) => {
  try {
    const { paymentIntentId } = req.params;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    res.json({
      success: true,
      data: {
        status: paymentIntent.status,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency
      }
    });
  } catch (error) {
    console.error('Get payment status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get payment status'
    });
  }
});

module.exports = router;
