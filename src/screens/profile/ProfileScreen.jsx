import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import TrustBadge from '../../components/trust/TrustBadge';

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  if (!user) return null;

  const menuItems = [
    { icon: '🛒', label: 'My Orders', action: () => navigate('/orders') },
    { icon: '❤️', label: 'Wishlist', action: () => navigate('/wishlist') },
    { icon: '🏪', label: 'Seller Dashboard', action: () => navigate('/seller-dashboard') },
    { icon: '🔒', label: 'Verify ID / Upgrade Badge', action: () => navigate('/verify-id') },
    { icon: '🔔', label: 'Notifications', action: () => navigate('/notifications') },
    { icon: '🚩', label: 'Report a User', action: () => navigate('/report') },
    { icon: '🛡️', label: 'Admin Panel', action: () => navigate('/admin') },
    { icon: '⚙️', label: 'Settings', action: () => {} },
  ];

  return (
    <div className="page-fade" style={{ paddingBottom: 80 }}>
      {/* Profile header */}
      <div style={{ background: 'var(--green)', padding: '20px 16px 24px', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, border: '2px solid rgba(255,255,255,0.5)' }}>
            {user.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 17, fontWeight: 700, marginBottom: 2 }}>{user.name}</p>
            <p style={{ fontSize: 12, opacity: 0.8 }}>📱 {user.phone}</p>
            <div style={{ marginTop: 6 }}><TrustBadge level={user.verificationLevel || 'basic'} /></div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', marginTop: 16, background: 'rgba(255,255,255,0.12)', borderRadius: 12, overflow: 'hidden' }}>
          {[['82', 'Trust Score'], ['12', 'Orders'], ['4.7★', 'Rating']].map(([v, l], i) => (
            <div key={i} style={{ flex: 1, padding: '10px 0', textAlign: 'center', borderRight: i < 2 ? '0.5px solid rgba(255,255,255,0.2)' : undefined }}>
              <p style={{ fontSize: 18, fontWeight: 800 }}>{v}</p>
              <p style={{ fontSize: 10, opacity: 0.8 }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu items */}
      <div style={{ margin: 12 }}>
        <div className="card">
          {menuItems.map((item, i) => (
            <div key={i} onClick={item.action}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px', borderBottom: i < menuItems.length - 1 ? '0.5px solid var(--gray-border)' : undefined, cursor: 'pointer' }}>
              <span style={{ fontSize: 20, width: 26, textAlign: 'center' }}>{item.icon}</span>
              <span style={{ fontSize: 14, flex: 1 }}>{item.label}</span>
              <span style={{ color: 'var(--text3)' }}>›</span>
            </div>
          ))}
        </div>
        <button className="btn btn-danger" style={{ marginTop: 12 }} onClick={logout}>Log Out</button>
      </div>
    </div>
  );
}
