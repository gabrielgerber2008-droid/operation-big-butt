import { useState } from 'react'
import type { WorkoutSession, WorkoutType } from '../types'
import { WORKOUT_TYPES } from '../types'
import { SessionCard } from '../components/SessionCard'
import { WORKOUT_META } from '../data/workouts'

interface Props {
  sessions: WorkoutSession[]
  onDelete: (id: string) => void
}

export const HistoryPage = ({ sessions, onDelete }: Props) => {
  const [filter, setFilter] = useState<WorkoutType | 'All'>('All')

  const filtered =
    filter === 'All' ? sessions : sessions.filter((s) => s.type === filter)

  return (
    <div className="max-w-lg mx-auto px-4 pb-16">
      <div className="pt-8 pb-6">
        <h1 className="text-3xl font-black text-white leading-tight">History</h1>
        <p className="text-sm text-white/35 mt-1">
          {sessions.length === 0
            ? 'No sessions logged yet.'
            : `${sessions.filter((s) => s.completed).length} completed · ${sessions.length} total`}
        </p>
      </div>

      {/* Filter chips */}
      {sessions.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-4 mb-4 -mx-4 px-4 scrollbar-none">
          <FilterChip label="All" active={filter === 'All'} onClick={() => setFilter('All')} />
          {WORKOUT_TYPES.map((type) => {
            const count = sessions.filter((s) => s.type === type).length
            if (count === 0) return null
            return (
              <FilterChip
                key={type}
                label={`${WORKOUT_META[type].icon} ${type}`}
                active={filter === type}
                onClick={() => setFilter(type)}
                count={count}
              />
            )
          })}
        </div>
      )}

      {/* Session list */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-white/20 text-sm">
            {filter === 'All' ? 'Log your first workout to see it here.' : `No ${filter} sessions yet.`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((session) => (
            <SessionCard key={session.id} session={session} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  )
}

const FilterChip = ({
  label,
  active,
  onClick,
  count,
}: {
  label: string
  active: boolean
  onClick: () => void
  count?: number
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border transition-all whitespace-nowrap ${
      active
        ? 'border-gold/50 bg-gold/10 text-gold'
        : 'border-obs-4 bg-obs-2 text-white/40 hover:text-white hover:border-obs-5'
    }`}
  >
    {label}
    {count != null && (
      <span className={`text-[10px] font-bold ${active ? 'text-gold/70' : 'text-white/25'}`}>
        {count}
      </span>
    )}
  </button>
)
