import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoggerService } from 'src/app/services/logger.service';
import { WeatherDataService } from 'src/app/services/weather-data.service';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.scss']
})
export class SearchCityComponent implements OnInit {
  cities: any[] = [];
  showList: boolean = false;
  searchDone: boolean = false;
  timer: any;

  @Output() citySelected = new EventEmitter();

  constructor(
    private weatherService: WeatherDataService,
    private loggerService: LoggerService
  ) {}

  ngOnInit() {
  }

  onCitySearch(city: string) {
    if (!city) {
      return;
    }
  
    this.searchDone = true;
    clearInterval(this.timer);
    this.loggerService.info(`WeatherService.searchCity: Searching matching cities for value: ${city}`);
    this.weatherService.searchCity(city).subscribe(
      (cities: any) => {
        this.cities = cities?.list || [];
        this.showList = this.cities.length > 0;
        this.loggerService.info(`WeatherService.searchCity: Found ${this.cities.length} mathcing results for value: ${city}`);
        this.timer = setTimeout(() => {
          this.searchDone = false;
        }, 10000);
      },
      (error) => {
        this.cities = [];
        this.loggerService.error(`WeatherService.searchCity call failed for city value: ${city}`);
      }
    );
  }

  selectCity(city: any) {
    this.searchDone = false;
    this.showList = false;
    this.citySelected.emit(city);
  }
}

