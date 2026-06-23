import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { CalendarClock, CheckCircle2, XCircle, RefreshCw, Search } from 'lucide-react';
import { upcomingAppointmentsDemo, completedAppointmentsDemo } from '../utils/mockData.js';

function AppointmentRow({ a, onCancel, onReschedule }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-navy-700 dark:text-brand-300">
          <CalendarClock size={18} />
        </span>
        <div>
          <p className="font-semibold">{a.service}</p>
          <p className="text-xs text-navy-500 dark:text-ice/50">with {a.with} · {a.date} · {a.time}</p>
        </div>
      </div>
      {a.status === 'upcoming' ? (
        <div className="flex gap-2">
          <button onClick={() => onReschedule(a)} className="btn-secondary !px-3 !py-1.5 text-xs"><RefreshCw size={13} /> Reschedule</button>
          <button onClick={() => onCancel(a)} className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 dark:border-red-500/30 dark:hover:bg-red-500/10">
            <XCircle size={13} /> Cancel
          </button>
        </div>
      ) : (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10">
          <CheckCircle2 size={13} /> Completed
        </span>
      )}
    </motion.div>
  );
}

export default function Dashboard() {
  const [upcoming, setUpcoming] = useState(upcomingAppointmentsDemo);
  const [completed] = useState(completedAppointmentsDemo);
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('upcoming');

  const cancel = (a) => {
    setUpcoming((prev) => prev.filter((x) => x.id !== a.id));
    toast.success('Appointment cancelled');
  };

  const reschedule = (a) => {
    toast('Pick a new time on the Book Appointment page', { icon: '📅' });
  };

  const list = (tab === 'upcoming' ? upcoming : completed).filter((a) =>
    `${a.service} ${a.with}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 lg:px-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-3xl font-bold">My Dashboard</h1>
          <p className="mt-1 text-navy-600 dark:text-ice/60">Manage your upcoming and past appointments.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search appointments..."
            className="input !pl-9"
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        {[
          { label: 'Upcoming', value: upcoming.length, color: 'text-brand-500' },
          { label: 'Completed', value: completed.length, color: 'text-emerald-500' },
          { label: 'Total spent', value: '$120', color: 'text-navy-900 dark:text-ice' }
        ].map((s) => (
          <div key={s.label} className="card p-4 text-center">
            <p className={`font-display text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-1 text-xs text-navy-500 dark:text-ice/50">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-2">
        {['upcoming', 'completed'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${
              tab === t ? 'bg-brand-500 text-white' : 'bg-navy-900/5 text-navy-600 dark:bg-white/5 dark:text-ice/60'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {list.length === 0 ? (
          <div className="card p-10 text-center text-sm text-navy-500 dark:text-ice/50">
            No {tab} appointments match your search.
          </div>
        ) : (
          list.map((a) => (
            <AppointmentRow key={a.id} a={a} onCancel={cancel} onReschedule={reschedule} />
          ))
        )}
      </div>
    </div>
  );
}
