import React, { useState, Children } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { UsersIcon, FileTextIcon, PresentationIcon, SheetIcon, MessageSquareIcon, CheckCircle2Icon } from 'lucide-react';
export function SharedPage() {
  const [activeTab, setActiveTab] = useState('Workspaces');
  const tabs = ['Workspaces', 'Outputs', 'Activity'];
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
  return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12" data-id="element-1328">
      <div className="mb-8" data-id="element-1329">
        <h1 className="text-3xl font-heading font-bold text-text-primary" data-id="element-1330">
          Shared
        </h1>
        <p className="text-text-secondary mt-1" data-id="element-1331">
          Collaborate with your team across workspaces and artifacts.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border/50 mb-8" data-id="element-1332">
        {tabs.map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'}`} data-id="element-1333">
            {tab}
          </button>)}
      </div>

      {activeTab === 'Workspaces' && <motion.div variants={stagger} initial="hidden" animate="visible" className="grid md:grid-cols-3 gap-5" data-id="element-1334">
          {[{
        emoji: '📊',
        name: 'Market Research Hub',
        members: 3,
        role: 'Admin'
      }, {
        emoji: '🎯',
        name: 'Q4 OKR Planning',
        members: 4,
        role: 'Editor'
      }, {
        emoji: '🚀',
        name: 'Trustopay GTM',
        members: 2,
        role: 'Viewer'
      }].map((ws, i) => <motion.div key={i} variants={itemAnim} data-id="element-1335">
              <Card padding="md" className="h-full flex flex-col" data-id="element-1336">
                <div className="flex justify-between items-start mb-4" data-id="element-1337">
                  <span className="text-3xl" data-id="element-1338">{ws.emoji}</span>
                  <Badge variant="default" className="bg-warm-white border-none" data-id="element-1339">
                    {ws.role}
                  </Badge>
                </div>
                <h3 className="text-lg font-heading font-bold text-text-primary mb-4" data-id="element-1340">
                  {ws.name}
                </h3>
                <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between" data-id="element-1341">
                  <div className="flex -space-x-2" data-id="element-1342">
                    {[...Array(ws.members)].map((_, j) => <div key={j} className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white ${['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500'][j % 4]}`} data-id="element-1343">
                        {['AL', 'SR', 'JD', 'MK'][j % 4]}
                      </div>)}
                  </div>
                  <Button variant="outline" size="sm" data-id="element-1344">
                    Open
                  </Button>
                </div>
              </Card>
            </motion.div>)}
        </motion.div>}

      {activeTab === 'Outputs' && <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-3" data-id="element-1345">
          {[{
        icon: PresentationIcon,
        name: 'Seed Round Pitch Deck v3',
        author: 'Sarah R.',
        date: 'Today',
        type: 'Deck',
        color: 'text-amber-600 bg-amber-50'
      }, {
        icon: FileTextIcon,
        name: 'Q3 Market Analysis Report',
        author: 'Alex L.',
        date: 'Yesterday',
        type: 'Report',
        color: 'text-blue-600 bg-blue-50'
      }, {
        icon: SheetIcon,
        name: 'Financial Projections 2025',
        author: 'John D.',
        date: '2 days ago',
        type: 'Sheet',
        color: 'text-green-600 bg-green-50'
      }, {
        icon: FileTextIcon,
        name: 'SaaS Competitor Matrix',
        author: 'Sarah R.',
        date: 'Last week',
        type: 'Doc',
        color: 'text-purple-600 bg-purple-50'
      }].map((output, i) => <motion.div key={i} variants={itemAnim} data-id="element-1346">
              <Card padding="sm" className="flex items-center gap-4" data-id="element-1347">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${output.color}`} data-id="element-1348">
                  <output.icon className="w-5 h-5" data-id="element-1349" />
                </div>
                <div className="flex-1 min-w-0" data-id="element-1350">
                  <h3 className="text-base font-medium text-text-primary truncate mb-1" data-id="element-1351">
                    {output.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-text-muted" data-id="element-1352">
                    <span data-id="element-1353">Shared by {output.author}</span>
                    <span data-id="element-1354">•</span>
                    <span data-id="element-1355">{output.date}</span>
                    <Badge variant="default" className="bg-warm-white border-none ml-2" data-id="element-1356">
                      {output.type}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0" data-id="element-1357">
                  <Button variant="ghost" size="sm" leftIcon={<MessageSquareIcon className="w-4 h-4" data-id="element-1359" />} data-id="element-1358">
                    Comment
                  </Button>
                  <Button variant="outline" size="sm" data-id="element-1360">
                    Open
                  </Button>
                </div>
              </Card>
            </motion.div>)}
        </motion.div>}

      {activeTab === 'Activity' && <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl" data-id="element-1361">
          <Card padding="lg" data-id="element-1362">
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent" data-id="element-1363">
              {[{
            user: 'SR',
            name: 'Sarah R.',
            action: 'approved the workflow',
            target: 'Client Onboarding',
            time: '10 mins ago',
            icon: CheckCircle2Icon,
            color: 'bg-green-500'
          }, {
            user: 'AL',
            name: 'Alex L.',
            action: 'shared a new output',
            target: 'Q3 Market Analysis',
            time: '2 hours ago',
            icon: FileTextIcon,
            color: 'bg-blue-500'
          }, {
            user: 'JD',
            name: 'John D.',
            action: 'commented on',
            target: 'Financial Projections',
            time: 'Yesterday',
            icon: MessageSquareIcon,
            color: 'bg-amber-500'
          }, {
            user: 'MK',
            name: 'Maya K.',
            action: 'joined workspace',
            target: 'Market Research Hub',
            time: '2 days ago',
            icon: UsersIcon,
            color: 'bg-purple-500'
          }].map((act, i) => <motion.div key={i} variants={itemAnim} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active" data-id="element-1364">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" data-id="element-1365">
                    <div className={`w-full h-full rounded-full flex items-center justify-center text-[10px] font-bold text-white ${act.color}`} data-id="element-1366">
                      {act.user}
                    </div>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border/50 bg-warm-white/30 shadow-sm" data-id="element-1367">
                    <div className="flex items-center justify-between mb-1" data-id="element-1368">
                      <span className="font-medium text-sm text-text-primary" data-id="element-1369">
                        {act.name}
                      </span>
                      <span className="text-xs text-text-muted" data-id="element-1370">
                        {act.time}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary" data-id="element-1371">
                      {act.action}{' '}
                      <span className="font-medium text-text-primary" data-id="element-1372">
                        {act.target}
                      </span>
                    </p>
                  </div>
                </motion.div>)}
            </div>
          </Card>
        </motion.div>}

      {/* Team Members Section */}
      <div className="mt-16 pt-12 border-t border-border/50" data-id="element-1373">
        <h2 className="text-xl font-heading font-bold text-text-primary mb-6" data-id="element-1374">
          Team Members
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-id="element-1375">
          {[{
          name: 'Alex L.',
          email: 'alex@company.com',
          role: 'Admin',
          initials: 'AL',
          color: 'bg-blue-500'
        }, {
          name: 'Sarah R.',
          email: 'sarah@company.com',
          role: 'Editor',
          initials: 'SR',
          color: 'bg-emerald-500'
        }, {
          name: 'John D.',
          email: 'john@company.com',
          role: 'Editor',
          initials: 'JD',
          color: 'bg-amber-500'
        }, {
          name: 'Maya K.',
          email: 'maya@company.com',
          role: 'Viewer',
          initials: 'MK',
          color: 'bg-purple-500'
        }].map((member, i) => <Card key={i} padding="sm" className="flex items-center gap-3" data-id="element-1376">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white ${member.color}`} data-id="element-1377">
                {member.initials}
              </div>
              <div className="flex-1 min-w-0" data-id="element-1378">
                <h4 className="text-sm font-medium text-text-primary truncate" data-id="element-1379">
                  {member.name}
                </h4>
                <p className="text-xs text-text-muted truncate" data-id="element-1380">
                  {member.email}
                </p>
              </div>
              <Badge variant="default" className="bg-warm-white border-none text-[10px]" data-id="element-1381">
                {member.role}
              </Badge>
            </Card>)}
        </div>
      </div>
    </div>;
}