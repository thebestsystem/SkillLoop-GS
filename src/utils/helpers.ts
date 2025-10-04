export const XP_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2200, 3000, 4000, 5500];

export const calculateLevel = (xp: number): number => {
  return XP_THRESHOLDS.findIndex(t => xp < t) || XP_THRESHOLDS.length;
};

export const getXPForNextLevel = (xp: number): number => {
  const currentLevel = calculateLevel(xp);
  if (currentLevel >= XP_THRESHOLDS.length - 1) return 0;
  return XP_THRESHOLDS[currentLevel] - xp;
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};