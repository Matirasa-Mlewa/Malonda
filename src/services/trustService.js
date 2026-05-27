/**
 * Trust Score Service
 * Calculates and manages user trust scores and verification levels.
 */

export const TRUST_WEIGHTS = {
  verifiedId: 25,        // National ID verified
  selfieMatch: 15,       // Selfie matches ID
  successfulOrders: 2,   // per completed order (max 30)
  positiveRatings: 1,    // per 5-star rating (max 20)
  noDisputes: 10,        // no open disputes
  accountAge: 5,         // account older than 90 days
};

/**
 * Calculate trust score for a user.
 */
export function calculateTrustScore(user) {
  let score = 0;

  if (user.idVerified) score += TRUST_WEIGHTS.verifiedId;
  if (user.selfieVerified) score += TRUST_WEIGHTS.selfieMatch;
  score += Math.min(user.completedOrders * TRUST_WEIGHTS.successfulOrders, 30);
  score += Math.min(user.fiveStarRatings * TRUST_WEIGHTS.positiveRatings, 20);
  if (!user.hasOpenDisputes) score += TRUST_WEIGHTS.noDisputes;

  const ageDays = (Date.now() - new Date(user.createdAt)) / 86400000;
  if (ageDays > 90) score += TRUST_WEIGHTS.accountAge;

  return Math.min(score, 100);
}

/**
 * Determine verification badge level from score and flags.
 */
export function getVerificationLevel(user) {
  const score = calculateTrustScore(user);
  if (score >= 70 && user.completedOrders >= 10 && user.idVerified) return 'trusted';
  if (user.idVerified && user.selfieVerified) return 'verified';
  return 'basic';
}

/**
 * Get trust label string.
 */
export function trustLabel(score) {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Low';
}

/**
 * Determine if a seller should be highlighted (promoted in search).
 */
export function isHighlightedSeller(user) {
  return getVerificationLevel(user) === 'trusted' && user.rating >= 4.5;
}
