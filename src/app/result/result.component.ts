import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';

@Component({
  standalone: true,
  selector: 'result-comp',
  imports: [CommonModule],
  template: `
    <div class="card">
      <h3>Результат: {{result.summary}}</h3>
      <div *ngIf="result.redZones?.length">
        <strong>Красные зоны:</strong>
        <ul>
          <li *ngFor="let r of result.redZones">{{r}}</li>
        </ul>
      </div>

      <div *ngIf="result.recommendations?.length">
        <strong>Рекомендации:</strong>
        <ul>
          <li *ngFor="let rec of result.recommendations">{{rec}}</li>
        </ul>
      </div>

      <div style="margin-top:12px">
        <button class="btn" (click)="downloadPdf()">Скачать PDF</button>
        <button class="btn" (click)="restart.emit()">Пройти снова</button>
      </div>
    </div>
  `
})
export class ResultComponent {
    @Input() result: any = {summary:'', redZones:[], recommendations:[]};
    @Output() download = new EventEmitter<any>();
    @Output() restart = new EventEmitter<void>();
  
    downloadPdf() {
    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text('Natural Harmony — Результаты', 10, 10);
    pdf.setFontSize(12);
    pdf.text(`Сводка: ${this.result.summary}`, 10, 20);
    let y = 30;
    if(this.result.redZones?.length){
      pdf.text('Красные зоны:', 10, y); y+=8;
      this.result.redZones.forEach((z:any)=>{ pdf.text('- '+z, 10, y); y+=7; });
      y+=6;
    }
    pdf.text('Рекомендации:', 10, y); y+=8;
    this.result.recommendations.forEach((r:any)=>{ pdf.text('- '+r, 10, y); y+=7; });
    pdf.save('natural-harmony-result.pdf');
    this.download.emit(this.result);
  }
}
