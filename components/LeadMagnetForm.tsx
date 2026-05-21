'use client';
import { useState } from 'react';
import { EmailField, useEmailValidation } from '@/components/EmailField';

export default function LeadMagnetForm({ city, cityName }: { city: string; cityName: string }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const emailValidation = useEmailValidation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (emailValidation.state === 'invalid') { setError('Please enter a valid email address.'); return; }
    setStatus('loading');
    setError('');

    try {
      const res = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, city }),
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Something went wrong');
      }

      setStatus('success');
      setEmail('');
      setName('');
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="max-w-md mx-auto text-center bg-white rounded-xl p-8 shadow-sm border border-amber-200">
        <div className="text-4xl mb-4">📬</div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Check your inbox!</h3>
        <p className="text-slate-600">
          Your free <strong>{cityName} Cruiser's Port Guide</strong> is on its way.
          Check your email — it should arrive within a minute.
        </p>
        <p className="text-sm text-slate-400 mt-4">
          Don't see it? Check your spam folder.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your first name (optional)"
        className="w-full px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
      />
      <div className="flex flex-col sm:flex-row gap-3">
        <EmailField
            value={email}
            onChange={v => { setEmail(v); emailValidation.validate(v); }}
            required
            placeholder="your@email.com"
            label="Email Address"
          />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-slate-900 text-white px-6 py-3 rounded-md font-semibold hover:bg-slate-800 transition disabled:opacity-60 whitespace-nowrap"
        >
          {status === 'loading' ? 'Sending...' : 'Send Me the Guide'}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-red-600 text-sm text-center">{error}</p>
      )}
      <p className="text-xs text-slate-400 text-center">
        No spam. Unsubscribe any time. Your info stays with Crestwell.
      </p>
    </form>
  );
}
