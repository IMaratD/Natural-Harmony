import { FoodVariant } from './food.model';
import { Nutrients } from './nutrients.model';

export interface MealItem {
  variant: FoodVariant;
  grams: number;
  
  nutrients: Nutrients;
  
  xe: number;
}