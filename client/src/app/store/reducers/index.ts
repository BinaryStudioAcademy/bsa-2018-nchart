import { ActionReducerMap } from '@ngrx/store';
import { InjectionToken, Provider } from '@angular/core';
import { AppState } from '@app/models/store.model';
import {
	user as userReducer,
	initialState as userInitialState
} from './user.reducer';

export const initialState: AppState = {
	userState: userInitialState
};

export const getReducers = () => ({
	userState: userReducer
});

export const reducersToken = new InjectionToken<ActionReducerMap<AppState>>(
	'Reducers'
);

export const reducersProvider: Provider[] = [
	{
		provide: reducersToken,
		useFactory: getReducers
	}
];
