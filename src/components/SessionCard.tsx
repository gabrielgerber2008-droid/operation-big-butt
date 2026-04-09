import { useState } from 'react'
import type { WorkoutSession, WorkoutTemplate } from '../types'
import { formatDate } from '../utils/storage'

interface Props {
  session: WorkoutSession
  onDelete: (id: string) => void
  allTemplates: WorkoutTemplate[]
}

export const SessionCard = ({ session, onDelete, allTemplates }: Props) => {
  const [expanded, setExpanded] = useState(false)
  const [confirming, setConfirming] = useState(false)

  const template = allTemplates.find((t) => t.name === session.type)
  const icon = template?.icon ?? '💪'
  const color = template?.color

  const exerciseCount = session.exercises.length
  const doneCount = session.exercises.filter((e) => e.completed).length

  const handleDelete = () => {
    if (confirming) {
      onDelete(session.id)
    } else {
      setConfirming(true)
      setTimeout(() => setConfirming(false), 3000)
    }
  }

  return (
    <div className="card overflow-hidden">
      {/* Category color strip */}
      {color && (
        <div className="h-0.5 w-full" style={{ backgroundColor: color }} />
      )}

      {/* Header row — always visible */}
      <button
        type="button"
        className="w-full p-4 flex items-center gap-3 text-left"
        onClick={() => setExpanded((p) => !p)}
      >
        <span className="text-2xl leading-none shrink-0">{icon}</span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-bold text-sm text-white leading-tight">{session.type}</h4>
            {session.completed ? (
              <span className="badge bg-gold/15 text-gold">Completed</span>
            ) : (
              <span className="badge bg-white/5 text-white/40">Partial</span>
            )}
          </div>
          <p className="text-xs text-white/40 mt-0.5">{formatDate(session.date)}</p>
        </div>

        {/* Exercise completion pill */}
        {exerciseCount > 0 && (
          <div className="text-right shrink-0">
            <span className="text-xs font-semibold text-white/50">
              {doneCount}/{exerciseCount}
            </span>
            <p className="text-[10px] text-white/25">exercises</p>
          </div>
        )}

        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-white/25 shrink-0 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-obs-4 px-4 pb-4 pt-3 space-y-4">
          {/* Exercises */}
          {session.exercises.length > 0 && (
            <div className="space-y-1.5">
              {session.exercises.map((ex) => (
                <div key={ex.id} className="flex items-center gap-2 py-1">
                  <span
                    className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center ${
                      ex.completed ? 'bg-gold border-gold text-obs' : 'border-obs-5'
                    }`}
                  >
                    {ex.completed && (
                      <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                        <polyline points="2,6 5,9 10,3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className={`text-sm flex-1 ${ex.completed ? 'text-white/60' : 'text-white/40'}`}>
                    {ex.name}
                  </span>
                  {ex.actualValue && (
                    <span className="text-xs text-gold/70 font-medium">{ex.actualValue}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Softball fields */}
          {session.softball && (
            <div className="space-y-1 text-sm text-white/60">
              {session.softball.duration && (
                <p>Duration: <span className="text-white/80">{session.softball.duration}</span></p>
              )}
              {session.softball.intensity != null && (
                <p>Intensity: <span className="text-gold font-semibold">{session.softball.intensity}/10</span></p>
              )}
              {session.softball.hittingFocus && (
                <p>Hitting: <span className="text-white/80">{session.softball.hittingFocus}</span></p>
              )}
              {session.softball.fieldingFocus && (
                <p>Fielding: <span className="text-white/80">{session.softball.fieldingFocus}</span></p>
              )}
              {session.softball.throwingFocus && (
                <p>Throwing: <span className="text-white/80">{session.softball.throwingFocus}</span></p>
              )}
              {session.softball.performanceNotes && (
                <p>Performance: <span className="text-white/80">{session.softball.performanceNotes}</span></p>
              )}
            </div>
          )}

          {/* Notes */}
          {session.notes && (
            <div className="bg-obs-3 rounded-xl p-3">
              <p className="text-xs text-white/30 font-semibold uppercase tracking-widest mb-1">Notes</p>
              <p className="text-sm text-white/70 leading-relaxed">{session.notes}</p>
            </div>
          )}

          {/* Delete */}
          <button
            type="button"
            onClick={handleDelete}
            className={`text-xs font-semibold py-1.5 px-3 rounded-lg transition-colors ${
              confirming
                ? 'text-red-400 bg-red-400/10 border border-red-400/30'
                : 'text-white/30 hover:text-red-400 hover:bg-red-400/5'
            }`}
          >
            {confirming ? 'Tap again to confirm delete' : 'Delete entry'}
          </button>
        </div>
      )}
    </div>
  )
}
