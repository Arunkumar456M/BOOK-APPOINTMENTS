import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Sparkles } from 'lucide-react';

const quickReplies = ['How do I book an appointment?', 'Can I reschedule?', 'What payment methods do you accept?'];

function getAssistantReply(message) {
  const m = message.toLowerCase();
  if (m.includes('book')) return "Head to the Book Appointment page, pick a service, choose a date and time, and confirm — it takes about a minute.";
  if (m.includes('reschedul') || m.includes('cancel')) return 'Open your Dashboard, find the appointment under Upcoming, and use Reschedule or Cancel.';
  if (m.includes('pay')) return 'We support Stripe and Razorpay for secure online payments, plus pay-at-visit for select services.';
  if (m.includes('remind')) return "You'll get an email and SMS reminder 24 hours and 1 hour before your appointment.";
  return "I'm a demo assistant for ProBook. I can help with booking, rescheduling, payments, and reminders — what do you need?";
}

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I'm the ProBook assistant. Ask me anything about booking an appointment." }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  const send = (text) => {
    const value = text ?? input;
    if (!value.trim()) return;
    setMessages((prev) => [...prev, { from: 'user', text: value }]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: getAssistantReply(value) }]);
    }, 500);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileTap={{ scale: 0.92 }}
        aria-label="Open AI chat assistant"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-brand-500 text-white shadow-glow"
      >
        {open ? <X size={22} /> : <Bot size={22} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-5 z-50 flex h-[28rem] w-[22rem] max-w-[90vw] flex-col overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-soft dark:border-white/10 dark:bg-navy-900"
          >
            <div className="flex items-center gap-2 bg-navy-950 px-4 py-3 text-white">
              <Sparkles size={16} className="text-brand-400" />
              <span className="font-display text-sm font-semibold">ProBook Assistant</span>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                    m.from === 'bot'
                      ? 'bg-brand-50 text-navy-900 dark:bg-navy-800 dark:text-ice'
                      : 'ml-auto bg-brand-500 text-white'
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 border-t border-navy-900/5 px-3 pt-2 dark:border-white/10">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border border-navy-900/10 px-2.5 py-1 text-xs text-navy-600 hover:border-brand-500/40 hover:text-brand-500 dark:border-white/10 dark:text-ice/70"
                >
                  {q}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 border-t border-navy-900/5 p-3 dark:border-white/10"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="input !py-2"
              />
              <button type="submit" aria-label="Send message" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
