import { AppState } from '@app/models';

export const notificationSelector = () => (state: AppState) =>
	state.notification;
