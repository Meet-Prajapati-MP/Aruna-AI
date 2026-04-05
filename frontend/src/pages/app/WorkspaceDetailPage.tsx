import React, { useEffect, useState, useRef, memo } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SendIcon, PaperclipIcon, CheckCircle2Icon, BrainCircuitIcon, ListTodoIcon, SparklesIcon, ChevronDownIcon, SquareIcon, RotateCwIcon, PanelRightCloseIcon, PanelRightOpenIcon, FileTextIcon, UsersIcon, FolderIcon, SearchIcon, PlayIcon, ClockIcon, BrainIcon, PuzzleIcon, AlertTriangleIcon, CheckIcon, XIcon, EditIcon } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
// Mock Data
const MOCK_WORKSPACES = [{
  id: '1',
  emoji: '🚀',
  name: 'Trustopay GTM',
  description: 'Go-to-market strategy for the new invoice financing product.',
  type: 'Professional',
  chats: 12,
  files: 8,
  outputs: 5,
  members: 2
}, {
  id: '2',
  emoji: '💼',
  name: 'Fundraising & Pitch',
  description: 'Seed round pitch deck, financial models, and investor CRM.',
  type: 'Professional',
  chats: 8,
  files: 15,
  outputs: 3
}, {
  id: '3',
  emoji: '🧘',
  name: 'Morning Routines',
  description: 'Habit tracking, daily journaling, and fitness planning.',
  type: 'Personal',
  chats: 5,
  files: 2,
  outputs: 1
}];
const WORKSPACE_FILES = [{
  id: 'f1',
  name: 'Q3 Market Analysis.pdf',
  type: 'pdf',
  size: '2.4 MB'
}, {
  id: 'f2',
  name: 'Competitor Pricing.xlsx',
  type: 'sheet',
  size: '1.1 MB'
}, {
  id: 'f3',
  name: 'Pitch Deck v2.pptx',
  type: 'presentation',
  size: '5.2 MB'
}];
const WORKSPACE_MEMORY = [{
  id: 'm1',
  fact: 'Target market: Indian SMBs with ₹10L-1Cr revenue',
  updated: '2 days ago'
}, {
  id: 'm2',
  fact: 'Key competitor: RazorpayX',
  updated: '1 week ago'
}, {
  id: 'm3',
  fact: 'Preferred tone: Professional but warm',
  updated: '2 weeks ago'
}, {
  id: 'm4',
  fact: 'Primary objective: Increase Q4 lead gen by 20%',
  updated: '3 days ago'
}];
const WORKSPACE_TOOLS = [{
  id: 't1',
  name: 'Slack',
  status: 'Connected',
  icon: '💬'
}, {
  id: 't2',
  name: 'Google Drive',
  status: 'Connected',
  icon: '📁'
}, {
  id: 't3',
  name: 'GitHub',
  status: 'Connect',
  icon: '🐙'
}, {
  id: 't4',
  name: 'Notion',
  status: 'Connect',
  icon: '📝'
}];
export function WorkspaceDetailPage() {
  const {
    id
  } = useParams();
  const workspace = MOCK_WORKSPACES.find(w => w.id === id) || MOCK_WORKSPACES[0];
  const [activeStage, setActiveStage] = useState<'thinking' | 'planning' | 'executing'>('executing');
  const [inputValue, setInputValue] = useState('');
  const [showModelMenu, setShowModelMenu] = useState(false);
  const [activeMode, setActiveMode] = useState<'Ask' | 'Research' | 'Create' | 'Operate' | 'Automate'>('Ask');
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  const [rightPanelTab, setRightPanelTab] = useState<'Files' | 'Memory' | 'Tools'>('Files');
  const [isRunning, setIsRunning] = useState(false);
  const [showAtPopup, setShowAtPopup] = useState(false);
  const [atQuery, setAtQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const modelMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modelMenuRef.current && !modelMenuRef.current.contains(event.target as Node)) {
        setShowModelMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
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
  const aiResponse = {
    thinking: `I need to analyze the current state of the ${workspace.name} workspace and provide a strategic overview based on the latest files and context.`,
    planning: `1. Review recent files using Composio: Google Drive API.\n2. Extract key metrics from Q3 Market Analysis.\n3. Formulate strategic recommendations for Slack distribution.`,
    executing: `Based on the latest documents in the **${workspace.name}** workspace, here is the current status:\n\nWe are currently tracking well against our primary objectives. The recent market analysis indicates a 15% growth opportunity in the target segment.\n\n*I have prepared a summary report. Would you like me to share it with the team?*`
  };
  return <div className="flex h-full bg-white relative overflow-hidden" data-id="element-1727">
      {/* Main Chat Area (Left Pane) */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ${isRightPanelOpen ? 'mr-80 md:mr-96' : ''}`} data-id="element-1728">
        {/* Chat Header */}
        <div className="flex-shrink-0 px-6 py-4 border-b border-border bg-white/80 backdrop-blur-sm z-10 flex flex-col gap-3" data-id="element-1729">
          <div className="flex items-center justify-between" data-id="element-1730">
            <div className="flex items-center gap-3" data-id="element-1731">
              <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center text-xl shadow-sm" data-id="element-1732">
                {workspace.emoji}
              </div>
              <div data-id="element-1733">
                <h2 className="text-lg font-heading font-bold text-text-primary flex items-center gap-2" data-id="element-1734">
                  {workspace.name}
                  <Badge variant="default" className="bg-warm-white text-[10px] uppercase tracking-wider border-none font-semibold" data-id="element-1735">
                    {workspace.type}
                  </Badge>
                </h2>
                <p className="text-xs text-text-secondary mt-0.5 line-clamp-1" data-id="element-1736">
                  {workspace.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3" data-id="element-1737">
              <div className="relative" ref={modelMenuRef} data-id="element-1738">
                <button onClick={() => setShowModelMenu(!showModelMenu)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-warm-white text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-cream transition-colors" data-id="element-1739">
                  <SparklesIcon className="w-3.5 h-3.5 text-primary" data-id="element-1740" />
                  GPT-4o
                  <ChevronDownIcon className="w-3.5 h-3.5" data-id="element-1741" />
                </button>
                <AnimatePresence data-id="element-1742">
                  {showModelMenu && <motion.div initial={{
                  opacity: 0,
                  y: 5
                }} animate={{
                  opacity: 1,
                  y: 0
                }} exit={{
                  opacity: 0,
                  y: 5
                }} className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-border/50 py-1.5 z-50" data-id="element-1743">
                      <div className="px-3 py-1.5 text-[10px] font-bold text-text-muted uppercase tracking-wider" data-id="element-1744">
                        Model Preference
                      </div>
                      <button className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-cream" data-id="element-1745">
                        Faster
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-text-primary bg-primary/5 flex items-center justify-between" data-id="element-1746">
                        <span className="font-medium text-primary" data-id="element-1747">
                          Balanced
                        </span>
                        <CheckCircle2Icon className="w-4 h-4 text-primary" data-id="element-1748" />
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-cream" data-id="element-1749">
                        Best
                      </button>
                    </motion.div>}
                </AnimatePresence>
              </div>

              <button onClick={() => setIsRightPanelOpen(!isRightPanelOpen)} className={`p-1.5 rounded-md transition-colors ${isRightPanelOpen ? 'bg-primary/10 text-primary' : 'text-text-muted hover:text-text-primary hover:bg-cream'}`} data-id="element-1750">
                {isRightPanelOpen ? <PanelRightCloseIcon className="w-5 h-5" data-id="element-1751" /> : <PanelRightOpenIcon className="w-5 h-5" data-id="element-1752" />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1" data-id="element-1753">
            {(['Ask', 'Research', 'Create', 'Operate', 'Automate'] as const).map(mode => <button key={mode} onClick={() => setActiveMode(mode)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${activeMode === mode ? 'bg-primary text-white shadow-sm' : 'bg-cream text-text-secondary hover:text-text-primary hover:bg-beige'}`} data-id="element-1754">
                {mode}
              </button>)}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8 pb-40" data-id="element-1755">
          <div className="flex justify-end" data-id="element-1756">
            <div className="bg-cream text-text-primary px-5 py-3.5 rounded-2xl rounded-tr-sm max-w-[85%] sm:max-w-[75%] shadow-sm" data-id="element-1757">
              <p className="text-sm leading-relaxed" data-id="element-1758">
                Give me a quick status update on this workspace based on the
                latest files.
              </p>
            </div>
          </div>

          <div className="flex justify-start" data-id="element-1759">
            <div className="flex gap-3 max-w-[95%] sm:max-w-[85%] w-full" data-id="element-1760">
              <div className="w-8 h-8 rounded-lg bg-primary flex-shrink-0 flex items-center justify-center text-white mt-1 shadow-sm" data-id="element-1761">
                <SparklesIcon className="w-4 h-4" data-id="element-1762" />
              </div>

              <div className="flex-1 flex flex-col gap-2" data-id="element-1763">
                <div className="bg-white border border-border shadow-soft rounded-2xl rounded-tl-sm overflow-hidden" data-id="element-1764">
                  <div className="flex border-b border-border bg-warm-white/30 px-2 pt-2 overflow-x-auto hide-scrollbar" data-id="element-1765">
                    <button onClick={() => setActiveStage('thinking')} className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${activeStage === 'thinking' ? 'border-primary text-primary bg-white rounded-t-lg' : 'border-transparent text-text-secondary hover:text-text-primary'}`} data-id="element-1766">
                      <BrainCircuitIcon className="w-3.5 h-3.5" data-id="element-1767" /> Thinking
                    </button>
                    <button onClick={() => setActiveStage('planning')} className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${activeStage === 'planning' ? 'border-primary text-primary bg-white rounded-t-lg' : 'border-transparent text-text-secondary hover:text-text-primary'}`} data-id="element-1768">
                      <ListTodoIcon className="w-3.5 h-3.5" data-id="element-1769" /> Planning
                    </button>
                    <button onClick={() => setActiveStage('executing')} className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${activeStage === 'executing' ? 'border-primary text-primary bg-white rounded-t-lg' : 'border-transparent text-text-secondary hover:text-text-primary'}`} data-id="element-1770">
                      <CheckCircle2Icon className="w-3.5 h-3.5" data-id="element-1771" /> Executing
                    </button>
                  </div>

                  <div className="p-5 sm:p-6 bg-white min-h-[150px]" data-id="element-1772">
                    <AnimatePresence mode="wait" data-id="element-1773">
                      <motion.div key={activeStage} initial={{
                      opacity: 0,
                      y: 5
                    }} animate={{
                      opacity: 1,
                      y: 0
                    }} exit={{
                      opacity: 0,
                      y: -5
                    }} transition={{
                      duration: 0.2
                    }} className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap" data-id="element-1774">
                        {activeStage === 'thinking' && <div className="text-text-secondary italic border-l-2 border-primary/30 pl-4 py-1" data-id="element-1775">
                            {aiResponse.thinking}
                          </div>}
                        {activeStage === 'planning' && <div className="text-text-secondary font-mono text-xs leading-loose bg-slate-50 p-4 rounded-lg border border-slate-100 whitespace-pre-wrap" data-id="element-1776">
                            {aiResponse.planning}
                          </div>}
                        {activeStage === 'executing' && <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-strong:text-text-primary prose-strong:font-semibold" data-id="element-1777">
                            {aiResponse.executing.split('\n\n').map((paragraph, i) => <p key={i} dangerouslySetInnerHTML={{
                          __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')
                        }} data-id="element-1778" />)}
                          </div>}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* HITL Approval Card */}
          <div className="flex justify-start mt-4" data-id="element-1779">
            <div className="flex gap-3 max-w-[95%] sm:max-w-[85%] w-full ml-11" data-id="element-1780">
              <Card padding="md" className="w-full border-l-4 border-l-amber-400 shadow-md" data-id="element-1781">
                <div className="flex items-start justify-between mb-4" data-id="element-1782">
                  <div className="flex items-center gap-2" data-id="element-1783">
                    <Badge variant="default" className="bg-amber-50 text-amber-700 border-none flex items-center gap-1" data-id="element-1784">
                      <AlertTriangleIcon className="w-3 h-3" data-id="element-1785" /> Approval
                      Required
                    </Badge>
                    <Badge variant="default" className="bg-red-50 text-red-700 border-none" data-id="element-1786">
                      Medium Risk
                    </Badge>
                  </div>
                  <span className="text-xs text-text-muted flex items-center gap-1" data-id="element-1787">
                    <ClockIcon className="w-3 h-3" data-id="element-1788" /> Just now
                  </span>
                </div>

                <div className="space-y-4 mb-6" data-id="element-1789">
                  <div data-id="element-1790">
                    <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1" data-id="element-1791">
                      Goal
                    </h4>
                    <p className="text-sm text-text-primary font-medium" data-id="element-1792">
                      Send competitive analysis to team
                    </p>
                  </div>
                  <div className="bg-cream/50 border border-border/50 rounded-xl p-3" data-id="element-1793">
                    <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2" data-id="element-1794">
                      Proposed Action
                    </h4>
                    <p className="text-sm text-text-secondary leading-relaxed" data-id="element-1795">
                      Share the generated summary report via Slack to the{' '}
                      <span className="font-semibold text-text-primary" data-id="element-1796">
                        #strategy
                      </span>{' '}
                      channel.
                    </p>
                    <div className="mt-2 pt-2 border-t border-border/50 flex items-center gap-4 text-xs text-text-muted" data-id="element-1797">
                      <span data-id="element-1798">Integration: Slack</span>
                      <span data-id="element-1799">Estimated time: Immediate</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3" data-id="element-1800">
                  <Button variant="outline" className="flex-1 flex items-center justify-center gap-2" leftIcon={<EditIcon className="w-4 h-4" data-id="element-1802" />} data-id="element-1801">
                    Modify
                  </Button>
                  <Button variant="outline" className="flex-1 text-red-600 border-red-200 hover:bg-red-50" leftIcon={<XIcon className="w-4 h-4" data-id="element-1804" />} data-id="element-1803">
                    Reject
                  </Button>
                  <Button variant="primary" className="flex-1 bg-green-600 hover:bg-green-700 text-white" leftIcon={<CheckIcon className="w-4 h-4" data-id="element-1806" />} data-id="element-1805">
                    Approve
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-10 pb-6 px-4 sm:px-6" data-id="element-1807">
          <div className="max-w-4xl mx-auto relative" data-id="element-1808">
            <div className="absolute -top-10 right-0 flex gap-2" data-id="element-1809">
              {isRunning ? <button onClick={() => setIsRunning(false)} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-full text-xs font-medium transition-colors shadow-sm border border-red-100" data-id="element-1810">
                  <SquareIcon className="w-3 h-3 fill-current" data-id="element-1811" /> Stop
                </button> : <button onClick={() => setIsRunning(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-text-secondary hover:text-text-primary hover:bg-cream rounded-full text-xs font-medium transition-colors shadow-sm border border-border" data-id="element-1812">
                  <RotateCwIcon className="w-3 h-3" data-id="element-1813" /> Rerun
                </button>}
            </div>

            <AnimatePresence data-id="element-1814">
              {showAtPopup && <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowAtPopup(false)} data-id="element-1815" />
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
              }} className="absolute bottom-full left-0 mb-3 w-80 bg-white rounded-2xl shadow-xl border border-border overflow-hidden z-50 flex flex-col max-h-80" data-id="element-1816">
                    <div className="p-3 border-b border-border/50 bg-warm-white/30 flex items-center gap-2" data-id="element-1817">
                      <SearchIcon className="w-4 h-4 text-text-muted" data-id="element-1818" />
                      <input type="text" value={atQuery} onChange={e => setAtQuery(e.target.value)} placeholder="Search files in workspace..." className="bg-transparent border-none focus:outline-none text-sm w-full" autoFocus data-id="element-1819" />
                    </div>
                    <div className="overflow-y-auto p-2 space-y-4 hide-scrollbar" data-id="element-1820">
                      <div data-id="element-1821">
                        <div className="px-2 pb-1.5 text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5" data-id="element-1822">
                          <FolderIcon className="w-3 h-3" data-id="element-1823" /> Workspace Files
                        </div>
                        <div className="space-y-0.5" data-id="element-1824">
                          {WORKSPACE_FILES.filter(f => f.name.toLowerCase().includes(atQuery)).map(file => <button key={file.id} onClick={() => handleMentionSelect(file.name)} className="w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-cream transition-colors text-left group" data-id="element-1825">
                              <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shadow-sm group-hover:scale-105 transition-transform" data-id="element-1826">
                                <FileTextIcon className="w-4 h-4" data-id="element-1827" />
                              </div>
                              <div className="flex-1 min-w-0" data-id="element-1828">
                                <p className="text-sm font-medium text-text-primary truncate" data-id="element-1829">
                                  {file.name}
                                </p>
                                <p className="text-[10px] text-text-muted uppercase" data-id="element-1830">
                                  {file.type}
                                </p>
                              </div>
                            </button>)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </>}
            </AnimatePresence>

            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary cursor-pointer transition-colors" data-id="element-1831">
              <PaperclipIcon className="w-5 h-5" data-id="element-1832" />
            </div>
            <input ref={inputRef} type="text" value={inputValue} onChange={handleInputChange} placeholder={`Ask Aruna to ${activeMode.toLowerCase()} in ${workspace.name}...`} className="w-full bg-white border border-border rounded-2xl pl-12 pr-14 py-4 text-sm shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" data-id="element-1833" />
            <button className={`absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${inputValue.trim() ? 'bg-primary text-white shadow-sm' : 'bg-cream text-text-muted'}`} data-id="element-1834">
              <SendIcon className="w-4 h-4 ml-0.5" data-id="element-1835" />
            </button>
          </div>
          <div className="flex justify-between items-center max-w-4xl mx-auto mt-3 px-2" data-id="element-1836">
            <p className="text-[10px] text-text-muted" data-id="element-1837">
              Aruna can make mistakes. Consider verifying important information.
            </p>
            <p className="text-[10px] text-text-muted font-medium" data-id="element-1838">
              ~₹1.2 estimated cost
            </p>
          </div>
        </div>
      </div>

      {/* Right Side Panel (Contextual Sidebar) */}
      <AnimatePresence data-id="element-1839">
        {isRightPanelOpen && <motion.div initial={{
        x: 400,
        opacity: 0
      }} animate={{
        x: 0,
        opacity: 1
      }} exit={{
        x: 400,
        opacity: 0
      }} transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.4
      }} className="absolute right-0 top-0 bottom-0 w-80 md:w-96 bg-warm-white border-l border-border shadow-2xl z-30 flex flex-col" data-id="element-1840">
            <div className="p-4 border-b border-border/50 flex items-center justify-between bg-white" data-id="element-1841">
              <h3 className="font-heading font-bold text-text-primary" data-id="element-1842">
                Workspace Context
              </h3>
              <button onClick={() => setIsRightPanelOpen(false)} className="p-1.5 text-text-muted hover:text-text-primary rounded-md hover:bg-cream transition-colors" data-id="element-1843">
                <PanelRightCloseIcon className="w-4 h-4" data-id="element-1844" />
              </button>
            </div>

            <div className="flex border-b border-border/50 bg-white px-2" data-id="element-1845">
              {(['Files', 'Memory', 'Tools'] as const).map(tab => <button key={tab} onClick={() => setRightPanelTab(tab)} className={`flex-1 py-3 text-xs font-medium border-b-2 transition-colors ${rightPanelTab === tab ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'}`} data-id="element-1846">
                  {tab}
                </button>)}
            </div>

            <div className="flex-1 overflow-y-auto p-4" data-id="element-1847">
              {rightPanelTab === 'Files' && <div className="space-y-3" data-id="element-1848">
                  {WORKSPACE_FILES.map(file => <div key={file.id} className="bg-white border border-border/50 rounded-xl p-3 flex items-center gap-3 shadow-sm group cursor-pointer hover:border-primary/30 transition-colors" data-id="element-1849">
                      <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500 flex-shrink-0" data-id="element-1850">
                        <FileTextIcon className="w-5 h-5" data-id="element-1851" />
                      </div>
                      <div className="flex-1 min-w-0" data-id="element-1852">
                        <p className="text-sm font-medium text-text-primary truncate group-hover:text-primary transition-colors" data-id="element-1853">
                          {file.name}
                        </p>
                        <p className="text-[10px] text-text-muted uppercase" data-id="element-1854">
                          {file.type} • {file.size}
                        </p>
                      </div>
                    </div>)}
                  <button className="w-full py-3 border-2 border-dashed border-border rounded-xl text-sm font-medium text-text-secondary hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-center gap-2" data-id="element-1855">
                    <FolderIcon className="w-4 h-4" data-id="element-1856" /> Upload File
                  </button>
                </div>}

              {rightPanelTab === 'Memory' && <div className="space-y-3" data-id="element-1857">
                  <div className="mb-4" data-id="element-1858">
                    <p className="text-xs text-text-secondary leading-relaxed" data-id="element-1859">
                      Extracted facts and context Aruna remembers about this
                      workspace.
                    </p>
                  </div>
                  {WORKSPACE_MEMORY.map(memory => <div key={memory.id} className="bg-white border border-border/50 rounded-xl p-3 shadow-sm" data-id="element-1860">
                      <div className="flex items-start gap-3" data-id="element-1861">
                        <div className="mt-0.5 text-primary" data-id="element-1862">
                          <BrainIcon className="w-4 h-4" data-id="element-1863" />
                        </div>
                        <div data-id="element-1864">
                          <p className="text-sm font-medium text-text-primary leading-snug mb-1" data-id="element-1865">
                            {memory.fact}
                          </p>
                          <p className="text-[10px] text-text-muted" data-id="element-1866">
                            Updated {memory.updated}
                          </p>
                        </div>
                      </div>
                    </div>)}
                </div>}

              {rightPanelTab === 'Tools' && <div className="space-y-3" data-id="element-1867">
                  <div className="mb-4 flex items-center justify-between" data-id="element-1868">
                    <p className="text-xs text-text-secondary" data-id="element-1869">
                      Composio integrations enabled for this workspace.
                    </p>
                    <Badge variant="default" className="bg-primary/10 text-primary border-none text-[10px]" data-id="element-1870">
                      <PuzzleIcon className="w-3 h-3 mr-1" data-id="element-1871" /> Composio
                    </Badge>
                  </div>
                  {WORKSPACE_TOOLS.map(tool => <div key={tool.id} className="bg-white border border-border/50 rounded-xl p-3 flex items-center justify-between shadow-sm" data-id="element-1872">
                      <div className="flex items-center gap-3" data-id="element-1873">
                        <div className="w-8 h-8 rounded-lg bg-cream flex items-center justify-center text-lg" data-id="element-1874">
                          {tool.icon}
                        </div>
                        <span className="text-sm font-medium text-text-primary" data-id="element-1875">
                          {tool.name}
                        </span>
                      </div>
                      {tool.status === 'Connected' ? <Badge variant="default" className="bg-emerald-50 text-emerald-700 border-none text-[10px]" data-id="element-1876">
                          Connected
                        </Badge> : <Button variant="outline" size="sm" className="h-7 text-xs px-2" data-id="element-1877">
                          Connect
                        </Button>}
                    </div>)}
                </div>}
            </div>
          </motion.div>}
      </AnimatePresence>
    </div>;
}