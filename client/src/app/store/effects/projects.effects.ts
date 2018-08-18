import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Project } from '@app/models';
import { normalize } from 'normalizr';
import { arrayOfCustomData } from '@app/schemes/custom.schema';
import { ProjectsActionConstants } from '@app/store/actions/projects/projects.action-types';
import * as projectActions from '@app/store/actions/projects/projects.actions';
import { Observable } from 'rxjs/index';
import { ProjectService } from '../../services/project.service';

@Injectable()
export class ProjectsEffects {
	api = {
		loadProjects: (): Observable<Project[]> => {
			return of([]);
		},
		createDraftProject: (): Observable<Project> => {
			return of(null);
		}
	};

	constructor(
		private action$: Actions,
		private projectService: ProjectService
	) {}

	@Effect()
	loadData$ = this.action$.pipe(
		ofType(ProjectsActionConstants.LOAD_PROJECTS),
		switchMap((action: any) =>
			this.api.loadProjects().pipe(
				map((value: Project[]) => {
					const {
						result: all,
						entities: { byId }
					} = normalize(value, arrayOfCustomData);
					return new projectActions.LoadProjectsComplete({
						projects: {
							all,
							byId
						}
					});
				}),
				catchError(error => {
					return of(
						new projectActions.LoadProjectsFailed({
							action: action,
							msg: 'test',
							error: null
						})
					);
				})
			)
		)
	);

	@Effect()
	createDraftProject$ = this.action$.pipe(
		ofType(ProjectsActionConstants.CREATE_DRAFT_PROJECT),
		switchMap((action: projectActions.CreateDraftProject) =>
			this.projectService.createDraftProject().pipe(
				map(
					project =>
						new projectActions.CreateDraftProjectComplete({
							project
						})
				),
				catchError(error =>
					of(new projectActions.CreateDraftProjectFailed())
				)
			)
		)
	);

	// @Effect()
	// changeProjectName$ = this.action$.pipe(
	// 	ofType(ProjectsActionConstants.CHANGE_PROJECT_NAME),
	// 	switchMap((action: projectActions.ChangeProjectName) =>
	// 		this.projectService.changeProjectName().pipe(
	// 			map(
	// 				project =>
	// 					new projectActions.ChangeProjectName({
	// 						project
	// 					})
	// 			))
	// ));
}
