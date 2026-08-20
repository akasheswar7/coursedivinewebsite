const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/coursedivine', {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ MongoDB Connection Error: ${error.message}`);
    console.warn('⚡ Running with mock in-memory fallback enabled if database is offline.');
    return false;
  }
};

module.exports = connectDB;
