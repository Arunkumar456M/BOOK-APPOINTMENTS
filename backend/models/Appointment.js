import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    time: { type: String, required: true }, // e.g. "10:00 AM"
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    notes: { type: String },
    status: { type: String, enum: ['upcoming', 'completed', 'cancelled'], default: 'upcoming' },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'refunded'], default: 'pending' },
    paymentProvider: { type: String, enum: ['stripe', 'razorpay', 'none'], default: 'none' },
    amount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

appointmentSchema.index({ service: 1, date: 1, time: 1 }, { unique: false });

export default mongoose.model('Appointment', appointmentSchema);
