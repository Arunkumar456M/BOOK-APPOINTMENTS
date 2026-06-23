import express from 'express';
import Stripe from 'stripe';
import { protect } from '../middleware/auth.js';

const router = express.Router();
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

// Create a Stripe PaymentIntent for an appointment
router.post('/stripe/create-intent', protect, async (req, res, next) => {
  try {
    if (!stripe) return res.status(503).json({ message: 'Stripe is not configured on this server' });
    const { amount, currency = 'usd' } = req.body;

    const intent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: { userId: req.user._id.toString() }
    });

    res.json({ clientSecret: intent.client_secret });
  } catch (err) {
    next(err);
  }
});

// Create a Razorpay order (requires razorpay SDK + keys in production)
router.post('/razorpay/create-order', protect, async (req, res, next) => {
  try {
    if (!process.env.RAZORPAY_KEY_ID) return res.status(503).json({ message: 'Razorpay is not configured on this server' });
    const { amount, currency = 'INR' } = req.body;

    // In production: const Razorpay = require('razorpay'); const instance = new Razorpay({ key_id, key_secret });
    // const order = await instance.orders.create({ amount: amount * 100, currency });
    res.json({
      message: 'Wire up the razorpay npm package with your keys to create real orders.',
      mockOrder: { id: 'order_mock_123', amount: amount * 100, currency }
    });
  } catch (err) {
    next(err);
  }
});

export default router;
