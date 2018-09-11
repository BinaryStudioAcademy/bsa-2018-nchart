import { UserActionConstants } from '@app/store/actions/user/user.action-types';
import { ProjectsActionConstants } from '@app/store/actions/projects/projects.action-types';
import { NotificationActionConstants } from '@app/store/actions/notification/notification.action-types';
import { ExportActionConstants } from '@app/store/actions/export/export.action-types';
import { DatasetActionConstants } from '@app/store/actions/datasets/datasets.action-types';

const NotificationDict = new Map<string, string>([
	[UserActionConstants.LOGIN__FAILED, 'Please, try again'],
	[UserActionConstants.REGISTER__FAILED, 'Please, try again'],
	[
		ProjectsActionConstants.LOAD_ONE_PROJECT__FAILED,
		'\u2014 Oops! We cant load project for now'
	],
	[ProjectsActionConstants.SAVE_PROJECT__COMPLETE, 'Project has been saved'],
	[
		ProjectsActionConstants.UPDATE_PROJECT__COMPLETE,
		'Project has been updated'
	],
	[
		ProjectsActionConstants.SAVE_PROJECT__FAILED,
		'\u2014 Oops! We cant save project for now'
	],
	[
		NotificationActionConstants.NOTIFICATION_SVG_CLIPBOARD__COMPLETE,
		'SVG code copied to clipboard'
	],
	[
		ExportActionConstants.EXPORT__FAILED,
		'\u2014 Oops! We cant export project for now'
	],
	[DatasetActionConstants.PARSE_DATA__COMPLETE, 'Dataset is ready for use'],
	[
		DatasetActionConstants.PARSE_DATA__FAILED,
		'\u2014 Oops! We cant parse data for now'
	]
]);
export default NotificationDict;

export enum NotificationType {
	SUCCESS = 'success',
	ERROR = 'error'
}
