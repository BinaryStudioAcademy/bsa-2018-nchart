import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { denormalize, normalize } from 'normalizr';
import { arrayOfCommonScheme } from '@app/schemes/common.schema';
import { ProjectsActionConstants } from '@app/store/actions/projects/projects.action-types';
import * as projectActions from '@app/store/actions/projects/projects.actions';
import { ProjectDomainService } from '@app/api/domains/project/project-domain.service';
import { ProjectService } from '@app/services/project.service';
import { projectScheme } from '@app/schemes/project.scheme';
import { DatasetService } from '@app/services/dataset.service';
import { StoreService } from '@app/services/store.service';
import { getFullProject } from '@app/store/selectors/userCharts';
import {
	SaveProjectComplete,
	UpdateProjectComplete
} from '@app/store/actions/projects/projects.actions';
import { concat, throwError } from 'rxjs';
import { SaveProjectFailed } from '@app/store/actions/projects/projects.actions';
import { withLatestFrom } from 'rxjs/internal/operators';
import { Go } from '@app/store/actions/router/router.actions';
import { AppState } from '@app/models/store.model';

@Injectable()
export class ProjectsEffects {
	constructor(
		private storeService: StoreService,
		private action$: Actions,
		private projectDomainService: ProjectDomainService,
		private projectService: ProjectService,
		private datasetService: DatasetService
	) {}

	@Effect()
	loadData$ = this.action$.pipe(
		ofType(ProjectsActionConstants.LOAD_PROJECTS),
		switchMap((action: projectActions.LoadProjetcs) =>
			this.projectDomainService.getByGroupId(action.payload).pipe(
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
					return throwError(new Error('Cant getByGroupId'));
				}),
				catchError(error => {
					return of(
						new projectActions.LoadProjectsFailed({
							action: action,
							msg: 'test',
							error: error
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
			this.projectDomainService.getByProjectId(action.payload).pipe(
				map(value => {
					if (value.isSuccess) {
						const { result: projectId, entities } = normalize(
							{
								...value.payload,
								datasets: this.datasetService.transformDatasets(
									value.payload.datasets
								)
							},
							projectScheme
						);

						entities.project[projectId].isDraft = false;
						return new projectActions.LoadOneProjectComplete({
							entities,
							projectId
						});
					}
					return throwError(new Error(`Can't get one project`));
				}),
				catchError(
					error =>
						concat([
							new projectActions.LoadOneProjectFailed({
								msg: `can't get project`,
								error,
								action
							}),
							new Go({ path: ['/app/project/draft'] })
						]) as any
				)
			)
		)
	);

	@Effect()
	saveProject = this.action$.pipe(
		ofType(ProjectsActionConstants.SAVE_PROJECT),
		withLatestFrom(this.storeService.createSubscription()),
		switchMap(([action, state]: [projectActions.SaveProject, AppState]) => {
			const entities = getFullProject(action.payload.id)(state);
			const denProj = denormalize(
				action.payload.id,
				projectScheme,
				entities
			);

			const datasets = denProj.datasets.map(dataset => {
				return {
					id: dataset.id,
					columns: dataset.modified.columns,
					data: dataset.modified.data.map(arrData => {
						return arrData.map(el => el.value);
					})
				};
			});

			const project = {
				id: denProj.isDraft ? null : action.payload.id,
				name: denProj.name,
				charts: denProj.charts,
				datasets
			};

			return this.projectDomainService.save({ project }).pipe(
				mergeMap(response => {
					if (project.id) {
						return [new UpdateProjectComplete()] as any;
					} else {
						return [
							new SaveProjectComplete({
								projectId: response.payload.id,
								oldProjectId: action.payload.id
							}),
							new Go({
								path: [`/app/project/${response.payload.id}`]
							})
						] as any;
					}
				}),
				catchError(error => {
					return of(
						new SaveProjectFailed({
							action: action,
							msg: 'test',
							error
						})
					);
				})
			);
		})
	);
}
