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
import { User } from '../../models';
import { ApiService } from '@app/services/api.service';

@Injectable()
export class UserEffects {
	constructor(private api: ApiService, private action$: Actions) {}

	@Effect()
	verifyToken$ = this.action$.pipe(
		ofType(UserActionConstants.VERIFY_TOKEN),
		switchMap((action: VerifyToken) =>
			this.api.verifyToken(action.payload.token).pipe(
				map((value: User) => new VerifyTokenComplete(value)),
				catchError(error => of(new VerifyTokenFailed({ error })))
			)
		)
	);
}
