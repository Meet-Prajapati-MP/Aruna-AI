import React, { useState, Children } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { GitBranchIcon, PlusIcon, CalendarIcon, PlayIcon, ZapIcon, ShieldCheckIcon, MoreVerticalIcon } from 'lucide-react';
type TriggerType = 'Recurring' | 'Manual' | 'Trigger-based' | 'Approval-required';
interface Workflow {
  id: string;
  name: string;
  description: string;
  trigger: TriggerType;
  status: 'Active' | 'Template' | 'Paused';
  lastRun: string;
  color: string;
}
const MOCK_WORKFLOWS: Workflow[] = [{
  id: '1',
  name: 'Weekly Research Digest',
  description: 'Scrapes specified news sites, summarizes fintech trends, and emails the team every Monday.',
  trigger: 'Recurring',
  status: 'Active',
  lastRun: '2 days ago',
  color: 'bg-blue-50 text-blue-600'
}, {
  id: '2',
  name: 'Client Report Generator',
  description: 'Takes raw analytics CSV, analyzes data, and generates a polished PDF presentation.',
  trigger: 'Manual',
  status: 'Template',
  lastRun: '1 week ago',
  color: 'bg-amber-50 text-amber-600'
}, {
  id: '3',
  name: 'Competitor Monitor',
  description: 'Monitors competitor pricing pages and alerts Slack if changes are detected.',
  trigger: 'Trigger-based',
  status: 'Active',
  lastRun: '6 hours ago',
  color: 'bg-emerald-50 text-emerald-600'
}, {
  id: '4',
  name: 'Email Draft Pipeline',
  description: 'Reads incoming support emails, drafts suggested replies, and saves to drafts folder.',
  trigger: 'Manual',
  status: 'Template',
  lastRun: '3 days ago',
  color: 'bg-purple-50 text-purple-600'
}, {
  id: '5',
  name: 'Onboarding Checklist',
  description: 'Creates accounts, sends welcome email, and generates training schedule for new hires.',
  trigger: 'Approval-required',
  status: 'Active',
  lastRun: 'Yesterday',
  color: 'bg-orange-50 text-orange-600'
}];
export function WorkflowsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Active', 'Templates', 'Recurring'];
  const filteredWorkflows = MOCK_WORKFLOWS.filter(w => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Active') return w.status === 'Active';
    if (activeFilter === 'Templates') return w.status === 'Template';
    if (activeFilter === 'Recurring') return w.trigger === 'Recurring';
    return true;
  });
  const getTriggerIcon = (trigger: TriggerType) => {
    switch (trigger) {
      case 'Recurring':
        return CalendarIcon;
      case 'Manual':
        return PlayIcon;
      case 'Trigger-based':
        return ZapIcon;
      case 'Approval-required':
        return ShieldCheckIcon;
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
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };
  return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12" data-id="element-1696">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8" data-id="element-1697">
        <div data-id="element-1698">
          <h1 className="text-3xl font-heading font-bold text-text-primary" data-id="element-1699">
            Workflows
          </h1>
          <p className="text-text-secondary mt-1" data-id="element-1700">
            Automate complex multi-step processes.
          </p>
        </div>
        <Button variant="primary" leftIcon={<PlusIcon className="w-4 h-4" data-id="element-1702" />} data-id="element-1701">
          New Workflow
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8" data-id="element-1703">
        {filters.map(filter => <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === filter ? 'bg-primary text-white shadow-sm' : 'bg-white border border-border text-text-secondary hover:bg-cream hover:text-text-primary'}`} data-id="element-1704">
            {filter}
          </button>)}
      </div>

      {/* Grid */}
      {filteredWorkflows.length > 0 ? <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-5" data-id="element-1705">
          <AnimatePresence mode="popLayout" data-id="element-1706">
            {filteredWorkflows.map(workflow => {
          const TriggerIcon = getTriggerIcon(workflow.trigger);
          return <motion.div key={workflow.id} variants={itemAnim} layout data-id="element-1707">
                  <Card padding="md" className="h-full flex flex-col hover:shadow-md transition-shadow group" data-id="element-1708">
                    <div className="flex justify-between items-start mb-4" data-id="element-1709">
                      <div className={`w-12 h-12 rounded-xl ${workflow.color} flex items-center justify-center border border-current/10`} data-id="element-1710">
                        <GitBranchIcon className="w-6 h-6" data-id="element-1711" />
                      </div>
                      <button className="p-1.5 text-text-muted hover:text-text-primary rounded-md hover:bg-cream transition-colors opacity-0 group-hover:opacity-100" data-id="element-1712">
                        <MoreVerticalIcon className="w-5 h-5" data-id="element-1713" />
                      </button>
                    </div>

                    <h3 className="text-lg font-heading font-bold text-text-primary mb-2" data-id="element-1714">
                      {workflow.name}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1" data-id="element-1715">
                      {workflow.description}
                    </p>

                    <div className="pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-3" data-id="element-1716">
                      <div className="flex items-center gap-2" data-id="element-1717">
                        <Badge variant="default" className="bg-warm-white flex items-center gap-1.5 border-none" data-id="element-1718">
                          <TriggerIcon className="w-3 h-3 text-text-muted" data-id="element-1719" />
                          {workflow.trigger}
                        </Badge>
                        <Badge variant="default" className={`border-none ${workflow.status === 'Active' ? 'bg-green-50 text-green-700' : workflow.status === 'Template' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-700'}`} data-id="element-1720">
                          {workflow.status}
                        </Badge>
                      </div>
                      <span className="text-xs text-text-muted font-medium" data-id="element-1721">
                        Run: {workflow.lastRun}
                      </span>
                    </div>
                  </Card>
                </motion.div>;
        })}
          </AnimatePresence>
        </motion.div> : <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="flex flex-col items-center justify-center py-20 text-center" data-id="element-1722">
          <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mb-4" data-id="element-1723">
            <GitBranchIcon className="w-8 h-8 text-text-muted" data-id="element-1724" />
          </div>
          <h3 className="text-lg font-heading font-bold text-text-primary mb-1" data-id="element-1725">
            No workflows found
          </h3>
          <p className="text-sm text-text-secondary" data-id="element-1726">
            Create an automated workflow to save time on repetitive tasks.
          </p>
        </motion.div>}
    </div>;
}