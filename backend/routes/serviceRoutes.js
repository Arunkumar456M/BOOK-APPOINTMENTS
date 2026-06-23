import express from 'express';
import Service from '../models/Service.js';
import { protect, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const services = await Service.find({ active: true });
    res.json({ services });
  } catch (err) {
    next(err);
  }
});

router.post('/', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ service });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ service });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', protect, requireRole('admin'), async (req, res, next) => {
  try {
    await Service.findByIdAndUpdate(req.params.id, { active: false });
    res.json({ message: 'Service deactivated' });
  } catch (err) {
    next(err);
  }
});

export default router;
