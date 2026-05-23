import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CATEGORIES = ['Electronics', 'Clothing', 'Food & Groceries', 'Furniture', 'Farm Produce', 'Beauty', 'Vehicles', 'Other'];
const DELIVERY_OPTIONS = ['Pick up only', 'Delivery available (buyer pays cost)', 'Free delivery included', 'Both pick up and delivery'];

export default function AddProductScreen() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', category: 'Electronics', price: '', quantity: '1',
    description: '', location: 'Lilongwe', delivery: DELIVERY_OPTIONS[0], escrow: true,
  });
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) { toast.error('Please fill all required fields'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000)); // simulate API
    toast.success('Product listed successfully!');
    setLoading(false);
    navigate('/seller-dashboard');
  };

  return (
    <div className="screen screen-white page-fade">
      <div className="header">
        <button className="header-back" onClick={() => navigate(-1)}>←</button>
        <span className="header-title">Add Product</span>
      </div>

      <form className="scroll" style={{ padding: '16px 16px', flex: 1, paddingBottom: 100 }} onSubmit={handleSubmit}>
        {/* Image upload */}
        <div className="upload-zone" style={{ height: 130, marginBottom: 16 }}>
          <span style={{ fontSize: 34 }}>📷</span>
          <p>Tap to add product photos</p>
          <p style={{ fontSize: 10 }}>Up to 6 photos — JPG, PNG, max 5MB each</p>
        </div>

        <div className="form-group">
          <label className="form-label">Product Name *</label>
          <input className="form-input" placeholder="What are you selling?" value={form.name} onChange={e => update('name', e.target.value)} required />
        </div>

        <div className="form-group">
          <label className="form-label">Category *</label>
          <select className="form-input" value={form.category} onChange={e => update('category', e.target.value)}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Price (MK) *</label>
            <input className="form-input" type="number" placeholder="0" value={form.price} onChange={e => update('price', e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Quantity</label>
            <input className="form-input" type="number" placeholder="1" value={form.quantity} onChange={e => update('quantity', e.target.value)} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Description *</label>
          <textarea className="form-input" style={{ height: 90 }} placeholder="Describe your product — condition, size, colour, etc."
            value={form.description} onChange={e => update('description', e.target.value)} required />
        </div>

        <div className="form-group">
          <label className="form-label">Location / Area</label>
          <select className="form-input" value={form.location} onChange={e => update('location', e.target.value)}>
            {['Lilongwe', 'Blantyre', 'Mzuzu', 'Zomba', 'Kasungu', 'Mangochi', 'Salima'].map(l => <option key={l}>{l}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Delivery Options</label>
          <select className="form-input" value={form.delivery} onChange={e => update('delivery', e.target.value)}>
            {DELIVERY_OPTIONS.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>

        {/* Escrow toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'var(--green-light)', borderRadius: 10, marginBottom: 20 }}>
          <input type="checkbox" id="escrow" checked={form.escrow} onChange={e => update('escrow', e.target.checked)}
            style={{ width: 18, height: 18, accentColor: 'var(--green)' }} />
          <label htmlFor="escrow" style={{ fontSize: 13, color: 'var(--green)', fontWeight: 500, cursor: 'pointer' }}>
            🔒 Enable Escrow Protection — builds buyer trust
          </label>
        </div>

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Publishing…' : 'Publish Listing'}
        </button>
      </form>
    </div>
  );
}
