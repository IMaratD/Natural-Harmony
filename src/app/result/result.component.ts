import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { loadOpenSans } from './pdf-font-loader';

@Component({
  standalone: true,
  selector: 'app-result',
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  result: any = null;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation?.();
    this.result = (nav?.extras && nav.extras.state && nav.extras.state['result']) ?? null;

    if (!this.result) {
      const raw = sessionStorage.getItem('lastResult');
      if (raw) this.result = JSON.parse(raw);
    }
  }

  backHome() {
    this.router.navigate(['/']);
  }

  async downloadPdf() {
    if (!this.result) return;
  
    const pdf = new jsPDF({
      compress: true,
      putOnlyUsedFonts: true,
      orientation: 'p',
      format: 'a4',
      unit: 'mm'
    });
  
    await loadOpenSans(pdf);
pdf.setFont('OpenSans', 'normal');

console.log('TRY LOAD FONT FROM: ', 'assets/fonts/OpenSans-Regular.ttf');


  
    pdf.setFont('OpenSans', 'normal');
    pdf.setFontSize(16);
  
    pdf.text('Natural Harmony — Результат', 10, 14);
  
    pdf.setFontSize(12);
    let y = 30;
  
    pdf.text(`Сводка: ${this.result.summary}`, 10, y);
    y += 10;
  
    if (this.result.redZones?.length) {
      pdf.text('Красные зоны:', 10, y);
      y += 8;
  
      for (const z of this.result.redZones) {
        pdf.text(`• ${z}`, 15, y);
        y += 7;
      }
  
      y += 6;
    }
  
    pdf.text('Рекомендации:', 10, y);
    y += 8;
  
    for (const r of this.result.recommendations) {
      pdf.text(`• ${r}`, 15, y);
      y += 7;
    }
  
    pdf.save('natural-harmony-result.pdf');
  }
}
