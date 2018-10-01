export class CustomDate {
  public day: number;
  public description: string;
  public dayOfWeek: number;
  public color: string;
  public week: number;

  constructor(day: number, description: string, dayOfWeek: number, color: string, week: number) {
    this.day = day;
    this.description = description;
    this.dayOfWeek = dayOfWeek;
    this.color = color;
    this.week = week;    
  }
}