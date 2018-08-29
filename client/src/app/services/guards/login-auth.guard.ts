import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TokenService } from '@app/services/token.service';
import { switchMap } from 'rxjs/operators';
import { TokenVerificationResult } from '@app/models/token-verification-result.model';

@Injectable({
	providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate {
	constructor(private tokenService: TokenService, private router: Router) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		return this.tokenService.verifyToken().pipe(
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
