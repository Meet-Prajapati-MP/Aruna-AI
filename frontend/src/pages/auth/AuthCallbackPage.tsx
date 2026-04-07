import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircleIcon, XCircleIcon, LoaderIcon } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { Logo } from '../../components/ui/Logo';
import { Button } from '../../components/ui/Button';

type State = 'loading' | 'verified' | 'error';

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const [state, setState] = useState<State>('loading');
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    // Supabase puts tokens in the URL hash after email confirmation.
    // getSession() processes the hash automatically and signs the user in.
    supabase.auth.getSession().then(({ data, error }) => {
      if (error || !data.session) {
        setState('error');
      } else {
        setState('verified');
      }
    });
  }, []);

  // Auto-redirect countdown once verified
  useEffect(() => {
    if (state !== 'verified') return;
    if (countdown === 0) { navigate('/app'); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [state, countdown, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-warm-white p-4">
      {/* Logo */}
      <Link to="/" className="mb-12">
        <Logo size="lg" />
      </Link>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-border/40 p-10 text-center">

        {/* Loading */}
        {state === 'loading' && (
          <>
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <LoaderIcon className="w-10 h-10 text-primary animate-spin" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
              Verifying your account…
            </h1>
            <p className="text-text-secondary text-sm">Please wait a moment.</p>
          </>
        )}

        {/* Success */}
        {state === 'verified' && (
          <>
            <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-text-primary mb-3">
              Account Verified!
            </h1>
            <p className="text-text-secondary mb-2 leading-relaxed">
              Your email has been confirmed. Welcome to <span className="font-semibold text-primary">Aruna</span>.
            </p>
            <p className="text-sm text-text-muted mb-8">
              Redirecting you in <span className="font-bold text-text-primary">{countdown}</span>s…
            </p>

            {/* Decorative dots */}
            <div className="flex justify-center gap-1.5 mb-8">
              {[0, 1, 2, 3].map(i => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i < (4 - countdown) ? 'bg-primary' : 'bg-border'
                  }`}
                />
              ))}
            </div>

            <Button className="w-full py-3 text-base" onClick={() => navigate('/app')}>
              Go to Aruna →
            </Button>
          </>
        )}

        {/* Error */}
        {state === 'error' && (
          <>
            <div className="w-20 h-20 rounded-full bg-red-50 border-2 border-red-100 flex items-center justify-center mx-auto mb-6">
              <XCircleIcon className="w-10 h-10 text-red-400" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-text-primary mb-3">
              Verification Failed
            </h1>
            <p className="text-text-secondary mb-8 leading-relaxed">
              The link may have expired or already been used. Try signing in or request a new confirmation email.
            </p>
            <div className="flex flex-col gap-3">
              <Button className="w-full py-3 text-base" onClick={() => navigate('/login')}>
                Go to Login
              </Button>
              <Link
                to="/signup"
                className="text-sm text-text-secondary hover:text-primary transition-colors"
              >
                Create a new account
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <p className="mt-8 text-xs text-text-muted">
        © {new Date().getFullYear()} Aruna AI. All rights reserved.
      </p>
    </div>
  );
}
