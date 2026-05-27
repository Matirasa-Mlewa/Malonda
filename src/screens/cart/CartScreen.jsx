import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function CartScreen() {
  const navigate = useNavigate();
  const { items, itemCount, subtotal, platformFee, total, updateQuantity, removeItem } = useCart();

  if (itemCount === 0) return (
    <div className="page-fade">
      <div className="header"><span className="header-title">My Cart</span></div>
      <div className="empty-state" style={{ marginTop: 60 }}>
        <div className="empty-icon">🛒</div>
        <p className="empty-title">Your cart is empty</p>
        <p className="empty-desc">Browse products and add something!</p>
        <button className="btn btn-primary" style={{ marginTop: 20, width: 'auto', padding: '12px 28px' }}
          onClick={() => navigate('/')}>Browse Products</button>
      </div>
    </div>
  );

  return (
    <div className="page-fade">
      <div className="header">
        <span className="header-title">My Cart ({itemCount})</span>
      </div>

      <div style={{ paddingBottom: 140 }}>
        {items.map(item => (
          <div key={item.id} style={{ display: 'flex', gap: 12, padding: '12px 14px', background: 'white', borderBottom: '0.5px solid var(--gray-border)', alignItems: 'center' }}>
            <div style={{ width: 60, height: 60, background: 'var(--green-light)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, flexShrink: 0 }}>
              {item.emoji}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontWeight: 500, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
              <p style={{ fontSize: 11, color: 'var(--text3)' }}>{item.seller}</p>
              <p style={{ fontWeight: 700, color: 'var(--green)', fontSize: 14 }}>MK {item.price.toLocaleString()}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                style={{ background: 'var(--gray-light)', border: 'none', width: 28, height: 28, borderRadius: '50%', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
              <span style={{ fontWeight: 600, minWidth: 18, textAlign: 'center' }}>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                style={{ background: 'var(--green)', color: 'white', border: 'none', width: 28, height: 28, borderRadius: '50%', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
            </div>
            <button onClick={() => removeItem(item.id)}
              style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: 'var(--red)', flexShrink: 0, padding: 4 }}>🗑</button>
          </div>
        ))}

        {/* Summary */}
        <div style={{ padding: '14px 16px', background: 'white', margin: '8px 0 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
            <span style={{ color: 'var(--text3)' }}>Subtotal</span>
            <span style={{ fontWeight: 600 }}>MK {subtotal.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
            <span style={{ color: 'var(--text3)' }}>Platform fee (2%)</span>
            <span style={{ fontWeight: 600 }}>MK {platformFee.toLocaleString()}</span>
          </div>
          <div className="divider" style={{ margin: '10px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 700 }}>
            <span>Total</span>
            <span style={{ color: 'var(--green)' }}>MK {total.toLocaleString()}</span>
          </div>
        </div>

        <div className="escrow-banner" style={{ margin: '8px 12px' }}>
          <span style={{ fontSize: 20 }}>🔒</span>
          <p>Payment is held in escrow — released only after you confirm delivery.</p>
        </div>
      </div>

      {/* Sticky checkout button */}
      <div style={{ position: 'fixed', bottom: 64, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, padding: '10px 16px', background: 'white', borderTop: '0.5px solid var(--gray-border)', zIndex: 50 }}>
        <button className="btn btn-primary" onClick={() => navigate('/checkout')}>
          Proceed to Checkout — MK {total.toLocaleString()}
        </button>
      </div>
    </div>
  );
}
