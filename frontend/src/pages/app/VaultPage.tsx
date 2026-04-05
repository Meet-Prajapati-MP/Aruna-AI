import React, { useEffect, useMemo, useState, useRef, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { FolderIcon, FolderPlusIcon, UploadCloudIcon, FileTextIcon, SheetIcon, PresentationIcon, ImageIcon, FileIcon, MoreVerticalIcon, ChevronRightIcon, LayoutGridIcon, ListIcon, XIcon, DownloadIcon, Trash2Icon, Edit2Icon, MoveIcon, ExternalLinkIcon, SearchIcon, FilterIcon, ChevronDownIcon } from 'lucide-react';
// --- Types & Mock Data ---
interface VaultItem {
  id: string;
  name: string;
  size: string;
  date: string;
  workspace: string;
  uploader: string;
}
const initialItems: VaultItem[] = [{
  id: '4',
  name: 'Fintech Research Report.pdf',
  size: '5.4 MB',
  date: 'Oct 15, 2025',
  workspace: 'Market Research Hub',
  uploader: 'Research Agent'
}, {
  id: '5',
  name: 'Weekly Reflection Template.docx',
  size: '34 KB',
  date: 'Oct 14, 2025',
  workspace: 'Morning Routines',
  uploader: 'Alex L.'
}, {
  id: '6',
  name: 'Seed Round Financials.xlsx',
  size: '1.1 MB',
  date: 'Oct 13, 2025',
  workspace: 'Fundraising & Pitch',
  uploader: 'Alex L.'
}, {
  id: '8',
  name: 'Meeting Notes.docx',
  size: '156 KB',
  date: 'Oct 01, 2025',
  workspace: 'Trustopay GTM',
  uploader: 'Alex L.'
}, {
  id: '9',
  name: 'Project Timeline.xlsx',
  size: '340 KB',
  date: 'Sep 28, 2025',
  workspace: 'Trustopay GTM',
  uploader: 'Planning Agent'
}, {
  id: '10',
  name: 'Trustopay Business Plan.pdf',
  size: '1.2 MB',
  date: 'Sep 15, 2025',
  workspace: 'Trustopay GTM',
  uploader: 'Alex L.'
}, {
  id: '11',
  name: 'Market Analysis Q4.xlsx',
  size: '890 KB',
  date: 'Sep 10, 2025',
  workspace: 'Market Research Hub',
  uploader: 'Research Agent'
}, {
  id: '12',
  name: 'Pitch Deck v2.pptx',
  size: '4.5 MB',
  date: 'Sep 05, 2025',
  workspace: 'Fundraising & Pitch',
  uploader: 'Alex L.'
}, {
  id: '13',
  name: 'Japan Trip Itinerary.pdf',
  size: '2.1 MB',
  date: 'Aug 20, 2025',
  workspace: 'Japan Trip',
  uploader: 'Planning Agent'
}, {
  id: '16',
  name: 'Product Mockup.png',
  size: '3.2 MB',
  date: 'Jul 10, 2025',
  workspace: 'Trustopay GTM',
  uploader: 'Alex L.'
}];
// --- Helpers ---
const getFileDetails = (name: string) => {
  const ext = name.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf':
      return {
        icon: FileTextIcon,
        color: 'text-red-500',
        bg: 'bg-red-50',
        type: 'PDF Document'
      };
    case 'xlsx':
    case 'csv':
      return {
        icon: SheetIcon,
        color: 'text-green-600',
        bg: 'bg-green-50',
        type: 'Spreadsheet'
      };
    case 'docx':
    case 'doc':
      return {
        icon: FileTextIcon,
        color: 'text-blue-500',
        bg: 'bg-blue-50',
        type: 'Word Document'
      };
    case 'pptx':
    case 'ppt':
      return {
        icon: PresentationIcon,
        color: 'text-orange-500',
        bg: 'bg-orange-50',
        type: 'Presentation'
      };
    case 'png':
    case 'jpg':
    case 'jpeg':
      return {
        icon: ImageIcon,
        color: 'text-purple-500',
        bg: 'bg-purple-50',
        type: 'Image'
      };
    default:
      return {
        icon: FileIcon,
        color: 'text-gray-500',
        bg: 'bg-gray-50',
        type: 'File'
      };
  }
};
export function VaultPage() {
  const [items, setItems] = useState<VaultItem[]>(initialItems);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorkspace, setSelectedWorkspace] = useState('All Workspaces');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDateRange, setSelectedDateRange] = useState('All time');
  // Modals & States
  const [showUploadZone, setShowUploadZone] = useState(false);
  const [activeContextMenuId, setActiveContextMenuId] = useState<string | null>(null);
  // Drag & Drop state
  const [isDragging, setIsDragging] = useState(false);
  // Close context menu on outside click
  useEffect(() => {
    const handleClickOutside = () => setActiveContextMenuId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  // --- Derived Data ---
  const workspaces = ['All Workspaces', ...Array.from(new Set(items.map(item => item.workspace)))];
  const fileTypes = ['All', 'Documents', 'Spreadsheets', 'Presentations', 'Images'];
  const dateRanges = ['All time', 'Last 7 days', 'Last 30 days', 'Last 90 days'];
  const currentItems = useMemo(() => {
    return items.filter(item => {
      // Search
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      // Workspace
      if (selectedWorkspace !== 'All Workspaces' && item.workspace !== selectedWorkspace) return false;
      // Type
      if (selectedType !== 'All') {
        const details = getFileDetails(item.name);
        if (selectedType === 'Documents' && !['PDF Document', 'Word Document'].includes(details.type)) return false;
        if (selectedType === 'Spreadsheets' && details.type !== 'Spreadsheet') return false;
        if (selectedType === 'Presentations' && details.type !== 'Presentation') return false;
        if (selectedType === 'Images' && details.type !== 'Image') return false;
      }
      return true;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [items, searchQuery, selectedWorkspace, selectedType]);
  // --- Handlers ---
  const handleMockUpload = () => {
    const newFile: VaultItem = {
      id: Date.now().toString(),
      name: `Uploaded_File_${Math.floor(Math.random() * 1000)}.pdf`,
      size: `${(Math.random() * 10).toFixed(1)} MB`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      workspace: selectedWorkspace === 'All Workspaces' ? 'Personal' : selectedWorkspace,
      uploader: 'Alex L.'
    };
    setItems([newFile, ...items]);
    setShowUploadZone(false);
  };
  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    setActiveContextMenuId(null);
  };
  // Drag events for the whole page
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleMockUpload();
  };
  return <div className="flex flex-col h-full bg-white relative" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} data-id="element-1572">
      {/* Global Drag Overlay */}
      <AnimatePresence data-id="element-1573">
        {isDragging && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="absolute inset-0 z-50 bg-primary/5 backdrop-blur-sm border-4 border-dashed border-primary/40 m-4 rounded-3xl flex items-center justify-center pointer-events-none" data-id="element-1574">
            <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center" data-id="element-1575">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4" data-id="element-1576">
                <UploadCloudIcon className="w-10 h-10 text-primary" data-id="element-1577" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-text-primary mb-2" data-id="element-1578">
                Drop files to upload
              </h3>
              <p className="text-text-secondary" data-id="element-1579">
                Files will be added to your Vault
              </p>
            </div>
          </motion.div>}
      </AnimatePresence>

      <div className="flex-1 overflow-y-auto p-6 md:p-10 max-w-7xl mx-auto w-full" data-id="element-1580">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8" data-id="element-1581">
          <div className="max-w-xl" data-id="element-1582">
            <h1 className="text-4xl font-heading font-bold text-text-primary mb-3" data-id="element-1583">
              Vault
            </h1>
            <p className="text-text-secondary text-lg" data-id="element-1584">
              Global file manager across all your workspaces.
            </p>

            {/* Storage Bar */}
            <div className="mt-6" data-id="element-1585">
              <div className="flex justify-between text-sm mb-2" data-id="element-1586">
                <span className="font-medium text-text-primary" data-id="element-1587">Storage</span>
                <span className="text-text-secondary" data-id="element-1588">2.1 GB of 5 GB used</span>
              </div>
              <div className="h-2 w-full bg-cream rounded-full overflow-hidden" data-id="element-1589">
                <div className="h-full bg-primary rounded-full" style={{
                width: '42%'
              }} data-id="element-1590"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3" data-id="element-1591">
            <Button variant="primary" leftIcon={<UploadCloudIcon className="w-4 h-4" data-id="element-1593" />} onClick={() => setShowUploadZone(true)} className="w-full sm:w-auto" data-id="element-1592">
              Upload Files
            </Button>
          </div>
        </div>

        {/* Global Filter Interface */}
        <div className="bg-white border border-border/50 rounded-2xl p-4 shadow-sm mb-8 space-y-4" data-id="element-1594">
          <div className="flex flex-col md:flex-row gap-4" data-id="element-1595">
            {/* Search */}
            <div className="relative flex-1" data-id="element-1596">
              <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" data-id="element-1597" />
              <input type="text" placeholder="Search files by name..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full bg-warm-white border border-border/50 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" data-id="element-1598" />
            </div>

            {/* Workspace Dropdown */}
            <div className="relative min-w-[200px]" data-id="element-1599">
              <select value={selectedWorkspace} onChange={e => setSelectedWorkspace(e.target.value)} className="w-full appearance-none bg-warm-white border border-border/50 rounded-xl pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-primary font-medium" data-id="element-1600">
                {workspaces.map(ws => <option key={ws} value={ws} data-id="element-1601">
                    {ws}
                  </option>)}
              </select>
              <ChevronDownIcon className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" data-id="element-1602" />
            </div>

            {/* Date Range Dropdown */}
            <div className="relative min-w-[160px]" data-id="element-1603">
              <select value={selectedDateRange} onChange={e => setSelectedDateRange(e.target.value)} className="w-full appearance-none bg-warm-white border border-border/50 rounded-xl pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-primary font-medium" data-id="element-1604">
                {dateRanges.map(dr => <option key={dr} value={dr} data-id="element-1605">
                    {dr}
                  </option>)}
              </select>
              <ChevronDownIcon className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" data-id="element-1606" />
            </div>

            {/* View Toggle */}
            <div className="flex items-center bg-cream p-1 rounded-xl self-start md:self-auto flex-shrink-0" data-id="element-1607">
              <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-text-secondary hover:text-text-primary'}`} aria-label="Grid view" data-id="element-1608">
                <LayoutGridIcon className="w-4 h-4" data-id="element-1609" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-text-secondary hover:text-text-primary'}`} aria-label="List view" data-id="element-1610">
                <ListIcon className="w-4 h-4" data-id="element-1611" />
              </button>
            </div>
          </div>

          {/* File Type Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border/30" data-id="element-1612">
            {fileTypes.map(type => <button key={type} onClick={() => setSelectedType(type)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedType === type ? 'bg-primary text-white shadow-sm' : 'bg-cream text-text-secondary hover:text-text-primary hover:bg-beige'}`} data-id="element-1613">
                {type}
              </button>)}
          </div>
        </div>

        {/* Upload Zone (Manual Trigger) */}
        <AnimatePresence data-id="element-1614">
          {showUploadZone && <motion.div initial={{
          opacity: 0,
          height: 0,
          marginBottom: 0
        }} animate={{
          opacity: 1,
          height: 'auto',
          marginBottom: 32
        }} exit={{
          opacity: 0,
          height: 0,
          marginBottom: 0
        }} className="overflow-hidden" data-id="element-1615">
              <div className="border-2 border-dashed border-border rounded-2xl bg-warm-white/50 p-10 flex flex-col items-center justify-center text-center relative" data-id="element-1616">
                <button onClick={() => setShowUploadZone(false)} className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary rounded-full hover:bg-cream transition-colors" data-id="element-1617">
                  <XIcon className="w-5 h-5" data-id="element-1618" />
                </button>
                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 border border-border/50" data-id="element-1619">
                  <UploadCloudIcon className="w-8 h-8 text-primary" data-id="element-1620" />
                </div>
                <h3 className="text-xl font-heading font-bold text-text-primary mb-2" data-id="element-1621">
                  Drag and drop files here, or click to browse
                </h3>
                <p className="text-text-secondary text-sm mb-6" data-id="element-1622">
                  PDF, DOC, XLSX, PPTX, JPG, PNG up to 50MB
                </p>
                <Button onClick={handleMockUpload} variant="secondary" data-id="element-1623">
                  Browse Files
                </Button>
              </div>
            </motion.div>}
        </AnimatePresence>

        {/* Content Area */}
        {currentItems.length === 0 ? <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} className="flex flex-col items-center justify-center py-20 text-center" data-id="element-1624">
            <div className="w-24 h-24 bg-cream rounded-full flex items-center justify-center mb-6" data-id="element-1625">
              <FileIcon className="w-10 h-10 text-text-muted" data-id="element-1626" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-text-primary mb-2" data-id="element-1627">
              No files found
            </h3>
            <p className="text-text-secondary mb-8 max-w-md" data-id="element-1628">
              Try adjusting your filters or upload new files to your Vault.
            </p>
            <div className="flex gap-4" data-id="element-1629">
              <Button variant="primary" onClick={() => setShowUploadZone(true)} data-id="element-1630">
                Upload Files
              </Button>
            </div>
          </motion.div> : viewMode === 'grid' ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" data-id="element-1631">
            {currentItems.map((item, idx) => {
          const details = getFileDetails(item.name);
          return <motion.div key={item.id} initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: idx * 0.03
          }} data-id="element-1632">
                  <Card padding="md" clickable className="h-full flex flex-col group relative overflow-visible" data-id="element-1633">
                    <div className="flex justify-between items-start mb-4" data-id="element-1634">
                      <div className={`w-12 h-12 rounded-xl ${details.bg} flex items-center justify-center ${details.color} group-hover:opacity-80 transition-opacity`} data-id="element-1635">
                        <details.icon className="w-6 h-6" data-id="element-1636" />
                      </div>

                      {/* Context Menu Button */}
                      <div className="relative" onClick={e => e.stopPropagation()} data-id="element-1637">
                        <button onClick={e => {
                    e.stopPropagation();
                    setActiveContextMenuId(activeContextMenuId === item.id ? null : item.id);
                  }} className="p-1.5 text-text-muted hover:text-text-primary rounded-md hover:bg-cream transition-colors" data-id="element-1638">
                          <MoreVerticalIcon className="w-5 h-5" data-id="element-1639" />
                        </button>

                        {/* Dropdown Menu */}
                        <AnimatePresence data-id="element-1640">
                          {activeContextMenuId === item.id && <motion.div initial={{
                      opacity: 0,
                      scale: 0.95,
                      y: -10
                    }} animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0
                    }} exit={{
                      opacity: 0,
                      scale: 0.95,
                      y: -10
                    }} transition={{
                      duration: 0.1
                    }} className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-border/50 py-1.5 z-50" data-id="element-1641">
                              <button className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-cream flex items-center gap-2" data-id="element-1642">
                                <ExternalLinkIcon className="w-4 h-4 text-text-muted" data-id="element-1643" />{' '}
                                Open
                              </button>
                              <button className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-cream flex items-center gap-2" data-id="element-1644">
                                <Edit2Icon className="w-4 h-4 text-text-muted" data-id="element-1645" />{' '}
                                Rename
                              </button>
                              <button className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-cream flex items-center gap-2" data-id="element-1646">
                                <MoveIcon className="w-4 h-4 text-text-muted" data-id="element-1647" />{' '}
                                Move to...
                              </button>
                              <div className="h-px bg-border/50 my-1.5" data-id="element-1648"></div>
                              <button onClick={() => handleDelete(item.id)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2" data-id="element-1649">
                                <Trash2Icon className="w-4 h-4" data-id="element-1650" /> Delete
                              </button>
                            </motion.div>}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="flex-1" data-id="element-1651">
                      <h3 className="font-heading font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors" data-id="element-1652">
                        {item.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3" data-id="element-1653">
                        <Badge variant="default" className="bg-warm-white text-[10px] border-none" data-id="element-1654">
                          {details.type}
                        </Badge>
                        <Badge variant="default" className="bg-primary/5 text-primary text-[10px] border-none" data-id="element-1655">
                          {item.workspace}
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between text-xs text-text-muted font-medium" data-id="element-1656">
                      <span data-id="element-1657">{item.date}</span>
                      <span data-id="element-1658">{item.size}</span>
                    </div>
                  </Card>
                </motion.div>;
        })}
          </div> /* List View */ : <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden" data-id="element-1659">
            <div className="overflow-x-auto" data-id="element-1660">
              <table className="w-full text-left border-collapse" data-id="element-1661">
                <thead data-id="element-1662">
                  <tr className="bg-warm-white/50 border-b border-border/50 text-xs uppercase tracking-wider text-text-muted font-semibold" data-id="element-1663">
                    <th className="px-6 py-4 font-medium" data-id="element-1664">Name</th>
                    <th className="px-6 py-4 font-medium hidden md:table-cell" data-id="element-1665">
                      Workspace
                    </th>
                    <th className="px-6 py-4 font-medium hidden lg:table-cell" data-id="element-1666">
                      Date Modified
                    </th>
                    <th className="px-6 py-4 font-medium hidden sm:table-cell" data-id="element-1667">
                      Size
                    </th>
                    <th className="px-6 py-4 font-medium text-right" data-id="element-1668">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30" data-id="element-1669">
                  {currentItems.map(item => {
                const details = getFileDetails(item.name);
                return <tr key={item.id} className="hover:bg-cream/50 transition-colors group cursor-pointer" data-id="element-1670">
                        <td className="px-6 py-4" data-id="element-1671">
                          <div className="flex items-center gap-4" data-id="element-1672">
                            <div className={`w-10 h-10 rounded-lg ${details.bg} flex items-center justify-center ${details.color} flex-shrink-0`} data-id="element-1673">
                              <details.icon className="w-5 h-5" data-id="element-1674" />
                            </div>
                            <div data-id="element-1675">
                              <span className="font-heading font-semibold text-text-primary group-hover:text-primary transition-colors line-clamp-1 block" data-id="element-1676">
                                {item.name}
                              </span>
                              <span className="text-[10px] text-text-muted mt-0.5 block md:hidden" data-id="element-1677">
                                {item.workspace}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell whitespace-nowrap" data-id="element-1678">
                          <Badge variant="default" className="bg-primary/5 text-primary text-xs border-none" data-id="element-1679">
                            {item.workspace}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-text-secondary hidden lg:table-cell whitespace-nowrap" data-id="element-1680">
                          {item.date}
                        </td>
                        <td className="px-6 py-4 text-sm text-text-secondary hidden sm:table-cell whitespace-nowrap" data-id="element-1681">
                          {item.size}
                        </td>
                        <td className="px-6 py-4 text-right relative" onClick={e => e.stopPropagation()} data-id="element-1682">
                          <button onClick={e => {
                      e.stopPropagation();
                      setActiveContextMenuId(activeContextMenuId === item.id ? null : item.id);
                    }} className="p-2 text-text-muted hover:text-text-primary rounded-md hover:bg-white transition-colors" data-id="element-1683">
                            <MoreVerticalIcon className="w-5 h-5" data-id="element-1684" />
                          </button>

                          {/* Dropdown Menu for List View */}
                          <AnimatePresence data-id="element-1685">
                            {activeContextMenuId === item.id && <motion.div initial={{
                        opacity: 0,
                        scale: 0.95,
                        y: -10
                      }} animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0
                      }} exit={{
                        opacity: 0,
                        scale: 0.95,
                        y: -10
                      }} transition={{
                        duration: 0.1
                      }} className="absolute right-12 top-10 mt-1 w-48 bg-white rounded-xl shadow-lg border border-border/50 py-1.5 z-50 text-left" data-id="element-1686">
                                <button className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-cream flex items-center gap-2" data-id="element-1687">
                                  <ExternalLinkIcon className="w-4 h-4 text-text-muted" data-id="element-1688" />{' '}
                                  Open
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-cream flex items-center gap-2" data-id="element-1689">
                                  <Edit2Icon className="w-4 h-4 text-text-muted" data-id="element-1690" />{' '}
                                  Rename
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-cream flex items-center gap-2" data-id="element-1691">
                                  <MoveIcon className="w-4 h-4 text-text-muted" data-id="element-1692" />{' '}
                                  Move to...
                                </button>
                                <div className="h-px bg-border/50 my-1.5" data-id="element-1693"></div>
                                <button onClick={() => handleDelete(item.id)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2" data-id="element-1694">
                                  <Trash2Icon className="w-4 h-4" data-id="element-1695" /> Delete
                                </button>
                              </motion.div>}
                          </AnimatePresence>
                        </td>
                      </tr>;
              })}
                </tbody>
              </table>
            </div>
          </div>}
      </div>
    </div>;
}