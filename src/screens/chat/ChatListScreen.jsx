import React from 'react';
import { useNavigate } from 'react-router-dom';
import TrustBadge from '../../components/trust/TrustBadge';

const CONVERSATIONS = [
  { id: 'u1', name: 'John Phiri', last: 'Is the Tecno still available?', time: '10:22 AM', badge: 'trusted', unread: 2, online: true },
  { id: 'u2', name: 'Amina Shop', last: 'Yes I can deliver today!', time: 'Yesterday', badge: 'verified', unread: 0, online: true },
  { id: 'u3', name: 'Tiwonge Crafts', last: 'Thank you for your order 🙏', time: 'Mon', badge: 'trusted', unread: 0, online: false },
  { id: 'u4', name: 'Farm Direct MW', last: 'Sending tracking code now', time: 'Sun', badge: 'verified', unread: 1, online: false },
];

export default function ChatListScreen() {
  const navigate = useNavigate();

  return (
    <div className="screen screen-white page-fade">
      <div className="header">
        <button className="header-back" onClick={() => navigate(-1)}>←</button>
        <span className="header-title">Messages</span>
      </div>

      <div className="fraud-warn">
        <span>⚠️</span>
        <p>Never share passwords or pay outside Malonda. Report suspicious messages.</p>
      </div>

      {CONVERSATIONS.map(c => (
        <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: '0.5px solid var(--gray-border)', cursor: 'pointer' }}
          onClick={() => navigate('/messages/' + c.id)}>
          <div style={{ position: 'relative' }}>
            <div className="avatar avatar-md">{c.name.charAt(0)}{c.name.split(' ')[1]?.charAt(0)}</div>
            {c.online && <div style={{ position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, borderRadius: '50%', background: '#22c55e', border: '2px solid white' }} />}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <p style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</p>
              <TrustBadge level={c.badge} />
            </div>
            <p style={{ fontSize: 12, color: 'var(--text3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.last}</p>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <p style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 4 }}>{c.time}</p>
            {c.unread > 0 && (
              <div style={{ background: 'var(--green)', color: 'white', borderRadius: '50%', width: 18, height: 18, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginLeft: 'auto' }}>
                {c.unread}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
