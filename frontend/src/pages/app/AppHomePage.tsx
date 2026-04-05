import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { SendIcon, PaperclipIcon, FolderIcon, FileTextIcon, SearchIcon, GlobeIcon, HeartIcon, BriefcaseIcon, ArrowRightIcon, ClockIcon, SparklesIcon, PresentationIcon, MailIcon, GitBranchIcon, Loader2Icon, CheckCircle2Icon, AlertCircleIcon, ShieldCheckIcon, BarChart3Icon, ZapIcon, BrainCircuitIcon } from 'lucide-react';
// Mock data for @ mentions
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
}, {
  id: 'd7',
  emoji: '📊',
  name: 'Market Research Hub',
  space: 'professional'
}, {
  id: 'd8',
  emoji: '🎯',
  name: 'Q4 OKR Planning',
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
}, {
  id: 'f5',
  name: 'Market Research.xlsx',
  type: 'sheet'
}, {
  id: 'f6',
  name: 'Pitch Deck v2.pptx',
  type: 'slide'
}];
export function AppHomePage() {
  const navigate = useNavigate();
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const [activeModelTier, setActiveModelTier] = useState<'lite' | 'medium' | 'complex'>('medium');
  const [inputValue, setInputValue] = useState('');
  const [showAtPopup, setShowAtPopup] = useState(false);
  const [atQuery, setAtQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
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
  /**
   * FIX F7: Pass the task text as route state so ChatPage can submit it.
   * Without this, ChatPage had no idea what the user typed.
   */
  const handleStartChat = () => {
    if (inputValue.trim()) {
      navigate('/app/chat/new', {
        state: {
          initialTask: inputValue.trim(),
          complexity: activeModelTier === 'lite'
            ? 'simple'
            : activeModelTier === 'complex'
            ? 'complex'
            : 'medium',
        },
      });
    }
  };
  const filteredDosti = DOSTI_LIST.filter(d => d.name.toLowerCase().includes(atQuery));
  const filteredFiles = FILE_LIST.filter(f => f.name.toLowerCase().includes(atQuery));
  const modelTiers = {
    lite: {
      icon: ZapIcon,
      label: 'Lite',
      subtitle: 'Llama 3 / Mistral',
      color: 'text-emerald-600'
    },
    medium: {
      icon: SparklesIcon,
      label: 'Medium',
      subtitle: 'Claude Haiku / Mixtral',
      color: 'text-primary'
    },
    complex: {
      icon: BrainCircuitIcon,
      label: 'Complex',
      subtitle: 'GPT-4o / Claude 3.5',
      color: 'text-purple-600'
    }
  };
  const quickActions = [{
    icon: SearchIcon,
    label: 'Research',
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  }, {
    icon: PresentationIcon,
    label: 'Build Deck',
    color: 'text-amber-600',
    bg: 'bg-amber-50'
  }, {
    icon: FileTextIcon,
    label: 'Analyze Files',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  }, {
    icon: MailIcon,
    label: 'Draft Email',
    color: 'text-purple-600',
    bg: 'bg-purple-50'
  }, {
    icon: GlobeIcon,
    label: 'Browser Task',
    color: 'text-cyan-600',
    bg: 'bg-cyan-50'
  }, {
    icon: GitBranchIcon,
    label: 'Create Workflow',
    color: 'text-orange-600',
    bg: 'bg-orange-50'
  }];
  const runningTasks = [{
    title: 'Competitor Analysis: Fintech',
    workspace: 'Market Research Hub',
    status: 'running',
    progress: 65,
    time: '12m elapsed'
  }, {
    title: 'Weekly Reflection Summary',
    workspace: 'Morning Routines',
    status: 'queued',
    progress: 0,
    time: 'Waiting'
  }, {
    title: 'Trustopay GTM Strategy',
    workspace: 'Trustopay GTM Strategy',
    status: 'completed',
    progress: 100,
    time: 'Completed 2h ago'
  }];
  const approvals = [{
    action: 'Send email to investor list (42 recipients)',
    risk: 'High',
    workspace: 'Fundraising & Pitch Deck',
    time: '10m ago'
  }, {
    action: 'Publish blog post to Webflow',
    risk: 'Medium',
    workspace: 'Content Pipeline',
    time: '1h ago'
  }];
  const recentWork = [{
    title: 'Trustopay GTM Strategy',
    mode: 'professional' as const,
    date: '2 days ago',
    preview: 'The primary target audience for the initial launch should be...',
    hasArtifact: true
  }, {
    title: 'Weekly Reflection & Goals',
    mode: 'personal' as const,
    date: 'Yesterday',
    preview: 'Looking back at the past week, I accomplished...',
    hasArtifact: false
  }, {
    title: 'Competitor Analysis: Fintech',
    mode: 'professional' as const,
    date: 'Last week',
    preview: 'Analyzing the top 3 competitors in the invoice financing space...',
    hasArtifact: true
  }];
  const stagger = (delay: number) => ({
    initial: {
      opacity: 0,
      y: 12
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      delay,
      duration: 0.4
    }
  });
  return <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10" data-id="element-192">
      {/* Greeting */}
      <motion.div {...stagger(0)} data-id="element-193">
        <p className="text-sm font-medium text-text-muted mb-1" data-id="element-194">{date}</p>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-text-primary" data-id="element-195">
          {greeting}, Alex.
        </h1>
        <p className="text-text-secondary mt-1.5" data-id="element-196">
          What would you like to work on today?
        </p>
      </motion.div>

      {/* Mode Switcher + Prompt Composer */}
      <motion.div {...stagger(0.1)} className="max-w-3xl mx-auto space-y-4" data-id="element-197">
        {/* Model Tier Selector */}
        <div className="flex justify-center" data-id="element-198">
          <div className="bg-cream p-1 rounded-full inline-flex overflow-x-auto hide-scrollbar max-w-full" data-id="element-199">
            {(['lite', 'medium', 'complex'] as const).map(tier => {
            const config = modelTiers[tier];
            const isActive = activeModelTier === tier;
            return <button key={tier} onClick={() => setActiveModelTier(tier)} className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all whitespace-nowrap ${isActive ? 'bg-white shadow-sm text-text-primary' : 'text-text-secondary hover:text-text-primary'}`} data-id="element-200">
                  <config.icon className={`w-4 h-4 ${isActive ? config.color : ''}`} data-id="element-201" />
                  <div className="flex flex-col items-start text-left" data-id="element-202">
                    <span className="text-sm font-medium leading-none mb-0.5" data-id="element-203">
                      {config.label}
                    </span>
                    <span className="text-[10px] text-text-muted leading-none" data-id="element-204">
                      {config.subtitle}
                    </span>
                  </div>
                </button>;
          })}
          </div>
        </div>

        {/* Prompt Composer */}
        <div className="relative" data-id="element-205">
          {/* @ Mention Popup */}
          <AnimatePresence data-id="element-206">
            {showAtPopup && <>
                <div className="fixed inset-0 z-40" onClick={() => setShowAtPopup(false)} data-id="element-207" />
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
            }} className="absolute bottom-full left-0 mb-3 w-80 bg-white rounded-2xl shadow-xl border border-border overflow-hidden z-50 flex flex-col max-h-80" data-id="element-208">
                  <div className="p-3 border-b border-border/50 bg-warm-white/30 flex items-center gap-2" data-id="element-209">
                    <SearchIcon className="w-4 h-4 text-text-muted" data-id="element-210" />
                    <input type="text" value={atQuery} onChange={e => setAtQuery(e.target.value)} placeholder="Search workspaces or files..." className="bg-transparent border-none focus:outline-none text-sm w-full" autoFocus data-id="element-211" />
                  </div>
                  <div className="overflow-y-auto p-2 space-y-4 hide-scrollbar" data-id="element-212">
                    {filteredDosti.length > 0 && <div data-id="element-213">
                        <div className="px-2 pb-1.5 text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5" data-id="element-214">
                          <FolderIcon className="w-3 h-3" data-id="element-215" /> Workspaces
                        </div>
                        <div className="space-y-0.5" data-id="element-216">
                          {filteredDosti.map(dosti => <button key={dosti.id} onClick={() => handleMentionSelect(dosti.name)} className="w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-cream transition-colors text-left group" data-id="element-217">
                              <div className="w-8 h-8 rounded-lg bg-white border border-border/50 flex items-center justify-center text-sm shadow-sm" data-id="element-218">
                                {dosti.emoji}
                              </div>
                              <div className="flex-1 min-w-0" data-id="element-219">
                                <p className="text-sm font-medium text-text-primary truncate" data-id="element-220">
                                  {dosti.name}
                                </p>
                                <p className="text-[10px] text-text-muted capitalize" data-id="element-221">
                                  {dosti.space}
                                </p>
                              </div>
                            </button>)}
                        </div>
                      </div>}
                    {filteredFiles.length > 0 && <div data-id="element-222">
                        <div className="px-2 pb-1.5 text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5" data-id="element-223">
                          <FileTextIcon className="w-3 h-3" data-id="element-224" /> Files
                        </div>
                        <div className="space-y-0.5" data-id="element-225">
                          {filteredFiles.map(file => <button key={file.id} onClick={() => handleMentionSelect(file.name)} className="w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-cream transition-colors text-left group" data-id="element-226">
                              <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shadow-sm" data-id="element-227">
                                <FileTextIcon className="w-4 h-4" data-id="element-228" />
                              </div>
                              <div className="flex-1 min-w-0" data-id="element-229">
                                <p className="text-sm font-medium text-text-primary truncate" data-id="element-230">
                                  {file.name}
                                </p>
                                <p className="text-[10px] text-text-muted uppercase" data-id="element-231">
                                  {file.type}
                                </p>
                              </div>
                            </button>)}
                        </div>
                      </div>}
                    {filteredDosti.length === 0 && filteredFiles.length === 0 && <div className="py-6 text-center text-sm text-text-muted" data-id="element-232">
                          No results found for &ldquo;{atQuery}&rdquo;
                        </div>}
                  </div>
                </motion.div>
              </>}
          </AnimatePresence>

          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary cursor-pointer transition-colors" data-id="element-233">
            <PaperclipIcon className="w-5 h-5" data-id="element-234" />
          </div>
          <input ref={inputRef} type="text" value={inputValue} onChange={handleInputChange} onKeyDown={e => e.key === 'Enter' && handleStartChat()} placeholder="What would you like to work on today? (type @ to mention)" className="w-full bg-white border border-border rounded-2xl pl-12 pr-14 py-4 text-base shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" data-id="element-235" />
          <button onClick={handleStartChat} className={`absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center transition-all ${inputValue.trim() ? 'bg-primary text-white shadow-sm' : 'bg-cream text-text-muted'}`} data-id="element-236">
            <SendIcon className="w-4 h-4 ml-0.5" data-id="element-237" />
          </button>
        </div>
      </motion.div>

      {/* Today Briefing */}
      <motion.div {...stagger(0.15)} className="max-w-3xl mx-auto" data-id="element-238">
        <div className="bg-white/80 backdrop-blur-md border border-border shadow-sm rounded-2xl p-4 flex items-start gap-4" data-id="element-239">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary" data-id="element-240">
            <SparklesIcon className="w-5 h-5" data-id="element-241" />
          </div>
          <div data-id="element-242">
            <h3 className="text-sm font-heading font-bold text-text-primary mb-1" data-id="element-243">
              Today's Briefing
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed" data-id="element-244">
              You have{' '}
              <span className="font-medium text-text-primary" data-id="element-245">
                1 task running
              </span>
              ,{' '}
              <span className="font-medium text-text-primary" data-id="element-246">
                2 items awaiting approval
              </span>
              , and a research report on Fintech Competitors ready in your
              Vault.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div {...stagger(0.2)} data-id="element-247">
        <h2 className="text-lg font-heading font-bold text-text-primary mb-4" data-id="element-248">
          Quick Actions
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar -mx-1 px-1" data-id="element-249">
          {quickActions.map((action, idx) => <Card key={idx} padding="sm" clickable onClick={() => navigate('/app/chat/new')} className="flex-shrink-0 w-36 flex flex-col items-center justify-center text-center gap-3 group" data-id="element-250">
              <div className={`w-10 h-10 rounded-xl ${action.bg} ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`} data-id="element-251">
                <action.icon className="w-5 h-5" data-id="element-252" />
              </div>
              <h3 className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors" data-id="element-253">
                {action.label}
              </h3>
            </Card>)}
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8" data-id="element-254">
        {/* Running Tasks */}
        <motion.div {...stagger(0.25)} className="space-y-4" data-id="element-255">
          <div className="flex items-center justify-between" data-id="element-256">
            <h2 className="text-lg font-heading font-bold text-text-primary" data-id="element-257">
              Running Tasks
            </h2>
            <Link to="/app/tasks" className="text-sm text-primary hover:text-primary-dark font-medium flex items-center gap-1" data-id="element-258">
              View all <ArrowRightIcon className="w-3.5 h-3.5" data-id="element-259" />
            </Link>
          </div>
          <div className="space-y-3" data-id="element-260">
            {runningTasks.map((task, idx) => <Card key={idx} padding="sm" className="flex flex-col gap-3" data-id="element-261">
                <div className="flex items-start justify-between gap-2" data-id="element-262">
                  <div className="flex-1 min-w-0" data-id="element-263">
                    <h3 className="text-sm font-medium text-text-primary truncate" data-id="element-264">
                      {task.title}
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5 truncate" data-id="element-265">
                      {task.workspace}
                    </p>
                  </div>
                  <Badge variant="default" className={`flex-shrink-0 border-none ${task.status === 'running' ? 'bg-blue-50 text-blue-700' : task.status === 'queued' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`} data-id="element-266">
                    {task.status === 'running' && <Loader2Icon className="w-3 h-3 mr-1 animate-spin" data-id="element-267" />}
                    {task.status === 'queued' && <ClockIcon className="w-3 h-3 mr-1" data-id="element-268" />}
                    {task.status === 'completed' && <CheckCircle2Icon className="w-3 h-3 mr-1" data-id="element-269" />}
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </Badge>
                </div>
                {task.status === 'running' && <div className="space-y-1.5" data-id="element-270">
                    <div className="flex justify-between text-[10px] text-text-muted" data-id="element-271">
                      <span data-id="element-272">Analyzing data...</span>
                      <span data-id="element-273">{task.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-cream rounded-full overflow-hidden" data-id="element-274">
                      <div className="h-full bg-blue-500 rounded-full" style={{
                  width: `${task.progress}%`
                }} data-id="element-275"></div>
                    </div>
                  </div>}
                <div className="text-[10px] text-text-muted flex justify-end" data-id="element-276">
                  {task.time}
                </div>
              </Card>)}
          </div>
        </motion.div>

        {/* Waiting for Approval */}
        <motion.div {...stagger(0.3)} className="space-y-4" data-id="element-277">
          <div className="flex items-center justify-between" data-id="element-278">
            <h2 className="text-lg font-heading font-bold text-text-primary flex items-center gap-2" data-id="element-279">
              Waiting for Approval
              <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-medium" data-id="element-280">
                2
              </span>
            </h2>
            <Link to="/app/approvals" className="text-sm text-primary hover:text-primary-dark font-medium flex items-center gap-1" data-id="element-281">
              View all <ArrowRightIcon className="w-3.5 h-3.5" data-id="element-282" />
            </Link>
          </div>
          <div className="space-y-3" data-id="element-283">
            {approvals.map((approval, idx) => <Card key={idx} padding="sm" className="flex flex-col gap-3 border-l-4 border-l-amber-400" data-id="element-284">
                <div className="flex items-start justify-between gap-2" data-id="element-285">
                  <div className="flex-1 min-w-0" data-id="element-286">
                    <p className="text-sm font-medium text-text-primary leading-snug" data-id="element-287">
                      {approval.action}
                    </p>
                    <p className="text-xs text-text-muted mt-1 truncate" data-id="element-288">
                      {approval.workspace} • {approval.time}
                    </p>
                  </div>
                  <Badge variant="default" className={`flex-shrink-0 border-none ${approval.risk === 'High' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`} data-id="element-289">
                    <AlertCircleIcon className="w-3 h-3 mr-1" data-id="element-290" />
                    {approval.risk} Risk
                  </Badge>
                </div>
                <div className="flex gap-2 pt-2 border-t border-border/50" data-id="element-291">
                  <button className="flex-1 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors" data-id="element-292">
                    Approve
                  </button>
                  <button className="flex-1 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors" data-id="element-293">
                    Reject
                  </button>
                </div>
              </Card>)}
          </div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-8" data-id="element-294">
        {/* Continue Recent Work */}
        <motion.div {...stagger(0.35)} className="md:col-span-2 space-y-4" data-id="element-295">
          <div className="flex items-center justify-between" data-id="element-296">
            <h2 className="text-lg font-heading font-bold text-text-primary" data-id="element-297">
              Continue Recent Work
            </h2>
            <Link to="/app/history" className="text-sm text-primary hover:text-primary-dark font-medium flex items-center gap-1" data-id="element-298">
              View history <ArrowRightIcon className="w-3.5 h-3.5" data-id="element-299" />
            </Link>
          </div>
          <div className="space-y-2.5" data-id="element-300">
            {recentWork.map((session, idx) => <Card key={idx} padding="sm" clickable onClick={() => navigate(`/app/chat/${idx}`)} className="flex items-center gap-4" data-id="element-301">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${session.mode === 'personal' ? 'bg-rose-light/15 text-primary' : session.mode === 'professional' ? 'bg-slate-100 text-slate-600' : 'bg-cream text-text-muted'}`} data-id="element-302">
                  {session.mode === 'personal' ? <HeartIcon className="w-4.5 h-4.5" data-id="element-303" /> : session.mode === 'professional' ? <BriefcaseIcon className="w-4.5 h-4.5" data-id="element-304" /> : <GlobeIcon className="w-4.5 h-4.5" data-id="element-305" />}
                </div>
                <div className="flex-1 min-w-0" data-id="element-306">
                  <div className="flex items-center gap-2.5 mb-0.5" data-id="element-307">
                    <h3 className="text-sm font-medium text-text-primary truncate" data-id="element-308">
                      {session.title}
                    </h3>
                    {session.hasArtifact && <Badge variant="default" size="sm" className="flex-shrink-0" data-id="element-309">
                        <FileTextIcon className="w-3 h-3 mr-1" data-id="element-310" />
                        Artifact
                      </Badge>}
                  </div>
                  <p className="text-xs text-text-muted truncate" data-id="element-311">
                    {session.preview}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-text-muted whitespace-nowrap flex-shrink-0" data-id="element-312">
                  <ClockIcon className="w-3 h-3" data-id="element-313" />
                  {session.date}
                </div>
              </Card>)}
          </div>
        </motion.div>

        {/* Usage Widget */}
        <motion.div {...stagger(0.4)} className="space-y-4" data-id="element-314">
          <h2 className="text-lg font-heading font-bold text-text-primary" data-id="element-315">
            Usage & Budget
          </h2>
          <Card padding="md" className="flex flex-col gap-4" data-id="element-316">
            <div className="flex items-center justify-between" data-id="element-317">
              <span className="text-sm font-medium text-text-secondary" data-id="element-318">
                This Month
              </span>
              <Badge variant="default" className="bg-warm-white border-none text-xs" data-id="element-319">
                Pro Plan
              </Badge>
            </div>

            <div data-id="element-320">
              <div className="flex items-baseline gap-1 mb-2" data-id="element-321">
                <span className="text-2xl font-heading font-bold text-text-primary" data-id="element-322">
                  ₹847
                </span>
                <span className="text-sm text-text-muted" data-id="element-323">/ ₹1,500</span>
              </div>
              <div className="h-2 w-full bg-cream rounded-full overflow-hidden" data-id="element-324">
                <div className="h-full bg-primary rounded-full" style={{
                width: '56%'
              }} data-id="element-325"></div>
              </div>
              <p className="text-[10px] text-text-muted mt-2 text-right" data-id="element-326">
                56% of monthly budget
              </p>
            </div>

            <div className="pt-4 border-t border-border/50" data-id="element-327">
              <Link to="/app/usage" className="text-sm text-primary hover:text-primary-dark font-medium flex items-center justify-center gap-1 w-full" data-id="element-328">
                View detailed usage <ArrowRightIcon className="w-3.5 h-3.5" data-id="element-329" />
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>;
}