import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'roadmap-page',
  imports: [CommonModule],
  template: `
    <div>
      <h2>Roadmap — от MVP до персонального нутрициолога</h2>
      <ol>
        <li>MVP — быстрый опрос и рекомендации (эта версия)</li>
        <li>Добавить базу продуктов и расчёт ХЕ для диабетиков</li>
        <li>Интеграция с трекером активности и CGM-данными</li>
        <li>Персональные планы питания, адаптация под аллергию/диету</li>
        <li>Мобильное приложение и консультации</li>
      </ol>
      <p class="small">Все рекомендации основаны на открытых источниках и личном 14-летнем опыте автора.</p>
    </div>
  `
})
export class RoadmapComponent {}
