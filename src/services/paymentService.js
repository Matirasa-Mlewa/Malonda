import { paymentsAPI } from '../api';

/**
 * Mobile Money Payment Service
 * Handles Airtel Money, TNM Mpamba, and Escrow flows.
 */
export const paymentService = {
  /**
   * Initiate a mobile money payment.
   * @param {'airtel' | 'tnm' | 'cod'} method
   * @param {string} orderId
   * @param {string} phone  - customer's mobile money number
   * @param {number} amount - in MWK
   */
  async initiatePayment(method, orderId, phone, amount) {
    if (method === 'cod') {
      return { success: true, method: 'cod', message: 'Cash on delivery confirmed' };
    }

    try {
      const res = await paymentsAPI.initiate(orderId, method, phone);
      return { success: true, transactionId: res.transactionId, message: res.message };
    } catch (err) {
      return { success: false, error: err.message || 'Payment initiation failed' };
    }
  },

  /**
   * Poll for payment confirmation.
   * @param {string} transactionId
   * @param {number} maxAttempts
   */
  async pollPaymentStatus(transactionId, maxAttempts = 10) {
    for (let i = 0; i < maxAttempts; i++) {
      await new Promise(r => setTimeout(r, 3000)); // wait 3s between polls
      try {
        const res = await paymentsAPI.verify(transactionId);
        if (res.status === 'success') return { success: true, data: res };
        if (res.status === 'failed') return { success: false, error: 'Payment failed or was cancelled' };
      } catch {}
    }
    return { success: false, error: 'Payment confirmation timed out' };
  },

  /**
   * Release escrow after buyer confirms delivery.
   */
  async releaseEscrow(orderId) {
    try {
      const res = await paymentsAPI.releaseEscrow(orderId);
      return { success: true, data: res };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  /**
   * Request a refund (dispute resolution).
   */
  async requestRefund(orderId) {
    try {
      const res = await paymentsAPI.refund(orderId);
      return { success: true, data: res };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  /**
   * Calculate total with platform fee.
   */
  calculateTotal(subtotal, discountAmount = 0) {
    const fee = Math.round(subtotal * 0.02);
    const total = subtotal + fee - discountAmount;
    return { subtotal, fee, discountAmount, total };
  },
};

export default paymentService;
