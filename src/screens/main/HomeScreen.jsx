import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { MOCK_PRODUCTS, CATEGORIES } from '../../utils/mockData';
import ProductCard from '../../components/products/ProductCard';

export default function HomeScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { unreadCount } = useNotifications();
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? MOCK_PRODUCTS
    : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="page-fade">
      {/* Green header */}
      <div style={{ background: 'var(--green)', padding: '12px 16px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <div className="logo" style={{ fontSize: 22 }}>Ma<span>lo</span>nda</div>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11 }}>
              📍 {user?.location || 'Lilongwe, Malawi'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="header-action" onClick={() => navigate('/notifications')} style={{ position: 'relative' }}>
              🔔
              {unreadCount > 0 && (
                <span style={{ position: 'absolute', top: -2, right: -2, background: '#c0392b', color: 'white', borderRadius: '50%', width: 14, height: 14, fontSize: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  {unreadCount}
                </span>
              )}
            </button>
            <button className="header-action" onClick={() => navigate('/messages')}>💬</button>
          </div>
        </div>

        {/* Search bar */}
        <div style={{ position: 'relative' }} onClick={() => navigate('/search')}>
          <input className="form-input" placeholder="Search products, sellers…"
            style={{ paddingLeft: 38, background: 'white', cursor: 'pointer' }} readOnly />
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>🔍</span>
        </div>
      </div>

      {/* Category pills */}
      <div style={{ padding: '10px 12px 4px', display: 'flex', gap: 8, overflowX: 'auto', background: 'white', scrollbarWidth: 'none' }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{
            background: activeCategory === cat ? 'var(--green)' : 'white',
            color: activeCategory === cat ? 'white' : 'var(--text3)',
            border: `1px solid ${activeCategory === cat ? 'var(--green)' : 'var(--gray-border)'}`,
            borderRadius: 20, padding: '5px 14px', fontSize: 12, fontWeight: 500,
            whiteSpace: 'nowrap', cursor: 'pointer', flexShrink: 0
          }}>{cat}</button>
        ))}
      </div>

      {/* Products */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px 2px' }}>
        <p style={{ fontSize: 13, fontWeight: 600 }}>
          {activeCategory === 'All' ? 'Nearby Products' : activeCategory}
        </p>
        <a style={{ fontSize: 12, color: 'var(--green)', cursor: 'pointer' }} onClick={() => navigate('/search')}>See all</a>
      </div>

      <div className="product-grid">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>

      {/* Escrow promo banner */}
      <div style={{ margin: '4px 12px 80px', background: 'var(--blue-light)', borderRadius: 14, padding: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ fontSize: 30 }}>🔒</span>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--blue)' }}>Escrow Protected</p>
          <p style={{ fontSize: 11, color: 'var(--blue)', opacity: 0.85 }}>Your money is held safely until you confirm delivery</p>
        </div>
      </div>
    </div>
  );
}
