// Central Razorpay Configuration
export const getRazorpayKeyId = () => {
  // 1. Check Vite environment variable
  if (import.meta.env.VITE_RAZORPAY_KEY_ID && !import.meta.env.VITE_RAZORPAY_KEY_ID.includes('YOUR_KEY')) {
    return import.meta.env.VITE_RAZORPAY_KEY_ID;
  }
  // 2. Check localStorage custom saved key
  const savedKey = localStorage.getItem('cd_razorpay_key_id');
  if (savedKey && savedKey.startsWith('rzp_')) {
    return savedKey;
  }
  // 3. Default active Live Razorpay Merchant Key for Course Divine
  return 'rzp_live_TRzI7GDxj0adU6';
};

export const setRazorpayKeyId = (key) => {
  if (key && key.startsWith('rzp_')) {
    localStorage.setItem('cd_razorpay_key_id', key.trim());
  }
};

