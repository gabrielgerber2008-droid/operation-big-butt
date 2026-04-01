import { useNavigate } from 'react-router-dom'
import type { WorkoutType } from '../types'
import { TYPE_TO_SLUG } from '../types'
import { WORKOUT_META } from '../data/workouts'

interface Props {
  type: WorkoutType
  lastSession?: string | null
}

export const WorkoutTypeCard = ({ type, lastSession }: Props) => {
  const navigate = useNavigate()
  const meta = WORKOUT_META[type]

  return (
    <button
      onClick={() => navigate(`/log/${TYPE_TO_SLUG[type]}`)}
      className={`card-hover w-full text-left p-5 bg-gradient-to-br ${meta.color} relative overflow-hidden group`}
    >
      {/* Gold accent line */}
      <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold opacity-0 group-hover:opacity-100 transition-opacity rounded-l-2xl" />

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-2xl mb-2 leading-none">{meta.icon}</p>
          <h3 className="font-bold text-base text-white leading-tight">{type}</h3>
          <p className="text-xs text-white/40 mt-1 leading-relaxed">{meta.description}</p>
          {lastSession && (
            <p className="text-xs text-gold/60 mt-2">Last: {lastSession}</p>
          )}
        </div>
        <div className="text-white/20 group-hover:text-gold/60 transition-colors mt-1 shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </div>
      </div>
    </button>
  )
}
