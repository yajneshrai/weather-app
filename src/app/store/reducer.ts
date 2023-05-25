import { Action, createReducer, on } from "@ngrx/store";
import { cloneDeep } from "lodash";
import { City, Profile } from "../models/state";

import * as WeatherActions from './actions';

export interface WeatherState {
    selectedCity: City | null,
    selectedProfileId: number;
    profiles: Profile[]
}

export const initialState: WeatherState = {
    selectedCity: null,
    selectedProfileId: 0,
    profiles: []
}

export const weatherReducer = createReducer(initialState, 
    on(WeatherActions.SelectCity, (state, action) => {
        
        const city: City = cloneDeep(action.city);
        return { ... state, selectedCity: city };
    }),

    on(WeatherActions.SelectProfile, (state, action) => {
        const profiles: Profile[] = cloneDeep(state.profiles);
        profiles.forEach(profile => { profile.active = false });
        const selectedProfile = profiles.find(profile => profile.id === action.profileId);
        let selectedProfileId = state.selectedProfileId;
        if (selectedProfile) {
            selectedProfileId = selectedProfile.id;
            selectedProfile.active = true;
        }
        return { ... state, selectedProfileId, profiles };
    }),

    on(WeatherActions.AddProfile, (state, action) => {
        const newProfile: Profile = {
            name: action.profileName,
            id: Date.now(),
            active: state.profiles.length ? false : true,
            cities: []
        }
        let selectedProfileId = newProfile.active ? newProfile.id : state.selectedProfileId;
        const profiles = cloneDeep(state.profiles);
        profiles.push(newProfile);
        return { ... state, profiles, selectedProfileId };
    }),

    on(WeatherActions.RemoveProfile, (state, action) => {
        let profiles: Profile[] = cloneDeep(state. profiles);
        profiles = profiles.filter(profile => profile.id !== action.profileId);
        return { ... state, profiles };
    }),

    on(WeatherActions.AddCityToProfile, (state, action) => {
        const city: City = cloneDeep(action.city);
        const profiles: Profile[] = cloneDeep(state.profiles);
        const selectedProfile = profiles.find(profile => profile.id === action.profileId);
        if (selectedProfile) {
            const cityExists = selectedProfile.cities.find(ct => ct.id === city.id);
            if (!cityExists) {
                selectedProfile.cities.push(city);
            }
        }
        return { ... state, profiles };
    }),

    on(WeatherActions.RemoveCityFromProfile, (state, action) => {
        const profiles: Profile[] = cloneDeep(state.profiles);
        const profile = profiles.find(profile => profile.id === action.profileId);
        if (profile) {
            profile.cities = profile.cities.filter(city => city.id === action.city.id);
        }
        return { ... state, profiles };
    }),
); 


export function reducer(state: WeatherState | undefined, action: Action) {
    return weatherReducer(state, action);
}