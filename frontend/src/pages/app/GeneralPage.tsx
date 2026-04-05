import React, { useState, useRef, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { GlobeIcon, MessageCircleIcon, BrainIcon, CalendarIcon, BotIcon, SendIcon, PaperclipIcon, PlusIcon, FileTextIcon, PinIcon, ArrowLeftIcon, XIcon, FolderIcon, SearchIcon } from 'lucide-react';
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
  emoji: '🍳',
  name: 'Cooking & Recipes',
  description: 'Quick recipes, meal ideas, and cooking tips',
  chatCount: 5,
  fileCount: 1,
  lastActive: 'Today',
  pinned: true,
  chats: [{
    id: 'c1',
    title: 'Best pasta recipes',
    date: 'Today',
    preview: 'What is the best way to cook al dente pasta...'
  }, {
    id: 'c2',
    title: 'Quick weeknight dinners',
    date: 'Yesterday',
    preview: 'I need some 30-minute meal ideas for...'
  }],
  instructions: 'Keep recipes simple and practical. Prefer 30-minute meals.',
  files: ['Favorite Recipes.docx']
}, {
  id: '2',
  emoji: '🎬',
  name: 'Movies & Entertainment',
  description: 'Recommendations, reviews, and watchlists',
  chatCount: 3,
  fileCount: 0,
  lastActive: '3 days ago',
  pinned: false,
  chats: [{
    id: 'c3',
    title: 'Thriller movie suggestions',
    date: '3 days ago',
    preview: 'Suggest some thriller movies similar to...'
  }],
  instructions: 'I enjoy thrillers, sci-fi, and documentaries.',
  files: []
}, {
  id: '3',
  emoji: '💡',
  name: 'Random Ideas & Questions',
  description: 'Quick questions, brainstorms, and curiosity-driven chats',
  chatCount: 6,
  fileCount: 0,
  lastActive: 'Last week',
  pinned: false,
  chats: [{
    id: 'c4',
    title: 'How does blockchain work?',
    date: 'Last week',
    preview: 'Can you explain blockchain in simple terms...'
  }, {
    id: 'c5',
    title: 'Gift ideas for mom',
    date: '2 weeks ago',
    preview: 'I need some creative gift ideas for my mom...'
  }],
  instructions: '',
  files: []
}];
const EMOJI_OPTIONS = ['🎯', '📚', '✈️', '💪', '🧠', '📊', '💼', '🚀', '🎨', '📝', '🧘', '💰', '🌱', '🏠', '🍳', '🎬', '💡'];
export function GeneralPage() {
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
  const suggestedPrompts = ['Help me decide something', 'Explain a concept simply', 'Recommend something fun', 'Quick brainstorm session'];
  const recentSessions = [{
    title: 'Quick question about cooking pasta',
    date: 'Today'
  }, {
    title: 'Movie recommendations',
    date: '3 days ago'
  }, {
    title: 'Random brainstorm session',
    date: 'Last week'
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
    emoji: '💡'
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
      emoji: '💡'
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
  const AtMentionPopup = () => <AnimatePresence data-id="element-581">
      {showAtPopup && <>
          <div className="fixed inset-0 z-40" onClick={() => setShowAtPopup(false)} data-id="element-582" />
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
      }} className="absolute bottom-full left-0 mb-3 w-80 bg-white rounded-2xl shadow-xl border border-border overflow-hidden z-50 flex flex-col max-h-80" data-id="element-583">
            <div className="p-3 border-b border-border/50 bg-warm-white/30 flex items-center gap-2" data-id="element-584">
              <SearchIcon className="w-4 h-4 text-text-muted" data-id="element-585" />
              <input type="text" value={atQuery} onChange={e => setAtQuery(e.target.value)} placeholder="Search dosti or files..." className="bg-transparent border-none focus:outline-none text-sm w-full" autoFocus data-id="element-586" />
            </div>

            <div className="overflow-y-auto p-2 space-y-4 hide-scrollbar" data-id="element-587">
              {filteredDosti.length > 0 && <div data-id="element-588">
                  <div className="px-2 pb-1.5 text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5" data-id="element-589">
                    <FolderIcon className="w-3 h-3" data-id="element-590" /> Dosti
                  </div>
                  <div className="space-y-0.5" data-id="element-591">
                    {filteredDosti.map(dosti => <button key={dosti.id} onClick={() => handleMentionSelect(dosti.name)} className="w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-cream transition-colors text-left group" data-id="element-592">
                        <div className="w-8 h-8 rounded-lg bg-white border border-border/50 flex items-center justify-center text-sm shadow-sm group-hover:scale-105 transition-transform" data-id="element-593">
                          {dosti.emoji}
                        </div>
                        <div className="flex-1 min-w-0" data-id="element-594">
                          <p className="text-sm font-medium text-text-primary truncate" data-id="element-595">
                            {dosti.name}
                          </p>
                          <p className="text-[10px] text-text-muted capitalize" data-id="element-596">
                            General
                          </p>
                        </div>
                      </button>)}
                  </div>
                </div>}

              {filteredFiles.length > 0 && <div data-id="element-597">
                  <div className="px-2 pb-1.5 text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5" data-id="element-598">
                    <FileTextIcon className="w-3 h-3" data-id="element-599" /> Files
                  </div>
                  <div className="space-y-0.5" data-id="element-600">
                    {filteredFiles.map(file => <button key={file.id} onClick={() => handleMentionSelect(file.name)} className="w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-cream transition-colors text-left group" data-id="element-601">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shadow-sm group-hover:scale-105 transition-transform" data-id="element-602">
                          <FileTextIcon className="w-4 h-4" data-id="element-603" />
                        </div>
                        <div className="flex-1 min-w-0" data-id="element-604">
                          <p className="text-sm font-medium text-text-primary truncate" data-id="element-605">
                            {file.name}
                          </p>
                          <p className="text-[10px] text-text-muted uppercase" data-id="element-606">
                            {file.type}
                          </p>
                        </div>
                      </button>)}
                  </div>
                </div>}

              {filteredDosti.length === 0 && filteredFiles.length === 0 && <div className="py-6 text-center text-sm text-text-muted" data-id="element-607">
                  No results found for "{atQuery}"
                </div>}
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
  return <div className="h-full flex flex-col max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative" data-id="element-608">
      {/* Header (Always visible) */}
      <motion.div initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }} className="flex-shrink-0 mb-6" data-id="element-609">
        <div className="flex items-center gap-3 mb-3" data-id="element-610">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600" data-id="element-611">
            <GlobeIcon className="w-5 h-5" data-id="element-612" />
          </div>
          <h1 className="text-3xl font-serif text-text-primary" data-id="element-613">
            General Space
          </h1>
        </div>
        <p className="text-text-secondary" data-id="element-614">
          A flexible space for everyday conversations, quick questions, and
          casual brainstorming.
        </p>
      </motion.div>

      {/* Main Tabs */}
      <div className="flex items-center gap-2 mb-8 bg-warm-white p-1 rounded-xl w-fit border border-border/50" data-id="element-615">
        <button onClick={() => {
        setMainTab('chat');
        setSelectedProjectId(null);
      }} className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${mainTab === 'chat' ? 'bg-white text-primary shadow-sm border border-border/50' : 'text-text-secondary hover:text-text-primary hover:bg-cream'}`} data-id="element-616">
          <MessageCircleIcon className="w-4 h-4" data-id="element-617" />
          Chat
        </button>
        <button onClick={() => setMainTab('projects')} className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${mainTab === 'projects' ? 'bg-white text-primary shadow-sm border border-border/50' : 'text-text-secondary hover:text-text-primary hover:bg-cream'}`} data-id="element-618">
          <FolderIcon className="w-4 h-4" data-id="element-619" />
          Dosti
        </button>
      </div>

      <div className="flex-1 flex flex-col min-h-0" data-id="element-620">
        <AnimatePresence mode="wait" data-id="element-621">
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
        }} className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full" data-id="element-622">
              {/* Left Column: Input & Modes */}
              <div className="lg:col-span-2 flex flex-col h-full" data-id="element-623">
                <Card className="flex-1 flex flex-col p-6 bg-white border-gray-200 shadow-sm relative overflow-hidden" data-id="element-624">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50/50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" data-id="element-625"></div>

                  <div className="mb-6 z-10" data-id="element-626">
                    <h3 className="text-sm font-medium text-text-secondary mb-3" data-id="element-627">
                      Select Session Type
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" data-id="element-628">
                      {modes.map(mode => <button key={mode.id} onClick={() => setActiveMode(mode.id)} className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${activeMode === mode.id ? 'border-primary bg-gray-50 text-primary' : 'border-border bg-white text-text-secondary hover:bg-cream'}`} data-id="element-629">
                          <mode.icon className="w-5 h-5 mb-1.5" data-id="element-630" />
                          <span className="text-xs font-medium" data-id="element-631">
                            {mode.name}
                          </span>
                        </button>)}
                    </div>
                  </div>

                  <div className="mt-auto z-10" data-id="element-632">
                    <div className="flex flex-wrap gap-2 mb-4" data-id="element-633">
                      {suggestedPrompts.map((prompt, i) => <button key={i} onClick={() => {
                    setInputValue(prompt);
                    mainInputRef.current?.focus();
                  }} className="text-xs px-3 py-1.5 rounded-full bg-cream text-text-secondary hover:bg-gray-100 hover:text-primary transition-colors border border-border/50" data-id="element-634">
                          {prompt}
                        </button>)}
                    </div>

                    <div className="relative" data-id="element-635">
                      {activeInputTarget === 'main' && <AtMentionPopup data-id="element-636" />}
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary cursor-pointer transition-colors" data-id="element-637">
                        <PaperclipIcon className="w-5 h-5" data-id="element-638" />
                      </div>
                      <input ref={mainInputRef} type="text" value={inputValue} onChange={e => handleInputChange(e, 'main')} onKeyDown={e => e.key === 'Enter' && handleStartChat()} placeholder="What's on your mind? (type @ to mention)" className="w-full bg-white border border-border rounded-2xl pl-12 pr-14 py-4 text-sm shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" data-id="element-639" />
                      <button onClick={handleStartChat} className={`absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${inputValue.trim() ? 'bg-primary text-white shadow-sm' : 'bg-cream text-text-muted'}`} data-id="element-640">
                        <SendIcon className="w-4 h-4 ml-0.5" data-id="element-641" />
                      </button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Column: History */}
              <div className="lg:col-span-1 flex flex-col" data-id="element-642">
                <h3 className="text-sm font-medium text-text-primary mb-4" data-id="element-643">
                  Recent General Sessions
                </h3>
                <div className="space-y-3 overflow-y-auto pr-2 hide-scrollbar" data-id="element-644">
                  {recentSessions.map((session, i) => <Card key={i} padding="sm" clickable onClick={() => navigate(`/app/chat/${i}`)} className="bg-white/60 hover:bg-white border-border/60" data-id="element-645">
                      <div className="flex items-start justify-between gap-2" data-id="element-646">
                        <h4 className="text-sm font-medium text-text-primary line-clamp-2" data-id="element-647">
                          {session.title}
                        </h4>
                      </div>
                      <p className="text-xs text-text-muted mt-2" data-id="element-648">
                        {session.date}
                      </p>
                    </Card>)}
                  <button onClick={() => navigate('/app/history')} className="w-full py-3 text-sm text-text-secondary hover:text-primary font-medium transition-colors" data-id="element-649">
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
        }} className="flex flex-col h-full" data-id="element-650">
              <div className="mb-6 flex items-center justify-between" data-id="element-651">
                <h2 className="text-xl font-heading font-bold text-text-primary" data-id="element-652">
                  Your Dosti
                </h2>
                <Button variant="primary" size="sm" leftIcon={<PlusIcon className="w-4 h-4" data-id="element-654" />} onClick={() => setShowCreateModal(true)} data-id="element-653">
                  New Dosti
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-10 overflow-y-auto hide-scrollbar" data-id="element-655">
                {projects.map((project, idx) => <motion.div key={project.id} initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: idx * 0.05
            }} data-id="element-656">
                    <Card padding="md" clickable onClick={() => openProject(project)} className={`h-full flex flex-col group relative ${project.pinned ? 'border-l-4 border-l-gray-400' : 'border-border'}`} data-id="element-657">
                      {project.pinned && <div className="absolute top-4 right-4 text-gray-400" data-id="element-658">
                          <PinIcon className="w-4 h-4 fill-gray-200" data-id="element-659" />
                        </div>}

                      <div className="flex items-start gap-4 mb-4" data-id="element-660">
                        <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform" data-id="element-661">
                          {project.emoji}
                        </div>
                        <div className="flex-1 min-w-0 pr-6" data-id="element-662">
                          <h3 className="font-heading font-bold text-lg text-text-primary truncate group-hover:text-primary transition-colors" data-id="element-663">
                            {project.name}
                          </h3>
                          <p className="text-sm text-text-secondary line-clamp-2 mt-1 leading-relaxed" data-id="element-664">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-auto pt-4 border-t border-border/50 flex items-center gap-4 text-xs text-text-muted font-medium" data-id="element-665">
                        <div className="flex items-center gap-1.5" data-id="element-666">
                          <MessageCircleIcon className="w-3.5 h-3.5" data-id="element-667" />
                          <span data-id="element-668">{project.chatCount}</span>
                        </div>
                        <div className="flex items-center gap-1.5" data-id="element-669">
                          <FileTextIcon className="w-3.5 h-3.5" data-id="element-670" />
                          <span data-id="element-671">{project.fileCount}</span>
                        </div>
                        <div className="ml-auto" data-id="element-672">{project.lastActive}</div>
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
            }} data-id="element-673">
                  <button onClick={() => setShowCreateModal(true)} className="w-full h-full min-h-[160px] rounded-2xl border-2 border-dashed border-border/60 hover:border-primary/50 hover:bg-gray-50/50 flex flex-col items-center justify-center gap-3 transition-all group" data-id="element-674">
                    <div className="w-10 h-10 rounded-full bg-cream group-hover:bg-white flex items-center justify-center text-text-secondary group-hover:text-primary transition-colors shadow-sm" data-id="element-675">
                      <PlusIcon className="w-5 h-5" data-id="element-676" />
                    </div>
                    <span className="font-heading font-semibold text-text-secondary group-hover:text-primary transition-colors" data-id="element-677">
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
        }} className="flex flex-col h-full" data-id="element-678">
              {selectedProject && <>
                  {/* Detail Header */}
                  <div className="flex-shrink-0 mb-8" data-id="element-679">
                    <button onClick={() => setSelectedProjectId(null)} className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors mb-6" data-id="element-680">
                      <ArrowLeftIcon className="w-4 h-4" data-id="element-681" /> Back to Dosti
                    </button>

                    <div className="flex items-start gap-5" data-id="element-682">
                      <div className="w-16 h-16 rounded-2xl bg-cream flex items-center justify-center text-3xl flex-shrink-0 shadow-sm" data-id="element-683">
                        {selectedProject.emoji}
                      </div>
                      <div className="flex-1" data-id="element-684">
                        <div className="flex items-center gap-3 mb-2" data-id="element-685">
                          <h1 className="text-3xl font-heading font-bold text-text-primary" data-id="element-686">
                            {selectedProject.name}
                          </h1>
                          <Badge variant="default" data-id="element-687">General Dosti</Badge>
                        </div>
                        <p className="text-text-secondary text-lg max-w-2xl leading-relaxed" data-id="element-688">
                          {selectedProject.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex border-b border-border mb-6" data-id="element-689">
                    <button onClick={() => setProjectActiveTab('chats')} className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${projectActiveTab === 'chats' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'}`} data-id="element-690">
                      Chats ({selectedProject.chatCount})
                    </button>
                    <button onClick={() => setProjectActiveTab('instructions')} className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${projectActiveTab === 'instructions' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'}`} data-id="element-691">
                      Custom Instructions
                    </button>
                    <button onClick={() => setProjectActiveTab('files')} className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${projectActiveTab === 'files' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'}`} data-id="element-692">
                      Files ({selectedProject.fileCount})
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="flex-1 overflow-y-auto pb-32 hide-scrollbar" data-id="element-693">
                    {projectActiveTab === 'chats' && <div className="space-y-3" data-id="element-694">
                        {selectedProject.chats.length > 0 ? selectedProject.chats.map(chat => <Card key={chat.id} padding="md" clickable onClick={() => navigate(`/app/chat/${chat.id}`)} className="group hover:border-primary/30" data-id="element-695">
                              <div className="flex justify-between items-start mb-2" data-id="element-696">
                                <h3 className="font-heading font-bold text-text-primary group-hover:text-primary transition-colors" data-id="element-697">
                                  {chat.title}
                                </h3>
                                <span className="text-xs text-text-muted font-medium bg-warm-white px-2 py-1 rounded-md" data-id="element-698">
                                  {chat.date}
                                </span>
                              </div>
                              <p className="text-sm text-text-secondary line-clamp-1" data-id="element-699">
                                {chat.preview}
                              </p>
                            </Card>) : <div className="text-center py-12 bg-warm-white/50 rounded-2xl border border-dashed border-border" data-id="element-700">
                            <MessageCircleIcon className="w-8 h-8 text-text-muted mx-auto mb-3" data-id="element-701" />
                            <p className="text-text-secondary font-medium" data-id="element-702">
                              No chats yet. Start a conversation below!
                            </p>
                          </div>}
                      </div>}

                    {projectActiveTab === 'instructions' && <div className="bg-white rounded-2xl border border-border p-6 shadow-sm" data-id="element-703">
                        <h3 className="font-heading font-bold text-text-primary mb-2" data-id="element-704">
                          Dosti Instructions
                        </h3>
                        <p className="text-sm text-text-secondary mb-6" data-id="element-705">
                          These instructions will be applied to every new chat
                          created within this dosti.
                        </p>
                        <textarea value={instructionsText} onChange={e => setInstructionsText(e.target.value)} className="w-full h-48 p-4 bg-warm-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none mb-4" placeholder="e.g. Always respond in bullet points. Focus on actionable advice..." data-id="element-706" />
                        <div className="flex justify-end" data-id="element-707">
                          <Button onClick={saveInstructions} variant="primary" data-id="element-708">
                            Save Instructions
                          </Button>
                        </div>
                      </div>}

                    {projectActiveTab === 'files' && <div data-id="element-709">
                        <div className="flex justify-between items-center mb-6" data-id="element-710">
                          <p className="text-sm text-text-secondary" data-id="element-711">
                            Files available as context for all chats in this
                            dosti.
                          </p>
                          <Button variant="outline" size="sm" leftIcon={<PlusIcon className="w-4 h-4" data-id="element-713" />} data-id="element-712">
                            Attach File
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-id="element-714">
                          {selectedProject.files.length > 0 ? selectedProject.files.map((file, i) => <div key={i} className="flex items-center gap-3 p-4 bg-white border border-border rounded-xl shadow-sm" data-id="element-715">
                                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-primary flex-shrink-0" data-id="element-716">
                                  <FileTextIcon className="w-5 h-5" data-id="element-717" />
                                </div>
                                <div className="flex-1 min-w-0" data-id="element-718">
                                  <p className="text-sm font-medium text-text-primary truncate" data-id="element-719">
                                    {file}
                                  </p>
                                  <p className="text-xs text-text-muted" data-id="element-720">
                                    Document
                                  </p>
                                </div>
                              </div>) : <div className="col-span-full text-center py-12 bg-warm-white/50 rounded-2xl border border-dashed border-border" data-id="element-721">
                              <FileTextIcon className="w-8 h-8 text-text-muted mx-auto mb-3" data-id="element-722" />
                              <p className="text-text-secondary font-medium" data-id="element-723">
                                No files attached yet.
                              </p>
                            </div>}
                        </div>
                      </div>}
                  </div>

                  {/* Project Chat Input */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-10 pb-6 px-4 sm:px-6 lg:px-8" data-id="element-724">
                    <div className="max-w-4xl mx-auto relative" data-id="element-725">
                      {activeInputTarget === 'project' && <AtMentionPopup data-id="element-726" />}
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary cursor-pointer transition-colors" data-id="element-727">
                        <PaperclipIcon className="w-5 h-5" data-id="element-728" />
                      </div>
                      <input ref={projectInputRef} type="text" value={projectInputValue} onChange={e => handleInputChange(e, 'project')} onKeyDown={e => e.key === 'Enter' && handleStartProjectChat()} placeholder={`Message ${selectedProject.name}... (type @ to mention)`} className="w-full bg-white border border-border rounded-2xl pl-12 pr-14 py-4 text-sm shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" data-id="element-729" />
                      <button onClick={handleStartProjectChat} className={`absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${projectInputValue.trim() ? 'bg-primary text-white shadow-sm' : 'bg-cream text-text-muted'}`} data-id="element-730">
                        <SendIcon className="w-4 h-4 ml-0.5" data-id="element-731" />
                      </button>
                    </div>
                  </div>
                </>}
            </motion.div>)}
        </AnimatePresence>
      </div>

      {/* Create Project Modal */}
      <AnimatePresence data-id="element-732">
        {showCreateModal && <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-text-primary/40 backdrop-blur-sm" data-id="element-733">
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
        }} className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-border/50 flex flex-col max-h-[90vh]" data-id="element-734">
              <div className="p-6 border-b border-border/50 flex justify-between items-center bg-warm-white/30 flex-shrink-0" data-id="element-735">
                <h3 className="text-xl font-heading font-bold text-text-primary" data-id="element-736">
                  Create General Dosti
                </h3>
                <button onClick={() => setShowCreateModal(false)} className="p-2 text-text-muted hover:text-text-primary rounded-full hover:bg-cream transition-colors" data-id="element-737">
                  <XIcon className="w-5 h-5" data-id="element-738" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto" data-id="element-739">
                <form id="create-project-form" onSubmit={handleCreateProject} className="space-y-6" data-id="element-740">
                  <div data-id="element-741">
                    <label className="block text-sm font-medium text-text-primary mb-2" data-id="element-742">
                      Dosti Icon
                    </label>
                    <div className="flex flex-wrap gap-2" data-id="element-743">
                      {EMOJI_OPTIONS.map(emoji => <button key={emoji} type="button" onClick={() => setNewProject({
                    ...newProject,
                    emoji
                  })} className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${newProject.emoji === emoji ? 'bg-gray-100 border-2 border-primary' : 'bg-cream border border-transparent hover:bg-border'}`} data-id="element-744">
                          {emoji}
                        </button>)}
                    </div>
                  </div>

                  <Input label="Dosti Name" placeholder="e.g. Cooking & Recipes" value={newProject.name} onChange={e => setNewProject({
                ...newProject,
                name: e.target.value
              })} required data-id="element-745" />

                  <div data-id="element-746">
                    <label className="block text-sm font-medium text-text-primary mb-1 ml-1" data-id="element-747">
                      Description
                    </label>
                    <textarea value={newProject.description} onChange={e => setNewProject({
                  ...newProject,
                  description: e.target.value
                })} className="w-full p-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none h-20" placeholder="What is this project about?" required data-id="element-748" />
                  </div>

                  <div data-id="element-749">
                    <label className="block text-sm font-medium text-text-primary mb-1 ml-1" data-id="element-750">
                      Custom Instructions (Optional)
                    </label>
                    <p className="text-xs text-text-secondary mb-2 ml-1" data-id="element-751">
                      Rules Aruna should follow for all chats in this dosti.
                    </p>
                    <textarea value={newProject.instructions} onChange={e => setNewProject({
                  ...newProject,
                  instructions: e.target.value
                })} className="w-full p-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none h-24" placeholder="e.g. Keep responses concise. Focus on actionable steps." data-id="element-752" />
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-border/50 bg-warm-white/30 flex justify-end gap-3 flex-shrink-0" data-id="element-753">
                <Button type="button" variant="ghost" onClick={() => setShowCreateModal(false)} data-id="element-754">
                  Cancel
                </Button>
                <Button type="submit" form="create-project-form" variant="primary" disabled={!newProject.name.trim() || !newProject.description.trim()} data-id="element-755">
                  Create Dosti
                </Button>
              </div>
            </motion.div>
          </div>}
      </AnimatePresence>
    </div>;
}