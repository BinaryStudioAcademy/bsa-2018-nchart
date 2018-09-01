import { DatasetColumnState } from '@app/models/dataset.model';
import { ProjectsActionConstants } from '@app/store/actions/projects/projects.action-types';
import { Actions as projectActions } from '@app/store/actions/projects/projects.actions';
import { Actions as datasetsActions } from '@app/store/actions/datasets/datasets.actions';
import { DatasetActionConstants as constants } from '@app/store/actions/datasets/datasets.action-types';
import { /*last,*/ omit } from 'lodash';

export const initialState: DatasetColumnState = {};

export const datasetColumnsReducer = (
	state = initialState,
	action: projectActions | datasetsActions
) => {
	switch (action.type) {
		case ProjectsActionConstants.LOAD_ONE_PROJECT__COMPLETE:
			return action.payload.entities.datasetColumn;
		case constants.PARSE_DATA__COMPLETE:
			return {
				...state,
				...action.payload.entities.datasetColumn
			};
		case constants.CHANGE_HEADER_TITLE: {
			return {
				...state,
				[action.payload.id]: {
					...state[action.payload.id],
					title: action.payload.title
				}
			};
		}
		case constants.DELETE_COLUMN: {
			return {
				...omit(state, action.payload.columnId)
			};
		}
		/* case constants.ADD_NEW_COLUMN: {
			const key = last(
				[].concat(...action.payload.data.modified.columns)
			);
			return {
				...state,
				[key.id]: {
					id: key.id,
					title: key.title,
					type: key.type
				}
			};
		} */
		case constants.CHANGE_COLUMN_TYPE: {
			return {
				...state,
				[action.payload.columnId]: {
					...state[action.payload.columnId],
					type: action.payload.type
				}
			};
		}
		default:
			return state;
	}
};
