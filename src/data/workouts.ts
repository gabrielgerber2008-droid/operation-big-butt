import type { WorkoutTemplate, ExerciseTemplate, ExerciseLog, WorkoutCategory } from '../types'
import { CATEGORY_COLORS } from '../types'

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

export const BUILT_IN_TEMPLATES: WorkoutTemplate[] = [
  {
    id: 'glute-day-1',
    name: 'Glute Day 1',
    category: 'glutes',
    color: CATEGORY_COLORS.glutes,
    icon: '🍑',
    description: 'Bridges · Lunges · Thrusts · StairMaster',
    isCustom: false,
    exercises: GLUTE_1,
  },
  {
    id: 'glute-day-2',
    name: 'Glute Day 2',
    category: 'glutes',
    color: CATEGORY_COLORS.glutes,
    icon: '🍑',
    description: 'Splits · Squats · Abduction · StairMaster',
    isCustom: false,
    exercises: GLUTE_2,
  },
  {
    id: 'upper',
    name: 'Upper',
    category: 'upper',
    color: CATEGORY_COLORS.upper,
    icon: '💪',
    description: 'Press · Rows · Shoulders · Curls',
    isCustom: false,
    exercises: UPPER,
  },
  {
    id: 'softball-practice',
    name: 'Softball Practice',
    category: 'softball',
    color: CATEGORY_COLORS.softball,
    icon: '⚾',
    description: 'Log your practice session',
    isCustom: false,
    exercises: [],
  },
  {
    id: 'softball-game',
    name: 'Softball Game',
    category: 'softball',
    color: CATEGORY_COLORS.softball,
    icon: '🏆',
    description: 'Log your game performance',
    isCustom: false,
    exercises: [],
  },
]

export const getTemplateById = (
  id: string,
  allTemplates: WorkoutTemplate[],
): WorkoutTemplate | undefined => allTemplates.find((t) => t.id === id)

export const getTemplateByName = (
  name: string,
  allTemplates: WorkoutTemplate[],
): WorkoutTemplate | undefined => allTemplates.find((t) => t.name === name)

export const getDefaultExercises = (
  templateId: string,
  allTemplates: WorkoutTemplate[],
): ExerciseLog[] => {
  const template = getTemplateById(templateId, allTemplates)
  return (template?.exercises ?? []).map(toLog)
}

/** Group templates by category, preserving display order */
export const groupTemplatesByCategory = (
  templates: WorkoutTemplate[],
): Array<{ category: WorkoutCategory; templates: WorkoutTemplate[] }> => {
  const map = new Map<WorkoutCategory, WorkoutTemplate[]>()
  for (const t of templates) {
    if (!map.has(t.category)) map.set(t.category, [])
    map.get(t.category)!.push(t)
  }
  return Array.from(map.entries()).map(([category, templates]) => ({ category, templates }))
}
