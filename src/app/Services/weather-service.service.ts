import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { Weather } from './../Models/weather';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class WeatherServiceService {

  weatherURL = 'https://query.yahooapis.com/v1/';
  weatherURL0 = 'public/yql?q=select%20*%20from%20weather.forecast';
  weatherURL1 = '%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22';
  weatherURL2 = '%2C%20';
  weatherURL3 = '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
  totReqsMade = 0;
  constructor(private _http: Http) { }
  findWeather(city, state): Observable<Weather> {
    this.totReqsMade = this.totReqsMade + 1;
    return this._http.get(this.weatherURL + this.weatherURL0 + this.weatherURL1 + city + this.weatherURL2 + state + this.weatherURL3).pipe(
      map(function (res) {
        if (res) {
          if (res.status < 200 || res.status >= 300) {
            throw new Error('This request has failed ' + res.status);
          } else {
            const weather = new Weather();
            const weatherResult = res.json();
            if (weatherResult.query.results) {
              weather.op_city = weatherResult.query.results.channel.location.city;
              weather.op_region = weatherResult.query.results.channel.location.region;
              weather.op_country = weatherResult.query.results.channel.location.country;
              weather.op_date = weatherResult.query.results.channel.item.condition.date;
              weather.op_text = weatherResult.query.results.channel.item.condition.text;
              weather.op_temp = weatherResult.query.results.channel.item.condition.temp;
              return weather;
            } else {
              throw new Error('Kayıt bulunamadı');
            }
          }
        }
      }
      )).pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      return throwError(
        'Bulunamadı');
    }
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      error);
  }
}
