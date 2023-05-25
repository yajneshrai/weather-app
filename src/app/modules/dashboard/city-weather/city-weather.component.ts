import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { City } from 'src/app/models/state';
import { AddCityToProfile } from 'src/app/store/actions';

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss']
})
export class CityWeatherComponent implements OnInit, OnDestroy {
  cityData: City | null = null;
  cityAddedToList: boolean = false;
  activeProfileId: number = 0;
  profilesExist: boolean = false;
  curDate!: Date;
  showNotification: boolean = false;
  timer: any;
  sub!: Subscription;

  constructor(private store: Store) { }

  ngOnInit() {
    
    this.curDate = new Date();
    this.sub = this.store.subscribe((state: any) => {
      this.cityData = state.weather.selectedCity;
      this.profilesExist = state.weather.profiles.length > 0;
      this.activeProfileId = state.weather.selectedProfileId;
    });
  }

  addCityToProfile() {
    this.store.dispatch(AddCityToProfile({ city: this.cityData!, profileId: this.activeProfileId  }));
    clearInterval(this.timer);
    this.showNotification = true;
    this.timer = setTimeout(() => {
      this.showNotification = false;
    }, 2500);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}


const d = {
  "coord": {
    "lon": 74.8833,
    "lat": 12.8667
  },
  "weather": [{
    "id": 801,
    "main": "Clouds",
    "description": "few clouds",
    "icon": "02d"
  }],
  "base": "stations",
  "main": {
    "temp": 305.63,
    "feels_like": 312.04,
    "temp_min": 305.63,
    "temp_max": 305.63,
    "pressure": 1009,
    "humidity": 62
  },
  "visibility": 10000,
  "wind": {
    "speed": 5.14,
    "deg": 300
  },
  "clouds": {
    "all": 20
  },
  "dt": 1684413945,
  "sys": {
    "type": 1,
    "id": 9217,
    "country": "IN",
    "sunrise": 1684370092,
    "sunset": 1684415947
  },
  "timezone": 19800,
  "id": 1263780,
  "name": "Mangalore",
  "cod": 200
}