import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendationService } from '../services/recommendation.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface QuestionOption { text: string; value: number; }
interface Question { text: string; options: QuestionOption[]; }

@Component({
  standalone: true,
  selector: 'app-quiz',
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
  currentIndex = 0;
  answers: number[] = [];

  questions: Question[] = [
    { text: 'Сколько воды вы выпиваете в день?', options: [{text:'Менее 1 литра',value:3},{text:'1–1.5 литра',value:2},{text:'1.5–2 литра',value:1},{text:'Более 2 литров',value:0}] },
    { text: 'Как часто вы едите сладкое?', options: [{text:'Каждый день',value:3},{text:'3–4 раза в неделю',value:2},{text:'1–2 раза в неделю',value:1},{text:'Почти не ем',value:0}] },
    { text: 'Сколько порций овощей/фруктов вы съедаете в день?', options: [{text:'0–1 порция',value:3},{text:'2 порции',value:2},{text:'3 порции',value:1},{text:'4 и более порций',value:0}] },
    { text: 'Как часто вы едите после 21:00?', options: [{text:'Каждый день',value:3},{text:'3–4 раза в неделю',value:2},{text:'1–2 раза в неделю',value:1},{text:'Почти никогда',value:0}] },
    { text: 'Как часто вы пьёте кофе?', options: [{text:'Не пью',value:0},{text:'1–2 чашки в день',value:1},{text:'Более 2 чашек в день',value:2}] },
    { text: 'Как часто вы пьёте энергетики?', options: [{text:'Не пью',value:0},{text:'1 банка в неделю',value:2},{text:'2+ банок в неделю',value:3}] },
    { text: 'Как часто вы переедаете за один приём пищи?', options: [{text:'Очень часто',value:3},{text:'Иногда',value:2},{text:'Редко',value:1},{text:'Почти никогда',value:0}] },
    { text: 'Насколько стабилен ваш сон?', options: [{text:'Очень нестабилен',value:3},{text:'Есть проблемы',value:2},{text:'В целом стабилен',value:1},{text:'Хороший и стабильный',value:0}] },
    { text: 'Как часто вы занимаетесь физической активностью?', options: [{text:'Не занимаюсь',value:3},{text:'1 раз в неделю',value:2},{text:'2–3 раза в неделю',value:1},{text:'Более 3 раз в неделю',value:0}] },
    { text: 'Много ли в вашем рационе ультра-переработанных продуктов?', options: [{text:'Очень много',value:3},{text:'Много',value:2},{text:'Немного',value:1},{text:'Почти нет',value:0}] },
    { text: 'Чувствуете ли вы резкие перепады энергии в течение дня?', options: [{text:'Очень часто',value:3},{text:'Иногда',value:2},{text:'Редко',value:1},{text:'Почти никогда',value:0}] },
    { text: 'Как часто вы едите фастфуд?', options: [{text:'Каждый день',value:3},{text:'1–2 раза в неделю',value:2},{text:'1 раз в 2 недели',value:1},{text:'Почти никогда',value:0}] },
    { text: 'Как часто вы едите крупные порции углеводов (паста/булки/белый хлеб)?', options: [{text:'Каждый день',value:3},{text:'3–4 раза в неделю',value:2},{text:'1–2 раза в неделю',value:1},{text:'Редко',value:0}] },
    { text: 'Много ли у вас перекусов в течение дня?', options: [{text:'Очень много',value:3},{text:'Много',value:2},{text:'Редко',value:1},{text:'Почти нет',value:0}] },
    { text: 'Сколько часов в день вы сидите?', options: [{text:'8+ часов',value:3},{text:'6–8 часов',value:2},{text:'3–5 часов',value:1},{text:'Менее 3 часов',value:0}] }
  ];

  constructor(private rec: RecommendationService, private router: Router) {}

  ngOnInit() {
    const saved = localStorage.getItem('quizAnswers');
    if (saved) this.answers = JSON.parse(saved);
    else this.answers = Array(this.questions.length).fill(undefined);
  }

  selectAnswer(v: number) {
    this.answers[this.currentIndex] = v;
    localStorage.setItem('quizAnswers', JSON.stringify(this.answers));
  }

  next() {
    if (this.currentIndex < this.questions.length - 1) this.currentIndex++;
  }

  prev() {
    if (this.currentIndex > 0) this.currentIndex--;
  }

  resetAnswers() {
    this.answers = Array(this.questions.length).fill(undefined);
    localStorage.removeItem('quizAnswers');
  }

  allAnswered() {
    return this.answers.every(v => v !== undefined);
  }
  
  finish() {
    const total = this.answers.reduce((sum, v) => sum + (v ?? 0), 0);
    const profileRaw = localStorage.getItem('nh_profile');
    const profile = profileRaw ? JSON.parse(profileRaw) : { isDiabetic: false };
    const result = this.rec.getRecommendations(total, profile.isDiabetic);
    
    sessionStorage.setItem('lastResult', JSON.stringify(result));
    
    this.router.navigate(['/result'], { state: { result } });
  }
  
  startAgain() {
    sessionStorage.removeItem('answers');
    this.answers = [];
    this.currentIndex = 0;
  }
}