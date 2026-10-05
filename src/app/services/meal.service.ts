import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { FoodProduct, FoodVariant } from '../models/food.model';
import { MealItem } from '../models/meal.model';
import { Nutrients } from '../models/nutrients.model';
import { MealSummary } from '../models/meal-summary.model';

interface NutritionResult {
  nutrients: Nutrients;
  netCarbs: number;
  xe: number;
  calories: number;
}

@Injectable({
  providedIn: 'root'
})
export class MealService {

  private itemsSubject = new BehaviorSubject<MealItem[]>([]);

  items$: Observable<MealItem[]> =
    this.itemsSubject.asObservable();


  getItems(): Observable<MealItem[]> {
    return this.items$;
  }


  addItem(
    product: FoodProduct,
    variant: FoodVariant,
    grams: number
  ): void {

    const items = this.itemsSubject.value;

    const existing = items.find(
      item =>
        item.product.id === product.id &&
        item.variant.id === variant.id
    );

    if (existing) {

      existing.grams += grams;

      const nutrition = this.calculateNutrition(
        variant,
        existing.grams
      );

      existing.nutrients = nutrition.nutrients;
      existing.xe = nutrition.xe;

      this.itemsSubject.next([...items]);

      return;
    }


    const nutrition = this.calculateNutrition(
      variant,
      grams
    );

    const newItem: MealItem = {
      product,
      variant,
      grams,
      nutrients: nutrition.nutrients,
      xe: nutrition.xe
    };

    this.itemsSubject.next([
      ...items,
      newItem
    ]);
  }


  updateItem(index: number, grams: number): void {

    if (grams <= 0) {
      return;
    }

    const items = [...this.itemsSubject.value];

    if (!items[index]) {
      return;
    }

    const item = items[index];

    const nutrition = this.calculateNutrition(
      item.variant,
      grams
    );

    items[index] = {
      ...item,
      grams,
      nutrients: nutrition.nutrients,
      xe: nutrition.xe
    };

    this.itemsSubject.next(items);
  }


  removeItem(index: number): void {

    const items = [...this.itemsSubject.value];

    if (!items[index]) {
      return;
    }

    items.splice(index, 1);

    this.itemsSubject.next(items);
  }


  clear(): void {
    this.itemsSubject.next([]);
  }


  getSummary(): MealSummary {

    const nutrients = this.getTotalNutrients();

    const netCarbs = Math.max(
      0,
      nutrients.carbs - nutrients.fiber
    );

    const xe = netCarbs / 12;

    const calories =
      nutrients.protein * 4 +
      nutrients.carbs * 4 +
      nutrients.fat * 9;

    return {
      nutrients,
      xe,
      calories,
      netCarbs
    };
  }


  calculateNutrition(
    variant: FoodVariant,
    grams: number
  ): NutritionResult {

    const factor = grams / 100;

    const nutrients: Nutrients = {
      protein:
        variant.nutrientsPer100g.protein * factor,

      fat:
        variant.nutrientsPer100g.fat * factor,

      carbs:
        variant.nutrientsPer100g.carbs * factor,

      fiber:
        variant.nutrientsPer100g.fiber * factor
    };

    const netCarbs = Math.max(
      0,
      nutrients.carbs - nutrients.fiber
    );

    const xe = netCarbs / 12;

    const calories =
      nutrients.protein * 4 +
      nutrients.carbs * 4 +
      nutrients.fat * 9;

    return {
      nutrients,
      netCarbs,
      xe,
      calories
    };
  }


  private getTotalNutrients(): Nutrients {

    return this.itemsSubject.value.reduce(
      (total, item) => ({
        protein:
          total.protein + item.nutrients.protein,

        fat:
          total.fat + item.nutrients.fat,

        carbs:
          total.carbs + item.nutrients.carbs,

        fiber:
          total.fiber + item.nutrients.fiber
      }),
      {
        protein: 0,
        fat: 0,
        carbs: 0,
        fiber: 0
      }
    );
  }
}
