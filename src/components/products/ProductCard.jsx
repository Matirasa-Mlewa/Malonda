import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product: p }) {
  const navigate = useNavigate();
  return (
    <div className="product-card" onClick={() => navigate('/product/' + p.id)}>
      <div className="product-img">
        {p.emoji}
        {p.sellerBadge === 'trusted' && <div className="seller-tag tag-trusted">⭐ Trusted</div>}
        {p.sellerBadge === 'verified' && <div className="seller-tag tag-verified">✓ Verified</div>}
      </div>
      <div className="product-info">
        <div className="product-name">{p.name}</div>
        <div className="product-price">MK {p.price.toLocaleString()}</div>
        <div style={{ fontSize: 11, color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 2, marginTop: 2 }}>
          📍 {p.location.split(',')[0]}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 3 }}>
          <span className="stars" style={{ fontSize: 11 }}>★</span>
          <span style={{ fontSize: 11, color: 'var(--text3)' }}>{p.rating} ({p.reviews})</span>
        </div>
      </div>
    </div>
  );
}
