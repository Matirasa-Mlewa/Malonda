import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Auth Screens
import SplashScreen from './screens/auth/SplashScreen';
import LoginScreen from './screens/auth/LoginScreen';
import OtpScreen from './screens/auth/OtpScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import IdVerifyScreen from './screens/auth/IdVerifyScreen';

// Main App Screens
import HomeScreen from './screens/main/HomeScreen';
import SearchScreen from './screens/main/SearchScreen';
import ProductDetailScreen from './screens/products/ProductDetailScreen';
import AddProductScreen from './screens/products/AddProductScreen';
import EditProductScreen from './screens/products/EditProductScreen';
import CartScreen from './screens/cart/CartScreen';
import CheckoutScreen from './screens/cart/CheckoutScreen';
import PaymentSuccessScreen from './screens/cart/PaymentSuccessScreen';
import OrdersScreen from './screens/orders/OrdersScreen';
import OrderDetailScreen from './screens/orders/OrderDetailScreen';
import ConfirmDeliveryScreen from './screens/orders/ConfirmDeliveryScreen';
import DisputeScreen from './screens/orders/DisputeScreen';
import ChatListScreen from './screens/chat/ChatListScreen';
import ChatScreen from './screens/chat/ChatScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import SellerProfileScreen from './screens/profile/SellerProfileScreen';
import WishlistScreen from './screens/profile/WishlistScreen';
import NotificationsScreen from './screens/profile/NotificationsScreen';
import ReportScreen from './screens/profile/ReportScreen';
import SellerDashboardScreen from './screens/seller/SellerDashboardScreen';
import SellerAnalyticsScreen from './screens/seller/SellerAnalyticsScreen';
import AdminPanelScreen from './screens/admin/AdminPanelScreen';
import MainLayout from './components/layout/MainLayout';

// ─── Protected Route Wrapper ─────────────────────────────────────────────────
function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-screen"><div className="spinner" /></div>;
  if (!user) return <Navigate to="/login" replace />;
  if (requiredRole && user.role !== requiredRole) return <Navigate to="/" replace />;
  return children;
}

// ─── Public Route (redirect if already logged in) ────────────────────────────
function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-screen"><div className="spinner" /></div>;
  if (user) return <Navigate to="/" replace />;
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public / Auth Routes */}
      <Route path="/splash" element={<SplashScreen />} />
      <Route path="/login" element={<PublicRoute><LoginScreen /></PublicRoute>} />
      <Route path="/otp" element={<PublicRoute><OtpScreen /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterScreen /></PublicRoute>} />
      <Route path="/verify-id" element={<ProtectedRoute><IdVerifyScreen /></ProtectedRoute>} />

      {/* Main App Routes (with bottom nav) */}
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/orders" element={<OrdersScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>

      {/* Product Routes */}
      <Route path="/product/:id" element={<ProtectedRoute><ProductDetailScreen /></ProtectedRoute>} />
      <Route path="/product/add" element={<ProtectedRoute><AddProductScreen /></ProtectedRoute>} />
      <Route path="/product/edit/:id" element={<ProtectedRoute><EditProductScreen /></ProtectedRoute>} />

      {/* Cart & Payment Routes */}
      <Route path="/checkout" element={<ProtectedRoute><CheckoutScreen /></ProtectedRoute>} />
      <Route path="/payment-success" element={<ProtectedRoute><PaymentSuccessScreen /></ProtectedRoute>} />

      {/* Order Routes */}
      <Route path="/orders/:id" element={<ProtectedRoute><OrderDetailScreen /></ProtectedRoute>} />
      <Route path="/orders/:id/confirm" element={<ProtectedRoute><ConfirmDeliveryScreen /></ProtectedRoute>} />
      <Route path="/orders/:id/dispute" element={<ProtectedRoute><DisputeScreen /></ProtectedRoute>} />

      {/* Chat Routes */}
      <Route path="/messages" element={<ProtectedRoute><ChatListScreen /></ProtectedRoute>} />
      <Route path="/messages/:userId" element={<ProtectedRoute><ChatScreen /></ProtectedRoute>} />

      {/* Profile Routes */}
      <Route path="/seller/:id" element={<ProtectedRoute><SellerProfileScreen /></ProtectedRoute>} />
      <Route path="/wishlist" element={<ProtectedRoute><WishlistScreen /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><NotificationsScreen /></ProtectedRoute>} />
      <Route path="/report" element={<ProtectedRoute><ReportScreen /></ProtectedRoute>} />

      {/* Seller Routes */}
      <Route path="/seller-dashboard" element={<ProtectedRoute><SellerDashboardScreen /></ProtectedRoute>} />
      <Route path="/seller-analytics" element={<ProtectedRoute><SellerAnalyticsScreen /></ProtectedRoute>} />

      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminPanelScreen /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
