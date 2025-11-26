import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'profile-page',
  imports: [FormsModule],
  template: `
    <div>
      <h2>Личный кабинет</h2>
      <p class="small">Сохраните имя и отметьте, если вы диабетик — это добавит особые рекомендации.</p>

      <div style="display:flex;gap:8px;align-items:center">
        <label>Имя: <input [(ngModel)]="name" /></label>
        <label style="margin-left:8px"><input type="checkbox" [(ngModel)]="isDiabetic" /> Я — диабетик</label>
      </div>

      <div style="margin-top:12px">
        <button class="btn" (click)="save()">Сохранить</button>
        <button class="btn" (click)="load()">Загрузить</button>
      </div>

      <div style="margin-top:12px" *ngIf="saved">
        <div><strong>Сохранено:</strong></div>
        <div>Имя: {{saved.name}}</div>
        <div>Диабетик: {{saved.isDiabetic ? 'Да' : 'Нет'}}</div>
      </div>
    </div>
  `
})
export class ProfileComponent {
  name = '';
  isDiabetic = false;
  saved: any = null;

  save(){
    const obj = {name:this.name, isDiabetic:this.isDiabetic};
    localStorage.setItem('nh_profile', JSON.stringify(obj));
    this.saved = obj;
  }
  load(){
    const raw = localStorage.getItem('nh_profile');
    if(raw) this.saved = JSON.parse(raw);
  }
}
