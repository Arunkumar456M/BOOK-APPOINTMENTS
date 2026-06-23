import nodemailer from 'nodemailer';

let transporter;

function getTransporter() {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });
  return transporter;
}

export async function sendEmail({ to, subject, html }) {
  if (!process.env.EMAIL_USER) {
    console.log(`[email skipped — no SMTP configured] to=${to} subject=${subject}`);
    return;
  }
  try {
    await getTransporter().sendMail({
      from: `"ProBook Appointments" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
  } catch (err) {
    console.error('Email send failed:', err.message);
  }
}

export function appointmentConfirmationEmail({ name, serviceName, date, time }) {
  return {
    subject: 'Your ProBook appointment is confirmed',
    html: `
      <div style="font-family:Inter,sans-serif;max-width:480px;margin:auto">
        <h2 style="color:#1E50C8">Appointment confirmed</h2>
        <p>Hi ${name},</p>
        <p>Your <strong>${serviceName}</strong> appointment is booked for <strong>${date} at ${time}</strong>.</p>
        <p>We'll send you a reminder before your appointment. See you soon!</p>
        <p style="color:#64748B;font-size:12px">— The ProBook Team</p>
      </div>
    `
  };
}
