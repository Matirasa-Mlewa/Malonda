import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../../utils/mockData';
import ProductCard from '../../components/products/ProductCard';

export default function WishlistScreen() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([MOCK_PRODUCTS[0], MOCK_PRODUCTS[2]]);
  const remove = (id) => setWishlist(w => w.filter(p => p.id !== id));

  return (
    <div className="screen screen-white page-fade">
      <div className="header">
        <button className="header-back" onClick={() => navigate(-1)}>←</button>
        <span className="header-title">Wishlist ({wishlist.length})</span>
      </div>
      {wishlist.length === 0 ? (
        <div className="empty-state" style={{ marginTop: 60 }}>
          <div className="empty-icon">❤️</div>
          <p className="empty-title">Nothing saved yet</p>
          <p className="empty-desc">Tap the heart on any product to save it</p>
          <button className="btn btn-primary" style={{ marginTop: 20, width: 'auto', padding: '12px 28px' }} onClick={() => navigate('/')}>Browse Products</button>
        </div>
      ) : (
        <div className="product-grid" style={{ paddingBottom: 80 }}>
          {wishlist.map(p => (
            <div key={p.id} style={{ position: 'relative' }}>
              <ProductCard product={p} />
              <button onClick={() => remove(p.id)}
                style={{ position: 'absolute', top: 6, left: 6, background: 'white', border: 'none', borderRadius: '50%', width: 26, height: 26, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }}>❤️</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
