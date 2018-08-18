import { Actions as ProjectsActions } from '@app/store/actions/projects/projects.actions';
import { combineReducers } from '@ngrx/store';
import { ProjectsState } from '@app/models';
import { ProjectsActionConstants } from '@app/store/actions/projects/projects.action-types';

export const initialState: ProjectsState = {
	byId: {},
	all: [],
	active: null,
	isLoading: false
};

const all = (state = initialState.all, action: ProjectsActions) => {
	switch (action.type) {
		case ProjectsActionConstants.LOAD_PROJECTS:
			return [];
		case ProjectsActionConstants.LOAD_PROJECTS__COMPLETE:
			return action.payload.projects.all;
		default:
			return state;
	}
};

const byId = (state = initialState.byId, action: ProjectsActions) => {
	switch (action.type) {
		case ProjectsActionConstants.LOAD_PROJECTS:
			return {};
		case ProjectsActionConstants.LOAD_PROJECTS__COMPLETE:
			return action.payload.projects.byId;
		default:
			return state;
	}
};

export const isLoading = (
	state = initialState.isLoading,
	action: ProjectsActions
): boolean => {
	switch (action.type) {
		case ProjectsActionConstants.LOAD_PROJECTS:
			return true;
		case ProjectsActionConstants.LOAD_PROJECTS__COMPLETE:
		case ProjectsActionConstants.LOAD_PROJECTS__FAILED:
			return false;
		default:
			return state;
	}
};

const reducers = {
	all,
	byId,
	isLoading
};

export const projectsReducer = combineReducers(reducers);
