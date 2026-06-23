import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Service from '../models/Service.js';

dotenv.config();

const services = [
  { name: 'Consultation', description: 'A focused one-on-one session to discuss your needs.', durationMinutes: 30, price: 25, icon: 'MessageSquare' },
  { name: 'Medical Appointment', description: 'Speak with a licensed practitioner.', durationMinutes: 20, price: 40, icon: 'Stethoscope' },
  { name: 'Business Meeting', description: 'Strategy and planning meeting with our advisors.', durationMinutes: 45, price: 60, icon: 'Briefcase' },
  { name: 'Online Coaching', description: 'Personalized coaching toward your goals.', durationMinutes: 60, price: 35, icon: 'Target' }
];

async function seed() {
  await connectDB();

  await Service.deleteMany({});
  await Service.insertMany(services);

  const adminExists = await User.findOne({ email: 'admin@probook.com' });
  if (!adminExists) {
    await User.create({
      name: 'Admin User',
      email: 'admin@probook.com',
      password: 'Admin@123',
      role: 'admin'
    });
  }

  console.log('Seed complete: 4 services + 1 admin user (admin@probook.com / Admin@123)');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
