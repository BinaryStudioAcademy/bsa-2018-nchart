import { ProjectsActionConstants } from '@app/store/actions/projects/projects.action-types';
import { Actions as projectActions } from '@app/store/actions/projects/projects.actions';
import { DatasetActionConstants as constants } from '@app/store/actions/datasets/datasets.action-types';
import { Actions as datasetsActions } from '@app/store/actions/datasets/datasets.actions';
import { DatasetState, Dataset } from '@app/models/dataset.model';
import { combineReducers } from '@ngrx/store';
import { NormalizedSchemeField } from '@app/models/normalizr.model';

export const initialState: DatasetState = {
	byId: {},
	isLoading: false
};

const byId = (
	state = initialState.byId,
	action: projectActions | datasetsActions
): NormalizedSchemeField<Dataset> => {
	switch (action.type) {
		case ProjectsActionConstants.LOAD_ONE_PROJECT__COMPLETE:
			return action.payload.entities.dataset;
		case constants.PARSE_DATA__COMPLETE:
			return {
				...state,
				...action.payload.entities.dataset
			};
		case constants.DELETE_COLUMN:
			const { datasetId, id, index } = action.payload;
			return {
				...state,
				[datasetId]: {
					...state[datasetId],
					modified: {
						...state[datasetId].modified,
						columns: [
							...state[datasetId].modified.columns.filter(
								el => el !== id
							)
						],
						data: [
							...state[datasetId].modified.data.map(el =>
								el.filter(
									(d: string) =>
										!d.includes(`-${index}-${datasetId}`)
								)
							)
						]
					}
				} as Dataset
			};
		default:
			return state;
	}
};

const isLoading = (
	state = initialState.isLoading,
	action: projectActions | datasetsActions
) => {
	switch (action.type) {
		case constants.PARSE_FROM_FILE:
		case constants.PARSE_FROM_URL:
		case constants.PARSE_PLAIN_TEXT:
			return true;
		case constants.PARSE_DATA__COMPLETE:
		case constants.PARSE_DATA__FAILED:
			return false;
		default:
			return state;
	}
};

export const datasetReducer = combineReducers({
	byId,
	isLoading
});
