// import { Injectable } from '@angular/core';
// import { Actions, Effect, ofType } from '@ngrx/effects';
// import { map, switchMap } from 'rxjs/operators';
// import { catchError } from 'rxjs/operators';
// import { Observable, of } from 'rxjs';
// import { Chart } from '@app/models';
// import { normalize } from 'normalizr';
// import { arrayOfCommonScheme } from '@app/schemes/common.schema';
// import { ChartsActionConstants } from '@app/store/actions/checks/checks.action-types';
// import * as chartActions from '@app/store/actions/checks/checks.actions';
//
// @Injectable()
// export class UserChartsEffects {
//
// 	constructor(private action$: Actions) {}
//
// 	@Effect()
// 	loadData$ = this.action$.pipe(
// 		ofType(ChartsActionConstants.LOAD_CHARTS),
// 		switchMap((action: any) =>
// 			this.api.loadCharts().pipe(
// 				map((value: Array<Chart>) => {
// 					const {
// 						result: all,
// 						entities: { byId }
// 					} = normalize(value, arrayOfCommonScheme);
// 					return new chartActions.LoadChartsComplete({
// 						checks: {
// 							all,
// 							byId
// 						}
// 					});
// 				}),
// 				catchError(error => {
// 					return of(
// 						new chartActions.LoadChartsFailed({
// 							action: action,
// 							msg: 'test',
// 							error
// 						})
// 					);
// 				})
// 			)
// 		)
// 	);
// }
