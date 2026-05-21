// supabase/functions/validate-email/index.ts
// Real-time email validation for all public site forms
// Checks: format, disposable domain blocklist, role-based address detection
// Returns: { valid: boolean, reason?: string, is_role?: boolean }

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Common disposable email domains — extend as needed
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "guerrillamail.com", "throwaway.email", "tempmail.com",
  "temp-mail.org", "trashmail.com", "yopmail.com", "sharklasers.com",
  "guerrillamailblock.com", "grr.la", "guerrillamail.info", "spam4.me",
  "dispostable.com", "maildrop.cc", "spamgourmet.com", "trashmail.at",
  "trashmail.io", "trashmail.me", "discard.email", "spambox.us",
  "fakeinbox.com", "mailnull.com", "spamcero.com", "spamfree24.org",
  "throwam.com", "getnada.com", "mintemail.com", "tempr.email",
  "luxusmail.org", "spamherelots.com", "spaml.de", "mailnew.com",
]);

// Role-based prefixes that indicate a shared inbox
const ROLE_PREFIXES = new Set([
  "admin", "info", "support", "contact", "help", "sales", "marketing",
  "billing", "accounts", "noreply", "no-reply", "postmaster", "webmaster",
  "mail", "email", "office", "team", "feedback", "enquiries", "enquiry",
]);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return new Response(
        JSON.stringify({ valid: false, reason: "Email address is required." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const trimmed = email.trim().toLowerCase();

    // 1. Format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(trimmed)) {
      return new Response(
        JSON.stringify({ valid: false, reason: "Please enter a valid email address." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const [localPart, domain] = trimmed.split("@");

    // 2. Disposable domain check
    if (DISPOSABLE_DOMAINS.has(domain)) {
      return new Response(
        JSON.stringify({
          valid: false,
          reason: "Disposable email addresses are not accepted. Please use your real email address.",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 3. Role-based address detection (soft warning, not blocked)
    const isRole = ROLE_PREFIXES.has(localPart.split("+")[0].split(".")[0]);

    // 4. Basic MX record check via DNS-over-HTTPS
    let hasMx = true;
    try {
      const dnsRes = await fetch(
        `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=MX`,
        { headers: { Accept: "application/dns-json" }, signal: AbortSignal.timeout(3000) }
      );
      const dnsData = await dnsRes.json();
      hasMx = dnsData.Status === 0 && (dnsData.Answer?.length > 0 || dnsData.Authority?.length > 0);
    } catch {
      // DNS lookup failed — don't block, soft pass
      hasMx = true;
    }

    if (!hasMx) {
      return new Response(
        JSON.stringify({
          valid: false,
          reason: "This email domain does not appear to accept email. Please check the address.",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ valid: true, is_role: isRole }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    // Never block on error — soft pass
    return new Response(
      JSON.stringify({ valid: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
