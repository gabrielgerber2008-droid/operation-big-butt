import type { WorkoutType, ExerciseLog, WorkoutCategory } from '../types'

interface ExerciseTemplate {
  name: string
  setsTarget?: number
  repsTarget?: string
  weightTarget?: string
  durationTarget?: string
}

const toLog = (t: ExerciseTemplate, i: number): ExerciseLog => ({
  id: String(i),
  ...t,
  completed: false,
})

const GLUTE_1: ExerciseTemplate[] = [
  { name: 'Walk — Warm-up', durationTarget: '5 min', weightTarget: 'Incline 5' },
  { name: 'Walking Lunges', setsTarget: 3, repsTarget: '12' },
  { name: 'Weighted Glute Bridges', setsTarget: 3, repsTarget: '15', weightTarget: '20 lbs' },
  { name: 'Step Ups', setsTarget: 3, repsTarget: '10 each' },
  { name: 'Hip Thrusts', setsTarget: 3, repsTarget: '10' },
  { name: 'Kickbacks', setsTarget: 3, repsTarget: '10 each' },
  { name: 'RDLs', setsTarget: 3, repsTarget: '12' },
  { name: 'StairMaster — Finisher', durationTarget: '10 min', weightTarget: 'Level 8-10' },
]

const GLUTE_2: ExerciseTemplate[] = [
  { name: 'Walk — Warm-up', durationTarget: '5 min', weightTarget: 'Incline 5' },
  { name: 'Walking Lunges', setsTarget: 3, repsTarget: '12' },
  { name: 'Weighted Glute Bridges', setsTarget: 3, repsTarget: '15', weightTarget: '20 lbs' },
  { name: 'Bulgarian Split Squats', setsTarget: 3, repsTarget: '8-10 each' },
  { name: 'Goblet Squat', setsTarget: 3, repsTarget: '10-12' },
  { name: 'Leg Curl', setsTarget: 3, repsTarget: '12' },
  { name: 'Hip Abduction', setsTarget: 3, repsTarget: '15-20' },
  { name: 'StairMaster — Finisher', durationTarget: '10 min', weightTarget: 'Level 8-10' },
]

const UPPER: ExerciseTemplate[] = [
  { name: 'Walk — Warm-up', durationTarget: '5 min', weightTarget: 'Incline 5' },
  { name: 'Dumbbell Bench Press', setsTarget: 3, repsTarget: '8-12', weightTarget: '22.5 lbs' },
  { name: 'Lat Pulldowns', setsTarget: 3, repsTarget: '8-12' },
  { name: 'Dumbbell Shoulder Press', setsTarget: 3, repsTarget: '8-12' },
  { name: 'Seated Row', setsTarget: 3, repsTarget: '8-12' },
  { name: 'Dumbbell Lateral Raise', setsTarget: 3, repsTarget: '12-15' },
  { name: 'Bicep Curls', setsTarget: 3, repsTarget: '10-12' },
]

const EXERCISE_MAP: Partial<Record<WorkoutType, ExerciseTemplate[]>> = {
  'Glute Day 1': GLUTE_1,
  'Glute Day 2': GLUTE_2,
  Upper: UPPER,
}

export const getDefaultExercises = (type: WorkoutType): ExerciseLog[] =>
  (EXERCISE_MAP[type] ?? []).map(toLog)

export const WORKOUT_META: Record<
  WorkoutType,
  { icon: string; description: string; category: WorkoutCategory; color: string }
> = {
  'Glute Day 1': {
    icon: '🍑',
    description: 'Bridges · Lunges · Thrusts · StairMaster',
    category: 'gym',
    color: 'from-gold/20 to-transparent',
  },
  'Glute Day 2': {
    icon: '🍑',
    description: 'Splits · Squats · Abduction · StairMaster',
    category: 'gym',
    color: 'from-gold/20 to-transparent',
  },
  Upper: {
    icon: '💪',
    description: 'Press · Rows · Shoulders · Curls',
    category: 'gym',
    color: 'from-gold/10 to-transparent',
  },
  'Softball Practice': {
    icon: '⚾',
    description: 'Log your practice session',
    category: 'softball',
    color: 'from-white/10 to-transparent',
  },
  'Softball Game': {
    icon: '🏆',
    description: 'Log your game performance',
    category: 'softball',
    color: 'from-white/10 to-transparent',
  },
}
