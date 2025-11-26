import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultComponent } from '../result/result.component';
import { RecommendationService } from '../services/recommendation.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'quiz-page',
  imports: [CommonModule, ResultComponent],
  template: `
    <div>
      <h2>Опрос — как питание влияет на вашу энергию</h2>
      <div class="small">Ответьте честно — это займёт минут 2–3.</div>

      <div *ngIf="!finished">
        <div class="question">
          <div style="font-weight:600">{{questions[step].text}}</div>
          <div class="options">
            <label *ngFor="let opt of questions[step].options">
              <input type="radio" name="answer" [value]="opt.value" (change)="choose(opt.value)"/> {{opt.label}}
            </label>
          </div>
        </div>

        <div style="display:flex;gap:8px;margin-top:12px">
          <button class="btn" (click)="prev()" [disabled]="step===0">Назад</button>
          <button class="btn" (click)="next()" [disabled]="answers[step]===undefined">{{ step === questions.length-1 ? 'Завершить' : 'Далее' }}</button>
        </div>
      </div>

      <div *ngIf="finished">
        <result-comp [result]="result" (download)="onDownload($event)"></result-comp>
        <div style="margin-top:12px">
          <button class="btn" (click)="router.navigate(['/'])">На главную</button>
        </div>
      </div>
    </div>
  `
})
export class QuizComponent {
  questions = [
    { id: 'water', text: 'Сколько воды вы выпиваете в день?', options: [{value:'low',label:'<1 литра'},{value:'med',label:'1-2 литра'},{value:'high',label:'>2 литра'}]},
    { id: 'sweet', text: 'Как часто вы едите сладкое?', options: [{value:'daily',label:'Каждый день'},{value:'weekly',label:'Несколько раз в неделю'},{value:'rare',label:'Редко'}]},
    { id: 'veg', text: 'Сколько порций овощей/фруктов в день?', options: [{value:'0-1',label:'0-1'},{value:'2-3',label:'2-3'},{value:'4',label:'4+'}]},
    { id: 'late', text: 'Как часто вы едите после 21:00?', options: [{value:'often',label:'Часто'},{value:'sometimes',label:'Иногда'},{value:'never',label:'Редко/никогда'}]},
    { id: 'coffee', text: 'Пьёте ли вы кофе/энергетики?', options: [{value:'daily',label:'Каждый день'},{value:'sometimes',label:'Иногда'},{value:'no',label:'Почти нет'}]},
    { id: 'portion', text: 'Как часто переедаете за один приём?', options: [{value:'often',label:'Часто'},{value:'sometimes',label:'Иногда'},{value:'rare',label:'Редко'}]},
    { id: 'sleep', text: 'Насколько стабилен ваш сон?', options: [{value:'bad',label:'Плохо'},{value:'ok',label:'Нормально'},{value:'good',label:'Хорошо'}]},
    { id: 'exercise', text: 'Как часто вы занимаетесь активностью?', options: [{value:'seldom',label:'Редко'},{value:'few',label:'1-2 в неделю'},{value:'regular',label:'3+ в неделю'}]},
    { id: 'processed', text: 'Есть ли в рационе много обработанных продуктов?', options: [{value:'yes',label:'Да'},{value:'some',label:'Иногда'},{value:'no',label:'Нет'}]},
    { id: 'symptoms', text: 'Чувствуете ли перепады энергии в течение дня?', options: [{value:'yes',label:'Да'},{value:'sometimes',label:'Иногда'},{value:'no',label:'Нет'}]}
  ];

  answers: any = {};
  step = 0;
  finished = false;
  result: any = null;

  constructor(private rec: RecommendationService, public router: Router){}

  choose(v:any){
    this.answers[this.step]=v;
  }
  prev(){ if(this.step>0) this.step--;}
  next(){
    if(this.step < this.questions.length-1){
      this.step++;
    } else {
      this.finish();
    }
  }
  finish(){
    this.finished = true;
    this.result = this.rec.generateResult(this.answers);
  }
  onDownload(r:any){}
}
