import { Component, OnInit } from '@angular/core';
import { Movie } from './../Models/movie';
import { MovieServiceService } from './../Services/movie-service.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css', '../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})

export class MovieComponent implements OnInit {
  movie: Movie;
  searchText: string;
  errorMessage: string;
  constructor(private _movieService: MovieServiceService) { }

  ngOnInit() {

  }

  getMovie(): void {
    this._movieService.findMovie(this.searchText).subscribe(
      data => {
        this.movie = data;
        this.errorMessage = null;
      }, error => {
        console.log('Pega2' + error);
        this.movie = null;
        this.errorMessage = error;
      }
    );

  }
}
