import React, { useEffect, useState, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { SendIcon, PaperclipIcon, HeartIcon, CheckCircle2Icon, BrainCircuitIcon, ListTodoIcon, SparklesIcon, MoreVerticalIcon, BriefcaseIcon, GlobeIcon, FileTextIcon, FolderIcon, SearchIcon, ChevronDownIcon, SquareIcon, RotateCwIcon, PanelRightCloseIcon, PanelRightOpenIcon, FileIcon, ImageIcon, Loader2Icon, AlertCircleIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Badge } from '../../components/ui/Badge';
import { api } from '../../lib/apiClient';

// ── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  taskId?: string;
  taskStatus?: 'queued' | 'running' | 'completed' | 'failed';
  result?: string;
  agentLabel?: string;
  error?: string;
}

// ── Mock data for @ mentions (unchanged) ─────────────────────────────────────

const DOSTI_LIST = [{
  id: 'd1',
  emoji: '🧘',
  name: 'Morning Routines & Wellness',
  space: 'personal'
}, {
  id: 'd2',
  emoji: '✈️',
  name: 'Japan Trip Planning',
  space: 'personal'
}, {
  id: 'd3',
  emoji: '📚',
  name: 'Reading & Learning',
  space: 'personal'
}, {
  id: 'd4',
  emoji: '💰',
  name: 'Financial Planning',
  space: 'personal'
}, {
  id: 'd5',
  emoji: '🚀',
  name: 'Trustopay GTM Strategy',
  space: 'professional'
}, {
  id: 'd6',
  emoji: '💼',
  name: 'Fundraising & Pitch Deck',
  space: 'professional'
}];

const FILE_LIST = [{
  id: 'f1',
  name: 'Fitness Goals 2025.pdf',
  type: 'pdf'
}, {
  id: 'f2',
  name: 'Supplement Research.docx',
  type: 'doc'
}, {
  id: 'f3',
  name: 'Japan Visa Docs.pdf',
  type: 'pdf'
}, {
  id: 'f4',
  name: 'Trustopay Business Plan.pdf',
  type: 'pdf'
}];

// ── Cycling status label with animated dots ───────────────────────────────────

const STATUS_CYCLE = ['Working', 'Processing', 'Analyzing', 'Thinking', 'Computing'];

function CyclingStatus() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % STATUS_CYCLE.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex items-center gap-1.5">
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.22 }}
          className="text-xs text-text-muted"
        >
          {STATUS_CYCLE[idx]}
        </motion.span>
      </AnimatePresence>
      <div className="flex items-center gap-0.5">
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            className="block w-[3px] h-[3px] rounded-full bg-text-muted"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.22, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Streaming markdown renderer ───────────────────────────────────────────────
// Reveals text progressively so the answer feels like it's being typed live.

