import { Injectable } from '@angular/core';

import { MealItem } from '../models/meal.model';
import { MealSummary } from '../models/meal-summary.model';
import { UserProfile } from '../models/user-profile.model';
import { MealRecommendation } from '../models/meal-recommendation.model';
import { NutritionService } from './nutrition.service';
import { FoodService } from './food.service';

@Injectable({
  providedIn: 'root'
})
export class MealRecommendationService {

    constructor(
        private nutritionService: NutritionService,
        private foodService: FoodService
      ) {
          
    }
    
    recommend(
        items: MealItem[],
        summary: MealSummary,
        profile: UserProfile
    ): MealRecommendation[] {
        
        const target = this.nutritionService.getDailyTargets(profile);
            const recommendations: MealRecommendation[] = [];
            const products = this.foodService.getAll();

            const currentProductIds = new Set(
                items.map(item => item.product.id)
              );
              
              const availableProducts = products.filter(
                product => !currentProductIds.has(product.id)
              );

              const lowCalorieProducts = availableProducts.filter(
                product => {
                  const variant = product.variants[0];
              
                  const calories =
                    variant.nutrientsPer100g.protein * 4 +
                    variant.nutrientsPer100g.carbs * 4 +
                    variant.nutrientsPer100g.fat * 9;
              
                  return calories <= 100;
                }
              );

            const calorieRatio =
            summary.calories / target.calories;
            const proteinRatio =
            summary.nutrients.protein / target.protein;

            if (
                profile.goal === 'lose' &&
                proteinRatio > 0.4
              ) {
                recommendations.push({
                  id: 'protein-high-for-loss',
                  strategy: 'minimal-change',
                  title: 'Белка уже достаточно',
                  message:
                    'При цели снижения веса не обязательно добавлять в этот стол дополнительные белковые продукты.',
                  suggestedProducts: [],
                  priority: 40
                });
              }
        
        if (
            profile.goal === 'lose' &&
            calorieRatio > 0.4
          ) {
            recommendations.push({
              id: 'calories-high-for-loss',
              strategy: 'minimal-change',
              title: 'Стол получился довольно калорийным',
              message:
                'Если цель — снижение веса, можно немного уменьшить калорийность этого стола.',
              suggestedProducts: [],
              priority: 50
            });
            
        } else if (
            profile.goal === 'gain' &&
            calorieRatio < 0.2
          ) {
            recommendations.push({
              id: 'calories-low-for-gain',
              strategy: 'minimal-change',
              title: 'Стол получился довольно лёгким',
              message:
                'Если цель — набор веса, можно сделать этот стол более питательным.',
              suggestedProducts: [],
              priority: 50
            });
          } else {
            
            recommendations.push({
                id: 'minimal-change-maintain',
                strategy: 'minimal-change',
                title: 'Поддержание текущего баланса',
                message:
                'Можно слегка скорректировать состав стола, сохранив текущий баланс.',
                suggestedProducts: [],
                priority: 30
            });
        }
        
        return recommendations;
    }
}