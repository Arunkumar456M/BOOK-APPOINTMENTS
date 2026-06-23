import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarCheck2, Menu, X, Moon, SunMedium, LayoutDashboard, ShieldCheck, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/book', label: 'Book Appointment' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { dark, toggleDark } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-navy-900/5 bg-white/80 backdrop-blur-lg dark:border-white/10 dark:bg-navy-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-white shadow-glow">
            <CalendarCheck2 size={18} />
          </span>
          ProBook
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-brand-500 ${
                  isActive ? 'text-brand-500' : 'text-navy-700 dark:text-ice/80'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            aria-label="Toggle dark mode"
            onClick={toggleDark}
            className="grid h-10 w-10 place-items-center rounded-full border border-navy-900/10 text-navy-700 transition hover:border-brand-500/40 hover:text-brand-500 dark:border-white/10 dark:text-ice/80"
          >
            {dark ? <SunMedium size={18} /> : <Moon size={18} />}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <Link to="/dashboard" className="btn-secondary !px-4 !py-2 text-sm">
                <LayoutDashboard size={16} /> Dashboard
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="btn-secondary !px-4 !py-2 text-sm">
                  <ShieldCheck size={16} /> Admin
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="grid h-10 w-10 place-items-center rounded-full border border-navy-900/10 text-navy-700 transition hover:border-red-400 hover:text-red-500 dark:border-white/10 dark:text-ice/80"
                aria-label="Log out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-navy-700 hover:text-brand-500 dark:text-ice/80">
                Log in
              </Link>
              <Link to="/book" className="btn-primary !px-5 !py-2.5 text-sm">
                Book Appointment
              </Link>
            </>
          )}
        </div>

        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-navy-900/5 bg-white px-5 py-4 dark:border-white/10 dark:bg-navy-950 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {links.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-sm font-medium text-navy-700 dark:text-ice/80">
                  {l.label}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-2">
                <button onClick={toggleDark} className="btn-secondary !px-4 !py-2 text-sm">
                  {dark ? <SunMedium size={16} /> : <Moon size={16} />} Theme
                </button>
                {user ? (
                  <Link to="/dashboard" onClick={() => setOpen(false)} className="btn-primary !px-4 !py-2 text-sm">
                    Dashboard
                  </Link>
                ) : (
                  <Link to="/login" onClick={() => setOpen(false)} className="btn-primary !px-4 !py-2 text-sm">
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
