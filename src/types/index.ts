export type WorkoutCategory =
  | 'glutes'
  | 'upper'
  | 'legs'
  | 'softball'
  | 'cardio'
  | 'full_body'
  | 'other'

export const WORKOUT_CATEGORIES: WorkoutCategory[] = [
  'glutes', 'upper', 'legs', 'softball', 'cardio', 'full_body', 'other',
]

export const CATEGORY_COLORS: Record<WorkoutCategory, string> = {
  glutes: '#f472b6',
  upper: '#60a5fa',
  legs: '#fb923c',
  softball: '#4ade80',
  cardio: '#facc15',
  full_body: '#c084fc',
  other: '#94a3b8',
}

export const CATEGORY_LABELS: Record<WorkoutCategory, string> = {
  glutes: 'Glutes',
  upper: 'Upper Body',
  legs: 'Legs',
  softball: 'Softball',
  cardio: 'Cardio',
  full_body: 'Full Body',
  other: 'Other',
}

export interface ExerciseTemplate {
  name: string
  setsTarget?: number
  repsTarget?: string
  weightTarget?: string
  durationTarget?: string
}

export interface WorkoutTemplate {
  id: string
  name: string
  category: WorkoutCategory
  color: string
  icon: string
  description: string
  isCustom: boolean
  exercises: ExerciseTemplate[]
}

export interface ExerciseLog {
  id: string;
  name: string;
  setsTarget?: number;
  repsTarget?: string;
  weightTarget?: string;
  durationTarget?: string;
  completed: boolean;
  actualValue?: string;
}

export interface SoftballFields {
  attended: boolean;
  played: boolean;
  duration: string;
  intensity: number;
  hittingFocus: string;
  fieldingFocus: string;
  throwingFocus: string;
  performanceNotes: string;
}

export interface WorkoutSession {
  id: string;
  /** ISO date string YYYY-MM-DD */
  date: string;
  /** Workout name (display label) */
  type: string;
  exercises: ExerciseLog[];
  notes: string;
  completed: boolean;
  softball?: Partial<SoftballFields>;
  /** Unix timestamp for sorting */
  createdAt: number;
}
