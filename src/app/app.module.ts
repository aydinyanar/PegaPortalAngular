import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { MovieComponent } from './movie/movie.component';
import { CurrencyComponent } from './currency/currency.component';
import { MenuComponent } from './menu.component';
import { RouterModule, Routes } from '@angular/router';
import { WeatherServiceService } from './Services/weather-service.service';
import { WeatherdetailComponent } from './weatherdetail/weatherdetail.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const appRoutes: Routes = [
  { path: 'weather', component: WeatherComponent },
  { path: 'movie', component: MovieComponent },
  { path: 'currency', component: CurrencyComponent },
  { path: 'weatherDetails/:id', component: WeatherdetailComponent },
  { path: 'home', component: AppComponent },
  { path: '', redirectTo: '/weather', pathMatch: 'full' },



];

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    MovieComponent,
    CurrencyComponent,
    MenuComponent,
    WeatherdetailComponent
  ],
  imports: [
    BrowserModule, HttpModule, RouterModule.forRoot(appRoutes), FormsModule, MatProgressSpinnerModule
  ],
  providers: [WeatherServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
