import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Booking from '../models/Booking.js';

const router = express.Router();
const razorpay = new Razorpay({
  key_id: 'your_key_id',
  key_secret: 'your_key_secret'
});

// Create Order
router.post('/orders', async (req, res) => {
  const { amount, currency, receipt } = req.body;
  const options = { amount, currency, receipt };
  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Verify Payment
router.post('/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;
  const hmac = crypto.createHmac('sha256', 'your_key_secret');
  hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const generatedSignature = hmac.digest('hex');
  if (generatedSignature === razorpay_signature) {
    try {
      const booking = await Booking.findByIdAndUpdate(
        bookingId,
        { paymentId: razorpay_payment_id },
        { new: true }
      );
      res.json({ message: 'Payment verified', booking });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error verifying payment' });
    }
  } else {
    res.status(400).json({ message: 'Invalid signature' });
  }
});

export default router;
