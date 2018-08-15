import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { FileData } from '@app/models';
import { ModifiedDataActionConstants } from '@app/store/actions/modified-data/modified-data.action-types';
import {
	LoadDataComplete,
	LoadDataFailed
} from '@app/store/actions/modified-data/modified-data.actions';

@Injectable()
export class ModifiedDataEffects {
	api = {
		loadData: (): Observable<FileData> => {
			return of({
				columns: [
					{
						title: 'Product name',
						type: 'string'
					},
					{
						title: 'Price',
						type: 'number'
					},
					{
						title: 'Quantity',
						type: 'string'
					},
					{
						title: 'Quantity(2)',
						type: 'string'
					}
				],
				data: [
					[null, null, 'FFMollis consequat', 9],
					['Tvoluptatem', 10.32, 1, null],
					['Tvoluptatem', 10.32, 1, null],
					['Broken', null, 1, null],
					['Broken1', 1, null, null],
					['Tvoluptatem', 10.32, 1, null],
					['Scelerisque lacinia', null, 1, null],
					['Consectetur adipiscing', 28.72, 10, null],
					['Condimentum aliquet', 13.9, 1, 'wtf']
				]
			});
		}
	};

	constructor(private action$: Actions) {}

	@Effect()
	loadData$ = this.action$.pipe(
		ofType(ModifiedDataActionConstants.MODIFIEDDATA_LOAD_DATA),
		switchMap((action: any) =>
			this.api.loadData().pipe(
				map((payload: FileData) => {
					return new LoadDataComplete(payload);
				}),
				catchError(error => {
					return of(
						new LoadDataFailed({
							action: action,
							msg: 'test',
							error
						})
					);
				})
			)
		)
	);
}
