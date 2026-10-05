import { Injectable } from '@angular/core';

import { MealItem } from '../models/meal.model';
import { MealWarning } from '../models/meal-warning.model';

@Injectable({
  providedIn: 'root'
})
export class CombinationAnalysisService {

    analyze(
        items: MealItem[]
      ): MealWarning[] {
      
        const warnings: MealWarning[] = [];
      
        const highCarbItems = items.filter(
          item => item.nutrients.carbs >= 15
        );
      
        if (highCarbItems.length >= 2) {
      
          warnings.push({
            id: 'multiple-carb-products',
            severity: 'info',
            category: 'combination',
            title: 'Несколько углеводных продуктов',
            message:
              'В текущем составе несколько продуктов с заметным количеством углеводов.',
            priority: 20
          });
        }
      
        return warnings;
      }
}