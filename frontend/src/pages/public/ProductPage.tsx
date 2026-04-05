import React, { Children } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { MessageSquareIcon, BrainCircuitIcon, ListTodoIcon, CheckCircle2Icon, PackageIcon, HeartIcon, BriefcaseIcon, SearchIcon, FileTextIcon, ArchiveIcon, CpuIcon, MicIcon, CalendarIcon, MailIcon, WatchIcon, EarIcon, ArrowRightIcon, SparklesIcon, ZapIcon, TargetIcon, PenToolIcon, ClipboardListIcon, NetworkIcon, ScaleIcon, LayersIcon } from 'lucide-react';
export function ProductPage() {
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  const flowSteps = [{
    icon: MessageSquareIcon,
    title: 'Ask',
    desc: 'Describe what you need',
    color: 'bg-gray-50 text-gray-600 border-gray-200'
  }, {
    icon: SparklesIcon,
    title: 'Understand',
    desc: 'Intent and context analyzed',
    color: 'bg-purple-50 text-purple-600 border-purple-100'
  }, {
    icon: BrainCircuitIcon,
    title: 'Think',
    desc: 'Explores angles and depth',
    color: 'bg-amber-50 text-amber-600 border-amber-100'
  }, {
    icon: ListTodoIcon,
    title: 'Plan',
    desc: 'Framework and steps designed',
    color: 'bg-blue-50 text-blue-600 border-blue-100'
  }, {
    icon: ZapIcon,
    title: 'Execute',
    desc: 'Best models do the work',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100'
  }, {
    icon: PackageIcon,
    title: 'Deliver',
    desc: 'Structured, ready to use',
    color: 'bg-rose-50 text-rose-600 border-rose-100'
  }];
  const features = [{
    icon: HeartIcon,
    title: 'Personal Use',
    desc: 'Goals, routines, journaling, and life planning — with a companion that remembers your priorities and preferences.',
    color: 'bg-rose-light/20 text-primary'
  }, {
    icon: BriefcaseIcon,
    title: 'Professional Use',
    desc: 'Business plans, pitch decks, GTM strategies, and competitive research — structured for investors, clients, and teams.',
    color: 'bg-slate-100 text-slate-700'
  }, {
    icon: SearchIcon,
    title: 'Deep Research',
    desc: 'Live web research, competitive intelligence, market sizing, and trend synthesis — not just summaries.',
    color: 'bg-blue-50 text-blue-600'
  }, {
    icon: FileTextIcon,
    title: 'Deliverables',
    desc: 'Polished documents, structured reports, and presentation outlines — work you can send, not edit endlessly.',
    color: 'bg-emerald-50 text-emerald-600'
  }, {
    icon: ArchiveIcon,
    title: 'Files & Vault',
    desc: 'Upload your existing work, save generated outputs, and build persistent context that improves every session.',
    color: 'bg-amber-50 text-amber-600'
  }, {
    icon: CpuIcon,
    title: 'Multi-Model Intelligence',
    desc: 'OpenAI for reasoning, Claude for writing, Perplexity for research — Aruna picks the right model automatically.',
    color: 'bg-purple-50 text-purple-600'
  }];
  const aiAgents = [{
    icon: SearchIcon,
    title: 'Research Agent',
    desc: 'Your dedicated analyst for deep dives and market intelligence.',
    color: 'bg-blue-50 text-blue-600 border-blue-100',
    bullets: ['Live web research & synthesis', 'Competitive intelligence', 'Market sizing & trend analysis', 'Academic literature review']
  }, {
    icon: TargetIcon,
    title: 'Strategy Agent',
    desc: 'Your strategic partner for business growth and planning.',
    color: 'bg-amber-50 text-amber-600 border-amber-100',
    bullets: ['Go-to-market strategies', 'Business model frameworks', 'Growth & acquisition plans', 'Pricing strategy development']
  }, {
    icon: FileTextIcon,
    title: 'Document Agent',
    desc: 'Your expert drafter for professional, structured documents.',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    bullets: ['Business plans & proposals', 'Pitch deck outlines', 'Executive summaries', 'Technical documentation']
  }, {
    icon: PenToolIcon,
    title: 'Content Agent',
    desc: 'Your creative engine for marketing and communications.',
    color: 'bg-purple-50 text-purple-600 border-purple-100',
    bullets: ['Blog posts & newsletters', 'Social media campaigns', 'Email marketing sequences', 'Video & podcast scripts']
  }, {
    icon: ListTodoIcon,
    title: 'Planning Agent',
    desc: 'Your project manager for turning goals into actionable steps.',
    color: 'bg-cyan-50 text-cyan-600 border-cyan-100',
    bullets: ['Project roadmaps & timelines', 'OKR & KPI frameworks', 'Event & launch planning', 'Personal habit systems']
  }, {
    icon: ClipboardListIcon,
    title: 'Operations Agent',
    desc: 'Your systems architect for scaling workflows and processes.',
    color: 'bg-orange-50 text-orange-600 border-orange-100',
    bullets: ['Standard Operating Procedures (SOPs)', 'Workflow automation logic', 'Onboarding checklists', 'Process documentation']
  }];
  const futureFeatures = [{
    icon: CalendarIcon,
    title: 'Calendar Sync',
    desc: 'Automated scheduling'
  }, {
    icon: MailIcon,
    title: 'Email Drafts',
    desc: 'Context-aware replies'
  }, {
    icon: MicIcon,
    title: 'Voice Assistant',
    desc: 'Natural conversations'
  }, {
    icon: WatchIcon,
    title: 'Wearable Device',
    desc: 'Ambient intelligence'
  }, {
    icon: EarIcon,
    title: 'Earbuds Integration',
    desc: 'Real-time coaching'
  }];
  return <div className="flex flex-col items-center w-full overflow-hidden" data-id="element-2487">
      {/* Hero */}
      <section className="w-full max-w-5xl mx-auto px-6 pt-32 pb-24 text-center" data-id="element-2488">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} data-id="element-2489">
          <Badge className="mb-8 bg-primary/10 text-primary border-primary/20 px-4 py-1.5" data-id="element-2490">
            Product Overview
          </Badge>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-text-primary mb-8 leading-tight" data-id="element-2491">
            Not a Chatbot.
            <br data-id="element-2492" />
            An Execution Engine.
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed" data-id="element-2493">
            You describe what you need. Aruna figures out how to deliver it —
            choosing the right models, structuring the approach, and producing
            work you can use immediately.
          </p>
        </motion.div>
      </section>

      {/* The Core Flow */}
      <section className="w-full bg-white py-32 border-y border-border/50" data-id="element-2494">
        <div className="max-w-6xl mx-auto px-6" data-id="element-2495">
          <div className="text-center mb-16" data-id="element-2496">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-text-primary" data-id="element-2497">
              How Every Request Becomes a Deliverable
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto" data-id="element-2498">
              Six stages. One seamless experience. Every request follows this
              path — whether it's a pitch deck or a personal plan.
            </p>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={containerVariants} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" data-id="element-2499">
            {flowSteps.map((step, idx) => <motion.div key={idx} variants={itemVariants} className="relative" data-id="element-2500">
                <Card className="p-5 bg-white border-border/50 shadow-sm text-center h-full hover:shadow-md transition-shadow" data-id="element-2501">
                  <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center mx-auto mb-4 border`} data-id="element-2502">
                    <step.icon className="w-6 h-6" data-id="element-2503" />
                  </div>
                  <h3 className="font-heading font-bold text-text-primary mb-1" data-id="element-2504">
                    {step.title}
                  </h3>
                  <p className="text-xs text-text-secondary" data-id="element-2505">{step.desc}</p>
                </Card>
                {idx < flowSteps.length - 1 && <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10" data-id="element-2506">
                    <ArrowRightIcon className="w-4 h-4 text-border" data-id="element-2507" />
                  </div>}
              </motion.div>)}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full py-32 bg-warm-white" data-id="element-2508">
        <div className="max-w-7xl mx-auto px-6" data-id="element-2509">
          <div className="text-center mb-16" data-id="element-2510">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-text-primary" data-id="element-2511">
              Built for Deep Work
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto" data-id="element-2512">
              Everything you need to think clearly, plan strategically, and
              execute effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-id="element-2513">
            {features.map((feature, idx) => <motion.div key={idx} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: idx * 0.1
          }} data-id="element-2514">
                <Card className="p-8 bg-white border-border/50 shadow-sm h-full hover:shadow-md transition-shadow" data-id="element-2515">
                  <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6`} data-id="element-2516">
                    <feature.icon className="w-7 h-7" data-id="element-2517" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-3 text-text-primary" data-id="element-2518">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed" data-id="element-2519">
                    {feature.desc}
                  </p>
                </Card>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section className="w-full py-32 bg-white border-b border-border/50" data-id="element-2520">
        <div className="max-w-7xl mx-auto px-6" data-id="element-2521">
          <div className="text-center mb-16" data-id="element-2522">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1.5" data-id="element-2523">
              Specialized Intelligence
            </Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-text-primary" data-id="element-2524">
              Meet Your AI Agents
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto" data-id="element-2525">
              Aruna isn't just one general model. It's a team of specialized
              agents, each designed to excel at specific types of work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-id="element-2526">
            {aiAgents.map((agent, idx) => <motion.div key={idx} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: idx * 0.1
          }} data-id="element-2527">
                <Card className="p-8 bg-warm-white border-border/50 shadow-sm h-full hover:shadow-md transition-shadow" data-id="element-2528">
                  <div className={`w-14 h-14 rounded-2xl ${agent.color} flex items-center justify-center mb-6 border`} data-id="element-2529">
                    <agent.icon className="w-7 h-7" data-id="element-2530" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-3 text-text-primary" data-id="element-2531">
                    {agent.title}
                  </h3>
                  <p className="text-text-secondary mb-6" data-id="element-2532">{agent.desc}</p>
                  <ul className="space-y-3" data-id="element-2533">
                    {agent.bullets.map((bullet, i) => <li key={i} className="flex items-start gap-3 text-sm text-text-secondary" data-id="element-2534">
                        <CheckCircle2Icon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" data-id="element-2535" />
                        {bullet}
                      </li>)}
                  </ul>
                </Card>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Two Spaces */}
      <section className="w-full py-32 bg-warm-white" data-id="element-2536">
        <div className="max-w-6xl mx-auto px-6" data-id="element-2537">
          <div className="text-center mb-16" data-id="element-2538">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-text-primary" data-id="element-2539">
              Two Dedicated Spaces
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto" data-id="element-2540">
              Context matters. Aruna keeps your personal reflections separate
              from your professional strategies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8" data-id="element-2541">
            <div className="bg-white rounded-3xl p-10 border border-border/50 shadow-sm" data-id="element-2542">
              <div className="flex items-center gap-4 mb-8" data-id="element-2543">
                <div className="w-14 h-14 rounded-2xl bg-rose-light/20 flex items-center justify-center text-primary" data-id="element-2544">
                  <HeartIcon className="w-7 h-7" data-id="element-2545" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-text-primary" data-id="element-2546">
                  Personal Space
                </h3>
              </div>
              <ul className="space-y-4" data-id="element-2547">
                <li className="flex items-start gap-3 text-text-secondary" data-id="element-2548">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" data-id="element-2549"></div>
                  Help me plan my week and balance my energy
                </li>
                <li className="flex items-start gap-3 text-text-secondary" data-id="element-2550">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" data-id="element-2551"></div>
                  Think through a complex decision
                </li>
                <li className="flex items-start gap-3 text-text-secondary" data-id="element-2552">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" data-id="element-2553"></div>
                  Create a realistic fitness routine
                </li>
                <li className="flex items-start gap-3 text-text-secondary" data-id="element-2554">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" data-id="element-2555"></div>
                  Journaling and guided self-reflection
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-3xl p-10 border border-slate-200 shadow-sm" data-id="element-2556">
              <div className="flex items-center gap-4 mb-8" data-id="element-2557">
                <div className="w-14 h-14 rounded-2xl bg-slate-200 flex items-center justify-center text-slate-700" data-id="element-2558">
                  <BriefcaseIcon className="w-7 h-7" data-id="element-2559" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-text-primary" data-id="element-2560">
                  Professional Space
                </h3>
              </div>
              <ul className="space-y-4" data-id="element-2561">
                <li className="flex items-start gap-3 text-text-secondary" data-id="element-2562">
                  <div className="w-2 h-2 rounded-full bg-slate-500 mt-2 flex-shrink-0" data-id="element-2563"></div>
                  Build a comprehensive business plan
                </li>
                <li className="flex items-start gap-3 text-text-secondary" data-id="element-2564">
                  <div className="w-2 h-2 rounded-full bg-slate-500 mt-2 flex-shrink-0" data-id="element-2565"></div>
                  Create a pitch deck for investors
                </li>
                <li className="flex items-start gap-3 text-text-secondary" data-id="element-2566">
                  <div className="w-2 h-2 rounded-full bg-slate-500 mt-2 flex-shrink-0" data-id="element-2567"></div>
                  Conduct market research and analysis
                </li>
                <li className="flex items-start gap-3 text-text-secondary" data-id="element-2568">
                  <div className="w-2 h-2 rounded-full bg-slate-500 mt-2 flex-shrink-0" data-id="element-2569"></div>
                  Draft a Go-To-Market strategy
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Multi-Agent Engine Section */}
      <section className="w-full py-24 bg-warm-white" data-id="element-2570">
        <div className="max-w-6xl mx-auto px-6" data-id="element-2571">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-16" data-id="element-2572">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20" data-id="element-2573">
              Architecture
            </Badge>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4" data-id="element-2574">
              The Multi-Agent Engine
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto" data-id="element-2575">
              One orchestrator. Many specialists. Seamless coordination.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto py-12" data-id="element-2576">
            {/* Connecting Lines (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none" data-id="element-2577">
              <svg className="w-full h-full" style={{
              overflow: 'visible'
            }} data-id="element-2578">
                <path d="M 50% 50% L 20% 20%" stroke="#EAE2DA" strokeWidth="2" fill="none" strokeDasharray="4 4" data-id="element-2579" />
                <path d="M 50% 50% L 80% 20%" stroke="#EAE2DA" strokeWidth="2" fill="none" strokeDasharray="4 4" data-id="element-2580" />
                <path d="M 50% 50% L 15% 50%" stroke="#EAE2DA" strokeWidth="2" fill="none" strokeDasharray="4 4" data-id="element-2581" />
                <path d="M 50% 50% L 85% 50%" stroke="#EAE2DA" strokeWidth="2" fill="none" strokeDasharray="4 4" data-id="element-2582" />
                <path d="M 50% 50% L 50% 85%" stroke="#EAE2DA" strokeWidth="2" fill="none" strokeDasharray="4 4" data-id="element-2583" />
              </svg>
            </div>

            <div className="flex flex-col items-center relative z-10 gap-8 md:gap-0" data-id="element-2584">
              {/* Top Row */}
              <div className="flex flex-col md:flex-row gap-8 md:gap-32 md:absolute md:top-[10%] md:w-full md:justify-center" data-id="element-2585">
                <Card padding="sm" className="w-48 flex flex-col items-center text-center shadow-sm border-blue-100 bg-white" data-id="element-2586">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2" data-id="element-2587">
                    <SearchIcon className="w-5 h-5" data-id="element-2588" />
                  </div>
                  <h4 className="font-bold text-sm text-text-primary" data-id="element-2589">
                    Research Agent
                  </h4>
                </Card>
                <Card padding="sm" className="w-48 flex flex-col items-center text-center shadow-sm border-emerald-100 bg-white" data-id="element-2590">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2" data-id="element-2591">
                    <FileTextIcon className="w-5 h-5" data-id="element-2592" />
                  </div>
                  <h4 className="font-bold text-sm text-text-primary" data-id="element-2593">
                    Document Agent
                  </h4>
                </Card>
              </div>

              {/* Middle Row */}
              <div className="flex flex-col md:flex-row gap-8 md:gap-0 md:w-full md:justify-between items-center md:px-8 md:mt-32" data-id="element-2594">
                <Card padding="sm" className="w-48 flex flex-col items-center text-center shadow-sm border-purple-100 bg-white" data-id="element-2595">
                  <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-2" data-id="element-2596">
                    <PenToolIcon className="w-5 h-5" data-id="element-2597" />
                  </div>
                  <h4 className="font-bold text-sm text-text-primary" data-id="element-2598">
                    Content Agent
                  </h4>
                </Card>

                {/* Orchestrator (Center) */}
                <Card padding="lg" className="w-64 flex flex-col items-center text-center shadow-lg border-primary/20 bg-primary text-white relative z-20 md:mx-auto" data-id="element-2599">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 backdrop-blur-sm" data-id="element-2600">
                    <NetworkIcon className="w-8 h-8 text-white" data-id="element-2601" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-1" data-id="element-2602">
                    Orchestrator
                  </h3>
                  <p className="text-xs text-white/80" data-id="element-2603">
                    Routes tasks & manages context
                  </p>
                </Card>

                <Card padding="sm" className="w-48 flex flex-col items-center text-center shadow-sm border-cyan-100 bg-white" data-id="element-2604">
                  <div className="w-10 h-10 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center mb-2" data-id="element-2605">
                    <ListTodoIcon className="w-5 h-5" data-id="element-2606" />
                  </div>
                  <h4 className="font-bold text-sm text-text-primary" data-id="element-2607">
                    Planning Agent
                  </h4>
                </Card>
              </div>

              {/* Bottom Row */}
              <div className="flex flex-col md:flex-row gap-8 md:absolute md:bottom-[5%] md:w-full md:justify-center md:mt-32" data-id="element-2608">
                <Card padding="sm" className="w-48 flex flex-col items-center text-center shadow-sm border-orange-100 bg-white" data-id="element-2609">
                  <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-2" data-id="element-2610">
                    <ClipboardListIcon className="w-5 h-5" data-id="element-2611" />
                  </div>
                  <h4 className="font-bold text-sm text-text-primary" data-id="element-2612">
                    Operations Agent
                  </h4>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Intelligence Routing Section */}
      <section className="w-full py-24 bg-white" data-id="element-2613">
        <div className="max-w-6xl mx-auto px-6" data-id="element-2614">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-16" data-id="element-2615">
            <Badge className="mb-4 bg-amber-50 text-amber-600 border-amber-200" data-id="element-2616">
              Economics
            </Badge>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4" data-id="element-2617">
              Dynamic Intelligence Routing
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto" data-id="element-2618">
              The right model for every task. Optimized for cost and quality.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 relative" data-id="element-2619">
            {/* Flow Arrow Background */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-12 bg-gradient-to-r from-blue-50 via-purple-50 to-rose-50 -translate-y-1/2 rounded-full opacity-50 z-0" data-id="element-2620"></div>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.1
          }} className="relative z-10" data-id="element-2621">
              <Card padding="lg" className="h-full flex flex-col border-blue-100 hover:shadow-md transition-shadow bg-white" data-id="element-2622">
                <div className="flex items-center justify-between mb-4" data-id="element-2623">
                  <div className="flex items-center gap-2" data-id="element-2624">
                    <span className="text-2xl" data-id="element-2625">⚡</span>
                    <h3 className="text-xl font-heading font-bold text-text-primary" data-id="element-2626">
                      Lite
                    </h3>
                  </div>
                  <Badge variant="default" className="bg-blue-50 text-blue-700 border-none" data-id="element-2627">
                    Free
                  </Badge>
                </div>
                <p className="text-sm font-medium text-text-primary mb-2" data-id="element-2628">
                  Llama 3 / Mistral
                </p>
                <p className="text-sm text-text-secondary leading-relaxed flex-1" data-id="element-2629">
                  Quick formatting, simple queries, summaries, and basic data
                  extraction.
                </p>
              </Card>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.2
          }} className="relative z-10" data-id="element-2630">
              <Card padding="lg" className="h-full flex flex-col border-purple-100 hover:shadow-md transition-shadow bg-white" data-id="element-2631">
                <div className="flex items-center justify-between mb-4" data-id="element-2632">
                  <div className="flex items-center gap-2" data-id="element-2633">
                    <span className="text-2xl" data-id="element-2634">⚖️</span>
                    <h3 className="text-xl font-heading font-bold text-text-primary" data-id="element-2635">
                      Medium
                    </h3>
                  </div>
                  <Badge variant="default" className="bg-purple-50 text-purple-700 border-none" data-id="element-2636">
                    Balanced cost
                  </Badge>
                </div>
                <p className="text-sm font-medium text-text-primary mb-2" data-id="element-2637">
                  Claude Haiku / Mixtral
                </p>
                <p className="text-sm text-text-secondary leading-relaxed flex-1" data-id="element-2638">
                  Drafting, standard research, analysis, and intermediate
                  reasoning tasks.
                </p>
              </Card>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.3
          }} className="relative z-10" data-id="element-2639">
              <Card padding="lg" className="h-full flex flex-col border-rose-100 hover:shadow-md transition-shadow bg-white" data-id="element-2640">
                <div className="flex items-center justify-between mb-4" data-id="element-2641">
                  <div className="flex items-center gap-2" data-id="element-2642">
                    <span className="text-2xl" data-id="element-2643">🧠</span>
                    <h3 className="text-xl font-heading font-bold text-text-primary" data-id="element-2644">
                      Complex
                    </h3>
                  </div>
                  <Badge variant="default" className="bg-rose-50 text-rose-700 border-none" data-id="element-2645">
                    Premium
                  </Badge>
                </div>
                <p className="text-sm font-medium text-text-primary mb-2" data-id="element-2646">
                  GPT-4o / Claude 3.5 Sonnet
                </p>
                <p className="text-sm text-text-secondary leading-relaxed flex-1" data-id="element-2647">
                  Deep reasoning, multi-agent orchestration, complex coding, and
                  strategic planning.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Unbreakable Context Section */}
      <section className="w-full py-24 bg-warm-white" data-id="element-2648">
        <div className="max-w-6xl mx-auto px-6" data-id="element-2649">
          <div className="grid md:grid-cols-2 gap-16 items-center" data-id="element-2650">
            <motion.div initial={{
            opacity: 0,
            x: -20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} data-id="element-2651">
              <Badge className="mb-4 bg-emerald-50 text-emerald-600 border-emerald-200" data-id="element-2652">
                Memory
              </Badge>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-6" data-id="element-2653">
                Unbreakable Context
              </h2>
              <p className="text-lg text-text-secondary mb-8 leading-relaxed" data-id="element-2654">
                Your AI never forgets. No more repeating yourself or starting
                from scratch. Aruna maintains continuity across every
                interaction, preventing hallucinations and saving you hours of
                prompting.
              </p>
              <Button variant="outline" rightIcon={<ArrowRightIcon className="w-4 h-4" data-id="element-2656" />} data-id="element-2655">
                Explore Vault
              </Button>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            x: 20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} className="relative" data-id="element-2657">
              <div className="space-y-4 relative z-10" data-id="element-2658">
                <Card padding="md" className="flex items-start gap-4 border-l-4 border-l-blue-400 bg-white/90 backdrop-blur-sm shadow-md transform translate-x-4" data-id="element-2659">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0" data-id="element-2660">
                    <MessageSquareIcon className="w-5 h-5" data-id="element-2661" />
                  </div>
                  <div data-id="element-2662">
                    <h4 className="font-bold text-text-primary mb-1" data-id="element-2663">
                      1. Session Memory
                    </h4>
                    <p className="text-sm text-text-secondary" data-id="element-2664">
                      Full conversation context within each specific chat
                      thread.
                    </p>
                  </div>
                </Card>

                <Card padding="md" className="flex items-start gap-4 border-l-4 border-l-purple-400 bg-white/95 backdrop-blur-sm shadow-lg relative z-20" data-id="element-2665">
                  <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0" data-id="element-2666">
                    <BrainCircuitIcon className="w-5 h-5" data-id="element-2667" />
                  </div>
                  <div data-id="element-2668">
                    <h4 className="font-bold text-text-primary mb-1" data-id="element-2669">
                      2. Workspace Memory
                    </h4>
                    <p className="text-sm text-text-secondary" data-id="element-2670">
                      Extracted facts, preferences, and guidelines per project.
                    </p>
                  </div>
                </Card>

                <Card padding="md" className="flex items-start gap-4 border-l-4 border-l-emerald-400 bg-white shadow-xl transform -translate-x-4 relative z-30" data-id="element-2671">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0" data-id="element-2672">
                    <ArchiveIcon className="w-5 h-5" data-id="element-2673" />
                  </div>
                  <div data-id="element-2674">
                    <h4 className="font-bold text-text-primary mb-1" data-id="element-2675">
                      3. Vault Storage
                    </h4>
                    <p className="text-sm text-text-secondary" data-id="element-2676">
                      Persistent files, documents, and assets across all
                      workspaces.
                    </p>
                  </div>
                </Card>
              </div>

              {/* Decorative background element */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" data-id="element-2677"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="w-full py-32 bg-primary" data-id="element-2678">
        <div className="max-w-6xl mx-auto px-6 text-center" data-id="element-2679">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 px-4 py-1.5" data-id="element-2680">
            Coming Soon
          </Badge>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white" data-id="element-2681">
            The Ambient Ecosystem
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-16" data-id="element-2682">
            We're building a complete AI ecosystem that lives where you do —
            across devices, platforms, and moments.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4" data-id="element-2683">
            {futureFeatures.map((feature, idx) => <div key={idx} className="bg-white/10 border border-white/10 rounded-2xl p-6 backdrop-blur-sm" data-id="element-2684">
                <feature.icon className="w-8 h-8 text-white/80 mx-auto mb-3" data-id="element-2685" />
                <h4 className="font-heading font-bold text-white mb-1" data-id="element-2686">
                  {feature.title}
                </h4>
                <p className="text-xs text-white/60" data-id="element-2687">{feature.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-32 bg-white text-center px-6" data-id="element-2688">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-text-primary" data-id="element-2689">
          See It in Action
        </h2>
        <p className="text-xl text-text-secondary mb-10 max-w-lg mx-auto" data-id="element-2690">
          Give Aruna a real requirement. Watch it think, plan, and deliver.
        </p>
        <Link to="/signup" data-id="element-2691">
          <Button size="lg" className="rounded-full px-12 py-4 text-lg shadow-lg" data-id="element-2692">
            Get Started Free
          </Button>
        </Link>
      </section>
    </div>;
}