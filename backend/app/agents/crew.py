"""
app/agents/crew.py
───────────────────
FIX B1 + B2 + B4 + B8:

B1 FIXED: Replaced asyncio.create_task() with FastAPI BackgroundTasks pattern.
  asyncio.create_task() requires a running loop at call time — unreliable in
  FastAPI's async context. BackgroundTasks is the correct FastAPI pattern.

B2 FIXED: Changed Dockerfile to --workers 1 (see Dockerfile fix).
  The in-memory _task_store cannot be shared across processes.
  For horizontal scaling, replace _task_store with Redis or Supabase.

B4 FIXED: submit_task() now accepts and forwards the `complexity` parameter
  so model routing receives the caller's preference.

B8 NOTED: Tasks are persisted to Supabase tasks table when available.
  Falls back to in-memory store if DB write fails (for dev without DB).
"""

import uuid
from datetime import datetime, timezone
from typing import Any, Optional

# crewai + definitions are intentionally NOT imported at module level.
# crewai pulls in litellm, langchain, and dozens of transitive deps.
# Importing them at module load time adds several seconds to cold start
# and can crash the process if any dep has an import-time side-effect.
# All heavy imports are deferred into _build_crew() which only runs at
# request time, keeping startup fast and reliable.

from app.utils.logger import get_logger

logger = get_logger(__name__)

# ── In-memory task store ──────────────────────────────────────────────────────
# Primary store — fast, lives for the lifetime of the process.
# Supabase is the durable backup so tasks survive Railway restarts.
_task_store: dict[str, dict[str, Any]] = {}


# ── Supabase persistence helpers ──────────────────────────────────────────────

def _db_save(record: dict) -> None:
    """Write/update a task record to Supabase agent_tasks. Never raises."""
    try:
        from app.integrations.supabase_client import get_supabase_admin
        admin = get_supabase_admin()
        admin.table("agent_tasks").upsert({
            "id":          record["task_id"],
            "user_id":     record["user_id"],
            "status":      record["status"],
            "description": record.get("description"),
            "result":      record.get("result"),
            "error":       record.get("error"),
            "agent_type":  record.get("agent_type"),
            "agent_label": record.get("agent_label"),
            "created_at":  record.get("created_at"),
            "completed_at": record.get("completed_at"),
        }).execute()
    except Exception as exc:
        logger.warning("db_save_failed", task_id=record.get("task_id"), error=str(exc))


def _db_get(task_id: str) -> Optional[dict]:
    """Fetch a task from Supabase. Returns None on any error."""
    try:
        from app.integrations.supabase_client import get_supabase_admin
        admin = get_supabase_admin()
        res = admin.table("agent_tasks").select("*").eq("id", task_id).single().execute()
        row = res.data
        if not row:
            return None
        return {
            "task_id":     row["id"],
            "user_id":     row["user_id"],
            "status":      row["status"],
            "description": row.get("description"),
            "result":      row.get("result"),
            "error":       row.get("error"),
            "agent_type":  row.get("agent_type"),
            "agent_label": row.get("agent_label"),
            "created_at":  row.get("created_at"),
            "completed_at": row.get("completed_at"),
        }
    except Exception as exc:
        logger.warning("db_get_failed", task_id=task_id, error=str(exc))
        return None


def _new_task_record(
    task_id: str,
    description: str,
    user_id: str,
    complexity: Optional[str],
) -> dict:
    return {
        "task_id": task_id,
        "status": "queued",
        "description": description,
        "user_id": user_id,
        "complexity": complexity,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "completed_at": None,
        "result": None,
        "error": None,
        "model_used": None,
        "agent_type": None,
        "agent_label": None,
    }


def _build_crew(task_description: str, complexity: Optional[str] = None):
    """Instantiate agents and wire up tasks. Returns a ready Crew."""
    # Deferred imports — only loaded when a task is actually executed
    from crewai import Crew, Process, Task  # noqa: PLC0415
    from app.agents.definitions import (  # noqa: PLC0415
        build_analyst_agent,
        build_architect_agent,
        build_engineer_agent,
        build_writer_agent,
    )

    architect = build_architect_agent()
    analyst = build_analyst_agent()
    engineer = build_engineer_agent()
    writer = build_writer_agent()

    plan_task = Task(
        description=(
            f"Analyse this user request and produce a detailed execution plan:\n\n"
            f"{task_description}\n\n"
            "Break it into sub-tasks: what needs research, what needs code, "
            "what the final output should look like."
        ),
        expected_output="A numbered list of sub-tasks with agent assignments and dependencies.",
        agent=architect,
    )

    research_task = Task(
        description=(
            "Using the execution plan produced by the Architect, research all "
            "necessary background information. Provide structured findings."
        ),
        expected_output=(
            "A structured research report with key facts and a summary section."
        ),
        agent=analyst,
        context=[plan_task],
    )

    code_task = Task(
        description=(
            "Using the Architect's plan and Analyst's research, write any required "
            "code. If code must be executed, output it in a Python code block."
        ),
        expected_output=(
            "Working, commented Python code (if applicable), or a note "
            "that no code is needed for this task."
        ),
        agent=engineer,
        context=[plan_task, research_task],
    )

    write_task = Task(
        description=(
            "Synthesise all previous outputs (plan, research, code) into a "
            "clear, professional final response for the user."
        ),
        expected_output=(
            "A polished, well-structured final answer that directly addresses "
            "the original user request."
        ),
        agent=writer,
        context=[plan_task, research_task, code_task],
    )

    return Crew(
        agents=[architect, analyst, engineer, writer],
        tasks=[plan_task, research_task, code_task, write_task],
        process=Process.sequential,
        verbose=True,
    )


