# UPI Sandbox Integration

Finky now includes a real UPI sandbox API that simulates actual UPI payment flows, similar to how Plaid works for banking.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install concurrently
```

### 2. Start Both Server and App
```bash
npm run dev
```

This will start:
- UPI Sandbox Server on `http://localhost:3001`
- Expo development server

### 3. Alternative: Start Separately
```bash
# Terminal 1: Start UPI sandbox server
npm run upi-server

# Terminal 2: Start Expo app
npm start
```

## 🧪 Testing UPI Payments

### Test UPI IDs
Use these special UPI IDs in the app to test different scenarios:

- `success@razorpay` - ✅ Always succeeds (1 second delay)
- `failure@razorpay` - ❌ Always fails (1 second delay)  
- `slow@razorpay` - ✅ Succeeds after 5 seconds
- `timeout@razorpay` - ❌ Times out after 10 seconds

### Payment Flow
1. **Open Finky app** and tap the central "PAY" button
2. **Enter recipient**: Use one of the test UPI IDs above
3. **Enter amount**: Any amount (e.g., 100)
4. **Add note**: Optional
5. **Proceed**: AI Guardian will appear with spending advice
6. **Choose action**: 
   - "Save" - Earn 50 XP for choosing to save
   - "Pay Now" - Continue with UPI payment
7. **Enter PIN**: Any 4-digit PIN (e.g., 1234)
8. **Watch processing**: Real UPI API simulation with status updates
9. **Success/Failure**: See real payment results

## 🔧 API Endpoints

The sandbox server provides these endpoints:

### Create Order
```http
POST /v1/orders
Content-Type: application/json

{
  "amount": 1000,
  "currency": "INR",
  "receipt": "rcpt_12345"
}
```

### Initiate Payment
```http
POST /v1/payments
Content-Type: application/json

{
  "amount": 1000,
  "currency": "INR",
  "order_id": "order_xyz",
  "vpa": "success@razorpay",
  "method": "upi"
}
```

### Check Payment Status
```http
GET /v1/payments/{payment_id}
```

### Health Check
```http
GET /health
```

## 📱 App Integration

The UPI service is integrated into:

- **UpiPaymentScreen**: Creates orders and validates UPI IDs
- **UpiPinScreen**: Processes payments with real API calls
- **PaymentSuccessScreen**: Shows actual transaction IDs and status
- **Store**: Saves real payment data to expense tracking

## 🎯 Features

### Real UPI Simulation
- ✅ Order creation with unique IDs
- ✅ Payment processing with status tracking
- ✅ Success/failure scenarios
- ✅ Realistic delays and timeouts
- ✅ Proper error handling

### AI Integration
- ✅ Spending analysis before payments
- ✅ Contextual advice based on amount
- ✅ Sandbox testing hints
- ✅ XP rewards for saving

### Transaction Tracking
- ✅ Real transaction IDs from sandbox
- ✅ Order ID tracking
- ✅ Payment method recording
- ✅ Status monitoring
- ✅ Expense categorization

## 🔍 Debugging

### Server Logs
The UPI sandbox server logs all activities:
```
🚀 UPI Sandbox Server running on http://localhost:3001
📦 Order created: order_xyz for ₹10
💳 Payment initiated: pay_abc to success@razorpay for ₹10
✅ Payment successful: pay_abc
```

### App Logs
Check React Native logs for UPI service activities:
```
📦 UPI Order created: {order details}
💳 UPI Payment initiated: {payment details}
🔐 Processing UPI payment with PIN...
✅ Payment completed successfully
```

## 🛠 Customization

### Add New Test Scenarios
Edit `upi-sandbox-server.js` and add to `MOCK_VPAS`:
```javascript
const MOCK_VPAS = {
  'custom@test': { success: true, delay: 2000 },
  'network-error@test': { success: false, delay: 1000, error: 'network_error' }
};
```

### Modify Payment Logic
Update `src/services/upiService.js` to change:
- API endpoints
- Timeout values
- Error handling
- Response formatting

## 📊 Monitoring

Visit `http://localhost:3001/health` to see:
- Server status
- Number of orders created
- Number of payments processed
- Current timestamp

This provides a complete UPI payment simulation that feels like real banking integration while being safe for development and testing! 🎉