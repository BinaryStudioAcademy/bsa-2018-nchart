import { DatasetState } from '@app/models';
import { ProjectsActionConstants } from '@app/store/actions/projects/projects.action-types';
import { Actions as projectActions } from '@app/store/actions/projects/projects.actions';

export const initialState: DatasetState = {};

export const datasetReducer = (
	state = initialState,
	action: projectActions
) => {
	switch (action.type) {
		case ProjectsActionConstants.LOAD_ONE_PROJECT__COMPLETE:
			return action.payload.entities.dataset;
		default:
			return state;
	}
};
