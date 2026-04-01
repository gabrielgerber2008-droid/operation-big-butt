import type { WorkoutSession, WorkoutType } from '../types'
import { WorkoutTypeCard } from '../components/WorkoutTypeCard'
import { StatsGrid } from '../components/StatsGrid'
import { shortDate } from '../utils/storage'

interface Props {
  sessions: WorkoutSession[]
}

export const HomePage = ({ sessions }: Props) => {
  // Find the most recent date per workout type
  const lastByType: Partial<Record<WorkoutType, string>> = {}
  for (const s of sessions) {
    if (s.completed && !lastByType[s.type]) {
      lastByType[s.type] = shortDate(s.date)
    }
  }

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
          <StatsGrid sessions={sessions} />
        </section>
      )}

      {/* Workout selection */}
      <section>
        <SectionLabel>Start a Session</SectionLabel>

        {/* Glute days */}
        <div className="mb-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/25 mb-2 px-1">
            Glute
          </p>
          <div className="grid grid-cols-1 gap-3">
            <WorkoutTypeCard type="Glute Day 1" lastSession={lastByType['Glute Day 1']} />
            <WorkoutTypeCard type="Glute Day 2" lastSession={lastByType['Glute Day 2']} />
          </div>
        </div>

        {/* Upper */}
        <div className="mb-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/25 mb-2 px-1">
            Upper Body
          </p>
          <WorkoutTypeCard type="Upper" lastSession={lastByType['Upper']} />
        </div>

        {/* Softball */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/25 mb-2 px-1">
            Softball
          </p>
          <div className="grid grid-cols-1 gap-3">
            <WorkoutTypeCard
              type="Softball Practice"
              lastSession={lastByType['Softball Practice']}
            />
            <WorkoutTypeCard type="Softball Game" lastSession={lastByType['Softball Game']} />
          </div>
        </div>
      </section>

      {/* Empty state motivation */}
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

