import { Component, Input } from '@angular/core';
import  '../common/date-utils';
import {CustomDate} from '../common/custom-date.entity';
import { HolidayService } from '../service/holiday.service';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styles: [`h1 { font-family: Lato; }`]
})
export class CalendarComponent {
  customDates: Map<string, Array<CustomDate>>;
  countryCode: string;
  holidayDates: any = [];
  dateArray: Array<Date>;
  show = false;

  constructor(public holidayService: HolidayService){}

  public render(startDate: string, numberOfDays: number, countryCode: string) {
    let startdate = new Date(startDate);
    let toDate = startdate.addDays(numberOfDays);
    let dates = this.getDates(startdate, toDate);
    this.getHolidays(startdate, toDate, countryCode);
    this.dateArray = dates;
    this.show = false;
  }

  private generateCalendarData() {
    let customDates = new Map<string, Array<CustomDate>>();
    let customDateArray: Array<CustomDate>;
    let customDate: CustomDate;
    
    for (let i = 0; i < this.dateArray.length; i ++ ) {
        let date = this.dateArray[i];
        let monthNameAndYear = this.getMonthNameAndYear(date);
        let dayOfWeek = date.getDay();
        let color = dayOfWeek == 0 || dayOfWeek == 6 ? 'yellow' : 'green';
        let description = this.getDescriptionIfHoliday(date);
        color = description != '' ? 'orange' : color; 
        customDate = new CustomDate(date.getUTCDate(), description, dayOfWeek, color, date.getWeekOfMonth());
        let customDateArrayInMap = customDates.get(monthNameAndYear);
        if(customDateArrayInMap == null) {
          customDateArray = new Array<CustomDate>();
          customDateArray.push(customDate);
          customDates.set(monthNameAndYear, customDateArray); 
        } else {
          customDateArrayInMap.push(customDate);
        }
    }
    this.customDates = customDates;
    this.show = true;
  }

  private getDates(startDate, stopDate) {
    let dateArray = new Array();
    let currentDate = startDate;
    while (currentDate < stopDate) {
        dateArray.push(new Date (currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
  }

  private getMonthName(date) {
    const locale = 'en-us';
    return date.toLocaleString(locale, { month: 'long' });
  }

  private getMonthNameAndYear(date) {
    let monthName = this.getMonthName(date);
    let year = date.getUTCFullYear();
    return `${monthName} ${year}`;
  }

  public getMonthsAndYears(): Array<string> {
    if(this.customDates == null) { return []; }
    return Array.from(this.customDates.keys());
  }

  public getCustomDates(monthAndYear: string): Array<CustomDate> {
    return this.customDates.get(monthAndYear);
  }

  private getDescriptionIfHoliday(date: Date): string {
    let description = '';
    if(this.holidayDates!=null) {
      for (let i = 0; i < this.holidayDates.length; i ++ ) {
        var holiday = this.holidayDates[i];
        if(holiday.date.day == date.getUTCDate() && holiday.date.month == date.getUTCMonth()+1 && holiday.date.year == date.getUTCFullYear()) {
          description = holiday.name[0].text;
        }
      }
    }
    return description;
  }

  private getHolidays(fromDate:Date, toDate:Date, countryCode:string) {

    this.holidayService.getHolidays(`${fromDate.getUTCDate()}-${fromDate.getUTCMonth()+1}-${fromDate.getUTCFullYear()}`, 
                                    `${toDate.getUTCDate()}-${toDate.getUTCMonth()+1}-${toDate.getUTCFullYear()}`, countryCode).subscribe((data: {}) => {
      this.holidayDates = data;
      this.generateCalendarData();
    }),
    (error)=>{
      this.generateCalendarData();
    };
  }
  
}
