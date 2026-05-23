import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verificationLevel, setVerificationLevel] = useState('basic'); // basic | verified | trusted

  // ─── Restore session on mount ──────────────────────────────────────────────
  useEffect(() => {
    const stored = localStorage.getItem('malonda_user');
    const token = localStorage.getItem('malonda_token');
    if (stored && token) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        setVerificationLevel(parsed.verificationLevel || 'basic');
      } catch {
        localStorage.removeItem('malonda_user');
      }
    }
    setLoading(false);
  }, []);

  // ─── Send OTP ──────────────────────────────────────────────────────────────
  const sendOtp = useCallback(async (phone) => {
    try {
      await authAPI.sendOtp(phone);
      toast.success('OTP sent to ' + phone);
      return { success: true };
    } catch (err) {
      toast.error(err.message || 'Failed to send OTP');
      return { success: false, error: err.message };
    }
  }, []);

  // ─── Verify OTP ───────────────────────────────────────────────────────────
  const verifyOtp = useCallback(async (phone, otp) => {
    try {
      const res = await authAPI.verifyOtp(phone, otp);
      return { success: true, data: res };
    } catch (err) {
      toast.error('Invalid OTP. Please try again.');
      return { success: false, error: err.message };
    }
  }, []);

  // ─── Login ─────────────────────────────────────────────────────────────────
  const login = useCallback(async (phone, password) => {
    try {
      const res = await authAPI.login(phone, password);
      const { user: userData, token } = res;
      localStorage.setItem('malonda_token', token);
      localStorage.setItem('malonda_user', JSON.stringify(userData));
      setUser(userData);
      setVerificationLevel(userData.verificationLevel || 'basic');
      toast.success('Welcome back, ' + userData.name.split(' ')[0] + '!');
      return { success: true };
    } catch (err) {
      toast.error(err.message || 'Login failed');
      return { success: false, error: err.message };
    }
  }, []);

  // ─── Register ─────────────────────────────────────────────────────────────
  const register = useCallback(async (formData) => {
    try {
      const res = await authAPI.register(formData);
      const { user: userData, token } = res;
      localStorage.setItem('malonda_token', token);
      localStorage.setItem('malonda_user', JSON.stringify(userData));
      setUser(userData);
      setVerificationLevel('basic');
      toast.success('Account created! Welcome to Malonda 🎉');
      return { success: true };
    } catch (err) {
      toast.error(err.message || 'Registration failed');
      return { success: false, error: err.message };
    }
  }, []);

  // ─── Logout ────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    try { await authAPI.logout(); } catch {}
    localStorage.removeItem('malonda_token');
    localStorage.removeItem('malonda_user');
    setUser(null);
    setVerificationLevel('basic');
    toast('Logged out successfully');
  }, []);

  // ─── Update user in state and localStorage ────────────────────────────────
  const updateUser = useCallback((updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('malonda_user', JSON.stringify(updated));
      return updated;
    });
    if (updates.verificationLevel) setVerificationLevel(updates.verificationLevel);
  }, []);

  const value = {
    user,
    loading,
    verificationLevel,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isSeller: user?.isSeller || false,
    sendOtp,
    verifyOtp,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
