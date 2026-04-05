import React, { useState, useRef, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { HeartIcon, MessageCircleIcon, BrainIcon, CalendarIcon, BotIcon, SendIcon, PaperclipIcon, PlusIcon, FileTextIcon, PinIcon, ArrowLeftIcon, XIcon, FolderIcon, SearchIcon } from 'lucide-react';
// --- Types & Mock Data for Projects ---
interface Chat {
  id: string;
  title: string;
  date: string;
  preview: string;
}
interface Project {
  id: string;
  emoji: string;
  name: string;
  description: string;
  chatCount: number;
  fileCount: number;
  lastActive: string;
  pinned: boolean;
  chats: Chat[];
  instructions: string;
  files: string[];
}
const initialProjects: Project[] = [{
  id: '1',
  emoji: '🧘',
  name: 'Morning Routines & Wellness',
  description: 'Building healthy daily habits, fitness tracking, and mindfulness practices',
  chatCount: 8,
  fileCount: 2,
  lastActive: 'Today',
  pinned: true,
  chats: [{
    id: 'c1',
    title: 'Morning routine with reading',
    date: 'Today',
    preview: 'Help me create a realistic morning routine...'
  }, {
    id: 'c2',
    title: 'Meditation habit tracking',
    date: 'Yesterday',
    preview: 'I want to build a 10-minute meditation habit...'
  }, {
    id: 'c3',
    title: 'Weekly meal prep plan',
    date: '3 days ago',
    preview: 'Can you help me plan healthy meals for...'
  }],
  instructions: 'Focus on practical, achievable advice. Keep suggestions gentle and encouraging. Prefer morning-focused routines.',
  files: ['Fitness Goals 2025.pdf', 'Supplement Research.docx']
}, {
  id: '2',
  emoji: '✈️',
  name: 'Japan Trip Planning',
  description: '14-day itinerary, budget planning, restaurant recommendations, and cultural tips',
  chatCount: 5,
  fileCount: 3,
  lastActive: '2 days ago',
  pinned: false,
  chats: [{
    id: 'c4',
    title: 'Tokyo 5-day itinerary',
    date: '2 days ago',
    preview: 'Plan a detailed 5-day Tokyo itinerary...'
  }, {
    id: 'c5',
    title: 'Budget breakdown',
    date: 'Last week',
    preview: 'Help me estimate costs for 14 days in Japan...'
  }],
  instructions: "I'm traveling in April 2026. Budget is moderate. I love food, temples, and nature. Avoid overly touristy spots.",
  files: ['Japan Visa Docs.pdf', 'Flight Booking.pdf', 'Hotel Research.xlsx']
}, {
  id: '3',
  emoji: '📚',
  name: 'Reading & Learning',
  description: 'Book recommendations, reading notes, and learning goals tracking',
  chatCount: 3,
  fileCount: 1,
  lastActive: 'Last week',
  pinned: false,
  chats: [{
    id: 'c6',
    title: '2025 reading list curation',
    date: 'Last week',
    preview: 'Help me pick 24 books for this year...'
  }],
  instructions: 'I enjoy non-fiction, psychology, business, and philosophy. Suggest books with brief reasons why.',
  files: ['Reading List 2025.docx']
}, {
  id: '4',
  emoji: '💰',
  name: 'Financial Planning',
  description: 'Budgeting, investment tracking, and financial goal setting',
  chatCount: 4,
  fileCount: 2,
  lastActive: 'Last week',
  pinned: true,
  chats: [{
    id: 'c7',
    title: 'Monthly budget template',
    date: 'Last week',
    preview: 'Create a monthly budget that accounts for...'
  }, {
    id: 'c8',
    title: 'Investment portfolio review',
    date: '2 weeks ago',
    preview: 'Review my current investment allocation...'
  }],
  instructions: "Be conservative with financial advice. Always mention risks. I'm based in India.",
  files: ['Budget 2025.xlsx', 'Investment Summary.pdf']
}];
const EMOJI_OPTIONS = ['🎯', '📚', '✈️', '💪', '🧠', '📊', '💼', '🚀', '🎨', '📝', '🧘', '💰', '🌱', '🏠'];
export function PersonalPage() {
  const navigate = useNavigate();
  // Main Tab State
  const [mainTab, setMainTab] = useState<'chat' | 'projects'>('chat');
  // --- Original Chat State ---
  const [activeMode, setActiveMode] = useState('quick');
  const [inputValue, setInputValue] = useState('');
  const modes = [{
    id: 'quick',
    name: 'Quick Chat',
    icon: MessageCircleIcon
  }, {
    id: 'deep',
    name: 'Deep Thinking',
    icon: BrainIcon
  }, {
    id: 'planner',
    name: 'Planner Mode',
    icon: CalendarIcon
  }, {
    id: 'agent',
    name: 'Agent Mode',
    icon: BotIcon
  }];
  const suggestedPrompts = ['Plan my week better', 'Help me reflect on my goals', 'Build a healthy daily routine', 'Help me plan a trip'];
  const recentSessions = [{
    title: 'Weekly Reflection & Goals',
    date: 'Yesterday'
  }, {
    title: 'Fitness Routine Planning',
    date: 'Last week'
  }, {
    title: 'Trip to Japan Itinerary',
    date: '2 weeks ago'
  }];
  const handleStartChat = () => {
    if (inputValue.trim()) navigate('/app/chat/new');
  };
  // --- Projects State ---
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [projectActiveTab, setProjectActiveTab] = useState<'chats' | 'instructions' | 'files'>('chats');
  const [projectInputValue, setProjectInputValue] = useState('');
  const [instructionsText, setInstructionsText] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    instructions: '',
    emoji: '🎯'
  });
  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const handleStartProjectChat = () => {
    if (projectInputValue.trim()) navigate('/app/chat/new');
  };
  // --- @ Mention State & Logic ---
  const [showAtPopup, setShowAtPopup] = useState(false);
  const [atQuery, setAtQuery] = useState('');
  const [activeInputTarget, setActiveInputTarget] = useState<'main' | 'project'>('main');
  const mainInputRef = useRef<HTMLInputElement>(null);
  const projectInputRef = useRef<HTMLInputElement>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, target: 'main' | 'project') => {
    const value = e.target.value;
    if (target === 'main') setInputValue(value);else setProjectInputValue(value);
    setActiveInputTarget(target);
    const words = value.split(' ');
    const lastWord = words[words.length - 1];
    if (lastWord.startsWith('@')) {
      setShowAtPopup(true);
      setAtQuery(lastWord.substring(1).toLowerCase());
    } else {
      setShowAtPopup(false);
    }
  };
  const handleMentionSelect = (name: string) => {
    if (activeInputTarget === 'main') {
      const words = inputValue.split(' ');
      words.pop();
      const newValue = words.join(' ') + (words.length > 0 ? ' ' : '') + `@${name} `;
      setInputValue(newValue);
      mainInputRef.current?.focus();
    } else {
      const words = projectInputValue.split(' ');
      words.pop();
      const newValue = words.join(' ') + (words.length > 0 ? ' ' : '') + `@${name} `;
      setProjectInputValue(newValue);
      projectInputRef.current?.focus();
    }
    setShowAtPopup(false);
  };
  const filteredDosti = projects.filter(p => p.name.toLowerCase().includes(atQuery));
  const allFiles = projects.flatMap(p => p.files);
  const uniqueFiles = Array.from(new Set(allFiles)).map((name, idx) => ({
    id: `f${idx}`,
    name,
    type: name.split('.').pop() || 'file'
  }));
  const filteredFiles = uniqueFiles.filter(f => f.name.toLowerCase().includes(atQuery));
  // --- Project Handlers ---
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name.trim()) return;
    const project: Project = {
      id: Date.now().toString(),
      emoji: newProject.emoji,
      name: newProject.name.trim(),
      description: newProject.description.trim(),
      chatCount: 0,
      fileCount: 0,
      lastActive: 'Just now',
      pinned: false,
      chats: [],
      instructions: newProject.instructions.trim(),
      files: []
    };
    setProjects([project, ...projects]);
    setShowCreateModal(false);
    setNewProject({
      name: '',
      description: '',
      instructions: '',
      emoji: '🎯'
    });
  };
  const openProject = (project: Project) => {
    setSelectedProjectId(project.id);
    setInstructionsText(project.instructions);
    setProjectActiveTab('chats');
  };
  const saveInstructions = () => {
    if (!selectedProject) return;
    setProjects(projects.map(p => p.id === selectedProject.id ? {
      ...p,
      instructions: instructionsText
    } : p));
  };
  // --- Reusable Popup Component ---
  const AtMentionPopup = () => <AnimatePresence data-id="element-849">
      {showAtPopup && <>
          <div className="fixed inset-0 z-40" onClick={() => setShowAtPopup(false)} data-id="element-850" />
          <motion.div initial={{
        opacity: 0,
        y: 10,
        scale: 0.95
      }} animate={{
        opacity: 1,
        y: 0,
        scale: 1
      }} exit={{
        opacity: 0,
        y: 10,
        scale: 0.95
      }} transition={{
        duration: 0.15
      }} className="absolute bottom-full left-0 mb-3 w-80 bg-white rounded-2xl shadow-xl border border-border overflow-hidden z-50 flex flex-col max-h-80" data-id="element-851">
            <div className="p-3 border-b border-border/50 bg-warm-white/30 flex items-center gap-2" data-id="element-852">
              <SearchIcon className="w-4 h-4 text-text-muted" data-id="element-853" />
              <input type="text" value={atQuery} onChange={e => setAtQuery(e.target.value)} placeholder="Search dosti or files..." className="bg-transparent border-none focus:outline-none text-sm w-full" autoFocus data-id="element-854" />
            </div>

            <div className="overflow-y-auto p-2 space-y-4 hide-scrollbar" data-id="element-855">
              {filteredDosti.length > 0 && <div data-id="element-856">
                  <div className="px-2 pb-1.5 text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5" data-id="element-857">
                    <FolderIcon className="w-3 h-3" data-id="element-858" /> Dosti
                  </div>
                  <div className="space-y-0.5" data-id="element-859">
                    {filteredDosti.map(dosti => <button key={dosti.id} onClick={() => handleMentionSelect(dosti.name)} className="w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-cream transition-colors text-left group" data-id="element-860">
                        <div className="w-8 h-8 rounded-lg bg-white border border-border/50 flex items-center justify-center text-sm shadow-sm group-hover:scale-105 transition-transform" data-id="element-861">
                          {dosti.emoji}
                        </div>
                        <div className="flex-1 min-w-0" data-id="element-862">
                          <p className="text-sm font-medium text-text-primary truncate" data-id="element-863">
                            {dosti.name}
                          </p>
                          <p className="text-[10px] text-text-muted capitalize" data-id="element-864">
                            Personal
                          </p>
                        </div>
                      </button>)}
                  </div>
                </div>}

              {filteredFiles.length > 0 && <div data-id="element-865">
                  <div className="px-2 pb-1.5 text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5" data-id="element-866">
                    <FileTextIcon className="w-3 h-3" data-id="element-867" /> Files
                  </div>
                  <div className="space-y-0.5" data-id="element-868">
                    {filteredFiles.map(file => <button key={file.id} onClick={() => handleMentionSelect(file.name)} className="w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-cream transition-colors text-left group" data-id="element-869">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shadow-sm group-hover:scale-105 transition-transform" data-id="element-870">
                          <FileTextIcon className="w-4 h-4" data-id="element-871" />
                        </div>
                        <div className="flex-1 min-w-0" data-id="element-872">
                          <p className="text-sm font-medium text-text-primary truncate" data-id="element-873">
                            {file.name}
                          </p>
                          <p className="text-[10px] text-text-muted uppercase" data-id="element-874">
                            {file.type}
                          </p>
                        </div>
                      </button>)}
                  </div>
                </div>}

              {filteredDosti.length === 0 && filteredFiles.length === 0 && <div className="py-6 text-center text-sm text-text-muted" data-id="element-875">
                  No results found for "{atQuery}"
                </div>}
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
  return <div className="h-full flex flex-col max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative" data-id="element-876">
      {/* Header (Always visible) */}
      <motion.div initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }} className="flex-shrink-0 mb-6" data-id="element-877">
        <div className="flex items-center gap-3 mb-3" data-id="element-878">
          <div className="w-10 h-10 rounded-full bg-rose-light/20 flex items-center justify-center text-primary" data-id="element-879">
            <HeartIcon className="w-5 h-5" data-id="element-880" />
          </div>
          <h1 className="text-3xl font-serif text-text-primary" data-id="element-881">
            Personal Space
          </h1>
        </div>
        <p className="text-text-secondary" data-id="element-882">
          A warm, supportive environment for life planning, reflection, and
          personal growth.
        </p>
      </motion.div>

      {/* Main Tabs */}
      <div className="flex items-center gap-2 mb-8 bg-warm-white p-1 rounded-xl w-fit border border-border/50" data-id="element-883">
        <button onClick={() => {
        setMainTab('chat');
        setSelectedProjectId(null);
      }} className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${mainTab === 'chat' ? 'bg-white text-primary shadow-sm border border-border/50' : 'text-text-secondary hover:text-text-primary hover:bg-cream'}`} data-id="element-884">
          <MessageCircleIcon className="w-4 h-4" data-id="element-885" />
          Chat
        </button>
        <button onClick={() => setMainTab('projects')} className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${mainTab === 'projects' ? 'bg-white text-primary shadow-sm border border-border/50' : 'text-text-secondary hover:text-text-primary hover:bg-cream'}`} data-id="element-886">
          <FolderIcon className="w-4 h-4" data-id="element-887" />
          Dosti
        </button>
      </div>

      <div className="flex-1 flex flex-col min-h-0" data-id="element-888">
        <AnimatePresence mode="wait" data-id="element-889">
          {mainTab === 'chat' ? (
        /* ==========================================
        ORIGINAL CHAT VIEW
        ========================================== */
        <motion.div key="chat-view" initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -10
        }} transition={{
          duration: 0.2
        }} className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full" data-id="element-890">
              {/* Left Column: Input & Modes */}
              <div className="lg:col-span-2 flex flex-col h-full" data-id="element-891">
                <Card className="flex-1 flex flex-col p-6 bg-white border-rose-light/20 shadow-sm relative overflow-hidden" data-id="element-892">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-rose-light/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" data-id="element-893"></div>

                  <div className="mb-6 z-10" data-id="element-894">
                    <h3 className="text-sm font-medium text-text-secondary mb-3" data-id="element-895">
                      Select Session Type
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" data-id="element-896">
                      {modes.map(mode => <button key={mode.id} onClick={() => setActiveMode(mode.id)} className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${activeMode === mode.id ? 'border-primary bg-rose-light/10 text-primary' : 'border-border bg-white text-text-secondary hover:bg-cream'}`} data-id="element-897">
                          <mode.icon className="w-5 h-5 mb-1.5" data-id="element-898" />
                          <span className="text-xs font-medium" data-id="element-899">
                            {mode.name}
                          </span>
                        </button>)}
                    </div>
                  </div>

                  <div className="mt-auto z-10" data-id="element-900">
                    <div className="flex flex-wrap gap-2 mb-4" data-id="element-901">
                      {suggestedPrompts.map((prompt, i) => <button key={i} onClick={() => {
                    setInputValue(prompt);
                    mainInputRef.current?.focus();
                  }} className="text-xs px-3 py-1.5 rounded-full bg-cream text-text-secondary hover:bg-rose-light/20 hover:text-primary transition-colors border border-border/50" data-id="element-902">
                          {prompt}
                        </button>)}
                    </div>

                    <div className="relative" data-id="element-903">
                      {activeInputTarget === 'main' && <AtMentionPopup data-id="element-904" />}
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary cursor-pointer transition-colors" data-id="element-905">
                        <PaperclipIcon className="w-5 h-5" data-id="element-906" />
                      </div>
                      <input ref={mainInputRef} type="text" value={inputValue} onChange={e => handleInputChange(e, 'main')} onKeyDown={e => e.key === 'Enter' && handleStartChat()} placeholder="What's on your mind? (type @ to mention)" className="w-full bg-white border border-border rounded-2xl pl-12 pr-14 py-4 text-sm shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" data-id="element-907" />
                      <button onClick={handleStartChat} className={`absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${inputValue.trim() ? 'bg-primary text-white shadow-sm' : 'bg-cream text-text-muted'}`} data-id="element-908">
                        <SendIcon className="w-4 h-4 ml-0.5" data-id="element-909" />
                      </button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Column: History */}
              <div className="lg:col-span-1 flex flex-col" data-id="element-910">
                <h3 className="text-sm font-medium text-text-primary mb-4" data-id="element-911">
                  Recent Personal Sessions
                </h3>
                <div className="space-y-3 overflow-y-auto pr-2 hide-scrollbar" data-id="element-912">
                  {recentSessions.map((session, i) => <Card key={i} padding="sm" clickable onClick={() => navigate(`/app/chat/${i}`)} className="bg-white/60 hover:bg-white border-border/60" data-id="element-913">
                      <div className="flex items-start justify-between gap-2" data-id="element-914">
                        <h4 className="text-sm font-medium text-text-primary line-clamp-2" data-id="element-915">
                          {session.title}
                        </h4>
                      </div>
                      <p className="text-xs text-text-muted mt-2" data-id="element-916">
                        {session.date}
                      </p>
                    </Card>)}
                  <button onClick={() => navigate('/app/history')} className="w-full py-3 text-sm text-text-secondary hover:text-primary font-medium transition-colors" data-id="element-917">
                    View all history &rarr;
                  </button>
                </div>
              </div>
            </motion.div>) : !selectedProjectId ? (
        /* ==========================================
        PROJECTS LIST VIEW
        ========================================== */
        <motion.div key="projects-list" initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -10
        }} transition={{
          duration: 0.2
        }} className="flex flex-col h-full" data-id="element-918">
              <div className="mb-6 flex items-center justify-between" data-id="element-919">
                <h2 className="text-xl font-heading font-bold text-text-primary" data-id="element-920">
                  Your Dosti
                </h2>
                <Button variant="primary" size="sm" leftIcon={<PlusIcon className="w-4 h-4" data-id="element-922" />} onClick={() => setShowCreateModal(true)} data-id="element-921">
                  New Dosti
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-10 overflow-y-auto hide-scrollbar" data-id="element-923">
                {projects.map((project, idx) => <motion.div key={project.id} initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: idx * 0.05
            }} data-id="element-924">
                    <Card padding="md" clickable onClick={() => openProject(project)} className={`h-full flex flex-col group relative ${project.pinned ? 'border-l-4 border-l-primary' : 'border-border'}`} data-id="element-925">
                      {project.pinned && <div className="absolute top-4 right-4 text-primary" data-id="element-926">
                          <PinIcon className="w-4 h-4 fill-primary/20" data-id="element-927" />
                        </div>}

                      <div className="flex items-start gap-4 mb-4" data-id="element-928">
                        <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform" data-id="element-929">
                          {project.emoji}
                        </div>
                        <div className="flex-1 min-w-0 pr-6" data-id="element-930">
                          <h3 className="font-heading font-bold text-lg text-text-primary truncate group-hover:text-primary transition-colors" data-id="element-931">
                            {project.name}
                          </h3>
                          <p className="text-sm text-text-secondary line-clamp-2 mt-1 leading-relaxed" data-id="element-932">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-auto pt-4 border-t border-border/50 flex items-center gap-4 text-xs text-text-muted font-medium" data-id="element-933">
                        <div className="flex items-center gap-1.5" data-id="element-934">
                          <MessageCircleIcon className="w-3.5 h-3.5" data-id="element-935" />
                          <span data-id="element-936">{project.chatCount}</span>
                        </div>
                        <div className="flex items-center gap-1.5" data-id="element-937">
                          <FileTextIcon className="w-3.5 h-3.5" data-id="element-938" />
                          <span data-id="element-939">{project.fileCount}</span>
                        </div>
                        <div className="ml-auto" data-id="element-940">{project.lastActive}</div>
                      </div>
                    </Card>
                  </motion.div>)}

                {/* New Project Card */}
                <motion.div initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: projects.length * 0.05
            }} data-id="element-941">
                  <button onClick={() => setShowCreateModal(true)} className="w-full h-full min-h-[160px] rounded-2xl border-2 border-dashed border-border/60 hover:border-primary/50 hover:bg-rose-light/5 flex flex-col items-center justify-center gap-3 transition-all group" data-id="element-942">
                    <div className="w-10 h-10 rounded-full bg-cream group-hover:bg-white flex items-center justify-center text-text-secondary group-hover:text-primary transition-colors shadow-sm" data-id="element-943">
                      <PlusIcon className="w-5 h-5" data-id="element-944" />
                    </div>
                    <span className="font-heading font-semibold text-text-secondary group-hover:text-primary transition-colors" data-id="element-945">
                      Create New Dosti
                    </span>
                  </button>
                </motion.div>
              </div>
            </motion.div>) : (
        /* ==========================================
        PROJECT DETAIL VIEW
        ========================================== */
        <motion.div key="project-detail" initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: 20
        }} transition={{
          duration: 0.2
        }} className="flex flex-col h-full" data-id="element-946">
              {selectedProject && <>
                  {/* Detail Header */}
                  <div className="flex-shrink-0 mb-8" data-id="element-947">
                    <button onClick={() => setSelectedProjectId(null)} className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors mb-6" data-id="element-948">
                      <ArrowLeftIcon className="w-4 h-4" data-id="element-949" /> Back to Dosti
                    </button>

                    <div className="flex items-start gap-5" data-id="element-950">
                      <div className="w-16 h-16 rounded-2xl bg-cream flex items-center justify-center text-3xl flex-shrink-0 shadow-sm" data-id="element-951">
                        {selectedProject.emoji}
                      </div>
                      <div className="flex-1" data-id="element-952">
                        <div className="flex items-center gap-3 mb-2" data-id="element-953">
                          <h1 className="text-3xl font-heading font-bold text-text-primary" data-id="element-954">
                            {selectedProject.name}
                          </h1>
                          <Badge variant="personal" data-id="element-955">Personal Dosti</Badge>
                        </div>
                        <p className="text-text-secondary text-lg max-w-2xl leading-relaxed" data-id="element-956">
                          {selectedProject.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex border-b border-border mb-6" data-id="element-957">
                    <button onClick={() => setProjectActiveTab('chats')} className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${projectActiveTab === 'chats' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'}`} data-id="element-958">
                      Chats ({selectedProject.chatCount})
                    </button>
                    <button onClick={() => setProjectActiveTab('instructions')} className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${projectActiveTab === 'instructions' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'}`} data-id="element-959">
                      Custom Instructions
                    </button>
                    <button onClick={() => setProjectActiveTab('files')} className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${projectActiveTab === 'files' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'}`} data-id="element-960">
                      Files ({selectedProject.fileCount})
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="flex-1 overflow-y-auto pb-32 hide-scrollbar" data-id="element-961">
                    {projectActiveTab === 'chats' && <div className="space-y-3" data-id="element-962">
                        {selectedProject.chats.length > 0 ? selectedProject.chats.map(chat => <Card key={chat.id} padding="md" clickable onClick={() => navigate(`/app/chat/${chat.id}`)} className="group hover:border-primary/30" data-id="element-963">
                              <div className="flex justify-between items-start mb-2" data-id="element-964">
                                <h3 className="font-heading font-bold text-text-primary group-hover:text-primary transition-colors" data-id="element-965">
                                  {chat.title}
                                </h3>
                                <span className="text-xs text-text-muted font-medium bg-warm-white px-2 py-1 rounded-md" data-id="element-966">
                                  {chat.date}
                                </span>
                              </div>
                              <p className="text-sm text-text-secondary line-clamp-1" data-id="element-967">
                                {chat.preview}
                              </p>
                            </Card>) : <div className="text-center py-12 bg-warm-white/50 rounded-2xl border border-dashed border-border" data-id="element-968">
                            <MessageCircleIcon className="w-8 h-8 text-text-muted mx-auto mb-3" data-id="element-969" />
                            <p className="text-text-secondary font-medium" data-id="element-970">
                              No chats yet. Start a conversation below!
                            </p>
                          </div>}
                      </div>}

                    {projectActiveTab === 'instructions' && <div className="bg-white rounded-2xl border border-border p-6 shadow-sm" data-id="element-971">
                        <h3 className="font-heading font-bold text-text-primary mb-2" data-id="element-972">
                          Dosti Instructions
                        </h3>
                        <p className="text-sm text-text-secondary mb-6" data-id="element-973">
                          These instructions will be applied to every new chat
                          created within this dosti.
                        </p>
                        <textarea value={instructionsText} onChange={e => setInstructionsText(e.target.value)} className="w-full h-48 p-4 bg-warm-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none mb-4" placeholder="e.g. Always respond in bullet points. Focus on actionable advice..." data-id="element-974" />
                        <div className="flex justify-end" data-id="element-975">
                          <Button onClick={saveInstructions} variant="primary" data-id="element-976">
                            Save Instructions
                          </Button>
                        </div>
                      </div>}

                    {projectActiveTab === 'files' && <div data-id="element-977">
                        <div className="flex justify-between items-center mb-6" data-id="element-978">
                          <p className="text-sm text-text-secondary" data-id="element-979">
                            Files available as context for all chats in this
                            dosti.
                          </p>
                          <Button variant="outline" size="sm" leftIcon={<PlusIcon className="w-4 h-4" data-id="element-981" />} data-id="element-980">
                            Attach File
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-id="element-982">
                          {selectedProject.files.length > 0 ? selectedProject.files.map((file, i) => <div key={i} className="flex items-center gap-3 p-4 bg-white border border-border rounded-xl shadow-sm" data-id="element-983">
                                <div className="w-10 h-10 rounded-lg bg-rose-light/10 flex items-center justify-center text-primary flex-shrink-0" data-id="element-984">
                                  <FileTextIcon className="w-5 h-5" data-id="element-985" />
                                </div>
                                <div className="flex-1 min-w-0" data-id="element-986">
                                  <p className="text-sm font-medium text-text-primary truncate" data-id="element-987">
                                    {file}
                                  </p>
                                  <p className="text-xs text-text-muted" data-id="element-988">
                                    Document
                                  </p>
                                </div>
                              </div>) : <div className="col-span-full text-center py-12 bg-warm-white/50 rounded-2xl border border-dashed border-border" data-id="element-989">
                              <FileTextIcon className="w-8 h-8 text-text-muted mx-auto mb-3" data-id="element-990" />
                              <p className="text-text-secondary font-medium" data-id="element-991">
                                No files attached yet.
                              </p>
                            </div>}
                        </div>
                      </div>}
                  </div>

                  {/* Project Chat Input */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-10 pb-6 px-4 sm:px-6 lg:px-8" data-id="element-992">
                    <div className="max-w-4xl mx-auto relative" data-id="element-993">
                      {activeInputTarget === 'project' && <AtMentionPopup data-id="element-994" />}
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary cursor-pointer transition-colors" data-id="element-995">
                        <PaperclipIcon className="w-5 h-5" data-id="element-996" />
                      </div>
                      <input ref={projectInputRef} type="text" value={projectInputValue} onChange={e => handleInputChange(e, 'project')} onKeyDown={e => e.key === 'Enter' && handleStartProjectChat()} placeholder={`Message ${selectedProject.name}... (type @ to mention)`} className="w-full bg-white border border-border rounded-2xl pl-12 pr-14 py-4 text-sm shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" data-id="element-997" />
                      <button onClick={handleStartProjectChat} className={`absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${projectInputValue.trim() ? 'bg-primary text-white shadow-sm' : 'bg-cream text-text-muted'}`} data-id="element-998">
                        <SendIcon className="w-4 h-4 ml-0.5" data-id="element-999" />
                      </button>
                    </div>
                  </div>
                </>}
            </motion.div>)}
        </AnimatePresence>
      </div>

      {/* Create Project Modal */}
      <AnimatePresence data-id="element-1000">
        {showCreateModal && <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-text-primary/40 backdrop-blur-sm" data-id="element-1001">
            <motion.div initial={{
          opacity: 0,
          scale: 0.95,
          y: 20
        }} animate={{
          opacity: 1,
          scale: 1,
          y: 0
        }} exit={{
          opacity: 0,
          scale: 0.95,
          y: 20
        }} className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-border/50 flex flex-col max-h-[90vh]" data-id="element-1002">
              <div className="p-6 border-b border-border/50 flex justify-between items-center bg-warm-white/30 flex-shrink-0" data-id="element-1003">
                <h3 className="text-xl font-heading font-bold text-text-primary" data-id="element-1004">
                  Create Personal Dosti
                </h3>
                <button onClick={() => setShowCreateModal(false)} className="p-2 text-text-muted hover:text-text-primary rounded-full hover:bg-cream transition-colors" data-id="element-1005">
                  <XIcon className="w-5 h-5" data-id="element-1006" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto" data-id="element-1007">
                <form id="create-project-form" onSubmit={handleCreateProject} className="space-y-6" data-id="element-1008">
                  <div data-id="element-1009">
                    <label className="block text-sm font-medium text-text-primary mb-2" data-id="element-1010">
                      Dosti Icon
                    </label>
                    <div className="flex flex-wrap gap-2" data-id="element-1011">
                      {EMOJI_OPTIONS.map(emoji => <button key={emoji} type="button" onClick={() => setNewProject({
                    ...newProject,
                    emoji
                  })} className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${newProject.emoji === emoji ? 'bg-rose-light/20 border-2 border-primary' : 'bg-cream border border-transparent hover:bg-border'}`} data-id="element-1012">
                          {emoji}
                        </button>)}
                    </div>
                  </div>

                  <Input label="Dosti Name" placeholder="e.g. Fitness Journey 2025" value={newProject.name} onChange={e => setNewProject({
                ...newProject,
                name: e.target.value
              })} required data-id="element-1013" />

                  <div data-id="element-1014">
                    <label className="block text-sm font-medium text-text-primary mb-1 ml-1" data-id="element-1015">
                      Description
                    </label>
                    <textarea value={newProject.description} onChange={e => setNewProject({
                  ...newProject,
                  description: e.target.value
                })} className="w-full p-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none h-20" placeholder="What is this project about?" required data-id="element-1016" />
                  </div>

                  <div data-id="element-1017">
                    <label className="block text-sm font-medium text-text-primary mb-1 ml-1" data-id="element-1018">
                      Custom Instructions (Optional)
                    </label>
                    <p className="text-xs text-text-secondary mb-2 ml-1" data-id="element-1019">
                      Rules Aruna should follow for all chats in this dosti.
                    </p>
                    <textarea value={newProject.instructions} onChange={e => setNewProject({
                  ...newProject,
                  instructions: e.target.value
                })} className="w-full p-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none h-24" placeholder="e.g. Keep responses concise. Focus on actionable steps." data-id="element-1020" />
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-border/50 bg-warm-white/30 flex justify-end gap-3 flex-shrink-0" data-id="element-1021">
                <Button type="button" variant="ghost" onClick={() => setShowCreateModal(false)} data-id="element-1022">
                  Cancel
                </Button>
                <Button type="submit" form="create-project-form" variant="primary" disabled={!newProject.name.trim() || !newProject.description.trim()} data-id="element-1023">
                  Create Dosti
                </Button>
              </div>
            </motion.div>
          </div>}
      </AnimatePresence>
    </div>;
}