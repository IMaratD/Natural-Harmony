import { FoodProduct } from "../models/food.model";
import { Component } from "@angular/core";
import { MealService } from "../services/meal.service";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NutritionService } from "../services/nutrition.service";

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule],
    selector: 'app-products',
    templateUrl: './meal-builder.component.html',
    styleUrls: ['./meal-builder.component.scss']
  })
  export class MealBuilderComponent {
  
    products: FoodProduct[] = [];
    selectedProduct?: FoodProduct;
    selectedGrams = 100;
  
    constructor(
        private mealService: MealService,
        private nutritionService: NutritionService
    ) {}

    getTarget() {
        const raw = localStorage.getItem('nh_profile');
        if (!raw) return null;
      
        const profile = JSON.parse(raw);
        return this.nutritionService.getDailyTargets(profile);
      }

    get proteinProgress() {
        const summary = this.mealService.getSummary();
        const target = this.getTarget();
      
        return target?.protein
        ? summary.nutrients.protein / target.protein
        : 0;
    }

    get fatProgress() {
        const summary = this.mealService.getSummary();
        const target = this.getTarget();
      
        return target?.fat
        ? summary.nutrients.fat / target.fat
        : 0;
    }

    get carbsProgress() {
        const summary = this.mealService.getSummary();
        const target = this.getTarget();
      
        return target?.carbs
        ? summary.nutrients.carbs / target.carbs
        : 0;
    }
get items() {
  return this.mealService.getItems();
}

get totalXE() {
  return this.mealService.getSummary();
}

update(index: number, grams: number) {
    this.mealService.updateItem(index, grams);
  }
  remove(index: number) {
    this.mealService.removeItem(index);
  }
  
}