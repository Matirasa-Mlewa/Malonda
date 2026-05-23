import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../../utils/mockData';
import toast from 'react-hot-toast';

export default function EditProductScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = MOCK_PRODUCTS.find(p => String(p.id) === String(id)) || MOCK_PRODUCTS[0];
  const [form, setForm] = useState({
    name: product.name, price: product.price, description: product.desc,
    category: product.category, location: product.location,
  });
  const [loading, setLoading] = useState(false);
  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    toast.success('Product updated!');
    setLoading(false);
    navigate('/seller-dashboard');
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this listing?')) return;
    toast.success('Listing deleted');
    navigate('/seller-dashboard');
  };

  return (
    <div className="screen screen-white page-fade">
      <div className="header">
        <button className="header-back" onClick={() => navigate(-1)}>←</button>
        <span className="header-title">Edit Listing</span>
      </div>
      <form className="scroll" style={{ padding: 16, paddingBottom: 100 }} onSubmit={handleSave}>
        <div className="upload-zone" style={{ height: 100, marginBottom: 14 }}>
          <span style={{ fontSize: 28 }}>{product.emoji}</span>
          <p style={{ fontSize: 11 }}>Tap to change photos</p>
        </div>
        <div className="form-group">
          <label className="form-label">Product Name</label>
          <input className="form-input" value={form.name} onChange={e => update('name', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Price (MK)</label>
          <input className="form-input" type="number" value={form.price} onChange={e => update('price', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea className="form-input" style={{ height: 80 }} value={form.description} onChange={e => update('description', e.target.value)} />
        </div>
        <button className="btn btn-primary" type="submit" disabled={loading} style={{ marginBottom: 10 }}>
          {loading ? 'Saving…' : 'Save Changes'}
        </button>
        <button className="btn btn-danger" type="button" onClick={handleDelete}>
          🗑️ Delete Listing
        </button>
      </form>
    </div>
  );
}
