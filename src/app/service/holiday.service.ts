import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'https://kayaposoft.com/enrico/json/v2.0/?action=getHolidaysForDateRange&region=dc&holidayType=public_holiday';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
}) 
export class HolidayService {

  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  getHolidays(fromDate:string, toDate:string, countryCode:string): Observable<any> {
    return this.http.get(endpoint + `&fromDate=${fromDate}&toDate=${toDate}&country=${countryCode}`).pipe(
      map(this.extractData));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}