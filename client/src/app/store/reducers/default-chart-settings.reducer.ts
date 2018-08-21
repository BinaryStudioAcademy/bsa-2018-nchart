import { DefaultChartSettingsState } from '@app/models/chart.model';
import { ChartsActionConstants } from '@app/store/actions/charts/charts.action-types';
import * as chartActions from '@app/store/actions/charts/charts.actions';

export const initialState: DefaultChartSettingsState = {
	dimensionSettings: {},
	customizeSettings: {}
};

export const defaultChartSettingsReducer = (
	state = initialState,
	action: chartActions.Actions
): DefaultChartSettingsState => {
	switch (action.type) {
		case ChartsActionConstants.LOAD_CHARTS__COMPLETE:
			return {
				dimensionSettings:
					action.payload.charts.entities.dimensionSetting,
				customizeSettings:
					action.payload.charts.entities.customizeSetting
			};
		default:
			return state;
	}
};
