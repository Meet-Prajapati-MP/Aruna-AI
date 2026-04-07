import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HomeIcon, InboxIcon, CheckSquareIcon, SearchIcon, GitBranchIcon, ArchiveIcon, ShieldCheckIcon, BarChart3Icon, SettingsIcon, BellIcon, MenuIcon, ChevronDownIcon, ChevronRightIcon, PlusIcon, PuzzleIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../ui/Logo';
const MOCK_SIDEBAR_WORKSPACES = [{
  id: '1',
  emoji: '🚀',
  name: 'Trustopay GTM'
}, {
  id: '2',
  emoji: '💼',
  name: 'Fundraising & Pitch'
}, {
  id: '3',
  emoji: '🧘',
  name: 'Morning Routines'
}, {
  id: '4',
  emoji: '📊',
  name: 'Market Research Hub'
}, {
  id: '5',
  emoji: '✈️',
  name: 'Japan Trip'
}, {
  id: '6',
  emoji: '🎯',
  name: 'Q4 OKR'
}];
export function AppLayout() {
  const { user } = useAuth();
  const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const initials = fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWorkspacesOpen, setIsWorkspacesOpen] = useState(true);
  const mainNav = [{
    name: 'Home',
    path: '/app',
    icon: HomeIcon,
    exact: true
  }, {
    name: 'Inbox',
    path: '/app/inbox',
    icon: InboxIcon,
    badge: true
  }];
  const globalViewsNav = [{
    name: 'Tasks',
    path: '/app/tasks',
    icon: CheckSquareIcon
  }, {
    name: 'Vault',
    path: '/app/vault',
    icon: ArchiveIcon
  }, {
    name: 'Workflows',
    path: '/app/workflows',
    icon: GitBranchIcon
  }, {
    name: 'Approvals',
    path: '/app/approvals',
    icon: ShieldCheckIcon,
    badge: true
  }];
  const bottomNavItems = [{
    name: 'Usage',
    path: '/app/usage',
    icon: BarChart3Icon
  }, {
    name: 'Integrations',
    path: '/app/integrations',
    icon: PuzzleIcon,
    badgeText: 'Composio'
  }, {
    name: 'Settings',
    path: '/app/settings',
    icon: SettingsIcon
  }];
