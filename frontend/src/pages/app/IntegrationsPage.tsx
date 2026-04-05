import React, { useState, Children } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { MessageSquareIcon, FolderIcon, GitBranchIcon, FileTextIcon, MailIcon, DatabaseIcon, LayoutGridIcon, CalendarIcon, CheckCircle2Icon, PuzzleIcon } from 'lucide-react';
interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  status: 'connected' | 'connect';
  autonomous: boolean;
}
const MOCK_INTEGRATIONS: Integration[] = [{
  id: 'slack',
  name: 'Slack',
  description: 'Send messages, manage channels, and read context.',
  icon: MessageSquareIcon,
  status: 'connected',
  autonomous: false
}, {
  id: 'gdrive',
  name: 'Google Drive',
  description: 'Read, write, and organize files and folders.',
  icon: FolderIcon,
  status: 'connected',
  autonomous: true
}, {
  id: 'gmail',
  name: 'Gmail',
  description: 'Read emails, draft replies, and send messages.',
  icon: MailIcon,
  status: 'connected',
  autonomous: false
}, {
  id: 'github',
  name: 'GitHub',
  description: 'Manage issues, pull requests, and read repositories.',
  icon: GitBranchIcon,
  status: 'connect',
  autonomous: false
}, {
  id: 'notion',
  name: 'Notion',
  description: 'Read and write to databases and pages.',
  icon: FileTextIcon,
  status: 'connect',
  autonomous: false
}, {
  id: 'salesforce',
  name: 'Salesforce',
  description: 'Manage leads, contacts, and opportunities.',
  icon: DatabaseIcon,
  status: 'connect',
  autonomous: false
}, {
  id: 'gcal',
  name: 'Google Calendar',
  description: 'Schedule meetings and read availability.',
  icon: CalendarIcon,
  status: 'connected',
  autonomous: true
}, {
  id: 'trello',
  name: 'Trello',
  description: 'Manage boards, lists, and cards.',
  icon: LayoutGridIcon,
  status: 'connect',
  autonomous: false
}];
export function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>(MOCK_INTEGRATIONS);
  const toggleAutonomous = (id: string) => {
    setIntegrations(integrations.map(integration => integration.id === id ? {
      ...integration,
      autonomous: !integration.autonomous
    } : integration));
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
  return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12" data-id="element-823">
      <div className="mb-8 flex items-start justify-between" data-id="element-824">
        <div data-id="element-825">
          <h1 className="text-3xl font-heading font-bold text-text-primary flex items-center gap-3" data-id="element-826">
            Integrations
            <Badge variant="default" className="bg-primary/10 text-primary border-none text-xs flex items-center gap-1" data-id="element-827">
              <PuzzleIcon className="w-3 h-3" data-id="element-828" /> Powered by Composio
            </Badge>
          </h1>
          <p className="text-text-secondary mt-2" data-id="element-829">
            Connect your tools to let Aruna act on your behalf.
          </p>
        </div>
      </div>

      <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" data-id="element-830">
        {integrations.map(integration => <motion.div key={integration.id} variants={itemAnim} data-id="element-831">
            <Card padding="md" className="h-full flex flex-col relative" data-id="element-832">
              <div className="flex items-start justify-between mb-4" data-id="element-833">
                <div className="w-12 h-12 rounded-xl bg-cream flex items-center justify-center text-text-primary" data-id="element-834">
                  <integration.icon className="w-6 h-6" data-id="element-835" />
                </div>
                {integration.status === 'connected' ? <Badge variant="default" className="bg-emerald-50 text-emerald-700 border-none flex items-center gap-1" data-id="element-836">
                    <CheckCircle2Icon className="w-3 h-3" data-id="element-837" /> Connected
                  </Badge> : <Button variant="outline" size="sm" className="h-8" data-id="element-838">
                    Connect
                  </Button>}
              </div>

              <div className="mb-4 flex-1" data-id="element-839">
                <h3 className="text-lg font-heading font-bold text-text-primary mb-1" data-id="element-840">
                  {integration.name}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed" data-id="element-841">
                  {integration.description}
                </p>
              </div>

              {integration.status === 'connected' && <div className="pt-4 border-t border-border/50 mt-auto" data-id="element-842">
                  <div className="flex items-center justify-between" data-id="element-843">
                    <div data-id="element-844">
                      <p className="text-xs font-medium text-text-primary" data-id="element-845">
                        Autonomous Use
                      </p>
                      <p className="text-[10px] text-text-muted mt-0.5" data-id="element-846">
                        {integration.autonomous ? 'Aruna can act without asking' : 'Requires approval per action'}
                      </p>
                    </div>
                    <button onClick={() => toggleAutonomous(integration.id)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${integration.autonomous ? 'bg-primary' : 'bg-border'}`} data-id="element-847">
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${integration.autonomous ? 'translate-x-4.5' : 'translate-x-1'}`} data-id="element-848" />
                    </button>
                  </div>
                </div>}
            </Card>
          </motion.div>)}
      </motion.div>
    </div>;
}