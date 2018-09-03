import { combineReducers } from '@ngrx/store';
import { Actions as DatasetActions } from '@app/store/actions/datasets/datasets.actions';
import { DatasetActionConstants as constants } from '@app/store/actions/datasets/datasets.action-types';

export const initialState = {
	preloadSamples: []
};

export const preloadSamples = (
	state = initialState.preloadSamples,
	action: DatasetActions
): any[] => {
	switch (action.type) {
		case constants.PRELOAD_SAMPLES__COMPLETE:
			return action.payload;
		default:
			return state;
	}
};

export const datasetPreloadReducer = combineReducers({ preloadSamples });
