import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const navigate = useNavigate();
  const { sendOtp } = useAuth();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone) return;
    setLoading(true);
    const res = await sendOtp('+265' + phone);
    setLoading(false);
    if (res.success) navigate('/otp', { state: { phone: '+265' + phone, password } });
  };

  return (
    <div className="screen screen-white page-fade">
      <div className="header">
        <button className="header-back" onClick={() => navigate('/splash')}>←</button>
        <span className="header-title">Log In</span>
      </div>

      <div className="scroll" style={{ padding: '28px 20px', flex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 44, marginBottom: 10 }}>👋</div>
          <p style={{ fontSize: 17, fontWeight: 600 }}>Welcome back!</p>
          <p style={{ color: 'var(--text3)', fontSize: 13 }}>Enter your details to continue</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <select className="form-input" style={{ width: 90, flexShrink: 0 }}>
                <option>🇲🇼 +265</option>
              </select>
              <input className="form-input" type="tel" placeholder="088 123 4567"
                value={phone} onChange={e => setPhone(e.target.value)} style={{ flex: 1 }} required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="Enter password"
              value={password} onChange={e => setPassword(e.target.value)} required />
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading} style={{ marginTop: 6 }}>
            {loading ? 'Sending OTP…' : 'Send OTP Code'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 16 }}>
          <a style={{ color: 'var(--green)', fontSize: 13, cursor: 'pointer' }}>Forgot password?</a>
        </p>

        <p style={{ textAlign: 'center', marginTop: 28, color: 'var(--text3)', fontSize: 13 }}>
          No account?{' '}
          <Link to="/register" style={{ color: 'var(--green)', fontWeight: 600 }}>Register</Link>
        </p>

        <div style={{ marginTop: 28, background: 'var(--blue-light)', borderRadius: 10, padding: 12, display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 20 }}>🔒</span>
          <p style={{ fontSize: 12, color: 'var(--blue)' }}>Your data is encrypted. We never share your details.</p>
        </div>
      </div>
    </div>
  );
}
