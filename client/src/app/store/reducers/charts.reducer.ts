import { Actions as ChartsActions } from '@app/store/actions/charts/charts.actions';
import { ChartsActionConstants } from '@app/store/actions/charts/charts.action-types';
import { combineReducers } from '@ngrx/store';
import { ChartsState } from '@app/models/chart.model';

export const initialState: ChartsState = {
	byId: {},
	all: [],
	isLoading: false
};

const all = (state = initialState.all, action: ChartsActions) => {
	switch (action.type) {
		case ChartsActionConstants.LOAD_CHARTS:
			return [];
		case ChartsActionConstants.LOAD_CHARTS__COMPLETE:
			return action.payload.charts.all;
		default:
			return state;
	}
};

const byId = (state = initialState.byId, action: ChartsActions) => {
	switch (action.type) {
		case ChartsActionConstants.LOAD_CHARTS:
			return {};
		case ChartsActionConstants.LOAD_CHARTS__COMPLETE:
			return action.payload.charts.entities.chart;
		default:
			return state;
	}
};

export const isLoading = (
	state = initialState.isLoading,
	action: ChartsActions
): boolean => {
	switch (action.type) {
		case ChartsActionConstants.LOAD_CHARTS:
			return true;
		case ChartsActionConstants.LOAD_CHARTS__COMPLETE:
		case ChartsActionConstants.LOAD_CHARTS__FAILED:
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
