import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const REPORTS = [
  { id: 1, user: 'Kondwani Mbewe', phone: '099 234 5678', reason: 'Sent payment outside platform', status: 'Pending', risk: 'High' },
  { id: 2, user: 'Limbani Mzumara', phone: '088 111 2233', reason: 'Fake product images', status: 'Under Review', risk: 'Medium' },
  { id: 3, user: 'Tadala Sakala', phone: '088 999 0011', reason: 'No delivery after payment', status: 'Resolved', risk: 'High' },
];

const VERIFICATIONS = [
  { id: 'u10', name: 'Kondwani Mbewe', phone: '099 234 5678', idNo: 'MWI-2024-189234', selfie: '✅', status: 'Pending' },
  { id: 'u11', name: 'Tadala Phiri', phone: '088 876 5432', idNo: 'MWI-2024-092847', selfie: '✅', status: 'Pending' },
];

const USERS = [
  { id: 'u1', name: 'Chisomo Banda', phone: '088 123 4567', badge: 'verified', orders: 12, suspended: false },
  { id: 'u2', name: 'John Phiri', phone: '099 876 5432', badge: 'trusted', orders: 34, suspended: false },
  { id: 'u3', name: 'Limbani Mzumara', phone: '088 333 9090', badge: 'basic', orders: 1, suspended: true },
];

export default function AdminPanelScreen() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('reports');
  const [verifications, setVerifications] = useState(VERIFICATIONS);
  const [users, setUsers] = useState(USERS);

  const approveVerification = (id) => {
    setVerifications(prev => prev.filter(v => v.id !== id));
    toast.success('Verification approved');
  };
  const rejectVerification = (id) => {
    setVerifications(prev => prev.filter(v => v.id !== id));
    toast.error('Verification rejected');
  };
  const toggleSuspend = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, suspended: !u.suspended } : u));
    const user = users.find(u => u.id === id);
    toast(user?.suspended ? 'User unsuspended' : 'User suspended');
  };

  return (
    <div className="screen screen-white page-fade">
      <div className="header">
        <button className="header-back" onClick={() => navigate(-1)}>←</button>
        <span className="header-title">Admin Panel</span>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, padding: '10px 12px', background: 'var(--gray-light)' }}>
        {[['5', '🚩', 'Open Reports'], ['28', '✅', 'Resolved'], ['3', '🚫', 'Suspended'], ['2', '⚖️', 'Disputes']].map(([v, i, l]) => (
          <div key={l} style={{ background: 'white', borderRadius: 10, padding: '8px 6px', textAlign: 'center' }}>
            <div style={{ fontSize: 18 }}>{i}</div>
            <p style={{ fontSize: 16, fontWeight: 700 }}>{v}</p>
            <p style={{ fontSize: 9, color: 'var(--text3)', lineHeight: 1.2 }}>{l}</p>
          </div>
        ))}
      </div>

      <div className="tabs">
        {['reports', 'verify', 'users'].map(t => (
          <div key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t === 'reports' ? 'Reports' : t === 'verify' ? 'Verify IDs' : 'Users'}
          </div>
        ))}
      </div>

      <div className="scroll" style={{ paddingBottom: 80 }}>
        {tab === 'reports' && (
          <div style={{ padding: 12 }}>
            {REPORTS.map(r => (
              <div key={r.id} className="card card-pad" style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <p style={{ fontWeight: 600, fontSize: 13 }}>{r.user}</p>
                  <span className={`pill ${r.risk === 'High' ? 'pill-red' : 'pill-gold'}`} style={{ fontSize: 10 }}>{r.risk} Risk</span>
                </div>
                <p style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 8 }}>{r.reason}</p>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <button className="btn btn-danger btn-sm" onClick={() => toast('User suspended')}>Suspend</button>
                  <button className="btn btn-secondary btn-sm" onClick={() => toast('Marked as reviewed')}>Review</button>
                  <span className={`pill ${r.status === 'Resolved' ? 'pill-green' : r.status === 'Pending' ? 'pill-red' : 'pill-blue'}`} style={{ marginLeft: 'auto', fontSize: 10 }}>{r.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'verify' && (
          <div style={{ padding: 12 }}>
            {verifications.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">✅</div>
                <p className="empty-title">All caught up!</p>
                <p className="empty-desc">No pending verifications</p>
              </div>
            ) : verifications.map(v => (
              <div key={v.id} className="card card-pad" style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div className="avatar avatar-md">{v.name.charAt(0)}</div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 13 }}>{v.name}</p>
                    <p style={{ fontSize: 11, color: 'var(--text3)' }}>{v.phone}</p>
                  </div>
                  <span className="pill pill-gold" style={{ marginLeft: 'auto', fontSize: 10 }}>{v.status}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
                  <div className="stat-card" style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: 10, color: 'var(--text3)' }}>National ID</p>
                    <p style={{ fontSize: 11, fontWeight: 600, marginTop: 2 }}>{v.idNo}</p>
                  </div>
                  <div className="stat-card" style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: 10, color: 'var(--text3)' }}>Selfie Match</p>
                    <p style={{ fontSize: 22, marginTop: 2 }}>{v.selfie}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => approveVerification(v.id)}>✓ Approve</button>
                  <button className="btn btn-danger btn-sm" style={{ flex: 1 }} onClick={() => rejectVerification(v.id)}>✗ Reject</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'users' && (
          <div style={{ padding: 12 }}>
            {users.map(u => (
              <div key={u.id} style={{ display: 'flex', gap: 10, padding: '10px 12px', background: u.suspended ? 'var(--red-light)' : 'white', border: '0.5px solid var(--gray-border)', borderRadius: 12, marginBottom: 8, alignItems: 'center' }}>
                <div className="avatar avatar-sm">{u.name.charAt(0)}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 600 }}>{u.name}</p>
                  <p style={{ fontSize: 11, color: 'var(--text3)' }}>{u.phone} · {u.orders} orders</p>
                  <span className={`badge-${u.badge}`}>{u.badge === 'trusted' ? '⭐ Trusted' : u.badge === 'verified' ? '✓ Verified' : '○ Basic'}</span>
                </div>
                <button className={`btn btn-sm ${u.suspended ? 'btn-secondary' : 'btn-danger'}`} onClick={() => toggleSuspend(u.id)}>
                  {u.suspended ? 'Unblock' : 'Suspend'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
