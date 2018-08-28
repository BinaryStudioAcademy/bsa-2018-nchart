import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { StoreService } from '@app/services/store.service';
import { TokenService } from '@app/services/token.service';
import { VerifyToken } from '@app/store/actions/user/user.actions';

@Injectable({
	providedIn: 'root'
})
export class AppAuthGuard implements CanActivate {
	constructor(
		private storeService: StoreService,
		private tokenService: TokenService
	) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		const token = this.tokenService.getToken();
		if (token) {
			this.storeService.dispatch(new VerifyToken({ token }));
		}

		return true;
	}
}
