import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const REASONS = ['Fake product listing', 'Asked for payment outside platform', 'Never delivered after payment', 'Harassment or threats', 'Scam attempt', 'Fake identity', 'Other'];

export default function ReportScreen() {
  const navigate = useNavigate();
  const [reason, setReason] = useState(REASONS[0]);
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    toast.success('Report submitted. Our team will review within 24 hours.');
    setLoading(false);
    navigate(-1);
  };

  return (
    <div className="screen screen-white page-fade">
      <div className="header">
        <button className="header-back" onClick={() => navigate(-1)}>←</button>
        <span className="header-title">Report a User</span>
      </div>
      <form className="scroll" style={{ padding: 20 }} onSubmit={handleSubmit}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 44, marginBottom: 10 }}>🚩</div>
          <p style={{ fontSize: 15, fontWeight: 600 }}>Help keep Malonda safe</p>
          <p style={{ color: 'var(--text3)', fontSize: 13 }}>All reports are reviewed within 24 hours</p>
        </div>
        <div className="form-group">
          <label className="form-label">User's Phone or Name</label>
          <input className="form-input" placeholder="Who are you reporting?" required />
        </div>
        <div className="form-group">
          <label className="form-label">Reason</label>
          <select className="form-input" value={reason} onChange={e => setReason(e.target.value)}>
            {REASONS.map(r => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea className="form-input" style={{ height: 90 }} placeholder="Describe what happened…" value={desc} onChange={e => setDesc(e.target.value)} required />
        </div>
        <div className="upload-zone" style={{ height: 80, marginBottom: 14 }}>
          <span style={{ fontSize: 24 }}>📎</span>
          <p>Attach screenshots (optional)</p>
        </div>
        <div style={{ background: 'var(--blue-light)', borderRadius: 10, padding: 12, marginBottom: 16 }}>
          <p style={{ fontSize: 12, color: 'var(--blue)' }}>📎 Your identity will be kept confidential. False reports may result in account suspension.</p>
        </div>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Submitting…' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
}
