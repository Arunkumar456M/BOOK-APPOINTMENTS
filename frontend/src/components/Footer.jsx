import { Link } from 'react-router-dom';
import { CalendarCheck2, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const social = [
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' }
];

export default function Footer() {
  return (
    <footer className="border-t border-navy-900/5 bg-navy-950 text-ice/80 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-display text-lg font-bold text-white">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500">
                <CalendarCheck2 size={18} />
              </span>
              ProBook
            </div>
            <p className="mt-4 max-w-xs text-sm text-ice/60">
              The fast, modern way for people and professionals to book appointments online.
            </p>
            <div className="mt-5 flex gap-3">
              {social.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 transition hover:border-brand-400 hover:text-brand-400"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-white">Product</h4>
            <ul className="mt-4 space-y-2 text-sm text-ice/60">
              <li><Link to="/services" className="hover:text-brand-400">Services</Link></li>
              <li><Link to="/book" className="hover:text-brand-400">Book Appointment</Link></li>
              <li><Link to="/dashboard" className="hover:text-brand-400">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-white">Company</h4>
            <ul className="mt-4 space-y-2 text-sm text-ice/60">
              <li><a href="#" className="hover:text-brand-400">About</a></li>
              <li><a href="#" className="hover:text-brand-400">Careers</a></li>
              <li><a href="#" className="hover:text-brand-400">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-white">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm text-ice/60">
              <li><a href="#" className="hover:text-brand-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-400">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-ice/50 md:flex-row">
          <p>© {new Date().getFullYear()} ProBook Appointments. All rights reserved.</p>
          <p>Built with React, Tailwind CSS &amp; Node.js</p>
        </div>
      </div>
    </footer>
  );
}
