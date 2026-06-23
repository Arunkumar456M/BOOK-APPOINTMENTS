import twilio from 'twilio';

let client;

function getClient() {
  if (client) return client;
  if (!process.env.TWILIO_ACCOUNT_SID) return null;
  client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  return client;
}

export async function sendSms({ to, body }) {
  const c = getClient();
  if (!c) {
    console.log(`[sms skipped — no Twilio configured] to=${to} body=${body}`);
    return;
  }
  try {
    await c.messages.create({ to, from: process.env.TWILIO_PHONE_NUMBER, body });
  } catch (err) {
    console.error('SMS send failed:', err.message);
  }
}
