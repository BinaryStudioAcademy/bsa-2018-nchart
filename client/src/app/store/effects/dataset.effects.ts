import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as DatasetActions from '../actions/datasets/datasets.actions';
import { DatasetActionConstants as constants } from '@app/store/actions/datasets/datasets.action-types';
import { DatasetDomainService } from '@app/api/domains/source/dataset-domain.service';
import { DatasetService } from '@app/services/dataset.service';
import { datasetScheme } from '@app/schemes/dataset.schema';
import { normalize } from 'normalizr';
import {withLatestFrom, map, concatMap} from 'rxjs/internal/operators';
import { getActiveProject } from '@app/store/selectors/projects.selectors';
import {
	SetDatasetChart
} from '@app/store/actions/charts/charts.actions';
import { StoreService } from '@app/services/store.service';
import { throwError } from 'rxjs';
import { ResponseScheme } from '@app/models/response-scheme.model';
import { DatasetColumn } from '@app/models/dataset.model';
import { userChart } from '@app/store/selectors/userCharts';

@Injectable()
export class DatasetEffects {
	constructor(
		private action$: Actions,
		private datasetDomService: DatasetDomainService,
		private datasetService: DatasetService,
		private storeService: StoreService
	) {}

	@Effect()
	parseByText$ = this.action$.pipe(
		ofType(
			constants.PARSE_PLAIN_TEXT,
			constants.PARSE_FROM_FILE,
			constants.PARSE_FROM_URL,
			constants.LOAD_SAMPLE
		),
		switchMap(
			(
				action:
					| DatasetActions.ParseByText
					| DatasetActions.ParseByLink
					| DatasetActions.ParseByFile
					| DatasetActions.LoadSample
			) => {
				let loadData$;

				switch (action.type) {
					case constants.PARSE_PLAIN_TEXT:
						loadData$ = this.datasetDomService.loadByText({
							text: action.payload.text
						});
						break;
					case constants.PARSE_FROM_URL:
						loadData$ = this.datasetDomService.loadByUrl({
							link: action.payload.link
						});
						break;
					case constants.PARSE_FROM_FILE:
						loadData$ = this.datasetDomService.loadByFile({
							file: action.payload.file
						});
						break;
					case constants.LOAD_SAMPLE:
						loadData$ = this.datasetDomService.loadSample({
							id: action.payload.id
						});
						break;
				}

				return loadData$.pipe(
					switchMap(
						(
							value: ResponseScheme<{
								columns?: DatasetColumn[];
								data?: any[][];
							}>
						) => {
							if (!value.isSuccess) {
								return throwError(new Error('Cant parse data'));
							}

							return this.datasetService.createDataset(
								value.payload.columns,
								value.payload.data
							);
						}
					),
					withLatestFrom(
						this.storeService.createSubscription(
							getActiveProject()
						),
						this.storeService.createSubscription(userChart())
					),
					concatMap(([dataset, projectId, uChart]) => {
						const {
							result: [datasetId],
							entities
						} = normalize(
							this.datasetService.transformDatasets([dataset]),
							[datasetScheme]
						);

						return [
							new DatasetActions.ParseComplete({
								entities,
								datasetId,
								projectId
							}),
							new SetDatasetChart({
								datatsetId: datasetId,
								chartId: uChart.id
							})
						];
					}),
					catchError(error => {
						return of(
							new DatasetActions.ParseFailed({
								action: action,
								msg: 'test',
								error
							})
						);
					})
				);
			}
		)
	);

	@Effect()
	preloadSamples$ = this.action$.pipe(
		ofType(constants.PRELOAD_SAMPLES),
		switchMap((action: DatasetActions.PreloadSamples) => {
			return this.datasetDomService.preloadSamples().pipe(
				map(res => {
					const resSamples = [];
					res.payload.forEach(element => {
						resSamples.push({
							id: element.id,
							name: element.name
						});
					});
					return new DatasetActions.PreloadSamplesComplete(
						resSamples
					);
				}),
				catchError(error =>
					of(
						new DatasetActions.PreloadSamplesFailed({
							msg: `Can't export project`,
							action,
							error
						})
					)
				)
			);
		})
	);
}
