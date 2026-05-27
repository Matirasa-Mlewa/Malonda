import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

const PAYMENT_METHODS = [
  { id: 'airtel', icon: '📱', label: 'Airtel Money', desc: 'Pay via Airtel Money STK push' },
  { id: 'tnm', icon: '📱', label: 'TNM Mpamba', desc: 'Pay via TNM Mpamba prompt' },
  { id: 'cod', icon: '💵', label: 'Cash on Delivery', desc: 'Pay when you receive your order' },
];

export default function CheckoutScreen() {
  const navigate = useNavigate();
  const { items, subtotal, platformFee, total, discountCode, discountAmount, applyDiscount, clearCart } = useCart();
  const [method, setMethod] = useState('airtel');
  const [promoCode, setPromoCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleApplyPromo = async () => {
    if (!promoCode) return;
    if (promoCode.toUpperCase() === 'MALONDA10') {
      applyDiscount('MALONDA10', Math.round(subtotal * 0.1));
    } else {
      toast.error('Invalid promo code');
    }
  };

  const handlePay = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    clearCart();
    setLoading(false);
    navigate('/payment-success');
  };

  return (
    <div className="screen screen-white page-fade">
      <div className="header">
        <button className="header-back" onClick={() => navigate(-1)}>←</button>
        <span className="header-title">Checkout</span>
      </div>

      <div className="scroll" style={{ flex: 1, padding: '14px 16px', paddingBottom: 100 }}>
        {/* Escrow notice */}
        <div className="escrow-banner" style={{ marginBottom: 16 }}>
          <span style={{ fontSize: 22 }}>🛡️</span>
          <p>Your payment goes into escrow and is only released to the seller after you confirm delivery.</p>
        </div>

        {/* Order summary */}
        <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Order Summary</p>
        {items.map(item => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
            <span style={{ color: 'var(--text2)' }}>{item.name} × {item.quantity}</span>
            <span style={{ fontWeight: 500 }}>MK {(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        <div className="divider" style={{ margin: '10px 0' }} />

        {/* Promo code */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <input className="form-input" placeholder="Promo code (e.g. MALONDA10)"
            value={promoCode} onChange={e => setPromoCode(e.target.value)} style={{ flex: 1 }} />
          <button className="btn btn-secondary btn-sm" style={{ whiteSpace: 'nowrap' }} onClick={handleApplyPromo}>Apply</button>
        </div>

        {/* Totals */}
        <div style={{ background: 'var(--gray-light)', borderRadius: 12, padding: 14, marginBottom: 16 }}>
          {[
            ['Subtotal', `MK ${subtotal.toLocaleString()}`],
            ['Platform fee (2%)', `MK ${platformFee.toLocaleString()}`],
            ...(discountAmount > 0 ? [[`Discount (${discountCode})`, `- MK ${discountAmount.toLocaleString()}`]] : []),
          ].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
              <span style={{ color: 'var(--text3)' }}>{l}</span>
              <span style={{ color: l.startsWith('Discount') ? 'var(--green)' : 'inherit' }}>{v}</span>
            </div>
          ))}
          <div className="divider" style={{ margin: '8px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 15 }}>
            <span>Total</span>
            <span style={{ color: 'var(--green)' }}>MK {(total - discountAmount).toLocaleString()}</span>
          </div>
        </div>

        {/* Payment methods */}
        <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Payment Method</p>
        {PAYMENT_METHODS.map(m => (
          <div key={m.id} onClick={() => setMethod(m.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', border: `2px solid ${method === m.id ? 'var(--green)' : 'var(--gray-border)'}`, borderRadius: 12, marginBottom: 10, cursor: 'pointer', background: method === m.id ? 'var(--green-light)' : 'white' }}>
            <span style={{ fontSize: 22 }}>{m.icon}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 600 }}>{m.label}</p>
              <p style={{ fontSize: 11, color: 'var(--text3)' }}>{m.desc}</p>
            </div>
            <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${method === m.id ? 'var(--green)' : 'var(--gray-border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {method === m.id && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--green)' }} />}
            </div>
          </div>
        ))}

        <button className="btn btn-primary" onClick={handlePay} disabled={loading} style={{ marginTop: 8 }}>
          {loading ? '⏳ Processing payment…' : `Pay MK ${(total - discountAmount).toLocaleString()} via ${PAYMENT_METHODS.find(m2 => m2.id === method)?.label}`}
        </button>
      </div>
    </div>
  );
}
