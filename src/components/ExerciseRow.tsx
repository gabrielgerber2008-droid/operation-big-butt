import type { ExerciseLog } from '../types'

interface Props {
  exercise: ExerciseLog
  onChange: (updated: ExerciseLog) => void
}

export const ExerciseRow = ({ exercise, onChange }: Props) => {
  const { completed, name, setsTarget, repsTarget, weightTarget, durationTarget, actualValue } =
    exercise

  const targetLabel = [
    setsTarget ? `${setsTarget} × ${repsTarget ?? '—'}` : null,
    !setsTarget && durationTarget ? durationTarget : null,
    weightTarget ? weightTarget : null,
  ]
    .filter(Boolean)
    .join('  ·  ')

  return (
    <div
      className={`flex flex-col gap-2 p-4 rounded-xl border transition-all duration-200 ${
        completed
          ? 'border-gold/30 bg-gold/5'
          : 'border-obs-4 bg-obs-2'
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Checkbox */}
        <button
          type="button"
          onClick={() => onChange({ ...exercise, completed: !completed })}
          className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            completed
              ? 'bg-gold border-gold text-obs'
              : 'border-obs-5 hover:border-gold/50'
          }`}
          aria-label={completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {completed && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <polyline points="2,6 5,9 10,3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-sm leading-tight ${completed ? 'text-white/50 line-through' : 'text-white'}`}>
            {name}
          </p>
          {targetLabel && (
            <p className="text-xs text-white/35 mt-0.5">{targetLabel}</p>
          )}
        </div>
      </div>

      {/* Actual value input — only visible when exercise is checked */}
      {completed && (
        <input
          type="text"
          placeholder="Actual weight / notes (optional)"
          value={actualValue ?? ''}
          onChange={(e) => onChange({ ...exercise, actualValue: e.target.value })}
          className="input text-sm py-2 mt-1"
        />
      )}
    </div>
  )
}
