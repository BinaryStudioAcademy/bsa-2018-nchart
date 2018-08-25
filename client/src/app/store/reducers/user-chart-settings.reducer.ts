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
		case ChartsActionConstants.SELECT_DIMENSION:
			return {
				...state,
				[action.payload.dimensionId]: {
					...state[action.payload.dimensionId],
					columnIds: [
						...state[action.payload.dimensionId].columnIds,
						action.payload.columnId
					]
				}
			};
		case ChartsActionConstants.REMOVE_DIMENSION: {
			const removedColumnId = action.payload.columnId;
			const columnIds = [
				...state[action.payload.dimensionId].columnIds
			].filter(id => id !== removedColumnId);

			return {
				...state,
				[action.payload.dimensionId]: {
					...state[action.payload.dimensionId],
					columnIds
				}
			};
		}
		case ChartsActionConstants.REMOVE_ALL_DIMENSION: {
			const dimensions = {
				...state
			};
			for (const id in dimensions) {
				if (dimensions.hasOwnProperty(id)) {
					dimensions[id].columnIds = [];
				}
			}

			return {
				...dimensions
			};
		}
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
		case ChartsActionConstants.CHANGE_CUSTOM_SETTINGS:
			const newValues = action.payload;
			const customValues = {};

			for (const id in newValues) {
				if (newValues.hasOwnProperty(id)) {
					customValues[id] = { ...state[id] };
					customValues[id].value = newValues[id];
				}
			}
			return {
				...state,
				...customValues
			};
		default:
			return state;
	}
};

export const userChartSettingsReducer = combineReducers({
	dimensionSettings,
	customizeSettings
});
