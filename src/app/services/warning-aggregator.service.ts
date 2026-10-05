import { Injectable } from '@angular/core';

import { MealWarning } from '../models/meal-warning.model';

@Injectable({
  providedIn: 'root'
})
export class WarningAggregatorService {

  aggregate(
    warnings: MealWarning[]
  ): MealWarning[] {

    return [...warnings].sort(
      (a, b) =>
        (b.priority ?? 0) - (a.priority ?? 0)
    );
  }
}