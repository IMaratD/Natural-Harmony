import { FoodProduct, FoodVariant } from './food.model';
import { Nutrients } from './nutrients.model';

export interface MealItem {
  product: FoodProduct;
  variant: FoodVariant;
  grams: number;
  nutrients: Nutrients;
  xe: number;
}