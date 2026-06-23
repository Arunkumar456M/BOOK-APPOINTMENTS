import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, Stethoscope, Briefcase, Target, Clock, ArrowRight } from 'lucide-react';
import { services } from '../utils/mockData.js';

const icons = { MessageSquare, Stethoscope, Briefcase, Target };

export default function Services() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-500">Our Services</span>
        <h1 className="mt-3 font-display text-4xl font-bold">Choose what you need help with</h1>
        <p className="mt-3 text-navy-600 dark:text-ice/60">
          Every service comes with real-time availability, instant confirmation, and reminders built in.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => {
          const Icon = icons[s.icon];
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="card flex flex-col p-6 transition hover:-translate-y-1 hover:shadow-soft"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-navy-700 dark:text-brand-300">
                <Icon size={22} />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{s.name}</h3>
              <p className="mt-2 flex-1 text-sm text-navy-600 dark:text-ice/60">{s.description}</p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="flex items-center gap-1 text-navy-500 dark:text-ice/50"><Clock size={14} /> {s.duration}</span>
                <span className="font-display font-bold text-brand-600 dark:text-brand-300">${s.price}</span>
              </div>
              <Link
                to="/book"
                state={{ serviceId: s.id }}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-navy-900/10 py-2.5 text-sm font-semibold transition hover:border-brand-500/40 hover:text-brand-500 dark:border-white/10"
              >
                Book now <ArrowRight size={14} />
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-16 card flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h3 className="font-display text-xl font-semibold">Need something custom?</h3>
          <p className="mt-1 text-sm text-navy-600 dark:text-ice/60">Tell us what you're looking for and we'll set up a tailored service for your business.</p>
        </div>
        <Link to="/book" className="btn-primary shrink-0">Request Custom Service</Link>
      </div>
    </div>
  );
}
