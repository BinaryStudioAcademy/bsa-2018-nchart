import { ActionReducerMap } from '@ngrx/store';
import { InjectionToken, Provider } from '@angular/core';
import { AppState } from '@app/models/store.model';
import {
	user as userReducer,
	initialState as userInitialState
} from '@app/store/reducers/user.reducer';

import {
	chartsReducer,
	initialState as chartsInitialState
} from '@app/store/reducers/charts.reducer';

import {
	userChartsReducer,
	initialState as userChartsInitialState
} from '@app/store/reducers/userCharts.reducer';

import {
	datasetReducer,
	initialState as datasetInitialState
} from '@app/store/reducers/dataset.reducer';

import {
	companiesReducer,
	initialState as companiesInitialState
} from '@app/store/reducers/companies.reducer';

import {
	errorHandlerReducer,
	initialState as errorHandlerInitialState
} from '@app/store/reducers/error-handler.reducer';

import {
	projectsReducer,
	initialState as projectsInitialState
} from '@app/store/reducers/projects.reducer';

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
