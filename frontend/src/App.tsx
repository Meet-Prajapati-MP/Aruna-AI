/**
 * FIX F3: Added ProtectedRoute + AuthProvider.
 *
 * Problems fixed:
 * 1. No auth guard — any visitor could navigate to /app/* without logging in
 * 2. No AuthProvider wrapping the app — useAuth() would throw everywhere
 *
 * Now:
 * - <AuthProvider> wraps all routes so auth state is available everywhere
 * - <ProtectedRoute> checks for an active Supabase session before rendering /app/*
 * - If not authenticated, redirects to /login, preserving the intended destination
 * - Shows nothing while the session is being restored (prevents flash of login page)
 */
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// Auth context
import { AuthProvider, useAuth } from './context/AuthContext';
// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { AppLayout } from './components/layout/AppLayout';
// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { ProductPage } from './pages/public/ProductPage';
import { UseCasesPage } from './pages/public/UseCasesPage';
import { PricingPage } from './pages/public/PricingPage';
import { ContactPage } from './pages/public/ContactPage';
// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { VerifyEmailPage } from './pages/auth/VerifyEmailPage';
// App Pages
import { AppHomePage } from './pages/app/AppHomePage';
import { ChatPage } from './pages/app/ChatPage';
import { GeneralPage } from './pages/app/GeneralPage';
import { PersonalPage } from './pages/app/PersonalPage';
import { ProfessionalPage } from './pages/app/ProfessionalPage';
import { HistoryPage } from './pages/app/HistoryPage';
import { VaultPage } from './pages/app/VaultPage';
import { SettingsPage } from './pages/app/SettingsPage';
import { InboxPage } from './pages/app/InboxPage';
import { WorkspacesPage } from './pages/app/WorkspacesPage';
import { WorkspaceDetailPage } from './pages/app/WorkspaceDetailPage';
import { TasksPage } from './pages/app/TasksPage';
import { ResearchPage } from './pages/app/ResearchPage';
import { WorkflowsPage } from './pages/app/WorkflowsPage';
import { SharedPage } from './pages/app/SharedPage';
import { ApprovalsPage } from './pages/app/ApprovalsPage';
import { UsagePage } from './pages/app/UsagePage';
import { IntegrationsPage } from './pages/app/IntegrationsPage';

/**
 * Guards /app/* routes.
 * - While session is loading: renders nothing (prevents login-page flash)
 * - If not authenticated: redirects to /login, preserving current path in state
 * - If authenticated: renders children
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Transparent loading state — avoid flashing the wrong page
    return null;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/use-cases" element={<UseCasesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />

      {/* Protected App Routes — all wrapped in ProtectedRoute */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AppHomePage />} />
        <Route path="inbox" element={<InboxPage />} />
        <Route path="chat/:id" element={<ChatPage />} />
        <Route path="workspaces" element={<WorkspacesPage />} />
        <Route path="workspaces/:id" element={<WorkspaceDetailPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="research" element={<ResearchPage />} />
        <Route path="workflows" element={<WorkflowsPage />} />
        <Route path="vault" element={<VaultPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="shared" element={<SharedPage />} />
        <Route path="approvals" element={<ApprovalsPage />} />
        <Route path="usage" element={<UsagePage />} />
        <Route path="integrations" element={<IntegrationsPage />} />
        <Route path="settings" element={<SettingsPage />} />

        {/* Legacy routes kept for compatibility */}
        <Route path="general" element={<GeneralPage />} />
        <Route path="personal" element={<PersonalPage />} />
        <Route path="professional" element={<ProfessionalPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
