import { AppState } from '@app/models';

export const getAllCharts = (state: AppState) => {
	return state.charts.all.map(id => state.charts.byId[id]);
};

export const isChartsReady = (state: AppState) => {
	return !!state.charts.all.length;
};
