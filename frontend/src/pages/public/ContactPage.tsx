import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { MapPinIcon, BriefcaseIcon, HandshakeIcon, HelpCircleIcon } from 'lucide-react';
export function ContactPage() {
  return <div className="flex flex-col items-center w-full overflow-hidden" data-id="element-2071">
      {/* Hero */}
      <section className="w-full bg-warm-white pt-32 pb-16 text-center" data-id="element-2072">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="max-w-3xl mx-auto px-6" data-id="element-2073">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1.5" data-id="element-2074">
            Contact
          </Badge>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-text-primary mb-6 leading-tight" data-id="element-2075">
            Get in Touch
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed" data-id="element-2076">
            Whether you're looking for enterprise access, partnerships, or just
            want to say hello — we'd love to hear from you.
          </p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="w-full bg-white py-24" data-id="element-2077">
        <div className="max-w-7xl mx-auto px-6" data-id="element-2078">
          <div className="grid lg:grid-cols-2 gap-16" data-id="element-2079">
            {/* Left: Form */}
            <motion.div initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: 0.2,
            duration: 0.6
          }} data-id="element-2080">
              <Card className="p-8 md:p-10 bg-white border-border/50 shadow-lg" data-id="element-2081">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-8" data-id="element-2082">
                  Send us a message
                </h2>
                <form className="space-y-6" onSubmit={e => e.preventDefault()} data-id="element-2083">
                  <div className="grid md:grid-cols-2 gap-6" data-id="element-2084">
                    <Input label="First Name" placeholder="Jane" required data-id="element-2085" />
                    <Input label="Last Name" placeholder="Doe" required data-id="element-2086" />
                  </div>

                  <Input label="Work Email" type="email" placeholder="jane@company.com" required data-id="element-2087" />

                  <div data-id="element-2088">
                    <label className="block text-sm font-medium text-text-primary mb-2 ml-1" data-id="element-2089">
                      I'm interested in...
                    </label>
                    <select className="w-full bg-warm-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-primary appearance-none" data-id="element-2090">
                      <option value="general" data-id="element-2091">General Inquiry</option>
                      <option value="enterprise" data-id="element-2092">Enterprise Plan</option>
                      <option value="partnership" data-id="element-2093">Partnership</option>
                      <option value="support" data-id="element-2094">Support</option>
                    </select>
                  </div>

                  <div data-id="element-2095">
                    <label className="block text-sm font-medium text-text-primary mb-2 ml-1" data-id="element-2096">
                      Message
                    </label>
                    <textarea className="w-full bg-warm-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-primary min-h-[150px] resize-y" placeholder="How can we help you?" required data-id="element-2097"></textarea>
                  </div>

                  <Button type="submit" size="lg" className="w-full rounded-xl" data-id="element-2098">
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Right: Info */}
            <motion.div initial={{
            opacity: 0,
            x: 20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: 0.3,
            duration: 0.6
          }} className="space-y-6" data-id="element-2099">
              <Card className="p-8 bg-warm-white border-border/50 flex items-start gap-5" data-id="element-2100">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm flex-shrink-0" data-id="element-2101">
                  <BriefcaseIcon className="w-6 h-6" data-id="element-2102" />
                </div>
                <div data-id="element-2103">
                  <h3 className="text-xl font-heading font-bold text-text-primary mb-2" data-id="element-2104">
                    Business & Enterprise
                  </h3>
                  <p className="text-text-secondary mb-4" data-id="element-2105">
                    Looking to deploy Aruna across your organization? We offer
                    custom LLM routing and SOC2 compliance.
                  </p>
                  <a href="mailto:enterprise@aruna.ai" className="text-primary font-semibold hover:underline" data-id="element-2106">
                    enterprise@aruna.ai
                  </a>
                </div>
              </Card>

              <Card className="p-8 bg-warm-white border-border/50 flex items-start gap-5" data-id="element-2107">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm flex-shrink-0" data-id="element-2108">
                  <HandshakeIcon className="w-6 h-6" data-id="element-2109" />
                </div>
                <div data-id="element-2110">
                  <h3 className="text-xl font-heading font-bold text-text-primary mb-2" data-id="element-2111">
                    Partnerships
                  </h3>
                  <p className="text-text-secondary mb-4" data-id="element-2112">
                    Interested in building with us or integrating Aruna into
                    your workflow tools?
                  </p>
                  <a href="mailto:partners@aruna.ai" className="text-primary font-semibold hover:underline" data-id="element-2113">
                    partners@aruna.ai
                  </a>
                </div>
              </Card>

              <Card className="p-8 bg-warm-white border-border/50 flex items-start gap-5" data-id="element-2114">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm flex-shrink-0" data-id="element-2115">
                  <HelpCircleIcon className="w-6 h-6" data-id="element-2116" />
                </div>
                <div data-id="element-2117">
                  <h3 className="text-xl font-heading font-bold text-text-primary mb-2" data-id="element-2118">
                    Support & Help
                  </h3>
                  <p className="text-text-secondary mb-4" data-id="element-2119">
                    Need help with your account, billing, or using Aruna's
                    features?
                  </p>
                  <a href="mailto:support@aruna.ai" className="text-primary font-semibold hover:underline" data-id="element-2120">
                    support@aruna.ai
                  </a>
                </div>
              </Card>

              <Card className="p-8 bg-warm-white border-border/50 flex items-start gap-5" data-id="element-2121">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm flex-shrink-0" data-id="element-2122">
                  <MapPinIcon className="w-6 h-6" data-id="element-2123" />
                </div>
                <div data-id="element-2124">
                  <h3 className="text-xl font-heading font-bold text-text-primary mb-2" data-id="element-2125">
                    Location
                  </h3>
                  <p className="text-text-secondary" data-id="element-2126">
                    Built with pride from India 🇮🇳
                    <br data-id="element-2127" />
                    Serving users globally.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>;
}