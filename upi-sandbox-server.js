// UPI Sandbox Mock Server
// Run with: node upi-sandbox-server.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for mock data
const orders = new Map();
const payments = new Map();

// Helper function to generate IDs
const generateId = (prefix) => `${prefix}_${Math.random().toString(36).substr(2, 15)}`;

// Mock UPI VPAs for testing
const MOCK_VPAS = {
  'success@razorpay': { success: true, delay: 1000 },
  'failure@razorpay': { success: false, delay: 1000 },
  'slow@razorpay': { success: true, delay: 5000 },
  'timeout@razorpay': { success: false, delay: 10000, error: 'timeout' }
};

// Routes

// Create Order
app.post('/v1/orders', (req, res) => {
  const { amount, currency = 'INR', receipt, payment_capture = 1 } = req.body;
  
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  const orderId = generateId('order');
  const order = {
    id: orderId,
    amount,
    currency,
    receipt,
    payment_capture,
    status: 'created',
    created_at: new Date().toISOString()
  };

  orders.set(orderId, order);
  
  console.log(`📦 Order created: ${orderId} for ₹${amount/100}`);
  res.json(order);
});

// Create Payment
app.post('/v1/payments', async (req, res) => {
  const { amount, currency = 'INR', order_id, vpa, method = 'upi' } = req.body;
  
  if (!amount || !order_id || !vpa) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const order = orders.get(order_id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const paymentId = generateId('pay');
  const mockVpa = MOCK_VPAS[vpa] || { success: Math.random() > 0.3, delay: 1000 };
  
  const payment = {
    id: paymentId,
    entity: 'payment',
    amount,
    currency,
    order_id,
    vpa,
    method,
    status: 'created',
    created_at: new Date().toISOString()
  };

  payments.set(paymentId, payment);
  
  console.log(`💳 Payment initiated: ${paymentId} to ${vpa} for ₹${amount/100}`);

  // Simulate payment processing
  setTimeout(() => {
    const updatedPayment = payments.get(paymentId);
    if (updatedPayment) {
      if (mockVpa.success) {
        updatedPayment.status = 'captured';
        updatedPayment.captured_at = new Date().toISOString();
        console.log(`✅ Payment successful: ${paymentId}`);
      } else {
        updatedPayment.status = 'failed';
        updatedPayment.error_code = mockVpa.error || 'payment_failed';
        updatedPayment.error_description = 'Payment declined by bank';
        console.log(`❌ Payment failed: ${paymentId}`);
      }
      payments.set(paymentId, updatedPayment);
    }
  }, mockVpa.delay);

  res.json(payment);
});

// Get Payment Status
app.get('/v1/payments/:payment_id', (req, res) => {
  const { payment_id } = req.params;
  const payment = payments.get(payment_id);
  
  if (!payment) {
    return res.status(404).json({ error: 'Payment not found' });
  }

  console.log(`📊 Payment status check: ${payment_id} - ${payment.status}`);
  res.json(payment);
});

// Mock Webhook (for testing)
app.post('/v1/webhook/payment', (req, res) => {
  const { event, payload } = req.body;
  
  console.log(`🔔 Webhook received: ${event}`, payload);
  
  res.json({ received: true, timestamp: new Date().toISOString() });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    orders: orders.size, 
    payments: payments.size,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 UPI Sandbox Server running on http://localhost:${PORT}`);
  console.log(`📖 API Documentation: http://localhost:${PORT}/health`);
  console.log(`\n🧪 Test VPAs:`);
  console.log(`   success@razorpay - Always succeeds`);
  console.log(`   failure@razorpay - Always fails`);
  console.log(`   slow@razorpay - Succeeds after 5s`);
  console.log(`   timeout@razorpay - Times out after 10s`);
});

module.exports = app;