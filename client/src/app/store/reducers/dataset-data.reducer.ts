import { DatasetDataState } from '@app/models/dataset.model';
import { ProjectsActionConstants } from '@app/store/actions/projects/projects.action-types';
import { Actions as projectActions } from '@app/store/actions/projects/projects.actions';
import { DatasetActionConstants as constants } from '@app/store/actions/datasets/datasets.action-types';
import { Actions as datasetsActions } from '@app/store/actions/datasets/datasets.actions';
import { omitBy, zipObject, range } from 'lodash';

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
		case constants.DELETE_COLUMN:
			return {
				...omitBy(state, (val, key) =>
					key.endsWith(
						`-${action.payload.columnId}-${
							action.payload.datasetId
						}`
					)
				)
			};
		case constants.DELETE_ROW:
			// const id = action.payload.rowId as string;
			return {
				...omitBy(state, (val, key) =>
					key.startsWith(`${action.payload.rowId}-`)
				)
			};
		case constants.ADD_NEW_COLUMN:
			const colKeys = action.payload.rowIds.map(
				i => `${i}-${action.payload.columnId}-${
						action.payload.datasetId
					}`
			);
			return {
				...state,
				...zipObject(
					colKeys,
					colKeys.map(key => ({
						id: key,
						value: ''
					}))
				)
			};
		case constants.ADD_NEW_ROW:
			const rowKeys = action.payload.columnIds.map(
				colId =>
					`${action.payload.dataLength}-${colId}-${
						action.payload.datasetId
					}`
			);
			return {
				...state,
				...zipObject(
					rowKeys,
					rowKeys.map(key => ({
						id: key,
						value: ''
					}))
				)
			};
		default:
			return state;
	}
};
