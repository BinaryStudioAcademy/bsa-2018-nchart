import { DatasetState } from '@app/models';
import { combineReducers } from '@ngrx/store';

export const initialState: DatasetState = {
	byId: {},
};

const byId = (state = initialState.byId, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

const reducers = {
	byId
};

export const datasetReducer = combineReducers(reducers);
