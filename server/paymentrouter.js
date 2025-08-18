require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const Razorpay = require('razorpay');
const mongoose = require('mongoose');
const Service = require('./servicemodel');
const crypto = require('crypto');
const payedcourses = require('./paymentcourses');

const paymentrouter = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order
paymentrouter.post('/create-order', async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Service.findById(courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const options = {
      amount: course.price * 100,
      currency: 'INR',
      receipt: `receipt_order_${courseId}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Verify payment
paymentrouter.post('/payment-success', async (req, res) => {
  try {
    // 1️⃣ Get user from JWT
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.id) return res.status(401).json({ error: 'Invalid token' });

    const userId = mongoose.Types.ObjectId(decoded.id); // ✅ convert to ObjectId

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courseId)
      return res.status(400).json({ error: 'Missing payment details' });

    // 2️⃣ Verify Razorpay signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature)
      return res.status(400).json({ error: 'Invalid signature' });

    // 3️⃣ Save payment to DB
    console.log("Saving payment:", { userId, courseId });
    const payment = await payedcourses.create({
      // userId,
      // courseId: courseId.toString(), // ensure string if schema expects string
      courseId:"0"
    });
    console.log("Payment saved:", payment);

    res.json({ msg: 'Payment done successfully', payment });
  } catch (err) {
    console.error("Payment verification error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = paymentrouter;
