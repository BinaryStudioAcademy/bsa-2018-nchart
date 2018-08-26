import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { Go } from '@app/store/actions/router/router.actions';
import { RouterActionConstants } from '@app/store/actions/router/router.action-types';

@Injectable()
export class RouterEffects {
	@Effect({ dispatch: false })
	navigate$ = this.actions$.pipe(
		ofType(RouterActionConstants.GO),
		map((action: Go) => action.payload),
		tap(({ path, query: queryParams, extras }) =>
			this.router.navigate(path, { queryParams, ...extras })
		)
	);

	@Effect({ dispatch: false })
	navigateBack$ = this.actions$.pipe(
		ofType(RouterActionConstants.BACK),
		tap(() => this.location.back())
	);

	@Effect({ dispatch: false })
	navigateForward$ = this.actions$.pipe(
		ofType(RouterActionConstants.FORWARD),
		tap(() => this.location.forward())
	);

	constructor(
		private actions$: Actions,
		private router: Router,
		private location: Location
	) {}
}
