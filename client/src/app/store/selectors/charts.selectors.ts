import { SchemeID } from '@app/models/normalizr.model';
import {
	UserChart,
	UserMappingColumn
} from '@app/models/user-chart-store.model';
import { dataset } from './dataset.selectors';
import { AppState } from '@app/models/store.model';
import { Chart } from '@app/models/chart.model';

export const getAllCharts = () => (state: AppState) =>
	state.charts.all.map(id => state.charts.byId[id]);

export const getListChart = () => (state: AppState) =>
	state.charts.all.map(id => {
		const c = state.charts.byId[id];
		return {
			id: c.id,
			name: c.name,
			type: c.type,
			description: c.description
		};
	});

export const chart = (id?: SchemeID) => (state: AppState): UserChart =>
	state.userCharts.byId[id || state.userCharts.active]
		? state.userCharts.byId[id || state.userCharts.active]
		: null;

export const getChart = id => (state: AppState) => {
	const c = state.charts.byId[id];
	return {
		...chart,
		dimensionSettings: c.dimensionSettings.map(
			i => state.defaultChartSettings.dimensionSettings[i]
		),
		customizeSettings: c.customizeSettings.map(
			i => state.defaultChartSettings.customizeSettings[i]
		)
	};
};

export const getActiveChartId = () => (state: AppState) =>
	state.userCharts.active;

export const getFirstChart = () => (state: AppState): Chart => {
	const fChart: Chart<SchemeID[], SchemeID[]> =
		state.charts.byId[state.charts.all[0]];

	return {
		...fChart,
		dimensionSettings: fChart.dimensionSettings.map(
			id => state.defaultChartSettings.dimensionSettings[id]
		),
		customizeSettings: fChart.customizeSettings.map(
			id => state.defaultChartSettings.customizeSettings[id]
		)
	};
};

export const isChartsLoading = () => (state: AppState) =>
	state.charts.isLoading;

export const mappingColumns = () => (state: AppState): UserMappingColumn[] => {
	const c: UserChart = chart()(state);

	if (c) {
		const d = dataset(c.datasetId)(state);

		if (d) {
			return d.modified.columns.map(
				id =>
					({
						variable: state.datasetColumns[id].title,
						type: state.datasetColumns[id].type,
						id: state.datasetColumns[id].id
					} as UserMappingColumn)
			);
		}

		return [];
	}

	return [];
};

export const mappingDimensions = () => (state: AppState): any => {
	const c: UserChart = chart()(state);

	if (c) {
		return c.dimensionSettings.map(id => ({
			value: [], // todo
			...state.defaultChartSettings.dimensionSettings[id]
		}));
	}

	return [];
};

export const isChartsReady = () => (state: AppState) => state.charts.all.length;
