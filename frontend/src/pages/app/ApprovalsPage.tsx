import React, { useState, Children } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ShieldCheckIcon, AlertTriangleIcon, CheckIcon, XIcon, ClockIcon, TargetIcon, FileTextIcon, EditIcon } from 'lucide-react';
type ApprovalStatus = 'Pending' | 'Approved' | 'Rejected';
type RiskLevel = 'Low' | 'Medium' | 'High';
interface Approval {
  id: string;
  title: string;
  description: string;
  status: ApprovalStatus;
  risk: RiskLevel;
  workspace: string;
  requester: string;
  time: string;
  goal?: string;
  riskExplanation?: string;
  details?: {
    recipients?: string;
    integration?: string;
    estimatedTime?: string;
  };
}
const MOCK_APPROVALS: Approval[] = [{
  id: '1',
  title: 'Send investor update email',
  description: 'Workflow wants to send the Q3 Update email to 45 contacts in the "Seed Investors" list via Gmail integration.',
  status: 'Pending',
  risk: 'Medium',
  workspace: 'Fundraising',
  requester: 'Automated Workflow',
  time: '1 hour ago',
  goal: 'Keep seed investors informed about Q3 metrics and product milestones.',
  riskExplanation: 'External communication to a large group of high-value contacts. Requires review to ensure accurate financial reporting.',
  details: {
    recipients: '45 contacts (Seed Investors List)',
    integration: 'Gmail (auth: user@trustopay.com)',
    estimatedTime: '2 minutes'
  }
}, {
  id: '2',
  title: 'Publish blog post to website',
  description: 'Content Agent wants to push "The Future of AI in Fintech" directly to Webflow CMS.',
  status: 'Pending',
  risk: 'Low',
  workspace: 'Content',
  requester: 'Content Agent',
  time: '2 hours ago',
  goal: 'Maintain weekly publishing cadence for SEO growth.',
  riskExplanation: 'Standard content publishing to owned channels. Reversible action.',
  details: {
    integration: 'Webflow CMS',
    estimatedTime: 'Immediate'
  }
}, {
  id: '3',
  title: 'Execute browser task: scrape competitor pricing',
  description: 'Browser Agent needs permission to navigate 15 competitor sites and extract pricing tables. May trigger CAPTCHAs.',
  status: 'Pending',
  risk: 'High',
  workspace: 'Market Research',
  requester: 'Browser Agent',
  time: '3 hours ago',
  goal: 'Gather up-to-date pricing data for the Q4 competitive analysis report.',
  riskExplanation: 'Automated browser navigation across multiple external domains. High chance of rate-limiting or IP blocks.',
  details: {
    estimatedTime: '15-20 minutes'
  }
}, {
  id: '4',
  title: 'Share research report with team',
  description: 'Share "SaaS Trends 2025" with the entire organization.',
  status: 'Approved',
  risk: 'Low',
  workspace: 'Trustopay GTM',
  requester: 'Alex L.',
  time: 'Approved 1 hour ago'
}, {
  id: '5',
  title: 'Run automated email sequence',
  description: 'Start the 5-day welcome sequence for 120 new signups.',
  status: 'Approved',
  risk: 'Medium',
  workspace: 'Marketing',
  requester: 'Automated Workflow',
  time: 'Approved yesterday'
}, {
  id: '6',
  title: 'Delete old workspace data',
  description: 'Remove 45 files and 12 chats from archived workspace.',
  status: 'Rejected',
  risk: 'High',
  workspace: 'Settings',
  requester: 'System Cleanup',
  time: 'Rejected 2 days ago'
}];
export function ApprovalsPage() {
  const [activeFilter, setActiveFilter] = useState('Pending');
  const [selectedApproval, setSelectedApproval] = useState<Approval | null>(null);
  const filters = ['Pending', 'Approved', 'Rejected', 'All'];
  const filteredApprovals = MOCK_APPROVALS.filter(a => {
    if (activeFilter === 'All') return true;
    return a.status === activeFilter;
  });
  const getRiskStyles = (risk: RiskLevel) => {
    switch (risk) {
      case 'Low':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'High':
        return 'bg-red-50 text-red-700 border-red-200';
    }
  };
  const stagger = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  const itemAnim = {
    hidden: {
      opacity: 0,
      y: 10
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };
  return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12" data-id="element-330">
      <div className="mb-8" data-id="element-331">
        <h1 className="text-3xl font-heading font-bold text-text-primary" data-id="element-332">
          Approvals
        </h1>
        <p className="text-text-secondary mt-1" data-id="element-333">
          Review and authorize agent actions and workflows.
        </p>
      </div>

      {/* Filters & Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8" data-id="element-334">
        <div className="flex flex-wrap gap-2" data-id="element-335">
          {filters.map(filter => <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === filter ? 'bg-primary text-white shadow-sm' : 'bg-white border border-border text-text-secondary hover:bg-cream hover:text-text-primary'}`} data-id="element-336">
              {filter}
            </button>)}
        </div>

        <div className="flex gap-3 text-sm" data-id="element-337">
          <Badge variant="default" className="bg-amber-50 text-amber-700 border-amber-200" data-id="element-338">
            3 Pending
          </Badge>
          <Badge variant="default" className="bg-green-50 text-green-700 border-green-200" data-id="element-339">
            5 Approved
          </Badge>
          <Badge variant="default" className="bg-red-50 text-red-700 border-red-200" data-id="element-340">
            1 Rejected
          </Badge>
        </div>
      </div>

      {/* Approvals List */}
      {filteredApprovals.length > 0 ? <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-4" data-id="element-341">
          <AnimatePresence mode="popLayout" data-id="element-342">
            {filteredApprovals.map(approval => <motion.div key={approval.id} variants={itemAnim} layout data-id="element-343">
                <Card padding="md" clickable={approval.status === 'Pending'} onClick={() => approval.status === 'Pending' && setSelectedApproval(approval)} className={`border-l-4 ${approval.status === 'Pending' ? 'border-l-amber-400' : approval.status === 'Approved' ? 'border-l-green-400' : 'border-l-red-400'}`} data-id="element-344">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6" data-id="element-345">
                    <div className="flex-1" data-id="element-346">
                      <div className="flex flex-wrap items-center gap-2 mb-2" data-id="element-347">
                        <Badge variant="default" className={getRiskStyles(approval.risk)} data-id="element-348">
                          {approval.risk} Risk
                        </Badge>
                        <Badge variant="default" className="bg-warm-white border-none" data-id="element-349">
                          {approval.workspace}
                        </Badge>
                        <span className="text-xs text-text-muted flex items-center gap-1" data-id="element-350">
                          <ClockIcon className="w-3 h-3" data-id="element-351" /> {approval.time}
                        </span>
                      </div>

                      <h3 className="text-lg font-heading font-bold text-text-primary mb-2" data-id="element-352">
                        {approval.title}
                      </h3>

                      <div className="bg-warm-white/50 border border-border/50 rounded-xl p-4 text-sm text-text-secondary leading-relaxed mb-4 md:mb-0" data-id="element-353">
                        <span className="font-semibold text-text-primary block mb-1" data-id="element-354">
                          Action Preview:
                        </span>
                        {approval.description}
                      </div>

                      <p className="text-xs text-text-muted mt-3" data-id="element-355">
                        Requested by:{' '}
                        <span className="font-medium text-text-primary" data-id="element-356">
                          {approval.requester}
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-row md:flex-col gap-3 flex-shrink-0 min-w-[140px]" onClick={e => e.stopPropagation()} data-id="element-357">
                      {approval.status === 'Pending' ? <>
                          <Button variant="primary" className="w-full bg-green-600 hover:bg-green-700 text-white" leftIcon={<CheckIcon className="w-4 h-4" data-id="element-359" />} data-id="element-358">
                            Approve
                          </Button>
                          <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50" leftIcon={<XIcon className="w-4 h-4" data-id="element-361" />} data-id="element-360">
                            Reject
                          </Button>
                          <button onClick={() => setSelectedApproval(approval)} className="text-sm text-primary font-medium hover:underline text-center mt-2 hidden md:block" data-id="element-362">
                            View Details
                          </button>
                        </> : <div className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium ${approval.status === 'Approved' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`} data-id="element-363">
                          {approval.status === 'Approved' ? <CheckIcon className="w-5 h-5" data-id="element-364" /> : <XIcon className="w-5 h-5" data-id="element-365" />}
                          {approval.status}
                        </div>}
                    </div>
                  </div>
                </Card>
              </motion.div>)}
          </AnimatePresence>
        </motion.div> : <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="flex flex-col items-center justify-center py-20 text-center" data-id="element-366">
          <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mb-4" data-id="element-367">
            <ShieldCheckIcon className="w-8 h-8 text-text-muted" data-id="element-368" />
          </div>
          <h3 className="text-lg font-heading font-bold text-text-primary mb-1" data-id="element-369">
            No approvals needed
          </h3>
          <p className="text-sm text-text-secondary" data-id="element-370">
            You're all caught up. No pending actions require your authorization.
          </p>
        </motion.div>}

      {/* Slide-over Detail Panel */}
      <AnimatePresence data-id="element-371">
        {selectedApproval && <>
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="fixed inset-0 bg-text-primary/40 backdrop-blur-sm z-40" onClick={() => setSelectedApproval(null)} data-id="element-372" />
            <motion.div initial={{
          x: '100%'
        }} animate={{
          x: 0
        }} exit={{
          x: '100%'
        }} transition={{
          type: 'spring',
          bounce: 0,
          duration: 0.4
        }} className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-border" data-id="element-373">
              <div className="p-6 border-b border-border/50 bg-warm-white/30 flex items-start justify-between" data-id="element-374">
                <div data-id="element-375">
                  <div className="flex items-center gap-2 mb-3" data-id="element-376">
                    <Badge variant="default" className={getRiskStyles(selectedApproval.risk)} data-id="element-377">
                      {selectedApproval.risk} Risk
                    </Badge>
                    <Badge variant="default" className="bg-white border-border" data-id="element-378">
                      {selectedApproval.workspace}
                    </Badge>
                  </div>
                  <h2 className="text-xl font-heading font-bold text-text-primary leading-tight" data-id="element-379">
                    {selectedApproval.title}
                  </h2>
                </div>
                <button onClick={() => setSelectedApproval(null)} className="p-2 text-text-muted hover:text-text-primary rounded-full hover:bg-cream transition-colors flex-shrink-0 ml-4" data-id="element-380">
                  <XIcon className="w-5 h-5" data-id="element-381" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8" data-id="element-382">
                {/* Goal Section */}
                {selectedApproval.goal && <section data-id="element-383">
                    <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-2" data-id="element-384">
                      <TargetIcon className="w-4 h-4" data-id="element-385" /> Goal
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed" data-id="element-386">
                      {selectedApproval.goal}
                    </p>
                  </section>}

                {/* Proposed Action */}
                <section data-id="element-387">
                  <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-2" data-id="element-388">
                    <FileTextIcon className="w-4 h-4" data-id="element-389" /> Proposed Action
                  </h3>
                  <div className="bg-cream/50 border border-border/50 rounded-xl p-4" data-id="element-390">
                    <p className="text-sm text-text-primary font-medium leading-relaxed mb-4" data-id="element-391">
                      {selectedApproval.description}
                    </p>

                    {selectedApproval.details && <div className="space-y-2 pt-4 border-t border-border/50" data-id="element-392">
                        {selectedApproval.details.recipients && <div className="flex justify-between text-xs" data-id="element-393">
                            <span className="text-text-muted" data-id="element-394">Recipients:</span>
                            <span className="font-medium text-text-primary" data-id="element-395">
                              {selectedApproval.details.recipients}
                            </span>
                          </div>}
                        {selectedApproval.details.integration && <div className="flex justify-between text-xs" data-id="element-396">
                            <span className="text-text-muted" data-id="element-397">
                              Integration:
                            </span>
                            <span className="font-medium text-text-primary" data-id="element-398">
                              {selectedApproval.details.integration}
                            </span>
                          </div>}
                        {selectedApproval.details.estimatedTime && <div className="flex justify-between text-xs" data-id="element-399">
                            <span className="text-text-muted" data-id="element-400">
                              Estimated Time:
                            </span>
                            <span className="font-medium text-text-primary" data-id="element-401">
                              {selectedApproval.details.estimatedTime}
                            </span>
                          </div>}
                      </div>}
                  </div>
                </section>

                {/* Risk Assessment */}
                {selectedApproval.riskExplanation && <section data-id="element-402">
                    <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-2" data-id="element-403">
                      <AlertTriangleIcon className="w-4 h-4" data-id="element-404" /> Risk Assessment
                    </h3>
                    <div className={`rounded-xl p-4 border ${selectedApproval.risk === 'High' ? 'bg-red-50 border-red-100' : selectedApproval.risk === 'Medium' ? 'bg-amber-50 border-amber-100' : 'bg-green-50 border-green-100'}`} data-id="element-405">
                      <p className={`text-sm leading-relaxed ${selectedApproval.risk === 'High' ? 'text-red-800' : selectedApproval.risk === 'Medium' ? 'text-amber-800' : 'text-green-800'}`} data-id="element-406">
                        {selectedApproval.riskExplanation}
                      </p>
                    </div>
                  </section>}

                {/* Timeline */}
                <section data-id="element-407">
                  <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-2" data-id="element-408">
                    <ClockIcon className="w-4 h-4" data-id="element-409" /> Timeline
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-text-secondary" data-id="element-410">
                    <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-text-muted font-bold text-xs" data-id="element-411">
                      {selectedApproval.requester.charAt(0)}
                    </div>
                    <div data-id="element-412">
                      <p data-id="element-413">
                        Requested by{' '}
                        <span className="font-medium text-text-primary" data-id="element-414">
                          {selectedApproval.requester}
                        </span>
                      </p>
                      <p className="text-xs text-text-muted" data-id="element-415">
                        {selectedApproval.time}
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              <div className="p-6 border-t border-border/50 bg-white grid grid-cols-2 gap-3" data-id="element-416">
                <Button variant="outline" className="col-span-2 flex items-center justify-center gap-2" leftIcon={<EditIcon className="w-4 h-4" data-id="element-418" />} data-id="element-417">
                  Modify Action
                </Button>
                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" leftIcon={<XIcon className="w-4 h-4" data-id="element-420" />} onClick={() => setSelectedApproval(null)} data-id="element-419">
                  Reject
                </Button>
                <Button variant="primary" className="bg-green-600 hover:bg-green-700 text-white" leftIcon={<CheckIcon className="w-4 h-4" data-id="element-422" />} onClick={() => setSelectedApproval(null)} data-id="element-421">
                  Approve
                </Button>
              </div>
            </motion.div>
          </>}
      </AnimatePresence>
    </div>;
}