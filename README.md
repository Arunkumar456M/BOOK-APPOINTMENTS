# ProBook Appointments

A modern, premium online appointment booking platform — React + Tailwind frontend, Node/Express + MongoDB backend, JWT auth.

```
probook/
├── frontend/    React.js + Vite + Tailwind CSS + Framer Motion
└── backend/     Node.js + Express + MongoDB + JWT
```

## What's included

**Frontend pages**: Home (hero, features, testimonials, stats), Services, Book Appointment (4-step flow with live availability), Dashboard (upcoming/completed, cancel/reschedule, search), Admin Panel (users, services, appointments, analytics + revenue chart), Login/Register (with Google sign-in button), 404.

Other features wired into the UI: dark mode toggle, AI chat assistant widget, JWT-aware API client, responsive mobile-first layout, accessible focus states, reduced-motion support.

**Backend**: REST API with JWT auth (register/login/Google), services CRUD, appointments (real-time availability, booking, cancel, reschedule), admin analytics, Stripe PaymentIntent + Razorpay order stubs, email (Nodemailer) and SMS (Twilio) notification utilities, rate limiting, Helmet security headers, Mongoose models, and a seed script.

> The frontend currently runs against **mock data** (`src/utils/mockData.js`) so every page is explorable immediately with `npm run dev`, with no backend required. Booking/login calls first try the real API and silently fall back to a demo confirmation if the backend isn't running — swap that fallback out once your API is live.

## Local setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env       # fill in MongoDB URI, JWT secret, etc.
npm run seed                # creates 4 demo services + admin@probook.com / Admin@123
npm run dev                  # starts on http://localhost:5000
```

Requires a MongoDB instance — either local (`mongodb://localhost:27017/probook`) or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster.

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env       # set VITE_API_URL to your backend URL
npm run dev                  # starts on http://localhost:5173
```

## Connecting third-party services

| Feature | What to do |
|---|---|
| Google Login | Create an OAuth Client ID in [Google Cloud Console](https://console.cloud.google.com/apis/credentials), add it to both `.env` files as `GOOGLE_CLIENT_ID` / `VITE_GOOGLE_CLIENT_ID`, and load the Google Identity Services script on the Login page to get a real `credential` token. |
| Stripe payments | Add `STRIPE_SECRET_KEY` (backend) and `VITE_STRIPE_PUBLISHABLE_KEY` (frontend). Use `@stripe/stripe-js` + `@stripe/react-stripe-js` on the confirm step to collect card details and confirm the PaymentIntent created by `/api/payments/stripe/create-intent`. |
| Razorpay payments | Add `RAZORPAY_KEY_ID`/`RAZORPAY_KEY_SECRET`, install the `razorpay` npm package, and complete the order creation in `routes/paymentRoutes.js`. |
| Email reminders | Add SMTP credentials (`EMAIL_HOST`, `EMAIL_USER`, `EMAIL_PASS` — an app password works for Gmail) to send real confirmation emails via `utils/email.js`. |
| SMS reminders | Add Twilio credentials (`TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`) to send real texts via `utils/sms.js`. |
| Google Calendar sync | Use the Google Calendar API with the same OAuth client, requesting the `calendar.events` scope, and call `calendar.events.insert` after a booking is confirmed. |
| AI Chat Assistant | The widget in `components/ChatAssistant.jsx` currently uses simple keyword matching. Swap `getAssistantReply()` for a call to the Anthropic/OpenAI API from a new backend route to make it fully generative. |

## Deployment

**Backend (Render / Railway / Fly.io / EC2)**
1. Push the `backend/` folder to its own repo (or deploy as a subdirectory).
2. Set environment variables from `.env.example` in your host's dashboard.
3. Use a managed MongoDB (Atlas) connection string for `MONGO_URI`.
4. Start command: `npm start`. Expose port via `PORT` env var (most hosts set this automatically).

**Frontend (Vercel / Netlify)**
1. Set the project root to `frontend/`.
2. Build command: `npm run build`, output directory: `dist`.
3. Set `VITE_API_URL` to your deployed backend's URL (e.g. `https://api.yourapp.com/api`).
4. Enable automatic deploys on push.

**Custom domain & HTTPS**: point your domain's DNS to Vercel/Netlify for the frontend and your backend host for the API subdomain; both platforms provision SSL automatically.

**Production checklist**
- Set strong, unique `JWT_SECRET`.
- Restrict CORS `CLIENT_URL` to your real domain.
- Turn on MongoDB Atlas IP allow-listing or VPC peering.
- Add Stripe/Razorpay webhook endpoints to confirm payments server-side rather than trusting the client.
- Put the API behind a CDN/WAF (Cloudflare) for additional protection on top of the built-in rate limiter.

## Tech stack

React.js · Tailwind CSS · Framer Motion · React Router · Axios · Node.js · Express.js · MongoDB · Mongoose · JWT · bcrypt · Nodemailer · Twilio · Stripe
