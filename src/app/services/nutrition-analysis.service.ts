import { Injectable } from '@angular/core';

import { MealSummary } from '../models/meal-summary.model';
import {
  MealWarning,
  WarningCategory,
  WarningSeverity
} from '../models/meal-warning.model';


@Injectable({
  providedIn: 'root'
})
export class NutritionAnalysisService {


  analyze(
    summary: MealSummary,
    target: {
      protein: number;
      fat: number;
      carbs: number;
    } | null
  ): MealWarning[] {

    const warnings: MealWarning[] = [];

    // Белки

if (target && summary.nutrients.protein > target.protein) {

    warnings.push(
      this.createWarning(
        'protein-high',
        'low',
        'Белка много',
        'Количество белка в текущем составе уже выше дневной цели.',
        40
      )
    );
  
  }
  
  
  // Жиры
  
  if (target && summary.nutrients.fat > target.fat) {
  
    warnings.push(
      this.createWarning(
        'fat-high',
        'medium',
        'Жиров много',
        'Количество жиров в текущем составе уже выше дневной цели.',
        50
      )
    );
  
  }
  
  
  // Углеводы
  
  if (target && summary.nutrients.carbs > target.carbs) {
  
    warnings.push(
      this.createWarning(
        'carbs-high',
        'medium',
        'Углеводов много',
        'Количество углеводов в текущем составе уже выше дневной цели.',
        60
      )
    );
  
  }
  
  
  // Клетчатка
  
  if (summary.nutrients.fiber < 5) {
  
    warnings.push(
      this.createWarning(
        'low-fiber',
        'low',
        'Мало клетчатки',
        'В текущем составе блюда относительно мало клетчатки.',
        30
      )
    );
  
  }


    return warnings;
  }


  private createWarning(
    id: string,
    severity: WarningSeverity,
    title: string,
    message: string,
    priority: number
  ): MealWarning {

    const category: WarningCategory = 'nutrition';

    return {
      id,
      severity,
      category,
      title,
      message,
      priority
    };
  }
}