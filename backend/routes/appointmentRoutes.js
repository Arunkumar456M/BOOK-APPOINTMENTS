import express from 'express';
import Appointment from '../models/Appointment.js';
import Service from '../models/Service.js';
import { protect, requireRole } from '../middleware/auth.js';
import { sendEmail, appointmentConfirmationEmail } from '../utils/email.js';
import { sendSms } from '../utils/sms.js';

const router = express.Router();

const ALL_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM'
];

// GET real-time availability for a service + date
router.get('/availability', async (req, res, next) => {
  try {
    const { serviceId, date } = req.query;
    if (!serviceId || !date) return res.status(400).json({ message: 'serviceId and date are required' });

    const booked = await Appointment.find({ service: serviceId, date, status: { $ne: 'cancelled' } }).select('time');
    const bookedTimes = booked.map((b) => b.time);
    const available = ALL_SLOTS.filter((s) => !bookedTimes.includes(s));

    res.json({ available, booked: bookedTimes });
  } catch (err) {
    next(err);
  }
});

// CREATE booking (protected — attaches to logged in customer)
router.post('/', protect, async (req, res, next) => {
  try {
    const { serviceId, date, time, name, email, phone, notes } = req.body;

    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    const clash = await Appointment.findOne({ service: serviceId, date, time, status: { $ne: 'cancelled' } });
    if (clash) return res.status(409).json({ message: 'This time slot was just booked. Please pick another.' });

    const appointment = await Appointment.create({
      customer: req.user._id,
      service: serviceId,
      date,
      time,
      name,
      email,
      phone,
      notes,
      amount: service.price
    });

    const { subject, html } = appointmentConfirmationEmail({ name, serviceName: service.name, date, time });
    await sendEmail({ to: email, subject, html });
    await sendSms({ to: phone, body: `ProBook: Your ${service.name} is confirmed for ${date} at ${time}.` });

    res.status(201).json({ appointment });
  } catch (err) {
    next(err);
  }
});

// LIST appointments for logged in user
router.get('/my', protect, async (req, res, next) => {
  try {
    const appointments = await Appointment.find({ customer: req.user._id }).populate('service').sort('-createdAt');
    res.json({ appointments });
  } catch (err) {
    next(err);
  }
});

// CANCEL
router.patch('/:id/cancel', protect, async (req, res, next) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, customer: req.user._id },
      { status: 'cancelled' },
      { new: true }
    );
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ appointment });
  } catch (err) {
    next(err);
  }
});

// RESCHEDULE
router.patch('/:id/reschedule', protect, async (req, res, next) => {
  try {
    const { date, time } = req.body;
    const clash = await Appointment.findOne({ _id: { $ne: req.params.id }, date, time, status: { $ne: 'cancelled' } });
    if (clash) return res.status(409).json({ message: 'That slot is already taken' });

    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, customer: req.user._id },
      { date, time, status: 'upcoming' },
      { new: true }
    );
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ appointment });
  } catch (err) {
    next(err);
  }
});

// ADMIN: list all
router.get('/', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const appointments = await Appointment.find().populate('service customer').sort('-createdAt');
    res.json({ appointments });
  } catch (err) {
    next(err);
  }
});

export default router;
