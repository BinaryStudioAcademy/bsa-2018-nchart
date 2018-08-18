import { AppAction, FailedAction } from '@app/models';
import { ProjectsActionConstants } from './projects.action-types';
import { Project } from '@app/models/project.model';

export class LoadProjetcs extends AppAction<any> {
	readonly type = ProjectsActionConstants.LOAD_PROJECTS;
}

export class LoadProjectsComplete extends AppAction<{
	projects: {
		all: Array<string>;
		byId: { [id: string]: Project };
	};
}> {
	readonly type = ProjectsActionConstants.LOAD_PROJECTS__COMPLETE;
}

export class LoadProjectsFailed extends FailedAction {
	readonly type = ProjectsActionConstants.LOAD_PROJECTS__FAILED;
}

export class CreateDraftProject extends AppAction<{ projectId: string }> {
	readonly type = ProjectsActionConstants.CREATE_DRAFT_PROJECT;
}

export class CreateDraftProjectComplete extends AppAction<any> {
	readonly type = ProjectsActionConstants.CREATE_DRAFT_PROJECT__COMPLETE;
}

export class CreateDraftProjectFailed extends FailedAction {
	readonly type = ProjectsActionConstants.CREATE_DRAFT_PROJECT__FAILED;
}

export class LoadOneProject extends AppAction<{ projectId: string }> {
	readonly type = ProjectsActionConstants.LOAD_ONE_PROJECT;
}

export class LoadOneProjectComplete extends AppAction<Project> {
	readonly type = ProjectsActionConstants.LOAD_ONE_PROJECT__COMPLETE;
}

export class LoadOneProjectFailed extends FailedAction {
	readonly type = ProjectsActionConstants.LOAD_ONE_PROJECT__FAILED;
}

export type Actions =
	| LoadProjetcs
	| LoadProjectsComplete
	| LoadProjectsFailed
	| CreateDraftProject
	| CreateDraftProjectComplete
	| CreateDraftProjectFailed
	| LoadOneProject
	| LoadOneProjectComplete
	| LoadOneProjectFailed;
