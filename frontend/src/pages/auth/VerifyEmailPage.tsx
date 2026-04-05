import React from 'react';
import { Link } from 'react-router-dom';
import { MailCheckIcon, ArrowLeftIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Logo } from '../../components/ui/Logo';
export function VerifyEmailPage() {
  return <div className="min-h-screen flex items-center justify-center bg-warm-white p-4 selection:bg-primary-light selection:text-white" data-id="element-1974">
      <div className="w-full max-w-md" data-id="element-1975">
        <div className="flex justify-center mb-10" data-id="element-1976">
          <Link to="/" data-id="element-1977">
            <Logo size="lg" data-id="element-1978" />
          </Link>
        </div>

        <Card padding="lg" className="w-full text-center shadow-xl border-border/50" data-id="element-1979">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6" data-id="element-1980">
            <MailCheckIcon className="w-10 h-10 text-primary" data-id="element-1981" />
          </div>

          <h1 className="text-3xl font-heading font-bold mb-3 text-text-primary" data-id="element-1982">
            Check your email
          </h1>
          <p className="text-text-secondary mb-8 leading-relaxed" data-id="element-1983">
            We sent a verification link to{' '}
            <span className="font-bold text-text-primary" data-id="element-1984">
              alex@example.com
            </span>
            . Please check your inbox to verify your account.
          </p>

          <div className="space-y-6" data-id="element-1985">
            <Button className="w-full py-3 text-base" data-id="element-1986">Open Email App</Button>
            <p className="text-sm text-text-secondary" data-id="element-1987">
              Didn't receive the email?{' '}
              <button className="text-primary font-bold hover:text-primary-dark transition-colors" data-id="element-1988">
                Click to resend
              </button>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border/50 text-center" data-id="element-1989">
            <Link to="/login" className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors" data-id="element-1990">
              <ArrowLeftIcon className="w-4 h-4" data-id="element-1991" /> Back to login
            </Link>
          </div>
        </Card>
      </div>
    </div>;
}