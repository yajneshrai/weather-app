import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Profile } from 'src/app/models/state';
import { AddProfile } from 'src/app/store/actions';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit, OnDestroy {
  profileName: string = '';
  profiles: Profile[] = [];
  sub!: Subscription;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.sub = this.store.subscribe((state: any) => {
      this.profiles = state.weather.profiles;
    })
  }

  addProfile() {
    if (this.profileName) {
      this.store.dispatch(AddProfile({ profileName: this.profileName }));
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
