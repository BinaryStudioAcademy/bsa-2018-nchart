import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { UserActionConstants } from '@app/store/actions/user/user.action-types';
import {
	VerifyToken,
	VerifyTokenComplete,
	VerifyTokenFailed,
	Login,
	LoginComplete,
	LoginFailed,
	Register,
	RegisterComplete,
	RegisterFailed
} from '@app/store/actions/user/user.actions';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { UserDomainService } from '@app/api/domains/user/user.domain';
import { TokenService } from '@app/services/token.service';

@Injectable()
export class UserEffects {
	constructor(
		private action$: Actions,
		private api: UserDomainService,
		private tokenService: TokenService
	) {}

	@Effect()
	verifyToken$ = this.action$.pipe(
		ofType(UserActionConstants.VERIFY_USER_TOKEN),
		switchMap((action: VerifyToken) =>
			this.api.verifyToken(action.payload).pipe(
				map(value => {
					if (value.isSuccess) {
						return new VerifyTokenComplete({ user: value.payload });
					} else {
						return throwError(new Error('Invalid token'));
					}
				}),
				catchError(error => {
					this.tokenService.removeToken();
					return of(new VerifyTokenFailed(error));
				})
			)
		)
	);

	@Effect()
	login$ = this.action$.pipe(
		ofType(UserActionConstants.LOGIN),
		switchMap((action: Login) =>
			this.api.login(action.payload.user).pipe(
				map(value => {
					if (value.isSuccess) {
						const { user } = value.payload;

						return new LoginComplete({ user });
					}

					return throwError(new Error(`Can't login`));
				}),
				catchError(error => of(new LoginFailed(error)))
			)
		)
	);

	@Effect()
	register$ = this.action$.pipe(
		ofType(UserActionConstants.REGISTER),
		switchMap((action: Register) =>
			this.api.register({ user: action.payload.user }).pipe(
				map(value => {
					if (value.isSuccess) {
						const { user } = value.payload;

						return new RegisterComplete({ user });
					}

					return throwError(new Error(`Can't register`));
				}),
				catchError(error => of(new RegisterFailed(error)))
			)
		)
	);
}
