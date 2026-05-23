import { useState, useEffect, useCallback } from 'react';
import { productsAPI, ordersAPI } from '../api';
import { MOCK_PRODUCTS, MOCK_ORDERS } from '../utils/mockData';

// ─── useProducts ──────────────────────────────────────────────────────────────
export function useProducts(filters = {}) {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      // const data = await productsAPI.getAll(filters);
      // setProducts(data.products);
      setProducts(MOCK_PRODUCTS); // use mock while offline
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}

// ─── useOrders ────────────────────────────────────────────────────────────────
export function useOrders(role = 'buyer') {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => { setOrders(MOCK_ORDERS); setLoading(false); }, 300);
  }, [role]);

  const confirmDelivery = useCallback(async (orderId, rating, review) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'Completed', step: 5, canConfirm: false } : o));
  }, []);

  return { orders, loading, confirmDelivery };
}

// ─── useWishlist ──────────────────────────────────────────────────────────────
export function useWishlist() {
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem('malonda_wishlist') || '[]'); } catch { return []; }
  });

  const toggle = useCallback((productId) => {
    setWishlist(prev => {
      const next = prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId];
      localStorage.setItem('malonda_wishlist', JSON.stringify(next));
      return next;
    });
  }, []);

  const isWishlisted = (productId) => wishlist.includes(productId);

  return { wishlist, toggle, isWishlisted };
}
