import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as constants from '../actions/datasets/datasets.actions'
import {DatasetActions} from '@app/store/actions/datasets/datasets.action-types';
import {ParseByFile, ParseByLink, ParseByText} from '@app/store/actions/datasets/datasets.actions';
import {DatasetDomainService} from '@app/api/domains/source/dataset-domain.service';
import {DatasetService} from '@app/services/dataset.service';
import {AppState } from '@app/models';
import {datasetScheme} from '@app/schemes/dataset.schema';
import {normalize} from 'normalizr';
import {select, Store} from '@ngrx/store';
import {withLatestFrom} from 'rxjs/internal/operators';
import {getActive} from '@app/store/selectors/projects.selectors';

@Injectable()
export class DatasetEffects {

	constructor(
		private action$: Actions,
		private datasetDomService: DatasetDomainService,
		private datasetService: DatasetService,
		private store$: Store<AppState>
	) {}

	@Effect()
	parseByText$ = this.action$.pipe(
		ofType(DatasetActions.PARSE_PLAIN_TEXT),
		switchMap((action: ParseByText) =>
			this.datasetDomService.loadByText({text: action.payload.text }).pipe(
				switchMap(({payload}) => {
					return this.datasetService.createDataset(payload.columns, payload.data);
				}),
				withLatestFrom(this.store$.pipe(select(getActive))),
				map(([dataset, projectId]) => {
					const { result: [datasetId], entities } = normalize(
						this.datasetService.transformDatasets([dataset]),
						[datasetScheme]
					);
					return new constants.ParseComplete({
						entities,
						datasetId,
						projectId
					});
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
			)
		)
	);

	@Effect()
	parseByLink$ = this.action$.pipe(
		ofType(DatasetActions.PARSE_FROM_URL),
		switchMap((action: ParseByLink) =>
			this.datasetDomService.loadByUrl({link: action.payload.link }).pipe(
				switchMap(({payload}) => {
					return this.datasetService.createDataset(payload.columns, payload.data);
				}),
				withLatestFrom(this.store$.pipe(select(getActive))),
				map(([dataset, projectId]) => {
					const { result: [datasetId], entities } = normalize(
						this.datasetService.transformDatasets([dataset]),
						[datasetScheme]
					);
					return new constants.ParseComplete({
						entities,
						datasetId,
						projectId
					});
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
			)
		)
	);

	@Effect()
	parseByFile$ = this.action$.pipe(
		ofType(DatasetActions.PARSE_FROM_FILE),
		switchMap((action: ParseByFile) => {
			return this.datasetDomService.loadByFile({file: action.payload.file }).pipe(
					switchMap(({payload}) => {
						return this.datasetService.createDataset(payload.columns, payload.data);
					}),
					withLatestFrom(this.store$.pipe(select(getActive))),
					map(([dataset, projectId]) => {
						const { result: [datasetId], entities } = normalize(
							this.datasetService.transformDatasets([dataset]),
							[datasetScheme]
						);
						return new constants.ParseComplete({
							entities,
							datasetId,
							projectId
						});
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
				)
			}
		)
	);
}
