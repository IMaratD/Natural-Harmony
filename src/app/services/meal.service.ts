import { Injectable } from "@angular/core";
import { MealItem } from "../models/meal.model";
import { FoodVariant } from "../models/food.model";
import { Nutrients } from '../models/nutrients.model';
import { MealSummary } from "../models/meal-summary.model";

@Injectable({ providedIn: 'root' })
export class MealService {

  private items: MealItem[] = [];

  getItems() {
    return [...this.items];
  }

  addItem(variant: FoodVariant, grams: number) {
    const existing = this.items.find(i => i.variant.id === variant.id);
  
    if (existing) {
      existing.grams += grams;
  
      const nutrients = this.calculateNutrients(variant, existing.grams);
  
      existing.nutrients = nutrients;
      existing.xe = (nutrients.carbs - nutrients.fiber) / 12;
  
    } else {
  
      const nutrients = this.calculateNutrients(variant, grams);
  
      this.items.push({
        variant,
        grams,
        nutrients,
        xe: (nutrients.carbs - nutrients.fiber) / 12
      });
    }
  }

  getSummary(): MealSummary {
    const nutrients = this.getTotalNutrients();
  
    const calories =
      nutrients.protein * 4 +
      nutrients.carbs * 4 +
      nutrients.fat * 9;
  
    const netCarbs = Math.max(0, nutrients.carbs - nutrients.fiber);
  
    return {
      nutrients,
      xe: netCarbs / 12,
      calories,
      netCarbs
    };
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  updateItem(index: number, grams: number) {
    const item = this.items[index];
    if (!item) return;
  
    item.grams = grams;
  
    const nutrients = this.calculateNutrients(item.variant, grams);
  
    item.nutrients = nutrients;
    item.xe = (nutrients.carbs - nutrients.fiber) / 12;
  }

  private calculateNutrients(variant: FoodVariant, grams: number): Nutrients {
    const factor = grams / 100;
  
    return {
        protein: variant.nutrientsPer100g.protein * factor,
        fat: variant.nutrientsPer100g.fat * factor,
        carbs: variant.nutrientsPer100g.carbs * factor,
        fiber: variant.nutrientsPer100g.fiber * factor,
      };
  }

  getTotalNutrients(): Nutrients {
    return this.items.reduce(
      (total, item) => ({
        protein: total.protein + item.nutrients.protein,
        fat: total.fat + item.nutrients.fat,
        carbs: total.carbs + item.nutrients.carbs,
        fiber: total.fiber + item.nutrients.fiber,
      }),
      { protein: 0, fat: 0, carbs: 0, fiber: 0 }
    );
  }
}