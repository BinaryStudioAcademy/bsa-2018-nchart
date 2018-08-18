import { UserChartsState } from '@app/models';
import { combineReducers } from '@ngrx/store';

export const initialState: UserChartsState = {
	byId: {},
	active: null
};

const byId = (state = initialState.byId, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

const active = (state = initialState.active, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

const reducers = {
	byId,
	active
};

export const userChartsReducer = combineReducers(reducers);
