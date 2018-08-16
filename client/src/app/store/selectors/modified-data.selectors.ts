import { AppState } from '@app/models';

export const getModifiedData = (state: AppState) => {
	return state.modifiedData.data;
};

export const isModifiedDataReady = (state: AppState) => {
	return state.modifiedData.data.columns && state.modifiedData.data.data;
};
