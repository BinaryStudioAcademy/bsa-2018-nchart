import { AppState } from '@app/models';

export const getLoadedData = (state: AppState) => {
	return state.loadedData.data;
};
