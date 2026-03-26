import { Injectable } from "@angular/core";
import { UserProfile } from "../models/user-profile.model";
import { Nutrients } from "../models/nutrients.model";

@Injectable({ providedIn: 'root' })
export class NutritionService {

  getDailyTargets(profile: UserProfile) {
    const bmr = this.calculateBMR(profile);
    const activityFactor = this.getActivityFactor(profile.activityLevel);
    const tdee = bmr * activityFactor;

    const calories = this.adjustCalories(tdee, profile.goal);

    const protein = (calories * 0.2) / 4;
    const fat = (calories * 0.3) / 9;
    const carbs = (calories * 0.5) / 4;

    return {
      calories,
      protein,
      fat,
      carbs
    };
  }

  private calculateBMR(profile: UserProfile): number {
    const base =
      10 * profile.weight +
      6.25 * profile.height -
      5 * profile.age;
  
    return profile.sex === 'male'
      ? base + 5
      : base - 161;
  }
  
  private getActivityFactor(level: string): number {
    switch (level) {
      case 'low': return 1.2;
      case 'medium': return 1.55;
      case 'high': return 1.725;
      default: return 1.2;
    }
  }

  private adjustCalories(tdee: number, goal?: string): number {
    switch (goal) {
      case 'lose': return tdee - 300;
      case 'gain': return tdee + 300;
      default: return tdee;
    }
}
// const tdee = bmr * activityFactor;


//   const proteinCalories = totalCalories * 0.2;
// const fatCalories = totalCalories * 0.3;
// const carbsCalories = totalCalories * 0.5;


// const protein = proteinCalories / 4;
// const fat = fatCalories / 9;
// const carbs = carbsCalories / 4;



}