const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check if MongoDB URI is provided
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/roomieverse';
    
    console.log('Attempting to connect to MongoDB...');
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000 // 5 second timeout
    });
    
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠ MongoDB Connection Failed: ${error.message}`);
    console.warn('⚠ Running in demo mode without database persistence');
    console.warn('⚠ To enable full functionality, please install and start MongoDB');
    return false;
  }
};

module.exports = connectDB;
