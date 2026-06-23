import { useState } from 'react';
import { Users, Settings2, CalendarRange, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';
import { services, upcomingAppointmentsDemo, completedAppointmentsDemo } from '../utils/mockData.js';

const usersDemo = [
  { id: 1, name: 'Jordan Smith', email: 'jordan@email.com', role: 'customer', joined: '2026-04-02' },
  { id: 2, name: 'Dr. Sara Lin', email: 'sara@probook.com', role: 'provider', joined: '2026-01-12' },
  { id: 3, name: 'Admin User', email: 'admin@probook.com', role: 'admin', joined: '2025-11-30' }
];

const revenueByMonth = [
  { m: 'Jan', v: 3200 }, { m: 'Feb', v: 4100 }, { m: 'Mar', v: 3800 },
  { m: 'Apr', v: 5200 }, { m: 'May', v: 6100 }, { m: 'Jun', v: 7300 }
];

const tabs = [
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'appointments', label: 'Appointments', icon: CalendarRange },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'services', label: 'Services', icon: Settings2 }
];

export default function AdminPanel() {
  const [tab, setTab] = useState('analytics');
  const allAppointments = [...upcomingAppointmentsDemo, ...completedAppointmentsDemo];
  const maxRevenue = Math.max(...revenueByMonth.map((r) => r.v));

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
      <h1 className="font-display text-3xl font-bold">Admin Panel</h1>
      <p className="mt-1 text-navy-600 dark:text-ice/60">Manage users, services, appointments and view performance.</p>

      <div className="mt-6 flex gap-2 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
              tab === t.id ? 'bg-brand-500 text-white' : 'bg-navy-900/5 text-navy-600 dark:bg-white/5 dark:text-ice/60'
            }`}
          >
            <t.icon size={15} /> {t.label}
          </button>
        ))}
      </div>

      {tab === 'analytics' && (
        <div className="mt-8 space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Total revenue', value: '$29,700', icon: DollarSign, color: 'text-emerald-500' },
              { label: 'Appointments this month', value: '312', icon: CalendarRange, color: 'text-brand-500' },
              { label: 'Growth', value: '+18.2%', icon: TrendingUp, color: 'text-amber-500' }
            ].map((c) => (
              <div key={c.label} className="card flex items-center gap-4 p-5">
                <span className={`grid h-11 w-11 place-items-center rounded-xl bg-navy-900/5 dark:bg-white/5 ${c.color}`}>
                  <c.icon size={20} />
                </span>
                <div>
                  <p className="font-display text-xl font-bold">{c.value}</p>
                  <p className="text-xs text-navy-500 dark:text-ice/50">{c.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="card p-6">
            <h3 className="font-display font-semibold">Revenue (last 6 months)</h3>
            <div className="mt-6 flex items-end gap-4">
              {revenueByMonth.map((r) => (
                <div key={r.m} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-brand-600 to-brand-400"
                    style={{ height: `${(r.v / maxRevenue) * 140}px` }}
                  />
                  <span className="text-xs text-navy-500 dark:text-ice/50">{r.m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'appointments' && (
        <div className="mt-8 overflow-hidden rounded-xl2 border border-navy-900/5 dark:border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-navy-900/[0.03] text-xs uppercase text-navy-500 dark:bg-white/5 dark:text-ice/50">
              <tr>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">With</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-900/5 dark:divide-white/10">
              {allAppointments.map((a) => (
                <tr key={a.id}>
                  <td className="px-4 py-3 font-medium">{a.service}</td>
                  <td className="px-4 py-3">{a.with}</td>
                  <td className="px-4 py-3">{a.date} · {a.time}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      a.status === 'upcoming' ? 'bg-brand-50 text-brand-600 dark:bg-navy-700' : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10'
                    }`}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'users' && (
        <div className="mt-8 overflow-hidden rounded-xl2 border border-navy-900/5 dark:border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-navy-900/[0.03] text-xs uppercase text-navy-500 dark:bg-white/5 dark:text-ice/50">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-900/5 dark:divide-white/10">
              {usersDemo.map((u) => (
                <tr key={u.id}>
                  <td className="px-4 py-3 font-medium">{u.name}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3 capitalize">{u.role}</td>
                  <td className="px-4 py-3">{u.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'services' && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.id} className="card p-5">
              <p className="font-display font-semibold">{s.name}</p>
              <p className="mt-1 text-xs text-navy-500 dark:text-ice/50">{s.duration} · ${s.price}</p>
              <button className="mt-4 w-full rounded-full border border-navy-900/10 py-2 text-xs font-semibold hover:border-brand-500/40 hover:text-brand-500 dark:border-white/10">
                Edit Service
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
