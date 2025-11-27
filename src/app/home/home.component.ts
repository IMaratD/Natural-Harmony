import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private router: Router) {}

  startQuiz() {
    // сбрасываем ответы старые перед новым прохождением
    localStorage.removeItem('quizAnswers');
    sessionStorage.removeItem('lastResult');
    this.router.navigate(['/quiz']);
  }
}
