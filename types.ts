
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export type ActivityLevelKey = 'sedentary' | 'light' | 'moderate' | 'active' | 'extra';

export interface UserData {
  age: number | string;
  weight: number | string;
  height: number | string;
  gender: Gender;
  activityLevel: ActivityLevelKey;
}

export interface CalorieResults {
  maintenance: number;
  weightLoss: number;
  massGain: number;
}
