import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const STEPS = ['Your Info', 'ID Verify', 'Selfie'];

export default function RegisterScreen() {
  const navigate = useNavigate();
  const { register, sendOtp } = useAuth();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', phone: '', password: '', location: 'Lilongwe' });
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleNext = async () => {
    if (step === 0) {
      setLoading(true);
      await sendOtp('+265' + form.phone);
      setLoading(false);
      setStep(1);
    } else if (step === 1) {
      setStep(2);
    } else {
      setLoading(true);
      const res = await register(form);
      setLoading(false);
      if (res.success) navigate('/');
    }
  };

  return (
    <div className="screen screen-white page-fade">
      <div className="header">
        <button className="header-back" onClick={() => step > 0 ? setStep(s => s - 1) : navigate('/splash')}>←</button>
        <span className="header-title">Create Account</span>
      </div>

      {/* Step indicator */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px 8px' }}>
        {STEPS.map((s, i) => (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: i <= step ? 'var(--green)' : 'var(--gray-border)',
                color: i <= step ? 'white' : 'var(--text3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, marginBottom: 4
              }}>{i < step ? '✓' : i + 1}</div>
              <span style={{ fontSize: 10, color: i === step ? 'var(--green)' : 'var(--text3)' }}>{s}</span>
            </div>
            {i < 2 && <div style={{ flex: 1, height: 2, background: i < step ? 'var(--green)' : 'var(--gray-border)', margin: '0 6px', marginBottom: 16 }} />}
          </React.Fragment>
        ))}
      </div>

      <div className="scroll" style={{ padding: '12px 20px', flex: 1 }}>
        {step === 0 && (
          <>
            <div className="form-group">
              <label className="form-label">Full Name (as on National ID)</label>
              <input className="form-input" placeholder="e.g. Chisomo Banda" value={form.name} onChange={e => update('name', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <select className="form-input" style={{ width: 90, flexShrink: 0 }}><option>🇲🇼 +265</option></select>
                <input className="form-input" type="tel" placeholder="088 123 4567" value={form.phone} onChange={e => update('phone', e.target.value)} style={{ flex: 1 }} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Password (min 8 characters)</label>
              <input className="form-input" type="password" placeholder="Create a strong password" value={form.password} onChange={e => update('password', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Your District</label>
              <select className="form-input" value={form.location} onChange={e => update('location', e.target.value)}>
                {['Lilongwe','Blantyre','Mzuzu','Zomba','Kasungu','Mzimba','Salima','Dedza','Mangochi'].map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <p style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 16 }}>Upload your Malawi National ID to get the Verified badge. This builds trust with buyers.</p>
            <div className="upload-zone" style={{ height: 130, marginBottom: 12 }}>
              <span style={{ fontSize: 32 }}>🪪</span>
              <p>Tap to upload National ID (front)</p>
              <p style={{ fontSize: 10, color: 'var(--text3)' }}>JPG, PNG — max 5MB</p>
            </div>
            <div className="upload-zone" style={{ height: 130 }}>
              <span style={{ fontSize: 32 }}>🪪</span>
              <p>Tap to upload National ID (back)</p>
            </div>
            <div className="warn-banner" style={{ marginTop: 14 }}>
              <span>🛡️</span>
              <p style={{ fontSize: 12, color: '#92400e' }}>Your ID is encrypted and only viewed by our verification team. You can skip and verify later.</p>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <p style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 16 }}>Take a selfie to confirm your identity matches your National ID.</p>
            <div className="upload-zone" style={{ height: 180 }}>
              <span style={{ fontSize: 40 }}>🤳</span>
              <p>Tap to take a selfie</p>
              <p style={{ fontSize: 11, color: 'var(--text3)' }}>Ensure your face is clearly visible</p>
            </div>
            <p style={{ fontSize: 11, color: 'var(--text3)', marginTop: 10, textAlign: 'center' }}>You can also skip this step and do it from your profile later.</p>
          </>
        )}

        <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={handleNext} disabled={loading}>
          {loading ? 'Please wait…' : step < 2 ? 'Continue →' : 'Create Account'}
        </button>
        {step > 0 && (
          <button className="btn btn-gray" style={{ marginTop: 10 }} onClick={handleNext}>
            Skip for now
          </button>
        )}
        {step === 0 && (
          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--text3)' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--green)', fontWeight: 600 }}>Log In</Link>
          </p>
        )}
      </div>
    </div>
  );
}
