// UPI Sandbox Service
// Integrates with the mock UPI sandbox server

const UPI_SANDBOX_BASE_URL = 'http://localhost:3001/v1';

class UpiService {
  constructor() {
    this.baseUrl = UPI_SANDBOX_BASE_URL;
  }

  // Create a UPI order
  async createOrder(amount, receipt = null) {
    try {
      const response = await fetch(`${this.baseUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to paise
          currency: 'INR',
          receipt: receipt || `rcpt_${Date.now()}`,
          payment_capture: 1
        })
      });

      if (!response.ok) {
        throw new Error(`Order creation failed: ${response.statusText}`);
      }

      const order = await response.json();
      console.log('📦 UPI Order created:', order);
      return order;
    } catch (error) {
      console.error('❌ UPI Order creation failed:', error);
      throw error;
    }
  }

  // Initiate UPI payment
  async initiatePayment(orderId, amount, vpa) {
    try {
      const response = await fetch(`${this.baseUrl}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to paise
          currency: 'INR',
          order_id: orderId,
          vpa: vpa,
          method: 'upi'
        })
      });

      if (!response.ok) {
        throw new Error(`Payment initiation failed: ${response.statusText}`);
      }

      const payment = await response.json();
      console.log('💳 UPI Payment initiated:', payment);
      return payment;
    } catch (error) {
      console.error('❌ UPI Payment initiation failed:', error);
      throw error;
    }
  }

  // Check payment status
  async getPaymentStatus(paymentId) {
    try {
      const response = await fetch(`${this.baseUrl}/payments/${paymentId}`);

      if (!response.ok) {
        throw new Error(`Payment status check failed: ${response.statusText}`);
      }

      const payment = await response.json();
      console.log('📊 UPI Payment status:', payment);
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