import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Logo } from '../../components/ui/Logo';
export function ForgotPasswordPage() {
  return <div className="min-h-screen flex items-center justify-center bg-warm-white p-4 selection:bg-primary-light selection:text-white" data-id="element-1909">
      <div className="w-full max-w-md" data-id="element-1910">
        <div className="flex justify-center mb-10" data-id="element-1911">
          <Link to="/" data-id="element-1912">
            <Logo size="lg" data-id="element-1913" />
          </Link>
        </div>

        <Card padding="lg" className="w-full shadow-xl border-border/50" data-id="element-1914">
          <div className="text-center mb-8" data-id="element-1915">
            <h1 className="text-3xl font-heading font-bold mb-2 text-text-primary" data-id="element-1916">
              Reset your password
            </h1>
            <p className="text-text-secondary" data-id="element-1917">
              Enter your email and we'll send you a reset link
            </p>
          </div>

          <form className="space-y-5" onSubmit={e => e.preventDefault()} data-id="element-1918">
            <Input label="Email address" type="email" placeholder="name@example.com" required data-id="element-1919" />
            <Button type="submit" className="w-full mt-4 py-3 text-base" data-id="element-1920">
              Send Reset Link
            </Button>
          </form>

          <div className="mt-8 text-center" data-id="element-1921">
            <Link to="/login" className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors" data-id="element-1922">
              <ArrowLeftIcon className="w-4 h-4" data-id="element-1923" /> Back to login
            </Link>
          </div>
        </Card>
      </div>
    </div>;
}