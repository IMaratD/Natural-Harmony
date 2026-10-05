export type WarningSeverity =
  | 'info'
  | 'low'
  | 'medium'
  | 'high';


export type WarningCategory =
  | 'nutrition'
  | 'combination'
  | 'daily-target'
  | 'recommendation';


export interface MealWarning {
  id: string;

  severity: WarningSeverity;

  category: WarningCategory;

  title: string;

  message: string;

  relatedProductIds?: string[];

  priority?: number;
}