import { AppState } from '@app/models';

export const user = (state: AppState) => {
	return state.user.info;
};
