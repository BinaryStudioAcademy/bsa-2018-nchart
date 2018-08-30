import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {StoreService} from '@app/services/store.service';
import {isChartsReady} from '@app/store/selectors/charts.selectors';
import {catchError, filter, switchMap, take, tap} from 'rxjs/internal/operators';
import {LoadCharts} from '@app/store/actions/charts/charts.actions';

@Injectable({
	providedIn: 'root'
})
export class ProjectGuard implements CanActivate {

	constructor(
		private storeService: StoreService
	) {}

	getChartsFromStoreOrAPI() {
		return this.storeService.createSubscription(isChartsReady()).pipe(
			tap((isReady) => {
				if (!isReady) {
					this.storeService.dispatch(new LoadCharts());
				}
			}),
			filter(isReady => !!isReady),
			take(1)
		);
	}

	canActivate(next: ActivatedRouteSnapshot,
				state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		return this.getChartsFromStoreOrAPI().pipe(
			switchMap(() => of(true)),
			catchError(() => of(false))
		);
	}
}
