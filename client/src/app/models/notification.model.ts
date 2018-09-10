import * as UserActions from '@app/store/actions/user/user.action-types';
import * as ProjectActions from '@app/store/actions/projects/projects.action-types';
import * as ExportActions from '@app/store/actions/export/export.action-types';
import * as DatasetActions from '@app/store/actions/datasets/datasets.action-types';
import * as NotificationActions from '@app/store/actions/notification/notification.action-types';

const NotificationDict = new Map([
	[UserActions.UserActionConstants.LOGIN__FAILED.toString(), 'Login failed'],
	[
		UserActions.UserActionConstants.REGISTER__FAILED.toString(),
		'Register failed'
	],
	[
		ProjectActions.ProjectsActionConstants.LOAD_ONE_PROJECT__FAILED.toString(),
		'\u2014 Oops! We cant load project for now!'
	],
	[
		ProjectActions.ProjectsActionConstants.SAVE_PROJECT__COMPLETE.toString(),
		'Project has been saved'
	],
	[
		ProjectActions.ProjectsActionConstants.UPDATE_PROJECT__COMPLETE.toString(),
		'Project has been updated'
	],
	[
		ProjectActions.ProjectsActionConstants.SAVE_PROJECT__FAILED.toString(),
		'\u2014 Oops! We cant save project for now!'
	],
	[
		NotificationActions.NotificationActionConstants.NOTIFICATION_SVG_CLIPBOARD__COMPLETE.toString(),
		'Svg code copied to clipboard'
	],
	[
		ExportActions.ExportActionConstants.EXPORT__FAILED.toString(),
		'\u2014 Oops! We cant export project for now!'
	],
	[
		DatasetActions.DatasetActionConstants.PARSE_DATA__COMPLETE.toString(),
		'Dataset is ready for use'
	],
	[
		DatasetActions.DatasetActionConstants.PARSE_DATA__FAILED.toString(),
		'\u2014 Oops! We cant parse data for now!'
	]
]);
export default NotificationDict;

export enum NotificationType {
	SUCCESS = 'success',
	ERROR = 'error'
}
