import { Actions as NotificationActions } from '@app/store/actions/notification/notification.actions';
import { NotificationActionConstants } from '@app/store/actions/notification/notification.action-types';
import { NotificationState } from '@app/models';

export const initialState = {
	isOpen: false,
	type: '',
	msg: ''
};

export const notificationReducer = (
	state = initialState,
	action: NotificationActions
): NotificationState => {
	switch (action.type) {
		case NotificationActionConstants.NOTIFICATION_GENERATE:
			return {
				isOpen: true,
				type: action.payload.type,
				msg: action.payload.msg
			};
		case NotificationActionConstants.NOTIFICATION_DESTROY:
			return initialState;
		default:
			return state;
	}
};
