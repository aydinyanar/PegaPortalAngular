import { Component, OnInit } from '@angular/core';
import { WeatherServiceService } from './../Services/weather-service.service';
import { Weather } from './../Models/weather';
import { mapTo, delay, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css', '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'],
  providers: [WeatherServiceService],

})
export class WeatherComponent implements OnInit {
  show = false;
  searchText: string;
  errorMessage: string;
  constructor(private _weatherService: WeatherServiceService) { }
  weather: Weather;
  ngOnInit() {
    // this._weatherService.findWeather(this.searchText, '').subscribe(data => this.weather = data);
  }

  getWeather(): void {
    this.show = true;
    this._weatherService.findWeather(this.searchText, '').pipe(delay(5000)).pipe(finalize(() => {
      this.show = false;
    }))
      .subscribe(
        data => {
          this.weather = data;
          this.errorMessage = null;

        }, error => {
          console.log('ERR' + error);
          this.weather = null;
          this.errorMessage = error;
        }
      );
  }

}
