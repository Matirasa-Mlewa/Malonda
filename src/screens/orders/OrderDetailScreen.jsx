// OrderDetailScreen.jsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MOCK_ORDERS } from '../../utils/mockData';

export function OrderDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = MOCK_ORDERS.find(o => o.id === id) || MOCK_ORDERS[0];

  return (
    <div className="screen screen-white page-fade">
      <div className="header">
        <button className="header-back" onClick={() => navigate(-1)}>←</button>
        <span className="header-title">Order {order.id}</span>
      </div>
      <div className="scroll" style={{ padding: 16, paddingBottom: 80 }}>
        <div style={{ background: 'var(--gray-light)', borderRadius: 14, padding: 14, marginBottom: 14 }}>
          {[['Order ID', order.id], ['Product', order.product], ['Seller', order.seller], ['Date', order.date], ['Amount', `MK ${order.price.toLocaleString()}`], ['Status', order.status]].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
              <span style={{ color: 'var(--text3)' }}>{l}</span>
              <span style={{ fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
        <div className="escrow-banner" style={{ marginBottom: 14 }}>
          <span style={{ fontSize: 20 }}>🔒</span>
          <p>MK {order.price.toLocaleString()} is held in escrow and will be released when you confirm delivery.</p>
        </div>
        {order.canConfirm && (
          <button className="btn btn-primary" style={{ marginBottom: 10 }} onClick={() => navigate(`/orders/${order.id}/confirm`)}>
            ✅ Confirm Delivery & Release Payment
          </button>
        )}
        <button className="btn btn-danger" onClick={() => navigate(`/orders/${order.id}/dispute`)}>
          🚩 Report a Problem
        </button>
      </div>
    </div>
  );
}

// ConfirmDeliveryScreen.jsx
export function ConfirmDeliveryScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [rating, setRating] = React.useState(5);
  const [review, setReview] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    navigate('/payment-success');
  };

  return (
    <div className="screen screen-white page-fade">
      <div className="header">
        <button className="header-back" onClick={() => navigate(-1)}>←</button>
        <span className="header-title">Confirm Delivery</span>
      </div>
      <div className="scroll" style={{ padding: 20, paddingBottom: 80 }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 52, marginBottom: 10 }}>📦</div>
          <p style={{ fontSize: 16, fontWeight: 600 }}>Did you receive your order?</p>
          <p style={{ color: 'var(--text3)', fontSize: 13 }}>Confirming releases the escrow payment to the seller</p>
        </div>
        <div className="warn-banner" style={{ marginBottom: 16 }}>
          <span>⚠️</span>
          <p style={{ fontSize: 12, color: '#92400e' }}>Only confirm if you are satisfied with your order. This action cannot be undone.</p>
        </div>
        <div className="form-group">
          <label className="form-label">Rate this seller</label>
          <div style={{ display: 'flex', gap: 6, fontSize: 32, marginBottom: 6 }}>
            {[1,2,3,4,5].map(s => (
              <span key={s} onClick={() => setRating(s)} style={{ cursor: 'pointer', color: s <= rating ? '#f5a623' : '#d1d5db' }}>★</span>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Write a review (optional)</label>
          <textarea className="form-input" placeholder="How was your experience?" value={review} onChange={e => setReview(e.target.value)} style={{ height: 80 }} />
        </div>
        <button className="btn btn-primary" onClick={handleConfirm} disabled={loading} style={{ marginBottom: 10 }}>
          {loading ? 'Releasing payment…' : '✅ Yes, I Received It — Release Payment'}
        </button>
        <button className="btn btn-danger" onClick={() => navigate(`/orders/${id}/dispute`)}>
          🚩 Report a Problem Instead
        </button>
      </div>
    </div>
  );
}

// DisputeScreen.jsx
export function DisputeScreen() {
  const navigate = useNavigate();
  const [reason, setReason] = React.useState('Item not received');
  const [desc, setDesc] = React.useState('');

  const handleSubmit = () => {
    navigate('/orders');
  };

  return (
    <div className="screen screen-white page-fade">
      <div className="header">
        <button className="header-back" onClick={() => navigate(-1)}>←</button>
        <span className="header-title">Open Dispute</span>
      </div>
      <div className="scroll" style={{ padding: 20 }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 44, marginBottom: 10 }}>⚖️</div>
          <p style={{ fontSize: 15, fontWeight: 600 }}>Report a Delivery Issue</p>
          <p style={{ color: 'var(--text3)', fontSize: 13 }}>Our team will review and mediate within 48 hours. Payment stays in escrow during review.</p>
        </div>
        <div className="form-group">
          <label className="form-label">Issue Type</label>
          <select className="form-input" value={reason} onChange={e => setReason(e.target.value)}>
            {['Item not received','Item damaged','Item not as described','Wrong item sent','Seller unresponsive'].map(r => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea className="form-input" style={{ height: 90 }} placeholder="Describe the problem in detail…" value={desc} onChange={e => setDesc(e.target.value)} />
        </div>
        <div className="upload-zone" style={{ height: 80, marginBottom: 14 }}>
          <span style={{ fontSize: 24 }}>📎</span>
          <p>Attach evidence (optional)</p>
        </div>
        <div className="warn-banner" style={{ marginBottom: 14 }}>
          <span>🔒</span>
          <p style={{ fontSize: 12, color: '#92400e' }}>Payment remains in escrow until this dispute is resolved. You are protected.</p>
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>Submit Dispute</button>
      </div>
    </div>
  );
}

export default OrderDetailScreen;
