import React, { useState, Children } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { TrendingUpIcon, AlertCircleIcon, CreditCardIcon, SettingsIcon } from 'lucide-react';
export function UsagePage() {
  const [modelPreference, setModelPreference] = useState('Balanced');
  const stagger = {
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
  const itemAnim = {
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
  return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12" data-id="element-1458">
      <div className="mb-8" data-id="element-1459">
        <h1 className="text-3xl font-heading font-bold text-text-primary" data-id="element-1460">
          Usage & Billing
        </h1>
        <p className="text-text-secondary mt-1" data-id="element-1461">
          Monitor your spend, model usage, and manage your plan.
        </p>
      </div>

      <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-8" data-id="element-1462">
        {/* Top Stats */}
        <motion.div variants={itemAnim} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-id="element-1463">
          <Card padding="md" className="bg-primary/5 border-primary/20" data-id="element-1464">
            <p className="text-sm font-medium text-text-secondary mb-2" data-id="element-1465">
              This Month Spend
            </p>
            <div className="flex items-end gap-3" data-id="element-1466">
              <h2 className="text-4xl font-heading font-bold text-primary" data-id="element-1467">
                ₹847
              </h2>
              <span className="flex items-center text-sm font-medium text-amber-600 mb-1" data-id="element-1468">
                <TrendingUpIcon className="w-4 h-4 mr-1" data-id="element-1469" /> +12%
              </span>
            </div>
          </Card>

          <Card padding="md" data-id="element-1470">
            <p className="text-sm font-medium text-text-secondary mb-2" data-id="element-1471">
              Monthly Budget
            </p>
            <h2 className="text-3xl font-heading font-bold text-text-primary mb-3" data-id="element-1472">
              ₹1,500
            </h2>
            <div className="h-2 w-full bg-cream rounded-full overflow-hidden" data-id="element-1473">
              <div className="h-full bg-primary rounded-full" style={{
              width: '56%'
            }} data-id="element-1474"></div>
            </div>
            <p className="text-xs text-text-muted mt-2 text-right" data-id="element-1475">56% used</p>
          </Card>

          <Card padding="md" data-id="element-1476">
            <p className="text-sm font-medium text-text-secondary mb-2" data-id="element-1477">
              Conversations
            </p>
            <div className="flex items-end gap-3" data-id="element-1478">
              <h2 className="text-3xl font-heading font-bold text-text-primary" data-id="element-1479">
                142
              </h2>
              <Badge variant="default" className="bg-green-50 text-green-700 border-green-200 mb-1" data-id="element-1480">
                +12 this week
              </Badge>
            </div>
          </Card>

          <Card padding="md" data-id="element-1481">
            <p className="text-sm font-medium text-text-secondary mb-2" data-id="element-1482">
              Artifacts Generated
            </p>
            <h2 className="text-3xl font-heading font-bold text-text-primary" data-id="element-1483">
              28
            </h2>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8" data-id="element-1484">
          {/* Left Column: Usage Breakdown */}
          <div className="lg:col-span-2 space-y-8" data-id="element-1485">
            {/* Model Usage */}
            <motion.div variants={itemAnim} data-id="element-1486">
              <Card padding="lg" data-id="element-1487">
                <h3 className="text-lg font-heading font-bold text-text-primary mb-6" data-id="element-1488">
                  Model Usage Split
                </h3>

                {/* Stacked Bar */}
                <div className="h-6 w-full rounded-full overflow-hidden flex mb-8" data-id="element-1489">
                  <div className="h-full bg-blue-500" style={{
                  width: '45%'
                }} data-id="element-1490"></div>
                  <div className="h-full bg-purple-500" style={{
                  width: '30%'
                }} data-id="element-1491"></div>
                  <div className="h-full bg-amber-500" style={{
                  width: '15%'
                }} data-id="element-1492"></div>
                  <div className="h-full bg-gray-400" style={{
                  width: '10%'
                }} data-id="element-1493"></div>
                </div>

                {/* Legend */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" data-id="element-1494">
                  <div data-id="element-1495">
                    <div className="flex items-center gap-2 mb-1" data-id="element-1496">
                      <div className="w-3 h-3 rounded-full bg-blue-500" data-id="element-1497"></div>
                      <span className="text-sm font-medium text-text-primary" data-id="element-1498">
                        GPT-4o
                      </span>
                    </div>
                    <p className="text-2xl font-heading font-bold text-text-primary" data-id="element-1499">
                      45%
                    </p>
                    <p className="text-xs text-text-muted" data-id="element-1500">₹381 spend</p>
                  </div>
                  <div data-id="element-1501">
                    <div className="flex items-center gap-2 mb-1" data-id="element-1502">
                      <div className="w-3 h-3 rounded-full bg-purple-500" data-id="element-1503"></div>
                      <span className="text-sm font-medium text-text-primary" data-id="element-1504">
                        Claude 3.5
                      </span>
                    </div>
                    <p className="text-2xl font-heading font-bold text-text-primary" data-id="element-1505">
                      30%
                    </p>
                    <p className="text-xs text-text-muted" data-id="element-1506">₹254 spend</p>
                  </div>
                  <div data-id="element-1507">
                    <div className="flex items-center gap-2 mb-1" data-id="element-1508">
                      <div className="w-3 h-3 rounded-full bg-amber-500" data-id="element-1509"></div>
                      <span className="text-sm font-medium text-text-primary" data-id="element-1510">
                        Perplexity
                      </span>
                    </div>
                    <p className="text-2xl font-heading font-bold text-text-primary" data-id="element-1511">
                      15%
                    </p>
                    <p className="text-xs text-text-muted" data-id="element-1512">₹127 spend</p>
                  </div>
                  <div data-id="element-1513">
                    <div className="flex items-center gap-2 mb-1" data-id="element-1514">
                      <div className="w-3 h-3 rounded-full bg-gray-400" data-id="element-1515"></div>
                      <span className="text-sm font-medium text-text-primary" data-id="element-1516">
                        Other
                      </span>
                    </div>
                    <p className="text-2xl font-heading font-bold text-text-primary" data-id="element-1517">
                      10%
                    </p>
                    <p className="text-xs text-text-muted" data-id="element-1518">₹85 spend</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Workspace Usage */}
            <motion.div variants={itemAnim} data-id="element-1519">
              <Card padding="lg" data-id="element-1520">
                <h3 className="text-lg font-heading font-bold text-text-primary mb-6" data-id="element-1521">
                  Top Workspaces by Cost
                </h3>
                <div className="space-y-5" data-id="element-1522">
                  {[{
                  name: 'Trustopay GTM',
                  cost: 312,
                  percent: 100
                }, {
                  name: 'Market Research Hub',
                  cost: 198,
                  percent: 63
                }, {
                  name: 'Fundraising & Pitch',
                  cost: 156,
                  percent: 50
                }, {
                  name: 'Personal Space',
                  cost: 89,
                  percent: 28
                }, {
                  name: 'Other',
                  cost: 92,
                  percent: 29
                }].map((ws, i) => <div key={i} data-id="element-1523">
                      <div className="flex justify-between text-sm mb-2" data-id="element-1524">
                        <span className="font-medium text-text-primary" data-id="element-1525">
                          {ws.name}
                        </span>
                        <span className="text-text-secondary font-mono" data-id="element-1526">
                          ₹{ws.cost}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-cream rounded-full overflow-hidden" data-id="element-1527">
                        <div className="h-full bg-primary/60 rounded-full" style={{
                      width: `${ws.percent}%`
                    }} data-id="element-1528"></div>
                      </div>
                    </div>)}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Right Column: Controls & Billing */}
          <div className="space-y-8" data-id="element-1529">
            {/* Budget Controls */}
            <motion.div variants={itemAnim} data-id="element-1530">
              <Card padding="lg" data-id="element-1531">
                <div className="flex items-center gap-2 mb-6" data-id="element-1532">
                  <SettingsIcon className="w-5 h-5 text-primary" data-id="element-1533" />
                  <h3 className="text-lg font-heading font-bold text-text-primary" data-id="element-1534">
                    Budget Controls
                  </h3>
                </div>

                <div className="space-y-6" data-id="element-1535">
                  <div data-id="element-1536">
                    <label className="block text-sm font-medium text-text-secondary mb-2" data-id="element-1537">
                      Monthly Hard Limit
                    </label>
                    <div className="flex items-center gap-3" data-id="element-1538">
                      <div className="relative flex-1" data-id="element-1539">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" data-id="element-1540">
                          ₹
                        </span>
                        <input type="number" defaultValue="1500" className="w-full bg-white border border-border rounded-xl pl-8 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" data-id="element-1541" />
                      </div>
                      <Button variant="secondary" size="sm" data-id="element-1542">
                        Save
                      </Button>
                    </div>
                  </div>

                  <div data-id="element-1543">
                    <label className="block text-sm font-medium text-text-secondary mb-2" data-id="element-1544">
                      Warning Threshold
                    </label>
                    <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-100 rounded-xl" data-id="element-1545">
                      <div className="flex items-center gap-2 text-amber-700 text-sm font-medium" data-id="element-1546">
                        <AlertCircleIcon className="w-4 h-4" data-id="element-1547" />
                        Alert at 80% (₹1,200)
                      </div>
                      <button className="text-xs text-amber-700 underline font-medium" data-id="element-1548">
                        Edit
                      </button>
                    </div>
                  </div>

                  <div data-id="element-1549">
                    <label className="block text-sm font-medium text-text-secondary mb-3" data-id="element-1550">
                      Default Model Preference
                    </label>
                    <div className="bg-cream p-1 rounded-xl flex" data-id="element-1551">
                      {['Faster', 'Balanced', 'Best'].map(pref => <button key={pref} onClick={() => setModelPreference(pref)} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${modelPreference === pref ? 'bg-white shadow-sm text-primary' : 'text-text-secondary hover:text-text-primary'}`} data-id="element-1552">
                          {pref}
                        </button>)}
                    </div>
                    <p className="text-xs text-text-muted mt-2 text-center" data-id="element-1553">
                      {modelPreference === 'Faster' && 'Prioritizes speed and lower cost (e.g. Claude Haiku, GPT-4o-mini).'}
                      {modelPreference === 'Balanced' && 'Smart routing based on task complexity.'}
                      {modelPreference === 'Best' && 'Always uses the most capable, expensive models (e.g. Opus, GPT-4o).'}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Billing */}
            <motion.div variants={itemAnim} data-id="element-1554">
              <Card padding="lg" data-id="element-1555">
                <div className="flex items-center gap-2 mb-6" data-id="element-1556">
                  <CreditCardIcon className="w-5 h-5 text-primary" data-id="element-1557" />
                  <h3 className="text-lg font-heading font-bold text-text-primary" data-id="element-1558">
                    Billing
                  </h3>
                </div>

                <div className="p-4 bg-warm-white/50 border border-border/50 rounded-xl mb-6" data-id="element-1559">
                  <div className="flex justify-between items-start mb-2" data-id="element-1560">
                    <span className="text-sm text-text-secondary" data-id="element-1561">
                      Current Plan
                    </span>
                    <Badge variant="default" className="bg-primary text-white border-none" data-id="element-1562">
                      Pro Plan
                    </Badge>
                  </div>
                  <p className="text-2xl font-heading font-bold text-text-primary" data-id="element-1563">
                    ₹1,500
                    <span className="text-sm font-normal text-text-muted" data-id="element-1564">
                      /month
                    </span>
                  </p>
                  <p className="text-xs text-text-muted mt-2" data-id="element-1565">
                    Next billing date: January 15, 2026
                  </p>
                </div>

                <div className="flex items-center justify-between mb-6" data-id="element-1566">
                  <div className="flex items-center gap-3" data-id="element-1567">
                    <div className="w-10 h-6 bg-slate-200 rounded flex items-center justify-center text-[10px] font-bold text-slate-600" data-id="element-1568">
                      VISA
                    </div>
                    <span className="text-sm font-medium text-text-primary" data-id="element-1569">
                      •••• 4242
                    </span>
                  </div>
                  <button className="text-sm text-primary font-medium hover:underline" data-id="element-1570">
                    Update
                  </button>
                </div>

                <Button variant="outline" className="w-full" data-id="element-1571">
                  Manage Subscription
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>;
}