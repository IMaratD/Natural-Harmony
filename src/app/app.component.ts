import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <div class="app-wrap">
      <header class="top">
        <div class="brand">
          <div class="title">Natural Harmony</div>
          <div class="subtitle">Мини-анализ питания и уровень энергии</div>
        </div>
        <header-comp></header-comp>
      </header>

      <main class="main">
        <router-outlet></router-outlet>
      </main>

      <footer class="footer">Основано на открытых источниках и 14-летнем опыте автора (диабет 1 типа).</footer>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
