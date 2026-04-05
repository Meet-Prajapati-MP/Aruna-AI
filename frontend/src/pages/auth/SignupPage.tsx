/**
 * FIX F2: SignupPage was completely non-functional.
 *
 * Problems fixed:
 * 1. Inputs uncontrolled — full name, email, password values were never read
 * 2. handleSignup just navigated — no API call, no user creation
 * 3. No error display, no loading state
 *
 * Now:
 * - Fully controlled inputs
 * - Calls Supabase signUp via AuthContext
 * - Shows error message on failure
 * - Shows "Check your email" message on success (Supabase sends verification email)
 * - Loading state during submission
 */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Logo } from '../../components/ui/Logo';
import { useAuth } from '../../context/AuthContext';

export function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-side validation mirroring backend rules
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError('Password must contain at least one uppercase letter.');
      return;
    }
    if (!/[0-9]/.test(password)) {
      setError('Password must contain at least one digit.');
      return;
    }

    setIsLoading(true);
    try {
      await signup(email, password, fullName);
      // Supabase sends a confirmation email before the session is active
      setEmailSent(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Signup failed. Please try again.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-white p-4">
        <div className="w-full max-w-md">
          <Card padding="lg" className="w-full shadow-xl text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">Check your email</h2>
            <p className="text-text-secondary mb-6">
              We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
            </p>
            <Button variant="outline" className="w-full" onClick={() => navigate('/login')}>
              Back to Sign In
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-white p-4 selection:bg-primary-light selection:text-white">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center mb-10">
          <Link to="/">
            <Logo size="lg" />
          </Link>
          <p className="text-sm text-text-secondary mt-3 font-medium">
            Think. Plan. Execute.
          </p>
        </div>

        <Card padding="lg" className="w-full shadow-xl border-border/50">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold mb-2 text-text-primary">
              Create an account
            </h1>
            <p className="text-text-secondary">
              Start your journey with Aruna today
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            <Input
              label="Full name"
              type="text"
              placeholder="Alex Doe"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={isLoading}
              autoComplete="name"
            />
            <Input
              label="Email address"
              type="email"
              placeholder="name@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              autoComplete="email"
            />
            <Input
              label="Password"
              type="password"
              placeholder="Create a strong password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              autoComplete="new-password"
            />

            <Button
              type="submit"
              className="w-full mt-4 py-3 text-base"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-text-secondary">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary font-bold hover:text-primary-dark transition-colors"
            >
              Sign in
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
