import { ActionReducerMap } from '@ngrx/store';
import { InjectionToken, Provider } from '@angular/core';
import { AppState } from '@app/models/store.model';
import {
	user as userReducer,
	initialState as userInitialState
} from './user.reducer';

import {
	chartsReducer,
	initialState as chartsInitialState
} from './charts.reducer';

import {
	userChartsReducer,
	initialState as userChartsInitialState
} from './userCharts.reducer';

import {
	datasetReducer,
	initialState as datasetInitialState
} from './dataset.reducer';

import {
	companiesReducer,
	initialState as companiesInitialState
} from './companies.reducer';

import {
	errorHandlerReducer,
	initialState as errorHandlerInitialState
} from './error-handler.reducer';

import {
	projectsReducer,
	initialState as projectsInitialState
} from './projects.reducer';

export const initialState: AppState = {
	user: userInitialState,
	errorHandler: errorHandlerInitialState,
	companies: companiesInitialState,
	projects: projectsInitialState,
	charts: chartsInitialState,
	datasets: datasetInitialState,
	userCharts: userChartsInitialState
};

export const getReducers = () => ({
	user: userReducer,
	errorHandler: errorHandlerReducer,
	companies: companiesReducer,
	projects: projectsReducer,
	charts: chartsReducer,
	datasets: datasetReducer,
	userCharts: userChartsReducer
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
