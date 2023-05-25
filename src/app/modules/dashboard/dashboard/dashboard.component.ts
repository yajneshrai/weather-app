import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { City } from 'src/app/models/state';
import { LoggerService } from 'src/app/services/logger.service';
import { WeatherDataService } from 'src/app/services/weather-data.service';
import { SelectCity } from 'src/app/store/actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  cityWeatherData: City | null = null;
  dataFetched: boolean = false;

  constructor(
    private weatherService: WeatherDataService,
    private loggerSerive: LoggerService,
    private store: Store
  ) {}

  async citySelected(city: any) {
    this.dataFetched = false;
    this.loggerSerive.info(`WeatherService.getCityWeather: Fetch weather data for city: ${city.name}`);
    this.weatherService.getCityWeather(city.id).subscribe((cityWeatherData: City) => {
      this.cityWeatherData = cityWeatherData;
      this.store.dispatch(SelectCity({ city: this.cityWeatherData }));
      this.dataFetched = true;
    });
  }
}
