import { Component, Input, OnChanges } from '@angular/core';
import  '../common/date-utils';
import {CustomDate} from '../common/custom-date.entity';

@Component({
  selector: 'monthly-calendar',
  templateUrl: './monthly-calendar.component.html',
  styles: []
})
export class MonthlyCalendarComponent implements OnChanges {
  @Input() customDates: Array<CustomDate>;
  @Input() monthAndYear: string;

  weeksWithDates: Array<Array<CustomDate>>;
  weekDaysNumbers = [0,1,2,3,4,5,6];

  ngOnChanges(){
    this.weeksWithDates = new Array<Array<CustomDate>>();
    let week: Array<CustomDate> = new Array<CustomDate>(this.weekDaysNumbers.length);
    this.weeksWithDates.push(week);
    let currentWeek;
    for (let i = 0; i < this.customDates.length; i ++ ) {
      let cd = this.customDates[i];
      if(i > 0 && cd.week !== currentWeek) {
        week = new Array<CustomDate>();
        this.weeksWithDates.push(week);
      }
      week[cd.dayOfWeek] = cd;
      currentWeek = cd.week;
    }
  }
}