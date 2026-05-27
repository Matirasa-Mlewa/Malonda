import React, { createContext, useContext, useState, useCallback } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [discountCode, setDiscountCode] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  const addItem = useCallback((product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        toast('Quantity updated');
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      toast.success('Added to cart!');
      return [...prev, { ...product, quantity }];
    });
  }, []);

  const removeItem = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) return removeItem(productId);
    setItems((prev) =>
      prev.map((i) => (i.id === productId ? { ...i, quantity } : i))
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
    setDiscountCode(null);
    setDiscountAmount(0);
  }, []);

  const applyDiscount = useCallback((code, amount) => {
    setDiscountCode(code);
    setDiscountAmount(amount);
    toast.success(`Discount applied: MK ${amount.toLocaleString()} off`);
  }, []);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const platformFee = Math.round(subtotal * 0.02);
  const total = subtotal + platformFee - discountAmount;
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const value = {
    items,
    itemCount,
    subtotal,
    platformFee,
    discountAmount,
    discountCode,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyDiscount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
