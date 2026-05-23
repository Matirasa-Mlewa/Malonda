import React from 'react';

export default function TrustBadge({ level, size = 'sm' }) {
  const badges = {
    trusted: { label: '⭐ Trusted', className: 'badge-trusted' },
    verified: { label: '✓ Verified', className: 'badge-verified' },
    basic: { label: '○ Basic', className: 'badge-basic' },
  };
  const badge = badges[level] || badges.basic;
  return <span className={badge.className}>{badge.label}</span>;
}
