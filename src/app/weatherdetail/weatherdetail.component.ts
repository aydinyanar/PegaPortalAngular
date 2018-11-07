import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherServiceService } from './../Services/weather-service.service';
import { Weather } from './../Models/weather';

@Component({
  selector: 'app-weatherdetail',
  templateUrl: './weatherdetail.component.html',
  styleUrls: ['./weatherdetail.component.css']
})
export class WeatherdetailComponent implements OnInit {
  weather: Weather;
  constructor(private _activatedRoute: ActivatedRoute, private _weatherService: WeatherServiceService, private _router: Router) { }

  ngOnInit() {
    const city: string = this._activatedRoute.snapshot.params['id'];
    this._weatherService.findWeather(city, '').subscribe(data => this.weather = data);
  }
  GoBack(): void {
    this._router.navigate(['/weather']);
  }
}
