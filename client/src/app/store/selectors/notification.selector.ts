import { AppState } from '@app/models';

export const notificationSelector = () => (state: AppState) =>
	state.notification;

export const serverFailedMsg = () => (state: AppState) =>
	state.errorHandler.error;