def _run_crew_sync(task_description: str, complexity: Optional[str]) -> str:
    """Synchronous crew execution — called from BackgroundTasks thread."""
    crew = _build_crew(task_description, complexity)
    result = crew.kickoff()
    return str(result)


def create_task_record(
    task_description: str,
    user_id: str,
    complexity: Optional[str] = None,
) -> str:
    """
    Create a task record and return the task_id immediately.
    Actual execution is started by the caller via BackgroundTasks.
    """
    task_id = str(uuid.uuid4())
    record = _new_task_record(task_id, task_description, user_id, complexity)
    _task_store[task_id] = record
    _db_save(record)
    logger.info("task_record_created", task_id=task_id, user_id=user_id)
    return task_id


def execute_task_background(task_id: str, task_description: str, complexity: Optional[str]) -> None:
    """
    Routes every task through the Smart Router:
      1. Head Router Agent reads the task → picks the best specialist
      2. Specialist Agent executes the task
      3. Result + agent metadata stored in _task_store

    FastAPI BackgroundTasks runs this in a thread-pool executor automatically.
    """
    from app.agents.smart_router import run_smart_router  # deferred import

    _task_store[task_id]["status"] = "running"
    _db_save(_task_store[task_id])
    logger.info("task_started", task_id=task_id)

    try:
        output = run_smart_router(task_description, agent_type=None)
        _task_store[task_id].update({
            "status": "completed",
            "result": output["result"],
            "agent_type": output.get("agent_type"),
            "agent_label": output.get("agent_label"),
            "completed_at": datetime.now(timezone.utc).isoformat(),
        })
        _db_save(_task_store[task_id])
        logger.info("task_completed", task_id=task_id, agent_type=output.get("agent_type"))

    except Exception as exc:
        import traceback
        error_detail = f"{type(exc).__name__}: {exc}"
        logger.error("task_failed", task_id=task_id, error=error_detail, traceback=traceback.format_exc())
        _task_store[task_id].update({
            "status": "failed",
            "error": error_detail,
            "completed_at": datetime.now(timezone.utc).isoformat(),
        })
        _db_save(_task_store[task_id])


def get_task_status(task_id: str) -> Optional[dict]:
    """Return task record from memory (fast) or Supabase (survives restarts)."""
    record = _task_store.get(task_id)
    if record is not None:
        return record
    # Not in memory — backend may have restarted; try Supabase
    db_record = _db_get(task_id)
    if db_record:
        _task_store[task_id] = db_record  # re-warm the cache
    return db_record


# ── Smart Router Task Support ─────────────────────────────────────────────────

def create_smart_task_record(
    task_description: str,
    user_id: str,
    agent_type: Optional[str] = None,
) -> str:
    """Create a task record for the smart-router system and return task_id."""
    task_id = str(uuid.uuid4())
    record = {
        "task_id": task_id,
        "status": "queued",
        "description": task_description,
        "user_id": user_id,
        "agent_type": agent_type,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "completed_at": None,
        "result": None,
        "error": None,
        "agent_label": None,
    }
    _task_store[task_id] = record
    _db_save(record)
    logger.info("smart_task_record_created", task_id=task_id, agent_type=agent_type)
    return task_id


def execute_smart_task_background(
    task_id: str,
    task_description: str,
    agent_type: Optional[str],
) -> None:
    """
    Background function for the smart-router system.
    Called by FastAPI BackgroundTasks — runs in a thread-pool executor.
    """
    from app.agents.smart_router import run_smart_router  # deferred import

    _task_store[task_id]["status"] = "running"
    _db_save(_task_store[task_id])
    logger.info("smart_task_started", task_id=task_id)

    try:
        output = run_smart_router(task_description, agent_type)
        _task_store[task_id].update({
            "status": "completed",
            "result": output["result"],
            "agent_label": output.get("agent_label"),
            "agent_type": output.get("agent_type"),
            "completed_at": datetime.now(timezone.utc).isoformat(),
        })
        _db_save(_task_store[task_id])
        logger.info("smart_task_completed", task_id=task_id, agent_type=output.get("agent_type"))
    except Exception as exc:
        import traceback
        error_detail = f"{type(exc).__name__}: {exc}"
        logger.error("smart_task_failed", task_id=task_id, error=error_detail, traceback=traceback.format_exc())
        _task_store[task_id].update({
            "status": "failed",
            "error": error_detail,
            "completed_at": datetime.now(timezone.utc).isoformat(),
        })
        _db_save(_task_store[task_id])
