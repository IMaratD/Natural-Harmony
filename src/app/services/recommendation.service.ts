import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RecommendationService {

  // max per question = 3; questions=15 -> max 45
  getRecommendations(total: number, isDiabetic = false) {
    const redZones: string[] = [];
    const recommendations: string[] = [];

    // thresholds (example): 0..13 good, 14..28 moderate, 29..45 high-risk
    if (total <= 13) {
      // good
      recommendations.push('У вас хорошие привычки — продолжайте в том же духе');
    } else if (total <= 28) {
      recommendations.push('Есть точки для улучшения — рассмотрите небольшие изменения в рационе и режиме');
    } else {
      recommendations.push('Важно срочно пересмотреть питание и режим — есть явные сигналы риска');
    }

    // granular suggestions based on quartiles of total
    if (total > 10) {
      redZones.push('Сбалансируйте потребление сахара и обработанных продуктов');
      recommendations.push('Уменьшите сладкое и готовые продукты, добавьте овощи и белок');
    }
    if (total > 20) {
      redZones.push('Возможны частые перепады энергии и переедание');
      recommendations.push('Планируйте приёмы пищи равномерно; контролируйте порции');
    }
    if (total > 30) {
      redZones.push('Высокая нагрузка углеводов/перекусов');
      recommendations.push('Снижение быстрых углеводов и частых перекусов поможет стабилизировать энергию');
    }

    // profile-specific advice
    if (isDiabetic) {
      recommendations.push('Как диабетику, важно следить за углеводной нагрузкой и измерять уровень сахара при необходимости.');
    }

    const summary = redZones.length ? 'Есть зоны для улучшения' : 'Хорошие привычки — продолжайте в том же духе';
    return { score: total, summary, redZones, recommendations };
  }
}
