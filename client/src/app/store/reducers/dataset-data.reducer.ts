import { DatasetDataState } from '@app/models/dataset.model';
import { ProjectsActionConstants } from '@app/store/actions/projects/projects.action-types';
import { Actions as projectActions } from '@app/store/actions/projects/projects.actions';
import {DatasetActions} from '@app/store/actions/datasets/datasets.action-types';
import {Actions as datasetsActions} from '@app/store/actions/datasets/datasets.actions';

export const initialState: DatasetDataState = {};

export const datasetDataReducer = (
	state = initialState,
	action: projectActions | datasetsActions
) => {
	switch (action.type) {
		case ProjectsActionConstants.LOAD_ONE_PROJECT__COMPLETE:
			return action.payload.entities.datasetData;
		case DatasetActions.PARSE_DATA__COMPLETE:
			return {
				...state,
				...action.payload.entities.datasetData
			};
		default:
			return state;
	}
};