const StreamingMarkdown = memo(function StreamingMarkdown({
  text,
  isStreaming,
}: {
  text: string;
  isStreaming: boolean;
}) {
  const [displayed, setDisplayed] = useState('');
  // tracks actual chars on screen — updated every tick, not just at interval end
  const displayedLenRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Stop any in-progress stream first
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Only stream chars we haven't shown yet
    const startFrom = displayedLenRef.current;
    if (text.length <= startFrom) return;

    let i = 0;
    const CHUNK = 8;  // chars per tick → ~500 chars/sec at 16ms tick
    const TICK  = 16;

    timerRef.current = setInterval(() => {
      i = Math.min(i + CHUNK, text.length - startFrom);
      const next = text.slice(0, startFrom + i);
      displayedLenRef.current = startFrom + i;
      setDisplayed(next);
      if (startFrom + i >= text.length) {
        clearInterval(timerRef.current!);
        timerRef.current = null;
      }
    }, TICK);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [text]);

  // Show cursor while: task still running OR typewriter hasn't caught up yet
  const showCursor = isStreaming || displayed.length < text.length;

  return (
    <div className="prose prose-base max-w-none
      prose-headings:font-bold prose-headings:text-text-primary prose-headings:tracking-tight
      prose-h1:text-2xl prose-h1:mt-8 prose-h1:mb-4 prose-h1:border-b prose-h1:border-border/60 prose-h1:pb-3
      prose-h2:text-xl prose-h2:mt-7 prose-h2:mb-3
      prose-h3:text-lg prose-h3:mt-5 prose-h3:mb-2
      prose-h4:text-base prose-h4:mt-4 prose-h4:mb-1.5
      prose-p:text-text-primary prose-p:leading-7 prose-p:my-3
      prose-li:text-text-primary prose-li:leading-7 prose-li:my-1
      prose-ul:my-3 prose-ol:my-3 prose-ul:space-y-1 prose-ol:space-y-1
      prose-strong:text-text-primary prose-strong:font-semibold
      prose-em:text-text-secondary
      prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
      prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl prose-pre:p-5 prose-pre:my-4
      prose-blockquote:border-l-4 prose-blockquote:border-primary/40 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-text-secondary prose-blockquote:my-4
      prose-hr:border-border prose-hr:my-6
      prose-table:text-sm prose-th:font-semibold prose-th:text-text-primary prose-td:text-text-primary">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayed || ''}</ReactMarkdown>
      {showCursor && (
        <motion.span
          className="inline-block w-0.5 h-4 bg-primary/70 ml-0.5 align-middle"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </div>
  );
});

// ── Helpers ───────────────────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2);
}

function statusToStage(status?: string): 'thinking' | 'planning' | 'executing' {
  if (status === 'queued') return 'thinking';
  if (status === 'running') return 'planning';
  return 'executing';
}

// ── Main component ────────────────────────────────────────────────────────────

