import { combineReducers } from '@ngrx/store';
import { DatasetDataState } from '@app/models/dataset.model';

export const initialState: DatasetDataState = {
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

export const datasetDataReducer = combineReducers(reducers);
