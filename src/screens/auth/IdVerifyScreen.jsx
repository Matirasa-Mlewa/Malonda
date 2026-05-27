import React from 'react';
import { useNavigate } from 'react-router-dom';

const LEVELS = [
  { key: 'basic', icon: '📱', label: 'Basic', desc: 'Phone number confirmed', done: true },
  { key: 'verified', icon: '🪪', label: 'Verified ✓', desc: 'National ID + selfie reviewed', done: false },
  { key: 'trusted', icon: '⭐', label: 'Trusted', desc: '10+ successful transactions', done: false },
];

export default function IdVerifyScreen() {
  const navigate = useNavigate();
  return (
    <div className="screen screen-white page-fade">
      <div className="header">
        <button className="header-back" onClick={() => navigate(-1)}>←</button>
        <span className="header-title">ID Verification</span>
      </div>
      <div className="scroll" style={{ padding: 20 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 48, marginBottom: 10 }}>🛡️</div>
          <p style={{ fontSize: 16, fontWeight: 700 }}>Become a Verified Seller</p>
          <p style={{ color: 'var(--text3)', fontSize: 13 }}>Upload your National ID to unlock the Verified badge and build buyer trust</p>
        </div>

        {LEVELS.map((l, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: 14,
            border: `1.5px solid ${l.done ? 'var(--green)' : i === 1 ? 'var(--blue)' : 'var(--gray-border)'}`,
            borderRadius: 12, marginBottom: 10,
            background: l.done ? 'var(--green-light)' : i === 1 ? 'var(--blue-light)' : 'white'
          }}>
            <span style={{ fontSize: 24 }}>{l.icon}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, fontSize: 14 }}>{l.label}</p>
              <p style={{ fontSize: 12, color: 'var(--text3)' }}>{l.desc}</p>
            </div>
            {l.done ? <span style={{ color: 'var(--green)', fontSize: 20 }}>✓</span> : <span style={{ color: 'var(--text3)' }}>›</span>}
          </div>
        ))}

        <div style={{ marginTop: 20 }}>
          <div className="upload-zone" style={{ height: 110, marginBottom: 10 }}>
            <span style={{ fontSize: 30 }}>🪪</span>
            <p>Upload National ID (front)</p>
          </div>
          <div className="upload-zone" style={{ height: 110, marginBottom: 14 }}>
            <span style={{ fontSize: 30 }}>🤳</span>
            <p>Take selfie photo</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>Submit for Review</button>
        </div>
      </div>
    </div>
  );
}
