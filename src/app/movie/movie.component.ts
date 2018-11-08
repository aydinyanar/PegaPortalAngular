import { Component, OnInit } from '@angular/core';
import { Movie } from './../Models/movie';
import { MovieServiceService } from './../Services/movie-service.service';
import {  delay, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css', '../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})

export class MovieComponent implements OnInit {
  movie: Movie;
  searchText: string;
  errorMessage: string;
  show = false;
  constructor(private _movieService: MovieServiceService) { }

  ngOnInit() {

  }
  getMovie(): void {
    this.show = true;
    this._movieService.findMovie(this.searchText).pipe(finalize(() => this.show = false)).subscribe(
      data => {
        this.movie = data;
        this.errorMessage = null;
      }, error => {
        this.movie = null;
        this.errorMessage = error;
      }
    );

  }
}
