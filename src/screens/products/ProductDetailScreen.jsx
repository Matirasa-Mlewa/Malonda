import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { MOCK_PRODUCTS } from '../../utils/mockData';
import TrustBadge from '../../components/trust/TrustBadge';
import toast from 'react-hot-toast';

export default function ProductDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, items } = useCart();
  const product = MOCK_PRODUCTS.find(p => String(p.id) === String(id)) || MOCK_PRODUCTS[0];
  const [wishlisted, setWishlisted] = useState(false);
  const inCart = items.some(i => i.id === product.id);

  const handleAddToCart = () => {
    addItem(product);
    toast.success('Added to cart!');
  };

  return (
    <div className="screen screen-white page-fade" style={{ paddingBottom: 0 }}>
      {/* Header */}
      <div className="header">
        <button className="header-back" onClick={() => navigate(-1)}>←</button>
        <span className="header-title">Product Details</span>
        <button className="header-action" onClick={() => setWishlisted(w => !w)}>
          {wishlisted ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="scroll" style={{ flex: 1, paddingBottom: 100 }}>
        {/* Product image */}
        <div style={{
          height: 220, background: 'linear-gradient(135deg,#e8f5ee,#c8e6d4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 90
        }}>
          {product.emoji}
        </div>

        <div style={{ padding: '14px 16px' }}>
          {/* Title & price */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <div style={{ flex: 1, marginRight: 10 }}>
              <p style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.3 }}>{product.name}</p>
              <p style={{ fontSize: 23, fontWeight: 800, color: 'var(--green)', marginTop: 2 }}>
                MK {product.price.toLocaleString()}
              </p>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div className="stars">{'★'.repeat(Math.round(product.rating))}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>{product.rating} ({product.reviews} reviews)</div>
            </div>
          </div>

          {/* Badges */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
            <TrustBadge level={product.sellerBadge} />
            {product.inEscrow && <span className="badge-escrow">🔒 Escrow Protected</span>}
            <span className="pill pill-gray">📍 {product.location}</span>
          </div>

          {/* Description */}
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65, marginBottom: 16 }}>
            {product.desc}
          </p>

          <div className="divider" />

          {/* Seller row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', cursor: 'pointer' }}
            onClick={() => navigate('/seller/' + product.sellerId)}>
            <div className="avatar avatar-md">{product.seller.charAt(0)}</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, fontSize: 14 }}>{product.seller}</p>
              <p style={{ fontSize: 11, color: 'var(--text3)' }}>Tap to view seller profile</p>
            </div>
            <TrustBadge level={product.sellerBadge} />
          </div>

          <div className="divider" />

          {/* Delivery */}
          <div style={{ padding: '12px 0' }}>
            <p style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 4 }}>Delivery</p>
            <p style={{ fontSize: 13 }}>🚚 {product.delivery}</p>
          </div>

          {/* Escrow info */}
          {product.inEscrow && (
            <div className="escrow-banner" style={{ marginBottom: 14 }}>
              <span style={{ fontSize: 20 }}>🔒</span>
              <p>Pay safely — funds are held in escrow until you confirm delivery. Only released when you are happy.</p>
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-outline" style={{ flex: 1 }}
              onClick={() => navigate('/messages/' + product.sellerId)}>
              💬 Chat
            </button>
            <button className="btn btn-primary" style={{ flex: 2 }}
              onClick={handleAddToCart} disabled={inCart}>
              {inCart ? '✓ In Cart' : 'Add to Cart'}
            </button>
          </div>

          {/* Reviews preview */}
          <p style={{ fontWeight: 600, fontSize: 14, marginTop: 20, marginBottom: 10 }}>Reviews</p>
          {[
            { name: 'Grace M.', rating: 5, text: 'Excellent product, delivered fast!', date: 'May 2026' },
            { name: 'Kondwani B.', rating: 4, text: 'Good quality, seller was helpful.', date: 'Apr 2026' },
          ].map((r, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: '0.5px solid var(--gray-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontWeight: 600, fontSize: 13 }}>{r.name}</span>
                <span style={{ fontSize: 11, color: 'var(--text3)' }}>{r.date}</span>
              </div>
              <div className="stars" style={{ fontSize: 12, marginBottom: 4 }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
              <p style={{ fontSize: 12, color: 'var(--text2)' }}>{r.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky bottom CTA */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, background: 'white', borderTop: '0.5px solid var(--gray-border)', padding: '10px 16px', display: 'flex', gap: 10, zIndex: 50 }}>
        <button className="btn btn-outline" style={{ flex: 1, padding: '11px' }}
          onClick={() => navigate('/messages/' + product.sellerId)}>💬 Chat</button>
        <button className="btn btn-primary" style={{ flex: 2 }} onClick={handleAddToCart} disabled={inCart}>
          {inCart ? '✓ Added to Cart' : `Buy Now — MK ${product.price.toLocaleString()}`}
        </button>
      </div>
    </div>
  );
}
