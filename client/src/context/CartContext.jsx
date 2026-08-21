import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('cd_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [coupon, setCoupon] = useState(null);
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    localStorage.setItem('cd_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (course) => {
    setCartItems((prevItems) => {
      const exists = prevItems.find((item) => item._id === course._id);
      if (exists) return prevItems;
      return [...prevItems, course];
    });
  };

  const removeFromCart = (courseId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== courseId));
  };

  const clearCart = () => {
    setCartItems([]);
    setCoupon(null);
    setDiscountPercent(0);
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'DIVINE10' || cleanCode === 'PRO2026') {
      setCoupon(cleanCode);
      setDiscountPercent(10);
      return { success: true, message: '🎉 Coupon DIVINE10 applied! 10% Extra Discount unlocked.' };
    } else if (cleanCode === 'SUPER20') {
      setCoupon(cleanCode);
      setDiscountPercent(20);
      return { success: true, message: '🚀 Coupon SUPER20 applied! 20% Extra Discount unlocked.' };
    } else {
      return { success: false, message: 'Invalid or expired coupon code. Try DIVINE10' };
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    setDiscountPercent(0);
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);
  const totalOfferPrice = cartItems.reduce((acc, item) => acc + (item.discountPrice || item.price || 0), 0);
  const courseDiscount = subtotal - totalOfferPrice;
  const couponDiscount = Math.round((totalOfferPrice * discountPercent) / 100);
  const finalAmount = totalOfferPrice - couponDiscount;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        coupon,
        discountPercent,
        applyCoupon,
        removeCoupon,
        subtotal,
        totalOfferPrice,
        courseDiscount,
        couponDiscount,
        finalAmount,
        cartCount: cartItems.length,
        isInCart: (id) => cartItems.some((item) => item._id === id)
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
