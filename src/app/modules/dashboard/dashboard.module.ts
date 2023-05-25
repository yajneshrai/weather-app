import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CityListComponent } from './city-list/city-list.component';
import { SearchCityComponent } from './search-city/search-city.component';
import { KelvinToCelciusPipe } from '../../pipes/kelvin-to-celcius.pipe';
import { CityWeatherComponent } from './city-weather/city-weather.component';
import { EpochToDatePipe } from '../../pipes/epoch-to-date.pipe';



@NgModule({
  declarations: [
    SearchCityComponent,
    CityListComponent,
    DashboardComponent,
    KelvinToCelciusPipe,
    CityWeatherComponent,
    EpochToDatePipe
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
