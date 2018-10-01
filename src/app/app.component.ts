import { Component, ViewChild } from '@angular/core';
import { CalendarComponent } from './calendar/calendar.component';
import  './common/date-utils';
import {CustomDate} from './common/custom-date.entity';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  @ViewChild ('cal') calendar: CalendarComponent;

  onSubmit(form: any) {
    this.calendar.render(form.startDate, +form.numberOfDays, form.countryCode);
  }
 



}
