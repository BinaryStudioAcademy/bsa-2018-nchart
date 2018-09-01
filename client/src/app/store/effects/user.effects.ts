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
	RegisterFailed,
	Logout,
	LogoutComplete
} from '@app/store/actions/user/user.actions';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { UserDomainService } from '@app/api/domains/user/user.domain';
import { TokenService } from '@app/services/token.service';
import { Go } from '@app/store/actions/router/router.actions';
import {concatMap, withLatestFrom} from 'rxjs/internal/operators';
import {StoreService} from '@app/services/store.service';
import {activeProjectId} from '@app/store/selectors/projects.selectors';
import {SaveProject} from '@app/store/actions/projects/projects.actions';

@Injectable()
export class UserEffects {
	constructor(
		private storeService: StoreService,
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
					return of(
						new VerifyTokenFailed({
							action,
							msg: error.message,
							error
						})
					);
				})
			)
		)
	);

	@Effect()
	login$ = this.action$.pipe(
		ofType(UserActionConstants.LOGIN),
		switchMap((action: Login) =>
			this.api.login(action.payload.user).pipe(
				withLatestFrom(this.storeService.createSubscription(activeProjectId())),
				concatMap(([value, aProjectId]) => {
					if (value.isSuccess) {
						const { user } = value.payload;

						if (aProjectId) {
							return [
								new LoginComplete({user}),
								new SaveProject({id: aProjectId})
							] as any;
						} else {
							return [
								new LoginComplete({ user }),
								new Go({ path: ['/app/project/draft'] })
							];
						}
					}

					return throwError(new Error(`Can't login`));
				}),
				catchError(error =>
					of(
						new LoginFailed({
							action,
							msg: error.message,
							error
						})
					)
				)
			)
		)
	);

	@Effect()
	register$ = this.action$.pipe(
		ofType(UserActionConstants.REGISTER),
		switchMap((action: Register) =>
			this.api.register({ user: action.payload.user }).pipe(
				withLatestFrom(this.storeService.createSubscription(activeProjectId())),
				concatMap(([value, aProjectId]) => {
					if (value.isSuccess) {
						const { user } = value.payload;

						if (aProjectId) {
							return [
								new RegisterComplete({ user }),
								new SaveProject({ id: aProjectId })
							] as any;
						} else {
							return [
								new RegisterComplete({ user }),
								new Go({ path: ['/app/project/draft'] })
							] as any;
						}
					}

					return throwError(new Error(`Can't register`));
				}),
				catchError(error =>
					of(
						new RegisterFailed({
							action,
							msg: error.message,
							error
						})
					)
				)
			)
		)
	);

	@Effect()
	logout$ = this.action$.pipe(
		ofType(UserActionConstants.LOGOUT),
		mergeMap((action: Logout) => {
			this.tokenService.removeToken();
			return [new LogoutComplete(), new Go({ path: ['/app'] })];
		})
	);
}
