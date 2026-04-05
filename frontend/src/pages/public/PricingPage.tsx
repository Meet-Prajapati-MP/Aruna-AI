import React, { useState, Children, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
export function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
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
  const faqs = [{
    question: 'Can I switch plans at any time?',
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any differences."
  }, {
    question: 'What AI models does Aruna use?',
    answer: 'Aruna uses a multi-model approach, intelligently routing requests to OpenAI, Anthropic Claude, Google Gemini, Perplexity, Qwen, and others based on the task.'
  }, {
    question: 'Is my data private and secure?',
    answer: 'Absolutely. We use end-to-end encryption, maintain strict security standards, and have zero-retention agreements with all AI providers.'
  }, {
    question: "What's included in the free plan?",
    answer: 'The Free plan gives you access to basic conversations, the General Space, and standard model routing to explore what Aruna can do.'
  }, {
    question: 'Do you offer refunds?',
    answer: "Yes, we offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, contact us for a full refund."
  }];
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return <div className="flex flex-col items-center w-full overflow-hidden" data-id="element-2406">
      {/* Hero */}
      <section className="w-full max-w-5xl mx-auto px-6 pt-32 pb-16 text-center" data-id="element-2407">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} data-id="element-2408">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1.5" data-id="element-2409">
            Pricing
          </Badge>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-text-primary mb-6 leading-tight" data-id="element-2410">
            Pay for Outcomes, Not Tokens
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10" data-id="element-2411">
            Simple plans that scale with your work. No per-model pricing, no
            hidden fees. Upgrade or downgrade anytime.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mb-16" data-id="element-2412">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-text-primary' : 'text-text-muted'}`} data-id="element-2413">
              Monthly
            </span>
            <button onClick={() => setIsAnnual(!isAnnual)} className={`relative w-14 h-8 rounded-full transition-colors ${isAnnual ? 'bg-primary' : 'bg-border'}`} data-id="element-2414">
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${isAnnual ? 'left-7' : 'left-1'}`} data-id="element-2415" />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-text-primary' : 'text-text-muted'}`} data-id="element-2416">
              Annual
            </span>
            {isAnnual && <Badge className="bg-green-100 text-green-700 border-green-200 text-xs" data-id="element-2417">
                Save up to 33%
              </Badge>}
          </div>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="w-full max-w-6xl mx-auto px-6 pb-24 relative z-10" data-id="element-2418">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid md:grid-cols-3 gap-8 items-start" data-id="element-2419">
          {/* Starter Tier */}
          <motion.div variants={itemVariants} data-id="element-2420">
            <Card padding="lg" className="h-full flex flex-col border-border/50 hover:border-primary/20 transition-colors bg-white/80 backdrop-blur-sm" data-id="element-2421">
              <div className="mb-8" data-id="element-2422">
                <h3 className="text-2xl font-heading font-bold text-text-primary mb-2" data-id="element-2423">
                  Starter
                </h3>
                <p className="text-text-secondary text-sm h-10" data-id="element-2424">
                  For individuals exploring AI.
                </p>
                <div className="mt-6 flex items-baseline gap-1" data-id="element-2425">
                  <span className="text-4xl font-heading font-bold text-text-primary" data-id="element-2426">
                    ₹0
                  </span>
                  <span className="text-text-muted" data-id="element-2427">/mo</span>
                </div>
              </div>

              <Button variant="outline" className="w-full mb-8" data-id="element-2428">
                Get Started Free
              </Button>

              <div className="space-y-4 flex-1" data-id="element-2429">
                <p className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4" data-id="element-2430">
                  What's included
                </p>
                {['Lite models (Llama 3, Mistral)', '1 Workspace', 'Basic Composio tools (3 apps)', '50 messages/day', 'Community support'].map((feature, i) => <div key={i} className="flex items-start gap-3" data-id="element-2431">
                    <CheckIcon className="w-5 h-5 text-primary flex-shrink-0" data-id="element-2432" />
                    <span className="text-sm text-text-secondary" data-id="element-2433">
                      {feature}
                    </span>
                  </div>)}
              </div>
            </Card>
          </motion.div>

          {/* Pro Tier */}
          <motion.div variants={itemVariants} data-id="element-2434">
            <Card padding="lg" className="h-full flex flex-col border-primary shadow-xl relative transform md:-translate-y-4 bg-white" data-id="element-2435">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" data-id="element-2436">
                <Badge className="bg-primary text-white border-none px-4 py-1 shadow-sm" data-id="element-2437">
                  Recommended
                </Badge>
              </div>

              <div className="mb-8 mt-2" data-id="element-2438">
                <h3 className="text-2xl font-heading font-bold text-text-primary mb-2" data-id="element-2439">
                  Pro
                </h3>
                <p className="text-text-secondary text-sm h-10" data-id="element-2440">
                  For professionals who ship.
                </p>
                <div className="mt-6 flex items-baseline gap-1" data-id="element-2441">
                  <span className="text-4xl font-heading font-bold text-text-primary" data-id="element-2442">
                    {isAnnual ? '₹1,000' : '₹1,500'}
                  </span>
                  <span className="text-text-muted" data-id="element-2443">/mo</span>
                </div>
                {isAnnual && <p className="text-xs text-green-600 font-medium mt-2" data-id="element-2444">
                    Billed ₹12,000 yearly
                  </p>}
              </div>

              <Button variant="primary" className="w-full mb-8 shadow-md" data-id="element-2445">
                Start 14-Day Free Trial
              </Button>

              <div className="space-y-4 flex-1" data-id="element-2446">
                <p className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4" data-id="element-2447">
                  Everything in Starter, plus
                </p>
                {['Medium models (Claude Haiku, Mixtral)', '10 Workspaces', 'Advanced Composio tools (20+ apps)', 'Unlimited messages', 'Workspace memory', 'Priority support'].map((feature, i) => <div key={i} className="flex items-start gap-3" data-id="element-2448">
                    <CheckIcon className="w-5 h-5 text-primary flex-shrink-0" data-id="element-2449" />
                    <span className="text-sm text-text-secondary font-medium" data-id="element-2450">
                      {feature}
                    </span>
                  </div>)}
              </div>
            </Card>
          </motion.div>

          {/* Elite Tier */}
          <motion.div variants={itemVariants} data-id="element-2451">
            <Card padding="lg" className="h-full flex flex-col border-border/50 hover:border-primary/20 transition-colors bg-white/80 backdrop-blur-sm" data-id="element-2452">
              <div className="mb-8" data-id="element-2453">
                <h3 className="text-2xl font-heading font-bold text-text-primary mb-2" data-id="element-2454">
                  Elite
                </h3>
                <p className="text-text-secondary text-sm h-10" data-id="element-2455">
                  For power users and teams.
                </p>
                <div className="mt-6 flex items-baseline gap-1" data-id="element-2456">
                  <span className="text-4xl font-heading font-bold text-text-primary" data-id="element-2457">
                    {isAnnual ? '₹8,333' : '₹10,000'}
                  </span>
                  <span className="text-text-muted" data-id="element-2458">/mo</span>
                </div>
                {isAnnual && <p className="text-xs text-green-600 font-medium mt-2" data-id="element-2459">
                    Billed ₹100,000 yearly
                  </p>}
              </div>

              <Button variant="outline" className="w-full mb-8" data-id="element-2460">
                Contact Sales
              </Button>

              <div className="space-y-4 flex-1" data-id="element-2461">
                <p className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4" data-id="element-2462">
                  Everything in Pro, plus
                </p>
                {['Complex models (GPT-4o, Claude 3.5 Sonnet)', 'Unlimited workspaces', 'All Composio integrations', 'Custom tool connections', 'Full memory system', 'Dedicated support', 'Team collaboration'].map((feature, i) => <div key={i} className="flex items-start gap-3" data-id="element-2463">
                    <CheckIcon className="w-5 h-5 text-primary flex-shrink-0" data-id="element-2464" />
                    <span className="text-sm text-text-secondary" data-id="element-2465">
                      {feature}
                    </span>
                  </div>)}
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Transparency Note */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="mt-16 max-w-3xl mx-auto" data-id="element-2466">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center" data-id="element-2467">
            <h4 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-2" data-id="element-2468">
              Transparent Pricing
            </h4>
            <p className="text-blue-700 text-sm leading-relaxed" data-id="element-2469">
              We pass API costs directly to you for premium models, so you only
              pay for what you use. No hidden markups.
            </p>
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="w-full bg-warm-white py-24 border-t border-border/50" data-id="element-2470">
        <div className="max-w-3xl mx-auto px-6" data-id="element-2471">
          <div className="text-center mb-16" data-id="element-2472">
            <h2 className="text-4xl font-heading font-bold text-text-primary mb-4" data-id="element-2473">
              Frequently Asked Questions
            </h2>
            <p className="text-text-secondary" data-id="element-2474">
              Everything you need to know about our pricing and plans.
            </p>
          </div>

          <div className="space-y-4" data-id="element-2475">
            {faqs.map((faq, index) => <div key={index} className="bg-white rounded-2xl border border-border/50 overflow-hidden" data-id="element-2476">
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full px-6 py-5 flex items-center justify-between text-left" data-id="element-2477">
                  <span className="font-heading font-semibold text-text-primary" data-id="element-2478">
                    {faq.question}
                  </span>
                  <ChevronDownIcon className={`w-5 h-5 text-text-muted transition-transform ${openFaq === index ? 'rotate-180' : ''}`} data-id="element-2479" />
                </button>
                {openFaq === index && <div className="px-6 pb-5" data-id="element-2480">
                    <p className="text-text-secondary leading-relaxed" data-id="element-2481">
                      {faq.answer}
                    </p>
                  </div>}
              </div>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-24 bg-white text-center px-6" data-id="element-2482">
        <h2 className="text-3xl font-heading font-bold text-text-primary mb-4" data-id="element-2483">
          Still have questions?
        </h2>
        <p className="text-text-secondary mb-8" data-id="element-2484">
          Our team is here to help you find the right plan.
        </p>
        <Link to="/contact" data-id="element-2485">
          <Button variant="outline" className="rounded-full px-8" data-id="element-2486">
            Contact Us
          </Button>
        </Link>
      </section>
    </div>;
}