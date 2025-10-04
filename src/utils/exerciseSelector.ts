import { Exercise } from '@/store/exerciseStore';

export const loadExercises = (): Exercise[] => {
  try {
    const exercises = require('@/assets/exercises/exercises.json');
    return exercises.map((exercise: any) => ({
      ...exercise,
      xpReward: {
        correct: exercise.xpReward?.correct || 5,
        incorrect: exercise.xpReward?.incorrect || 2,
      },
    }));
  } catch (error) {
    console.error('Error loading exercises:', error);
    return [];
  }
};

export const selectDailyExercises = (userInterests: string[], excludedIds: string[] = []): Exercise[] => {
  const allExercises = loadExercises();
  
  // Filter by user interests
  const filteredExercises = allExercises.filter(exercise => 
    userInterests.includes(exercise.skillType) && !excludedIds.includes(exercise.id)
  );
  
  // Shuffle and take first 3
  const shuffled = [...filteredExercises].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
};