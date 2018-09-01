import { DatasetDataState } from '@app/models/dataset.model';
import { ProjectsActionConstants } from '@app/store/actions/projects/projects.action-types';
import { Actions as projectActions } from '@app/store/actions/projects/projects.actions';
import { DatasetActionConstants as constants } from '@app/store/actions/datasets/datasets.action-types';
import { Actions as datasetsActions } from '@app/store/actions/datasets/datasets.actions';
import { mapKeys, zipObject } from 'lodash';

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
		// case constants.ADD_NEW_ROW:
		// case constants.ADD_NEW_COLUMN:
		// case constants.DELETE_ROW:
		case constants.DELETE_COLUMN:
			const colKeys = [].concat(
				...action.payload.keys
					.map((d, i) => d.filter((v, j) => j !== action.payload.id))
					.map((r, rI) =>
						r.map((c, cI) => ({
							id: `${rI}-${cI}-${action.payload.datasetId}`,
							value: c.value
						}))
					)
			);
			return {
				...zipObject(
					colKeys.map(el => el.id),
					colKeys.map(key => ({
						id: key.id,
						value: key.value
					}))
				)
			};

		case constants.DELETE_ROW:
			const rowKeys = [].concat(
				...action.payload.keys
					.filter((d, i) => !action.payload.id.includes(i))
					.map((r, rI) =>
						r.map((c, cI) => ({
							id: `${rI}-${cI}-${action.payload.datasetId}`,
							value: c.value
						}))
					)
			);
			return {
				...zipObject(
					rowKeys.map(el => el.id),
					rowKeys.map(key => ({
						id: key.id,
						value: key.value
					}))
				)
			};

		case constants.ADD_NEW_ROW:
			const newData = [].concat(
				...action.payload.data.modified.data.filter(
					(key, i) =>
						i === action.payload.data.modified.data.length - 1
				)
			);
			return {
				...state,
				...zipObject(
					newData.map(el => el.id),
					newData.map(key => ({
						id: key.id,
						value: key.value
					}))
				)
			};
		case constants.CHANGE_COLUMN_TYPE: {
			return {
				...state,
				...mapKeys(state, (value, key) => {
					if (key.includes(`-${action.payload.index}-`)) {
						state[key].value = action.payload.data.find(
							el => el.id === key
						).value;
					}
				})
			};
		}
		default:
			return state;
	}
};
