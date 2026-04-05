import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { UserIcon, PaletteIcon, BellIcon, BrainCircuitIcon, LinkIcon, SparklesIcon, CalendarIcon, CheckSquareIcon, MailIcon, MicIcon, WatchIcon } from 'lucide-react';
export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const tabs = [{
    id: 'profile',
    label: 'Profile',
    icon: UserIcon
  }, {
    id: 'appearance',
    label: 'Appearance',
    icon: PaletteIcon
  }, {
    id: 'notifications',
    label: 'Notifications',
    icon: BellIcon
  }, {
    id: 'memory',
    label: 'Memory',
    icon: BrainCircuitIcon
  }, {
    id: 'tools',
    label: 'Connected Tools',
    icon: LinkIcon
  }, {
    id: 'future',
    label: 'Future Integrations',
    icon: SparklesIcon
  }];
  return <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12" data-id="element-1260">
      <div className="mb-8" data-id="element-1261">
        <h1 className="text-3xl font-serif text-text-primary" data-id="element-1262">Settings</h1>
        <p className="text-text-secondary mt-1" data-id="element-1263">
          Manage your account and preferences.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8" data-id="element-1264">
        {/* Left Nav */}
        <div className="w-full md:w-64 flex-shrink-0" data-id="element-1265">
          <nav className="space-y-1" data-id="element-1266">
            {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-cream hover:text-text-primary'}`} data-id="element-1267">
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-primary' : 'text-text-muted'}`} data-id="element-1268" />
                {tab.label}
              </button>)}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1" data-id="element-1269">
          <Card padding="lg" className="min-h-[400px]" data-id="element-1270">
            {activeTab === 'profile' && <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} className="space-y-6" data-id="element-1271">
                <div data-id="element-1272">
                  <h2 className="text-lg font-medium text-text-primary mb-4" data-id="element-1273">
                    Profile Information
                  </h2>
                  <div className="flex items-center gap-6 mb-6" data-id="element-1274">
                    <div className="w-20 h-20 rounded-full bg-rose-light/30 border-2 border-rose-light/50 flex items-center justify-center text-primary-dark font-serif text-2xl" data-id="element-1275">
                      AL
                    </div>
                    <div data-id="element-1276">
                      <Button variant="outline" size="sm" data-id="element-1277">
                        Change Avatar
                      </Button>
                      <p className="text-xs text-text-muted mt-2" data-id="element-1278">
                        JPG, GIF or PNG. Max size of 2MB.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 max-w-md" data-id="element-1279">
                  <div data-id="element-1280">
                    <label className="block text-sm font-medium text-text-secondary mb-1" data-id="element-1281">
                      Full Name
                    </label>
                    <input type="text" defaultValue="Alex Doe" className="w-full bg-white border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" data-id="element-1282" />
                  </div>
                  <div data-id="element-1283">
                    <label className="block text-sm font-medium text-text-secondary mb-1" data-id="element-1284">
                      Email Address
                    </label>
                    <input type="email" defaultValue="alex@example.com" className="w-full bg-white border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" data-id="element-1285" />
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50" data-id="element-1286">
                  <Button data-id="element-1287">Save Changes</Button>
                </div>
              </motion.div>}

            {activeTab === 'memory' && <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} className="space-y-6" data-id="element-1288">
                <div data-id="element-1289">
                  <h2 className="text-lg font-medium text-text-primary mb-1" data-id="element-1290">
                    Context Memory
                  </h2>
                  <p className="text-sm text-text-secondary mb-6" data-id="element-1291">
                    Aruna remembers details across sessions to provide better
                    assistance.
                  </p>
                </div>

                <div className="space-y-4" data-id="element-1292">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-warm-white/50" data-id="element-1293">
                    <div data-id="element-1294">
                      <h4 className="font-medium text-text-primary" data-id="element-1295">
                        Personal Space Memory
                      </h4>
                      <p className="text-xs text-text-secondary mt-1" data-id="element-1296">
                        Remember goals, routines, and personal preferences.
                      </p>
                    </div>
                    <div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer" data-id="element-1297">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" data-id="element-1298"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-warm-white/50" data-id="element-1299">
                    <div data-id="element-1300">
                      <h4 className="font-medium text-text-primary" data-id="element-1301">
                        Professional Space Memory
                      </h4>
                      <p className="text-xs text-text-secondary mt-1" data-id="element-1302">
                        Remember business context, projects, and writing style.
                      </p>
                    </div>
                    <div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer" data-id="element-1303">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" data-id="element-1304"></div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-border/50" data-id="element-1305">
                  <h4 className="font-medium text-red-600 mb-2" data-id="element-1306">Danger Zone</h4>
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" data-id="element-1307">
                    Clear All Memory
                  </Button>
                </div>
              </motion.div>}

            {activeTab === 'future' && <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} className="space-y-6" data-id="element-1308">
                <div data-id="element-1309">
                  <h2 className="text-lg font-medium text-text-primary mb-1" data-id="element-1310">
                    Future Integrations
                  </h2>
                  <p className="text-sm text-text-secondary mb-6" data-id="element-1311">
                    Sneak peek at what we're building for the Aruna ecosystem.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4" data-id="element-1312">
                  {[{
                icon: CalendarIcon,
                name: 'Calendar Sync',
                desc: 'Aruna manages your schedule automatically.'
              }, {
                icon: CheckSquareIcon,
                name: 'Tasks Integration',
                desc: 'Turn plans directly into actionable tasks.'
              }, {
                icon: MailIcon,
                name: 'Email Assistant',
                desc: 'Draft and organize emails based on context.'
              }, {
                icon: MicIcon,
                name: 'Voice Mode',
                desc: 'Talk to Aruna naturally while on the go.'
              }, {
                icon: WatchIcon,
                name: 'Wearables',
                desc: 'Ambient assistance from your wrist or pendant.'
              }].map((item, i) => <div key={i} className="p-4 rounded-xl border border-border bg-white flex flex-col" data-id="element-1313">
                      <div className="flex justify-between items-start mb-3" data-id="element-1314">
                        <div className="w-10 h-10 rounded-lg bg-cream flex items-center justify-center text-text-secondary" data-id="element-1315">
                          <item.icon className="w-5 h-5" data-id="element-1316" />
                        </div>
                        <Badge variant="default" className="bg-warm-white text-[10px]" data-id="element-1317">
                          Coming Soon
                        </Badge>
                      </div>
                      <h4 className="font-medium text-text-primary" data-id="element-1318">
                        {item.name}
                      </h4>
                      <p className="text-xs text-text-secondary mt-1" data-id="element-1319">
                        {item.desc}
                      </p>
                    </div>)}
                </div>
              </motion.div>}

            {/* Placeholders for other tabs */}
            {['appearance', 'notifications', 'tools'].includes(activeTab) && <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} className="flex flex-col items-center justify-center h-64 text-center" data-id="element-1320">
                <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center text-text-muted mb-4" data-id="element-1321">
                  <SettingsIcon className="w-8 h-8" data-id="element-1322" />
                </div>
                <h3 className="text-lg font-medium text-text-primary mb-1" data-id="element-1323">
                  Coming Soon
                </h3>
                <p className="text-sm text-text-secondary max-w-xs" data-id="element-1324">
                  These settings are currently under development.
                </p>
              </motion.div>}
          </Card>
        </div>
      </div>
    </div>;
}
// Helper icon for placeholder
function SettingsIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-id="element-1325">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" data-id="element-1326" />
      <circle cx="12" cy="12" r="3" data-id="element-1327" />
    </svg>;
}