import { AppState } from '@app/models/store.model';

export const user = () => (state: AppState) => state.user.info;

export const isUserLoading = () => (state: AppState) => state.user.isLoading;

export const isVerifiedToken = () => (state: AppState) => {
	return { isVerified: !!state.user.info.id };
};
