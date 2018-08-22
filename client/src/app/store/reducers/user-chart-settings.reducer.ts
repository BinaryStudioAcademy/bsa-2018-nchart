import { ProjectsActionConstants } from '@app/store/actions/projects/projects.action-types';
import { Actions as projectActions } from '@app/store/actions/projects/projects.actions';
import { Actions as chartActions } from '@app/store/actions/charts/charts.actions';
import { UserChartSettingsState } from '@app/models/chart.model';
import { combineReducers } from '@ngrx/store';
import { ChartsActionConstants } from '@app/store/actions/charts/charts.action-types';

export const initialState: UserChartSettingsState = {
	dimensionSettings: {},
	customizeSettings: {}
};

const dimensionSettings = (
	state = initialState.dimensionSettings,
	action: projectActions | chartActions
) => {
	switch (action.type) {
		case ProjectsActionConstants.LOAD_ONE_PROJECT__COMPLETE:
			return action.payload.entities.dimensionSetting;
		case ChartsActionConstants.CREATE_CHART__COMPLETE:
			return {
				...state,
				...action.payload.chart.entities.dimensionSetting
			};
		case ChartsActionConstants.SELECT_CHART__COMPLETE:
			return {
				...action.payload.chart.entities.dimensionSetting
			};
		default:
			return state;
	}
};

const customizeSettings = (
	state = initialState.customizeSettings,
	action: projectActions | chartActions
) => {
	switch (action.type) {
		case ProjectsActionConstants.LOAD_ONE_PROJECT__COMPLETE:
			return action.payload.entities.customizeSetting;
		case ChartsActionConstants.CREATE_CHART__COMPLETE:
			return {
				...state,
				...action.payload.chart.entities.customizeSetting
			};
		case ChartsActionConstants.SELECT_CHART__COMPLETE:
			return {
				...action.payload.chart.entities.customizeSetting
			};
		default:
			return state;
	}
};

export const userChartSettingsReducer = combineReducers({
	dimensionSettings,
	customizeSettings
});
