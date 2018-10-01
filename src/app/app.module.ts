import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MonthlyCalendarComponent } from './calendar/monthly-calendar.component';
import { HttpClientModule } from '@angular/common/http';
import { HolidayService } from './service/holiday.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule ],
  declarations: [ AppComponent, CalendarComponent, MonthlyCalendarComponent ],
  providers: [HolidayService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
