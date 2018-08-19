import { DatasetDataState } from '@app/models/dataset.model';
import { ProjectsActionConstants } from '@app/store/actions/projects/projects.action-types';
import { Actions as projectActions } from '@app/store/actions/projects/projects.actions';

export const initialState: DatasetDataState = {};

export const datasetDataReducer = (
	state = initialState,
	action: projectActions
) => {
	switch (action.type) {
		case ProjectsActionConstants.LOAD_ONE_PROJECT__COMPLETE:
			return action.payload.entities.datasetData;
		default:
			return state;
	}
};
