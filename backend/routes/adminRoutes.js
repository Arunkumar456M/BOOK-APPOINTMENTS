import express from 'express';
import User from '../models/User.js';
import Appointment from '../models/Appointment.js';
import { protect, requireRole } from '../middleware/auth.js';

const router = express.Router();
router.use(protect, requireRole('admin'));

router.get('/users', async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json({ users });
  } catch (err) {
    next(err);
  }
});

router.patch('/users/:id/role', async (req, res, next) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    res.json({ user });
  } catch (err) {
    next(err);
  }
});

router.get('/analytics', async (req, res, next) => {
  try {
    const totalAppointments = await Appointment.countDocuments();
    const completed = await Appointment.countDocuments({ status: 'completed' });
    const cancelled = await Appointment.countDocuments({ status: 'cancelled' });
    const revenueAgg = await Appointment.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.json({
      totalAppointments,
      completed,
      cancelled,
      totalRevenue: revenueAgg[0]?.total || 0
    });
  } catch (err) {
    next(err);
  }
});

export default router;
