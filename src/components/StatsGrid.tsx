import type { WorkoutSession, WorkoutType } from '../types'
import { calcStreak, thisWeekCount, shortDate } from '../utils/storage'
import { WORKOUT_META } from '../data/workouts'

interface Props {
  sessions: WorkoutSession[]
}

export const StatsGrid = ({ sessions }: Props) => {
  const completed = sessions.filter((s) => s.completed)
  const streak = calcStreak(sessions)
  const weekCount = thisWeekCount(sessions)
  const lastDate = completed[0]?.date

  // Count by workout type
  const typeCounts: Partial<Record<WorkoutType, number>> = {}
  for (const s of completed) {
    typeCounts[s.type] = (typeCounts[s.type] ?? 0) + 1
  }

  return (
    <div className="space-y-4">
      {/* Main stats row */}
      <div className="grid grid-cols-3 gap-3">
        <StatTile
          label="Total Sessions"
          value={String(completed.length)}
          sub="completed"
          highlight
        />
        <StatTile
          label="Streak"
          value={streak > 0 ? `${streak}d` : '—'}
          sub={streak > 0 ? 'in a row' : 'start today'}
        />
        <StatTile
          label="This Week"
          value={String(weekCount)}
          sub="sessions"
        />
      </div>

      {lastDate && (
        <p className="text-xs text-center text-white/30">
          Last workout: <span className="text-white/50 font-medium">{shortDate(lastDate)}</span>
        </p>
      )}

      {/* Breakdown by type */}
      {completed.length > 0 && (
        <div className="card p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">
            Breakdown
          </p>
          <div className="space-y-2">
            {(Object.entries(typeCounts) as [WorkoutType, number][])
              .sort(([, a], [, b]) => b - a)
              .map(([type, count]) => (
                <div key={type} className="flex items-center gap-2">
                  <span className="text-sm leading-none">{WORKOUT_META[type].icon}</span>
                  <span className="text-sm text-white/70 flex-1 truncate">{type}</span>
                  <span className="text-sm font-bold text-gold">{count}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

const StatTile = ({
  label,
  value,
  sub,
  highlight = false,
}: {
  label: string
  value: string
  sub: string
  highlight?: boolean
}) => (
  <div className={`card p-3 text-center ${highlight ? 'border-gold/30 shadow-gold' : ''}`}>
    <p className="text-xs text-white/35 font-medium leading-tight mb-1">{label}</p>
    <p className={`text-2xl font-black leading-none ${highlight ? 'text-gold' : 'text-white'}`}>
      {value}
    </p>
    <p className="text-[10px] text-white/30 mt-1">{sub}</p>
  </div>
)
