import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'header-comp',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  constructor(private router: Router) {}

  startQuiz() {
    // сбрасываем ответы старые перед новым прохождением
    localStorage.removeItem('quizAnswers');
    sessionStorage.removeItem('lastResult');
    this.router.navigate(['/quiz']);
  }
}
