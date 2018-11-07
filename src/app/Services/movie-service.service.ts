import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Movie } from './../Models/movie';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  findMovieURL1 = 'http://www.omdbapi.com/?t=';
  findMovieURL2 = '&apikey=1714813c';
  totReqsMade = 0;
  constructor(private _http: Http) { }

  findMovie(movie): Observable<Movie> {
    this.totReqsMade = this.totReqsMade + 1;
    return this._http.get(this.findMovieURL1 + movie + this.findMovieURL2).pipe(
      map(function (res) {
        const searchedMovie = new Movie();
        const jsonResult = res.json();
        if (res) {
          if (res.status < 200 || res.status >= 300) {
            throw new Error('This request has failed ' + res.status);
          } else {
            if (jsonResult.Response === 'True') {
              searchedMovie.mv_Title = jsonResult.Title;
              searchedMovie.mv_Rated = jsonResult.Rated;
              searchedMovie.mv_Released = jsonResult.Released;
              searchedMovie.mv_Director = jsonResult.Director;
              searchedMovie.mv_Actors = jsonResult.Actors;
              searchedMovie.mv_Plot = jsonResult.Plot;
              searchedMovie.mv_Poster = jsonResult.Poster;
              searchedMovie.mv_Result = jsonResult.Response;
              console.log(searchedMovie);
              return searchedMovie;
            } else {
              console.log('p1');
              throw new Error('Movie yok');
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
    console.log(error);
    return throwError(
      error);
  }

}
