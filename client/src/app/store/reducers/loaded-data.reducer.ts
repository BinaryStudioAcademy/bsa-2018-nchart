import { Actions as LoadedDataActions } from '../actions/loaded-data/loaded-data.actions';
import { FileData } from '@app/models';
import { combineReducers } from '@ngrx/store';
import { LoadedDataState } from '@app/models/file-data.store';
import { LoadedDataActionConstants } from '@app/store/actions/loaded-data/loaded-data.action-types';

export const initialState: LoadedDataState = {
	data: {
		columns: null,
		data: null
	},
	isLoading: null
};

export const data = (
	state = initialState.data,
	action: LoadedDataActions
): FileData => {
	switch (action.type) {
		case LoadedDataActionConstants.LOADEDDATA_LOAD_DATA: {
			return {
				columns: null,
				data: null
			};
		}
		case LoadedDataActionConstants.LOADEDDATA_LOAD_DATA__COMPLETE: {
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
	action: LoadedDataActions
): boolean => {
	switch (action.type) {
		case LoadedDataActionConstants.LOADEDDATA_LOAD_DATA: {
			return true;
		}
		case LoadedDataActionConstants.LOADEDDATA_LOAD_DATA__COMPLETE:
		case LoadedDataActionConstants.LOADEDDATA_LOAD_DATA__FAILED: {
			return false;
		}
		default:
			return state;
	}
};

export const loadedDataReducer = combineReducers({ data, isLoading });
