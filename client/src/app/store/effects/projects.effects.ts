import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { normalize } from 'normalizr';
import { arrayOfCommonScheme } from '@app/schemes/common.schema';
import { ProjectsActionConstants } from '@app/store/actions/projects/projects.action-types';
import * as projectActions from '@app/store/actions/projects/projects.actions';
import { throwError } from 'rxjs/index';
import { ProjectDomainService } from '@app/api/domains/project/project-domain.service';
import { ProjectService } from '@app/services/project.service';
import { projectScheme } from '@app/schemes/project.scheme';
import { DatasetService } from '../../services/dataset.service';

@Injectable()
export class ProjectsEffects {
	constructor(
		private action$: Actions,
		private projectDomainService: ProjectDomainService,
		private projectService: ProjectService,
		private datasetService: DatasetService
	) {}

	@Effect()
	loadData$ = this.action$.pipe(
		ofType(ProjectsActionConstants.LOAD_PROJECTS),
		switchMap((action: projectActions.LoadProjetcs) =>
			this.projectDomainService.getAll().pipe(
				map(value => {
					if (value.isSuccess) {
						const {
							result: all,
							entities: { byId }
						} = normalize(value.payload, arrayOfCommonScheme);
						return new projectActions.LoadProjectsComplete({
							projects: {
								all,
								byId
							}
						});
					}
					return throwError(new Error('Cant get projects'));
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

	@Effect()
	loadOneProject$ = this.action$.pipe(
		ofType(ProjectsActionConstants.LOAD_ONE_PROJECT),
		switchMap((action: projectActions.LoadOneProject) =>
			this.projectDomainService.get(action.payload).pipe(
				map(value => {
					if (value.isSuccess) {
						const { result: projectId, entities } = normalize(
							{
								...value.payload,
								datasets: this.datasetService.normalizeDatasets(
									value.payload.datasets
								)
							},
							projectScheme
						);

						return new projectActions.LoadOneProjectComplete({
							entities,
							projectId
						});
					}
					return throwError(new Error(`Can't get one project`));
				}),
				catchError(error =>
					of(new projectActions.LoadOneProjectFailed())
				)
			)
		)
	);
}
