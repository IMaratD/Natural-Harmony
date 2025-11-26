import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})
export class RecommendationService {

  generateResult(answers:any){
    const redZones:string[] = [];
    const recos:string[] = [];

    if(answers[0] === 'low') { redZones.push('Недостаток воды'); recos.push('Пейте 1.5–2 л воды в день.'); }
    if(answers[1] === 'daily'){ redZones.push('Частое потребление сладкого'); recos.push('Заменяйте сладкое ягодами или орехами.'); }
    if(answers[2] === '0-1'){ redZones.push('Низкое потребление овощей/фруктов'); recos.push('Добавьте 2–3 порции овощей/фруктов в день.'); }
    if(answers[3] === 'often'){ redZones.push('Поздние приёмы пищи'); recos.push('Старайтесь не есть поздно вечером.'); }
    if(answers[4] === 'daily'){ redZones.push('Чрезмерный кофеин'); recos.push('Ограничьте кофе во второй половине дня.'); }
    if(answers[5] === 'often'){ redZones.push('Переедание'); recos.push('Уменьшайте порции и ешьте медленнее.'); }
    if(answers[6] === 'bad'){ redZones.push('Проблемы со сном'); recos.push('Планируйте сон и избегайте экранов перед сном.'); }
    if(answers[7] === 'seldom'){ recos.push('Добавьте 1–2 лёгкие тренировки в неделю.'); }
    if(answers[8] === 'yes'){ redZones.push('Много обработанных продуктов'); recos.push('Уменьшите потребление фастфуда и готовых продуктов.'); }
    if(answers[9] === 'yes'){ redZones.push('Перепады энергии'); recos.push('Попробуйте более частые лёгкие перекусы и белки в каждом приёме.'); }

    const summary = redZones.length ? 'Есть зоны для улучшения' : 'Хорошие привычки — продолжайте в том же духе';

    return { score: 0, summary, redZones, recommendations: recos };
  }
}
