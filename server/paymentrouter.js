require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const Service = require('./servicemodel'); // your service model
const crypto = require('crypto');
const payedcourses=require('./paymentcourses')
const paymentrouter = express.Router(); // use this consistently

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order
paymentrouter.post('/create-order', async (req, res) => {
  try {
    const { courseId } = req.body;
    // Fetch course from DB
    const course = await Service.findById(courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    // Create Razorpay order
    const options = {
      amount: course.price * 100, // amount in paise
      currency: 'INR',
      receipt: `receipt_order_${courseId}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Verify payment
paymentrouter.post('/payment-success', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature ,userId, courseId} = req.body;
    console.log(courseId)
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      // Payment verified

     await payedcourses.create({ userId, courseId });

    } else {
      res.status(400).json({ error: 'Invalid signature' });
    }
    return res.json({mssg:'payment done successfully'})
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = paymentrouter;
