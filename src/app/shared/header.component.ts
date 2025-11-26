import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'header-comp',
  imports: [RouterModule],
  template: `
    <nav class="nav">
      <a class="small" routerLink="/">Главная</a>
      <a class="small" routerLink="/quiz">Пройти опрос</a>
      <a class="small" routerLink="/profile">Личный кабинет</a>
      <a class="small" routerLink="/roadmap">Roadmap</a>
    </nav>
  `
})
export class HeaderComponent {}
