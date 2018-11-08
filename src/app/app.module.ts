import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

 import { AppComponent } from './app.component';
 import { MenuComponent } from './menu.component';
import { WeatherServiceService } from './Services/weather-service.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule, routingComponents } from './app-routing.module';

@NgModule({
  declarations: [
     AppComponent,
     routingComponents,
     MenuComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, MatProgressSpinnerModule, AppRoutingModule
  ],
  providers: [WeatherServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
