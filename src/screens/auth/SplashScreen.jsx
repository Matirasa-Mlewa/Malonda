import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SplashScreen() {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'var(--green)', padding: '32px 24px'
    }}>
      <div style={{
        width: 88, height: 88, background: 'white', borderRadius: 22,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.15)', fontSize: 48
      }}>🛒</div>

      <div className="logo" style={{ fontSize: 38, marginBottom: 8 }}>
        Ma<span>lo</span>nda
      </div>
      <p style={{ color: 'rgba(255,255,255,0.85)', textAlign: 'center', fontSize: 15, marginBottom: 52 }}>
        Trusted Buying &amp; Selling<br />in Malawi
      </p>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button className="btn" style={{ background: 'white', color: 'var(--green)', fontWeight: 700 }}
          onClick={() => navigate('/login')}>Log In</button>
        <button className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}
          onClick={() => navigate('/register')}>Create Account</button>
      </div>

      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11, marginTop: 28, textAlign: 'center' }}>
        🔒 Escrow Protected &nbsp;·&nbsp; 🛡️ ID-Verified Sellers
      </p>
    </div>
  );
}
