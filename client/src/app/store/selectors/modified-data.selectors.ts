import { AppState } from '@app/models';

export const getModifiedData = (state: AppState) => {
	return state.modifiedData.data;
};
