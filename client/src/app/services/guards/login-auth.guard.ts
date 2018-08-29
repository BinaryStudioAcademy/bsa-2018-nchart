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
import {
	isVerifiedToken,
	userLoadingAndVerifiedToken
} from '@app/store/selectors/user.selectors';
import { switchMap, tap, take, last, map, first } from 'rxjs/operators';
import { StoreService } from '@app/services/store.service';
import { TokenVerificationResult } from '@app/models/token-verification-result.model';

@Injectable({
	providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate {
	constructor(
		private tokenService: TokenService,
		private storeService: StoreService,
		private router: Router
	) {}

	verifyToken() {
		return this.storeService
			.createSubscription(userLoadingAndVerifiedToken())
			.pipe(
				map(value => ({
					...value,
					token: this.tokenService.getToken()
				})),
				tap(value => {
					if (
						!value.isUserLoading &&
						!value.isVerifiedToken &&
						value.token
					) {
						this.storeService.dispatch(
							new VerifyToken({ token: value.token })
						);
					}
				}),
				take(3),
				last(),
				switchMap(
					value =>
						value.isVerifiedToken
							? of(TokenVerificationResult.verifiedToken)
							: of(TokenVerificationResult.notVerifiedToken)
				)
			);
	}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		return this.storeService.createSubscription(isVerifiedToken()).pipe(
			first(),
			switchMap<boolean, TokenVerificationResult>(
				(isVerified: boolean) =>
					isVerified
						? of(TokenVerificationResult.verifiedToken)
						: this.tokenService.getToken()
							? this.verifyToken()
							: of(TokenVerificationResult.noToken)
			),
			switchMap((value: TokenVerificationResult) => {
				switch (value) {
					case TokenVerificationResult.verifiedToken:
						this.router.navigate(['/app/project/draft']);
						return of(true);
					case TokenVerificationResult.notVerifiedToken:
						this.router.navigate(['/app']);
						return of(true);
					case TokenVerificationResult.noToken:
					default:
						return of(true);
				}
			})
		);
	}
}
