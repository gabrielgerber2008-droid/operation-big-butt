export type WorkoutType =
  | 'Glute Day 1'
  | 'Glute Day 2'
  | 'Upper'
  | 'Softball Practice'
  | 'Softball Game';

export type WorkoutCategory = 'gym' | 'softball';

export const WORKOUT_TYPES: WorkoutType[] = [
  'Glute Day 1',
  'Glute Day 2',
  'Upper',
  'Softball Practice',
  'Softball Game',
];

export const TYPE_TO_SLUG: Record<WorkoutType, string> = {
  'Glute Day 1': 'glute-day-1',
  'Glute Day 2': 'glute-day-2',
  Upper: 'upper',
  'Softball Practice': 'softball-practice',
  'Softball Game': 'softball-game',
};

export const SLUG_TO_TYPE: Record<string, WorkoutType> = {
  'glute-day-1': 'Glute Day 1',
  'glute-day-2': 'Glute Day 2',
  upper: 'Upper',
  'softball-practice': 'Softball Practice',
  'softball-game': 'Softball Game',
};

export interface ExerciseLog {
  id: string;
  name: string;
  setsTarget?: number;
  repsTarget?: string;
  weightTarget?: string;
  durationTarget?: string;
  completed: boolean;
  /** User-entered value for weight, reps, or duration actually used */
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
  type: WorkoutType;
  exercises: ExerciseLog[];
  notes: string;
  completed: boolean;
  softball?: Partial<SoftballFields>;
  /** Unix timestamp for sorting */
  createdAt: number;
}
