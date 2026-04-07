import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, MailCheckIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Logo } from '../../components/ui/Logo';
import { supabase } from '../../lib/supabaseClient';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) { setError(error.message); return; }
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-white p-4 selection:bg-primary/20">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-10">
          <Link to="/"><Logo size="lg" /></Link>
        </div>

        <Card padding="lg" className="w-full shadow-xl border-border/50">
          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <MailCheckIcon className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-heading font-bold mb-2 text-text-primary">Check your inbox</h1>
              <p className="text-text-secondary text-sm mb-2">
                We sent a reset link to <span className="font-semibold text-text-primary">{email}</span>.
              </p>
              <p className="text-text-muted text-xs mb-8">The link expires in 1 hour.</p>
              <Link to="/login" className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors">
                <ArrowLeftIcon className="w-4 h-4" /> Back to login
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-heading font-bold mb-2 text-text-primary">Reset your password</h1>
                <p className="text-text-secondary">Enter your email and we'll send you a reset link.</p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <Input
                  label="Email address"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                />
                {error && <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2">{error}</p>}
                <Button type="submit" className="w-full mt-4 py-3 text-base" disabled={loading}>
                  {loading ? 'Sending…' : 'Send Reset Link'}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <Link to="/login" className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors">
                  <ArrowLeftIcon className="w-4 h-4" /> Back to login
                </Link>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
