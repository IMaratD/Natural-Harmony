import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { ProfileComponent } from './profile/profile.component';
import { ResultComponent } from './result/result.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { ProductsComponent } from './products/products.component';
import { MealBuilderComponent } from './meal-builder/meal-builder.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'meal-builder', component: MealBuilderComponent },
  { path: 'result', component: ResultComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'roadmap', component: RoadmapComponent },
  { path: '**', redirectTo: '' }
];
