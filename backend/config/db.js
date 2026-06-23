import mongoose from 'mongoose';

export default async function connectDB() {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/probook';
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}
