import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://api.malonda.mw/v1';

// ─── Axios Instance ───────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Request Interceptor (attach JWT token) ──────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('malonda_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor (handle 401 logout) ────────────────────────────────
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('malonda_token');
      localStorage.removeItem('malonda_user');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error);
  }
);

// ─── Auth API ─────────────────────────────────────────────────────────────────
export const authAPI = {
  sendOtp: (phone) => api.post('/auth/send-otp', { phone }),
  verifyOtp: (phone, otp) => api.post('/auth/verify-otp', { phone, otp }),
  register: (data) => api.post('/auth/register', data),
  login: (phone, password) => api.post('/auth/login', { phone, password }),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh'),
  getProfile: () => api.get('/auth/me'),
};

// ─── Verification API ─────────────────────────────────────────────────────────
export const verifyAPI = {
  uploadNationalId: (formData) =>
    api.post('/verify/national-id', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  uploadSelfie: (formData) =>
    api.post('/verify/selfie', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getVerificationStatus: () => api.get('/verify/status'),
};

// ─── Products API ─────────────────────────────────────────────────────────────
export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  getNearby: (lat, lng, radius = 50) =>
    api.get('/products/nearby', { params: { lat, lng, radius } }),
  search: (query, filters) => api.get('/products/search', { params: { q: query, ...filters } }),
  create: (formData) =>
    api.post('/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id, formData) =>
    api.put(`/products/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id) => api.delete(`/products/${id}`),
  getByCategory: (category, params) =>
    api.get(`/products/category/${category}`, { params }),
  getBySeller: (sellerId) => api.get(`/products/seller/${sellerId}`),
};

// ─── Cart API ─────────────────────────────────────────────────────────────────
export const cartAPI = {
  get: () => api.get('/cart'),
  addItem: (productId, quantity) => api.post('/cart/items', { productId, quantity }),
  updateItem: (itemId, quantity) => api.put(`/cart/items/${itemId}`, { quantity }),
  removeItem: (itemId) => api.delete(`/cart/items/${itemId}`),
  clear: () => api.delete('/cart'),
  applyDiscount: (code) => api.post('/cart/discount', { code }),
};

// ─── Orders API ───────────────────────────────────────────────────────────────
export const ordersAPI = {
  create: (data) => api.post('/orders', data),
  getAll: (role = 'buyer') => api.get('/orders', { params: { role } }),
  getById: (id) => api.get(`/orders/${id}`),
  confirmDelivery: (id, rating, review) =>
    api.post(`/orders/${id}/confirm`, { rating, review }),
  openDispute: (id, data) => api.post(`/orders/${id}/dispute`, data),
  getTracking: (id) => api.get(`/orders/${id}/tracking`),
  cancel: (id, reason) => api.post(`/orders/${id}/cancel`, { reason }),
};

// ─── Payments API ─────────────────────────────────────────────────────────────
export const paymentsAPI = {
  initiate: (orderId, method, phone) =>
    api.post('/payments/initiate', { orderId, method, phone }),
  verify: (transactionId) => api.get(`/payments/verify/${transactionId}`),
  getEscrowStatus: (orderId) => api.get(`/payments/escrow/${orderId}`),
  releaseEscrow: (orderId) => api.post(`/payments/escrow/${orderId}/release`),
  refund: (orderId) => api.post(`/payments/escrow/${orderId}/refund`),
  getHistory: () => api.get('/payments/history'),
};

// ─── Chat / Messaging API ─────────────────────────────────────────────────────
export const chatAPI = {
  getConversations: () => api.get('/chat/conversations'),
  getMessages: (userId, page = 1) =>
    api.get(`/chat/${userId}/messages`, { params: { page } }),
  sendMessage: (userId, text, imageUrl = null) =>
    api.post(`/chat/${userId}/messages`, { text, imageUrl }),
  uploadImage: (formData) =>
    api.post('/chat/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  markRead: (userId) => api.post(`/chat/${userId}/read`),
  reportMessage: (messageId, reason) =>
    api.post(`/chat/report/${messageId}`, { reason }),
};

// ─── Reviews & Ratings API ────────────────────────────────────────────────────
export const reviewsAPI = {
  getForSeller: (sellerId, page = 1) =>
    api.get(`/reviews/seller/${sellerId}`, { params: { page } }),
  getForProduct: (productId, page = 1) =>
    api.get(`/reviews/product/${productId}`, { params: { page } }),
  create: (orderId, data) => api.post(`/reviews/${orderId}`, data),
  report: (reviewId, reason) => api.post(`/reviews/${reviewId}/report`, { reason }),
};

// ─── Users / Sellers API ──────────────────────────────────────────────────────
export const usersAPI = {
  getProfile: (id) => api.get(`/users/${id}`),
  updateProfile: (data) => api.put('/users/me', data),
  getTrustScore: (id) => api.get(`/users/${id}/trust`),
  report: (userId, reason, description) =>
    api.post(`/users/${userId}/report`, { reason, description }),
  block: (userId) => api.post(`/users/${userId}/block`),
  getWishlist: () => api.get('/users/me/wishlist'),
  addToWishlist: (productId) => api.post('/users/me/wishlist', { productId }),
  removeFromWishlist: (productId) => api.delete(`/users/me/wishlist/${productId}`),
};

// ─── Seller Dashboard API ─────────────────────────────────────────────────────
export const sellerAPI = {
  getDashboard: () => api.get('/seller/dashboard'),
  getAnalytics: (period = '30d') => api.get('/seller/analytics', { params: { period } }),
  getOrders: (status) => api.get('/seller/orders', { params: { status } }),
  getRevenue: (period) => api.get('/seller/revenue', { params: { period } }),
  getProductPerformance: () => api.get('/seller/products/performance'),
};

// ─── Notifications API ────────────────────────────────────────────────────────
export const notificationsAPI = {
  getAll: (page = 1) => api.get('/notifications', { params: { page } }),
  markRead: (id) => api.put(`/notifications/${id}/read`),
  markAllRead: () => api.put('/notifications/read-all'),
  getUnreadCount: () => api.get('/notifications/unread-count'),
  updatePreferences: (prefs) => api.put('/notifications/preferences', prefs),
};

// ─── Admin API ────────────────────────────────────────────────────────────────
export const adminAPI = {
  getReports: (status) => api.get('/admin/reports', { params: { status } }),
  resolveReport: (id, action, note) =>
    api.post(`/admin/reports/${id}/resolve`, { action, note }),
  getPendingVerifications: () => api.get('/admin/verifications/pending'),
  approveVerification: (userId) => api.post(`/admin/verifications/${userId}/approve`),
  rejectVerification: (userId, reason) =>
    api.post(`/admin/verifications/${userId}/reject`, { reason }),
  suspendUser: (userId, reason) =>
    api.post(`/admin/users/${userId}/suspend`, { reason }),
  unsuspendUser: (userId) => api.post(`/admin/users/${userId}/unsuspend`),
  getDisputes: () => api.get('/admin/disputes'),
  resolveDispute: (id, decision, note) =>
    api.post(`/admin/disputes/${id}/resolve`, { decision, note }),
  getTransactions: (params) => api.get('/admin/transactions', { params }),
  getDashboardStats: () => api.get('/admin/stats'),
};

// ─── Delivery API ─────────────────────────────────────────────────────────────
export const deliveryAPI = {
  getOptions: (productId, buyerLocation) =>
    api.get(`/delivery/options/${productId}`, { params: buyerLocation }),
  trackOrder: (orderId) => api.get(`/delivery/track/${orderId}`),
  updateStatus: (orderId, status, note) =>
    api.put(`/delivery/${orderId}/status`, { status, note }),
};

// ─── Promotions API ───────────────────────────────────────────────────────────
export const promotionsAPI = {
  validateCode: (code, cartTotal) =>
    api.post('/promotions/validate', { code, cartTotal }),
  getActive: () => api.get('/promotions/active'),
  create: (data) => api.post('/promotions', data),
};

export default api;
