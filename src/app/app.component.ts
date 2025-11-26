import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  template: `
  <div class="container">
    <div class="header">
      <div>
        <div class="h1">Natural Harmony</div>
        <div class="small">Мини-анализ питания и уровень энергии</div>
      </div>
      <header-comp></header-comp>
    </div>

    <div class="card">
      <router-outlet></router-outlet>
    </div>

    <div class="footer">
      Основано на открытых источниках и 14-летнем опыте автора (диабет 1 типа).
    </div>
  </div>
  `
})
export class AppComponent {}
