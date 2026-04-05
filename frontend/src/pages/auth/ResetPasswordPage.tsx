import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Logo } from '../../components/ui/Logo';
export function ResetPasswordPage() {
  return <div className="min-h-screen flex items-center justify-center bg-warm-white p-4 selection:bg-primary-light selection:text-white" data-id="element-1944">
      <div className="w-full max-w-md" data-id="element-1945">
        <div className="flex justify-center mb-10" data-id="element-1946">
          <Link to="/" data-id="element-1947">
            <Logo size="lg" data-id="element-1948" />
          </Link>
        </div>

        <Card padding="lg" className="w-full shadow-xl border-border/50" data-id="element-1949">
          <div className="text-center mb-8" data-id="element-1950">
            <h1 className="text-3xl font-heading font-bold mb-2 text-text-primary" data-id="element-1951">
              Create new password
            </h1>
            <p className="text-text-secondary" data-id="element-1952">
              Your new password must be different from previous used passwords.
            </p>
          </div>

          <form className="space-y-5" onSubmit={e => e.preventDefault()} data-id="element-1953">
            <Input label="New Password" type="password" placeholder="••••••••" required data-id="element-1954" />
            <Input label="Confirm Password" type="password" placeholder="••••••••" required data-id="element-1955" />
            <Button type="submit" className="w-full mt-4 py-3 text-base" data-id="element-1956">
              Reset Password
            </Button>
          </form>
        </Card>
      </div>
    </div>;
}