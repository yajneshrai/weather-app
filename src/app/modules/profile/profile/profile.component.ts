import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { City, Profile } from 'src/app/models/state';
import { RemoveProfile, SelectCity, SelectProfile } from 'src/app/store/actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @Input() profile: Profile | null = null;

  constructor(
    private store: Store,
    private router: Router
  ) {}

  makeActive(profileId: number) {
    this.store.dispatch(SelectProfile({ profileId }));
  }

  removeProfile(profileId: number) {
    this.store.dispatch(RemoveProfile({ profileId }));
  }

  openCity(city: City) {
    this.store.dispatch(SelectCity({ city }));
    this.router.navigate(['/dashboard']);
  }
}
