import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { City, HourlyForecast } from '../models/state';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  private readonly API_URL = 'https://api.openweathermap.org/data/2.5';
  private readonly API_KEY = '7cc4d96b65f11c7b41d208e3edadf245';

  constructor(private http: HttpClient) { }

  searchCity(city: string) {
    return this.http.get(`${this.API_URL}/find?q=${city}&APPID=${this.API_KEY}`);
  }

  getCityWeather(cityId: number) {
    return this.http.get(`${this.API_URL}/weather?id=${cityId}&APPID=${this.API_KEY}`)
      .pipe(
        switchMap((cityWeatherData: any) => {
          const weatherData: City = this.formatCityWeatherData(cityWeatherData);
          return this.getHourlyWeatherForecast(cityId)
            .pipe(
              map((hourlyData: any) => {
                weatherData.hourlyForecast = this.formatHourlyWeatherData(hourlyData?.list || []);
                return weatherData;
              })
            )
        })
      )
  }

  getHourlyWeatherForecast(cityId: number) {
    return this.http.get(`${this.API_URL}/forecast?id=${cityId}&APPID=${this.API_KEY}`);
  }

  formatCityWeatherData(cityData: any) {
    const city: City = {
      coord: {
        lon: cityData.coord.lon,
        lat: cityData.coord.lat
      },
      weather: {
        id: cityData.weather[0].id,
        main: cityData.weather[0].main,
        description: cityData.weather[0].description
      },
      main: {
        temp: cityData.main.temp,
        feels_like: cityData.main.feels_like,
        temp_min: cityData.main.temp_min,
        temp_max: cityData.main.temp_max,
        pressure: cityData.main.pressure,
        humidity: cityData.main.humidity
      },
      visibility: cityData.visibility,
      wind: {
        speed: cityData.wind.speed,
        deg: cityData.wind.deg
      },
      sys: {
        country: cityData.sys.country,
        sunrise: cityData.sys.sunrise,
        sunset: cityData.sys.sunset
      },
      timezone: cityData.timezone,
      id: cityData.id,
      name: cityData.name,
      cod: cityData.cod
    };

    return city;
  }

  formatHourlyWeatherData(hourlyWeatherData: any[]) {
    const hourlyData: HourlyForecast[] = hourlyWeatherData.map(weatherData => ({
      dt: weatherData.dt,
      weather: {
        id: weatherData.weather[0].id,
        main: weatherData.weather[0].main,
        description: weatherData.weather[0].description
      },
      main: {
        temp: weatherData.main.temp,
        feels_like: weatherData.main.feels_like,
        temp_min: weatherData.main.temp_min,
        temp_max: weatherData.main.temp_max,
        pressure: weatherData.main.pressure,
        humidity: weatherData.main.humidity
      },
      clouds: {
        all: weatherData.clouds.all
      },
      visibility: weatherData.visibility,
      wind: {
        speed: weatherData.wind.speed,
        deg: weatherData.wind.deg
      },
      pop: weatherData.pop,
      rain: {
        '3h': weatherData.rain?.['3h'] || 0
      },
      sys: {
        pod: weatherData.sys.pod
      },
      dt_txt: weatherData.dt_txt
    }));
    return hourlyData;
  }
}
