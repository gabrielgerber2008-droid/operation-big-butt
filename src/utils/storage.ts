import type { WorkoutSession, WorkoutTemplate } from '../types'

const SESSIONS_KEY = 'obb_sessions'
const TEMPLATES_KEY = 'obb_custom_templates'

// ─── Sessions ───────────────────────────────────────────────────────────────

export const loadSessions = (): WorkoutSession[] => {
  try {
    const raw = localStorage.getItem(SESSIONS_KEY)
    if (!raw) return []
    return JSON.parse(raw) as WorkoutSession[]
  } catch {
    return []
  }
}

export const saveSessions = (sessions: WorkoutSession[]): void => {
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions))
}

export const addSession = (session: WorkoutSession): void => {
  const sessions = loadSessions()
  saveSessions([session, ...sessions])
}

export const updateSession = (updated: WorkoutSession): void => {
  const sessions = loadSessions()
  saveSessions(sessions.map((s) => (s.id === updated.id ? updated : s)))
}

export const deleteSession = (id: string): void => {
  const sessions = loadSessions()
  saveSessions(sessions.filter((s) => s.id !== id))
}

// ─── Custom Templates ────────────────────────────────────────────────────────

export const loadCustomTemplates = (): WorkoutTemplate[] => {
  try {
    const raw = localStorage.getItem(TEMPLATES_KEY)
    if (!raw) return []
    return JSON.parse(raw) as WorkoutTemplate[]
  } catch {
    return []
  }
}

export const saveCustomTemplates = (templates: WorkoutTemplate[]): void => {
  localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates))
}

export const addCustomTemplate = (template: WorkoutTemplate): void => {
  const templates = loadCustomTemplates()
  saveCustomTemplates([...templates, template])
}

export const updateCustomTemplate = (updated: WorkoutTemplate): void => {
  const templates = loadCustomTemplates()
  saveCustomTemplates(templates.map((t) => (t.id === updated.id ? updated : t)))
}

export const deleteCustomTemplate = (id: string): void => {
  const templates = loadCustomTemplates()
  saveCustomTemplates(templates.filter((t) => t.id !== id))
}

// ─── Date helpers ────────────────────────────────────────────────────────────

export const todayISO = (): string => new Date().toISOString().slice(0, 10)

export const formatDate = (iso: string): string => {
  const [year, month, day] = iso.split('-').map(Number)
  const d = new Date(year, month - 1, day)
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export const shortDate = (iso: string): string => {
  const [year, month, day] = iso.split('-').map(Number)
  const d = new Date(year, month - 1, day)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/** Returns how many sessions fall within the current Mon–Sun week */
export const thisWeekCount = (sessions: WorkoutSession[]): number => {
  const now = new Date()
  const day = now.getDay()
  const monday = new Date(now)
  monday.setDate(now.getDate() - ((day + 6) % 7))
  monday.setHours(0, 0, 0, 0)
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  sunday.setHours(23, 59, 59, 999)

  return sessions.filter((s) => {
    if (!s.completed) return false
    const [y, mo, d] = s.date.split('-').map(Number)
    const sd = new Date(y, mo - 1, d)
    return sd >= monday && sd <= sunday
  }).length
}

/** Calculates current streak of consecutive days with at least one completed session */
export const calcStreak = (sessions: WorkoutSession[]): number => {
  const completed = sessions.filter((s) => s.completed)
  if (completed.length === 0) return 0

  const uniqueDays = [...new Set(completed.map((s) => s.date))].sort().reverse()

  const today = todayISO()
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayISO = yesterday.toISOString().slice(0, 10)

  if (uniqueDays[0] !== today && uniqueDays[0] !== yesterdayISO) return 0

  let streak = 1
  for (let i = 1; i < uniqueDays.length; i++) {
    const prev = new Date(uniqueDays[i - 1])
    const curr = new Date(uniqueDays[i])
    const diff = (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24)
    if (diff === 1) streak++
    else break
  }
  return streak
}
