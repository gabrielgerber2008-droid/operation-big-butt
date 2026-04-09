import { useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'
import type { WorkoutSession, ExerciseLog, SoftballFields, WorkoutTemplate } from '../types'
import { getTemplateById, getDefaultExercises } from '../data/workouts'
import { ExerciseRow } from '../components/ExerciseRow'
import { todayISO } from '../utils/storage'

interface Props {
  onSave: (session: WorkoutSession) => void
  allTemplates: WorkoutTemplate[]
}

const celebrate = () => {
  confetti({ particleCount: 120, spread: 70, origin: { y: 0.65 }, colors: ['#CFB53B', '#ffffff', '#0d0d0d'] })
  setTimeout(() => confetti({ particleCount: 60, spread: 90, origin: { y: 0.55 }, colors: ['#e8cc5a', '#CFB53B'] }), 300)
}

export const LogPage = ({ onSave, allTemplates }: Props) => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const template = slug ? getTemplateById(slug, allTemplates) : undefined
  const isSoftball = template?.category === 'softball'

  const [date, setDate] = useState(todayISO())
  const [notes, setNotes] = useState('')
  const [exercises, setExercises] = useState<ExerciseLog[]>(() =>
    slug ? getDefaultExercises(slug, allTemplates) : [],
  )
  const [softball, setSoftball] = useState<Partial<SoftballFields>>({
    attended: false,
    played: false,
    duration: '',
    intensity: 5,
    hittingFocus: '',
    fieldingFocus: '',
    throwingFocus: '',
    performanceNotes: '',
  })
  const [saved, setSaved] = useState(false)

  const updateExercise = useCallback((updated: ExerciseLog) => {
    setExercises((prev) => prev.map((e) => (e.id === updated.id ? updated : e)))
  }, [])

  const completedCount = exercises.filter((e) => e.completed).length
  const totalCount = exercises.length

  if (!template) {
    return (
      <div className="max-w-lg mx-auto px-4 pt-16 text-center">
        <p className="text-white/40">Unknown workout type.</p>
        <button onClick={() => navigate('/')} className="btn-ghost mt-4">
          Go home
        </button>
      </div>
    )
  }

  const handleSave = (markCompleted: boolean) => {
    const session: WorkoutSession = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      date,
      type: template.name,
      exercises,
      notes,
      completed: markCompleted,
      softball: isSoftball ? softball : undefined,
      createdAt: Date.now(),
    }
    onSave(session)
    if (markCompleted) {
      celebrate()
      setSaved(true)
      setTimeout(() => navigate('/'), 1800)
    } else {
      navigate('/')
    }
  }

  if (saved) {
    return (
      <div className="max-w-lg mx-auto px-4 pt-24 text-center">
        <p className="text-5xl mb-4">🎉</p>
        <h2 className="text-2xl font-black text-gold mb-2">Workout Complete!</h2>
        <p className="text-white/50">Logging it and heading home...</p>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 pb-20">
      {/* Page header */}
      <div className="pt-6 pb-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-white/40 hover:text-white text-sm mb-5 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back
        </button>

        <div className="flex items-center gap-3">
          <span className="text-4xl leading-none">{template.icon}</span>
          <div>
            <h1 className="text-2xl font-black text-white leading-tight">{template.name}</h1>
            <p className="text-sm text-white/35 mt-0.5">{template.description}</p>
          </div>
        </div>
      </div>

      {/* Date */}
      <div className="mb-6">
        <label className="block text-xs font-bold uppercase tracking-widest text-white/30 mb-2">
          Date
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input"
          style={{ colorScheme: 'dark' }}
        />
      </div>

      {/* === GYM WORKOUT SECTION === */}
      {!isSoftball && (
        <>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-widest text-white/30">
                Exercises
              </label>
              {totalCount > 0 && (
                <span className="text-xs text-gold font-semibold">
                  {completedCount}/{totalCount} done
                </span>
              )}
            </div>

            {totalCount > 0 && (
              <div className="w-full bg-obs-4 rounded-full h-1 mb-4">
                <div
                  className="bg-gold rounded-full h-1 transition-all duration-500"
                  style={{ width: `${(completedCount / totalCount) * 100}%` }}
                />
              </div>
            )}

            {totalCount === 0 && (
              <p className="text-white/30 text-sm text-center py-4">No exercises defined for this workout.</p>
            )}

            <div className="space-y-2">
              {exercises.map((ex) => (
                <ExerciseRow key={ex.id} exercise={ex} onChange={updateExercise} />
              ))}
            </div>
          </div>
        </>
      )}

      {/* === SOFTBALL SECTION === */}
      {isSoftball && (
        <div className="space-y-5 mb-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/30 mb-3">
              {template.name === 'Softball Practice' ? 'Attended Practice' : 'Played Game'}
            </label>
            <Toggle
              checked={
                template.name === 'Softball Practice'
                  ? softball.attended ?? false
                  : softball.played ?? false
              }
              onChange={(v) =>
                setSoftball((p) =>
                  template.name === 'Softball Practice'
                    ? { ...p, attended: v }
                    : { ...p, played: v },
                )
              }
              label={template.name === 'Softball Practice' ? 'Yes, I was there' : 'Yes, I played'}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/30 mb-2">
              Duration
            </label>
            <input
              type="text"
              placeholder="e.g. 2 hours, 90 min"
              value={softball.duration ?? ''}
              onChange={(e) => setSoftball((p) => ({ ...p, duration: e.target.value }))}
              className="input"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/30 mb-2">
              Intensity — <span className="text-gold">{softball.intensity ?? 5}/10</span>
            </label>
            <input
              type="range"
              min={1}
              max={10}
              value={softball.intensity ?? 5}
              onChange={(e) =>
                setSoftball((p) => ({ ...p, intensity: Number(e.target.value) }))
              }
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-white/20 mt-1">
              <span>Easy</span>
              <span>Max effort</span>
            </div>
          </div>

          {template.name === 'Softball Practice' && (
            <>
              <TextInput
                label="Hitting Focus"
                placeholder="e.g. gap shots, bunting drills..."
                value={softball.hittingFocus ?? ''}
                onChange={(v) => setSoftball((p) => ({ ...p, hittingFocus: v }))}
              />
              <TextInput
                label="Fielding Focus"
                placeholder="e.g. range, charging, communication..."
                value={softball.fieldingFocus ?? ''}
                onChange={(v) => setSoftball((p) => ({ ...p, fieldingFocus: v }))}
              />
              <TextInput
                label="Throwing Focus"
                placeholder="e.g. accuracy, arm strength..."
                value={softball.throwingFocus ?? ''}
                onChange={(v) => setSoftball((p) => ({ ...p, throwingFocus: v }))}
              />
            </>
          )}

          {template.name === 'Softball Game' && (
            <TextInput
              label="Performance Notes"
              placeholder="Hits, plays, how you felt..."
              value={softball.performanceNotes ?? ''}
              onChange={(v) => setSoftball((p) => ({ ...p, performanceNotes: v }))}
              multiline
            />
          )}
        </div>
      )}

      {/* Notes */}
      <div className="mb-8">
        <label className="block text-xs font-bold uppercase tracking-widest text-white/30 mb-2">
          Notes
        </label>
        <textarea
          placeholder="How did it go? How did you feel? Anything to remember..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="input resize-none leading-relaxed"
        />
      </div>

      {/* Action buttons */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => handleSave(true)}
          className="btn-primary w-full text-base py-4 flex items-center justify-center gap-2"
        >
          <span>Mark Workout Complete</span>
          <span>🏁</span>
        </button>
        <button
          type="button"
          onClick={() => handleSave(false)}
          className="btn-ghost w-full text-sm"
        >
          Save without completing
        </button>
      </div>
    </div>
  )
}

/* Helper sub-components */

const Toggle = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all w-full text-left ${
      checked ? 'border-gold/40 bg-gold/10 text-white' : 'border-obs-4 bg-obs-2 text-white/50'
    }`}
  >
    <span
      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
        checked ? 'bg-gold border-gold text-obs' : 'border-obs-5'
      }`}
    >
      {checked && (
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
          <polyline points="2,6 5,9 10,3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
    <span className="font-medium text-sm">{label}</span>
  </button>
)

const TextInput = ({
  label,
  placeholder,
  value,
  onChange,
  multiline = false,
}: {
  label: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
}) => (
  <div>
    <label className="block text-xs font-bold uppercase tracking-widest text-white/30 mb-2">
      {label}
    </label>
    {multiline ? (
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="input resize-none leading-relaxed"
      />
    ) : (
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input"
      />
    )}
  </div>
)
