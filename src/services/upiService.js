// UPI Sandbox Service
// Mock implementation for demo purposes (no server required)
// This service simulates UPI payment processing without needing a real backend server
// In production, this would connect to actual UPI gateway APIs like Razorpay, PayU, etc.

class UpiService {
  constructor() {
    this.mockDelay = 1000; // Simulate network delay
  }

  // Create a UPI order (mock implementation)
  async createOrder(amount, receipt = null) {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, this.mockDelay));

      // Generate mock order
      const order = {
        id: `order_${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
        amount: Math.round(amount * 100), // Convert to paise
        currency: 'INR',
        receipt: receipt || `rcpt_${Date.now()}`,
        status: 'created',
        created_at: Math.floor(Date.now() / 1000),
        notes: {}
      };

      console.log('📦 Mock UPI Order created:', order);
      return order;
    } catch (error) {
      console.error('❌ UPI Order creation failed:', error);
      throw error;
    }
  }

  // Initiate UPI payment (mock implementation)
  async initiatePayment(orderId, amount, vpa) {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, this.mockDelay));

      // Determine payment outcome based on test VPA
      let status = 'created';
      if (vpa === 'failure@razorpay') {
        status = 'failed';
      } else if (vpa === 'success@razorpay' || vpa.includes('@')) {
        status = 'authorized';
      }

      // Generate mock payment
      const payment = {
        id: `pay_${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
        amount: Math.round(amount * 100),
        currency: 'INR',
        order_id: orderId,
        status: status,
        method: 'upi',
        vpa: vpa,
        created_at: Math.floor(Date.now() / 1000),
        description: `Payment to ${vpa}`
      };

      console.log('💳 Mock UPI Payment initiated:', payment);
      return payment;
    } catch (error) {
      console.error('❌ UPI Payment initiation failed:', error);
      throw error;
    }
  }

  // Check payment status (mock implementation)
  async getPaymentStatus(paymentId) {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock payment status - simulate successful completion
      const payment = {
        id: paymentId,
        status: 'captured', // Simulate successful payment
        amount: 10000, // Mock amount
        currency: 'INR',
        method: 'upi',
        captured_at: Math.floor(Date.now() / 1000),
        description: 'Mock UPI payment'
      };

      console.log('📊 Mock UPI Payment status:', payment);
      return payment;
    } catch (error) {
      console.error('❌ UPI Payment status check failed:', error);
      throw error;
    }
  }

  // Poll payment status until completion
  async waitForPaymentCompletion(paymentId, maxAttempts = 30, interval = 2000) {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const payment = await this.getPaymentStatus(paymentId);
        
        if (payment.status === 'captured') {
          console.log('✅ Payment completed successfully');
          return { success: true, payment };
        } else if (payment.status === 'failed') {
          console.log('❌ Payment failed');
          return { success: false, payment };
        }

        // Payment still processing, wait and retry
        await new Promise(resolve => setTimeout(resolve, interval));
      } catch (error) {
        console.error(`Payment status check attempt ${attempt + 1} failed:`, error);
        if (attempt === maxAttempts - 1) {
          throw error;
        }
      }
    }

    throw new Error('Payment status check timed out');
  }

  // Complete UPI payment flow
  async processPayment(amount, vpa, receipt = null) {
    try {
      console.log(`🚀 Starting UPI payment: ₹${amount} to ${vpa}`);

      // Step 1: Create order
      const order = await this.createOrder(amount, receipt);

      // Step 2: Initiate payment
      const payment = await this.initiatePayment(order.id, amount, vpa);

      // Step 3: Wait for completion
      const result = await this.waitForPaymentCompletion(payment.id);

      return {
        success: result.success,
        order,
        payment: result.payment,
        amount: amount,
        vpa: vpa
      };
    } catch (error) {
      console.error('❌ UPI payment process failed:', error);
      return {
        success: false,
        error: error.message,
        amount: amount,
        vpa: vpa
      };
    }
  }

  // Get test VPAs for sandbox
  getTestVPAs() {
    return {
      success: 'success@razorpay',
      failure: 'failure@razorpay',
      slow: 'slow@razorpay',
      timeout: 'timeout@razorpay'
    };
  }

  // Validate VPA format
  isValidVPA(vpa) {
    const vpaRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;
    return vpaRegex.test(vpa);
  }

  // Format amount for display
  formatAmount(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  }
}

export default new UpiService();