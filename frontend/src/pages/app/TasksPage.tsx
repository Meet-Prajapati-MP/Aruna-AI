/**
 * FIX F6 + F9: TasksPage was using hardcoded MOCK_TASKS and importing unused `Children`.
 *
 * Problems fixed:
 * 1. All 8 MOCK_TASKS replaced with real data from GET /agent-status/{task_id}
 * 2. Tasks are fetched from Supabase tasks table for history, and backend for live status
 * 3. Removed unused `Children` import
 * 4. Polling every 3s for Running/Queued tasks
 *
 * Architecture note: We query Supabase directly for the task list (RLS handles
 * per-user filtering), then poll the backend for live status of active tasks.
 */
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  CheckSquareIcon, PlayIcon, RotateCwIcon, XIcon,
  ChevronDownIcon, ChevronUpIcon, BrainCircuitIcon, ZapIcon,
  MessageSquareIcon, Loader2Icon,
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { api, AgentStatusResponse } from '../../lib/apiClient';

type TaskStatus = 'Running' | 'Queued' | 'Completed' | 'Failed';

interface DbTask {
  id: string;
  title: string;
  status: TaskStatus;
  model: string;
  cost_paise: number;
  duration_secs?: number;
  workspace_id?: string;
  progress: number;
  created_at: string;
  completed_at?: string;
}

interface AgentLog {
  id: string;
  type: 'planning' | 'executing' | 'reasoning' | 'complete' | 'error';
  elapsed_secs: number;
  description: string;
}

function formatCost(paise: number): string {
  return `₹${(paise / 100).toFixed(2)}`;
}

