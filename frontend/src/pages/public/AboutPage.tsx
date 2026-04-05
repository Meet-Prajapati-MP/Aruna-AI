import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { RocketIcon, UsersIcon, BriefcaseIcon, GlobeIcon, SparklesIcon, TargetIcon, HeartIcon, GraduationCapIcon, VideoIcon, ShieldCheckIcon, TrendingUpIcon } from 'lucide-react';
export function AboutPage() {
  const values = [{
    icon: TargetIcon,
    title: 'Outcome-Focused',
    desc: "Every feature exists to help you ship something real — a plan, a document, a strategy. If it doesn't lead to an outcome, we don't build it."
  }, {
    icon: SparklesIcon,
    title: 'Intelligence First',
    desc: "No single model is best at everything. We orchestrate the world's leading models so each task gets the intelligence it deserves."
  }, {
    icon: HeartIcon,
    title: 'Human-Centered',
    desc: 'Powerful tools should feel calm, not overwhelming. We design for clarity, warmth, and confidence — not feature overload.'
  }];
  const audiences = [{
    icon: RocketIcon,
    title: 'Founders & Startups',
    desc: 'From first pitch deck to Series A strategy — Aruna helps you think through decisions and produce investor-grade work.',
    color: 'bg-amber-50 text-amber-600 border-amber-100'
  }, {
    icon: UsersIcon,
    title: 'Agencies & Freelancers',
    desc: 'Scale your output without scaling your team. Research, strategy docs, and campaign plans — delivered in hours, not days.',
    color: 'bg-blue-50 text-blue-600 border-blue-100'
  }, {
    icon: BriefcaseIcon,
    title: 'Professionals & Teams',
    desc: "Whether you're planning a product launch or organizing quarterly goals — Aruna brings structure to complex work.",
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100'
  }, {
    icon: GraduationCapIcon,
    title: 'Students & Researchers',
    desc: 'Structure study plans, outline research papers, and organize complex topics into clear, actionable frameworks.',
    color: 'bg-purple-50 text-purple-600 border-purple-100'
  }, {
    icon: VideoIcon,
    title: 'Creators & Marketers',
    desc: 'Plan content calendars, brainstorm video concepts, and draft newsletters with an AI that understands your audience.',
    color: 'bg-rose-50 text-rose-600 border-rose-100'
  }, {
    icon: HeartIcon,
    title: 'Personal Life & Goals',
    desc: 'Organize routines, plan travel, create fitness schedules, and think through personal decisions with clarity.',
    color: 'bg-cyan-50 text-cyan-600 border-cyan-100'
  }];
  return <div className="flex flex-col items-center w-full overflow-hidden" data-id="element-1992">
      {/* Hero */}
      <section className="w-full bg-primary pt-32 pb-32 text-center relative overflow-hidden" data-id="element-1993">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" data-id="element-1994">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-white/5 blur-[120px]" data-id="element-1995"></div>
          <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-rose-light/10 blur-[100px]" data-id="element-1996"></div>
        </div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="max-w-4xl mx-auto px-6 relative z-10" data-id="element-1997">
          <Badge className="mb-8 bg-white/10 text-white border-white/20 px-4 py-1.5 backdrop-blur-sm" data-id="element-1998">
            Our Story
          </Badge>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight" data-id="element-1999">
            Moving Beyond the Chat Box
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed" data-id="element-2000">
            We believe AI should do more than answer questions. It should plan,
            execute, and deliver — with humans in control of every critical
            decision.
          </p>
        </motion.div>
      </section>

      {/* The Vision */}
      <section className="w-full py-32 bg-white" data-id="element-2001">
        <div className="max-w-4xl mx-auto px-6" data-id="element-2002">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-16" data-id="element-2003">
            <div className="flex items-center justify-center gap-3 mb-6" data-id="element-2004">
              <GlobeIcon className="w-8 h-8 text-primary" data-id="element-2005" />
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary" data-id="element-2006">
                Global Intelligence, Built from India
              </h2>
            </div>
          </motion.div>

          <div className="space-y-8 text-lg text-text-secondary leading-relaxed" data-id="element-2007">
            <p data-id="element-2008">
              The world's best AI models are remarkably capable — but using them
              well is still hard. You need to know which model to use, how to
              frame the question, and how to turn a chat response into something
              your team or investors can actually use.
            </p>
            <p data-id="element-2009">
              Aruna exists to close that gap. It's not a chatbot with a better
              prompt. It's an execution system that understands what you need,
              plans how to deliver it, routes work to the right intelligence
              models, and produces structured outcomes.
            </p>
            <p className="text-text-primary font-medium" data-id="element-2010">
              We believe the best AI products won't just answer questions —
              they'll do the work. That's what we're building.
            </p>
          </div>
        </div>
      </section>

      {/* Engineering Philosophy */}
      <section className="w-full py-24 bg-warm-white" data-id="element-2011">
        <div className="max-w-6xl mx-auto px-6" data-id="element-2012">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-16" data-id="element-2013">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4" data-id="element-2014">
              Engineering Philosophy
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto" data-id="element-2015">
              How we build Aruna to be reliable, safe, and scalable.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8" data-id="element-2016">
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
          }} data-id="element-2017">
              <Card padding="lg" className="h-full flex flex-col items-center text-center bg-white hover:shadow-md transition-shadow" data-id="element-2018">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 text-blue-600" data-id="element-2019">
                  <ShieldCheckIcon className="w-8 h-8" data-id="element-2020" />
                </div>
                <h3 className="text-xl font-heading font-bold text-text-primary mb-3" data-id="element-2021">
                  Zero-Defect Architecture
                </h3>
                <p className="text-text-secondary leading-relaxed" data-id="element-2022">
                  Every component is built to production-grade standards. We
                  don't ship experiments — we ship reliable systems.
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
          }} data-id="element-2023">
              <Card padding="lg" className="h-full flex flex-col items-center text-center bg-white hover:shadow-md transition-shadow" data-id="element-2024">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mb-6 text-amber-600" data-id="element-2025">
                  <UsersIcon className="w-8 h-8" data-id="element-2026" />
                </div>
                <h3 className="text-xl font-heading font-bold text-text-primary mb-3" data-id="element-2027">
                  Human-in-the-Loop Safety
                </h3>
                <p className="text-text-secondary leading-relaxed" data-id="element-2028">
                  AI proposes, humans approve. Critical actions always require
                  explicit authorization before execution.
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
          }} data-id="element-2029">
              <Card padding="lg" className="h-full flex flex-col items-center text-center bg-white hover:shadow-md transition-shadow" data-id="element-2030">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 text-emerald-600" data-id="element-2031">
                  <TrendingUpIcon className="w-8 h-8" data-id="element-2032" />
                </div>
                <h3 className="text-xl font-heading font-bold text-text-primary mb-3" data-id="element-2033">
                  Asset-Lite Scalability
                </h3>
                <p className="text-text-secondary leading-relaxed" data-id="element-2034">
                  Multi-model routing means we use the cheapest model that gets
                  the job done. Better unit economics for everyone.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full py-24 bg-white" data-id="element-2035">
        <div className="max-w-6xl mx-auto px-6" data-id="element-2036">
          <div className="text-center mb-16" data-id="element-2037">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-text-primary" data-id="element-2038">
              What We Believe
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto" data-id="element-2039">
              The principles that guide how we build Aruna.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8" data-id="element-2040">
            {values.map((value, idx) => <motion.div key={idx} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: idx * 0.1
          }} data-id="element-2041">
                <Card className="p-8 bg-white border-border/50 shadow-sm h-full text-center" data-id="element-2042">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 mx-auto" data-id="element-2043">
                    <value.icon className="w-7 h-7" data-id="element-2044" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-3 text-text-primary" data-id="element-2045">
                    {value.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed" data-id="element-2046">
                    {value.desc}
                  </p>
                </Card>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="w-full py-32 bg-white" data-id="element-2047">
        <div className="max-w-6xl mx-auto px-6" data-id="element-2048">
          <div className="text-center mb-16" data-id="element-2049">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-text-primary" data-id="element-2050">
              Who We Serve
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto" data-id="element-2051">
              Aruna is built for people who want to do more than just chat with
              AI.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-id="element-2052">
            {audiences.map((audience, idx) => <motion.div key={idx} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: idx * 0.1
          }} data-id="element-2053">
                <Card className="p-8 bg-warm-white border-border/50 h-full" data-id="element-2054">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${audience.color}`} data-id="element-2055">
                    <audience.icon className="w-7 h-7" data-id="element-2056" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-3 text-text-primary" data-id="element-2057">
                    {audience.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed" data-id="element-2058">
                    {audience.desc}
                  </p>
                </Card>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* India Pride */}
      <section className="w-full py-24 bg-primary" data-id="element-2059">
        <div className="max-w-4xl mx-auto px-6 text-center" data-id="element-2060">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-white" data-id="element-2061">
            Designed in India. Built for Global Ambition.
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed" data-id="element-2062">
            The next generation of AI platforms doesn't need to come from
            Silicon Valley. Aruna is built by world-class Indian engineers with
            deep product craft — combining global intelligence models with the
            ambition and resourcefulness this country is known for.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-32 bg-white text-center px-6" data-id="element-2063">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-text-primary" data-id="element-2064">
          Your Best Work, Amplified
        </h2>
        <p className="text-xl text-text-secondary mb-10 max-w-lg mx-auto" data-id="element-2065">
          The best ideas deserve structured execution, not chat responses.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center" data-id="element-2066">
          <Link to="/signup" data-id="element-2067">
            <Button size="lg" className="rounded-full px-10" data-id="element-2068">
              Get Started Free
            </Button>
          </Link>
          <Link to="/contact" data-id="element-2069">
            <Button variant="outline" size="lg" className="rounded-full px-10" data-id="element-2070">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>;
}