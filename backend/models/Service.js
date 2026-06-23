import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    durationMinutes: { type: Number, required: true, default: 30 },
    price: { type: Number, required: true, default: 0 },
    icon: { type: String, default: 'MessageSquare' },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('Service', serviceSchema);
