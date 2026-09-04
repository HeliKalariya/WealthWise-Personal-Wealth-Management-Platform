import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, trim: true },
  target: { type: Number, required: true, min: 1 },
  current: { type: Number, default: 0, min: 0 },
  targetDate: { type: Date, required: true },
  category: { type: String, default: 'Savings' },
}, { timestamps: true });

export default mongoose.model('Goal', goalSchema);
