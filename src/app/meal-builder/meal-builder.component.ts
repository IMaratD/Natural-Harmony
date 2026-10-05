import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { MealService } from "../services/meal.service";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NutritionService } from "../services/nutrition.service";
import { MealItem } from "../models/meal.model";
import { MealSummary } from "../models/meal-summary.model";
import { MealWarning } from '../models/meal-warning.model';
import { NutritionAnalysisService } from '../services/nutrition-analysis.service';
import { WarningAggregatorService } from '../services/warning-aggregator.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-products',
  templateUrl: './meal-builder.component.html',
  styleUrls: ['./meal-builder.component.scss']
})

export class MealBuilderComponent implements OnInit {

  items$!: Observable<MealItem[]>;
  summary$!: Observable<MealSummary>;
  
  warnings: MealWarning[] = [];

  selectedItem?: MealItem;
  showItemInfo = false;
  
  openItemInfo(item: MealItem): void {
    this.selectedItem = item;
    this.showItemInfo = true;
  }
  
  
  closeItemInfo(): void {
    this.showItemInfo = false;
    this.selectedItem = undefined;
  }

  constructor(
    private mealService: MealService,
    private nutritionService: NutritionService,
    private nutritionAnalysisService: NutritionAnalysisService,
    private warningAggregatorService: WarningAggregatorService
  ) {}

  ngOnInit() {
    this.items$ = this.mealService.getItems();
    this.updateAnalysis();
  }
  get summary(): MealSummary {
    return this.mealService.getSummary();
  }
  get proteinProgress() {
    const summary = this.mealService.getSummary();
    const target = this.getTarget();
  
    if (!target?.protein) {
      return 0;
    }
  
    return Math.min(
      summary.nutrients.protein / target.protein,
      1
    );
  }

  get fatProgress() {
    const summary = this.mealService.getSummary();
    const target = this.getTarget();
  
    if (!target?.fat) {
      return 0;
    }
  
    return Math.min(
      summary.nutrients.fat / target.fat,
      1
    );
  }

  get carbsProgress() {
    const summary = this.mealService.getSummary();
    const target = this.getTarget();
  
    if (!target?.carbs) {
      return 0;
    }
  
    return Math.min(
      summary.nutrients.carbs / target.carbs,
      1
    );
  }

  get selectedItemNutrition() {
    if (!this.selectedItem) {
      return null;
    }
  
    return this.mealService.calculateNutrition(
      this.selectedItem.variant,
      this.selectedItem.grams
    );
  }

  getTarget() {
    const raw = localStorage.getItem('nh_profile');
    if (!raw) return null;

    const profile = JSON.parse(raw);
    return this.nutritionService.getDailyTargets(profile);
  }

  update(index: number, grams: number) {
    this.mealService.updateItem(index, grams);
    this.updateAnalysis();
  }

  remove(index: number) {
    this.mealService.removeItem(index);
    this.updateAnalysis();
  }

  clearMeal(): void {
    this.mealService.clear();
    this.updateAnalysis();
  }

  updateAnalysis(): void {
    const summary = this.mealService.getSummary();
    const target = this.getTarget();
  
    const warnings =
      this.nutritionAnalysisService.analyze(
        summary,
        target
      );

    this.warnings = this.warningAggregatorService.aggregate(
      warnings
    );
  }
}
