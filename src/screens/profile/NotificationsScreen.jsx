import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NOTIFS = [
  { id: 1, icon: '🔒', title: 'Escrow Payment Received', body: 'MK 75,000 is held in escrow for Tecno Spark 10', time: 'Just now', unread: true },
  { id: 2, icon: '💬', title: 'New Message', body: 'John Phiri: "Is the Tecno still available?"', time: '10 min ago', unread: true },
  { id: 3, icon: '📦', title: 'Order Dispatched', body: 'Your Chitenje Fabric order has been dispatched', time: '2 hrs ago', unread: true },
  { id: 4, icon: '⭐', title: 'New Review', body: 'Amina Shop left you a 5-star review', time: 'Yesterday', unread: false },
  { id: 5, icon: '🎁', title: 'Promotion', body: 'Use code MALONDA10 for 10% off your next order', time: '2 days ago', unread: false },
  { id: 6, icon: '✅', title: 'Payment Released', body: 'MK 8,500 from Chitenje Fabric sale has been released', time: '3 days ago', unread: false },
];

export default function NotificationsScreen() {
  const navigate = useNavigate();
  const [notifs, setNotifs] = useState(NOTIFS);

  const markAllRead = () => setNotifs(n => n.map(x => ({ ...x, unread: false })));

  return (
    <div className="screen screen-white page-fade">
      <div className="header">
        <button className="header-back" onClick={() => navigate(-1)}>←</button>
        <span className="header-title">Notifications</span>
        <button className="header-action" style={{ fontSize: 12 }} onClick={markAllRead}>Mark all read</button>
      </div>
      <div style={{ paddingBottom: 20 }}>
        {notifs.map(n => (
          <div key={n.id} style={{ display: 'flex', gap: 12, padding: '12px 14px', borderBottom: '0.5px solid var(--gray-border)', background: n.unread ? 'var(--green-light)' : 'white', cursor: 'pointer' }}
            onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, unread: false } : x))}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: n.unread ? 'white' : 'var(--gray-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0, border: '0.5px solid var(--gray-border)' }}>
              {n.icon}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: n.unread ? 600 : 500, marginBottom: 2 }}>{n.title}</p>
              <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.4 }}>{n.body}</p>
              <p style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>{n.time}</p>
            </div>
            {n.unread && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', marginTop: 6, flexShrink: 0 }} />}
          </div>
        ))}
      </div>
    </div>
  );
}
