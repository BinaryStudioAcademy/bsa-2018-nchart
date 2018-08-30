import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as constants from '@app/store/actions/datasets/datasets.actions';
import { DatasetActions } from '@app/store/actions/datasets/datasets.action-types';
import { DatasetDomainService } from '@app/api/domains/source/dataset-domain.service';
import { DatasetService } from '@app/services/dataset.service';
import { datasetScheme } from '@app/schemes/dataset.schema';
import { normalize } from 'normalizr';
import { withLatestFrom } from 'rxjs/internal/operators';
import { getActiveProject } from '@app/store/selectors/projects.selectors';
import { CreateChart } from '@app/store/actions/charts/charts.actions';
import { StoreService } from '@app/services/store.service';
import { throwError } from 'rxjs';
import { ResponseScheme } from '@app/models/response-scheme.model';
import { DatasetColumn } from '@app/models/dataset.model';

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
			DatasetActions.PARSE_PLAIN_TEXT,
			DatasetActions.PARSE_FROM_FILE,
			DatasetActions.PARSE_FROM_URL
		),
		switchMap(
			(
				action:
					| constants.ParseByText
					| constants.ParseByLink
					| constants.ParseByFile
			) => {
				let loadData$;

				switch (action.type) {
					case DatasetActions.PARSE_PLAIN_TEXT:
						loadData$ = this.datasetDomService.loadByText({
							text: action.payload.text
						});
						break;
					case DatasetActions.PARSE_FROM_URL:
						loadData$ = this.datasetDomService.loadByUrl({
							link: action.payload.link
						});
						break;
					case DatasetActions.PARSE_FROM_FILE:
						loadData$ = this.datasetDomService.loadByFile({
							file: action.payload.file
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
						this.storeService.createSubscription(getActiveProject())
					),
					switchMap(([dataset, projectId]) => {
						const {
							result: [datasetId],
							entities
						} = normalize(
							this.datasetService.transformDatasets([dataset]),
							[datasetScheme]
						);
						return [
							new constants.ParseComplete({
								entities,
								datasetId,
								projectId
							}),
							new CreateChart({
								datatsetId: datasetId
							})
						];
					}),
					catchError(error => {
						return of(
							new constants.ParseFailed({
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
}
