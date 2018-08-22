import { Actions as ProjectsActions } from '../actions/projects/projects.actions';
import { combineReducers } from '@ngrx/store';
import { ProjectsState } from '@app/models';
import { ProjectsActionConstants as constants } from '@app/store/actions/projects/projects.action-types';
import { SchemeID } from '@app/models/normalizr.model';
import { DatasetActions } from '@app/store/actions/datasets/datasets.action-types';
import { Actions as datasetsActions } from '@app/store/actions/datasets/datasets.actions';
import {Actions as chartActions} from '@app/store/actions/charts/charts.actions';
import {ChartsActionConstants} from '@app/store/actions/charts/charts.action-types';

export const initialState: ProjectsState = {
	byId: {},
	all: [],
	active: null,
	isLoading: false
};

const all = (state = initialState.all, action: ProjectsActions) => {
	switch (action.type) {
		case constants.LOAD_PROJECTS:
			return [];
		case constants.LOAD_PROJECTS__COMPLETE:
			return action.payload.projects.all;
		case constants.CREATE_DRAFT_PROJECT__COMPLETE:
			return [...state, action.payload.project.id];
		case constants.LOAD_ONE_PROJECT__COMPLETE:
			return [...state, action.payload.projectId];
		default:
			return state;
	}
};

const byId = (
	state = initialState.byId,
	action: ProjectsActions | datasetsActions | chartActions
) => {
	switch (action.type) {
		case constants.LOAD_PROJECTS:
			return {};
		case constants.LOAD_PROJECTS__COMPLETE:
			return action.payload.projects.byId;
		case constants.CREATE_DRAFT_PROJECT__COMPLETE:
			return {
				...state,
				[action.payload.project.id]: action.payload.project
			};
		case constants.LOAD_ONE_PROJECT__COMPLETE:
			return {
				...state,
				...action.payload.entities.project
			};
		case ChartsActionConstants.CREATE_CHART__COMPLETE:
			return {
				...state,
				[action.payload.projectId]: {
					...state[action.payload.projectId],
					charts: [
						...state[action.payload.projectId].charts,
						action.payload.chart.chartId
					]
				}
			};
		case DatasetActions.PARSE_DATA__COMPLETE:
			return {
				...state,
				[action.payload.projectId]: {
					...state[action.payload.projectId],
					datasets: [
						...state[action.payload.projectId].datasets,
						action.payload.datasetId
					]
				}
			};
		default:
			return state;
	}
};

export const isLoading = (
	state = initialState.isLoading,
	action: ProjectsActions
): boolean => {
	switch (action.type) {
		case constants.LOAD_PROJECTS:
		case constants.LOAD_ONE_PROJECT:
			return true;
		case constants.LOAD_PROJECTS__COMPLETE:
		case constants.LOAD_ONE_PROJECT__COMPLETE:
		case constants.LOAD_ONE_PROJECT__FAILED:
		case constants.LOAD_PROJECTS__FAILED:
			return false;
		default:
			return state;
	}
};

export const active = (
	state = initialState.active,
	action: ProjectsActions
): SchemeID => {
	switch (action.type) {
		case constants.CREATE_DRAFT_PROJECT__COMPLETE:
			return action.payload.project.id;
		case constants.LOAD_ONE_PROJECT__COMPLETE:
			return action.payload.projectId;
		default:
			return state;
	}
};

const reducers = {
	all,
	byId,
	isLoading,
	active
};

export const projectsReducer = combineReducers(reducers);
