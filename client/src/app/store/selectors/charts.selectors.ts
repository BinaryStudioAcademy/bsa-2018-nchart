import { AppState, Chart } from '@app/models';
import { SchemeID } from '@app/models/normalizr.model';
import {
	UserChart,
	UserMappingColumn
} from '../../models/user-chart-store.model';
import { dataset } from './dataset.selectors';

export const getAllCharts = () => (state: AppState) =>
	state.charts.all.map(id => state.charts.byId[id]);

export const chart = (id?: SchemeID) => (state: AppState): UserChart =>
	state.userCharts.byId[id || state.userCharts.active]
		? state.userCharts.byId[id || state.userCharts.active]
		: null;

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

export const isChartsReady = () => (state: AppState) => state.charts.all.length;
