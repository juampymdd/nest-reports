export class DateFormatter {
  static formater = new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  static getDDMMMMYYYY(date: Date): string {
    return this.formater.format(date);
  }
}
