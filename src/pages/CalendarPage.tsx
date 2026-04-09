import { useState } from 'react'
import type { WorkoutSession, WorkoutTemplate } from '../types'

interface Props {
  sessions: WorkoutSession[]
  allTemplates: WorkoutTemplate[]
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export const CalendarPage = ({ sessions, allTemplates }: Props) => {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth()) // 0-indexed
  const [selectedDay, setSelectedDay] = useState<string | null>(null)

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear((y) => y - 1) }
    else setMonth((m) => m - 1)
    setSelectedDay(null)
  }

  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear((y) => y + 1) }
    else setMonth((m) => m + 1)
    setSelectedDay(null)
  }

  // Build map: ISO date → sessions
  const sessionsByDate = new Map<string, WorkoutSession[]>()
  for (const s of sessions) {
    if (!sessionsByDate.has(s.date)) sessionsByDate.set(s.date, [])
    sessionsByDate.get(s.date)!.push(s)
  }

  // Calendar grid
  const firstDay = new Date(year, month, 1).getDay() // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const todayISO = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  const cells: Array<{ iso: string; day: number } | null> = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    cells.push({ iso, day: d })
  }

  const getTemplate = (name: string) => allTemplates.find((t) => t.name === name)

  const selectedSessions = selectedDay ? (sessionsByDate.get(selectedDay) ?? []) : []

  // Legend: unique categories present this month
  const monthColors = new Map<string, string>()
  for (const [iso, daySessions] of sessionsByDate) {
    if (iso.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`)) {
      for (const s of daySessions) {
        const t = getTemplate(s.type)
        if (t) monthColors.set(t.category, t.color)
      }
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 pb-16">
      <div className="pt-8 pb-4">
        <h1 className="text-3xl font-black text-white leading-tight">Calendar</h1>
        <p className="text-sm text-white/35 mt-1">Your workout history at a glance</p>
      </div>

      {/* Month navigation */}
      <div className="flex items-center justify-between mb-5">
        <button
          type="button"
          onClick={prevMonth}
          className="w-9 h-9 rounded-xl bg-obs-2 border border-obs-4 flex items-center justify-center text-white/50 hover:text-white transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <h2 className="text-lg font-black text-white">
          {MONTHS[month]} {year}
        </h2>

        <button
          type="button"
          onClick={nextMonth}
          className="w-9 h-9 rounded-xl bg-obs-2 border border-obs-4 flex items-center justify-center text-white/50 hover:text-white transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[10px] font-bold uppercase tracking-widest text-white/20 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, i) => {
          if (!cell) return <div key={`empty-${i}`} />

          const daySessions = sessionsByDate.get(cell.iso) ?? []
          const isToday = cell.iso === todayISO
          const isSelected = cell.iso === selectedDay
          const hasWorkout = daySessions.length > 0

          // Unique colors for this day
          const dotColors = [...new Set(
            daySessions
              .map((s) => getTemplate(s.type)?.color)
              .filter(Boolean) as string[]
          )]

          return (
            <button
              key={cell.iso}
              type="button"
              onClick={() => setSelectedDay(isSelected ? null : cell.iso)}
              className={`aspect-square flex flex-col items-center justify-center rounded-xl transition-all relative ${
                isSelected
                  ? 'bg-gold/20 border border-gold/40'
                  : isToday
                  ? 'bg-obs-3 border border-obs-5'
                  : hasWorkout
                  ? 'bg-obs-2 hover:bg-obs-3 border border-transparent hover:border-obs-4'
                  : 'hover:bg-obs-2 border border-transparent'
              }`}
            >
              <span
                className={`text-xs font-semibold leading-none mb-1 ${
                  isSelected
                    ? 'text-gold'
                    : isToday
                    ? 'text-white'
                    : hasWorkout
                    ? 'text-white/80'
                    : 'text-white/30'
                }`}
              >
                {cell.day}
              </span>

              {/* Colored dots */}
              {dotColors.length > 0 && (
                <div className="flex gap-0.5 justify-center">
                  {dotColors.slice(0, 3).map((c, idx) => (
                    <span
                      key={idx}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      {monthColors.size > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {[...monthColors.entries()].map(([cat, color]) => (
            <div key={cat} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-[11px] text-white/40 capitalize">{cat.replace('_', ' ')}</span>
            </div>
          ))}
        </div>
      )}

      {/* Selected day panel */}
      {selectedDay && (
        <div className="mt-5 card p-4">
          <h3 className="text-sm font-bold text-white mb-3">
            {formatDisplayDate(selectedDay)}
          </h3>

          {selectedSessions.length === 0 ? (
            <p className="text-white/30 text-sm">No workouts logged.</p>
          ) : (
            <div className="space-y-2">
              {selectedSessions.map((s) => {
                const t = getTemplate(s.type)
                return (
                  <div key={s.id} className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: t?.color ?? '#94a3b8' }}
                    />
                    <span className="text-sm text-white/80">{t?.icon ?? '💪'} {s.type}</span>
                    {s.completed && (
                      <span className="ml-auto text-[10px] text-gold font-bold uppercase tracking-wide">Done</span>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {sessions.length === 0 && (
        <div className="mt-8 text-center">
          <p className="text-white/20 text-sm">Log some workouts to see them here.</p>
        </div>
      )}
    </div>
  )
}

const formatDisplayDate = (iso: string): string => {
  const [year, month, day] = iso.split('-').map(Number)
  const d = new Date(year, month - 1, day)
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}
