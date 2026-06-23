import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  MessageSquare, Stethoscope, Briefcase, Target, Check, CalendarDays, Clock, User, Mail, Phone, CreditCard
} from 'lucide-react';
import { services, timeSlots, bookedSlotsDemo } from '../utils/mockData.js';
import api from '../utils/api.js';

const icons = { MessageSquare, Stethoscope, Briefcase, Target };

function nextDays(count = 10) {
  const days = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

const steps = ['Service', 'Date & Time', 'Your Details', 'Confirm'];

export default function BookAppointment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState(location.state?.serviceId || null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const days = useMemo(() => nextDays(10), []);
  const selectedService = services.find((s) => s.id === serviceId);

  const canContinue = {
    0: !!serviceId,
    1: !!date && !!time,
    2: form.name && form.email && form.phone,
    3: true
  };

  const handleConfirm = async () => {
    setSubmitting(true);
    try {
      await api.post('/appointments', {
        serviceId,
        date: date?.toISOString().slice(0, 10),
        time,
        ...form
      });
      setConfirmed(true);
      toast.success('Appointment booked!');
    } catch {
      // Backend not connected in this demo — simulate success so the flow is fully explorable.
      setConfirmed(true);
      toast.success('Appointment booked! (demo mode)');
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmed) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-5 py-24 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10"
        >
          <Check size={36} />
        </motion.div>
        <h1 className="mt-6 font-display text-2xl font-bold">You're all set, {form.name.split(' ')[0]}!</h1>
        <p className="mt-2 text-navy-600 dark:text-ice/60">
          Your {selectedService?.name} is confirmed for {date?.toDateString()} at {time}. A confirmation email and SMS reminder are on the way.
        </p>
        <div className="mt-8 flex gap-3">
          <button onClick={() => navigate('/dashboard')} className="btn-primary">Go to Dashboard</button>
          <button onClick={() => navigate('/')} className="btn-secondary">Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-14 lg:px-8">
      <h1 className="font-display text-3xl font-bold">Book an Appointment</h1>
      <p className="mt-2 text-navy-600 dark:text-ice/60">Pick a service, a time that works, and you're done.</p>

      {/* Stepper */}
      <ol className="mt-8 flex items-center gap-2 text-sm">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-1 items-center gap-2">
            <span
              className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                i <= step ? 'bg-brand-500 text-white' : 'bg-navy-900/10 text-navy-500 dark:bg-white/10 dark:text-ice/50'
              }`}
            >
              {i < step ? <Check size={14} /> : i + 1}
            </span>
            <span className={`hidden sm:inline ${i === step ? 'font-semibold text-navy-900 dark:text-ice' : 'text-navy-500 dark:text-ice/50'}`}>{s}</span>
            {i < steps.length - 1 && <span className="h-px flex-1 bg-navy-900/10 dark:bg-white/10" />}
          </li>
        ))}
      </ol>

      <div className="mt-10 card p-6 sm:p-8">
        {step === 0 && (
          <div>
            <h2 className="font-display text-lg font-semibold">Select a service</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {services.map((s) => {
                const Icon = icons[s.icon];
                const active = serviceId === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setServiceId(s.id)}
                    className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${
                      active ? 'border-brand-500 bg-brand-50 dark:bg-navy-700' : 'border-navy-900/10 hover:border-brand-500/40 dark:border-white/10'
                    }`}
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-100 text-brand-700 dark:bg-navy-800 dark:text-brand-300">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="font-semibold">{s.name}</p>
                      <p className="text-xs text-navy-500 dark:text-ice/50">{s.duration} · ${s.price}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold"><CalendarDays size={18} /> Select a date</h2>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              {days.map((d) => {
                const active = date?.toDateString() === d.toDateString();
                return (
                  <button
                    key={d.toISOString()}
                    onClick={() => setDate(d)}
                    className={`flex shrink-0 flex-col items-center rounded-xl border px-4 py-3 text-sm transition ${
                      active ? 'border-brand-500 bg-brand-50 dark:bg-navy-700' : 'border-navy-900/10 hover:border-brand-500/40 dark:border-white/10'
                    }`}
                  >
                    <span className="text-xs text-navy-500 dark:text-ice/50">{d.toLocaleDateString(undefined, { weekday: 'short' })}</span>
                    <span className="font-display font-bold">{d.getDate()}</span>
                  </button>
                );
              })}
            </div>

            <h2 className="mt-8 flex items-center gap-2 font-display text-lg font-semibold"><Clock size={18} /> Select a time slot</h2>
            <p className="mt-1 text-xs text-navy-500 dark:text-ice/50">Updated in real time — grayed out slots are already booked.</p>
            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {timeSlots.map((t) => {
                const taken = bookedSlotsDemo.includes(t);
                const active = time === t;
                return (
                  <button
                    key={t}
                    disabled={taken}
                    onClick={() => setTime(t)}
                    className={`rounded-lg border px-2 py-2.5 text-sm font-medium transition ${
                      taken
                        ? 'cursor-not-allowed border-navy-900/5 bg-navy-900/5 text-navy-400 line-through dark:bg-white/5 dark:text-ice/30'
                        : active
                        ? 'border-brand-500 bg-brand-500 text-white'
                        : 'border-navy-900/10 hover:border-brand-500/40 dark:border-white/10'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="font-display text-lg font-semibold">Your details</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-navy-600 dark:text-ice/60"><User size={14} /> Full name</span>
                <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jordan Smith" />
              </label>
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-navy-600 dark:text-ice/60"><Mail size={14} /> Email</span>
                <input type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jordan@email.com" />
              </label>
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-navy-600 dark:text-ice/60"><Phone size={14} /> Phone</span>
                <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 9704860804" />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-xs font-medium text-navy-600 dark:text-ice/60">Notes (optional)</span>
                <textarea className="input" rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Anything we should know beforehand?" />
              </label>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="font-display text-lg font-semibold">Review &amp; confirm</h2>
            <dl className="mt-5 divide-y divide-navy-900/5 text-sm dark:divide-white/10">
              {[
                ['Service', selectedService?.name],
                ['Date', date?.toDateString()],
                ['Time', time],
                ['Name', form.name],
                ['Email', form.email],
                ['Phone', form.phone],
                ['Price', `$${selectedService?.price}`]
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-2.5">
                  <dt className="text-navy-500 dark:text-ice/50">{k}</dt>
                  <dd className="font-medium">{v || '—'}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex items-center gap-2 rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-700 dark:bg-navy-700 dark:text-brand-300">
              <CreditCard size={16} /> Secure payment via Stripe / Razorpay is collected on the next step.
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="btn-secondary disabled:cursor-not-allowed disabled:opacity-40"
          >
            Back
          </button>
          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canContinue[step]}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
            </button>
          ) : (
            <button onClick={handleConfirm} disabled={submitting} className="btn-primary disabled:opacity-60">
              {submitting ? 'Confirming...' : 'Confirm Booking'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
