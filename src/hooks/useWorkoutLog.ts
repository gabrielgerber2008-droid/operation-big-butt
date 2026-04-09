import { useState, useCallback } from 'react'
import type { WorkoutSession, WorkoutTemplate } from '../types'
import {
  loadSessions,
  addSession,
  updateSession,
  deleteSession,
  loadCustomTemplates,
  addCustomTemplate,
  updateCustomTemplate,
  deleteCustomTemplate,
} from '../utils/storage'
import { BUILT_IN_TEMPLATES } from '../data/workouts'

export const useWorkoutLog = () => {
  const [sessions, setSessions] = useState<WorkoutSession[]>(() => loadSessions())
  const [customTemplates, setCustomTemplates] = useState<WorkoutTemplate[]>(() =>
    loadCustomTemplates(),
  )

  const allTemplates: WorkoutTemplate[] = [...BUILT_IN_TEMPLATES, ...customTemplates]

  // ─── Session CRUD ──────────────────────────────────────────────────────────

  const saveNew = useCallback((session: WorkoutSession) => {
    addSession(session)
    setSessions(loadSessions())
  }, [])

  const save = useCallback((session: WorkoutSession) => {
    updateSession(session)
    setSessions(loadSessions())
  }, [])

  const remove = useCallback((id: string) => {
    deleteSession(id)
    setSessions((prev) => prev.filter((s) => s.id !== id))
  }, [])

  // ─── Template CRUD ─────────────────────────────────────────────────────────

  const saveTemplate = useCallback((template: WorkoutTemplate) => {
    addCustomTemplate(template)
    setCustomTemplates(loadCustomTemplates())
  }, [])

  const editTemplate = useCallback((template: WorkoutTemplate) => {
    updateCustomTemplate(template)
    setCustomTemplates(loadCustomTemplates())
  }, [])

  const removeTemplate = useCallback((id: string) => {
    deleteCustomTemplate(id)
    setCustomTemplates((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return {
    sessions,
    saveNew,
    save,
    remove,
    allTemplates,
    customTemplates,
    saveTemplate,
    editTemplate,
    removeTemplate,
  }
}
