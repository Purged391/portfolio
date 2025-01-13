import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'timeGap',
  standalone: true,
})
export default class TimeGapPipe implements PipeTransform {

  public transform(dateString: string): string {
    const [day, month, year] = dateString.split('/').map(Number);
    const message = dateString.split('/')[3];
    const startDate = new Date(year, month - 1, day);

    const today = new Date();
    let years = today.getFullYear() - startDate.getFullYear();
    let months = today.getMonth() - startDate.getMonth();

    // Si el mes actual es anterior al mes de la fecha de inicio, restamos un año
    if (months < 0) {
      years--;
      months += 12;
    }

    // Si el día actual es menor al día de la fecha de inicio, restamos un mes
    if (today.getDate() < startDate.getDate()) {
      months--;
      if (months < 0) {
        years--;
        months += 12;
      }
    }

    // Construir el string de salida
    let result = '';
    if (years > 0) {
      result += years === 1 ? '1 año' : `${years} años`;
    }
    if (months > 0) {
      if (result) result += ' y ';
      result += months === 1 ? '1 mes' : `${months} meses`;
    }
    if (!result) {
      result = '0 meses'; // Si no ha pasado ni un mes
    }

    return `${result} ${message}`;
  }
}
