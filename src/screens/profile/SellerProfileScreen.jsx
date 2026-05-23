// SellerProfileScreen.jsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../../utils/mockData';
import TrustBadge from '../../components/trust/TrustBadge';
import ProductCard from '../../components/products/ProductCard';

export default function SellerProfileScreen() {
  const navigate = useNavigate();
  const sellerProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="screen screen-white page-fade">
      <div className="header">
        <button className="header-back" onClick={() => navigate(-1)}>←</button>
        <span className="header-title">Seller Profile</span>
      </div>
      <div className="scroll" style={{ paddingBottom: 80 }}>
        <div style={{ background: 'var(--green)', padding: '20px 16px 24px', color: 'white', textAlign: 'center' }}>
          <div style={{ width: 68, height: 68, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 700, margin: '0 auto 10px', border: '2px solid rgba(255,255,255,0.5)' }}>JP</div>
          <p style={{ fontSize: 17, fontWeight: 700 }}>John Phiri</p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 6, marginBottom: 6 }}><TrustBadge level="trusted" /></div>
          <p style={{ fontSize: 12, opacity: 0.75 }}>📍 Lilongwe, Area 18 · Member since 2023</p>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 14, background: 'rgba(255,255,255,0.12)', borderRadius: 10, padding: 10 }}>
            {[['34', 'Sales'], ['4.8★', 'Rating'], ['98%', 'Positive']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}><p style={{ fontSize: 18, fontWeight: 800 }}>{v}</p><p style={{ fontSize: 10, opacity: 0.8 }}>{l}</p></div>
            ))}
          </div>
        </div>

        <div style={{ padding: 14 }}>
          <div className="escrow-banner" style={{ marginBottom: 14 }}>
            <span style={{ fontSize: 20 }}>🔒</span>
            <p>This seller uses Escrow protection on all listings. Your payment is safe.</p>
          </div>
          <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Listings</p>
          <div className="product-grid" style={{ padding: 0 }}>
            {sellerProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <button className="btn btn-outline" style={{ marginTop: 14 }} onClick={() => navigate('/messages/seller1')}>💬 Message Seller</button>
          <button className="btn btn-danger" style={{ marginTop: 10 }} onClick={() => navigate('/report')}>🚩 Report Seller</button>
        </div>
      </div>
    </div>
  );
}
