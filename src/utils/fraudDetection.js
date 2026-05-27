// Fraud keyword detection for in-app chat
const FRAUD_KEYWORDS = [
  'send money outside', 'pay me directly', 'western union', 'world remit',
  'bank transfer', 'my bank account', 'send airtime', 'whatsapp me',
  'telegram', 'i will send first', 'trust me', 'deal outside',
  'pay now then i ship', 'click this link', 'paypal', 'share your password',
  'otp code', 'pin number', 'send me your pin', 'verification code',
];

const PHONE_REGEX = /(\+?265|0)\s?[89][0-9]\s?[0-9]{3}\s?[0-9]{4}/;
const LINK_REGEX = /https?:\/\/[^\s]+/i;

/**
 * Analyse a chat message for fraud indicators.
 * @param {string} message
 * @returns {{ isSuspicious: boolean, reason: string | null, severity: 'low'|'medium'|'high' }}
 */
export function detectFraud(message) {
  const lower = message.toLowerCase();

  // Check phone number sharing
  if (PHONE_REGEX.test(message)) {
    return { isSuspicious: true, reason: 'Sharing phone numbers in chat is not allowed. Use Malonda messaging only.', severity: 'medium' };
  }

  // Check external links
  if (LINK_REGEX.test(message)) {
    return { isSuspicious: true, reason: 'External links are not permitted. Be cautious of phishing attempts.', severity: 'high' };
  }

  // Check fraud keywords
  const matched = FRAUD_KEYWORDS.find(kw => lower.includes(kw));
  if (matched) {
    return { isSuspicious: true, reason: `Suspicious message detected. Always use Malonda's escrow payment system — never pay outside the platform.`, severity: 'high' };
  }

  return { isSuspicious: false, reason: null, severity: 'low' };
}

/**
 * Sanitise message before sending (strip phone numbers).
 */
export function sanitiseMessage(message) {
  return message.replace(PHONE_REGEX, '[phone number hidden]');
}
