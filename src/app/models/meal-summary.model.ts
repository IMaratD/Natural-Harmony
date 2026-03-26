import { Nutrients } from './nutrients.model';

export interface MealSummary {
  nutrients: Nutrients;
  xe: number;
  calories: number;
  netCarbs: number;
}
