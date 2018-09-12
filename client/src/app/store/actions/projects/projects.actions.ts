import { ProjectsActionConstants } from '@app/store/actions/projects/projects.action-types';
import {
	Project,
	ProjectEntities,
	ProjectsFilter
} from '@app/models/project.model';
import { SchemeID } from '@app/models/normalizr.model';
import { AppAction, FailedAction } from '@app/models/store.model';

export class LoadProjetcs extends AppAction<{ groupId: string }> {
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

export class CreateDraftProjectComplete extends AppAction<{
	project: Project;
}> {
	readonly type = ProjectsActionConstants.CREATE_DRAFT_PROJECT__COMPLETE;
}

export class CreateDraftProjectFailed extends FailedAction {
	readonly type = ProjectsActionConstants.CREATE_DRAFT_PROJECT__FAILED;
}

export class LoadOneProject extends AppAction<{ projectId: string }> {
	readonly type = ProjectsActionConstants.LOAD_ONE_PROJECT;
}

export class LoadOneProjectComplete extends AppAction<{
	projectId: SchemeID;
	entities: ProjectEntities;
}> {
	readonly type = ProjectsActionConstants.LOAD_ONE_PROJECT__COMPLETE;
}

export class LoadOneProjectFailed extends FailedAction {
	readonly type = ProjectsActionConstants.LOAD_ONE_PROJECT__FAILED;
}

export class ChangeProjectName extends AppAction<{
	id: SchemeID;
	name: string;
}> {
	readonly type = ProjectsActionConstants.CHANGE_PROJECT_NAME;
}

export class RemovePageProject extends AppAction<{
	chartId: SchemeID;
}> {
	readonly type = ProjectsActionConstants.REMOVE_PAGE_PROJECT;
}

export class RemoveChartProject extends AppAction<{
	chartId: SchemeID;
	projectId: SchemeID;
}> {
	readonly type = ProjectsActionConstants.REMOVE_CHART_PROJECT;
}

export class RemoveChartProjectComplete extends AppAction<{
	chartId: SchemeID;
	projectId: SchemeID;
}> {
	readonly type = ProjectsActionConstants.REMOVE_CHART_PROJECT__COMPLETE;
}

export class RemoveDatasetProject extends AppAction<{
	datasetId: SchemeID;
	chartId: SchemeID;
	projectId: SchemeID;
}> {
	readonly type = ProjectsActionConstants.REMOVE_DATASET_PROJECT;
}

export class SaveProject extends AppAction<{ id: SchemeID }> {
	readonly type = ProjectsActionConstants.SAVE_PROJECT;
}

export class SaveProjectComplete extends AppAction<{
	projectId: SchemeID;
	oldProjectId: SchemeID;
}> {
	readonly type = ProjectsActionConstants.SAVE_PROJECT__COMPLETE;
}

export class UpdateProjectComplete extends AppAction<{}> {
	readonly type = ProjectsActionConstants.UPDATE_PROJECT__COMPLETE;
}

export class SaveProjectFailed extends FailedAction {
	readonly type = ProjectsActionConstants.SAVE_PROJECT__FAILED;
}

export class LoadProjetcsInfo extends AppAction<ProjectsFilter> {
	readonly type = ProjectsActionConstants.LOAD_PROJECTS_INFO;
}

export class LoadProjectsInfoComplete extends AppAction<{
	all: SchemeID[];
	byId: any;
	pagination: any;
}> {
	readonly type = ProjectsActionConstants.LOAD_PROJECTS_INFO__COMPLETE;
}

export class LoadProjectsInfoFailed extends FailedAction {
	readonly type = ProjectsActionConstants.LOAD_PROJECTS_INFO__FAILED;
}

export class ShareProject extends AppAction<{
	projectId: SchemeID;
	email: string;
	accessLevelId: number;
}> {
	readonly type = ProjectsActionConstants.SHARE_PROJECT;
}

export class ShareProjectComplete extends AppAction<any> {
	readonly type = ProjectsActionConstants.SHARE_PROJECTS__COMPLETE;
}

export class ShareProjectFailed extends FailedAction {
	readonly type = ProjectsActionConstants.SHARE_PROJECTS__FAILED;
}

export class DeleteOneProject extends AppAction<{
	projectId: SchemeID;
	accessLevelId: number;
}> {
	readonly type = ProjectsActionConstants.DELETE_ONE_PROJECT;
}

export class DeleteOneProjectComplete extends AppAction<{
	id: SchemeID;
}> {
	readonly type = ProjectsActionConstants.DELETE_ONE_PROJECT__COMPLETE;
}

export class DeleteOneProjectFailed extends FailedAction {
	readonly type = ProjectsActionConstants.DELETE_ONE_PROJECT__FAILED;
}

export class UpdateProjectName extends AppAction<{
	id: SchemeID;
	name: string;
}> {
	readonly type = ProjectsActionConstants.UPDATE_PROJECT_NAME;
}

export class UpdateProjectNameComplete extends AppAction<{
	id: SchemeID;
	name: string;
}> {
	readonly type = ProjectsActionConstants.UPDATE_PROJECT_NAME__COMPLETE;
}

export class UpdateProjectNameFailed extends FailedAction {
	readonly type = ProjectsActionConstants.UPDATE_PROJECT_NAME__FAILED;
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
	| LoadOneProjectFailed
	| ChangeProjectName
	| RemovePageProject
	| RemoveChartProject
	| RemoveChartProjectComplete
	| RemoveDatasetProject
	| SaveProject
	| SaveProjectComplete
	| UpdateProjectComplete
	| SaveProjectFailed
	| LoadProjetcsInfo
	| LoadProjectsInfoComplete
	| LoadProjectsInfoFailed
	| ShareProject
	| ShareProjectComplete
	| ShareProjectFailed
	| DeleteOneProject
	| DeleteOneProjectComplete
	| DeleteOneProjectFailed
	| UpdateProjectName
	| UpdateProjectNameComplete
	| UpdateProjectNameFailed;
