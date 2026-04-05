import React, { useState, Children } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { PlusIcon, PinIcon, LayoutGridIcon } from 'lucide-react';
type WorkspaceType = 'Personal' | 'Professional' | 'Shared';
interface Workspace {
  id: string;
  emoji: string;
  name: string;
  description: string;
  type: WorkspaceType;
  chats: number;
  files: number;
  outputs: number;
  lastActive: string;
  isPinned: boolean;
  members?: number;
}
const MOCK_WORKSPACES: Workspace[] = [{
  id: '1',
  emoji: '🚀',
  name: 'Trustopay GTM',
  description: 'Go-to-market strategy for the new invoice financing product.',
  type: 'Professional',
  chats: 12,
  files: 8,
  outputs: 5,
  lastActive: '2 hours ago',
  isPinned: true,
  members: 2
}, {
  id: '2',
  emoji: '💼',
  name: 'Fundraising & Pitch',
  description: 'Seed round pitch deck, financial models, and investor CRM.',
  type: 'Professional',
  chats: 8,
  files: 15,
  outputs: 3,
  lastActive: 'Yesterday',
  isPinned: false
}, {
  id: '3',
  emoji: '🧘',
  name: 'Morning Routines',
  description: 'Habit tracking, daily journaling, and fitness planning.',
  type: 'Personal',
  chats: 5,
  files: 2,
  outputs: 1,
  lastActive: 'Today',
  isPinned: true
}, {
  id: '4',
  emoji: '📊',
  name: 'Market Research Hub',
  description: 'Deep dives into Indian SaaS, competitor pricing, and trends.',
  type: 'Shared',
  chats: 15,
  files: 20,
  outputs: 8,
  lastActive: '3 days ago',
  isPinned: false,
  members: 3
}, {
  id: '5',
  emoji: '✈️',
  name: 'Japan Trip Planning',
  description: 'Itinerary, bookings, and research for the Tokyo trip.',
  type: 'Personal',
  chats: 3,
  files: 4,
  outputs: 2,
  lastActive: 'Last week',
  isPinned: false
}, {
  id: '6',
  emoji: '🎯',
  name: 'Q4 OKR Planning',
  description: 'Company objectives, team key results, and alignment docs.',
  type: 'Shared',
  chats: 6,
  files: 3,
  outputs: 4,
  lastActive: '2 weeks ago',
  isPinned: false,
  members: 4
}];
export function WorkspacesPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Personal', 'Professional', 'Shared'];
  const filteredWorkspaces = MOCK_WORKSPACES.filter(w => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Shared') return w.type === 'Shared';
    return w.type === activeFilter;
  }).sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });
  const stagger = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  const itemAnim = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };
  return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12" data-id="element-1878">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8" data-id="element-1879">
        <div data-id="element-1880">
          <h1 className="text-3xl font-heading font-bold text-text-primary" data-id="element-1881">
            Workspaces
          </h1>
          <p className="text-text-secondary mt-1" data-id="element-1882">
            Organize your projects, files, and agents.
          </p>
        </div>
        <Button variant="primary" leftIcon={<PlusIcon className="w-4 h-4" data-id="element-1884" />} data-id="element-1883">
          New Workspace
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8" data-id="element-1885">
        {filters.map(filter => <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === filter ? 'bg-primary text-white shadow-sm' : 'bg-white border border-border text-text-secondary hover:bg-cream hover:text-text-primary'}`} data-id="element-1886">
            {filter}
          </button>)}
      </div>

      {/* Grid */}
      {filteredWorkspaces.length > 0 ? <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" data-id="element-1887">
          <AnimatePresence mode="popLayout" data-id="element-1888">
            {filteredWorkspaces.map(workspace => <motion.div key={workspace.id} variants={itemAnim} layout data-id="element-1889">
                <Card padding="md" clickable onClick={() => navigate(`/app/workspaces/${workspace.id}`)} className="h-full flex flex-col relative group" data-id="element-1890">
                  {workspace.isPinned && <div className="absolute top-4 right-4 text-amber-500" data-id="element-1891">
                      <PinIcon className="w-4 h-4 fill-current" data-id="element-1892" />
                    </div>}

                  <div className="mb-3" data-id="element-1893">
                    <span className="text-3xl block mb-2" data-id="element-1894">
                      {workspace.emoji}
                    </span>
                    <h3 className="text-lg font-heading font-bold text-text-primary group-hover:text-primary transition-colors pr-6" data-id="element-1895">
                      {workspace.name}
                    </h3>
                  </div>

                  <p className="text-sm text-text-secondary line-clamp-1 mb-4 flex-1" data-id="element-1896">
                    {workspace.description}
                  </p>

                  <div className="text-xs text-text-muted mb-4 font-medium" data-id="element-1897">
                    {workspace.chats} chats · {workspace.files} files ·{' '}
                    {workspace.outputs} outputs
                  </div>

                  <div className="pt-4 border-t border-border/50 flex items-center justify-between mt-auto" data-id="element-1898">
                    <div className="flex items-center gap-2" data-id="element-1899">
                      <Badge variant={workspace.type === 'Personal' ? 'personal' : workspace.type === 'Professional' ? 'professional' : 'default'} className="text-[10px] uppercase tracking-wider" data-id="element-1900">
                        {workspace.type}
                      </Badge>
                      <span className="text-xs text-text-muted" data-id="element-1901">
                        {workspace.lastActive}
                      </span>
                    </div>

                    {workspace.members && workspace.members > 0 && <div className="flex -space-x-2" data-id="element-1902">
                        {[...Array(workspace.members)].map((_, i) => <div key={i} className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white ${['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500'][i % 4]}`} data-id="element-1903">
                            {['AL', 'SR', 'JD', 'MK'][i % 4]}
                          </div>)}
                      </div>}
                  </div>
                </Card>
              </motion.div>)}
          </AnimatePresence>
        </motion.div> : <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="flex flex-col items-center justify-center py-20 text-center" data-id="element-1904">
          <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mb-4" data-id="element-1905">
            <LayoutGridIcon className="w-8 h-8 text-text-muted" data-id="element-1906" />
          </div>
          <h3 className="text-lg font-heading font-bold text-text-primary mb-1" data-id="element-1907">
            No workspaces found
          </h3>
          <p className="text-sm text-text-secondary" data-id="element-1908">
            Try changing your filter or create a new workspace.
          </p>
        </motion.div>}
    </div>;
}