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
