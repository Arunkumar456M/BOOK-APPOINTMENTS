import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CalendarCheck2, Clock, ShieldCheck, BellRing, CreditCard, Sparkles, Star, ArrowRight, CheckCircle2
} from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter.jsx';
import { testimonials, stats } from '../utils/mockData.js';

const features = [
  {
    icon: Clock,
    title: 'Real-time availability',
    desc: 'See open slots the moment they free up — no double-booking, no back-and-forth emails.'
  },
  {
    icon: BellRing,
    title: 'Smart reminders',
    desc: 'Automatic email and SMS reminders cut no-shows so your calendar stays predictable.'
  },
  {
    icon: CreditCard,
    title: 'Secure online payments',
    desc: 'Accept payments at booking with Stripe or Razorpay, with receipts handled automatically.'
  },
  {
    icon: ShieldCheck,
    title: 'Privacy by design',
    desc: 'JWT-secured accounts and encrypted data keep every booking and detail protected.'
  },
  {
    icon: CalendarCheck2,
    title: 'Calendar sync',
    desc: 'Two-way sync with Google Calendar keeps your professional and personal schedule aligned.'
  },
  {
    icon: Sparkles,
    title: 'AI booking assistant',
    desc: 'A built-in chat assistant answers scheduling questions instantly, day or night.'
  }
];

const slots = ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30'];

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-950">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-brand-600/30 blur-3xl" />
          <div className="absolute -right-32 top-32 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-brand-300">
              <Sparkles size={14} /> Trusted by 3,400+ professionals
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Book Your Appointment <span className="text-brand-400">in Seconds</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-ice/70">
              ProBook brings consultations, medical visits, business meetings and coaching together in one
              fast, beautifully simple booking flow — for you and your clients.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/book" className="btn-primary">
                Book Appointment <ArrowRight size={18} />
              </Link>
              <Link to="/services" className="btn-secondary !border-white/15 !bg-transparent !text-white hover:!border-brand-400">
                Learn More
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-ice/60">
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-400" /> No credit card required</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-400" /> Cancel anytime</div>
            </div>
          </motion.div>

          {/* Signature element: live availability card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="animate-floaty rounded-2xl border border-white/10 bg-white p-6 shadow-2xl dark:bg-navy-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-navy-500 dark:text-ice/50">Today</p>
                  <p className="font-display text-lg font-bold text-navy-900 dark:text-ice">Dr. Sara Lin — Consultation</p>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-brand-600 dark:bg-navy-700 dark:text-brand-300">
                  <CalendarCheck2 size={18} />
                </span>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2">
                {slots.map((s, i) => {
                  const taken = i === 2 || i === 4;
                  return (
                    <div
                      key={s}
                      className={`rounded-lg border px-2 py-2 text-center text-xs font-medium ${
                        taken
                          ? 'border-navy-900/5 bg-navy-900/5 text-navy-400 line-through dark:bg-white/5 dark:text-ice/30'
                          : 'border-brand-500/30 bg-brand-50 text-brand-700 dark:bg-navy-700 dark:text-brand-300'
                      }`}
                    >
                      {s}
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs text-navy-500 dark:text-ice/50">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-pulseDot rounded-full bg-emerald-500" />
                </span>
                4 open slots — updated live
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-navy-900/5 bg-white px-4 py-3 shadow-soft dark:bg-navy-800 sm:block">
              <p className="text-xs text-navy-500 dark:text-ice/50">Confirmed</p>
              <p className="font-display text-sm font-bold text-emerald-500">Appointment Booked ✓</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Everything you need to manage bookings</h2>
          <p className="mt-3 text-navy-600 dark:text-ice/60">
            From first click to confirmation, ProBook handles the details so you can focus on the appointment itself.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="card p-6 transition hover:-translate-y-1 hover:shadow-soft"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-navy-700 dark:text-brand-300">
                <f.icon size={20} />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-navy-600 dark:text-ice/60">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="bg-navy-950 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 lg:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <AnimatedCounter value={s.value} suffix={s.suffix} />
              <p className="mt-2 text-sm text-ice/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Loved by professionals and clients alike</h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card p-6"
            >
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={16} fill="currentColor" strokeWidth={0} />)}
              </div>
              <p className="mt-4 text-sm text-navy-700 dark:text-ice/70">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-100 font-display text-sm font-bold text-brand-700 dark:bg-navy-700 dark:text-brand-300">
                  {t.name.split(' ').map((n) => n[0]).join('')}
                </span>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-navy-500 dark:text-ice/50">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 px-8 py-12 text-center text-white shadow-glow">
          <h2 className="font-display text-3xl font-bold">Ready to book your first appointment?</h2>
          <p className="mt-3 text-brand-50/90">Join thousands of clients who book in seconds, not days.</p>
          <Link to="/book" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-brand-600 transition hover:-translate-y-0.5">
            Book Appointment <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
