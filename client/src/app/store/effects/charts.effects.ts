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
	CreateChartComplete, CreateChartFailed,
	SelectChart,
	SelectChartComplete
} from '@app/store/actions/charts/charts.actions';
import { chartScheme } from '@app/schemes/chart.schema';
import { ChartService } from '@app/services/chart.service';
import { Chart } from '@app/models/chart.model';
import { getActiveProject } from '@app/store/selectors/projects.selectors';
import { withLatestFrom } from 'rxjs/internal/operators';
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
		withLatestFrom(this.storeService.createSubscription()),
		map(([action, state]) => {
			try {
				const fchart: Chart = getFirstChart()(state);
				const projectId = getActiveProject()(state);
				const newChart =  this.chartService.createChart({
					chartTypeId: fchart.id,
					datasetId: (action as CreateChart).payload.datatsetId,
					customizeSettings: [...fchart.customizeSettings],
					dimensionSettings: this.chartService.transformDimensions(
						fchart.dimensionSettings
					)
				});

				const { result: chartId, entities } = normalize(
					newChart,
					chartScheme
				);

				return new CreateChartComplete({
					projectId,
					chart: {
						entities,
						chartId
					}
				});
			} catch (err) {
				return new CreateChartFailed({
					action,
					error: err,
					msg: 'Create chart failed'
				});
			}
		}),
	);

	@Effect()
	selectChart$ = this.action$.pipe(
		ofType(ChartsActionConstants.SELECT_CHART),
		withLatestFrom(this.storeService.createSubscription()),
		map(([action, state]) => {
			const chart = getChart((action as SelectChart).payload.id)(state);
			const projectId = getActiveProject()(state);
			const aChartId = getActiveChartId()(state);

			const currentChart = {
				id: aChartId,
				chartTypeId: chart.id,
				customizeSettings: [...chart.customizeSettings],
				dimensionSettings: this.chartService.transformDimensions(
					chart.dimensionSettings
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
}
