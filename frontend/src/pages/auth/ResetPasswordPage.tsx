import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircleIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Logo } from '../../components/ui/Logo';
import { supabase } from '../../lib/supabaseClient';

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  // Supabase fires PASSWORD_RECOVERY when the reset link token is processed
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setReady(true);
    });
    // Also check if already signed in via the hash token
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) { setError(error.message); return; }
    setDone(true);
    setTimeout(() => navigate('/login'), 3000);
  };

  const strength = password.length === 0 ? 0 : password.length < 8 ? 1 : password.length < 12 ? 2 : 3;
  const strengthLabel = ['', 'Weak', 'Good', 'Strong'];
  const strengthColor = ['', 'bg-red-400', 'bg-yellow-400', 'bg-green-500'];

  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-white p-4 selection:bg-primary/20">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-10">
          <Link to="/"><Logo size="lg" /></Link>
        </div>

        <Card padding="lg" className="w-full shadow-xl border-border/50">
          {done ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-50 border-2 border-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircleIcon className="w-8 h-8 text-green-500" />
              </div>
              <h1 className="text-2xl font-heading font-bold mb-2 text-text-primary">Password Updated!</h1>
              <p className="text-text-secondary text-sm mb-1">Your password has been changed successfully.</p>
              <p className="text-text-muted text-xs mb-6">Redirecting to login in 3 seconds…</p>
              <Button className="w-full py-3 text-base" onClick={() => navigate('/login')}>
                Go to Login →
              </Button>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-heading font-bold mb-2 text-text-primary">Create new password</h1>
                <p className="text-text-secondary text-sm">Must be at least 8 characters.</p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      className="w-full bg-white border border-border rounded-xl px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                    <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary">
                      {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                    </button>
                  </div>
                  {/* Strength bar */}
                  {password.length > 0 && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${strengthColor[strength]}`} style={{ width: `${(strength / 3) * 100}%` }} />
                      </div>
                      <span className="text-xs text-text-muted">{strengthLabel[strength]}</span>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={confirm}
                      onChange={e => setConfirm(e.target.value)}
                      required
                      className={`w-full bg-white border rounded-xl px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                        confirm && confirm !== password ? 'border-red-300 focus:border-red-400' : 'border-border focus:border-primary'
                      }`}
                    />
                    <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary">
                      {showConfirm ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                    </button>
                  </div>
                  {confirm && confirm !== password && (
                    <p className="text-xs text-red-500 mt-1">Passwords do not match.</p>
                  )}
                </div>

                {error && <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2">{error}</p>}

                <Button type="submit" className="w-full py-3 text-base" disabled={loading || !ready}>
                  {loading ? 'Saving…' : 'Save New Password'}
                </Button>
              </form>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
