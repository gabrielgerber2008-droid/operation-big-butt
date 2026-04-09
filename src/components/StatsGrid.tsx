import type { WorkoutSession, WorkoutTemplate } from '../types'
import { calcStreak, thisWeekCount, shortDate } from '../utils/storage'

interface Props {
  sessions: WorkoutSession[]
  allTemplates?: WorkoutTemplate[]
}

export const StatsGrid = ({ sessions, allTemplates = [] }: Props) => {
  const completed = sessions.filter((s) => s.completed)
  const streak = calcStreak(sessions)
  const weekCount = thisWeekCount(sessions)
  const lastDate = completed[0]?.date

  // Count by workout type
  const typeCounts: Record<string, number> = {}
  for (const s of completed) {
    typeCounts[s.type] = (typeCounts[s.type] ?? 0) + 1
  }

  const getTemplate = (name: string) => allTemplates.find((t) => t.name === name)

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
            {(Object.entries(typeCounts) as [string, number][])
              .sort(([, a], [, b]) => b - a)
              .map(([type, count]) => {
                const t = getTemplate(type)
                return (
                  <div key={type} className="flex items-center gap-2">
                    {t?.color && (
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: t.color }}
                      />
                    )}
                    <span className="text-sm leading-none">{t?.icon ?? '💪'}</span>
                    <span className="text-sm text-white/70 flex-1 truncate">{type}</span>
                    <span className="text-sm font-bold text-gold">{count}</span>
                  </div>
                )
              })}
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
