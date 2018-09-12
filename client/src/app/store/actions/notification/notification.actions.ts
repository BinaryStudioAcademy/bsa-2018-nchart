import { NotificationActionConstants } from '@app/store/actions/notification/notification.action-types';
import { AppAction } from '@app/models/store.model';

export class NotificationGenerate extends AppAction<any> {
	readonly type = NotificationActionConstants.NOTIFICATION_GENERATE;
}

export class NotificationDestroy extends AppAction {
	readonly type = NotificationActionConstants.NOTIFICATION_DESTROY;
}

export class NotificationSvgClipboard extends AppAction {
	readonly type =
		NotificationActionConstants.NOTIFICATION_SVG_CLIPBOARD__COMPLETE;
}

export type Actions =
	| NotificationGenerate
	| NotificationDestroy
	| NotificationSvgClipboard;