export function ChatPage() {
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeStage, setActiveStage] = useState<'thinking' | 'planning' | 'executing'>('executing');
  const [inputValue, setInputValue] = useState('');
  const [currentSpace, setCurrentSpace] = useState<'personal' | 'professional' | 'general'>('personal');
  const [showMoveMenu, setShowMoveMenu] = useState(false);
  const [showModelMenu, setShowModelMenu] = useState(false);
  const [activeMode, setActiveMode] = useState<'Ask' | 'Research' | 'Create' | 'Operate' | 'Automate'>('Ask');
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [rightPanelTab, setRightPanelTab] = useState<'Context' | 'Files' | 'Outputs'>('Context');
  const [isRunning, setIsRunning] = useState(false);
  const [showAtPopup, setShowAtPopup] = useState(false);
  const [atQuery, setAtQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const modelMenuRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const msgCountRef = useRef(0);

  // The latest AI message that is still in-flight
  const pendingMsg = messages.findLast(m => m.role === 'ai' && ['queued', 'running'].includes(m.taskStatus ?? ''));

  // Sticky header compression on scroll
  const [headerCompressed, setHeaderCompressed] = useState(false);
  const messagesScrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = messagesScrollRef.current;
    if (!el) return;
    const onScroll = () => setHeaderCompressed(el.scrollTop > 48);
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // ── Close menus on outside click ────────────────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMoveMenu(false);
      }
      if (modelMenuRef.current && !modelMenuRef.current.contains(event.target as Node)) {
        setShowModelMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ── Scroll to bottom only when a new message is added (not on poll updates) ──
  useEffect(() => {
    if (messages.length > msgCountRef.current) {
      msgCountRef.current = messages.length;
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // ── Auto-submit task passed from home page ───────────────────────────────────
  useEffect(() => {
    const initialTask = (location.state as { initialTask?: string } | null)?.initialTask;
    if (initialTask) {
      handleSend(initialTask);
    }
  }, []);

  // ── Poll for task status ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!pendingMsg?.taskId) return;
    const taskId = pendingMsg.taskId;
    const msgId = pendingMsg.id;

    const interval = setInterval(async () => {
      try {
        const status = await api.getTaskStatus(taskId);
        setMessages(prev => prev.map(m =>
          m.id === msgId
            ? { ...m, taskStatus: status.status, result: status.result ?? m.result, agentLabel: status.agent_label ?? m.agentLabel, error: status.error ?? m.error }
            : m
        ));
        setActiveStage(statusToStage(status.status));
        if (status.status === 'completed' || status.status === 'failed') {
          setIsRunning(false);
          clearInterval(interval);
        }
      } catch {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [pendingMsg?.taskId]);

  // ── @ mention helpers ────────────────────────────────────────────────────────
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
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
    const words = inputValue.split(' ');
    words.pop();
    const newValue = words.join(' ') + (words.length > 0 ? ' ' : '') + `@${name} `;
    setInputValue(newValue);
    setShowAtPopup(false);
    inputRef.current?.focus();
  };

  const filteredDosti = DOSTI_LIST.filter(d => d.name.toLowerCase().includes(atQuery));
  const filteredFiles = FILE_LIST.filter(f => f.name.toLowerCase().includes(atQuery));

  // ── Send message ─────────────────────────────────────────────────────────────
  const handleSend = useCallback(async (taskOverride?: string) => {
    const task = (taskOverride ?? inputValue).trim();
    if (!task || isRunning) return;

    const userMsgId = uid();
    const aiMsgId = uid();

    const userMsg: Message = { id: userMsgId, role: 'user', content: task };
    const aiMsg: Message = { id: aiMsgId, role: 'ai', content: '', taskStatus: 'queued' };

    setMessages(prev => [...prev, userMsg, aiMsg]);
    setInputValue('');
    setShowAtPopup(false);
    setIsRunning(true);
    setActiveStage('thinking');

    try {
      const res = await api.runTask({ task });
      setMessages(prev => prev.map(m =>
        m.id === aiMsgId ? { ...m, taskId: res.task_id, taskStatus: 'queued' } : m
      ));
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Failed to connect to server.';
      setMessages(prev => prev.map(m =>
        m.id === aiMsgId ? { ...m, taskStatus: 'failed', error: errMsg } : m
      ));
      setIsRunning(false);
    }
  }, [inputValue, isRunning]);

  // ── Rerun last task ──────────────────────────────────────────────────────────
  const handleRerun = useCallback(async () => {
    const lastUserMsg = messages.findLast(m => m.role === 'user');
    if (!lastUserMsg || isRunning) return;
    setInputValue(lastUserMsg.content);
    // Remove last AI message so a fresh one is created
    setMessages(prev => {
      const idx = prev.findLastIndex(m => m.role === 'ai');
      return idx >= 0 ? prev.filter((_, i) => i !== idx) : prev;
    });
  }, [messages, isRunning]);

  // ── Derived: active AI message for display ───────────────────────────────────
  const latestAiMsg = messages.findLast(m => m.role === 'ai');
  const sessionTitle = messages.find(m => m.role === 'user')?.content.slice(0, 60) ?? 'New Session';

  return <div className="flex h-full bg-white relative overflow-hidden" data-id="element-423">
    {/* Main Chat Area */}
    <div className={`flex flex-col flex-1 transition-all duration-300 pb-36 ${isRightPanelOpen ? 'mr-80' : ''}`} data-id="element-424">
      {/* Chat Header — compresses to slim bar on scroll */}
      <div className={`flex-shrink-0 border-b border-border bg-white/90 backdrop-blur-sm z-10 flex flex-col transition-all duration-300 ${headerCompressed ? 'px-6 py-2 gap-0' : 'px-6 py-4 gap-3'}`} data-id="element-425">
        {/* Top Row: Title & Controls */}
        <div className="flex items-center justify-between" data-id="element-426">
          <div data-id="element-427">
            <h2 className={`font-serif text-text-primary transition-all duration-300 ${headerCompressed ? 'text-sm font-medium truncate max-w-[220px] sm:max-w-xs' : 'text-lg'}`} data-id="element-428">
              {messages.length > 0 ? sessionTitle : 'New Session'}
            </h2>
            {!headerCompressed && (
              <p className="text-xs text-text-secondary mt-0.5" data-id="element-429">
                {messages.length > 0 ? `${messages.filter(m => m.role === 'user').length} message(s)` : 'Ask anything to get started'}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3" data-id="element-430">
            {/* Model Selector */}
            <div className="relative" ref={modelMenuRef} data-id="element-431">
              <button onClick={() => setShowModelMenu(!showModelMenu)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-warm-white text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-cream transition-colors" data-id="element-432">
                <SparklesIcon className="w-3.5 h-3.5 text-primary" data-id="element-433" />
                Smart Router
                <ChevronDownIcon className="w-3.5 h-3.5" data-id="element-434" />
              </button>
              <AnimatePresence data-id="element-435">
                {showModelMenu && <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-border/50 py-1.5 z-50" data-id="element-436">
                    <div className="px-3 py-1.5 text-[10px] font-bold text-text-muted uppercase tracking-wider" data-id="element-437">Model Preference</div>
                    <button className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-cream flex items-center justify-between" data-id="element-438">
                      <span data-id="element-439">Faster <span className="text-xs text-text-muted ml-1" data-id="element-440">(Cheaper)</span></span>
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-text-primary bg-primary/5 flex items-center justify-between" data-id="element-441">
                      <span className="font-medium text-primary" data-id="element-442">Balanced <span className="text-xs text-primary/60 ml-1" data-id="element-443">(Default)</span></span>
                      <CheckCircle2Icon className="w-4 h-4 text-primary" data-id="element-444" />
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-cream flex items-center justify-between" data-id="element-445">
                      <span data-id="element-446">Best <span className="text-xs text-text-muted ml-1" data-id="element-447">(Premium)</span></span>
                    </button>
                  </motion.div>}
              </AnimatePresence>
            </div>

            {/* Space Selector */}
            <div className="relative" ref={menuRef} data-id="element-448">
              <Badge variant={currentSpace === 'general' ? 'default' : currentSpace} className="flex items-center gap-1.5 cursor-pointer hover:opacity-80" onClick={() => setShowMoveMenu(!showMoveMenu)} data-id="element-449">
                {currentSpace === 'personal' && <HeartIcon className="w-3 h-3" data-id="element-450" />}
                {currentSpace === 'professional' && <BriefcaseIcon className="w-3 h-3" data-id="element-451" />}
                {currentSpace === 'general' && <GlobeIcon className="w-3 h-3" data-id="element-452" />}
                {currentSpace === 'personal' ? 'Personal' : currentSpace === 'professional' ? 'Professional' : 'General'}
                <ChevronDownIcon className="w-3 h-3 ml-0.5" data-id="element-453" />
              </Badge>
              <AnimatePresence data-id="element-454">
                {showMoveMenu && <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} transition={{ duration: 0.1 }} className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-border/50 py-1.5 z-50" data-id="element-455">
                    <div className="px-3 py-1.5 text-[10px] font-bold text-text-muted uppercase tracking-wider" data-id="element-456">Move to...</div>
                    {currentSpace !== 'personal' && <button onClick={() => { setCurrentSpace('personal'); setShowMoveMenu(false); }} className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-rose-light/20 hover:text-primary flex items-center gap-2" data-id="element-457"><HeartIcon className="w-4 h-4" data-id="element-458" /> Personal Space</button>}
                    {currentSpace !== 'professional' && <button onClick={() => { setCurrentSpace('professional'); setShowMoveMenu(false); }} className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-slate-100 hover:text-slate-800 flex items-center gap-2" data-id="element-459"><BriefcaseIcon className="w-4 h-4" data-id="element-460" /> Professional Space</button>}
                    {currentSpace !== 'general' && <button onClick={() => { setCurrentSpace('general'); setShowMoveMenu(false); }} className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-cream flex items-center gap-2" data-id="element-461"><GlobeIcon className="w-4 h-4" data-id="element-462" /> General</button>}
                  </motion.div>}
              </AnimatePresence>
            </div>

            {/* Toggle Right Panel */}
            <button onClick={() => setIsRightPanelOpen(!isRightPanelOpen)} className={`p-1.5 rounded-md transition-colors ${isRightPanelOpen ? 'bg-primary/10 text-primary' : 'text-text-muted hover:text-text-primary hover:bg-cream'}`} data-id="element-463">
              {isRightPanelOpen ? <PanelRightCloseIcon className="w-5 h-5" data-id="element-464" /> : <PanelRightOpenIcon className="w-5 h-5" data-id="element-465" />}
            </button>
          </div>
        </div>

        {/* Bottom Row: Mode Pills — hidden when header compresses */}
        {!headerCompressed && (
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1" data-id="element-466">
            {(['Ask', 'Research', 'Create', 'Operate', 'Automate'] as const).map(mode => <button key={mode} onClick={() => setActiveMode(mode)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${activeMode === mode ? 'bg-primary text-white shadow-sm' : 'bg-cream text-text-secondary hover:text-text-primary hover:bg-beige'}`} data-id="element-467">{mode}</button>)}
          </div>
        )}
      </div>

      {/* Messages Area */}
      <div ref={messagesScrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8 pb-8" data-id="element-468">

        {/* Empty state */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-20 gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <SparklesIcon className="w-6 h-6 text-primary" />
            </div>
            <p className="text-text-primary font-medium">Ask Aruna anything</p>
            <p className="text-text-muted text-sm max-w-xs">The Head AI Agent will automatically route your task to the best specialist — business, travel, coding, or anything else.</p>
          </div>
        )}

        {/* Dynamic message list */}
        {messages.map((msg) => {
          if (msg.role === 'user') {
            return (
              <div key={msg.id} className="flex justify-end" data-id="element-469">
                <div className="bg-cream text-text-primary px-5 py-3.5 rounded-2xl rounded-tr-sm max-w-[85%] sm:max-w-[75%] shadow-sm" data-id="element-470">
                  <p className="text-sm leading-relaxed" data-id="element-471">{msg.content}</p>
                </div>
              </div>
            );
          }

          // AI message
          const stage = statusToStage(msg.taskStatus);
          const isThisActive = latestAiMsg?.id === msg.id;
          const displayStage = isThisActive ? activeStage : (msg.taskStatus === 'completed' ? 'executing' : stage);

          const thinkingText = `Analysing your request and identifying the best specialist agent for: "${messages.find(m => m.role === 'user' && messages.indexOf(m) < messages.indexOf(msg))?.content ?? 'your task'}"`;
          const planningText = `Head Router Agent has classified your task.\nSpecialist agent activated${msg.agentLabel ? `: ${msg.agentLabel}` : ''}.\nExecuting your task now...`;
          const executingText = msg.taskStatus === 'failed'
            ? (msg.error ?? 'Task failed. Please try again.')
            : (msg.result ?? '');

          const step1Done = ['running', 'completed', 'failed'].includes(msg.taskStatus ?? '');
          const step2Done = ['completed', 'failed'].includes(msg.taskStatus ?? '');
          const step3Spinning = msg.taskStatus === 'running';
          const step3Done = ['completed', 'failed'].includes(msg.taskStatus ?? '');

          const isFailed = msg.taskStatus === 'failed';
          const result = msg.result ?? '';
          // Show loading UI only when no result yet; once text starts arriving, show it immediately
          const isLoading = (msg.taskStatus === 'queued' || msg.taskStatus === 'running') && !result;

          return (
            <div key={msg.id} className="flex justify-start" data-id="element-472">
              <div className="flex flex-col gap-3 w-full" data-id="element-473">

                {/* ── Content ── */}
                <div>
                  {isLoading ? (
                    <div className="flex flex-col gap-2">
                      {/* Animated star + status */}
                      <div className="flex items-center gap-2.5">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0" fill="none">
                          {Array.from({ length: 8 }).map((_, i) => {
                            const angle = (i * 45 * Math.PI) / 180;
                            const cx = 12, cy = 12;
                            const longR = 9, shortR = 4.5;
                            const delays    = [0, 0.3, 0.15, 0.45, 0.08, 0.35, 0.22, 0.52];
                            const durations = [1.6, 1.9, 1.5, 2.0,  1.7,  1.4,  1.8,  1.6];
                            return (
                              <motion.line
                                key={i}
                                x1={cx} y1={cy}
                                x2={cx + Math.cos(angle) * longR}
                                y2={cy + Math.sin(angle) * longR}
                                stroke="#6B1D2A"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                animate={{
                                  x2: [cx + Math.cos(angle)*longR, cx + Math.cos(angle)*shortR, cx + Math.cos(angle)*longR],
                                  y2: [cy + Math.sin(angle)*longR, cy + Math.sin(angle)*shortR, cy + Math.sin(angle)*longR],
                                  opacity: [1, 0.35, 1],
                                }}
                                transition={{ duration: durations[i], repeat: Infinity, delay: delays[i], ease: 'easeInOut' }}
                              />
                            );
                          })}
                        </svg>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-text-secondary leading-relaxed">
                            {msg.agentLabel
                              ? `${msg.agentLabel} is working on your task...`
                              : 'Routing your request to the best specialist agent...'}
                          </span>
                          <CyclingStatus />
                        </div>
                      </div>
                      {msg.agentLabel && (
                        <span className="text-[11px] text-text-muted bg-warm-white border border-border/50 rounded-full px-2.5 py-0.5 font-medium self-start">
                          {msg.agentLabel}
                        </span>
                      )}
                    </div>
                  ) : isFailed ? (
                    <div className="flex items-start gap-3 text-red-500 bg-red-50 border border-red-100 rounded-xl p-4">
                      <AlertCircleIcon className="w-4 h-4 shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{msg.error ?? 'Task failed. Please try again.'}</span>
                    </div>
                  ) : result ? (
                    /* Show result as soon as any text is available — streams in progressively */
                    <StreamingMarkdown
                      text={result}
                      isStreaming={msg.taskStatus === 'running'}
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-text-muted">
                      {[0,1,2].map(i => (
                        <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/50"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }} />
                      ))}
                      <span className="text-sm ml-1">Preparing response...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-10 pb-6 px-4 sm:px-6" data-id="element-507">
        <div className="max-w-4xl mx-auto relative" data-id="element-508">
          {/* Action Buttons (Stop/Rerun) */}
          <div className="absolute -top-10 right-0 flex gap-2" data-id="element-509">
            {isRunning
              ? <button onClick={() => setIsRunning(false)} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-full text-xs font-medium transition-colors shadow-sm border border-red-100" data-id="element-510">
                  <SquareIcon className="w-3 h-3 fill-current" data-id="element-511" /> Stop
                </button>
              : messages.length > 0
                ? <button onClick={handleRerun} className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-text-secondary hover:text-text-primary hover:bg-cream rounded-full text-xs font-medium transition-colors shadow-sm border border-border" data-id="element-512">
                    <RotateCwIcon className="w-3 h-3" data-id="element-513" /> Rerun
                  </button>
                : null}
          </div>

          {/* @ Mention Popup */}
          <AnimatePresence data-id="element-514">
            {showAtPopup && <>
                <div className="fixed inset-0 z-40" onClick={() => setShowAtPopup(false)} data-id="element-515" />
                <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} transition={{ duration: 0.15 }} className="absolute bottom-full left-0 mb-3 w-80 bg-white rounded-2xl shadow-xl border border-border overflow-hidden z-50 flex flex-col max-h-80" data-id="element-516">
                    <div className="p-3 border-b border-border/50 bg-warm-white/30 flex items-center gap-2" data-id="element-517">
                      <SearchIcon className="w-4 h-4 text-text-muted" data-id="element-518" />
                      <input type="text" value={atQuery} onChange={e => setAtQuery(e.target.value)} placeholder="Search workspaces or files..." className="bg-transparent border-none focus:outline-none text-sm w-full" autoFocus data-id="element-519" />
                    </div>
                    <div className="overflow-y-auto p-2 space-y-4 hide-scrollbar" data-id="element-520">
                      {filteredDosti.length > 0 && <div data-id="element-521">
                          <div className="px-2 pb-1.5 text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5" data-id="element-522"><FolderIcon className="w-3 h-3" data-id="element-523" /> Workspaces</div>
                          <div className="space-y-0.5" data-id="element-524">
                            {filteredDosti.map(dosti => <button key={dosti.id} onClick={() => handleMentionSelect(dosti.name)} className="w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-cream transition-colors text-left group" data-id="element-525">
                                <div className="w-8 h-8 rounded-lg bg-white border border-border/50 flex items-center justify-center text-sm shadow-sm group-hover:scale-105 transition-transform" data-id="element-526">{dosti.emoji}</div>
                                <div className="flex-1 min-w-0" data-id="element-527">
                                  <p className="text-sm font-medium text-text-primary truncate" data-id="element-528">{dosti.name}</p>
                                  <p className="text-[10px] text-text-muted capitalize" data-id="element-529">{dosti.space}</p>
                                </div>
                              </button>)}
                          </div>
                        </div>}
                      {filteredFiles.length > 0 && <div data-id="element-530">
                          <div className="px-2 pb-1.5 text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5" data-id="element-531"><FileTextIcon className="w-3 h-3" data-id="element-532" /> Files</div>
                          <div className="space-y-0.5" data-id="element-533">
                            {filteredFiles.map(file => <button key={file.id} onClick={() => handleMentionSelect(file.name)} className="w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-cream transition-colors text-left group" data-id="element-534">
                                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shadow-sm group-hover:scale-105 transition-transform" data-id="element-535"><FileTextIcon className="w-4 h-4" data-id="element-536" /></div>
                                <div className="flex-1 min-w-0" data-id="element-537">
                                  <p className="text-sm font-medium text-text-primary truncate" data-id="element-538">{file.name}</p>
                                  <p className="text-[10px] text-text-muted uppercase" data-id="element-539">{file.type}</p>
                                </div>
                              </button>)}
                          </div>
                        </div>}
                    </div>
                  </motion.div>
              </>}
          </AnimatePresence>

          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary cursor-pointer transition-colors" data-id="element-540">
            <PaperclipIcon className="w-5 h-5" data-id="element-541" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) handleSend(); }}
            placeholder={`Ask Aruna to ${activeMode.toLowerCase()}... (type @ to mention)`}
            className="w-full bg-white border border-border rounded-2xl pl-12 pr-14 py-4 text-sm shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            disabled={isRunning}
            data-id="element-542"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isRunning}
            className={`absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${inputValue.trim() && !isRunning ? 'bg-primary text-white shadow-sm' : 'bg-cream text-text-muted'}`}
            data-id="element-543"
          >
            {isRunning ? <Loader2Icon className="w-4 h-4 animate-spin" /> : <SendIcon className="w-4 h-4 ml-0.5" data-id="element-544" />}
          </button>
        </div>
        <div className="flex justify-between items-center max-w-4xl mx-auto mt-3 px-2" data-id="element-545">
          <p className="text-[10px] text-text-muted" data-id="element-546">Aruna can make mistakes. Consider verifying important information.</p>
          <p className="text-[10px] text-text-muted font-medium" data-id="element-547">
            {latestAiMsg?.agentLabel ? `Agent: ${latestAiMsg.agentLabel}` : '~₹2.5 estimated cost'}
          </p>
        </div>
      </div>
    </div>

    {/* Right Side Panel */}
    <AnimatePresence data-id="element-548">
      {isRightPanelOpen && <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }} transition={{ type: 'spring', bounce: 0, duration: 0.4 }} className="absolute right-0 top-0 bottom-0 w-80 bg-warm-white border-l border-border shadow-2xl z-30 flex flex-col" data-id="element-549">
            <div className="p-4 border-b border-border/50 flex items-center justify-between bg-white" data-id="element-550">
              <h3 className="font-heading font-bold text-text-primary" data-id="element-551">Session Details</h3>
              <button onClick={() => setIsRightPanelOpen(false)} className="p-1.5 text-text-muted hover:text-text-primary rounded-md hover:bg-cream transition-colors" data-id="element-552">
                <PanelRightCloseIcon className="w-4 h-4" data-id="element-553" />
              </button>
            </div>

            <div className="flex border-b border-border/50 bg-white px-2" data-id="element-554">
              {(['Context', 'Files', 'Outputs'] as const).map(tab => <button key={tab} onClick={() => setRightPanelTab(tab)} className={`flex-1 py-3 text-xs font-medium border-b-2 transition-colors ${rightPanelTab === tab ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'}`} data-id="element-555">{tab}</button>)}
            </div>

            <div className="flex-1 overflow-y-auto p-4" data-id="element-556">
              {rightPanelTab === 'Context' && <div className="space-y-4" data-id="element-557">
                  <p className="text-xs text-text-secondary mb-3" data-id="element-558">Workspaces referenced in this session:</p>
                  <div className="bg-white border border-border/50 rounded-xl p-3 flex items-center gap-3 shadow-sm" data-id="element-559">
                    <div className="w-8 h-8 rounded-lg bg-rose-light/20 flex items-center justify-center text-primary text-sm" data-id="element-560">🧘</div>
                    <div data-id="element-561">
                      <p className="text-sm font-medium text-text-primary" data-id="element-562">Morning Routines</p>
                      <p className="text-[10px] text-text-muted" data-id="element-563">Personal Space</p>
                    </div>
                  </div>
                </div>}

              {rightPanelTab === 'Files' && <div className="space-y-4" data-id="element-564">
                  <p className="text-xs text-text-secondary mb-3" data-id="element-565">Files attached or referenced:</p>
                  <div className="bg-white border border-border/50 rounded-xl p-3 flex items-center gap-3 shadow-sm" data-id="element-566">
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500" data-id="element-567"><FileTextIcon className="w-4 h-4" data-id="element-568" /></div>
                    <div className="flex-1 min-w-0" data-id="element-569">
                      <p className="text-sm font-medium text-text-primary truncate" data-id="element-570">Fitness Goals 2025.pdf</p>
                      <p className="text-[10px] text-text-muted" data-id="element-571">2.4 MB</p>
                    </div>
                  </div>
                </div>}

              {rightPanelTab === 'Outputs' && <div className="space-y-4" data-id="element-572">
                  <p className="text-xs text-text-secondary mb-3" data-id="element-573">Artifacts generated in this session:</p>
                  {messages.filter(m => m.role === 'ai' && m.taskStatus === 'completed').map(m => (
                    <div key={m.id} className="bg-white border border-border/50 rounded-xl p-3 shadow-sm group cursor-pointer hover:border-primary/30 transition-colors" data-id="element-574">
                      <div className="aspect-video bg-cream rounded-lg mb-3 flex items-center justify-center border border-border/50 overflow-hidden relative" data-id="element-575">
                        <FileTextIcon className="w-8 h-8 text-text-muted opacity-50" data-id="element-576" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90 flex items-end p-2" data-id="element-577">
                          <span className="text-[10px] font-mono text-text-secondary" data-id="element-578">Markdown</span>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors" data-id="element-579">
                        {m.agentLabel ?? 'AI Response'}
                      </p>
                      <p className="text-[10px] text-text-muted mt-0.5" data-id="element-580">Generated just now</p>
                    </div>
                  ))}
                  {messages.filter(m => m.role === 'ai' && m.taskStatus === 'completed').length === 0 && (
                    <p className="text-xs text-text-muted">No outputs yet.</p>
                  )}
                </div>}
            </div>
          </motion.div>}
    </AnimatePresence>
  </div>;
}
