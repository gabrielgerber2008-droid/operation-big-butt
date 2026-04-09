import { useState } from 'react'
import type { WorkoutSession, WorkoutTemplate } from '../types'
import { SessionCard } from '../components/SessionCard'

interface Props {
  sessions: WorkoutSession[]
  onDelete: (id: string) => void
  allTemplates: WorkoutTemplate[]
}

export const HistoryPage = ({ sessions, onDelete, allTemplates }: Props) => {
  const [filter, setFilter] = useState<string>('All')

  // Build unique workout names that actually appear in sessions
  const workoutNames = [...new Set(sessions.map((s) => s.type))]

  const filtered =
    filter === 'All' ? sessions : sessions.filter((s) => s.type === filter)

  const getTemplate = (name: string) => allTemplates.find((t) => t.name === name)

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
          {workoutNames.map((name) => {
            const count = sessions.filter((s) => s.type === name).length
            const t = getTemplate(name)
            return (
              <FilterChip
                key={name}
                label={`${t?.icon ?? '💪'} ${name}`}
                active={filter === name}
                onClick={() => setFilter(name)}
                count={count}
                color={t?.color}
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
            <SessionCard
              key={session.id}
              session={session}
              onDelete={onDelete}
              allTemplates={allTemplates}
            />
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
  color,
}: {
  label: string
  active: boolean
  onClick: () => void
  count?: number
  color?: string
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border transition-all whitespace-nowrap ${
      active
        ? 'border-gold/50 bg-gold/10 text-gold'
        : 'border-obs-4 bg-obs-2 text-white/40 hover:text-white hover:border-obs-5'
    }`}
    style={active && color ? { borderColor: `${color}50`, backgroundColor: `${color}15`, color } : undefined}
  >
    {label}
    {count != null && (
      <span className={`text-[10px] font-bold ${active ? 'opacity-70' : 'text-white/25'}`}>
        {count}
      </span>
    )}
  </button>
)
