import { DatasetDataState } from '@app/models/dataset.model';
import { ProjectsActionConstants } from '@app/store/actions/projects/projects.action-types';
import { Actions as projectActions } from '@app/store/actions/projects/projects.actions';
import { DatasetActionConstants as constants } from '@app/store/actions/datasets/datasets.action-types';
import { Actions as datasetsActions } from '@app/store/actions/datasets/datasets.actions';
import { range, mapKeys, omitBy, zipObject } from 'lodash';

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
				...mapKeys(state, (value, key) => {
					const i = +key.split('-')[0], j = +key.split('-')[1];
					if (i >= action.payload.index && i < action.payload.rows) {
						state[key].value = state[key.replace(`${i}-${j}`, `${i + 1}-${j}`)].value;
					}
				}),
				...omitBy(state, (value, key: string) => {
						return key.startsWith(
							`${action.payload.rows}-`
						);
					})
			};
		case constants.DELETE_COLUMN:
			return {
				...omitBy(state, (value, key: string) => {
					return key.endsWith(
						`-${action.payload.index}-${action.payload.datasetId}`
					);
				})
			};
		case constants.ADD_NEW_COLUMN:
			const colKeys = range(0, action.payload.rows).map(i =>
				i + '-' + action.payload.index + '-' + action.payload.datasetId
			);
			return {
				...state,
				...zipObject(colKeys, colKeys.map(key => ({
					id: key,
					value: ''
				}))),
			};
		case constants.ADD_NEW_ROW:
			const rowKeys = range(0, action.payload.index).map(i =>
				action.payload.rows + '-' + i + '-' + action.payload.datasetId
			);
			return {
				...state,
				...zipObject(rowKeys, rowKeys.map(key => ({
					id: key,
					value: ''
				}))),
			};
		case constants.CHANGE_COLUMN_TYPE: {
				return {
					...state,
					...mapKeys(state, (value, key) => {
						if (key.includes(`-${action.payload.index}-`)) {
							state[key].value = action.payload.data.find(el => el.id === key).value;
						}
					})
				};
			}
		default:
			return state;
	}
};
