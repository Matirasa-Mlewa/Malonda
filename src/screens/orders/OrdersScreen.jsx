import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_ORDERS } from '../../utils/mockData';

const STEPS = ['Ordered', 'Paid to Escrow', 'Dispatched', 'Delivered', 'Completed'];

export default function OrdersScreen() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('buying');

  const statusColor = (s) => s === 'Completed' ? 'pill-green' : s === 'In Escrow' ? 'pill-blue' : s === 'Delivered' ? 'pill-gold' : 'pill-gray';

  return (
    <div className="page-fade">
      <div className="header"><span className="header-title">My Orders</span></div>

      <div className="tabs">
        <div className={`tab ${tab === 'buying' ? 'active' : ''}`} onClick={() => setTab('buying')}>Buying</div>
        <div className={`tab ${tab === 'selling' ? 'active' : ''}`} onClick={() => setTab('selling')}>Selling</div>
      </div>

      <div style={{ paddingBottom: 80 }}>
        {MOCK_ORDERS.map(order => (
          <div key={order.id} style={{ margin: '10px 12px', background: 'white', border: '0.5px solid var(--gray-border)', borderRadius: 14, overflow: 'hidden' }}>
            {/* Order header */}
            <div style={{ padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'center', borderBottom: '0.5px solid var(--gray-border)' }}>
              <div style={{ width: 46, height: 46, background: 'var(--green-light)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{order.emoji}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: 13 }}>{order.product}</p>
                <p style={{ fontSize: 11, color: 'var(--text3)' }}>{order.id} · {order.date}</p>
                <p style={{ fontWeight: 700, color: 'var(--green)', fontSize: 14 }}>MK {order.price.toLocaleString()}</p>
              </div>
              <span className={`pill ${statusColor(order.status)}`}>{order.status}</span>
            </div>

            {/* Progress tracker */}
            <div style={{ padding: '12px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                {STEPS.map((step, i) => (
                  <React.Fragment key={i}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 'none' }}>
                      <div className={`step-circle ${i < order.step ? 'step-done' : 'step-pending'}`}>{i < order.step ? '✓' : i + 1}</div>
                      <span style={{ fontSize: 8, color: i < order.step ? 'var(--green)' : 'var(--text3)', textAlign: 'center', marginTop: 3, maxWidth: 38, lineHeight: 1.2 }}>{step}</span>
                    </div>
                    {i < 4 && <div className={`step-line ${i + 1 < order.step ? 'step-line-done' : 'step-line-pending'}`} style={{ marginTop: 10 }} />}
                  </React.Fragment>
                ))}
              </div>

              {/* Actions */}
              <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                {order.canConfirm && (
                  <button className="btn btn-primary btn-sm" style={{ flex: 1, fontSize: 12 }}
                    onClick={() => navigate(`/orders/${order.id}/confirm`)}>
                    ✅ Confirm Delivery
                  </button>
                )}
                <button className="btn btn-gray btn-sm" style={{ flex: 1, fontSize: 12 }}
                  onClick={() => navigate('/messages/seller1')}>
                  💬 Contact Seller
                </button>
                <button className="btn btn-outline btn-sm" style={{ fontSize: 12 }}
                  onClick={() => navigate(`/orders/${order.id}`)}>
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
