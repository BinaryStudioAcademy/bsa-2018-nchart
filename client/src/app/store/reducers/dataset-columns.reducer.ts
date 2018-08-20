import { DatasetColumnState } from '@app/models/dataset.model';
import { ProjectsActionConstants } from '@app/store/actions/projects/projects.action-types';
import { Actions as projectActions } from '@app/store/actions/projects/projects.actions';
import {Actions as datasetsActions} from '@app/store/actions/datasets/datasets.actions';
import {DatasetActions} from '@app/store/actions/datasets/datasets.action-types';

export const initialState: DatasetColumnState = {};

export const datasetColumnsReducer = (
	state = initialState,
	action: projectActions | datasetsActions
) => {
	switch (action.type) {
		case ProjectsActionConstants.LOAD_ONE_PROJECT__COMPLETE:
			return action.payload.entities.datasetColumn;
		case DatasetActions.PARSE_DATA__COMPLETE: {
			return {
				...state,
				...action.payload.entities.datasetColumn
			}
		}
		default:
			return state;
	}
};
