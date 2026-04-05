import React, { useState, Children } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { CheckSquareIcon, ShieldCheckIcon, AtSignIcon, SettingsIcon, BellIcon } from 'lucide-react';
type NotificationType = 'task' | 'approval' | 'mention' | 'system';
interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timeAgo: string;
  isUnread: boolean;
  actionLabel?: string;
}
const MOCK_NOTIFICATIONS: Notification[] = [{
  id: '1',
  type: 'task',
  title: 'Research report completed',
  description: 'Your deep dive on the Indian SaaS market is ready in the Vault.',
  timeAgo: '5 min ago',
  isUnread: true,
  actionLabel: 'View Report'
}, {
  id: '2',
  type: 'approval',
  title: 'Approval needed: Send investor update',
  description: 'Workflow paused. Requires your approval to send email to 45 recipients.',
  timeAgo: '1 hour ago',
  isUnread: true,
  actionLabel: 'Review'
}, {
  id: '3',
  type: 'mention',
  title: '@Alex mentioned you in GTM Strategy',
  description: '"Can you review the pricing section before we finalize?"',
  timeAgo: '2 hours ago',
  isUnread: true,
  actionLabel: 'Reply'
}, {
  id: '4',
  type: 'system',
  title: 'Competitor Monitor workflow triggered',
  description: 'Detected pricing changes on 2 competitor websites.',
  timeAgo: '3 hours ago',
  isUnread: false
}, {
  id: '5',
  type: 'task',
  title: 'Document generation complete: Q4 Business Plan',
  description: 'The 15-page document has been saved to the Trustopay workspace.',
  timeAgo: 'Yesterday',
  isUnread: false,
  actionLabel: 'Open Doc'
}, {
  id: '6',
  type: 'approval',
  title: 'Approval approved: Publish blog post',
  description: 'Sarah approved the action. The post is now live.',
  timeAgo: 'Yesterday',
  isUnread: false
}, {
  id: '7',
  type: 'system',
  title: 'Weekly Research Digest is ready',
  description: 'Your automated weekly summary of fintech news has been generated.',
  timeAgo: '2 days ago',
  isUnread: false
}, {
  id: '8',
  type: 'system',
  title: 'New team member joined Trustopay workspace',
  description: 'Priya has accepted your invitation to collaborate.',
  timeAgo: '3 days ago',
  isUnread: false
}];
export function InboxPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Tasks', 'Approvals', 'Mentions', 'System'];
  const filteredNotifications = MOCK_NOTIFICATIONS.filter(n => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Tasks') return n.type === 'task';
    if (activeFilter === 'Approvals') return n.type === 'approval';
    if (activeFilter === 'Mentions') return n.type === 'mention';
    if (activeFilter === 'System') return n.type === 'system';
    return true;
  });
  const getIconConfig = (type: NotificationType) => {
    switch (type) {
      case 'task':
        return {
          icon: CheckSquareIcon,
          bg: 'bg-blue-50',
          color: 'text-blue-600'
        };
      case 'approval':
        return {
          icon: ShieldCheckIcon,
          bg: 'bg-amber-50',
          color: 'text-amber-600'
        };
      case 'mention':
        return {
          icon: AtSignIcon,
          bg: 'bg-purple-50',
          color: 'text-purple-600'
        };
      case 'system':
        return {
          icon: SettingsIcon,
          bg: 'bg-gray-100',
          color: 'text-gray-600'
        };
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
  return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12" data-id="element-798">
      <div className="mb-8" data-id="element-799">
        <h1 className="text-3xl font-heading font-bold text-text-primary" data-id="element-800">
          Inbox
        </h1>
        <p className="text-text-secondary mt-1" data-id="element-801">Stay on top of everything.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8" data-id="element-802">
        {filters.map(filter => <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === filter ? 'bg-primary text-white shadow-sm' : 'bg-white border border-border text-text-secondary hover:bg-cream hover:text-text-primary'}`} data-id="element-803">
            {filter}
          </button>)}
      </div>

      {/* Notifications List */}
      {filteredNotifications.length > 0 ? <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-3" data-id="element-804">
          <AnimatePresence mode="popLayout" data-id="element-805">
            {filteredNotifications.map(notification => {
          const config = getIconConfig(notification.type);
          return <motion.div key={notification.id} variants={itemAnim} layout data-id="element-806">
                  <Card padding="sm" className={`flex items-start sm:items-center gap-4 transition-colors ${notification.isUnread ? 'bg-white' : 'bg-warm-white/30'}`} data-id="element-807">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${config.bg} ${config.color}`} data-id="element-808">
                      <config.icon className="w-5 h-5" data-id="element-809" />
                    </div>

                    <div className="flex-1 min-w-0" data-id="element-810">
                      <div className="flex items-center gap-2 mb-0.5" data-id="element-811">
                        <h3 className={`text-sm truncate ${notification.isUnread ? 'font-bold text-text-primary' : 'font-medium text-text-secondary'}`} data-id="element-812">
                          {notification.title}
                        </h3>
                        {notification.isUnread && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" data-id="element-813" />}
                      </div>
                      <p className="text-sm text-text-secondary truncate mb-1" data-id="element-814">
                        {notification.description}
                      </p>
                      <p className="text-xs text-text-muted" data-id="element-815">
                        {notification.timeAgo}
                      </p>
                    </div>

                    {notification.actionLabel && <div className="flex-shrink-0 mt-3 sm:mt-0" data-id="element-816">
                        <Button variant="outline" size="sm" className="bg-white" data-id="element-817">
                          {notification.actionLabel}
                        </Button>
                      </div>}
                  </Card>
                </motion.div>;
        })}
          </AnimatePresence>
        </motion.div> : <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="flex flex-col items-center justify-center py-20 text-center" data-id="element-818">
          <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mb-4" data-id="element-819">
            <BellIcon className="w-8 h-8 text-text-muted" data-id="element-820" />
          </div>
          <h3 className="text-lg font-heading font-bold text-text-primary mb-1" data-id="element-821">
            No notifications here
          </h3>
          <p className="text-sm text-text-secondary" data-id="element-822">
            You're all caught up in this view.
          </p>
        </motion.div>}
    </div>;
}