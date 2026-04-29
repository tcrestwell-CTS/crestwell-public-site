import { NextRequest, NextResponse } from 'next/server';

// ── Supabase (anon key + direct REST — no service role needed) ────────────
const SUPA_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? 'https://zbtnulzvwreqzbmxulpv.supabase.co';
const SUPA_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpidG51bHp2d3JlcXpibXh1bHB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MjkzMjksImV4cCI6MjA4NjAwNTMyOX0.0PJACAXw8c8ik3_UBpBEGWXBxfLbMxh3jP1brMCCpGU';

// ── Equifax sandbox credentials ───────────────────────────────────────────
const EFX_CLIENT_ID     = process.env.EQUIFAX_CLIENT_ID     ?? 'jdaapZkOP01ZMrC6V2E79QQOZbsGh4Zd';
const EFX_CLIENT_SECRET = process.env.EQUIFAX_CLIENT_SECRET ?? 'qPOl7LC9i7qNycVZ';
const EFX_SUBSCRIBER_ID = process.env.EQUIFAX_SUBSCRIBER_ID ?? 'jhTI62qfA6vG8xJdkrJYulOdARvF';
const EFX_TOKEN_URL     = 'https://api.sandbox.equifax.com/v2/oauth/token';
const EFX_PREQUAL_URL   = 'https://api.sandbox.equifax.com/business/prequal-of-one/v1/consumers';

const RESEND_KEY = process.env.RESEND_API_KEY ?? '';

// ── Helpers ───────────────────────────────────────────────────────────────
async function supabaseGet(table: string, id: string) {
  const res = await fetch(
    `${SUPA_URL}/rest/v1/${table}?id=eq.${id}&limit=1`,
    { headers: { apikey: SUPA_ANON, Authorization: `Bearer ${SUPA_ANON}`, Accept: 'application/json' } }
  );
  const rows = await res.json();
  return Array.isArray(rows) && rows.length ? rows[0] : null;
}

async function supabasePatch(table: string, id: string, data: Record<string, unknown>) {
  await fetch(
    `${SUPA_URL}/rest/v1/${table}?id=eq.${id}`,
    {
      method: 'PATCH',
      headers: {
        apikey: SUPA_ANON,
        Authorization: `Bearer ${SUPA_ANON}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(data),
    }
  );
}

async function getEquifaxToken(): Promise<string> {
  const creds = Buffer.from(`${EFX_CLIENT_ID}:${EFX_CLIENT_SECRET}`).toString('base64');
  const res = await fetch(EFX_TOKEN_URL, {
    method: 'POST',
    headers: { Authorization: `Basic ${creds}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials&scope=https%3A%2F%2Fapi.equifax.com%2Fbusiness%2Fprequal-of-one%2Fv1',
  });
  if (!res.ok) throw new Error(`Equifax token ${res.status}: ${await res.text()}`);
  return (await res.json()).access_token;
}

function scoreDecision(score: number | null) {
  if (score === null) return {
    decision: 'review', badge_color: 'amber',
    client_message: 'We were unable to retrieve your credit information at this time. A team member will follow up within 1 business day.',
  };
  if (score >= 640) return {
    decision: 'approved', badge_color: 'green',
    client_message: 'Congratulations! Based on your credit profile, you appear to pre-qualify for financing. A Crestwell team member will contact you within 1 business day to finalize your terms.',
  };
  if (score >= 580) return {
    decision: 'review', badge_color: 'amber',
    client_message: 'Your application is under review. A Crestwell team member will contact you within 1\u20132 business days to discuss your options.',
  };
  return {
    decision: 'declined', badge_color: 'red',
    client_message: 'Unfortunately, we are unable to offer financing at this time based on your current credit profile. You may reapply in 90 days or contact us to discuss alternative payment options.',
  };
}

async function sendEmail(to: string, subject: string, html: string, from_ = 'Tim Crestwell <info@crestwellgetaways.com>') {
  if (!RESEND_KEY) return;
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: from_, to: [to], reply_to: 'info@crestwellgetaways.com', subject, html }),
  }).catch(console.error);
}

