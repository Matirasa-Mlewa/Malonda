import { notificationsAPI } from '../api';

/**
 * Push notification types used across Malonda.
 */
export const NOTIF_TYPES = {
  ORDER_PLACED: 'order_placed',
  PAYMENT_ESCROWED: 'payment_escrowed',
  ORDER_DISPATCHED: 'order_dispatched',
  ORDER_DELIVERED: 'order_delivered',
  ESCROW_RELEASED: 'escrow_released',
  REFUND_ISSUED: 'refund_issued',
  NEW_MESSAGE: 'new_message',
  NEW_REVIEW: 'new_review',
  VERIFICATION_APPROVED: 'verification_approved',
  VERIFICATION_REJECTED: 'verification_rejected',
  PROMO: 'promo',
};

export const notificationService = {
  /**
   * Register device push token with the server.
   */
  async registerPushToken(token) {
    try {
      await notificationsAPI.updatePreferences({ pushToken: token });
    } catch {}
  },

  /**
   * Request browser notification permission.
   */
  async requestPermission() {
    if (!('Notification' in window)) return false;
    const result = await Notification.requestPermission();
    return result === 'granted';
  },

  /**
   * Show a local browser notification (fallback when app is open).
   */
  showLocal(title, body, icon = '🛒') {
    if (Notification.permission !== 'granted') return;
    new Notification(title, { body, icon: '/logo192.png' });
  },

  /**
   * Format notification message by type.
   */
  formatMessage(type, data = {}) {
    const messages = {
      [NOTIF_TYPES.ORDER_PLACED]: `Your order #${data.orderId} has been placed.`,
      [NOTIF_TYPES.PAYMENT_ESCROWED]: `MK ${(data.amount || 0).toLocaleString()} is held in escrow for order #${data.orderId}.`,
      [NOTIF_TYPES.ORDER_DISPATCHED]: `Order #${data.orderId} has been dispatched!`,
      [NOTIF_TYPES.ORDER_DELIVERED]: `Order #${data.orderId} has been delivered. Confirm to release payment.`,
      [NOTIF_TYPES.ESCROW_RELEASED]: `Payment of MK ${(data.amount || 0).toLocaleString()} has been released to your account.`,
      [NOTIF_TYPES.NEW_MESSAGE]: `New message from ${data.senderName || 'a buyer'}.`,
      [NOTIF_TYPES.NEW_REVIEW]: `${data.reviewerName || 'Someone'} left you a ${data.rating || 5}-star review.`,
      [NOTIF_TYPES.VERIFICATION_APPROVED]: 'Your ID verification has been approved. You are now Verified! ✓',
      [NOTIF_TYPES.PROMO]: data.message || 'You have a new promotion!',
    };
    return messages[type] || 'You have a new notification.';
  },
};

export default notificationService;
