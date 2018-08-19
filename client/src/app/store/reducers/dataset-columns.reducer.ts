import { DatasetColumnState } from '@app/models';
import { combineReducers } from '@ngrx/store';

export const initialState: DatasetColumnState = {
	byId: {}
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

export const datasetColumnsReducer = combineReducers(reducers);
