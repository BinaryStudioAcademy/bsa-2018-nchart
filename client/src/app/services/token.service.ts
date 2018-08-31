import { Injectable } from '@angular/core';
import { StoreService } from '@app/services/store.service';
import {
	userLoadingAndVerifiedToken,
	isVerifiedToken
} from '@app/store/selectors/user.selectors';
import { map, tap, take, last, switchMap, first } from 'rxjs/operators';
import { VerifyToken } from '@app/store/actions/user/user.actions';
import { TokenVerificationResult } from '@app/models/token-verification-result.model';
import { of, Observable } from 'rxjs';

@Injectable()
export class TokenService {
	private static tokenStorageKey = 'userToken';
	constructor(private storeService: StoreService) {}

	setToken(token: string) {
		localStorage.setItem(TokenService.tokenStorageKey, token);
	}

	getToken(): string {
		return localStorage.getItem(TokenService.tokenStorageKey);
	}

	removeToken() {
		localStorage.removeItem(TokenService.tokenStorageKey);
	}

	verifyToken(): Observable<TokenVerificationResult> {
		const verifyTokenOnBackend$ = this.storeService
			.createSubscription(userLoadingAndVerifiedToken())
			.pipe(
				map(value => ({
					...value,
					token: this.getToken()
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

		return this.storeService.createSubscription(isVerifiedToken()).pipe(
			first(),
			switchMap<boolean, TokenVerificationResult>(
				(isVerified: boolean) =>
					isVerified
						? of(TokenVerificationResult.verifiedToken)
						: this.getToken()
							? verifyTokenOnBackend$
							: of(TokenVerificationResult.noToken)
			)
		);
	}
}
