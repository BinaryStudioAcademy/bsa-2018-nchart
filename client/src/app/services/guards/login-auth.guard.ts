import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TokenService } from '@app/services/token.service';

import { VerifyToken } from '@app/store/actions/user/user.actions';
import { isVerifiedToken } from '@app/store/selectors/user.selectors';
import { switchMap, catchError, elementAt } from 'rxjs/operators';
import { AppState } from '@app/models';
import { Store, select } from '@ngrx/store';

@Injectable({
	providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate {
	constructor(
		private tokenService: TokenService,
		private store: Store<AppState>,
		private router: Router
	) {}

	checkIsVerifiedToken() {
		return this.store.pipe(
			select(isVerifiedToken()),
			elementAt(1)
		);
	}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		const token = this.tokenService.getToken();

		if (token) {
			this.store.dispatch(
				new VerifyToken({ token: this.tokenService.getToken() })
			);

			return this.checkIsVerifiedToken().pipe(
				switchMap((result: { isVerified: boolean }) => {
					result.isVerified === true
						? this.router.navigate(['/app/project/draft'])
						: this.router.navigate(['/app']);

					return of(true);
				}),
				catchError(error => {
					return of(false);
				})
			);
		} else {
			return true;
		}
	}
}
