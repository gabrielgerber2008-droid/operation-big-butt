import { useState } from 'react'
import type { WorkoutTemplate, WorkoutCategory, ExerciseTemplate } from '../types'
import { WORKOUT_CATEGORIES, CATEGORY_LABELS, CATEGORY_COLORS } from '../types'
import { BUILT_IN_TEMPLATES } from '../data/workouts'

interface Props {
  allTemplates: WorkoutTemplate[]
  onSave: (template: WorkoutTemplate) => void
  onEdit: (template: WorkoutTemplate) => void
  onDelete: (id: string) => void
}

const BLANK_TEMPLATE: Omit<WorkoutTemplate, 'id' | 'isCustom'> = {
  name: '',
  category: 'other',
  color: CATEGORY_COLORS.other,
  icon: '💪',
  description: '',
  exercises: [],
}

const BLANK_EXERCISE: ExerciseTemplate = { name: '' }

export const ManageWorkoutsPage = ({ allTemplates, onSave, onEdit, onDelete }: Props) => {
  const [editing, setEditing] = useState<WorkoutTemplate | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const customTemplates = allTemplates.filter((t) => t.isCustom)

  const startNew = () => {
    setEditing({
      id: `tmpl_${Date.now().toString(36)}`,
      isCustom: true,
      ...BLANK_TEMPLATE,
    })
    setIsNew(true)
  }

  const startEdit = (t: WorkoutTemplate) => {
    setEditing({ ...t })
    setIsNew(false)
  }

  const handleSave = () => {
    if (!editing || !editing.name.trim()) return
    if (isNew) onSave(editing)
    else onEdit(editing)
    setEditing(null)
  }

  const handleDelete = (id: string) => {
    if (confirmDelete === id) {
      onDelete(id)
      setConfirmDelete(null)
    } else {
      setConfirmDelete(id)
      setTimeout(() => setConfirmDelete(null), 3000)
    }
  }

  if (editing) {
    return (
      <WorkoutForm
        template={editing}
        onChange={setEditing}
        onSave={handleSave}
        onCancel={() => setEditing(null)}
        isNew={isNew}
      />
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 pb-16">
      <div className="pt-8 pb-6">
        <h1 className="text-3xl font-black text-white leading-tight">Workouts</h1>
        <p className="text-sm text-white/35 mt-1">Manage your workout templates</p>
      </div>

      {/* Custom workouts */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <SectionLabel>My Workouts</SectionLabel>
          <button
            type="button"
            onClick={startNew}
            className="flex items-center gap-1.5 text-xs font-bold text-gold hover:text-gold-light transition-colors px-3 py-1.5 rounded-lg bg-gold/10 hover:bg-gold/15"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            New Workout
          </button>
        </div>

        {customTemplates.length === 0 ? (
          <div className="card p-6 text-center">
            <p className="text-white/25 text-sm mb-3">No custom workouts yet.</p>
            <button type="button" onClick={startNew} className="btn-primary text-sm px-5 py-2">
              Create Your First
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {customTemplates.map((t) => (
              <div key={t.id} className="card p-4 flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: t.color }}
                />
                <span className="text-xl leading-none">{t.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-white leading-tight">{t.name}</p>
                  <p className="text-xs text-white/30 mt-0.5">
                    {CATEGORY_LABELS[t.category]} · {t.exercises.length} exercises
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => startEdit(t)}
                    className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-obs-3 transition-colors"
                    title="Edit"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(t.id)}
                    className={`p-2 rounded-lg transition-colors text-xs font-semibold ${
                      confirmDelete === t.id
                        ? 'text-red-400 bg-red-400/10'
                        : 'text-white/20 hover:text-red-400 hover:bg-red-400/5'
                    }`}
                    title="Delete"
                  >
                    {confirmDelete === t.id ? (
                      <span className="px-1">Sure?</span>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Built-in workouts */}
      <section>
        <SectionLabel>Built-in Workouts</SectionLabel>
        <div className="space-y-2">
          {BUILT_IN_TEMPLATES.map((t) => (
            <div key={t.id} className="card p-4 flex items-center gap-3 opacity-60">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: t.color }}
              />
              <span className="text-xl leading-none">{t.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-white leading-tight">{t.name}</p>
                <p className="text-xs text-white/30 mt-0.5">
                  {CATEGORY_LABELS[t.category]} · {t.exercises.length} exercises
                </p>
              </div>
              <span className="text-[10px] text-white/20 font-bold uppercase tracking-wide shrink-0">
                Built-in
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

/* ─── Workout Form ─────────────────────────────────────────────────────────── */

interface FormProps {
  template: WorkoutTemplate
  onChange: (t: WorkoutTemplate) => void
  onSave: () => void
  onCancel: () => void
  isNew: boolean
}

const WorkoutForm = ({ template, onChange, onSave, onCancel, isNew }: FormProps) => {
  const set = <K extends keyof WorkoutTemplate>(key: K, value: WorkoutTemplate[K]) =>
    onChange({ ...template, [key]: value })

  const setCategory = (cat: WorkoutCategory) =>
    onChange({ ...template, category: cat, color: CATEGORY_COLORS[cat] })

  const addExercise = () =>
    set('exercises', [...template.exercises, { ...BLANK_EXERCISE }])

  const updateExercise = (i: number, ex: ExerciseTemplate) => {
    const exercises = [...template.exercises]
    exercises[i] = ex
    set('exercises', exercises)
  }

  const removeExercise = (i: number) =>
    set('exercises', template.exercises.filter((_, idx) => idx !== i))

  const moveExercise = (i: number, dir: -1 | 1) => {
    const exercises = [...template.exercises]
    const j = i + dir
    if (j < 0 || j >= exercises.length) return
    ;[exercises[i], exercises[j]] = [exercises[j], exercises[i]]
    set('exercises', exercises)
  }

  return (
    <div className="max-w-lg mx-auto px-4 pb-20">
      <div className="pt-6 pb-6">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-1.5 text-white/40 hover:text-white text-sm mb-5 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Cancel
        </button>
        <h1 className="text-2xl font-black text-white">
          {isNew ? 'New Workout' : `Edit: ${template.name}`}
        </h1>
      </div>

      <div className="space-y-6">
        {/* Name + Icon row */}
        <div className="flex gap-3">
          <div className="w-20 shrink-0">
            <label className="block text-xs font-bold uppercase tracking-widest text-white/30 mb-2">
              Icon
            </label>
            <input
              type="text"
              value={template.icon}
              onChange={(e) => set('icon', e.target.value)}
              className="input text-center text-2xl"
              maxLength={2}
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold uppercase tracking-widest text-white/30 mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="e.g. Leg Day, Full Body..."
              value={template.name}
              onChange={(e) => set('name', e.target.value)}
              className="input"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-white/30 mb-2">
            Description
          </label>
          <input
            type="text"
            placeholder="Short description, e.g. Squats · Lunges · Deadlifts"
            value={template.description}
            onChange={(e) => set('description', e.target.value)}
            className="input"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-white/30 mb-2">
            Category
          </label>
          <div className="grid grid-cols-2 gap-2">
            {WORKOUT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-all text-left ${
                  template.category === cat
                    ? 'border-current bg-current/10'
                    : 'border-obs-4 bg-obs-2 text-white/40 hover:border-obs-5 hover:text-white/60'
                }`}
                style={
                  template.category === cat
                    ? { borderColor: `${CATEGORY_COLORS[cat]}60`, color: CATEGORY_COLORS[cat], backgroundColor: `${CATEGORY_COLORS[cat]}15` }
                    : undefined
                }
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: CATEGORY_COLORS[cat] }}
                />
                <span className="text-xs font-semibold">{CATEGORY_LABELS[cat]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Exercises */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold uppercase tracking-widest text-white/30">
              Exercises
            </label>
            <button
              type="button"
              onClick={addExercise}
              className="flex items-center gap-1 text-xs font-semibold text-gold hover:text-gold-light transition-colors"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Add Exercise
            </button>
          </div>

          {template.exercises.length === 0 && (
            <p className="text-white/25 text-sm text-center py-4 border border-dashed border-obs-4 rounded-xl">
              No exercises yet. Add some below.
            </p>
          )}

          <div className="space-y-2">
            {template.exercises.map((ex, i) => (
              <ExerciseFormRow
                key={i}
                exercise={ex}
                index={i}
                total={template.exercises.length}
                onChange={(updated) => updateExercise(i, updated)}
                onRemove={() => removeExercise(i)}
                onMove={(dir) => moveExercise(i, dir)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="mt-8 space-y-3">
        <button
          type="button"
          onClick={onSave}
          disabled={!template.name.trim()}
          className="btn-primary w-full text-base py-4 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isNew ? 'Create Workout' : 'Save Changes'}
        </button>
        <button type="button" onClick={onCancel} className="btn-ghost w-full text-sm">
          Cancel
        </button>
      </div>
    </div>
  )
}

/* ─── Exercise form row ────────────────────────────────────────────────────── */

interface ExRowProps {
  exercise: ExerciseTemplate
  index: number
  total: number
  onChange: (ex: ExerciseTemplate) => void
  onRemove: () => void
  onMove: (dir: -1 | 1) => void
}

const ExerciseFormRow = ({ exercise, index, total, onChange, onRemove, onMove }: ExRowProps) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="card p-3">
      <div className="flex items-center gap-2">
        {/* Reorder */}
        <div className="flex flex-col gap-0.5 shrink-0">
          <button
            type="button"
            onClick={() => onMove(-1)}
            disabled={index === 0}
            className="text-white/20 hover:text-white/50 disabled:opacity-0 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"/>
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onMove(1)}
            disabled={index === total - 1}
            className="text-white/20 hover:text-white/50 disabled:opacity-0 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
        </div>

        {/* Name */}
        <input
          type="text"
          placeholder={`Exercise ${index + 1}`}
          value={exercise.name}
          onChange={(e) => onChange({ ...exercise, name: e.target.value })}
          className="input flex-1 text-sm py-2"
        />

        {/* Expand details */}
        <button
          type="button"
          onClick={() => setExpanded((p) => !p)}
          className="text-white/25 hover:text-white/50 transition-colors p-1 shrink-0"
          title="Set targets"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
          </svg>
        </button>

        {/* Remove */}
        <button
          type="button"
          onClick={onRemove}
          className="text-white/20 hover:text-red-400 transition-colors p-1 shrink-0"
          title="Remove"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Expanded targets */}
      {expanded && (
        <div className="mt-3 pt-3 border-t border-obs-4 grid grid-cols-2 gap-2">
          <SmallInput
            label="Sets"
            placeholder="3"
            value={exercise.setsTarget != null ? String(exercise.setsTarget) : ''}
            onChange={(v) => onChange({ ...exercise, setsTarget: v ? Number(v) : undefined })}
            type="number"
          />
          <SmallInput
            label="Reps"
            placeholder="12 or 8-12"
            value={exercise.repsTarget ?? ''}
            onChange={(v) => onChange({ ...exercise, repsTarget: v || undefined })}
          />
          <SmallInput
            label="Weight"
            placeholder="20 lbs"
            value={exercise.weightTarget ?? ''}
            onChange={(v) => onChange({ ...exercise, weightTarget: v || undefined })}
          />
          <SmallInput
            label="Duration"
            placeholder="5 min"
            value={exercise.durationTarget ?? ''}
            onChange={(v) => onChange({ ...exercise, durationTarget: v || undefined })}
          />
        </div>
      )}
    </div>
  )
}

const SmallInput = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
}: {
  label: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  type?: string
}) => (
  <div>
    <p className="text-[10px] font-bold uppercase tracking-widest text-white/25 mb-1">{label}</p>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input text-sm py-1.5"
      min={type === 'number' ? 1 : undefined}
    />
  </div>
)

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">{children}</h2>
)
