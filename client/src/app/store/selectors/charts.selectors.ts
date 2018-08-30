import { SchemeID } from '@app/models/normalizr.model';
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
			sysName: c.sysName,
			type: c.type,
			description: c.description
		};
	});

export const getChart = id => (state: AppState) => {
	const c = state.charts.byId[id];
	return {
		...c,
		dimensionSettings: c.dimensionSettings.map(
			i => state.defaultChartSettings.dimensionSettings[i]
		),
		customizeSettings: c.customizeSettings.map(
			i => state.defaultChartSettings.customizeSettings[i]
		)
	};
};

export const getFirstChart = () => (state: AppState): Chart => {
	const fChart: Chart<SchemeID[], SchemeID[]> =
		state.charts.byId[state.charts.all[0]];

	if (fChart) {
		return {
			...fChart,
			dimensionSettings: fChart.dimensionSettings.map(
				id => state.defaultChartSettings.dimensionSettings[id]
			),
			customizeSettings: fChart.customizeSettings.map(
				id => state.defaultChartSettings.customizeSettings[id]
			)
		};
	}

	return null;
};

export const isChartsLoading = () => (state: AppState) =>
	state.charts.isLoading;

export const isChartsReady = () => (state: AppState) => !!state.charts.all.length;
