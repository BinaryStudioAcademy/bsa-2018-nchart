import { combineReducers } from '@ngrx/store';
import { Actions as ExportActions } from '@app/store/actions/export/export.actions';
import { ExportActionConstants } from '@app/store/actions/export/export.action-types';


export const initialState = {
	isExporting: false
};

export const isExporting = (
	state = initialState.isExporting, 
	action: ExportActions
): boolean => {
	switch (action.type) {
		case ExportActionConstants.EXPORT_PROJECT:
			return true;
		case ExportActionConstants.EXPORT__COMPLETE:
		case ExportActionConstants.EXPORT__FAILED:
			return false;
		default:
			return state;
	}
}

export const exportProjectReducer = combineReducers({ isExporting });