// lib/proxy/PaymentProxy.js
import fetch from 'node-fetch';

class PaymentProxy {
  constructor(paymentServerUrl) {
    this.paymentServerUrl = paymentServerUrl; // e.g. 'http://localhost:4000'
  }

  async charge(amount, bookingId) {
    // This method acts as a proxy to the real payment server
    try {
      const res = await fetch(`${this.paymentServerUrl}/charge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, bookingId })
      });
      const data = await res.json();
      return data; // { success: true/false, message or error }
    } catch (error) {
      console.error('Payment proxy error:', error);
      return { success: false, error: 'Payment service unavailable' };
    }
  }
}

export default PaymentProxy;
