import { DatasetColumnState } from '@app/models/dataset.model';
import { ProjectsActionConstants } from '@app/store/actions/projects/projects.action-types';
import { Actions as projectActions } from '@app/store/actions/projects/projects.actions';
import { Actions as datasetsActions } from '@app/store/actions/datasets/datasets.actions';
import { DatasetActions } from '@app/store/actions/datasets/datasets.action-types';

export const initialState: DatasetColumnState = {};

export const datasetColumnsReducer = (
	state = initialState,
	action: projectActions | datasetsActions
) => {
	switch (action.type) {
		case ProjectsActionConstants.LOAD_ONE_PROJECT__COMPLETE:
			return action.payload.entities.datasetColumn;
		case DatasetActions.PARSE_DATA__COMPLETE:
			return {
				...state,
				...action.payload.entities.datasetColumn
			};
		case DatasetActions.CHANGE_HEADER_TITLE: {
			return {
				...state,
				[action.payload.id]: {
					...state[action.payload.id],
					title: action.payload.title
				}
			};
		}
		case DatasetActions.DELETE_COLUMN: {
			delete state[action.payload.id];
			return state;
		}
		case DatasetActions.CHANGE_COLUMN_TYPE: {
			return {
				...state,
				[action.payload.id]: {
					...state[action.payload.id],
					type: action.payload.type
				}
			};
		}
		default:
			return state;
	}
};
