import * as UserActions from '@app/store/actions/user/user.action-types';
import * as ProjectActions from '@app/store/actions/projects/projects.action-types';
import * as ChartActions from '@app/store/actions/charts/charts.action-types';
import * as ExportActions from '@app/store/actions/export/export.action-types';
import * as DatasetActions from '@app/store/actions/datasets/datasets.action-types';

const NotificationDict = new Map([
	[
		UserActions.UserActionConstants.VERIFY_USER_TOKEN__COMPLETE.toString(),
		'Token Verified'
	], // User Complete
	[
		UserActions.UserActionConstants.LOGIN__COMPLETE.toString(),
		'Login completed'
	],
	[UserActions.UserActionConstants.LOGIN__FAILED.toString(), 'Login failed'],
	[
		UserActions.UserActionConstants.REGISTER__COMPLETE.toString(),
		'Register completed'
	],
	[
		UserActions.UserActionConstants.LOGOUT__COMPLETE.toString(),
		'Logout completed'
	],
	[
		UserActions.UserActionConstants.VERIFY_USER_TOKEN__FAILED.toString(),
		'Token Not Verified'
	],
	[UserActions.UserActionConstants.LOGOUT__FAILED.toString(), 'Login failed'],
	[
		UserActions.UserActionConstants.REGISTER__FAILED.toString(),
		'Register failed'
	],
	[
		UserActions.UserActionConstants.LOGOUT__FAILED.toString(),
		'Logout failed'
	],
	[
		ProjectActions.ProjectsActionConstants.LOAD_ONE_PROJECT__COMPLETE.toString(),
		'One project loaded'
	],
	[
		ProjectActions.ProjectsActionConstants.LOAD_ONE_PROJECT__FAILED.toString(),
		'Not loaded project'
	],
	[
		ProjectActions.ProjectsActionConstants.CREATE_DRAFT_PROJECT__COMPLETE.toString(),
		'Draft creating completed'
	],
	[
		ProjectActions.ProjectsActionConstants.CREATE_DRAFT_PROJECT__FAILED.toString(),
		'Draft creating failed'
	],
	[
		ProjectActions.ProjectsActionConstants.REMOVE_CHART_PROJECT__COMPLETE.toString(),
		'Remove chart project completed'
	],
	[
		ProjectActions.ProjectsActionConstants.REMOVE_CHART_PROJECT__FAILED.toString(),
		'Remove chart project failed'
	],
	[
		ProjectActions.ProjectsActionConstants.SAVE_PROJECT__COMPLETE.toString(),
		'Save project completed'
	],
	[
		ProjectActions.ProjectsActionConstants.UPDATE_PROJECT__COMPLETE.toString(),
		'Update project completed'
	],
	[
		ProjectActions.ProjectsActionConstants.SAVE_PROJECT__FAILED.toString(),
		'Save project failed'
	],
	[
		ProjectActions.ProjectsActionConstants.LOAD_PROJECTS_INFO__COMPLETE.toString(),
		'Load projects info completed'
	],
	[
		ProjectActions.ProjectsActionConstants.LOAD_PROJECTS_INFO__FAILED.toString(),
		'Load projects info failed'
	],
	[
		ProjectActions.ProjectsActionConstants.SHARE_PROJECTS__COMPLETE.toString(),
		'Share projects completed'
	],
	[
		ProjectActions.ProjectsActionConstants.SHARE_PROJECTS__FAILED.toString(),
		'Share projects failed'
	],
	[
		ProjectActions.ProjectsActionConstants.DELETE_ONE_PROJECT__COMPLETE.toString(),
		'Delete project completed'
	],
	[
		ProjectActions.ProjectsActionConstants.DELETE_ONE_PROJECT__FAILED.toString(),
		'Delete project failed'
	],
	[
		ProjectActions.ProjectsActionConstants.UPDATE_PROJECT_NAME__COMPLETE.toString(),
		'Update project name completed'
	],
	[
		ProjectActions.ProjectsActionConstants.UPDATE_PROJECT_NAME__FAILED.toString(),
		'Update project name failed'
	],
	[
		ExportActions.ExportActionConstants.EXPORT__COMPLETE.toString(),
		'Export completed'
	],
	[
		ExportActions.ExportActionConstants.EXPORT__FAILED.toString(),
		'Export failed'
	],
	[
		DatasetActions.DatasetActionConstants.PARSE_DATA__COMPLETE.toString(),
		'Parse data completed'
	],
	[
		DatasetActions.DatasetActionConstants.PARSE_DATA__FAILED.toString(),
		'Parse data failed'
	],
	[
		DatasetActions.DatasetActionConstants.LOAD_SAMPLE__COMPLETE.toString(),
		'Load sample completed'
	],
	[
		DatasetActions.DatasetActionConstants.LOAD_SAMPLE__FAILED.toString(),
		'Load sample failed'
	],
	[
		ChartActions.ChartsActionConstants.SELECT_CHART__COMPLETE.toString(),
		'Select chart complete'
	],
	[
		ChartActions.ChartsActionConstants.SELECT_CHART__FAILED.toString(),
		'Select chart failed'
	],
	[
		ChartActions.ChartsActionConstants.CREATE_CHART__COMPLETE.toString(),
		'Create chart complete'
	],
	[
		ChartActions.ChartsActionConstants.CREATE_CHART__FAILED.toString(),
		'Create chart failed'
	],
	[
		ChartActions.ChartsActionConstants.REMOVE_CHART__COMPLETE.toString(),
		'Remove chart complete'
	],
	[
		ChartActions.ChartsActionConstants.REMOVE_CHART__FAILED.toString(),
		'Remove chart failed'
	],
	[
		ChartActions.ChartsActionConstants.LOAD_CHARTS__COMPLETE.toString(),
		'Load charts complete'
	],
	[
		ChartActions.ChartsActionConstants.LOAD_CHARTS__FAILED.toString(),
		'Load charts failed'
	]
]);
export default NotificationDict;

export enum NotificationType {
	SUCCESS = 'success',
	ERROR = 'error'
}
