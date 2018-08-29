import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { normalize } from 'normalizr';
import { ChartsActionConstants } from '@app/store/actions/charts/charts.action-types';
import * as chartActions from '@app/store/actions/charts/charts.actions';
import { StoreService } from '@app/services/store.service';
import { getChart, getFirstChart } from '@app/store/selectors/charts.selectors';
import { of } from 'rxjs';
import {
	CreateChart,
	CreateChartComplete,
	SelectChart,
	SelectChartComplete
} from '@app/store/actions/charts/charts.actions';
import { chartScheme } from '@app/schemes/chart.schema';
import { ChartService } from '@app/services/chart.service';
import { Chart } from '@app/models/chart.model';
import { getActiveProject } from '@app/store/selectors/projects.selectors';
import { withLatestFrom, filter } from 'rxjs/internal/operators';
import { getActiveChartId } from '@app/store/selectors/userCharts';
import { ChartTypeDomainService } from '@app/api/domains/chart/chart.domain';

@Injectable()
export class ChartsEffects {
	constructor(
		private action$: Actions,
		private storeService: StoreService,
		private chartService: ChartService,
		private api: ChartTypeDomainService
	) {}

	@Effect()
	loadCharts$ = this.action$.pipe(
		ofType(ChartsActionConstants.LOAD_CHARTS),
		switchMap((action: any) =>
			this.api.getAll().pipe(
				map(({ payload }) => {
					const { result: all, entities } = normalize(payload, [
						chartScheme
					]);
					return new chartActions.LoadChartsComplete({
						charts: {
							all,
							entities
						}
					});
				}),
				catchError(error => {
					return of(
						new chartActions.LoadChartsFailed({
							action: action,
							msg: 'test',
							error
						})
					);
				})
			)
		)
	);

	@Effect()
	createChart$ = this.action$.pipe(
		ofType(ChartsActionConstants.CREATE_CHART),
		switchMap((action: CreateChart) => {
			return this.storeService.createSubscription(getFirstChart()).pipe(
				filter(el => !!el),
				switchMap((fchart: Chart) => {
					return this.chartService.createChart({
						chartTypeId: fchart.id,
						datasetId: action.payload.datatsetId,
						customizeSettings: [...fchart.customizeSettings],
						dimensionSettings: this.chartService.transformDimensions(
							fchart.dimensionSettings
						)
					});
				}),
				withLatestFrom(
					this.storeService.createSubscription(getActiveProject())
				),
				map(([c, projectId]) => {
					const { result: chartId, entities } = normalize(
						c,
						chartScheme
					);

					return new CreateChartComplete({
						projectId,
						chart: {
							entities,
							chartId
						}
					});
				})
			);
		})
	);

	@Effect()
	selectChart$ = this.action$.pipe(
		ofType(ChartsActionConstants.SELECT_CHART),
		switchMap((action: SelectChart) => {
			return this.storeService
				.createSubscription(getChart(action.payload.id))
				.pipe(
					withLatestFrom(
						this.storeService.createSubscription(
							getActiveProject()
						),
						this.storeService.createSubscription(getActiveChartId())
					),
					map(([c, projectId, id]) => {
						const currentChart = {
							id: id,
							chartTypeId: c.id,
							customizeSettings: [...c.customizeSettings],
							dimensionSettings: this.chartService.transformDimensions(
								c.dimensionSettings
							)
						};

						const { result: chartId, entities } = normalize(
							currentChart,
							chartScheme
						);

						return new SelectChartComplete({
							projectId,
							chart: {
								entities,
								chartId
							}
						});
					})
				);
		})
	);
}
