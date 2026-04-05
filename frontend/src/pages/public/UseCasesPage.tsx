import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { RocketIcon, PresentationIcon, SearchIcon, TargetIcon, TrendingUpIcon, UsersIcon, PenToolIcon, CalendarIcon, LightbulbIcon, HeartIcon, MessageCircleIcon, BriefcaseIcon, GraduationCapIcon, PlaneIcon, UtensilsIcon, VideoIcon, FileTextIcon, LineChartIcon, ClipboardListIcon } from 'lucide-react';
export function UseCasesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Business', 'Creators', 'Students', 'Agencies', 'Freelancers', 'Personal Life', 'General'];
  const useCases = [
  // Business
  {
    icon: RocketIcon,
    title: 'Build a Business Plan',
    category: 'Business',
    audience: 'Founders & Entrepreneurs',
    description: 'Create a comprehensive business plan with market analysis, financial projections, and go-to-market strategy.',
    outcome: 'Complete business plan document',
    color: 'bg-amber-50 text-amber-600 border-amber-100'
  }, {
    icon: PresentationIcon,
    title: 'Create Investor Pitch Deck',
    category: 'Business',
    audience: 'Startup Founders',
    description: 'Structure a compelling pitch deck with problem, solution, market size, traction, and ask slides.',
    outcome: 'Pitch deck outline & content',
    color: 'bg-blue-50 text-blue-600 border-blue-100'
  }, {
    icon: SearchIcon,
    title: 'Deep Market Research',
    category: 'Business',
    audience: 'Product Managers',
    description: 'Conduct thorough market research with competitive analysis, trends, and opportunity mapping.',
    outcome: 'Research report with insights',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100'
  }, {
    icon: TargetIcon,
    title: 'Competitor Analysis',
    category: 'Business',
    audience: 'Business Analysts',
    description: 'Analyze competitors across features, pricing, positioning, and market share.',
    outcome: 'Competitive intelligence report',
    color: 'bg-purple-50 text-purple-600 border-purple-100'
  }, {
    icon: TrendingUpIcon,
    title: 'Product Launch Plan',
    category: 'Business',
    audience: 'Marketing Teams',
    description: 'Create a comprehensive launch plan with timeline, channels, messaging, and success metrics.',
    outcome: 'Launch playbook & checklist',
    color: 'bg-rose-50 text-rose-600 border-rose-100'
  }, {
    icon: LineChartIcon,
    title: 'Financial Projections',
    category: 'Business',
    audience: 'Founders & Finance',
    description: 'Structure revenue models, cost assumptions, and cash flow projections for your business.',
    outcome: 'Financial model structure',
    color: 'bg-cyan-50 text-cyan-600 border-cyan-100'
  },
  // Creators
  {
    icon: VideoIcon,
    title: 'YouTube Content Strategy',
    category: 'Creators',
    audience: 'YouTubers',
    description: 'Plan video concepts, script outlines, titles, and thumbnail ideas for your channel.',
    outcome: 'Video production pipeline',
    color: 'bg-red-50 text-red-600 border-red-100'
  }, {
    icon: PenToolIcon,
    title: 'Blog & Newsletter Planning',
    category: 'Creators',
    audience: 'Writers',
    description: 'Develop an editorial calendar with content pillars, article outlines, and distribution strategies.',
    outcome: 'Editorial calendar',
    color: 'bg-orange-50 text-orange-600 border-orange-100'
  }, {
    icon: CalendarIcon,
    title: 'Social Media Calendar',
    category: 'Creators',
    audience: 'Content Creators',
    description: 'Generate a month of social media posts tailored to your brand voice and platform algorithms.',
    outcome: 'Social media schedule',
    color: 'bg-blue-50 text-blue-600 border-blue-100'
  },
  // Students
  {
    icon: GraduationCapIcon,
    title: 'Study Plan & Exam Prep',
    category: 'Students',
    audience: 'Students',
    description: 'Break down syllabuses into manageable daily study schedules with revision techniques.',
    outcome: 'Structured study schedule',
    color: 'bg-indigo-50 text-indigo-600 border-indigo-100'
  }, {
    icon: BriefcaseIcon,
    title: 'Career Planning',
    category: 'Students',
    audience: 'Graduates',
    description: 'Map out career paths, identify skill gaps, and structure your resume and interview preparation.',
    outcome: 'Career action plan',
    color: 'bg-teal-50 text-teal-600 border-teal-100'
  }, {
    icon: FileTextIcon,
    title: 'Research Paper Outline',
    category: 'Students',
    audience: 'Researchers',
    description: 'Structure academic papers with thesis statements, literature reviews, and methodology sections.',
    outcome: 'Academic paper framework',
    color: 'bg-slate-100 text-slate-600 border-slate-200'
  },
  // Agencies
  {
    icon: ClipboardListIcon,
    title: 'Client Deliverable Templates',
    category: 'Agencies',
    audience: 'Agency Owners',
    description: 'Structure standardized client reports, audits, and strategy documents to scale your services.',
    outcome: 'Standardized SOPs',
    color: 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100'
  }, {
    icon: UsersIcon,
    title: 'Campaign Strategy',
    category: 'Agencies',
    audience: 'Marketing Agencies',
    description: 'Develop full-funnel marketing campaigns for clients across multiple channels.',
    outcome: 'Campaign strategy doc',
    color: 'bg-sky-50 text-sky-600 border-sky-100'
  },
  // Freelancers
  {
    icon: FileTextIcon,
    title: 'Proposal & Pricing',
    category: 'Freelancers',
    audience: 'Freelancers',
    description: 'Draft compelling client proposals with clear scopes of work, timelines, and tiered pricing.',
    outcome: 'Client proposal document',
    color: 'bg-lime-50 text-lime-600 border-lime-100'
  },
  // Personal Life
  {
    icon: HeartIcon,
    title: 'Life Organization & Goals',
    category: 'Personal Life',
    audience: 'Individuals',
    description: 'Create structured personal goals, daily routines, and habit tracking systems.',
    outcome: 'Personal planning system',
    color: 'bg-rose-50 text-rose-600 border-rose-100'
  }, {
    icon: PlaneIcon,
    title: 'Travel Planning',
    category: 'Personal Life',
    audience: 'Travelers',
    description: 'Build detailed day-by-day itineraries, packing lists, and budget estimations for your trips.',
    outcome: 'Complete travel itinerary',
    color: 'bg-cyan-50 text-cyan-600 border-cyan-100'
  }, {
    icon: UtensilsIcon,
    title: 'Cooking & Recipe Planning',
    category: 'Personal Life',
    audience: 'Home Cooks',
    description: 'Plan weekly meals based on dietary preferences, generate grocery lists, and organize recipes.',
    outcome: 'Meal plan & grocery list',
    color: 'bg-amber-50 text-amber-600 border-amber-100'
  },
  // General
  {
    icon: LightbulbIcon,
    title: 'Brainstorm Ideas',
    category: 'General',
    audience: 'Everyone',
    description: 'Generate and validate ideas with structured frameworks and feasibility assessments.',
    outcome: 'Idea evaluation framework',
    color: 'bg-yellow-50 text-yellow-600 border-yellow-100'
  }, {
    icon: MessageCircleIcon,
    title: 'Casual Conversations',
    category: 'General',
    audience: 'Everyone',
    description: 'Have thoughtful conversations, get quick answers, and think through everyday decisions.',
    outcome: 'Clarity & insights',
    color: 'bg-gray-50 text-gray-600 border-gray-200'
  }];
  const filteredUseCases = activeCategory === 'All' ? useCases : useCases.filter(uc => uc.category === activeCategory);
  return <div className="flex flex-col items-center w-full overflow-hidden" data-id="element-2717">
      {/* Hero */}
      <section className="w-full max-w-5xl mx-auto px-6 pt-32 pb-16 text-center" data-id="element-2718">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} data-id="element-2719">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1.5" data-id="element-2720">
            Use Cases
          </Badge>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-text-primary mb-6 leading-tight" data-id="element-2721">
            Real Work. Real Outcomes.
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto" data-id="element-2722">
            These aren't hypothetical prompts. Each use case shows what Aruna
            actually delivers — structured, usable work for founders, operators,
            creators, and professionals.
          </p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="w-full max-w-7xl mx-auto px-6 pb-12" data-id="element-2723">
        <div className="flex flex-wrap justify-center gap-2 md:gap-3" data-id="element-2724">
          {categories.map(category => <button key={category} onClick={() => setActiveCategory(category)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category ? 'bg-primary text-white shadow-md' : 'bg-white text-text-secondary border border-border hover:bg-cream hover:text-text-primary'}`} data-id="element-2725">
              {category}
            </button>)}
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="w-full max-w-7xl mx-auto px-6 pb-32 min-h-[500px]" data-id="element-2726">
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-id="element-2727">
          <AnimatePresence mode="popLayout" data-id="element-2728">
            {filteredUseCases.map((useCase, idx) => <motion.div key={useCase.title} layout initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} exit={{
            opacity: 0,
            scale: 0.9
          }} transition={{
            duration: 0.3
          }} data-id="element-2729">
                <Card className="p-6 bg-white border-border/50 h-full flex flex-col hover:shadow-lg transition-shadow" data-id="element-2730">
                  <div className={`w-12 h-12 rounded-xl ${useCase.color} flex items-center justify-center mb-5 border`} data-id="element-2731">
                    <useCase.icon className="w-6 h-6" data-id="element-2732" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-text-primary mb-2" data-id="element-2733">
                    {useCase.title}
                  </h3>
                  <Badge variant="default" className="w-fit mb-3 text-xs" data-id="element-2734">
                    {useCase.audience}
                  </Badge>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1" data-id="element-2735">
                    {useCase.description}
                  </p>
                  <div className="pt-4 border-t border-border/50" data-id="element-2736">
                    <p className="text-xs text-text-muted" data-id="element-2737">
                      <span className="font-semibold text-text-secondary" data-id="element-2738">
                        Outcome:
                      </span>{' '}
                      {useCase.outcome}
                    </p>
                  </div>
                </Card>
              </motion.div>)}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="w-full py-24 bg-warm-white text-center px-6 border-t border-border/50" data-id="element-2739">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-text-primary" data-id="element-2740">
          Your Use Case Is Waiting
        </h2>
        <p className="text-text-secondary mb-8 max-w-lg mx-auto" data-id="element-2741">
          Describe what you need. Aruna handles the thinking, planning, and
          execution.
        </p>
        <Link to="/signup" data-id="element-2742">
          <Button size="lg" className="rounded-full px-10" data-id="element-2743">
            Get Started Free
          </Button>
        </Link>
      </section>
    </div>;
}