import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs/operators';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {denormalize, normalize} from 'normalizr';
import {arrayOfCommonScheme} from '@app/schemes/common.schema';
import {ProjectsActionConstants} from '@app/store/actions/projects/projects.action-types';
import * as projectActions from '@app/store/actions/projects/projects.actions';
import {throwError} from 'rxjs/index';
import {ProjectDomainService} from '@app/api/domains/project/project-domain.service';
import {ProjectService} from '@app/services/project.service';
import {projectScheme} from '@app/schemes/project.scheme';
import {DatasetService} from '@app/services/dataset.service';
import {StoreService} from '@app/services/store.service';
import {getFullProject} from '@app/store/selectors/userCharts';
import {LoadCharts} from '@app/store/actions/charts/charts.actions';
import {LoadOneProject} from '@app/store/actions/projects/projects.actions';
import {ActivatedRoute} from '@angular/router';
import {Go} from '@app/store/actions/router/router.actions';

@Injectable()
export class ProjectsEffects {
	constructor(private activeRouter: ActivatedRoute,
				private storeService: StoreService,
				private action$: Actions,
				private projectDomainService: ProjectDomainService,
				private projectService: ProjectService,
				private datasetService: DatasetService) {
	}

	@Effect()
	loadData$ = this.action$.pipe(
		ofType(ProjectsActionConstants.LOAD_PROJECTS),
		switchMap((action: projectActions.LoadProjetcs) =>
			this.projectDomainService.getByGroupId(action.payload).pipe(
				map(value => {
					if (value.isSuccess) {
						const {
							result: all,
							entities: {byId}
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
						const {result: projectId, entities} = normalize(
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
				catchError(error =>
					of(new projectActions.LoadOneProjectFailed())
				)
			)
		)
	);

	@Effect()
	saveProject = this.action$.pipe(
		ofType(ProjectsActionConstants.SAVE_PROJECT),
		switchMap((action: projectActions.SaveProject) => {
				return this.storeService.createSubscription(getFullProject(action.payload.id)).pipe(
					map(entities => {

						const denProj = denormalize(action.payload.id, projectScheme, entities);

						const datasets = denProj.datasets.map(dataset => {
							return {
								id: dataset.id,
								columns: dataset.modified.columns,
								data: dataset.modified.data.map(arrData => {
									return arrData.map(el => el.value);
								})
							};
						});

						return {
							id: (denProj.isDraft) ? null : action.payload.id,
							name: denProj.name,
							charts: denProj.charts,
							datasets
						};
					}),
					switchMap(project => {
						return this.projectDomainService.save({project});
					}),
					map(({payload}) => {
						this.activeRouter.params.subscribe(
							(params: { id?: number }) => {
								const {id} = params;

								if (id) {
									this.storeService.dispatch(new LoadCharts());
									this.storeService.dispatch(
										new LoadOneProject({projectId: id + ''})
									);
								} else {
									return new Go({path: ['/app/project/11']});
								}
							}
						);
					}),
					catchError(error => {
						return of(error);
					})
				);
			}
		)
	);
}
