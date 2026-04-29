import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ── Equifax sandbox credentials (move to env vars for production) ──────────
const EFX_CLIENT_ID     = process.env.EQUIFAX_CLIENT_ID     ?? 'jhTI62qfA6vG8xJdkrJYulOdARvF';
const EFX_CLIENT_SECRET = process.env.EQUIFAX_CLIENT_SECRET ?? 'jdaapZkOP01ZMrC6V2E79QQOZbsGh4Zd';
const EFX_SUBSCRIBER_ID = process.env.EQUIFAX_SUBSCRIBER_ID ?? 'qPOl7LC9i7qNycVZ';
const EFX_TOKEN_URL     = 'https://api.sandbox.equifax.com/v2/oauth/token';
const EFX_PREQUAL_URL   = 'https://api.sandbox.equifax.com/business/prequal-of-one/v1/consumers';

const RESEND_KEY    = process.env.RESEND_API_KEY!;
const SUPA_URL      = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPA_SVC      = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const AGENT_SECRET  = process.env.CW_AGENT_SECRET!;

// ── OAuth2 token ──────────────────────────────────────────────────────────
async function getEquifaxToken(): Promise<string> {
  const creds = Buffer.from(`${EFX_CLIENT_ID}:${EFX_CLIENT_SECRET}`).toString('base64');
  const res = await fetch(EFX_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${creds}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials&scope=https%3A%2F%2Fapi.equifax.com%2Fbusiness%2Fprequal-of-one%2Fv1',
  });
  if (!res.ok) throw new Error(`Equifax token error ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.access_token;
}

// ── Score decision ────────────────────────────────────────────────────────
function scoreDecision(score: number | null): {
  decision: 'approved' | 'review' | 'declined';
  badge_color: string;
  client_message: string;
} {
  if (score === null) return {
    decision: 'review',
    badge_color: 'amber',
    client_message: 'We were unable to retrieve your credit information at this time. A team member will follow up within 1 business day.',
  };
  if (score >= 640) return {
    decision: 'approved',
    badge_color: 'green',
    client_message: 'Congratulations! Based on your credit profile, you appear to pre-qualify for financing. A Crestwell team member will contact you within 1 business day to finalize your terms.',
  };
  if (score >= 580) return {
    decision: 'review',
    badge_color: 'amber',
    client_message: 'Your application is under review. A Crestwell team member will contact you within 1–2 business days to discuss your options.',
  };
  return {
    decision: 'declined',
    badge_color: 'red',
    client_message: 'Unfortunately, we are unable to offer financing at this time based on your current credit profile. You may reapply in 90 days or contact us to discuss alternative payment options.',
  };
}

// ── Send email via Resend ─────────────────────────────────────────────────
async function sendEmail(to: string, subject: string, html: string, from = 'Tim Crestwell <info@crestwellgetaways.com>') {
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], reply_to: 'info@crestwellgetaways.com', subject, html }),
  });
}

// ── Main handler ──────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Validate agent secret (called server-side only, but belt-and-suspenders)
  const secret = req.headers.get('x-agent-secret');
  if (secret && secret !== AGENT_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { application_id } = await req.json().catch(() => ({}));
  if (!application_id) {
    return NextResponse.json({ error: 'application_id required' }, { status: 400 });
  }

  const db = createClient(SUPA_URL, SUPA_SVC);

  // Fetch application
  const { data: app, error: fetchErr } = await db
    .from('loan_applications')
    .select('*')
    .eq('id', application_id)
    .single();
  if (fetchErr || !app) {
    return NextResponse.json({ error: 'Application not found' }, { status: 404 });
  }

  let efxScore: number | null = null;
  let efxReasons: string[]    = [];
  let efxRaw: any             = null;
  let efxError: string | null = null;

  try {
    const token = await getEquifaxToken();

    const prequal_body = {
      subscribers: [{ subscriberCode: EFX_SUBSCRIBER_ID, memberCode: EFX_SUBSCRIBER_ID }],
      consumers: [{
        name: { firstName: app.first_name, lastName: app.last_name },
        addresses: [{
          houseNumber: app.address_line1?.split(' ')[0] || '',
          streetName:  app.address_line1?.split(' ').slice(1).join(' ') || '',
          city:        app.city  || '',
          state:       app.state || '',
          zip:         app.zip_code?.replace(/\D/g, '').substring(0, 5) || '',
        }],
        dateOfBirth: app.date_of_birth
          ? app.date_of_birth.replace(/-/g, '')
          : undefined,
        socialNum: app.ssn_last_four
          ? `XXX-XX-${app.ssn_last_four}`
          : undefined,
      }],
      prequalification: {
        loanAmount:  Math.round((app.loan_amount_requested || 0) * 100),
        loanType:    'PERSONAL',
        downPayment: Math.round((app.down_payment || 0) * 100),
      },
    };

    const efxRes = await fetch(EFX_PREQUAL_URL, {
      method: 'POST',
      headers: {
        'Authorization':  `Bearer ${token}`,
        'Content-Type':   'application/json',
        'Accept':         'application/json',
      },
      body: JSON.stringify(prequal_body),
    });

    efxRaw = await efxRes.json();

    if (efxRes.ok) {
      const consumer = efxRaw?.consumers?.[0] ?? efxRaw?.consumer ?? efxRaw;
      efxScore =
        consumer?.equifaxUSConsumerCreditReport?.[0]?.creditScore?.[0]?.results ??
        consumer?.creditScore ??
        consumer?.score ??
        null;

      const rawReasons =
        consumer?.equifaxUSConsumerCreditReport?.[0]?.riskBasedPricingOrModelIndicator ??
        consumer?.reasons ??
        [];
      efxReasons = Array.isArray(rawReasons)
        ? rawReasons.map((r: any) => r.code || r.reasonCode || String(r)).filter(Boolean)
        : [];
    } else {
      efxError = `Equifax API ${efxRes.status}: ${JSON.stringify(efxRaw).substring(0, 300)}`;
      console.error('[equifax-prequal]', efxError);
    }
  } catch (e: any) {
    efxError = `Equifax call failed: ${e.message}`;
    console.error('[equifax-prequal]', efxError);
  }

  const { decision, client_message, badge_color } = scoreDecision(efxScore);
  const scoreDisplay   = efxScore ? `Score: ${efxScore}` : 'Score: Unavailable';
  const decisionEmoji  = decision === 'approved' ? '✅' : decision === 'review' ? '⚠️' : '❌';
  const decisionColor  = decision === 'approved' ? '#16a34a' : decision === 'review' ? '#ca8a04' : '#dc2626';
  const decisionBg     = decision === 'approved' ? '#dcfce7'  : decision === 'review' ? '#fef9c3'  : '#fee2e2';

  // Update DB
  await db.from('loan_applications').update({
    equifax_score:           efxScore,
    equifax_decision:        decision,
    equifax_reasons:         efxReasons,
    equifax_raw_response:    efxRaw,
    equifax_error:           efxError,
    equifax_checked_at:      new Date().toISOString(),
    equifax_client_message:  client_message,
    ...(decision === 'declined' ? { status: 'auto_declined' } : {}),
  }).eq('id', application_id);

  const monthlyDebts = (app.monthly_rent_mortgage || 0)
    + (app.monthly_car_payment || 0)
    + (app.monthly_other_debt  || 0);

  // ── Email Tim ────────────────────────────────────────────────────────────
  await sendEmail(
    'info@crestwellgetaways.com',
    `${decisionEmoji} Equifax Pre-Qual: ${app.first_name} ${app.last_name} — ${decision.toUpperCase()} (${scoreDisplay})`,
    `<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;">
      <div style="background:#0D1B2A;padding:24px 32px;">
        <span style="color:#C9A84C;font-size:1rem;font-family:Georgia,serif;">Crestwell</span>
        <span style="color:rgba(255,255,255,0.5);font-size:0.8rem;font-family:Arial,sans-serif;"> &mdash; Equifax Pre-Qualification Result</span>
      </div>
      <div style="padding:32px;background:#faf8f3;">
        <h2 style="margin:0 0 4px;color:#0D1B2A;font-family:Georgia,serif;">${app.first_name} ${app.last_name}</h2>
        <p style="color:#64748b;font-size:0.85rem;margin:0 0 24px;font-family:Arial,sans-serif;">
          App #${app.application_number || application_id.substring(0,8).toUpperCase()}
          &nbsp;&middot;&nbsp; Loan: $${(app.loan_amount_requested || 0).toLocaleString()}
          &nbsp;&middot;&nbsp; ${app.trip_description || app.loan_purpose || ''}
        </p>
        <div style="background:${decisionBg};border-left:4px solid ${decisionColor};padding:16px 20px;margin-bottom:24px;border-radius:0 6px 6px 0;">
          <div style="font-size:1.1rem;font-weight:700;color:#0D1B2A;margin-bottom:4px;">${decisionEmoji} ${decision.toUpperCase()}</div>
          <div style="font-size:0.9rem;color:#374151;font-family:Arial,sans-serif;">
            ${scoreDisplay}
            ${efxReasons.length ? `&nbsp;&middot;&nbsp; Reasons: ${efxReasons.slice(0,3).join(', ')}` : ''}
          </div>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:0.85rem;font-family:Arial,sans-serif;">
          <tr style="background:#f1f5f9;"><td style="padding:8px 12px;font-weight:600;color:#0D1B2A;width:40%;">Loan Requested</td><td style="padding:8px 12px;color:#374151;">$${(app.loan_amount_requested||0).toLocaleString()}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:600;color:#0D1B2A;">Down Payment</td><td style="padding:8px 12px;color:#374151;">$${(app.down_payment||0).toLocaleString()}</td></tr>
          <tr style="background:#f1f5f9;"><td style="padding:8px 12px;font-weight:600;color:#0D1B2A;">Monthly Income</td><td style="padding:8px 12px;color:#374151;">$${(app.monthly_income||0).toLocaleString()}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:600;color:#0D1B2A;">Monthly Debts</td><td style="padding:8px 12px;color:#374151;">$${monthlyDebts.toLocaleString()}</td></tr>
          <tr style="background:#f1f5f9;"><td style="padding:8px 12px;font-weight:600;color:#0D1B2A;">Employment</td><td style="padding:8px 12px;color:#374151;">${app.employment_status||'—'} — ${app.employer_name||'—'}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:600;color:#0D1B2A;">Travel Date</td><td style="padding:8px 12px;color:#374151;">${app.travel_date||'—'}</td></tr>
        </table>
        <div style="margin-top:20px;padding:14px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:4px;">
          <p style="font-size:0.8rem;color:#1e40af;margin:0;font-family:Arial,sans-serif;"><strong>Message sent to client:</strong> "${client_message}"</p>
        </div>
        ${efxError ? `<div style="margin-top:16px;padding:12px;background:#fee2e2;border:1px solid #fca5a5;border-radius:4px;"><p style="font-size:0.78rem;color:#dc2626;margin:0;font-family:Arial,sans-serif;"><strong>API Error:</strong> ${efxError}</p></div>` : ''}
      </div>
      <div style="background:#0D1B2A;padding:12px 32px;text-align:center;">
        <p style="color:rgba(255,255,255,0.3);font-family:Arial,sans-serif;font-size:0.7rem;margin:0;">Crestwell &middot; Equifax Pre-Qual of One &middot; Sandbox</p>
      </div>
    </div>`,
    'Crestwell AI <noreply@crestwellgetaways.com>'
  ).catch(console.error);

  // ── Email client ─────────────────────────────────────────────────────────
  if (app.email) {
    await sendEmail(
      app.email,
      'Your Crestwell Financing Application — Update',
      `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#0D1B2A;padding:28px 36px;">
          <div style="font-family:Georgia,serif;font-size:28px;color:white;">Crestwell</div>
          <div style="font-size:11px;color:#C9A84C;letter-spacing:0.2em;text-transform:uppercase;margin-top:4px;">Travel Services</div>
          <div style="height:2px;background:linear-gradient(90deg,#C9A84C,transparent);margin-top:14px;"></div>
        </div>
        <div style="padding:36px;background:white;">
          <p style="font-family:Georgia,serif;font-size:22px;color:#0D1B2A;margin:0 0 16px;">Hi ${app.first_name},</p>
          <p style="font-size:14px;color:#4A5568;line-height:1.8;margin:0 0 20px;">
            Thank you for submitting your financing application. We have completed an initial review of your credit profile.
          </p>
          <div style="background:${decisionBg};border-left:4px solid ${decisionColor};padding:18px 22px;margin-bottom:24px;border-radius:0 6px 6px 0;">
            <p style="font-size:14px;color:#1f2937;line-height:1.8;margin:0;">${client_message}</p>
          </div>
          <p style="font-size:13px;color:#6b7280;line-height:1.7;margin:0 0 24px;">
            Questions? Reply to this email or call us at <strong>888.508.6893</strong>. We&apos;re here to help.
          </p>
          <table cellpadding="0" cellspacing="0"><tr>
            <td style="padding-right:12px;">
              <a href="mailto:info@crestwellgetaways.com?subject=Financing%20%E2%80%93%20${encodeURIComponent(app.first_name + ' ' + app.last_name)}" style="display:inline-block;background:#C9A84C;color:#0D1B2A;padding:13px 28px;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;border-radius:4px;">Reply to Tim</a>
            </td>
            <td>
              <a href="tel:8885086893" style="display:inline-block;background:#0D1B2A;color:white;padding:13px 28px;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;border-radius:4px;">Call 888.508.6893</a>
            </td>
          </tr></table>
        </div>
        <div style="background:#0D1B2A;padding:20px 36px;">
          <div style="font-family:Georgia,serif;font-size:17px;color:white;margin-bottom:3px;">Tim Crestwell</div>
          <div style="font-size:12px;color:#C9A84C;margin-bottom:6px;">Crestwell Travel Services</div>
          <div style="font-size:11px;color:rgba(255,255,255,0.4);">ASTA Member &middot; CLIA Certified &middot; crestwellgetaways.com</div>
        </div>
        <div style="background:#f8f6f0;padding:12px 36px;text-align:center;">
          <p style="font-size:10px;color:#9ca3af;margin:0;">This is a pre-qualification only and does not constitute a guarantee of financing. Final approval subject to full verification.</p>
        </div>
      </div>`
    ).catch(console.error);
  }

  return NextResponse.json({
    success: true,
    application_id,
    equifax_score:   efxScore,
    decision,
    badge_color,
    client_notified: !!app.email,
    error:           efxError ?? undefined,
  });
}
