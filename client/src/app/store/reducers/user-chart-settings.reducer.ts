import { ProjectsActionConstants } from '@app/store/actions/projects/projects.action-types';
import { Actions as projectActions } from '@app/store/actions/projects/projects.actions';
import { UserChartSettingsState } from '@app/models/chart.model';
import { combineReducers } from '@ngrx/store';

export const initialState: UserChartSettingsState = {
	dimensionSettings: {},
	customizeSettings: {}
};

const dimensionSettings = (
	state = initialState.dimensionSettings,
	action: projectActions
) => {
	switch (action.type) {
		case ProjectsActionConstants.LOAD_ONE_PROJECT__COMPLETE:
			return action.payload.entities.dimensionSetting;
		default:
			return state;
	}
};

const customizeSettings = (
	state = initialState.customizeSettings,
	action: projectActions
) => {
	switch (action.type) {
		case ProjectsActionConstants.LOAD_ONE_PROJECT__COMPLETE:
			return action.payload.entities.customizeSetting;
		default:
			return state;
	}
};

export const userChartSettingsReducer = combineReducers({
	dimensionSettings,
	customizeSettings
});
