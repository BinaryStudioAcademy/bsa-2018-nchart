import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
	LoadDataFailed,
	LoadDataComplete
} from '@app/store/actions/loaded-data/loaded-data.actions';
import { LoadedDataActionConstants } from '@app/store/actions/loaded-data/loaded-data.action-types';
import { SourceService } from '@app/services/source.service';

@Injectable()
export class LoadedDataEffects {
	constructor(
		private action$: Actions,
		private sourceService: SourceService
	) {}

	@Effect()
	loadData$ = this.action$.pipe(
		ofType(LoadedDataActionConstants.LOADEDDATA_LOAD_DATA),
		switchMap((action: any) =>
			this.sourceService
				.loadSource({
					link: action.payload.link,
					text: action.payload.text,
					fileKey: action.payload.fileKey
				})
				.pipe(
					map(({ payload }) => {
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
