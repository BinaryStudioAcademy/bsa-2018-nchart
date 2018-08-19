import { UserChartsState } from '@app/models';
import { combineReducers } from '@ngrx/store';
import { ProjectsActionConstants } from '@app/store/actions/projects/projects.action-types';
import { Actions as projectActions } from '@app/store/actions/projects/projects.actions';

export const initialState: UserChartsState = {
	byId: {},
	active: null
};

const byId = (state = initialState.byId, action: projectActions) => {
	switch (action.type) {
		case ProjectsActionConstants.LOAD_ONE_PROJECT__COMPLETE:
			return action.payload.entities.chart;
		default:
			return state;
	}
};

const active = (state = initialState.active, action: projectActions) => {
	switch (action.type) {
		case ProjectsActionConstants.LOAD_ONE_PROJECT__COMPLETE:
			return action.payload.entities.project[action.payload.projectId]
				.charts[0];
		default:
			return state;
	}
};

const reducers = {
	byId,
	active
};

export const userChartsReducer = combineReducers(reducers);