// ── Main handler ──────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const { application_id } = await req.json().catch(() => ({}));
  if (!application_id) return NextResponse.json({ error: 'application_id required' }, { status: 400 });

  const app = await supabaseGet('loan_applications', application_id);
  if (!app) return NextResponse.json({ error: 'Application not found' }, { status: 404 });

  let efxScore: number | null = null;
  let efxReasons: string[]    = [];
  let efxRaw: unknown         = null;
  let efxError: string | null = null;

  try {
    const token = await getEquifaxToken();
    const efxRes = await fetch(EFX_PREQUAL_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        subscribers: [{ subscriberCode: EFX_SUBSCRIBER_ID, memberCode: EFX_SUBSCRIBER_ID }],
        consumers: [{
          name: { firstName: app.first_name, lastName: app.last_name },
          addresses: [{
            houseNumber: app.address_line1?.split(' ')[0] || '',
            streetName:  app.address_line1?.split(' ').slice(1).join(' ') || '',
            city: app.city || '', state: app.state || '',
            zip:  (app.zip_code || '').replace(/\D/g, '').substring(0, 5),
          }],
          dateOfBirth: app.date_of_birth ? app.date_of_birth.replace(/-/g, '') : undefined,
          socialNum:   app.ssn_last_four ? `XXX-XX-${app.ssn_last_four}` : undefined,
        }],
        prequalification: {
          loanAmount:  Math.round((app.loan_amount_requested || 0) * 100),
          loanType:    'PERSONAL',
          downPayment: Math.round((app.down_payment || 0) * 100),
        },
      }),
    });

    efxRaw = await efxRes.json();
    if (efxRes.ok) {
      const consumer = (efxRaw as any)?.consumers?.[0] ?? (efxRaw as any)?.consumer ?? efxRaw;
      efxScore =
        consumer?.equifaxUSConsumerCreditReport?.[0]?.creditScore?.[0]?.results ??
        consumer?.creditScore ?? consumer?.score ?? null;
      const rawReasons = consumer?.equifaxUSConsumerCreditReport?.[0]?.riskBasedPricingOrModelIndicator ?? consumer?.reasons ?? [];
      efxReasons = Array.isArray(rawReasons)
        ? rawReasons.map((r: any) => r.code || r.reasonCode || String(r)).filter(Boolean)
        : [];
    } else {
      efxError = `Equifax API ${efxRes.status}: ${JSON.stringify(efxRaw).substring(0, 300)}`;
    }
  } catch (e: any) {
    efxError = `Equifax call failed: ${e.message}`;
    console.error('[equifax-prequal]', efxError);
  }

  const { decision, client_message, badge_color } = scoreDecision(efxScore);
  const scoreDisplay  = efxScore ? `Score: ${efxScore}` : 'Score: Unavailable';
  const emoji         = decision === 'approved' ? '\u2705' : decision === 'review' ? '\u26a0\ufe0f' : '\u274c';
  const borderColor   = decision === 'approved' ? '#16a34a' : decision === 'review' ? '#ca8a04' : '#dc2626';
  const bgColor       = decision === 'approved' ? '#dcfce7'  : decision === 'review' ? '#fef9c3'  : '#fee2e2';
  const monthlyDebts  = (app.monthly_rent_mortgage || 0) + (app.monthly_car_payment || 0) + (app.monthly_other_debt || 0);

  // Update DB
  await supabasePatch('loan_applications', application_id, {
    equifax_score:          efxScore,
    equifax_decision:       decision,
    equifax_reasons:        efxReasons,
    equifax_raw_response:   efxRaw,
    equifax_error:          efxError,
    equifax_checked_at:     new Date().toISOString(),
    equifax_client_message: client_message,
    ...(decision === 'declined' ? { status: 'auto_declined' } : {}),
  });

  // Email Tim
  await sendEmail(
    'info@crestwellgetaways.com',
    `${emoji} Equifax Pre-Qual: ${app.first_name} ${app.last_name} \u2014 ${decision.toUpperCase()} (${scoreDisplay})`,
    `<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;">
      <div style="background:#0D1B2A;padding:24px 32px;"><span style="color:#C9A84C;font-family:Georgia,serif;font-size:1rem;">Crestwell</span><span style="color:rgba(255,255,255,0.5);font-size:0.8rem;"> &mdash; Equifax Pre-Qual Result</span></div>
      <div style="padding:32px;background:#faf8f3;">
        <h2 style="margin:0 0 4px;color:#0D1B2A;">${app.first_name} ${app.last_name}</h2>
        <p style="color:#64748b;font-size:0.85rem;margin:0 0 24px;">App #${app.application_number || application_id.substring(0,8).toUpperCase()} &middot; Loan: $${(app.loan_amount_requested||0).toLocaleString()}</p>
        <div style="background:${bgColor};border-left:4px solid ${borderColor};padding:16px 20px;margin-bottom:24px;border-radius:0 6px 6px 0;">
          <div style="font-size:1.1rem;font-weight:700;color:#0D1B2A;">${emoji} ${decision.toUpperCase()}</div>
          <div style="font-size:0.9rem;color:#374151;">${scoreDisplay}${efxReasons.length ? ` &middot; Reasons: ${efxReasons.slice(0,3).join(', ')}` : ''}</div>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:0.85rem;">
          <tr style="background:#f1f5f9;"><td style="padding:8px 12px;font-weight:600;color:#0D1B2A;width:40%;">Loan Requested</td><td style="padding:8px 12px;">$${(app.loan_amount_requested||0).toLocaleString()}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:600;color:#0D1B2A;">Down Payment</td><td style="padding:8px 12px;">$${(app.down_payment||0).toLocaleString()}</td></tr>
          <tr style="background:#f1f5f9;"><td style="padding:8px 12px;font-weight:600;color:#0D1B2A;">Monthly Income</td><td style="padding:8px 12px;">$${(app.monthly_income||0).toLocaleString()}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:600;color:#0D1B2A;">Monthly Debts</td><td style="padding:8px 12px;">$${monthlyDebts.toLocaleString()}</td></tr>
          <tr style="background:#f1f5f9;"><td style="padding:8px 12px;font-weight:600;color:#0D1B2A;">Employment</td><td style="padding:8px 12px;">${app.employment_status||'\u2014'} \u2014 ${app.employer_name||'\u2014'}</td></tr>
        </table>
        <div style="margin-top:20px;padding:14px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:4px;">
          <p style="font-size:0.8rem;color:#1e40af;margin:0;"><strong>Client message:</strong> "${client_message}"</p>
        </div>
        ${efxError ? `<div style="margin-top:16px;padding:12px;background:#fee2e2;border-radius:4px;"><p style="font-size:0.78rem;color:#dc2626;margin:0;"><strong>Error:</strong> ${efxError}</p></div>` : ''}
      </div>
      <div style="background:#0D1B2A;padding:12px 32px;text-align:center;"><p style="color:rgba(255,255,255,0.3);font-size:0.7rem;margin:0;">Crestwell &middot; Equifax Pre-Qual of One &middot; Sandbox</p></div>
    </div>`,
    'Crestwell AI <noreply@crestwellgetaways.com>'
  );

  // Email client
  if (app.email) {
    await sendEmail(
      app.email,
      'Your Crestwell Financing Application \u2014 Update',
      `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#0D1B2A;padding:28px 36px;"><div style="font-family:Georgia,serif;font-size:28px;color:white;">Crestwell</div><div style="font-size:11px;color:#C9A84C;letter-spacing:0.2em;text-transform:uppercase;margin-top:4px;">Travel Services</div></div>
        <div style="padding:36px;background:white;">
          <p style="font-family:Georgia,serif;font-size:22px;color:#0D1B2A;margin:0 0 16px;">Hi ${app.first_name},</p>
          <p style="font-size:14px;color:#4A5568;line-height:1.8;margin:0 0 20px;">Thank you for submitting your financing application. We have completed an initial review of your credit profile.</p>
          <div style="background:${bgColor};border-left:4px solid ${borderColor};padding:18px 22px;margin-bottom:24px;border-radius:0 6px 6px 0;">
            <p style="font-size:14px;color:#1f2937;line-height:1.8;margin:0;">${client_message}</p>
          </div>
          <p style="font-size:13px;color:#6b7280;margin:0 0 24px;">Questions? Reply to this email or call <strong>888.508.6893</strong>.</p>
          <a href="mailto:info@crestwellgetaways.com" style="display:inline-block;background:#C9A84C;color:#0D1B2A;padding:13px 28px;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;border-radius:4px;margin-right:12px;">Reply to Tim</a>
          <a href="tel:8885086893" style="display:inline-block;background:#0D1B2A;color:white;padding:13px 28px;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;border-radius:4px;">Call Us</a>
        </div>
        <div style="background:#0D1B2A;padding:20px 36px;"><div style="font-family:Georgia,serif;font-size:17px;color:white;">Tim Crestwell</div><div style="font-size:12px;color:#C9A84C;">Crestwell Travel Services &middot; 888.508.6893</div></div>
        <div style="background:#f8f6f0;padding:12px 36px;text-align:center;"><p style="font-size:10px;color:#9ca3af;margin:0;">Pre-qualification only. Final approval subject to full verification.</p></div>
      </div>`
    );
  }

  return NextResponse.json({
    success: true, application_id,
    equifax_score: efxScore, decision, badge_color,
    client_notified: !!app.email,
    error: efxError ?? undefined,
  });
}
