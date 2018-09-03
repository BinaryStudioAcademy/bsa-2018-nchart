import { ProjectsActionConstants } from '@app/store/actions/projects/projects.action-types';
import { Actions as projectActions } from '@app/store/actions/projects/projects.actions';
import { DatasetActions } from '@app/store/actions/datasets/datasets.action-types';
import { Actions as datasetsActions } from '@app/store/actions/datasets/datasets.actions';
import { Actions as chartsActions } from '@app/store/actions/charts/charts.actions';
import { DatasetState } from '@app/models/dataset.model';
import { combineReducers } from '@ngrx/store';
import {ChartsActionConstants} from '@app/store/actions/charts/charts.action-types';
import { omit } from 'lodash';

export const initialState: DatasetState = {
	byId: {},
	isLoading: false
};

const byId = (
	state = initialState.byId,
	action: projectActions | datasetsActions | chartsActions
) => {
	switch (action.type) {
		case ProjectsActionConstants.LOAD_ONE_PROJECT__COMPLETE:
			return action.payload.entities.dataset;
		case DatasetActions.PARSE_DATA__COMPLETE:
			return {
				...state,
				...action.payload.entities.dataset
			};
		case ChartsActionConstants.REMOVE_CHART__COMPLETE:
			return	{
				...omit(state, action.payload.datasetId)
				};
		default:
			return state;
	}
};

const isLoading = (
	state = initialState.isLoading,
	action: projectActions | datasetsActions
) => {
	switch (action.type) {
		case DatasetActions.PARSE_FROM_FILE:
		case DatasetActions.PARSE_FROM_URL:
		case DatasetActions.PARSE_PLAIN_TEXT:
			return true;
		case DatasetActions.PARSE_DATA__COMPLETE:
		case DatasetActions.PARSE_DATA__FAILED:
			return false;
		default:
			return state;
	}
};

export const datasetReducer = combineReducers({
	byId,
	isLoading
});
