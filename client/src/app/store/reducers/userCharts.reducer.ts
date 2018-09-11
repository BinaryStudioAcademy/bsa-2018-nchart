import { combineReducers } from '@ngrx/store';
import { ProjectsActionConstants } from '@app/store/actions/projects/projects.action-types';
import { Actions as projectActions } from '@app/store/actions/projects/projects.actions';
import { Actions as chartActions } from '@app/store/actions/charts/charts.actions';
import { ChartsActionConstants } from '@app/store/actions/charts/charts.action-types';
import { UserChart, UserChartsState } from '@app/models/user-chart-store.model';
import { NormalizedSchemeField } from '@app/models/normalizr.model';
import { omit } from 'lodash';

export const initialState: UserChartsState = {
	byId: {},
	active: null
};

const byId = (
	state = initialState.byId,
	action: projectActions | chartActions
): NormalizedSchemeField<UserChart> => {
	switch (action.type) {
		case ProjectsActionConstants.LOAD_ONE_PROJECT__COMPLETE:
			return action.payload.entities.chart;
		case ChartsActionConstants.CREATE_CHART__COMPLETE:
			return {
				...state,
				[action.payload.chart.chartId]:
					action.payload.chart.entities.chart[
						action.payload.chart.chartId
					]
			};
		case ChartsActionConstants.REMOVE_CHART__COMPLETE:
			return {
				...omit(state, action.payload.id)
			};
		case ChartsActionConstants.SELECT_CHART__COMPLETE:
			return {
				...state,
				[action.payload.chart.chartId]: {
					...state[action.payload.chart.chartId],
					...action.payload.chart.entities.chart[
						action.payload.chart.chartId
					]
				}
			};
		case ChartsActionConstants.SET_DATASET_CHART:
			return {
				...state,
				[action.payload.chartId]: {
					...state[action.payload.chartId],
					datasetId: action.payload.datatsetId
				}
			};
		case ProjectsActionConstants.REMOVE_DATASET_PROJECT:
			return {
				...state,
				[action.payload.chartId]: {
					...state[action.payload.chartId],
					datasetId: null
				}
			};
		default:
			return state;
	}
};

const active = (
	state = initialState.active,
	action: projectActions | chartActions
) => {
	switch (action.type) {
		case ProjectsActionConstants.LOAD_ONE_PROJECT__COMPLETE:
			return action.payload.entities.project[action.payload.projectId]
				.charts[0];
		case ProjectsActionConstants.CREATE_DRAFT_PROJECT__COMPLETE:
		case ChartsActionConstants.REMOVE_CHART__COMPLETE:
			return null;
		case ChartsActionConstants.CREATE_CHART__COMPLETE:
			return action.payload.chart.chartId;
		case ChartsActionConstants.PICK_ACTIVE_CHART:
			return action.payload.id;
		default:
			return state;
	}
};

const reducers = {
	byId,
	active
};

export const userChartsReducer = combineReducers(reducers);
