import { AppState } from '@app/models';

export const getAllCharts = () => (state: AppState) =>
	state.charts.all.map(id => state.charts.byId[id]);

export const getChartById = (id) => (state: AppState) =>
	state.charts.byId[id];

export const getFirstChart = (state: AppState) =>
	state.charts.byId[state.charts.all[0]];

export const isChartsLoading = () => (state: AppState) =>
	state.charts.isLoading;

export const isChartsReady = () => (state: AppState) => state.charts.all.length;