function formatDuration(secs?: number): string | undefined {
  if (!secs) return undefined;
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

export function TasksPage() {
  const [tasks, setTasks] = useState<DbTask[]>([]);
  const [logs, setLogs] = useState<Record<string, AgentLog[]>>({});
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const filters = ['All', 'Running', 'Queued', 'Completed', 'Failed'];

  // ── Load tasks from Supabase ──────────────────────────────────────────────
  const loadTasks = useCallback(async () => {
    const { data, error: dbErr } = await supabase
      .from('tasks')
      .select('id, title, status, model, cost_paise, duration_secs, workspace_id, progress, created_at, completed_at')
      .order('created_at', { ascending: false })
      .limit(50);

    if (dbErr) {
      setError('Failed to load tasks. Please refresh.');
      return;
    }
    setTasks((data as DbTask[]) || []);
    setIsLoading(false);
  }, []);

  // ── Load agent logs for expanded task ────────────────────────────────────
  const loadLogs = useCallback(async (taskId: string) => {
    const { data } = await supabase
      .from('task_logs')
      .select('id, type, elapsed_secs, description')
      .eq('task_id', taskId)
      .order('elapsed_secs', { ascending: true });

    if (data) {
      setLogs((prev) => ({ ...prev, [taskId]: data as AgentLog[] }));
    }
  }, []);

  // ── Poll active tasks for live status ────────────────────────────────────
  const pollActiveTasks = useCallback(async () => {
    const active = tasks.filter(
      (t) => t.status === 'Running' || t.status === 'Queued',
    );
    if (active.length === 0) return;

    await Promise.all(
      active.map(async (task) => {
        try {
          const status: AgentStatusResponse = await api.getTaskStatus(task.id);
          if (status.status !== task.status.toLowerCase()) {
            // Status changed — reload full task list from DB
            await loadTasks();
          }
        } catch {}
      }),
    );
  }, [tasks, loadTasks]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Poll every 3 seconds when there are active tasks
  useEffect(() => {
    const hasActive = tasks.some(
      (t) => t.status === 'Running' || t.status === 'Queued',
    );
    if (!hasActive) return;

    const interval = setInterval(pollActiveTasks, 3000);
    return () => clearInterval(interval);
  }, [tasks, pollActiveTasks]);

  // Load logs when a task is expanded
  useEffect(() => {
    if (expandedId && !logs[expandedId]) {
      loadLogs(expandedId);
    }
  }, [expandedId, logs, loadLogs]);

  // ── Supabase realtime subscription ────────────────────────────────────────
  useEffect(() => {
    const channel = supabase
      .channel('tasks-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, () => {
        loadTasks();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [loadTasks]);

  const filteredTasks = tasks.filter((t) => {
    if (activeFilter === 'All') return true;
    return t.status === activeFilter;
  });

  const counts = {
    Running: tasks.filter((t) => t.status === 'Running').length,
    Queued: tasks.filter((t) => t.status === 'Queued').length,
    Completed: tasks.filter((t) => t.status === 'Completed').length,
    Failed: tasks.filter((t) => t.status === 'Failed').length,
  };

  const getStatusConfig = (status: TaskStatus) => {
    switch (status) {
      case 'Running':  return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Queued':   return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'Completed':return 'bg-green-50 text-green-600 border-green-200';
      case 'Failed':   return 'bg-red-50 text-red-600 border-red-200';
    }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };
  const itemAnim = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2Icon className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-text-primary">Tasks</h1>
        <p className="text-text-secondary mt-1">Monitor and manage agent executions.</p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card padding="sm" className="bg-blue-50/50 border-blue-100 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <RotateCwIcon className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <p className="text-2xl font-heading font-bold text-blue-700">{counts.Running}</p>
            <p className="text-xs font-medium text-blue-600 uppercase tracking-wider">Running</p>
          </div>
        </Card>
        <Card padding="sm" className="bg-amber-50/50 border-amber-100 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
            <PlayIcon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-heading font-bold text-amber-700">{counts.Queued}</p>
            <p className="text-xs font-medium text-amber-600 uppercase tracking-wider">Queued</p>
          </div>
        </Card>
        <Card padding="sm" className="bg-green-50/50 border-green-100 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <CheckSquareIcon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-heading font-bold text-green-700">{counts.Completed}</p>
            <p className="text-xs font-medium text-green-600 uppercase tracking-wider">Completed</p>
          </div>
        </Card>
        <Card padding="sm" className="bg-red-50/50 border-red-100 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <XIcon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-heading font-bold text-red-700">{counts.Failed}</p>
            <p className="text-xs font-medium text-red-600 uppercase tracking-wider">Failed</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === filter
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white border border-border text-text-secondary hover:bg-cream hover:text-text-primary'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      {filteredTasks.length > 0 ? (
        <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredTasks.map((task) => (
              <motion.div key={task.id} variants={itemAnim} layout>
                <Card
                  padding="sm"
                  clickable
                  onClick={() => setExpandedId(expandedId === task.id ? null : task.id)}
                  className="flex flex-col relative overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-shrink-0">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusConfig(task.status)}`}>
                        {task.status}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium text-text-primary truncate mb-1">
                        {task.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-text-muted px-2 py-0.5 bg-cream rounded-md font-mono">
                          {task.model}
                        </span>
                        <span className="text-text-muted font-medium">
                          {formatCost(task.cost_paise)}
                        </span>
                        {task.duration_secs !== undefined && (
                          <span className="text-text-muted">• {formatDuration(task.duration_secs)}</span>
                        )}
                      </div>

                      {task.status === 'Running' && task.progress !== undefined && (
                        <div className="mt-3 h-1.5 w-full bg-cream rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${task.progress}%` }}
                            transition={{ duration: 1 }}
                            className="h-full bg-primary rounded-full"
                          />
                        </div>
                      )}
                    </div>

                    <div
                      className="flex items-center gap-2 mt-3 sm:mt-0 flex-shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-lg"
                        onClick={() => setExpandedId(expandedId === task.id ? null : task.id)}
                      >
                        {expandedId === task.id
                          ? <ChevronUpIcon className="w-4 h-4" />
                          : <ChevronDownIcon className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  {/* Expandable Agent Log */}
                  <AnimatePresence>
                    {expandedId === task.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-border/50">
                          <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4 px-1">
                            Agent Log
                          </h4>
                          {(logs[task.id] || []).length === 0 ? (
                            <p className="text-sm text-text-muted px-2">No logs yet.</p>
                          ) : (
                            <div className="space-y-4 pl-2 relative before:absolute before:inset-y-0 before:left-4 before:w-px before:bg-border/50">
                              {(logs[task.id] || []).map((log) => {
                                let Icon = BrainCircuitIcon;
                                let colorClass = 'text-amber-500 bg-amber-50 border-amber-200';
                                if (log.type === 'executing') {
                                  Icon = ZapIcon; colorClass = 'text-blue-500 bg-blue-50 border-blue-200';
                                } else if (log.type === 'reasoning') {
                                  Icon = MessageSquareIcon; colorClass = 'text-purple-500 bg-purple-50 border-purple-200';
                                } else if (log.type === 'complete') {
                                  Icon = CheckSquareIcon; colorClass = 'text-green-500 bg-green-50 border-green-200';
                                }
                                return (
                                  <div key={log.id} className="relative flex gap-4">
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 z-10 ${colorClass}`}>
                                      <Icon className="w-3 h-3" />
                                    </div>
                                    <div className="flex-1 pb-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-semibold text-text-primary capitalize">{log.type}</span>
                                        <span className="text-[10px] text-text-muted font-mono">{log.elapsed_secs}s</span>
                                      </div>
                                      <p className="text-sm text-text-secondary">{log.description}</p>
                                    </div>
                                  </div>
                                );
                              })}
                              {task.status === 'Running' && (
                                <div className="relative flex gap-4">
                                  <div className="w-5 h-5 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center flex-shrink-0 z-10">
                                    <div className="w-2.5 h-2.5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                                  </div>
                                  <div className="flex-1 pb-1">
                                    <p className="text-sm text-primary font-medium animate-pulse">Processing next step...</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mb-4">
            <CheckSquareIcon className="w-8 h-8 text-text-muted" />
          </div>
          <h3 className="text-lg font-heading font-bold text-text-primary mb-1">No tasks found</h3>
          <p className="text-sm text-text-secondary">There are no tasks matching the selected filter.</p>
        </motion.div>
      )}
    </div>
  );
}
