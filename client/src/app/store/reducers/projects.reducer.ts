import { Actions as ProjectsActions } from '@app/store/actions/projects/projects.actions';
import { combineReducers } from '@ngrx/store';
import { ProjectsActionConstants as constants } from '@app/store/actions/projects/projects.action-types';
import { SchemeID } from '@app/models/normalizr.model';
import { DatasetActionConstants } from '@app/store/actions/datasets/datasets.action-types';
import { Actions as datasetsActions } from '@app/store/actions/datasets/datasets.actions';
import { Actions as chartActions } from '@app/store/actions/charts/charts.actions';
import { ChartsActionConstants } from '@app/store/actions/charts/charts.action-types';
import { ProjectsState } from '@app/models/projects-store.model';
import { omit } from 'lodash';

export const initialState: ProjectsState = {
	byId: {},
	all: [],
	active: null,
	pagination: {
		pageCount: null,
		page: null,
		totalRecords: null,
		rows: null
	},
	isLoading: false
};

const all = (state = initialState.all, action: ProjectsActions) => {
	switch (action.type) {
		case constants.LOAD_PROJECTS:
		case constants.LOAD_PROJECTS_INFO:
			return [];
		case constants.LOAD_PROJECTS__COMPLETE:
			return action.payload.projects.all;
		case constants.CREATE_DRAFT_PROJECT__COMPLETE:
			return [...state, action.payload.project.id];
		case constants.LOAD_ONE_PROJECT__COMPLETE:
			return [...state, action.payload.projectId];
		case constants.SAVE_PROJECT__COMPLETE:
			return [...state.filter(el => el !== action.payload.oldProjectId)];
		case constants.LOAD_PROJECTS_INFO__COMPLETE:
			return action.payload.all;
		case constants.DELETE_ONE_PROJECT__COMPLETE:
			return [...state.filter(el => el !== action.payload.id)];
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
		case constants.UPDATE_PROJECT_NAME__COMPLETE:
			return {
				...state,
				[action.payload.id]: {
					...state[action.payload.id],
					name: action.payload.name
				}
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
		case DatasetActionConstants.PARSE_DATA__COMPLETE:
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
		case constants.CHANGE_PROJECT_NAME:
			return {
				...state,
				[action.payload.id]: {
					...state[action.payload.id],
					name: action.payload.name
				}
			};
		case constants.SAVE_PROJECT__COMPLETE:
			return {
				...omit(state, action.payload.oldProjectId)
			};
		case constants.LOAD_PROJECTS_INFO__COMPLETE:
			return action.payload.byId || {};
		case constants.DELETE_ONE_PROJECT__COMPLETE:
			return {
				...omit(state, action.payload.id)
			};
		case constants.REMOVE_CHART_PROJECT__COMPLETE:
			return {
				...state,
				[action.payload.projectId]: {
					...state[action.payload.projectId],
					charts: [
						...state[action.payload.projectId].charts.filter(
							id => id !== action.payload.chartId
						)
					]
				}
			};
		case constants.REMOVE_DATASET_PROJECT:
			return {
				...state,
				[action.payload.projectId]: {
					...state[action.payload.projectId],
					datasets: [
						...state[action.payload.projectId].datasets.filter(
							id => id !== action.payload.datasetId
						)
					]
				}
			};
		case ChartsActionConstants.REMOVE_CHART__COMPLETE: {
			const activeProjectId = action.payload.projectId;
			return {
				...state,
				[activeProjectId]: {
					...state[activeProjectId],
					charts: state[activeProjectId].charts.filter(
						chId => chId !== action.payload.id
					),
					datasets: state[activeProjectId].datasets.filter(
						dId => dId !== action.payload.datasetId
					)
				}
			};
		}
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
		case constants.LOAD_PROJECTS_INFO:
		case constants.SAVE_PROJECT:
			return true;
		case constants.LOAD_PROJECTS__COMPLETE:
		case constants.LOAD_ONE_PROJECT__COMPLETE:
		case constants.LOAD_ONE_PROJECT__FAILED:
		case constants.LOAD_PROJECTS__FAILED:
		case constants.LOAD_PROJECTS_INFO__COMPLETE:
		case constants.LOAD_PROJECTS_INFO__FAILED:
		case constants.SAVE_PROJECT__COMPLETE:
		case constants.SAVE_PROJECT__FAILED:
		case constants.UPDATE_PROJECT__COMPLETE:
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
		case constants.SAVE_PROJECT__COMPLETE:
			return action.payload.projectId;
		case constants.LOAD_PROJECTS_INFO__COMPLETE:
			return null;
		default:
			return state;
	}
};

export const pagination = (
	state = initialState.pagination,
	action: ProjectsActions
) => {
	switch (action.type) {
		case constants.LOAD_PROJECTS_INFO__COMPLETE:
			return {
				...state,
				...action.payload.pagination
			};
		default:
			return state;
	}
};

const reducers = {
	all,
	byId,
	isLoading,
	active,
	pagination
};

export const projectsReducer = combineReducers(reducers);
