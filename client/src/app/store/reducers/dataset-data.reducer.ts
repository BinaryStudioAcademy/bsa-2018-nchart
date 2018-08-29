import { DatasetDataState } from '@app/models/dataset.model';
import { ProjectsActionConstants } from '@app/store/actions/projects/projects.action-types';
import { Actions as projectActions } from '@app/store/actions/projects/projects.actions';
import { DatasetActionConstants as constants } from '@app/store/actions/datasets/datasets.action-types';
import { Actions as datasetsActions } from '@app/store/actions/datasets/datasets.actions';
import { omit, omitBy } from 'lodash';

export const initialState: DatasetDataState = {};

export const datasetDataReducer = (
	state = initialState,
	action: projectActions | datasetsActions
) => {
	switch (action.type) {
		case ProjectsActionConstants.LOAD_ONE_PROJECT__COMPLETE:
			return action.payload.entities.datasetData;
		case constants.PARSE_DATA__COMPLETE:
			return {
				...state,
				...action.payload.entities.datasetData
			};
		case constants.CHANGE_CONTENT:
			return {
				...state,
				[action.payload.id]: {
					...state[action.payload.id],
					value: action.payload.value
				}
			};
		case constants.DELETE_ROW:
			return {
				...omit(state, action.payload.id)
			};
		case constants.DELETE_COLUMN:
			return {
				...omitBy(state, (value, key: string) => {
					return key.endsWith(
						`-${action.payload.index}-${action.payload.datasetId}`
					);
				})
			};
		default:
			return state;
	}
};
