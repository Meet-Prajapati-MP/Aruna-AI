import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  HomeIcon, InboxIcon, CheckSquareIcon, SearchIcon, GitBranchIcon,
  ArchiveIcon, ShieldCheckIcon, BarChart3Icon, SettingsIcon, BellIcon,
  MenuIcon, ChevronDownIcon, PlusIcon, PuzzleIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../ui/Logo';

const MOCK_SIDEBAR_WORKSPACES = [
  { id: '1', emoji: '🚀', name: 'Trustopay GTM' },
  { id: '2', emoji: '💼', name: 'Fundraising & Pitch' },
  { id: '3', emoji: '🧘', name: 'Morning Routines' },
  { id: '4', emoji: '📊', name: 'Market Research Hub' },
  { id: '5', emoji: '✈️', name: 'Japan Trip' },
  { id: '6', emoji: '🎯', name: 'Q4 OKR' },
];

export function AppLayout() {
  const { user } = useAuth();
  const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const initials = fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mainNav = [
    { name: 'Home',  path: '/app',       icon: HomeIcon,  exact: true },
    { name: 'Inbox', path: '/app/inbox', icon: InboxIcon, badge: true },
  ];

  const globalViewsNav = [
    { name: 'Tasks',     path: '/app/tasks',     icon: CheckSquareIcon },
    { name: 'Vault',     path: '/app/vault',     icon: ArchiveIcon },
    { name: 'Workflows', path: '/app/workflows', icon: GitBranchIcon },
    { name: 'Approvals', path: '/app/approvals', icon: ShieldCheckIcon, badge: true },
  ];

  const bottomNavItems = [
    { name: 'Usage',        path: '/app/usage',        icon: BarChart3Icon, meta: '₹847 / ₹1,500' },
    { name: 'Integrations', path: '/app/integrations', icon: PuzzleIcon,    badgeText: 'Composio' },
    { name: 'Settings',     path: '/app/settings',     icon: SettingsIcon },
  ];

  const navLink = (item: { path: string; name: string; icon: React.ElementType; exact?: boolean; badge?: boolean; meta?: string; badgeText?: string }) => {
    const isActive = item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);
    return (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={() => setIsMobileMenuOpen(false)}
        className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
          isActive ? 'bg-primary/10 text-primary shadow-sm' : 'text-text-secondary hover:bg-cream hover:text-text-primary'
        }`}
      >
        <div className="flex items-center gap-3">
          <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-primary' : 'text-text-muted'}`} />
          {item.name}
        </div>
        {item.badge    && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
        {item.meta     && <span className="text-[10px] text-text-muted font-normal">{item.meta}</span>}
        {item.badgeText && (
          <span className="text-[9px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded">
            {item.badgeText}
          </span>
        )}
      </NavLink>
    );
  };

  const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-wider px-3 mb-1.5">
      {children}
    </h3>
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-warm-white border-r border-border">

      {/* ── TOP: Logo + Search + Notifications ──────────────────── */}
      <div className="px-4 pt-4 pb-3 flex flex-col gap-2 border-b border-border/30">
        <div className="flex justify-start mb-1">
          <Logo size="sm" />
        </div>

        {/* Search */}
        <div className="relative">
          <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-white border border-border/50 rounded-xl pl-9 pr-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* Notifications */}
        <button className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-text-secondary hover:bg-cream hover:text-text-primary transition-all">
          <div className="flex items-center gap-3">
            <BellIcon className="w-4 h-4 text-text-muted" />
            Notifications
          </div>
          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
        </button>
      </div>

      {/* ── MIDDLE: Scrollable nav sections ─────────────────────── */}
      <div className="flex-1 overflow-y-auto hide-scrollbar px-3 py-4 space-y-5">

        {/* Main */}
        <div>
          <SectionLabel>Main</SectionLabel>
          <nav className="space-y-0.5">
            {mainNav.map(navLink)}
          </nav>
        </div>

        {/* Workspaces — always visible, no collapse */}
        <div>
          <div className="flex items-center justify-between px-3 mb-1.5">
            <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Workspaces</h3>
            <NavLink
              to="/app/workspaces"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-5 h-5 flex items-center justify-center rounded-md hover:bg-cream text-text-muted hover:text-text-primary transition-colors"
            >
              <PlusIcon className="w-3.5 h-3.5" />
            </NavLink>
          </div>
          <nav className="space-y-0.5">
            {MOCK_SIDEBAR_WORKSPACES.map(ws => {
              const path = `/app/workspaces/${ws.id}`;
              const isActive = location.pathname === path;
              return (
                <NavLink
                  key={ws.id}
                  to={path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive ? 'bg-primary/10 text-primary shadow-sm' : 'text-text-secondary hover:bg-cream hover:text-text-primary'
                  }`}
                >
                  <span className="text-base leading-none flex-shrink-0">{ws.emoji}</span>
                  <span className="truncate">{ws.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Global Views */}
        <div>
          <SectionLabel>Global Views</SectionLabel>
          <nav className="space-y-0.5">
            {globalViewsNav.map(navLink)}
          </nav>
        </div>
      </div>

      {/* ── BOTTOM: Utility links + Upgrade + Profile ────────────── */}
      <div className="border-t border-border/30 px-3 pt-3 pb-0">

        {/* Usage / Integrations / Settings */}
        <nav className="space-y-0.5 mb-3">
          {bottomNavItems.map(navLink)}
        </nav>

        {/* Upgrade card */}
        <div className="bg-gradient-to-br from-primary to-primary-dark p-3.5 rounded-2xl relative overflow-hidden group cursor-pointer shadow-sm transition-all hover:shadow-md mb-3">
          <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full blur-xl -mr-6 -mt-6 group-hover:bg-white/20 transition-all" />
          <h4 className="text-sm font-bold text-white mb-0.5">Upgrade to Max</h4>
          <p className="text-xs text-white/80 mb-2.5 leading-relaxed">Unlock advanced agents and higher limits.</p>
          <span className="text-xs font-semibold text-white bg-white/20 px-3 py-1 rounded-lg inline-flex items-center gap-1 hover:bg-white/30 transition-colors">
            View plans →
          </span>
        </div>

        {/* Profile — pinned at very bottom, matches reference */}
        <div className="flex items-center justify-between bg-white border border-border/50 rounded-xl px-3 py-2.5 mb-3 cursor-pointer hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-2.5 min-w-0">
            {avatarUrl ? (
              <img src={avatarUrl} alt={fullName} className="w-8 h-8 rounded-full object-cover border border-rose-light/50 flex-shrink-0" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-rose-light/30 border border-rose-light/50 flex items-center justify-center text-primary-dark font-heading font-bold text-xs flex-shrink-0">
                {initials}
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-text-primary leading-tight truncate">{fullName}</span>
              <span className="text-[10px] text-text-muted">Personal Workspace</span>
            </div>
          </div>
          <ChevronDownIcon className="w-4 h-4 text-text-muted flex-shrink-0 ml-2" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans">

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 flex-shrink-0 h-full z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-text-primary/40 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-72 z-50 md:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Mobile menu trigger */}
      <button
        className="md:hidden fixed top-3 left-3 z-30 p-2 bg-white border border-border rounded-lg shadow-sm text-text-secondary hover:text-text-primary hover:bg-cream transition-colors"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <MenuIcon className="w-5 h-5" />
      </button>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        <main className="flex-1 overflow-y-auto bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
