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
import { of } from 'rxjs';
import { User } from '@app/models';
import { UserDomainService } from '@app/api/domains/user';
import { UserAuthentication } from '@app/models/user-authentication.model';

@Injectable()
export class UserEffects {
	constructor(private action$: Actions, private api: UserDomainService) {}

	@Effect()
	verifyToken$ = this.action$.pipe(
		ofType(UserActionConstants.VERIFY_USER_TOKEN),
		switchMap((action: VerifyToken) =>
			this.api.verifyToken(action.payload).pipe(
				map((value: User) => new VerifyTokenComplete(value)),
				catchError(error => of(new VerifyTokenFailed(error)))
			)
		)
	);

	@Effect()
	login$ = this.action$.pipe(
		ofType(UserActionConstants.USER_LOGIN),
		switchMap((action: Login) =>
			this.api.login(action.payload).pipe(
				map((value: UserAuthentication) => new LoginComplete(value)),
				catchError(error => of(new LoginFailed(error)))
			)
		)
	);

	@Effect()
	register$ = this.action$.pipe(
		ofType(UserActionConstants.USER_REGISTER),
		switchMap((action: Register) =>
			this.api.register({ user: action.payload }).pipe(
				map((value: UserAuthentication) => new RegisterComplete(value)),
				catchError(error => of(new RegisterFailed(error)))
			)
		)
	);
}
