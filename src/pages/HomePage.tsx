import { Link } from 'react-router-dom'
import type { WorkoutSession, WorkoutTemplate } from '../types'
import { CATEGORY_LABELS } from '../types'
import { WorkoutTypeCard } from '../components/WorkoutTypeCard'
import { StatsGrid } from '../components/StatsGrid'
import { shortDate } from '../utils/storage'
import { groupTemplatesByCategory } from '../data/workouts'

interface Props {
  sessions: WorkoutSession[]
  allTemplates: WorkoutTemplate[]
}

export const HomePage = ({ sessions, allTemplates }: Props) => {
  const lastByName: Record<string, string> = {}
  for (const s of sessions) {
    if (s.completed && !lastByName[s.type]) {
      lastByName[s.type] = shortDate(s.date)
    }
  }

  const groups = groupTemplatesByCategory(allTemplates)

  return (
    <div className="max-w-lg mx-auto px-4 pb-16">
      {/* Hero */}
      <div className="pt-10 pb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 mb-5">
          <span className="text-xs font-bold tracking-widest uppercase text-gold">
            Operation Big Butt
          </span>
        </div>

        <h1 className="text-4xl font-black leading-none text-white mb-3 tracking-tight">
          Train Hard.
          <br />
          <span className="text-gold">Build Your Empire.</span>
        </h1>

        <p className="text-sm text-white/40 font-medium">
          Every rep is a step toward the goal. Log it. Own it.
        </p>
      </div>

      {/* Stats */}
      {sessions.length > 0 && (
        <section className="mb-8">
          <SectionLabel>Your Stats</SectionLabel>
          <StatsGrid sessions={sessions} allTemplates={allTemplates} />
        </section>
      )}

      {/* Workout selection */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <SectionLabel>Start a Session</SectionLabel>
          <Link
            to="/workouts"
            className="text-xs text-white/30 hover:text-gold transition-colors font-semibold"
          >
            Manage +
          </Link>
        </div>

        {groups.map(({ category, templates }) => (
          <div key={category} className="mb-5">
            <div className="flex items-center gap-2 mb-2 px-1">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: templates[0]?.color }}
              />
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/25">
                {CATEGORY_LABELS[category]}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {templates.map((t) => (
                <WorkoutTypeCard
                  key={t.id}
                  template={t}
                  lastSession={lastByName[t.name]}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {sessions.length === 0 && (
        <div className="mt-10 text-center">
          <p className="text-white/20 text-sm">No sessions yet. Pick a workout above to start.</p>
        </div>
      )}
    </div>
  )
}

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">{children}</h2>
)
