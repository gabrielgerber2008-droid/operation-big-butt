import { useState, useCallback } from 'react'
import type { WorkoutSession } from '../types'
import {
  loadSessions,
  addSession,
  updateSession,
  deleteSession,
} from '../utils/storage'

/** Central hook — keeps sessions in React state and syncs to localStorage */
export const useWorkoutLog = () => {
  const [sessions, setSessions] = useState<WorkoutSession[]>(() => loadSessions())

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

  return { sessions, saveNew, save, remove }
}
