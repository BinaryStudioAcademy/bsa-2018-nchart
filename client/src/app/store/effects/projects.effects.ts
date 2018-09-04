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
import {
	getFullProject,
	isRepeatDataset,
	userChart
} from '@app/store/selectors/userCharts';
import {
	RemoveChartProject, RemoveChartProjectComplete,
	RemoveDatasetProject,
	SaveProjectComplete,
	UpdateProjectComplete
} from '@app/store/actions/projects/projects.actions';
import { concat, throwError } from 'rxjs';
import { SaveProjectFailed } from '@app/store/actions/projects/projects.actions';
import {concatMap, filter, withLatestFrom} from 'rxjs/internal/operators';
import { Go } from '@app/store/actions/router/router.actions';
import { AppState } from '@app/models/store.model';
import {activeProjectId, getAmountUserCharts} from '@app/store/selectors/projects.selectors';
import {CreateChart} from '@app/store/actions/charts/charts.actions';

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
				concatMap(
					project => {
					return	[
							new projectActions.CreateDraftProjectComplete({project}),
							new CreateChart({ datatsetId: null })
						];
					}
				),
				catchError(error =>
					of(new projectActions.CreateDraftProjectFailed())
				)
			)
		)
	);

	@Effect()
	removePage$ = this.action$.pipe(
		ofType(ProjectsActionConstants.REMOVE_PAGE_PROJECT),
		withLatestFrom(this.storeService.createSubscription()),
		switchMap(([action, state]) => {
			const chartId = (action as RemoveChartProject).payload.chartId;
			const isUseDataset = isRepeatDataset(chartId)(state);
			const projectId = activeProjectId()(state);

			if (isUseDataset) {
				return [new RemoveChartProject({ chartId, projectId })] as any;
			} else {
				const { datasetId } = userChart(chartId)(state);
				return [
					new RemoveChartProject({ chartId, projectId }),
					new RemoveDatasetProject({ datasetId, projectId, chartId })
				] as any;
			}
		})
	);

	@Effect()
	removeChart$ = this.action$.pipe(
		ofType(ProjectsActionConstants.REMOVE_CHART_PROJECT),
		withLatestFrom(this.storeService.createSubscription(getAmountUserCharts())),
		filter(([action, counts]) => counts > 1),
		withLatestFrom(this.storeService.createSubscription()),
		map(([[action], state]) => {
			const chartId = (action as RemoveChartProject).payload.chartId;
			const projectId = activeProjectId()(state);
			return new RemoveChartProjectComplete({chartId, projectId});
		})
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

	@Effect()
	loadInfo = this.action$.pipe(
		ofType(ProjectsActionConstants.LOAD_PROJECTS_INFO),
		switchMap((action: projectActions.LoadProjetcsInfo) =>
			this.projectDomainService.getPartByUserId().pipe(
				map(value => {
					if (value.isSuccess) {
						const {
							result: all,
							entities: { project: byId }
						} = normalize(value.payload, [projectScheme]);
						return new projectActions.LoadProjectsInfoComplete({
							all,
							byId
						});
					}
					return throwError(new Error('Cant getPartByUserId'));
				}),
				catchError(error => {
					return of(
						new projectActions.LoadProjectsInfoFailed({
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
	shareProject = this.action$.pipe(
		ofType(ProjectsActionConstants.SHARE_PROJECT),
		switchMap((action: projectActions.ShareProject) =>
			this.projectDomainService.share(action.payload).pipe(
				map(value => {
					if (value.isSuccess) {
						return new projectActions.ShareProjectComplete(
							value.payload
						);
					}
					return throwError(new Error('Cant share project'));
				}),
				catchError(error => {
					return of(
						new projectActions.ShareProjectFailed({
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
	deleteProject = this.action$.pipe(
		ofType(ProjectsActionConstants.DELETE_ONE_PROJECT),
		switchMap((action: projectActions.DeleteOneProject) =>
			this.projectDomainService.delete(action.payload).pipe(
				map(value => {
					if (value.isSuccess) {
						return new projectActions.DeleteOneProjectComplete({
							id: action.payload.projectId
						});
					}
					return throwError(new Error('Cant delete project'));
				}),
				catchError(error => {
					return of(
						new projectActions.DeleteOneProjectFailed({
							action: action,
							msg: 'test',
							error: error
						})
					);
				})
			)
		)
	);
}
