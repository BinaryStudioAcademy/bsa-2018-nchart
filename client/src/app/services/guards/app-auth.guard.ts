import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TokenService } from '@app/services/token.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AppAuthGuard implements CanActivate {
	constructor(private tokenService: TokenService) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		return this.tokenService.verifyToken().pipe(
			switchMap(() => {
				return of(true);
			})
		);
	}
}
