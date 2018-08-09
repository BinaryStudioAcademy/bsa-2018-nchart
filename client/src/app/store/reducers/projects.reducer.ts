import { Actions as ProjectsActions } from '../actions/projects/projects.actions';
import { combineReducers } from '@ngrx/store';
import { ProjectsState } from '@app/models';
import { ProjectsActionConstants } from '@app/store/actions/projects/projects.action-types';

export const initialState: ProjectsState = {
	byId: {},
	all: [],
	isLoading: false
};

const all = (state = initialState.all, action: ProjectsActions) => {
	switch (action.type) {
		case ProjectsActionConstants.PROJECTS_LOAD_DATA:
			return [];
		case ProjectsActionConstants.PROJECTS_LOAD_DATA__COMPLETE:
			return action.payload.projects.all;
		default:
			return state;
	}
};

const byId = (state = initialState.byId, action: ProjectsActions) => {
	switch (action.type) {
		case ProjectsActionConstants.PROJECTS_LOAD_DATA:
			return {};
		case ProjectsActionConstants.PROJECTS_LOAD_DATA__COMPLETE:
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
		case ProjectsActionConstants.PROJECTS_LOAD_DATA:
			return true;
		case ProjectsActionConstants.PROJECTS_LOAD_DATA__COMPLETE:
		case ProjectsActionConstants.PROJECTS_LOAD_DATA__FAILED:
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