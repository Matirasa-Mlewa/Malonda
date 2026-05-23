import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PaymentSuccessScreen() {
  const navigate = useNavigate();
  const orderId = '#ORD-' + Math.floor(2800 + Math.random() * 200);

  return (
    <div className="screen screen-white page-fade" style={{ alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ width: 90, height: 90, background: 'var(--green-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, marginBottom: 20 }}>✅</div>
      <p style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Payment Successful!</p>
      <p style={{ color: 'var(--text3)', fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
        Your payment is now held in escrow and will be released to the seller only when you confirm delivery.
      </p>

      <span className="badge-escrow" style={{ fontSize: 14, padding: '8px 18px', marginBottom: 28 }}>🔒 Funds in Escrow</span>

      <div style={{ background: 'var(--gray-light)', borderRadius: 14, padding: 16, width: '100%', textAlign: 'left', marginBottom: 24 }}>
        {[['Order ID', orderId], ['Payment', '📱 Airtel Money'], ['Status', '🔒 In Escrow'], ['Estimated Delivery', '1 – 3 days']].map(([l, v]) => (
          <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
            <span style={{ color: 'var(--text3)' }}>{l}</span>
            <span style={{ fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>

      <button className="btn btn-primary" style={{ marginBottom: 10 }} onClick={() => navigate('/orders')}>📦 Track My Order</button>
      <button className="btn btn-gray" onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
}
