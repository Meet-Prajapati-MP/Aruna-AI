import React, { Children, Fragment, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { BrainCircuitIcon, ListTodoIcon, CheckCircle2Icon, CpuIcon, SparklesIcon, ServerIcon, SearchIcon, ZapIcon, FileTextIcon, ArchiveIcon, DatabaseIcon, PresentationIcon, TargetIcon, TrendingUpIcon, BarChart3Icon, BookOpenIcon, PenToolIcon, CalculatorIcon, ClipboardListIcon, MessageCircleIcon, ChevronRightIcon, LightbulbIcon, RocketIcon, FolderIcon, ShieldCheckIcon, PuzzleIcon } from 'lucide-react';
export function HomePage() {
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
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  const deliverables = [{
    icon: FileTextIcon,
    title: 'Business Plans',
    desc: 'Comprehensive strategy docs'
  }, {
    icon: PresentationIcon,
    title: 'Pitch Decks',
    desc: 'Investor-ready outlines'
  }, {
    icon: RocketIcon,
    title: 'GTM Strategies',
    desc: 'Go-to-market playbooks'
  }, {
    icon: TargetIcon,
    title: 'Product Strategy',
    desc: 'Roadmaps & PRDs'
  }, {
    icon: SearchIcon,
    title: 'Competitor Research',
    desc: 'Market intelligence'
  }, {
    icon: BookOpenIcon,
    title: 'Research Reports',
    desc: 'Deep dive analysis'
  }, {
    icon: TrendingUpIcon,
    title: 'Investor Docs',
    desc: 'Updates, memos & data rooms'
  }, {
    icon: BarChart3Icon,
    title: 'Marketing Plans',
    desc: 'Campaign strategies'
  }, {
    icon: PenToolIcon,
    title: 'Content Systems',
    desc: 'Editorial calendars'
  }, {
    icon: CalculatorIcon,
    title: 'Financial Planning',
    desc: 'Budgets & projections'
  }, {
    icon: ClipboardListIcon,
    title: 'Structured Notes',
    desc: 'Organized thinking'
  }, {
    icon: MessageCircleIcon,
    title: 'Everyday Thinking',
    desc: 'Quick answers & decisions'
  }];
  const userSegments = ['Startup Founders', 'Small Businesses', 'Agencies', 'Freelancers', 'Consultants', 'Students', 'Operators', 'Marketers', 'Researchers', 'Teams'];
  const aiAgents = [{
    icon: SearchIcon,
    title: 'Research Agent',
    desc: 'Deep web research, competitive intelligence, and market analysis.',
    color: 'bg-blue-50 text-blue-600 border-blue-100'
  }, {
    icon: TargetIcon,
    title: 'Strategy Agent',
    desc: 'Business strategy, GTM plans, and growth frameworks.',
    color: 'bg-amber-50 text-amber-600 border-amber-100'
  }, {
    icon: FileTextIcon,
    title: 'Document Agent',
    desc: 'Business plans, pitch decks, reports, and proposals.',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100'
  }, {
    icon: PenToolIcon,
    title: 'Content Agent',
    desc: 'Blog posts, social media, email campaigns, and scripts.',
    color: 'bg-purple-50 text-purple-600 border-purple-100'
  }, {
    icon: ListTodoIcon,
    title: 'Planning Agent',
    desc: 'Project plans, roadmaps, OKRs, and timelines.',
    color: 'bg-cyan-50 text-cyan-600 border-cyan-100'
  }, {
    icon: ClipboardListIcon,
    title: 'Operations Agent',
    desc: 'SOPs, workflows, process documentation, and checklists.',
    color: 'bg-orange-50 text-orange-600 border-orange-100'
  }];
  return <div className="flex flex-col items-center w-full overflow-hidden" data-id="element-2128">
      {/* Hero Section */}
      <section className="w-full bg-primary pt-32 pb-40 text-center relative overflow-hidden" data-id="element-2129">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" data-id="element-2130">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-white/5 blur-[120px]" data-id="element-2131"></div>
          <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-rose-light/10 blur-[100px]" data-id="element-2132"></div>
        </div>

        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-4xl mx-auto flex flex-col items-center px-6 relative z-10" data-id="element-2133">
          <motion.div variants={itemVariants} data-id="element-2134">
            <Badge className="mb-8 bg-white/10 text-white border-white/20 px-4 py-1.5 backdrop-blur-sm" data-id="element-2135">
              India's AI Agent Platform
            </Badge>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-heading font-bold text-white mb-4 leading-[1.1]" data-id="element-2136">
            The one place your team uses to get work done with AI, not just
            chat.
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg text-white/70 mb-10 max-w-2xl leading-relaxed mt-6" data-id="element-2137">
            Turn messy files, notes, and research into finished proposals,
            decks, and reports. Let AI plan, act, and deliver while you stay in
            control.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12" data-id="element-2138">
            <Link to="/signup" data-id="element-2139">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto rounded-full px-10 !bg-white !text-primary hover:!bg-cream shadow-lg font-semibold" data-id="element-2140">
                Start Your Workspace
              </Button>
            </Link>
            <Link to="/contact" data-id="element-2141">
              <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-10 !border-white/30 !text-white hover:!bg-white/10 font-semibold" data-id="element-2142">
                Book a Demo
              </Button>
            </Link>
          </motion.div>

          {/* Process Flow */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center items-center gap-2 md:gap-3" data-id="element-2143">
            {['Requirement', 'Thinking', 'Planning', 'Execution', 'Deliverable'].map((step, idx) => <Fragment key={step} data-id="element-2144">
                <span className="bg-white/10 text-white/80 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border border-white/10" data-id="element-2145">
                  {step}
                </span>
                {idx < 4 && <ChevronRightIcon className="w-4 h-4 text-white/40 hidden sm:block" data-id="element-2146" />}
              </Fragment>)}
          </motion.div>
        </motion.div>
      </section>

      {/* Hero Visual Preview */}
      <section className="w-full max-w-6xl mx-auto px-6 -mt-20 relative z-20 mb-24" data-id="element-2147">
        <motion.div initial={{
        opacity: 0,
        y: 40
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.4,
        duration: 0.8
      }} className="bg-white rounded-3xl border border-border/60 shadow-2xl overflow-hidden flex flex-col md:flex-row h-[500px]" data-id="element-2148">
          <div className="w-64 bg-warm-white border-r border-border/50 hidden md:flex flex-col p-6" data-id="element-2149">
            <div className="h-8 w-32 bg-border/40 rounded-lg mb-10" data-id="element-2150"></div>
            <div className="space-y-3" data-id="element-2151">
              <div className="h-11 bg-white rounded-xl border border-border/50 shadow-sm flex items-center px-4 gap-3" data-id="element-2152">
                <div className="w-4 h-4 rounded-full bg-rose-light/50" data-id="element-2153"></div>
                <div className="h-3 w-20 bg-border/40 rounded" data-id="element-2154"></div>
              </div>
              <div className="h-11 rounded-xl flex items-center px-4 gap-3" data-id="element-2155">
                <div className="w-4 h-4 rounded-full bg-border/50" data-id="element-2156"></div>
                <div className="h-3 w-24 bg-border/30 rounded" data-id="element-2157"></div>
              </div>
              <div className="h-11 rounded-xl flex items-center px-4 gap-3" data-id="element-2158">
                <div className="w-4 h-4 rounded-full bg-border/50" data-id="element-2159"></div>
                <div className="h-3 w-28 bg-border/30 rounded" data-id="element-2160"></div>
              </div>
            </div>
          </div>
          <div className="flex-1 p-6 md:p-10 flex flex-col bg-[#FAFAFA]" data-id="element-2161">
            <div className="flex gap-2 mb-6" data-id="element-2162">
              <Badge variant="professional" className="px-3 py-1" data-id="element-2163">
                Professional Space
              </Badge>
            </div>
            <div className="flex justify-end mb-6" data-id="element-2164">
              <div className="bg-primary text-white px-5 py-3.5 rounded-2xl rounded-tr-sm max-w-[85%] text-sm shadow-sm leading-relaxed" data-id="element-2165">
                Create a GTM strategy for our fintech product targeting Indian
                SMEs with invoice financing needs.
              </div>
            </div>
            <div className="flex justify-start flex-1" data-id="element-2166">
              <div className="bg-white border border-border/50 shadow-lg rounded-2xl rounded-tl-sm max-w-[95%] w-full overflow-hidden flex flex-col" data-id="element-2167">
                <div className="flex border-b border-border/50 bg-warm-white/50 px-2 pt-2" data-id="element-2168">
                  <div className="px-5 py-3 text-xs font-semibold text-text-muted border-b-2 border-transparent" data-id="element-2169">
                    Thinking
                  </div>
                  <div className="px-5 py-3 text-xs font-semibold text-primary border-b-2 border-primary bg-white rounded-t-lg" data-id="element-2170">
                    Planning
                  </div>
                  <div className="px-5 py-3 text-xs font-semibold text-text-muted border-b-2 border-transparent" data-id="element-2171">
                    Executing
                  </div>
                </div>
                <div className="p-6 space-y-4 flex-1" data-id="element-2172">
                  <div className="flex items-center gap-3" data-id="element-2173">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center" data-id="element-2174">
                      <CheckCircle2Icon className="w-3 h-3 text-blue-600" data-id="element-2175" />
                    </div>
                    <div className="h-3.5 w-48 bg-border/50 rounded" data-id="element-2176"></div>
                  </div>
                  <div className="flex items-center gap-3" data-id="element-2177">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center" data-id="element-2178">
                      <CheckCircle2Icon className="w-3 h-3 text-blue-600" data-id="element-2179" />
                    </div>
                    <div className="h-3.5 w-64 bg-border/50 rounded" data-id="element-2180"></div>
                  </div>
                  <div className="flex items-center gap-3" data-id="element-2181">
                    <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200" data-id="element-2182"></div>
                    <div className="h-3.5 w-56 bg-border/40 rounded" data-id="element-2183"></div>
                  </div>
                  <div className="flex items-center gap-3" data-id="element-2184">
                    <div className="w-5 h-5 rounded-full bg-gray-50 border border-border" data-id="element-2185"></div>
                    <div className="h-3.5 w-40 bg-border/30 rounded" data-id="element-2186"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* How it Works Section */}
      <section className="w-full py-24 bg-warm-white" data-id="element-2187">
        <div className="max-w-6xl mx-auto px-6" data-id="element-2188">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-16" data-id="element-2189">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4" data-id="element-2190">
              How Aruna Works
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto" data-id="element-2191">
              From messy context to polished outcomes in three simple steps.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative" data-id="element-2192">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-border/50 z-0" data-id="element-2193"></div>

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
          }} className="relative z-10 flex flex-col items-center text-center" data-id="element-2194">
              <div className="w-24 h-24 rounded-full bg-blue-50 border-4 border-white shadow-sm flex items-center justify-center mb-6 relative" data-id="element-2195">
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm border-2 border-white" data-id="element-2196">
                  1
                </div>
                <FolderIcon className="w-10 h-10 text-blue-600" data-id="element-2197" />
              </div>
              <h3 className="text-xl font-heading font-bold text-text-primary mb-3" data-id="element-2198">
                Create a Workspace
              </h3>
              <p className="text-text-secondary leading-relaxed" data-id="element-2199">
                Drop your files, notes, and context into a dedicated workspace.
              </p>
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
          }} className="relative z-10 flex flex-col items-center text-center" data-id="element-2200">
              <div className="w-24 h-24 rounded-full bg-amber-50 border-4 border-white shadow-sm flex items-center justify-center mb-6 relative" data-id="element-2201">
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-sm border-2 border-white" data-id="element-2202">
                  2
                </div>
                <RocketIcon className="w-10 h-10 text-amber-600" data-id="element-2203" />
              </div>
              <h3 className="text-xl font-heading font-bold text-text-primary mb-3" data-id="element-2204">
                Launch a Mission
              </h3>
              <p className="text-text-secondary leading-relaxed" data-id="element-2205">
                Select Lite, Medium, or Complex AI models based on your task.
              </p>
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
          }} className="relative z-10 flex flex-col items-center text-center" data-id="element-2206">
              <div className="w-24 h-24 rounded-full bg-emerald-50 border-4 border-white shadow-sm flex items-center justify-center mb-6 relative" data-id="element-2207">
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm border-2 border-white" data-id="element-2208">
                  3
                </div>
                <ShieldCheckIcon className="w-10 h-10 text-emerald-600" data-id="element-2209" />
              </div>
              <h3 className="text-xl font-heading font-bold text-text-primary mb-3" data-id="element-2210">
                Review & Approve
              </h3>
              <p className="text-text-secondary leading-relaxed" data-id="element-2211">
                Stay in control with human-in-the-loop delivery.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Model Orchestration Strip */}
      <section className="w-full py-16 bg-white border-y border-border/50" data-id="element-2212">
        <div className="max-w-7xl mx-auto px-6 text-center" data-id="element-2213">
          <p className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-10" data-id="element-2214">
            One platform. Multiple intelligence models. Best outcome.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-60" data-id="element-2215">
            <div className="flex items-center gap-2 text-text-primary" data-id="element-2216">
              <CpuIcon className="w-5 h-5" data-id="element-2217" />
              <span className="font-heading font-bold" data-id="element-2218">OpenAI</span>
            </div>
            <div className="flex items-center gap-2 text-text-primary" data-id="element-2219">
              <BrainCircuitIcon className="w-5 h-5" data-id="element-2220" />
              <span className="font-heading font-bold" data-id="element-2221">Anthropic</span>
            </div>
            <div className="flex items-center gap-2 text-text-primary" data-id="element-2222">
              <SparklesIcon className="w-5 h-5" data-id="element-2223" />
              <span className="font-heading font-bold" data-id="element-2224">Google Gemini</span>
            </div>
            <div className="flex items-center gap-2 text-text-primary" data-id="element-2225">
              <SearchIcon className="w-5 h-5" data-id="element-2226" />
              <span className="font-heading font-bold" data-id="element-2227">Perplexity</span>
            </div>
            <div className="flex items-center gap-2 text-text-primary" data-id="element-2228">
              <ServerIcon className="w-5 h-5" data-id="element-2229" />
              <span className="font-heading font-bold" data-id="element-2230">Qwen</span>
            </div>
            <div className="flex items-center gap-2 text-text-primary" data-id="element-2231">
              <ZapIcon className="w-5 h-5" data-id="element-2232" />
              <span className="font-heading font-bold" data-id="element-2233">Meta Llama</span>
            </div>
            <div className="flex items-center gap-2 text-text-primary" data-id="element-2234">
              <LightbulbIcon className="w-5 h-5" data-id="element-2235" />
              <span className="font-heading font-bold" data-id="element-2236">Mistral</span>
            </div>
            <div className="flex items-center gap-2 text-text-primary" data-id="element-2237">
              <SparklesIcon className="w-5 h-5" data-id="element-2238" />
              <span className="font-heading font-bold" data-id="element-2239">Sarvam AI</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Aruna Exists */}
      <section className="w-full bg-warm-white py-32" data-id="element-2240">
        <div className="max-w-7xl mx-auto px-6" data-id="element-2241">
          <div className="grid md:grid-cols-2 gap-16 items-center" data-id="element-2242">
            <div data-id="element-2243">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-text-primary" data-id="element-2244">
                The Gap Between Chat and Real Work
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed mb-6" data-id="element-2245">
                AI models are powerful, but using them well is still hard. You
                frame the question, pick the right model, reshape the output,
                and manually turn it into something your team or investors can
                use. That's not AI doing the work — that's you doing the work
                with AI assistance.
              </p>
              <p className="text-lg text-text-primary font-medium leading-relaxed" data-id="element-2246">
                Aruna eliminates that gap. One requirement in, structured
                deliverable out — orchestrated across the best models
                automatically.
              </p>
            </div>
            <div className="space-y-4" data-id="element-2247">
              <Card className="p-5 bg-white border-border/50 shadow-sm" data-id="element-2248">
                <div className="flex items-start gap-4" data-id="element-2249">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0" data-id="element-2250">
                    <LightbulbIcon className="w-5 h-5" data-id="element-2251" />
                  </div>
                  <div data-id="element-2252">
                    <h4 className="font-heading font-bold text-text-primary mb-1" data-id="element-2253">
                      You shouldn't need to be a prompt engineer
                    </h4>
                    <p className="text-sm text-text-secondary" data-id="element-2254">
                      Aruna understands intent, not just instructions
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-5 bg-white border-border/50 shadow-sm" data-id="element-2255">
                <div className="flex items-start gap-4" data-id="element-2256">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0" data-id="element-2257">
                    <BrainCircuitIcon className="w-5 h-5" data-id="element-2258" />
                  </div>
                  <div data-id="element-2259">
                    <h4 className="font-heading font-bold text-text-primary mb-1" data-id="element-2260">
                      No single model is best at everything
                    </h4>
                    <p className="text-sm text-text-secondary" data-id="element-2261">
                      Aruna routes each task to the right model automatically
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-5 bg-white border-border/50 shadow-sm" data-id="element-2262">
                <div className="flex items-start gap-4" data-id="element-2263">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0" data-id="element-2264">
                    <CheckCircle2Icon className="w-5 h-5" data-id="element-2265" />
                  </div>
                  <div data-id="element-2266">
                    <h4 className="font-heading font-bold text-text-primary mb-1" data-id="element-2267">
                      Chat responses aren't deliverables
                    </h4>
                    <p className="text-sm text-text-secondary" data-id="element-2268">
                      Aruna produces structured work you can send, share, or
                      ship
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Three-Step Intelligence */}
      <section className="w-full py-32 bg-white" data-id="element-2269">
        <div className="max-w-7xl mx-auto px-6" data-id="element-2270">
          <div className="text-center mb-16" data-id="element-2271">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-text-primary" data-id="element-2272">
              One Requirement. Structured Outcome.
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto" data-id="element-2273">
              Every request passes through three intelligence stages — thinking,
              planning, and execution — so you get considered work, not instant
              guesses.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8" data-id="element-2274">
            <Card className="p-8 bg-white border-border/50 shadow-md hover:shadow-lg transition-all" data-id="element-2275">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 mb-6 border border-amber-100" data-id="element-2276">
                <BrainCircuitIcon className="w-8 h-8" data-id="element-2277" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-text-primary" data-id="element-2278">
                Thinking
              </h3>
              <p className="text-text-secondary leading-relaxed" data-id="element-2279">
                Analyzes your requirement, identifies what you actually need,
                weighs complexity, and clarifies direction — before writing a
                single word.
              </p>
            </Card>

            <Card className="p-8 bg-white border-border/50 shadow-md hover:shadow-lg transition-all" data-id="element-2280">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6 border border-blue-100" data-id="element-2281">
                <ListTodoIcon className="w-8 h-8" data-id="element-2282" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-text-primary" data-id="element-2283">
                Planning
              </h3>
              <p className="text-text-secondary leading-relaxed" data-id="element-2284">
                Designs the structure, sequence, and framework for your
                deliverable. Decides what to include, how to organize it, and
                which models to use.
              </p>
            </Card>

            <Card className="p-8 bg-white border-border/50 shadow-md hover:shadow-lg transition-all" data-id="element-2285">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6 border border-emerald-100" data-id="element-2286">
                <CheckCircle2Icon className="w-8 h-8" data-id="element-2287" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-text-primary" data-id="element-2288">
                Executing
              </h3>
              <p className="text-text-secondary leading-relaxed" data-id="element-2289">
                Generates the final output — documents, strategies, research
                reports, action plans — polished and ready to use. Not a draft.
                Real work.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="w-full py-24 bg-warm-white" data-id="element-2290">
        <div className="max-w-6xl mx-auto px-6" data-id="element-2291">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-16" data-id="element-2292">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4" data-id="element-2293">
              Built for Professional Execution
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto" data-id="element-2294">
              The infrastructure you need to scale your output securely.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8" data-id="element-2295">
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
          }} data-id="element-2296">
              <Card padding="lg" className="h-full flex flex-col items-center text-center hover:shadow-md transition-shadow" data-id="element-2297">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary" data-id="element-2298">
                  <PuzzleIcon className="w-8 h-8" data-id="element-2299" />
                </div>
                <h3 className="text-xl font-heading font-bold text-text-primary mb-3" data-id="element-2300">
                  Composio Tool Integration
                </h3>
                <p className="text-text-secondary leading-relaxed" data-id="element-2301">
                  1000+ apps connected. Let agents act on Slack, Gmail, GitHub,
                  and more.
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
          }} data-id="element-2302">
              <Card padding="lg" className="h-full flex flex-col items-center text-center hover:shadow-md transition-shadow" data-id="element-2303">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mb-6 text-amber-600" data-id="element-2304">
                  <ZapIcon className="w-8 h-8" data-id="element-2305" />
                </div>
                <h3 className="text-xl font-heading font-bold text-text-primary mb-3" data-id="element-2306">
                  Dynamic Intelligence Routing
                </h3>
                <p className="text-text-secondary leading-relaxed" data-id="element-2307">
                  Simple tasks use free models. Complex tasks use premium ones.
                  You save money automatically.
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
          }} data-id="element-2308">
              <Card padding="lg" className="h-full flex flex-col items-center text-center hover:shadow-md transition-shadow" data-id="element-2309">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 text-emerald-600" data-id="element-2310">
                  <DatabaseIcon className="w-8 h-8" data-id="element-2311" />
                </div>
                <h3 className="text-xl font-heading font-bold text-text-primary mb-3" data-id="element-2312">
                  Tri-Tier Memory
                </h3>
                <p className="text-text-secondary leading-relaxed" data-id="element-2313">
                  Workspace memory, vault storage, and session context. Your AI
                  never forgets.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Aruna Can Deliver */}
      <section className="w-full py-32 bg-warm-white" data-id="element-2314">
        <div className="max-w-7xl mx-auto px-6" data-id="element-2315">
          <div className="text-center mb-16" data-id="element-2316">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-text-primary" data-id="element-2317">
              From Requirement to Deliverable
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto" data-id="element-2318">
              Aruna doesn't produce chat transcripts. It creates structured,
              polished work — ready for your team, your investors, or your next
              move.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" data-id="element-2319">
            {deliverables.map((item, idx) => <div key={idx} className="bg-white rounded-2xl p-5 border border-border/50 shadow-sm hover:shadow-md transition-shadow" data-id="element-2320">
                <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center text-primary mb-3" data-id="element-2321">
                  <item.icon className="w-5 h-5" data-id="element-2322" />
                </div>
                <h4 className="font-heading font-bold text-text-primary mb-1" data-id="element-2323">
                  {item.title}
                </h4>
                <p className="text-xs text-text-secondary" data-id="element-2324">{item.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Built for Real Users */}
      <section className="w-full py-32 bg-white" data-id="element-2325">
        <div className="max-w-7xl mx-auto px-6 text-center" data-id="element-2326">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-text-primary" data-id="element-2327">
            Built for People Who Ship
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-12" data-id="element-2328">
            Solo founders, agency teams, consultants, researchers — anyone whose
            work requires deep thinking and structured execution.
          </p>

          <div className="flex flex-wrap justify-center gap-3" data-id="element-2329">
            {userSegments.map((segment, idx) => <span key={idx} className="bg-cream px-5 py-2.5 rounded-full text-sm font-medium text-text-secondary border border-border/50 hover:bg-beige transition-colors" data-id="element-2330">
                {segment}
              </span>)}
          </div>
        </div>
      </section>

      {/* Multi-Model Orchestration */}
      <section className="w-full py-24 bg-primary" data-id="element-2331">
        <div className="max-w-7xl mx-auto px-6" data-id="element-2332">
          <div className="grid md:grid-cols-2 gap-16 items-center" data-id="element-2333">
            <div data-id="element-2334">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white" data-id="element-2335">
                Many Models. One Experience.
              </h2>
              <p className="text-lg text-white/80 leading-relaxed" data-id="element-2336">
                No single AI is best at everything. Aruna intelligently routes
                each part of your request — deep reasoning to one model,
                long-form writing to another, live research to a third. You see
                one seamless output. The orchestration happens behind the
                scenes.
              </p>
            </div>
            <div className="space-y-4" data-id="element-2337">
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-sm" data-id="element-2338">
                <div className="flex items-center gap-3" data-id="element-2339">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center" data-id="element-2340">
                    <BrainCircuitIcon className="w-5 h-5 text-white" data-id="element-2341" />
                  </div>
                  <div data-id="element-2342">
                    <p className="text-white font-medium" data-id="element-2343">Deep Reasoning</p>
                    <p className="text-white/60 text-sm" data-id="element-2344">OpenAI o1</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-sm" data-id="element-2345">
                <div className="flex items-center gap-3" data-id="element-2346">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center" data-id="element-2347">
                    <PenToolIcon className="w-5 h-5 text-white" data-id="element-2348" />
                  </div>
                  <div data-id="element-2349">
                    <p className="text-white font-medium" data-id="element-2350">Long-form Writing</p>
                    <p className="text-white/60 text-sm" data-id="element-2351">Anthropic Claude</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-sm" data-id="element-2352">
                <div className="flex items-center gap-3" data-id="element-2353">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center" data-id="element-2354">
                    <SearchIcon className="w-5 h-5 text-white" data-id="element-2355" />
                  </div>
                  <div data-id="element-2356">
                    <p className="text-white font-medium" data-id="element-2357">Web Research</p>
                    <p className="text-white/60 text-sm" data-id="element-2358">Perplexity</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-sm" data-id="element-2359">
                <div className="flex items-center gap-3" data-id="element-2360">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center" data-id="element-2361">
                    <SparklesIcon className="w-5 h-5 text-white" data-id="element-2362" />
                  </div>
                  <div data-id="element-2363">
                    <p className="text-white font-medium" data-id="element-2364">Indian Context</p>
                    <p className="text-white/60 text-sm" data-id="element-2365">Sarvam AI</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Files, Vault & Memory */}
      <section className="w-full py-32 bg-warm-white" data-id="element-2366">
        <div className="max-w-7xl mx-auto px-6" data-id="element-2367">
          <div className="text-center mb-16" data-id="element-2368">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-text-primary" data-id="element-2369">
              Your Context. Aruna's Memory.
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto" data-id="element-2370">
              Upload your existing work, save what Aruna creates, and build a
              persistent context layer. The more it knows, the sharper every
              output becomes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8" data-id="element-2371">
            <Card className="p-8 bg-white border-border/50 shadow-sm text-center" data-id="element-2372">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 mx-auto" data-id="element-2373">
                <FileTextIcon className="w-7 h-7" data-id="element-2374" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3 text-text-primary" data-id="element-2375">
                Files
              </h3>
              <p className="text-text-secondary" data-id="element-2376">
                Upload documents, research, and references for richer context in
                every conversation.
              </p>
            </Card>

            <Card className="p-8 bg-white border-border/50 shadow-sm text-center" data-id="element-2377">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 mx-auto" data-id="element-2378">
                <ArchiveIcon className="w-7 h-7" data-id="element-2379" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3 text-text-primary" data-id="element-2380">
                Vault
              </h3>
              <p className="text-text-secondary" data-id="element-2381">
                Save and organize generated work, notes, and important outputs
                for easy access.
              </p>
            </Card>

            <Card className="p-8 bg-white border-border/50 shadow-sm text-center" data-id="element-2382">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 mx-auto" data-id="element-2383">
                <DatabaseIcon className="w-7 h-7" data-id="element-2384" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3 text-text-primary" data-id="element-2385">
                Memory
              </h3>
              <p className="text-text-secondary" data-id="element-2386">
                Aruna remembers relevant context across conversations to deliver
                better results.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section className="w-full py-24 bg-white" data-id="element-2387">
        <div className="max-w-7xl mx-auto px-6" data-id="element-2388">
          <div className="text-center mb-16" data-id="element-2389">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1.5" data-id="element-2390">
              Specialized Intelligence
            </Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-text-primary" data-id="element-2391">
              Meet Your AI Agents
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto" data-id="element-2392">
              Aruna isn't just one general model. It's a team of specialized
              agents, each designed to excel at specific types of work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-id="element-2393">
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
          }} data-id="element-2394">
                <Card className="p-6 bg-warm-white border-border/50 shadow-sm h-full hover:shadow-md transition-shadow" data-id="element-2395">
                  <div className={`w-12 h-12 rounded-xl ${agent.color} flex items-center justify-center mb-5 border`} data-id="element-2396">
                    <agent.icon className="w-6 h-6" data-id="element-2397" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-2 text-text-primary" data-id="element-2398">
                    {agent.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed" data-id="element-2399">
                    {agent.desc}
                  </p>
                </Card>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-32 bg-warm-white text-center px-6 border-t border-border/50" data-id="element-2400">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-text-primary" data-id="element-2401">
          Your Next Deliverable Is One Prompt Away
        </h2>
        <p className="text-xl text-text-secondary mb-10 max-w-xl mx-auto" data-id="element-2402">
          Describe what you need. Aruna handles the thinking, planning, and
          execution.
        </p>
        <Link to="/signup" data-id="element-2403">
          <Button size="lg" className="rounded-full px-12 py-4 text-lg shadow-lg hover:shadow-xl transition-all" data-id="element-2404">
            Create Free Account
          </Button>
        </Link>
        <p className="text-sm text-text-muted mt-6" data-id="element-2405">
          Built in India. Powered by the world's best models.
        </p>
      </section>
    </div>;
}