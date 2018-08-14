import { AppAction, FailedAction } from '@app/models';
import { ProjectsActionConstants } from './projects.action-types';
import { Project } from '@app/models/project.model';

export class LoadData extends AppAction<any> {
	readonly type = ProjectsActionConstants.PROJECTS_LOAD_DATA;
}

export class LoadDataComplete extends AppAction<{
	projects: {
		all: Array<string>;
		byId: { [id: string]: Project };
	};
}> {
	readonly type = ProjectsActionConstants.PROJECTS_LOAD_DATA__COMPLETE;
}

export class LoadDataFailed extends FailedAction {
	readonly type = ProjectsActionConstants.PROJECTS_LOAD_DATA__FAILED;
}

export type Actions = LoadData | LoadDataComplete | LoadDataFailed;
