
import * as auth from './auth.reducers';
import {createFeatureSelector} from "@ngrx/store";


export interface AppState {
  authState: auth.State; // map to inner state types
}

export const reducers = {
  authReducers: auth.reducer,
};

export const selectAuthState = createFeatureSelector<AppState>('authReducers');