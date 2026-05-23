import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SellerAnalyticsScreen() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState('7d');
  const BAR = { '7d': [40, 65, 30, 80, 55, 90, 72], '30d': [60, 45, 80, 55, 70, 90, 65, 50, 75, 85] };
  const data = BAR[period] || BAR['7d'];

  return (
    <div className="screen screen-white page-fade">
      <div className="header">
        <button className="header-back" onClick={() => navigate(-1)}>←</button>
        <span className="header-title">Analytics</span>
      </div>
      <div className="scroll" style={{ padding: 16, paddingBottom: 80 }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          {['7d', '30d', '90d'].map(p => (
            <button key={p} onClick={() => setPeriod(p)} className={`btn btn-sm ${period === p ? 'btn-primary' : 'btn-gray'}`} style={{ flex: 1 }}>{p}</button>
          ))}
        </div>
        <div className="card card-pad" style={{ marginBottom: 14 }}>
          <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 12 }}>Revenue</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 120 }}>
            {data.map((h, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                <div style={{ width: '100%', background: 'var(--green)', borderRadius: '4px 4px 0 0', height: h + '%', opacity: 0.8 + (i / data.length) * 0.2 }} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[['Total Revenue', 'MK 312,500'], ['Orders', '28'], ['Avg Order Value', 'MK 11,161'], ['Top Product', 'Tecno Spark 10'], ['Conversion Rate', '6.4%'], ['Return Rate', '1.2%']].map(([l, v]) => (
            <div key={l} className="stat-card">
              <p className="stat-label">{l}</p>
              <p className="stat-value" style={{ fontSize: 16 }}>{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
