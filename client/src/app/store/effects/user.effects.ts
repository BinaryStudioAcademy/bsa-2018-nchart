import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { UserActionConstants } from '../actions/user/user.action-types';
import {
	VerifyToken,
	VerifyTokenComplete,
	VerifyTokenFailed
} from '../actions/user/user.actions';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiService } from '@app/services/api.service';
import { User } from '@app/models';

@Injectable()
export class UserEffects {
	constructor(private api: ApiService, private action$: Actions) {}

	@Effect()
	verifyToken$ = this.action$.pipe(
		ofType(UserActionConstants.USER_VERIFY_TOKEN),
		switchMap((action: VerifyToken) =>
			this.api.verifyToken(action.payload.token).pipe(
				map((value: User) => new VerifyTokenComplete(value)),
				catchError(error => {
					return of(
						new VerifyTokenFailed({
							action: action,
							msg: 'test',
							error: null
						})
					);
				})
			)
		)
	);
}
