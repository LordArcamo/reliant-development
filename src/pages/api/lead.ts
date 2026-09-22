export const prerender = false;

import type { APIRoute } from 'astro';
import { site } from '../../data/site';

// Delivers form submissions via Resend (https://resend.com).
// Required env var (set in Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY   — the client's Resend API key
// Optional:
//   LEAD_TO_EMAIL    — inbox that receives leads (defaults to site.email)
//   LEAD_FROM_EMAIL  — verified sender, e.g. "Reliant Development <leads@yourdomain.com>"

const field = (data: FormData, key: string) =>
  String(data.get(key) ?? '')
    .trim()
    .slice(0, 2000);

export const POST: APIRoute = async ({ request, redirect }) => {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return redirect('/contact#free-estimate', 303);
  }

  // Honeypot: humans never see the "company" field; bots fill it. Pretend success.
  if (field(data, 'company')) return redirect('/thanks', 303);

  const formName = field(data, 'form-name') || 'free-estimate';
  const first = field(data, 'first-name');
  const last = field(data, 'last-name');
  const email = field(data, 'email');
  const phone = field(data, 'phone');
  const projectType = field(data, 'project-type');
  const town = field(data, 'town');
  const message = field(data, 'message');

  const apiKey = import.meta.env.RESEND_API_KEY;
  const to = import.meta.env.LEAD_TO_EMAIL || site.email;
  const from = import.meta.env.LEAD_FROM_EMAIL || 'Reliant Development <onboarding@resend.dev>';

  let delivered = false;

  if (apiKey && first && email) {
    const subject = `New lead (${formName}) — ${first} ${last}${town ? ` · ${town}` : ''}`;
    const text = [
      `Form: ${formName}`,
      `Name: ${first} ${last}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Project type: ${projectType}`,
      `Town & state: ${town || '—'}`,
      '',
      'Message:',
      message || '—',
      '',
      `Submitted via ${site.url}`,
    ].join('\n');

    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ from, to: [to], reply_to: email, subject, text }),
      });
      delivered = res.ok;
      if (!res.ok) console.error('Resend rejected the email:', res.status, await res.text());
    } catch (err) {
      console.error('Resend request failed:', err);
    }
  } else if (!apiKey) {
    console.error('RESEND_API_KEY is not set — lead was not delivered.');
  }

  if (delivered) return redirect('/thanks', 303);

  // Never lose a lead silently: if delivery fails, tell the visitor to call.
  return new Response(
    `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Please call us — ${site.name}</title></head>
<body style="margin:0;display:flex;min-height:100vh;align-items:center;justify-content:center;background:#1b1b19;color:#f0efec;font-family:ui-sans-serif,system-ui,sans-serif;text-align:center;padding:24px;">
<div style="max-width:26rem;">
<h1 style="font-size:1.5rem;margin:0 0 0.75rem;">We couldn't send your request.</h1>
<p style="color:#c3c2bb;line-height:1.6;margin:0 0 1.25rem;">Something went wrong on our end — your details were not delivered. Please call us directly and we'll take it from there.</p>
<a href="${site.phoneHref}" style="display:inline-block;background:#e8912d;color:#161614;text-decoration:none;padding:0.8rem 1.6rem;font-weight:600;letter-spacing:0.08em;">CALL ${site.phoneDisplay}</a>
<p style="margin-top:1.25rem;"><a href="/contact" style="color:#8f8e88;">Back to contact</a></p>
</div></body></html>`,
    { status: 502, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
};
