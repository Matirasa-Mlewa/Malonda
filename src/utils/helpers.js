/**
 * Format a number as Malawian Kwacha.
 * e.g. formatMWK(75000) → "MK 75,000"
 */
export const formatMWK = (amount) => `MK ${Number(amount).toLocaleString()}`;

/**
 * Truncate text to a given length.
 */
export const truncate = (str, len = 60) =>
  str && str.length > len ? str.slice(0, len) + '…' : str;

/**
 * Get initials from a full name.
 * e.g. "Chisomo Banda" → "CB"
 */
export const initials = (name = '') =>
  name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

/**
 * Compute a trust score label.
 */
export const trustLabel = (score) =>
  score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Low';

/**
 * Calculate platform fee (2%).
 */
export const platformFee = (amount) => Math.round(amount * 0.02);

/**
 * Format relative time.
 */
export const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return Math.floor(hrs / 24) + 'd ago';
};
