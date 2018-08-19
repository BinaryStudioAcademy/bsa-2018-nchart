import { DatasetColumnState } from '@app/models/dataset.model';
import { ProjectsActionConstants } from '@app/store/actions/projects/projects.action-types';
import { Actions as projectActions } from '@app/store/actions/projects/projects.actions';

export const initialState: DatasetColumnState = {};

export const datasetColumnsReducer = (
	state = initialState,
	action: projectActions
) => {
	switch (action.type) {
		case ProjectsActionConstants.LOAD_ONE_PROJECT__COMPLETE:
			return action.payload.entities.datasetColumn;
		default:
			return state;
	}
};
