import { Actions as ChartsActions } from '../actions/charts/charts.actions';
import { ChartsActionConstants } from '../actions/charts/charts.action-types';
import { combineReducers } from '@ngrx/store';
import { ChartsState } from '@app/models';

export const initialState: ChartsState = {
	byId: {},
	all: [],
	isLoading: false
};

const all = (state = initialState.all, action: ChartsActions) => {
	switch (action.type) {
		case ChartsActionConstants.CHARTS_LOAD_DATA:
			return [];
		case ChartsActionConstants.CHARTS_LOAD_DATA__COMPLETE:
			return action.payload.charts.all;
		default:
			return state;
	}
};

const byId = (state = initialState.byId, action: ChartsActions) => {
	switch (action.type) {
		case ChartsActionConstants.CHARTS_LOAD_DATA:
			return {};
		case ChartsActionConstants.CHARTS_LOAD_DATA__COMPLETE:
			return action.payload.charts.byId;
		default:
			return state;
	}
};

export const isLoading = (
	state = initialState.isLoading,
	action: ChartsActions
): boolean => {
	switch (action.type) {
		case ChartsActionConstants.CHARTS_LOAD_DATA:
			return true;
		case ChartsActionConstants.CHARTS_LOAD_DATA__COMPLETE:
		case ChartsActionConstants.CHARTS_LOAD_DATA__FAILED:
			return false;
		default:
			return state;
	}
};

const reducers: ChartsState<ChartsActions> = {
	all,
	byId,
	isLoading
};

export const chartsReducer = combineReducers(reducers);
