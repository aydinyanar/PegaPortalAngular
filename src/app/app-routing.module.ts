import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { WeatherComponent } from './weather/weather.component';
import { WeatherdetailComponent } from './weatherdetail/weatherdetail.component';
import { MovieComponent } from './movie/movie.component';
import { CurrencyComponent } from './currency/currency.component';
import { Weather } from './Models/weather';

const appRoutes: Routes = [
  { path: 'weather', component: WeatherComponent },
  { path: 'movie', component: MovieComponent },
  { path: 'currency', component: CurrencyComponent },
  { path: 'weatherDetails/:id', component: WeatherdetailComponent },
  { path: 'home', component: WeatherComponent },
  { path: '', redirectTo: '/weather', pathMatch: 'full' },
  { path: '**', component : CurrencyComponent},
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule
             ]
})
export class AppRoutingModule { }
export const routingComponents = [
  WeatherComponent,
  WeatherdetailComponent,
  MovieComponent,
  CurrencyComponent];
