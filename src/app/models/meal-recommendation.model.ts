export type RecommendationStrategy =
  | 'minimal-change'
  | 'balanced'
  | 'satiety';

export interface MealRecommendation {
  id: string;

  strategy: RecommendationStrategy;

  title: string;

  message: string;

  suggestedProducts: string[];

  priority?: number;
}