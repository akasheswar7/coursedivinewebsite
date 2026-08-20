import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Tag, ArrowRight, ShieldCheck, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

const Cart = () => {
  const {
    cartItems,
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
    cartCount
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const { showToast } = useNotification();
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      showToast(res.message, 'success');
      setCouponInput('');
    } else {
      showToast(res.message, 'error');
    }
  };

  if (cartCount === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">Your Cart is Currently Empty</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Explore our Learning Lounge to discover industry-led courses and start accelerating your tech career.
        </p>
        <div className="pt-2">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition"
          >
            Explore Courses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Shopping Cart ({cartCount} Courses)</h1>
        <p className="text-xs text-slate-500 mt-1">Review your selected courses before proceeding to secure checkout.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80';
                  }}
                  className="w-20 h-14 rounded-xl object-cover border border-slate-100 shrink-0 bg-slate-100"
                />
                <div>
                  <Link to={`/courses/${item.slug}`}>
                    <h3 className="font-bold text-slate-900 text-sm hover:text-brand-600 transition line-clamp-1">
                      {item.title}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <span>{item.category}</span>
                    <span>•</span>
                    <span>{item.duration || 'Full Lifetime Access'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                <div className="text-right">
                  <div className="text-base font-extrabold text-slate-900">
                    ${(item.discountPrice || item.price).toLocaleString('en-US')}.00
                  </div>
                  {item.discountPrice && item.price > item.discountPrice && (
                    <div className="text-xs text-slate-400 line-through">
                      ${item.price.toLocaleString('en-US')}.00
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    removeFromCart(item._id);
                    showToast('Course removed from cart', 'info');
                  }}
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                  title="Remove from cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between pt-2">
            <Link
              to="/courses"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-600"
            >
              <ArrowLeft className="w-4 h-4" /> Add More Courses
            </Link>
            <button
              onClick={() => {
                clearCart();
                showToast('Cart cleared', 'info');
              }}
              className="text-xs text-rose-600 hover:underline font-semibold"
            >
              Clear Entire Cart
            </button>
          </div>
        </div>

        {/* Right Column: Order Summary & Coupon in US Dollars */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-200 shadow-xl space-y-6">
            <h3 className="text-lg font-extrabold text-slate-900">Order Summary (USD)</h3>

            {/* Price Calculations */}
            <div className="space-y-3 text-xs text-slate-600 border-b border-slate-100 pb-4">
              <div className="flex justify-between">
                <span>Original Price</span>
                <span>${subtotal.toLocaleString('en-US')}.00</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Course Discount</span>
                <span>- ${courseDiscount.toLocaleString('en-US')}.00</span>
              </div>
              {coupon && (
                <div className="flex justify-between text-brand-600 font-semibold">
                  <span>Coupon ({coupon} - {discountPercent}%)</span>
                  <span>- ${couponDiscount.toLocaleString('en-US')}.00</span>
                </div>
              )}
            </div>

            {/* Total Amount */}
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-bold text-slate-900">Final Payable</span>
              <span className="text-2xl font-black text-slate-900 text-brand-600">
                ${finalAmount.toLocaleString('en-US')}.00
              </span>
            </div>



            {/* Coupon Box */}
            <div className="pt-2">
              {coupon ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Tag className="w-4 h-4" /> {coupon} ({discountPercent}% OFF)
                  </div>
                  <button
                    onClick={() => {
                      removeCoupon();
                      showToast('Coupon removed', 'info');
                    }}
                    className="text-rose-600 font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Coupon code (DIVINE10)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs uppercase focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs transition shrink-0"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm shadow-lg shadow-brand-600/30 transition duration-200 flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>256-Bit SSL Encrypted Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
