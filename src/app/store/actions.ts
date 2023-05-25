import { createAction, props } from "@ngrx/store";
import { City } from "../models/state";

const enum Actions {
    SelectCity = 'Select City',
    AddCityToProfile = 'Add City To Profile',
    RemoveCityFromProfile = 'Remove City From Profile',
    SelectProfile = 'Select Profile',
    AddProfile = 'Add Profile',
    RemoveProfile = 'Remove Profile'
}

export const SelectCity = createAction(
    Actions.SelectCity,
    props<{ city: City }>()
);

export const AddCityToProfile = createAction(
    Actions.AddCityToProfile,
    props<{ city: City, profileId: number }>()
);

export const RemoveCityFromProfile = createAction(
    Actions.RemoveCityFromProfile,
    props<{ city: City, profileId: number }>()
);

export const SelectProfile = createAction(
    Actions.SelectProfile,
    props<{ profileId: number }>()
);

export const AddProfile = createAction(
    Actions.AddProfile,
    props<{ profileName: string }>()
);

export const RemoveProfile = createAction(
    Actions.RemoveProfile,
    props<{ profileId: number }>()
);

