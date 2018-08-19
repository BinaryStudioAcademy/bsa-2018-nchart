import { combineReducers } from '@ngrx/store';

export const initialState: any = {
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

export const defaultChartSettingsReducer = combineReducers(reducers);
