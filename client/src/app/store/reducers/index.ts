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

import {
	userChartSettingsReducer,
	initialState as userChartSettingsInitialState
} from './user-chart-settings.reducer';

import {
	defaultChartSettingsReducer,
	initialState as defaultChartSettingsInitialState
} from './default-chart-settings.reducer';

import {
	datasetColumnsReducer,
	initialState as datasetColumnsInitialState
} from './dataset-columns.reducer';

import {
	datasetDataReducer,
	initialState as datasetDataInitialState
} from './dataset-data.reducer';

export const initialState: AppState = {
	user: userInitialState,
	errorHandler: errorHandlerInitialState,
	companies: companiesInitialState,
	projects: projectsInitialState,
	charts: chartsInitialState,
	datasets: datasetInitialState,
	userCharts: userChartsInitialState,
	datasetColumns: datasetColumnsInitialState,
	datasetData: datasetDataInitialState,
	defaultChartSettings: defaultChartSettingsInitialState,
	userChartSettings: userChartSettingsInitialState
};

export const getReducers = () => ({
	user: userReducer,
	errorHandler: errorHandlerReducer,
	companies: companiesReducer,
	projects: projectsReducer,
	charts: chartsReducer,
	datasets: datasetReducer,
	userCharts: userChartsReducer,
	userChartSettings: userChartSettingsReducer,
	defaultChartSettings: defaultChartSettingsReducer,
	datasetColumns: datasetColumnsReducer,
	datasetData: datasetDataReducer
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
