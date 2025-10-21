
import type { ActivityLevelKey } from './types';

export const ACTIVITY_LEVELS: Record<ActivityLevelKey, { value: number; label: string }> = {
  sedentary: { value: 1.2, label: 'Сидячий образ жизни' },
  light: { value: 1.375, label: 'Легкая активность (1-3 раза в неделю)' },
  moderate: { value: 1.55, label: 'Умеренная активность (3-5 раз в неделю)' },
  active: { value: 1.725, label: 'Высокая активность (6-7 раз в неделю)' },
  extra: { value: 1.9, label: 'Экстремальная активность (спортсмены)' },
};
