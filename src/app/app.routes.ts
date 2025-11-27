import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { ProfileComponent } from './profile/profile.component';
import { ResultComponent } from './result/result.component';
import { RoadmapComponent } from './roadmap/roadmap.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'result', component: ResultComponent },
  { path: 'roadmap', component: RoadmapComponent },
  { path: '**', redirectTo: '' }
];
