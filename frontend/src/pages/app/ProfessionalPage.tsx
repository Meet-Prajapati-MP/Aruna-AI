import React, { useState, useRef, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { BriefcaseIcon, MessageCircleIcon, BrainIcon, CalendarIcon, BotIcon, SendIcon, PaperclipIcon, PlusIcon, FileTextIcon, PinIcon, ArrowLeftIcon, XIcon, FolderIcon, SearchIcon } from 'lucide-react';
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
  emoji: '🚀',
  name: 'Trustopay GTM Strategy',
  description: 'Go-to-market planning, competitive analysis, and launch roadmap for Trustopay',
  chatCount: 12,
  fileCount: 5,
  lastActive: 'Today',
  pinned: true,
  chats: [{
    id: 'c1',
    title: 'GTM strategy framework',
    date: 'Today',
    preview: 'Help me build a comprehensive GTM strategy...'
  }, {
    id: 'c2',
    title: 'Competitor analysis: Razorpay',
    date: 'Yesterday',
    preview: "Analyze Razorpay's market positioning..."
  }, {
    id: 'c3',
    title: 'Pricing model exploration',
    date: '3 days ago',
    preview: 'What pricing models work best for B2B fintech...'
  }],
  instructions: 'Trustopay is a B2B invoice financing platform for Indian SMEs. Focus on the Indian market. Be data-driven and strategic.',
  files: ['Trustopay Business Plan.pdf', 'Market Research.xlsx', 'Competitor Matrix.xlsx', 'Brand Guidelines.pdf', 'Pitch Deck v2.pptx']
}, {
  id: '2',
  emoji: '💼',
  name: 'Fundraising & Pitch Deck',
  description: 'Seed round preparation, investor outreach, and pitch deck refinement',
  chatCount: 7,
  fileCount: 3,
  lastActive: 'Yesterday',
  pinned: true,
  chats: [{
    id: 'c4',
    title: 'Pitch deck narrative flow',
    date: 'Yesterday',
    preview: 'Review my pitch deck structure and suggest...'
  }, {
    id: 'c5',
    title: 'Investor email templates',
    date: '3 days ago',
    preview: 'Draft cold outreach emails for seed investors...'
  }],
  instructions: "We're raising a $500K seed round. Target: India-focused VCs and angels. Keep language confident but not arrogant.",
  files: ['Pitch Deck v2.pptx', 'Financial Projections.xlsx', 'Cap Table.xlsx']
}, {
  id: '3',
  emoji: '📊',
  name: 'Market Research Hub',
  description: 'Industry analysis, market sizing, and trend tracking for fintech sector',
  chatCount: 6,
  fileCount: 4,
  lastActive: '3 days ago',
  pinned: false,
  chats: [{
    id: 'c6',
    title: 'India fintech market size 2025',
    date: '3 days ago',
    preview: "What's the current market size for invoice..."
  }, {
    id: 'c7',
    title: 'SME lending landscape',
    date: 'Last week',
    preview: 'Map out the SME lending landscape in India...'
  }],
  instructions: 'Focus on Indian fintech market. Cite sources when possible. Use data tables for comparisons.',
  files: ['Market Report Q3.pdf', 'Industry Data.xlsx', 'Trend Analysis.docx', 'RBI Guidelines.pdf']
}, {
  id: '4',
  emoji: '🎯',
  name: 'Q4 OKR Planning',
  description: 'Quarterly objectives, key results tracking, and team alignment',
  chatCount: 4,
  fileCount: 1,
  lastActive: 'Last week',
  pinned: false,
  chats: [{
    id: 'c8',
    title: 'Q4 OKR framework',
    date: 'Last week',
    preview: 'Help me set OKRs for Q4 that align with...'
  }, {
    id: 'c9',
    title: 'Team capacity planning',
    date: '2 weeks ago',
    preview: 'We have 5 engineers and 2 designers...'
  }],
  instructions: 'Use the OKR framework strictly. Each objective should have 2-3 measurable key results. Be specific with metrics.',
  files: ['Q3 OKR Review.docx']
}];
const EMOJI_OPTIONS = ['🚀', '💼', '📊', '🎯', '📈', '🤝', '💡', '🛠️', '📱', '🌐', '🏢', '💰', '📅', '🔍'];
export function ProfessionalPage() {
  const navigate = useNavigate();
  // Main Tab State
  const [mainTab, setMainTab] = useState<'chat' | 'projects'>('chat');
  // --- Original Chat State ---
  const [activeMode, setActiveMode] = useState('deep');
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
  const suggestedPrompts = ['Trustopay business plan draft', 'Fundraising deck outline', 'Market research for invoice financing', 'Startup GTM planning'];
  const recentSessions = [{
    title: 'Trustopay GTM Strategy',
    date: '2 days ago'
  }, {
    title: 'Competitor Analysis: Fintech',
    date: 'Last week'
  }, {
    title: 'Q3 OKRs Planning',
    date: '3 weeks ago'
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
    emoji: '🚀'
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
      emoji: '🚀'
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
  const AtMentionPopup = () => <AnimatePresence data-id="element-1024">
      {showAtPopup && <>
          <div className="fixed inset-0 z-40" onClick={() => setShowAtPopup(false)} data-id="element-1025" />
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
      }} className="absolute bottom-full left-0 mb-3 w-80 bg-white rounded-2xl shadow-xl border border-border overflow-hidden z-50 flex flex-col max-h-80" data-id="element-1026">
            <div className="p-3 border-b border-border/50 bg-slate-50 flex items-center gap-2" data-id="element-1027">
              <SearchIcon className="w-4 h-4 text-text-muted" data-id="element-1028" />
              <input type="text" value={atQuery} onChange={e => setAtQuery(e.target.value)} placeholder="Search dosti or files..." className="bg-transparent border-none focus:outline-none text-sm w-full" autoFocus data-id="element-1029" />
            </div>

            <div className="overflow-y-auto p-2 space-y-4 hide-scrollbar" data-id="element-1030">
              {filteredDosti.length > 0 && <div data-id="element-1031">
                  <div className="px-2 pb-1.5 text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5" data-id="element-1032">
                    <FolderIcon className="w-3 h-3" data-id="element-1033" /> Dosti
                  </div>
                  <div className="space-y-0.5" data-id="element-1034">
                    {filteredDosti.map(dosti => <button key={dosti.id} onClick={() => handleMentionSelect(dosti.name)} className="w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-slate-50 transition-colors text-left group" data-id="element-1035">
                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-sm shadow-sm group-hover:scale-105 transition-transform" data-id="element-1036">
                          {dosti.emoji}
                        </div>
                        <div className="flex-1 min-w-0" data-id="element-1037">
                          <p className="text-sm font-medium text-text-primary truncate" data-id="element-1038">
                            {dosti.name}
                          </p>
                          <p className="text-[10px] text-text-muted capitalize" data-id="element-1039">
                            Professional
                          </p>
                        </div>
                      </button>)}
                  </div>
                </div>}

              {filteredFiles.length > 0 && <div data-id="element-1040">
                  <div className="px-2 pb-1.5 text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5" data-id="element-1041">
                    <FileTextIcon className="w-3 h-3" data-id="element-1042" /> Files
                  </div>
                  <div className="space-y-0.5" data-id="element-1043">
                    {filteredFiles.map(file => <button key={file.id} onClick={() => handleMentionSelect(file.name)} className="w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-slate-50 transition-colors text-left group" data-id="element-1044">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shadow-sm group-hover:scale-105 transition-transform" data-id="element-1045">
                          <FileTextIcon className="w-4 h-4" data-id="element-1046" />
                        </div>
                        <div className="flex-1 min-w-0" data-id="element-1047">
                          <p className="text-sm font-medium text-text-primary truncate" data-id="element-1048">
                            {file.name}
                          </p>
                          <p className="text-[10px] text-text-muted uppercase" data-id="element-1049">
                            {file.type}
                          </p>
                        </div>
                      </button>)}
                  </div>
                </div>}

              {filteredDosti.length === 0 && filteredFiles.length === 0 && <div className="py-6 text-center text-sm text-text-muted" data-id="element-1050">
                  No results found for "{atQuery}"
                </div>}
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
  return <div className="h-full flex flex-col max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative" data-id="element-1051">
      {/* Header (Always visible) */}
      <motion.div initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }} className="flex-shrink-0 mb-6" data-id="element-1052">
        <div className="flex items-center gap-3 mb-3" data-id="element-1053">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700" data-id="element-1054">
            <BriefcaseIcon className="w-5 h-5" data-id="element-1055" />
          </div>
          <h1 className="text-3xl font-serif text-text-primary" data-id="element-1056">
            Professional Space
          </h1>
        </div>
        <p className="text-text-secondary" data-id="element-1057">
          A structured, analytical environment for business strategy, research,
          and execution.
        </p>
      </motion.div>

      {/* Main Tabs */}
      <div className="flex items-center gap-2 mb-8 bg-warm-white p-1 rounded-xl w-fit border border-border/50" data-id="element-1058">
        <button onClick={() => {
        setMainTab('chat');
        setSelectedProjectId(null);
      }} className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${mainTab === 'chat' ? 'bg-white text-slate-800 shadow-sm border border-slate-200' : 'text-text-secondary hover:text-text-primary hover:bg-slate-50'}`} data-id="element-1059">
          <MessageCircleIcon className="w-4 h-4" data-id="element-1060" />
          Chat
        </button>
        <button onClick={() => setMainTab('projects')} className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${mainTab === 'projects' ? 'bg-white text-slate-800 shadow-sm border border-slate-200' : 'text-text-secondary hover:text-text-primary hover:bg-slate-50'}`} data-id="element-1061">
          <FolderIcon className="w-4 h-4" data-id="element-1062" />
          Dosti
        </button>
      </div>

      <div className="flex-1 flex flex-col min-h-0" data-id="element-1063">
        <AnimatePresence mode="wait" data-id="element-1064">
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
        }} className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full" data-id="element-1065">
              {/* Left Column: Input & Modes */}
              <div className="lg:col-span-2 flex flex-col h-full" data-id="element-1066">
                <Card className="flex-1 flex flex-col p-6 bg-white border-slate-200 shadow-sm relative overflow-hidden" data-id="element-1067">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" data-id="element-1068"></div>

                  <div className="mb-6 z-10" data-id="element-1069">
                    <h3 className="text-sm font-medium text-text-secondary mb-3" data-id="element-1070">
                      Select Session Type
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" data-id="element-1071">
                      {modes.map(mode => <button key={mode.id} onClick={() => setActiveMode(mode.id)} className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${activeMode === mode.id ? 'border-slate-800 bg-slate-50 text-slate-800' : 'border-border bg-white text-text-secondary hover:bg-slate-50'}`} data-id="element-1072">
                          <mode.icon className="w-5 h-5 mb-1.5" data-id="element-1073" />
                          <span className="text-xs font-medium" data-id="element-1074">
                            {mode.name}
                          </span>
                        </button>)}
                    </div>
                  </div>

                  <div className="mt-auto z-10" data-id="element-1075">
                    <div className="flex flex-wrap gap-2 mb-4" data-id="element-1076">
                      {suggestedPrompts.map((prompt, i) => <button key={i} onClick={() => {
                    setInputValue(prompt);
                    mainInputRef.current?.focus();
                  }} className="text-xs px-3 py-1.5 rounded-full bg-slate-50 text-text-secondary hover:bg-slate-100 hover:text-slate-800 transition-colors border border-slate-200" data-id="element-1077">
                          {prompt}
                        </button>)}
                    </div>

                    <div className="relative" data-id="element-1078">
                      {activeInputTarget === 'main' && <AtMentionPopup data-id="element-1079" />}
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-slate-800 cursor-pointer transition-colors" data-id="element-1080">
                        <PaperclipIcon className="w-5 h-5" data-id="element-1081" />
                      </div>
                      <input ref={mainInputRef} type="text" value={inputValue} onChange={e => handleInputChange(e, 'main')} onKeyDown={e => e.key === 'Enter' && handleStartChat()} placeholder="What are we working on? (type @ to mention)" className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-14 py-4 text-sm shadow-soft focus:outline-none focus:ring-2 focus:ring-slate-800/20 focus:border-slate-800 transition-all" data-id="element-1082" />
                      <button onClick={handleStartChat} className={`absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${inputValue.trim() ? 'bg-slate-800 text-white shadow-sm' : 'bg-slate-100 text-text-muted'}`} data-id="element-1083">
                        <SendIcon className="w-4 h-4 ml-0.5" data-id="element-1084" />
                      </button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Column: History */}
              <div className="lg:col-span-1 flex flex-col" data-id="element-1085">
                <h3 className="text-sm font-medium text-text-primary mb-4" data-id="element-1086">
                  Recent Professional Sessions
                </h3>
                <div className="space-y-3 overflow-y-auto pr-2 hide-scrollbar" data-id="element-1087">
                  {recentSessions.map((session, i) => <Card key={i} padding="sm" clickable onClick={() => navigate(`/app/chat/${i}`)} className="bg-white/60 hover:bg-white border-slate-200/60" data-id="element-1088">
                      <div className="flex items-start justify-between gap-2" data-id="element-1089">
                        <h4 className="text-sm font-medium text-text-primary line-clamp-2" data-id="element-1090">
                          {session.title}
                        </h4>
                      </div>
                      <p className="text-xs text-text-muted mt-2" data-id="element-1091">
                        {session.date}
                      </p>
                    </Card>)}
                  <button onClick={() => navigate('/app/history')} className="w-full py-3 text-sm text-text-secondary hover:text-slate-800 font-medium transition-colors" data-id="element-1092">
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
        }} className="flex flex-col h-full" data-id="element-1093">
              <div className="mb-6 flex items-center justify-between" data-id="element-1094">
                <h2 className="text-xl font-heading font-bold text-text-primary" data-id="element-1095">
                  Your Dosti
                </h2>
                <Button variant="primary" size="sm" leftIcon={<PlusIcon className="w-4 h-4" data-id="element-1097" />} onClick={() => setShowCreateModal(true)} className="bg-slate-800 hover:bg-slate-900 focus:ring-slate-800/50" data-id="element-1096">
                  New Dosti
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-10 overflow-y-auto hide-scrollbar" data-id="element-1098">
                {projects.map((project, idx) => <motion.div key={project.id} initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: idx * 0.05
            }} data-id="element-1099">
                    <Card padding="md" clickable onClick={() => openProject(project)} className={`h-full flex flex-col group relative ${project.pinned ? 'border-l-4 border-l-slate-800' : 'border-slate-200'}`} data-id="element-1100">
                      {project.pinned && <div className="absolute top-4 right-4 text-slate-400" data-id="element-1101">
                          <PinIcon className="w-4 h-4 fill-slate-200" data-id="element-1102" />
                        </div>}

                      <div className="flex items-start gap-4 mb-4" data-id="element-1103">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform border border-slate-100" data-id="element-1104">
                          {project.emoji}
                        </div>
                        <div className="flex-1 min-w-0 pr-6" data-id="element-1105">
                          <h3 className="font-heading font-bold text-lg text-text-primary truncate group-hover:text-slate-800 transition-colors" data-id="element-1106">
                            {project.name}
                          </h3>
                          <p className="text-sm text-text-secondary line-clamp-2 mt-1 leading-relaxed" data-id="element-1107">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-4 text-xs text-text-muted font-medium" data-id="element-1108">
                        <div className="flex items-center gap-1.5" data-id="element-1109">
                          <MessageCircleIcon className="w-3.5 h-3.5" data-id="element-1110" />
                          <span data-id="element-1111">{project.chatCount}</span>
                        </div>
                        <div className="flex items-center gap-1.5" data-id="element-1112">
                          <FileTextIcon className="w-3.5 h-3.5" data-id="element-1113" />
                          <span data-id="element-1114">{project.fileCount}</span>
                        </div>
                        <div className="ml-auto" data-id="element-1115">{project.lastActive}</div>
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
            }} data-id="element-1116">
                  <button onClick={() => setShowCreateModal(true)} className="w-full h-full min-h-[160px] rounded-2xl border-2 border-dashed border-slate-200 hover:border-slate-400 hover:bg-slate-50 flex flex-col items-center justify-center gap-3 transition-all group" data-id="element-1117">
                    <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-white flex items-center justify-center text-text-secondary group-hover:text-slate-800 transition-colors shadow-sm" data-id="element-1118">
                      <PlusIcon className="w-5 h-5" data-id="element-1119" />
                    </div>
                    <span className="font-heading font-semibold text-text-secondary group-hover:text-slate-800 transition-colors" data-id="element-1120">
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
        }} className="flex flex-col h-full" data-id="element-1121">
              {selectedProject && <>
                  {/* Detail Header */}
                  <div className="flex-shrink-0 mb-8" data-id="element-1122">
                    <button onClick={() => setSelectedProjectId(null)} className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-slate-800 transition-colors mb-6" data-id="element-1123">
                      <ArrowLeftIcon className="w-4 h-4" data-id="element-1124" /> Back to Dosti
                    </button>

                    <div className="flex items-start gap-5" data-id="element-1125">
                      <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl flex-shrink-0 shadow-sm" data-id="element-1126">
                        {selectedProject.emoji}
                      </div>
                      <div className="flex-1" data-id="element-1127">
                        <div className="flex items-center gap-3 mb-2" data-id="element-1128">
                          <h1 className="text-3xl font-heading font-bold text-text-primary" data-id="element-1129">
                            {selectedProject.name}
                          </h1>
                          <Badge variant="professional" data-id="element-1130">
                            Professional Dosti
                          </Badge>
                        </div>
                        <p className="text-text-secondary text-lg max-w-2xl leading-relaxed" data-id="element-1131">
                          {selectedProject.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex border-b border-slate-200 mb-6" data-id="element-1132">
                    <button onClick={() => setProjectActiveTab('chats')} className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${projectActiveTab === 'chats' ? 'border-slate-800 text-slate-800' : 'border-transparent text-text-secondary hover:text-text-primary'}`} data-id="element-1133">
                      Chats ({selectedProject.chatCount})
                    </button>
                    <button onClick={() => setProjectActiveTab('instructions')} className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${projectActiveTab === 'instructions' ? 'border-slate-800 text-slate-800' : 'border-transparent text-text-secondary hover:text-text-primary'}`} data-id="element-1134">
                      Custom Instructions
                    </button>
                    <button onClick={() => setProjectActiveTab('files')} className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${projectActiveTab === 'files' ? 'border-slate-800 text-slate-800' : 'border-transparent text-text-secondary hover:text-text-primary'}`} data-id="element-1135">
                      Files ({selectedProject.fileCount})
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="flex-1 overflow-y-auto pb-32 hide-scrollbar" data-id="element-1136">
                    {projectActiveTab === 'chats' && <div className="space-y-3" data-id="element-1137">
                        {selectedProject.chats.length > 0 ? selectedProject.chats.map(chat => <Card key={chat.id} padding="md" clickable onClick={() => navigate(`/app/chat/${chat.id}`)} className="group hover:border-slate-400 border-slate-200" data-id="element-1138">
                              <div className="flex justify-between items-start mb-2" data-id="element-1139">
                                <h3 className="font-heading font-bold text-text-primary group-hover:text-slate-800 transition-colors" data-id="element-1140">
                                  {chat.title}
                                </h3>
                                <span className="text-xs text-text-muted font-medium bg-slate-50 px-2 py-1 rounded-md border border-slate-100" data-id="element-1141">
                                  {chat.date}
                                </span>
                              </div>
                              <p className="text-sm text-text-secondary line-clamp-1" data-id="element-1142">
                                {chat.preview}
                              </p>
                            </Card>) : <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200" data-id="element-1143">
                            <MessageCircleIcon className="w-8 h-8 text-text-muted mx-auto mb-3" data-id="element-1144" />
                            <p className="text-text-secondary font-medium" data-id="element-1145">
                              No chats yet. Start a conversation below!
                            </p>
                          </div>}
                      </div>}

                    {projectActiveTab === 'instructions' && <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm" data-id="element-1146">
                        <h3 className="font-heading font-bold text-text-primary mb-2" data-id="element-1147">
                          Dosti Instructions
                        </h3>
                        <p className="text-sm text-text-secondary mb-6" data-id="element-1148">
                          These instructions will be applied to every new chat
                          created within this dosti.
                        </p>
                        <textarea value={instructionsText} onChange={e => setInstructionsText(e.target.value)} className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-800/20 focus:border-slate-800 resize-none mb-4" placeholder="e.g. Always respond in bullet points. Focus on actionable advice..." data-id="element-1149" />
                        <div className="flex justify-end" data-id="element-1150">
                          <Button onClick={saveInstructions} className="bg-slate-800 hover:bg-slate-900 text-white" data-id="element-1151">
                            Save Instructions
                          </Button>
                        </div>
                      </div>}

                    {projectActiveTab === 'files' && <div data-id="element-1152">
                        <div className="flex justify-between items-center mb-6" data-id="element-1153">
                          <p className="text-sm text-text-secondary" data-id="element-1154">
                            Files available as context for all chats in this
                            dosti.
                          </p>
                          <Button variant="outline" size="sm" leftIcon={<PlusIcon className="w-4 h-4" data-id="element-1156" />} data-id="element-1155">
                            Attach File
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-id="element-1157">
                          {selectedProject.files.length > 0 ? selectedProject.files.map((file, i) => <div key={i} className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl shadow-sm" data-id="element-1158">
                                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 flex-shrink-0" data-id="element-1159">
                                  <FileTextIcon className="w-5 h-5" data-id="element-1160" />
                                </div>
                                <div className="flex-1 min-w-0" data-id="element-1161">
                                  <p className="text-sm font-medium text-text-primary truncate" data-id="element-1162">
                                    {file}
                                  </p>
                                  <p className="text-xs text-text-muted" data-id="element-1163">
                                    Document
                                  </p>
                                </div>
                              </div>) : <div className="col-span-full text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200" data-id="element-1164">
                              <FileTextIcon className="w-8 h-8 text-text-muted mx-auto mb-3" data-id="element-1165" />
                              <p className="text-text-secondary font-medium" data-id="element-1166">
                                No files attached yet.
                              </p>
                            </div>}
                        </div>
                      </div>}
                  </div>

                  {/* Project Chat Input */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-10 pb-6 px-4 sm:px-6 lg:px-8" data-id="element-1167">
                    <div className="max-w-4xl mx-auto relative" data-id="element-1168">
                      {activeInputTarget === 'project' && <AtMentionPopup data-id="element-1169" />}
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-slate-800 cursor-pointer transition-colors" data-id="element-1170">
                        <PaperclipIcon className="w-5 h-5" data-id="element-1171" />
                      </div>
                      <input ref={projectInputRef} type="text" value={projectInputValue} onChange={e => handleInputChange(e, 'project')} onKeyDown={e => e.key === 'Enter' && handleStartProjectChat()} placeholder={`Message ${selectedProject.name}... (type @ to mention)`} className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-14 py-4 text-sm shadow-soft focus:outline-none focus:ring-2 focus:ring-slate-800/20 focus:border-slate-800 transition-all" data-id="element-1172" />
                      <button onClick={handleStartProjectChat} className={`absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${projectInputValue.trim() ? 'bg-slate-800 text-white shadow-sm' : 'bg-slate-100 text-text-muted'}`} data-id="element-1173">
                        <SendIcon className="w-4 h-4 ml-0.5" data-id="element-1174" />
                      </button>
                    </div>
                  </div>
                </>}
            </motion.div>)}
        </AnimatePresence>
      </div>

      {/* Create Project Modal */}
      <AnimatePresence data-id="element-1175">
        {showCreateModal && <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-text-primary/40 backdrop-blur-sm" data-id="element-1176">
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
        }} className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-border/50 flex flex-col max-h-[90vh]" data-id="element-1177">
              <div className="p-6 border-b border-border/50 flex justify-between items-center bg-slate-50 flex-shrink-0" data-id="element-1178">
                <h3 className="text-xl font-heading font-bold text-text-primary" data-id="element-1179">
                  Create Professional Dosti
                </h3>
                <button onClick={() => setShowCreateModal(false)} className="p-2 text-text-muted hover:text-text-primary rounded-full hover:bg-slate-100 transition-colors" data-id="element-1180">
                  <XIcon className="w-5 h-5" data-id="element-1181" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto" data-id="element-1182">
                <form id="create-project-form" onSubmit={handleCreateProject} className="space-y-6" data-id="element-1183">
                  <div data-id="element-1184">
                    <label className="block text-sm font-medium text-text-primary mb-2" data-id="element-1185">
                      Dosti Icon
                    </label>
                    <div className="flex flex-wrap gap-2" data-id="element-1186">
                      {EMOJI_OPTIONS.map(emoji => <button key={emoji} type="button" onClick={() => setNewProject({
                    ...newProject,
                    emoji
                  })} className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${newProject.emoji === emoji ? 'bg-slate-100 border-2 border-slate-800' : 'bg-slate-50 border border-transparent hover:bg-slate-100'}`} data-id="element-1187">
                          {emoji}
                        </button>)}
                    </div>
                  </div>

                  <Input label="Dosti Name" placeholder="e.g. Q4 Marketing Strategy" value={newProject.name} onChange={e => setNewProject({
                ...newProject,
                name: e.target.value
              })} required data-id="element-1188" />

                  <div data-id="element-1189">
                    <label className="block text-sm font-medium text-text-primary mb-1 ml-1" data-id="element-1190">
                      Description
                    </label>
                    <textarea value={newProject.description} onChange={e => setNewProject({
                  ...newProject,
                  description: e.target.value
                })} className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-800/20 focus:border-slate-800 resize-none h-20" placeholder="What is this project about?" required data-id="element-1191" />
                  </div>

                  <div data-id="element-1192">
                    <label className="block text-sm font-medium text-text-primary mb-1 ml-1" data-id="element-1193">
                      Custom Instructions (Optional)
                    </label>
                    <p className="text-xs text-text-secondary mb-2 ml-1" data-id="element-1194">
                      Rules Aruna should follow for all chats in this dosti.
                    </p>
                    <textarea value={newProject.instructions} onChange={e => setNewProject({
                  ...newProject,
                  instructions: e.target.value
                })} className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-800/20 focus:border-slate-800 resize-none h-24" placeholder="e.g. Keep responses concise. Focus on actionable steps." data-id="element-1195" />
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-border/50 bg-slate-50 flex justify-end gap-3 flex-shrink-0" data-id="element-1196">
                <Button type="button" variant="ghost" onClick={() => setShowCreateModal(false)} data-id="element-1197">
                  Cancel
                </Button>
                <Button type="submit" form="create-project-form" className="bg-slate-800 hover:bg-slate-900 text-white" disabled={!newProject.name.trim() || !newProject.description.trim()} data-id="element-1198">
                  Create Dosti
                </Button>
              </div>
            </motion.div>
          </div>}
      </AnimatePresence>
    </div>;
}