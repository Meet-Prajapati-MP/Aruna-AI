import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { SearchIcon, ArchiveIcon, FileTextIcon, ShareIcon, GlobeIcon, BookmarkIcon } from 'lucide-react';
export function ResearchPage() {
  const [query, setQuery] = useState('Indian fintech market 2025');
  const [isSearching, setIsSearching] = useState(false);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsSearching(true);
      setTimeout(() => setIsSearching(false), 1500);
    }
  };
  return <div className="flex h-full bg-white overflow-hidden" data-id="element-1199">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto" data-id="element-1200">
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12" data-id="element-1201">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative mb-10" data-id="element-1202">
            <SearchIcon className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-primary" data-id="element-1203" />
            <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="What would you like to research?" className="w-full bg-white border-2 border-primary/20 rounded-2xl pl-14 pr-4 py-5 text-lg font-medium shadow-soft focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all" data-id="element-1204" />
            <Button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl" isLoading={isSearching} data-id="element-1205">
              Research
            </Button>
          </form>

          {/* Research Results */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }} data-id="element-1206">
            <div className="flex items-center justify-between mb-6" data-id="element-1207">
              <div data-id="element-1208">
                <h1 className="text-3xl font-heading font-bold text-text-primary" data-id="element-1209">
                  Indian Fintech Market 2025
                </h1>
                <p className="text-sm text-text-secondary mt-2 flex items-center gap-2" data-id="element-1210">
                  <Badge variant="default" className="bg-blue-50 text-blue-700 border-blue-200" data-id="element-1211">
                    Deep Research
                  </Badge>
                  <span data-id="element-1212">Synthesized from 14 sources</span>
                  <span data-id="element-1213">•</span>
                  <span data-id="element-1214">Just now</span>
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2" data-id="element-1215">
                <Button variant="outline" size="sm" leftIcon={<ArchiveIcon className="w-4 h-4" data-id="element-1217" />} data-id="element-1216">
                  Save to Vault
                </Button>
                <Button variant="outline" size="sm" leftIcon={<FileTextIcon className="w-4 h-4" data-id="element-1219" />} data-id="element-1218">
                  Export Doc
                </Button>
                <Button variant="outline" size="sm" className="px-3" data-id="element-1220">
                  <ShareIcon className="w-4 h-4" data-id="element-1221" />
                </Button>
              </div>
            </div>

            <Card padding="lg" className="prose prose-sm sm:prose-base max-w-none prose-headings:font-heading prose-headings:font-bold prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline" data-id="element-1222">
              <p className="lead text-lg text-text-secondary font-medium" data-id="element-1223">
                The Indian fintech market is projected to reach $150 billion by
                2025, driven by rapid digital adoption, favorable regulatory
                frameworks, and increasing smartphone penetration. The sector is
                transitioning from payments-led growth to lending and wealth
                management.
                <sup className="inline-flex items-center justify-center w-4 h-4 bg-cream text-[10px] font-bold rounded-full ml-1 text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors" data-id="element-1224">
                  1
                </sup>
              </p>

              <h3 className="text-xl mt-8 mb-4" data-id="element-1225">Key Findings</h3>
              <ul className="space-y-2" data-id="element-1226">
                <li data-id="element-1227">
                  <strong data-id="element-1228">Digital Lending Surge:</strong> Digital lending is
                  expected to outpace payments, growing at a CAGR of 35% to
                  reach $350 billion in portfolio size.
                  <sup className="inline-flex items-center justify-center w-4 h-4 bg-cream text-[10px] font-bold rounded-full ml-1 text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors" data-id="element-1229">
                    2
                  </sup>
                </li>
                <li data-id="element-1230">
                  <strong data-id="element-1231">B2B Fintech Expansion:</strong> Startups focusing on
                  SME digitization, invoice financing, and corporate spend
                  management are seeing the highest venture capital influx.
                </li>
                <li data-id="element-1232">
                  <strong data-id="element-1233">Regulatory Maturation:</strong> The RBI's recent
                  guidelines on digital lending and self-regulatory
                  organizations (SROs) have stabilized the market, favoring
                  compliant players.
                  <sup className="inline-flex items-center justify-center w-4 h-4 bg-cream text-[10px] font-bold rounded-full ml-1 text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors" data-id="element-1234">
                    3
                  </sup>
                </li>
              </ul>

              <h3 className="text-xl mt-8 mb-4" data-id="element-1235">Market Size & Segments</h3>
              <p data-id="element-1236">
                Payments still dominate transaction volume, largely due to UPI,
                which processes over 10 billion transactions monthly. However,
                revenue pools are shifting. Wealthtech and Insurtech are
                emerging as high-margin segments, targeting the growing middle
                class in Tier 2 and Tier 3 cities.
              </p>

              <h3 className="text-xl mt-8 mb-4" data-id="element-1237">Key Players & Landscape</h3>
              <p data-id="element-1238">
                The landscape remains highly competitive. Incumbents like
                PhonePe and Google Pay dominate consumer payments, while players
                like Razorpay and Pine Labs are aggressively expanding their
                merchant services. In lending, NBFC-fintech partnerships are the
                dominant model, with companies like KreditBee and Lendingkart
                leading the B2B space.
                <sup className="inline-flex items-center justify-center w-4 h-4 bg-cream text-[10px] font-bold rounded-full ml-1 text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors" data-id="element-1239">
                  4
                </sup>
              </p>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Sources Panel (Right Side) */}
      <div className="hidden lg:flex w-96 flex-col border-l border-border bg-warm-white/30 h-full flex-shrink-0" data-id="element-1240">
        <div className="p-5 border-b border-border/50 bg-white flex items-center justify-between" data-id="element-1241">
          <h2 className="font-heading font-bold text-text-primary flex items-center gap-2" data-id="element-1242">
            <GlobeIcon className="w-5 h-5 text-primary" data-id="element-1243" />
            Sources
            <Badge variant="default" className="ml-2 text-xs" data-id="element-1244">
              14
            </Badge>
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3" data-id="element-1245">
          {[{
          id: 1,
          title: 'India Fintech Report 2024',
          url: 'bain.com/insights',
          color: 'bg-red-500',
          snippet: 'Projected to reach $150B by 2025 with lending taking the lead.'
        }, {
          id: 2,
          title: 'Digital Lending Landscape',
          url: 'rbi.org.in',
          color: 'bg-blue-600',
          snippet: 'New guidelines establish framework for NBFC partnerships.'
        }, {
          id: 3,
          title: 'SME Digitization Trends',
          url: 'techcrunch.com',
          color: 'bg-green-500',
          snippet: 'B2B fintechs see record funding in Q3 2024.'
        }, {
          id: 4,
          title: 'UPI Transaction Data',
          url: 'npci.org.in',
          color: 'bg-orange-500',
          snippet: 'Crosses 10 billion monthly transactions milestone.'
        }, {
          id: 5,
          title: 'Wealthtech Growth in Tier 2',
          url: 'livemint.com',
          color: 'bg-purple-500',
          snippet: 'Retail participation drives 40% YoY growth in wealthtech.'
        }].map(source => <Card key={source.id} padding="sm" className="bg-white hover:border-primary/30 transition-colors group" data-id="element-1246">
              <div className="flex items-start gap-3" data-id="element-1247">
                <div className="flex-shrink-0 mt-1" data-id="element-1248">
                  <div className="relative" data-id="element-1249">
                    <div className={`w-6 h-6 rounded-full ${source.color} flex items-center justify-center text-[10px] font-bold text-white`} data-id="element-1250">
                      {source.id}
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0" data-id="element-1251">
                  <h4 className="text-sm font-semibold text-text-primary line-clamp-1 group-hover:text-primary transition-colors" data-id="element-1252">
                    {source.title}
                  </h4>
                  <p className="text-[10px] text-text-muted truncate mb-1" data-id="element-1253">
                    {source.url}
                  </p>
                  <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed" data-id="element-1254">
                    {source.snippet}
                  </p>
                </div>
                <button className="p-1.5 text-text-muted hover:text-primary rounded-md hover:bg-cream transition-colors opacity-0 group-hover:opacity-100" data-id="element-1255">
                  <BookmarkIcon className="w-4 h-4" data-id="element-1256" />
                </button>
              </div>
            </Card>)}
        </div>

        <div className="p-4 border-t border-border/50 bg-white" data-id="element-1257">
          <h3 className="text-sm font-semibold text-text-primary mb-2" data-id="element-1258">
            Research Notes
          </h3>
          <textarea className="w-full bg-warm-white border border-border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none h-32" placeholder="Jot down ideas or synthesize thoughts here..." data-id="element-1259"></textarea>
        </div>
      </div>
    </div>;
}