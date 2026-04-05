/**
 * lib/apiClient.ts
 * ─────────────────
 * Central HTTP client for all FastAPI backend calls.
 *
 * FIX F4: Creates the API client that was completely missing.
 *
 * - Reads VITE_API_URL from environment (configurable per deployment)
 * - Automatically attaches the Supabase JWT as Bearer token
 * - Returns typed responses; throws ApiError on non-2xx
 * - On 401, clears local session and reloads to /login
 */

import { supabase } from './supabaseClient';

const BASE_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:8000';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function getAuthHeader(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
): Promise<T> {
  const authHeaders = await getAuthHeader();

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401) {
    // Token expired or invalid — clear session and force re-login
    await supabase.auth.signOut();
    window.location.href = '/login';
    throw new ApiError(401, 'Session expired. Please log in again.');
  }

  if (!response.ok) {
    let detail = `HTTP ${response.status}`;
    try {
      const err = await response.json();
      detail = err.detail || detail;
    } catch {}
    throw new ApiError(response.status, detail);
  }

  // Handle 204 No Content
  if (response.status === 204) return undefined as T;

  return response.json() as Promise<T>;
}

// ── Typed API methods ───────────────────────────────────────────────────────

export interface RunTaskPayload {
  task: string;
  complexity?: 'simple' | 'medium' | 'complex';
}

export interface RunTaskResponse {
  task_id: string;
  status: string;
  message: string;
}

export interface AgentStatusResponse {
  task_id: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  description?: string;
  result?: string;
  error?: string;
  created_at?: string;
  completed_at?: string;
  agent_type?: string;
  agent_label?: string;
}

export interface SmartTaskPayload {
  task: string;
  agent_type?: string;
}

export interface SmartTaskResponse {
  task_id: string;
  status: string;
  message: string;
  agent_type?: string;
}

export const api = {
  /** POST /run-task — submit a multi-agent task */
  runTask: (payload: RunTaskPayload) =>
    request<RunTaskResponse>('POST', '/run-task', payload),

  /** POST /smart-task — Head Router routes to one of 20 specialists */
  smartTask: (payload: SmartTaskPayload) =>
    request<SmartTaskResponse>('POST', '/smart-task', payload),

  /** GET /agent-status/:id — poll task result */
  getTaskStatus: (taskId: string) =>
    request<AgentStatusResponse>('GET', `/agent-status/${taskId}`),

  /** GET /health */
  health: () => request<{ status: string }>('GET', '/health'),
};
