import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  category: { type: String, required: true, trim: true },

  paymentMethod: {
    type: String,
    enum: ["Cash", "UPI", "Debit Card", "Credit Card"],
    default: "Cash",
  },
  
  amount: { type: Number, required: true, min: 0 },
  description: { type: String, required: true, trim: true },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);
