import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { SearchIcon, StarIcon, HeartIcon, BriefcaseIcon, GlobeIcon, MoreVerticalIcon } from 'lucide-react';
export function HistoryPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const filters = [{
    id: 'all',
    label: 'All Sessions'
  }, {
    id: 'personal',
    label: 'Personal'
  }, {
    id: 'professional',
    label: 'Professional'
  }, {
    id: 'general',
    label: 'General'
  }, {
    id: 'starred',
    label: 'Starred'
  }];
  const initialSessions = [{
    id: 1,
    title: 'Weekly Reflection & Goals',
    mode: 'personal',
    date: 'Yesterday',
    preview: 'Looking back at the past week, I accomplished...',
    starred: true
  }, {
    id: 2,
    title: 'Trustopay GTM Strategy',
    mode: 'professional',
    date: '2 days ago',
    preview: 'The primary target audience for the initial launch should be...',
    starred: true
  }, {
    id: 3,
    title: 'Fitness Routine Planning',
    mode: 'personal',
    date: 'Last week',
    preview: 'Based on your goal of 3 days a week, here is a balanced...',
    starred: false
  }, {
    id: 4,
    title: 'Competitor Analysis: Fintech',
    mode: 'professional',
    date: 'Last week',
    preview: 'Analyzing the top 3 competitors in the invoice financing space...',
    starred: false
  }, {
    id: 5,
    title: 'Trip to Japan Itinerary',
    mode: 'personal',
    date: '2 weeks ago',
    preview: 'A 10-day itinerary focusing on Tokyo, Kyoto, and Osaka...',
    starred: true
  }, {
    id: 6,
    title: 'Q3 OKRs Planning',
    mode: 'professional',
    date: '3 weeks ago',
    preview: 'Setting objectives and key results for the engineering and product teams...',
    starred: false
  }, {
    id: 7,
    title: 'Book Notes: Atomic Habits',
    mode: 'personal',
    date: 'Last month',
    preview: 'Key takeaways on building systems instead of setting goals...',
    starred: false
  }, {
    id: 8,
    title: 'Investor Pitch Deck Outline',
    mode: 'professional',
    date: 'Last month',
    preview: 'Structure for the seed round pitch deck, highlighting traction...',
    starred: true
  }, {
    id: 9,
    title: 'Quick question about cooking pasta',
    mode: 'general',
    date: 'Today',
    preview: 'What is the best way to cook al dente pasta...',
    starred: false
  }, {
    id: 10,
    title: 'Random brainstorm session',
    mode: 'general',
    date: '3 days ago',
    preview: 'Help me think through some creative ideas for...',
    starred: false
  }, {
    id: 11,
    title: 'Movie recommendations',
    mode: 'general',
    date: 'Last week',
    preview: 'Suggest some thriller movies similar to...',
    starred: true
  }];
  const [sessions, setSessions] = useState(initialSessions);
  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  const filteredSessions = sessions.filter(session => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'starred') return session.starred;
    return session.mode === activeFilter;
  });
  const handleMoveSession = (id: number, newMode: string) => {
    setSessions(sessions.map(s => s.id === id ? {
      ...s,
      mode: newMode
    } : s));
    setActiveMenuId(null);
  };
  const toggleStar = (id: number) => {
    setSessions(sessions.map(s => s.id === id ? {
      ...s,
      starred: !s.starred
    } : s));
  };
  return <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12" data-id="element-756">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8" data-id="element-757">
        <div data-id="element-758">
          <h1 className="text-3xl font-serif text-text-primary" data-id="element-759">History</h1>
          <p className="text-text-secondary mt-1" data-id="element-760">
            Access your past conversations and thoughts.
          </p>
        </div>

        <div className="relative w-full md:w-64" data-id="element-761">
          <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" data-id="element-762" />
          <input type="text" placeholder="Search sessions..." className="w-full bg-white border border-border rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm" data-id="element-763" />
        </div>
      </div>

      {/* Filters */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-2" data-id="element-764">
        {filters.map(filter => <button key={filter.id} onClick={() => setActiveFilter(filter.id)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeFilter === filter.id ? 'bg-text-primary text-white' : 'bg-white border border-border text-text-secondary hover:text-text-primary hover:bg-cream'}`} data-id="element-765">
            {filter.label}
          </button>)}
      </div>

      {/* Session List */}
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="space-y-3" data-id="element-766">
        {filteredSessions.map((session, idx) => <motion.div key={session.id} initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: idx * 0.05
      }} data-id="element-767">
            <Card padding="md" clickable onClick={() => navigate(`/app/chat/${session.id}`)} className="flex flex-col sm:flex-row sm:items-center gap-4 group relative overflow-visible" data-id="element-768">
              <div className="flex-shrink-0 mt-1 sm:mt-0" data-id="element-769">
                {session.mode === 'personal' && <div className="w-10 h-10 rounded-full bg-rose-light/20 flex items-center justify-center text-primary" data-id="element-770">
                    <HeartIcon className="w-5 h-5" data-id="element-771" />
                  </div>}
                {session.mode === 'professional' && <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700" data-id="element-772">
                    <BriefcaseIcon className="w-5 h-5" data-id="element-773" />
                  </div>}
                {session.mode === 'general' && <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600" data-id="element-774">
                    <GlobeIcon className="w-5 h-5" data-id="element-775" />
                  </div>}
              </div>

              <div className="flex-1 min-w-0" data-id="element-776">
                <div className="flex items-center gap-3 mb-1" data-id="element-777">
                  <h3 className="text-base font-medium text-text-primary truncate group-hover:text-primary transition-colors" data-id="element-778">
                    {session.title}
                  </h3>
                  <Badge variant={session.mode === 'general' ? 'default' : session.mode as any} data-id="element-779">
                    {session.mode === 'personal' ? 'Personal' : session.mode === 'professional' ? 'Professional' : 'General'}
                  </Badge>
                </div>
                <p className="text-sm text-text-secondary truncate" data-id="element-780">
                  {session.preview}
                </p>
              </div>

              <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2" data-id="element-781">
                <span className="text-xs text-text-muted whitespace-nowrap" data-id="element-782">
                  {session.date}
                </span>
                <div className="flex items-center gap-1" data-id="element-783">
                  <button className={`p-1.5 rounded-full transition-colors ${session.starred ? 'text-amber-400' : 'text-text-muted opacity-0 group-hover:opacity-100 hover:bg-cream'}`} onClick={e => {
                e.stopPropagation();
                toggleStar(session.id);
              }} data-id="element-784">
                    <StarIcon className="w-4 h-4" fill={session.starred ? 'currentColor' : 'none'} data-id="element-785" />
                  </button>

                  {/* Move Menu Trigger */}
                  <div className="relative" onClick={e => e.stopPropagation()} data-id="element-786">
                    <button onClick={e => {
                  e.stopPropagation();
                  setActiveMenuId(activeMenuId === session.id ? null : session.id);
                }} className="p-1.5 text-text-muted hover:text-text-primary rounded-md hover:bg-cream transition-colors opacity-0 group-hover:opacity-100" data-id="element-787">
                      <MoreVerticalIcon className="w-4 h-4" data-id="element-788" />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence data-id="element-789">
                      {activeMenuId === session.id && <motion.div initial={{
                    opacity: 0,
                    scale: 0.95,
                    y: -10
                  }} animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0
                  }} exit={{
                    opacity: 0,
                    scale: 0.95,
                    y: -10
                  }} transition={{
                    duration: 0.1
                  }} className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-border/50 py-1.5 z-50" data-id="element-790">
                          <div className="px-3 py-1.5 text-xs font-semibold text-text-muted uppercase tracking-wider" data-id="element-791">
                            Move to...
                          </div>
                          {session.mode !== 'personal' && <button onClick={() => handleMoveSession(session.id, 'personal')} className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-rose-light/20 hover:text-primary flex items-center gap-2 transition-colors" data-id="element-792">
                              <HeartIcon className="w-4 h-4" data-id="element-793" /> Personal Space
                            </button>}
                          {session.mode !== 'professional' && <button onClick={() => handleMoveSession(session.id, 'professional')} className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-slate-100 hover:text-slate-800 flex items-center gap-2 transition-colors" data-id="element-794">
                              <BriefcaseIcon className="w-4 h-4" data-id="element-795" /> Professional
                              Space
                            </button>}
                          {session.mode !== 'general' && <button onClick={() => handleMoveSession(session.id, 'general')} className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-cream flex items-center gap-2 transition-colors" data-id="element-796">
                              <GlobeIcon className="w-4 h-4" data-id="element-797" /> General
                            </button>}
                        </motion.div>}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>)}
      </motion.div>
    </div>;
}