import mongoose from 'mongoose';

/** Connect the Express API to the MongoDB Atlas database configured in .env. */
const connectDatabase = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured. Add it to backend/.env.');
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('MongoDB connected');
};

export default connectDatabase;
