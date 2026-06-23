export const services = [
  {
    id: 'consultation',
    name: 'Consultation',
    duration: '30 min',
    price: 25,
    icon: 'MessageSquare',
    description: 'A focused one-on-one session to discuss your needs and map out next steps.'
  },
  {
    id: 'medical',
    name: 'Medical Appointment',
    duration: '20 min',
    price: 40,
    icon: 'Stethoscope',
    description: 'Speak with a licensed practitioner about symptoms, prescriptions, or follow-ups.'
  },
  {
    id: 'business',
    name: 'Business Meeting',
    duration: '45 min',
    price: 60,
    icon: 'Briefcase',
    description: 'Strategy, partnership, or planning meeting with our business advisors.'
  },
  {
    id: 'coaching',
    name: 'Online Coaching',
    duration: '60 min',
    price: 35,
    icon: 'Target',
    description: 'Personalized coaching to help you reach a specific goal, one session at a time.'
  }
];

export const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM'
];

export const bookedSlotsDemo = ['10:00 AM', '02:00 PM'];

export const testimonials = [
  {
    name: 'Ananya Rao',
    role: 'Marketing Lead, Lumen Co.',
    quote: 'ProBook cut our scheduling back-and-forth to zero. Clients book themselves and show up — it just works.',
    rating: 5
  },
  {
    name: 'Dr. Marcus Chen',
    role: 'Family Physician',
    quote: 'Patients love the reminders. My no-show rate dropped by more than half in the first month.',
    rating: 5
  },
  {
    name: 'Priya Nair',
    role: 'Life Coach',
    quote: 'The dashboard makes reschedules painless. It feels built for how I actually run my practice.',
    rating: 4
  }
];

export const stats = [
  { label: 'Appointments booked', value: 128000, suffix: '+' },
  { label: 'Verified professionals', value: 3400, suffix: '+' },
  { label: 'Avg. booking time', value: 45, suffix: 's' },
  { label: 'Customer satisfaction', value: 98, suffix: '%' }
];

export const upcomingAppointmentsDemo = [
  { id: 1, service: 'Consultation', with: 'Dr. Sara Lin', date: '2026-06-25', time: '10:00 AM', status: 'upcoming' },
  { id: 2, service: 'Business Meeting', with: 'James Carter', date: '2026-06-28', time: '02:30 PM', status: 'upcoming' }
];

export const completedAppointmentsDemo = [
  { id: 3, service: 'Online Coaching', with: 'Priya Nair', date: '2026-06-10', time: '04:00 PM', status: 'completed' },
  { id: 4, service: 'Medical Appointment', with: 'Dr. Marcus Chen', date: '2026-06-02', time: '09:30 AM', status: 'completed' }
];
