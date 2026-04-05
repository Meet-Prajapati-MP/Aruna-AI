/**
 * FIX F1: LoginPage was completely non-functional.
 *
 * Problems fixed:
 * 1. Inputs were uncontrolled — no value/onChange → form data was never read
 * 2. handleLogin just called navigate('/app') with zero API call
 * 3. No error display when credentials are wrong
 * 4. No loading state during submission
 *
 * Now:
 * - Fully controlled inputs with useState
 * - Calls Supabase signInWithPassword via AuthContext
 * - Shows error message on failure
 * - Disables button and shows "Signing in..." during request
 * - Redirects to /app on success
 */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Logo } from '../../components/ui/Logo';
import { useAuth } from '../../context/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/app');
    } catch (err: unknown) {
      // Show a safe, generic error — don't reveal whether email or password was wrong
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-white p-4 selection:bg-primary-light selection:text-white">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center mb-10">
          <Link to="/">
            <Logo size="lg" />
          </Link>
          <p className="text-sm text-text-secondary mt-3 font-medium">
            India's AI Agent Platform
          </p>
        </div>

        <Card padding="lg" className="w-full shadow-xl border-border/50">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold mb-2 text-text-primary">
              Welcome back
            </h1>
            <p className="text-text-secondary">
              Enter your details to sign in to your account
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
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
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-text-secondary ml-1">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary font-medium hover:text-primary-dark transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                autoComplete="current-password"
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-4 py-3 text-base"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-text-secondary">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-primary font-bold hover:text-primary-dark transition-colors"
            >
              Sign up
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
