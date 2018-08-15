import { AppState } from '@app/models';

export const getChart = (state: AppState) => {
	return state.userChart;
};

export const getChartId = (state: AppState) => {
	return state.userChart.id;
};

export const getChartCustomize = (state: AppState) => {
	return state.userChart.customize_settings;
};
