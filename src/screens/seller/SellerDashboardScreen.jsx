import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS, MOCK_ORDERS } from '../../utils/mockData';

export default function SellerDashboardScreen() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('products');

  const BAR_DATA = [40, 65, 30, 80, 55, 90, 72];
  const BAR_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="screen screen-white page-fade">
      <div className="header">
        <button className="header-back" onClick={() => navigate(-1)}>←</button>
        <span className="header-title">Seller Dashboard</span>
        <button className="header-action" onClick={() => navigate('/product/add')}>➕</button>
      </div>

      <div className="tabs">
        {['products', 'sales', 'analytics'].map(t => (
          <div key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </div>
        ))}
      </div>

      <div className="scroll" style={{ paddingBottom: 80 }}>
        {tab === 'products' && (
          <div style={{ padding: 12 }}>
            <button className="btn btn-primary" style={{ marginBottom: 14 }} onClick={() => navigate('/product/add')}>➕ Add New Listing</button>
            {MOCK_PRODUCTS.slice(0, 4).map(p => (
              <div key={p.id} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 12px', background: 'white', border: '0.5px solid var(--gray-border)', borderRadius: 12, marginBottom: 8 }}>
                <div style={{ width: 46, height: 46, background: 'var(--green-light)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{p.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</p>
                  <p style={{ fontWeight: 700, color: 'var(--green)', fontSize: 13 }}>MK {p.price.toLocaleString()}</p>
                  <div className="stars" style={{ fontSize: 11 }}>★ {p.rating} · {p.reviews} reviews</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => navigate('/product/edit/' + p.id)}>Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'sales' && (
          <div style={{ padding: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
              {[['Total Sales', 'MK 312,500', '↑12%'], ['Orders', '28', '↑4 this week'], ['Avg Rating', '4.8 ★', 'Excellent'], ['Escrow Held', 'MK 75,000', '2 pending']].map(([l, v, s]) => (
                <div key={l} className="stat-card">
                  <p className="stat-label">{l}</p>
                  <p className="stat-value">{v}</p>
                  <p style={{ fontSize: 11, color: 'var(--green)', marginTop: 2 }}>{s}</p>
                </div>
              ))}
            </div>
            <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Recent Orders</p>
            {MOCK_ORDERS.map(o => (
              <div key={o.id} style={{ display: 'flex', gap: 10, padding: '10px 12px', border: '0.5px solid var(--gray-border)', borderRadius: 10, marginBottom: 8, alignItems: 'center', background: 'white' }}>
                <span style={{ fontSize: 22 }}>{o.emoji}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 500 }}>{o.product}</p>
                  <p style={{ fontSize: 11, color: 'var(--text3)' }}>{o.date} · MK {o.price.toLocaleString()}</p>
                </div>
                <span className={`pill ${o.status === 'Completed' ? 'pill-green' : o.status === 'In Escrow' ? 'pill-blue' : 'pill-gold'}`} style={{ fontSize: 10 }}>{o.status}</span>
              </div>
            ))}
          </div>
        )}

        {tab === 'analytics' && (
          <div style={{ padding: 12 }}>
            <div style={{ background: 'white', border: '0.5px solid var(--gray-border)', borderRadius: 14, padding: 14, marginBottom: 12 }}>
              <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 14 }}>Revenue This Week</p>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 100 }}>
                {BAR_DATA.map((h, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                    <div style={{ width: '100%', background: i === 5 ? 'var(--green)' : 'var(--green-light)', borderRadius: '4px 4px 0 0', height: h + '%' }} />
                    <span style={{ fontSize: 9, color: 'var(--text3)', marginTop: 4 }}>{BAR_DAYS[i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[['Views', '1,284', 'Past 30 days'], ['Conversion', '6.4%', 'Avg 4.2%'], ['Avg Rating', '4.8', 'Excellent'], ['Repeat Buyers', '34%', '↑8% this month']].map(([l, v, s]) => (
                <div key={l} className="stat-card">
                  <p className="stat-label">{l}</p>
                  <p className="stat-value" style={{ fontSize: 18 }}>{v}</p>
                  <p style={{ fontSize: 11, color: 'var(--green)', marginTop: 2 }}>{s}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