const SidebarContent = () => <div className="flex flex-col h-full bg-warm-white border-r border-border overflow-y-auto hide-scrollbar" data-id="element-66">
      <div className="p-4 flex flex-col gap-4 border-b border-border/30 sticky top-0 bg-warm-white/90 backdrop-blur-sm z-10" data-id="element-67">
        <div className="flex justify-start" data-id="element-68">
          <Logo size="sm" data-id="element-69" />
        </div>
        <div className="flex items-center justify-between bg-white border border-border/50 rounded-xl p-2 cursor-pointer hover:border-primary/30 transition-colors" data-id="element-70">
          <div className="flex items-center gap-2.5" data-id="element-71">
            <div className="w-8 h-8 rounded-full bg-rose-light/30 border border-rose-light/50 flex items-center justify-center text-primary-dark font-heading font-bold text-xs" data-id="element-72">
              {initials}
            </div>
            <div className="flex flex-col" data-id="element-73">
              <span className="text-sm font-semibold text-text-primary leading-tight" data-id="element-74">
                {fullName}
              </span>
              <span className="text-[10px] text-text-muted" data-id="element-75">
                Personal Workspace
              </span>
            </div>
          </div>
          <ChevronDownIcon className="w-4 h-4 text-text-muted" data-id="element-76" />
        </div>
      </div>

      <div className="flex-1 px-4 py-4 space-y-6" data-id="element-77">
        {/* Main Section */}
        <div data-id="element-78">
          <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-wider px-3 mb-2" data-id="element-79">
            Main
          </h3>
          <nav className="space-y-1" data-id="element-80">
            {mainNav.map(item => {
            const isActive = item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);
            return <NavLink key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-primary/10 text-primary shadow-sm' : 'text-text-secondary hover:bg-cream hover:text-text-primary'}`} data-id="element-81">
                  <div className="flex items-center gap-3" data-id="element-82">
                    <item.icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-text-muted'}`} data-id="element-83" />
                    {item.name}
                  </div>
                  {item.badge && <div className="w-2 h-2 rounded-full bg-primary" data-id="element-84"></div>}
                </NavLink>;
          })}
          </nav>
        </div>

        {/* Workspaces Section */}
        <div data-id="element-85">
          <button onClick={() => setIsWorkspacesOpen(!isWorkspacesOpen)} className="w-full flex items-center justify-between text-[10px] font-bold text-text-muted uppercase tracking-wider px-3 mb-2 hover:text-text-primary transition-colors" data-id="element-86">
            <span data-id="element-87">Workspaces</span>
            {isWorkspacesOpen ? <ChevronDownIcon className="w-3 h-3" data-id="element-88" /> : <ChevronRightIcon className="w-3 h-3" data-id="element-89" />}
          </button>

          <AnimatePresence data-id="element-90">
            {isWorkspacesOpen && <motion.nav initial={{
            height: 0,
            opacity: 0
          }} animate={{
            height: 'auto',
            opacity: 1
          }} exit={{
            height: 0,
            opacity: 0
          }} className="space-y-1 overflow-hidden" data-id="element-91">
                {MOCK_SIDEBAR_WORKSPACES.map(workspace => {
              const path = `/app/workspaces/${workspace.id}`;
              const isActive = location.pathname === path;
              return <NavLink key={workspace.id} to={path} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-primary/10 text-primary shadow-sm' : 'text-text-secondary hover:bg-cream hover:text-text-primary'}`} data-id="element-92">
                      <span className="text-base leading-none" data-id="element-93">
                        {workspace.emoji}
                      </span>
                      <span className="truncate" data-id="element-94">{workspace.name}</span>
                    </NavLink>;
            })}
                <NavLink to="/app/workspaces" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:bg-cream hover:text-text-primary transition-all mt-1" data-id="element-95">
                  <div className="w-4 h-4 flex items-center justify-center" data-id="element-96">
                    <PlusIcon className="w-4 h-4" data-id="element-97" />
                  </div>
                  New Workspace
                </NavLink>
              </motion.nav>}
          </AnimatePresence>
        </div>

        {/* Global Views Section */}
        <div data-id="element-98">
          <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-wider px-3 mb-2" data-id="element-99">
            Global Views
          </h3>
          <nav className="space-y-1" data-id="element-100">
            {globalViewsNav.map(item => {
            const isActive = location.pathname.startsWith(item.path);
            return <NavLink key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-primary/10 text-primary shadow-sm' : 'text-text-secondary hover:bg-cream hover:text-text-primary'}`} data-id="element-101">
                  <div className="flex items-center gap-3" data-id="element-102">
                    <item.icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-text-muted'}`} data-id="element-103" />
                    {item.name}
                  </div>
                  {item.badge && <div className="w-2 h-2 rounded-full bg-primary" data-id="element-104"></div>}
                </NavLink>;
          })}
          </nav>
        </div>
      </div>

      <div className="p-4 mt-auto border-t border-border/30 bg-warm-white sticky bottom-0" data-id="element-105">
        {/* Search */}
        <div className="relative mb-1" data-id="element-search">
          <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-white border border-border/50 rounded-xl pl-9 pr-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* Notifications */}
        <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:bg-cream hover:text-text-primary transition-all mb-1" data-id="element-notif">
          <div className="flex items-center gap-3">
            <BellIcon className="w-4 h-4 text-text-muted" />
            Notifications
          </div>
          <div className="w-2 h-2 rounded-full bg-primary" />
        </button>

        <nav className="space-y-1 mb-4" data-id="element-106">
          {bottomNavItems.map(item => {
          const isActive = location.pathname.startsWith(item.path);
          return <NavLink key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-primary/10 text-primary shadow-sm' : 'text-text-secondary hover:bg-cream hover:text-text-primary'}`} data-id="element-107">
                <div className="flex items-center gap-3" data-id="element-108">
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-text-muted'}`} data-id="element-109" />
                  {item.name}
                </div>
                {item.name === 'Usage' && <div className="text-[10px] text-text-muted font-normal" data-id="element-110">
                    ₹847 / ₹1,500
                  </div>}
                {item.badgeText && <div className="text-[9px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded" data-id="element-111">
                    {item.badgeText}
                  </div>}
              </NavLink>;
        })}
        </nav>

        <div className="bg-gradient-to-br from-primary to-primary-dark p-4 rounded-2xl relative overflow-hidden group cursor-pointer shadow-sm transition-all hover:shadow-md" data-id="element-112">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl -mr-8 -mt-8 group-hover:bg-white/20 transition-all" data-id="element-113"></div>
          <h4 className="text-sm font-bold text-white mb-1" data-id="element-114">Upgrade to Max</h4>
          <p className="text-xs text-white/80 mb-3 leading-relaxed" data-id="element-115">
            Unlock advanced agents and higher usage limits.
          </p>
          <span className="text-xs font-semibold text-white bg-white/20 px-3 py-1.5 rounded-lg inline-flex items-center gap-1 hover:bg-white/30 transition-colors" data-id="element-116">
            View plans &rarr;
          </span>
        </div>
      </div>
    </div>;
  return <div className="flex h-screen bg-white overflow-hidden font-sans" data-id="element-117">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 flex-shrink-0 h-full z-20" data-id="element-118">
        <SidebarContent data-id="element-119" />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence data-id="element-120">
        {isMobileMenuOpen && <>
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="fixed inset-0 bg-text-primary/40 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} data-id="element-121" />
            <motion.aside initial={{
          x: '-100%'
        }} animate={{
          x: 0
        }} exit={{
          x: '-100%'
        }} transition={{
          type: 'spring',
          bounce: 0,
          duration: 0.3
        }} className="fixed inset-y-0 left-0 w-72 z-50 md:hidden shadow-2xl" data-id="element-122">
              <SidebarContent data-id="element-123" />
            </motion.aside>
          </>}
      </AnimatePresence>

      {/* Mobile menu trigger */}
      <button className="md:hidden fixed top-3 left-3 z-30 p-2 bg-white border border-border rounded-lg shadow-sm text-text-secondary hover:text-text-primary hover:bg-cream transition-colors" onClick={() => setIsMobileMenuOpen(true)} data-id="element-127">
        <MenuIcon className="w-5 h-5" data-id="element-128" />
      </button>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative" data-id="element-124">
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-white" data-id="element-138">
          <Outlet data-id="element-139" />
        </main>
      </div>
    </div>;
}