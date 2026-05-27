import React, { useState } from 'react';
import { MOCK_PRODUCTS, CATEGORIES } from '../../utils/mockData';
import ProductCard from '../../components/products/ProductCard';

const LOCATIONS = ['All Locations', 'Lilongwe', 'Blantyre', 'Mzuzu', 'Zomba', 'Kasungu'];
const PRICE_RANGES = ['Any Price', 'Under 5K', '5K – 20K', '20K – 100K', 'Over 100K'];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('All Locations');
  const [category, setCategory] = useState('All');
  const [price, setPrice] = useState('Any Price');

  const filtered = MOCK_PRODUCTS.filter(p => {
    const matchQ = !query || p.name.toLowerCase().includes(query.toLowerCase());
    const matchL = location === 'All Locations' || p.location.includes(location);
    const matchC = category === 'All' || p.category === category;
    const matchP =
      price === 'Any Price' ? true :
      price === 'Under 5K' ? p.price < 5000 :
      price === '5K – 20K' ? p.price >= 5000 && p.price <= 20000 :
      price === '20K – 100K' ? p.price > 20000 && p.price <= 100000 :
      p.price > 100000;
    return matchQ && matchL && matchC && matchP;
  });

  return (
    <div className="page-fade">
      <div style={{ background: 'var(--green)', padding: '12px 16px' }}>
        <p style={{ color: 'white', fontWeight: 600, fontSize: 16, marginBottom: 10 }}>Explore</p>
        <div style={{ position: 'relative' }}>
          <input className="form-input" placeholder="Search products…" value={query}
            onChange={e => setQuery(e.target.value)}
            style={{ paddingLeft: 38, background: 'white' }} />
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>🔍</span>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: 'white', padding: '10px 12px', borderBottom: '0.5px solid var(--gray-border)', display: 'flex', gap: 8 }}>
        <select className="form-input" value={location} onChange={e => setLocation(e.target.value)} style={{ flex: 1, fontSize: 12, padding: '8px 10px' }}>
          {LOCATIONS.map(l => <option key={l}>{l}</option>)}
        </select>
        <select className="form-input" value={category} onChange={e => setCategory(e.target.value)} style={{ flex: 1, fontSize: 12, padding: '8px 10px' }}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select className="form-input" value={price} onChange={e => setPrice(e.target.value)} style={{ flex: 1, fontSize: 12, padding: '8px 10px' }}>
          {PRICE_RANGES.map(r => <option key={r}>{r}</option>)}
        </select>
      </div>

      <p style={{ fontSize: 12, color: 'var(--text3)', padding: '8px 14px' }}>
        {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
      </p>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <p className="empty-title">No products found</p>
          <p className="empty-desc">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="product-grid" style={{ paddingBottom: 80 }}>
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
