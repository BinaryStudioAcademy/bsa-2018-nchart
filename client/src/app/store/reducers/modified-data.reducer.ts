import { Actions as ModifiedDataActions } from '../actions/modified-data/modified-data.actions';
import { FileData } from '@app/models';
import { combineReducers } from '@ngrx/store';
import { DataState } from '@app/models/file-data.store';
import { ModifiedDataActionConstants } from '@app/store/actions/modified-data/modified-data.action-types';

export const initialState: DataState = {
	data: {
		columns: null,
		data: null
	},
	isLoading: null
};

export const data = (
	state = initialState.data,
	action: ModifiedDataActions
): FileData => {
	switch (action.type) {
		case ModifiedDataActionConstants.MODIFIEDDATA_LOAD_DATA: {
			return {
				columns: null,
				data: null
			};
		}
		case ModifiedDataActionConstants.MODIFIEDDATA_LOAD_DATA__COMPLETE: {
			return {
				...action.payload
			};
		}
		case ModifiedDataActionConstants.MODIFIEDDATA_CHANGE_CONTENT: {
			state.data[action.payload.indexRow][action.payload.indexCol] =
				action.payload.content;
			return state;
		}
		case ModifiedDataActionConstants.MODIFIEDDATA_CHANGE_HEADER_TITLE: {
			state.columns[action.payload.indexCol].title =
				action.payload.newTitle;
			return state;
		}
		case ModifiedDataActionConstants.MODIFIEDDATA_DELETE_COLUMN: {
			const indexDeleted = action.payload.index;
			state.columns.splice(indexDeleted, 1);
			for (const row of state.data) {
				row.splice(indexDeleted, 1);
			}
			return state;
		}
		case ModifiedDataActionConstants.MODIFIEDDATA_DELETE_ROW: {
			state.data.splice(action.payload.index, 1);
			return state;
		}
		default:
			return state;
	}
};

export const isLoading = (
	state = initialState.isLoading,
	action: ModifiedDataActions
): boolean => {
	switch (action.type) {
		case ModifiedDataActionConstants.MODIFIEDDATA_LOAD_DATA: {
			return true;
		}
		case ModifiedDataActionConstants.MODIFIEDDATA_LOAD_DATA__COMPLETE:
		case ModifiedDataActionConstants.MODIFIEDDATA_LOAD_DATA__FAILED: {
			return false;
		}
		default:
			return state;
	}
};

export const modifiedDataReducer = combineReducers({ data, isLoading });
