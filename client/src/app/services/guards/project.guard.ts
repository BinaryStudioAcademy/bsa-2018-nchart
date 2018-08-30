import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate} from '@angular/router';
import {Observable, of} from 'rxjs';
import {StoreService} from '@app/services/store.service';
import {isChartsReady} from '@app/store/selectors/charts.selectors';
import {catchError, filter, map, switchMap, take, tap, withLatestFrom} from 'rxjs/internal/operators';
import {LoadCharts} from '@app/store/actions/charts/charts.actions';
import {ProjectComponent} from '@app/core/project/project.component';
import {isActiveDraft, isProjectDataset} from '@app/store/selectors/projects.selectors';

@Injectable({
	providedIn: 'root'
})
export class ProjectGuard implements CanActivate, CanDeactivate<ProjectComponent> {

	constructor(private storeService: StoreService) {
	}

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

	canDeactivate(component: ProjectComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
				  nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> {
		return this.storeService.createSubscription(isActiveDraft()).pipe(
			withLatestFrom(this.storeService.createSubscription(isProjectDataset())),
			map(([isDraft, hasDataset]) => {
				if (nextState.url.includes('app/project/')) {
					return !isDraft;
				} else {
					return !hasDataset;
				}
			})
		);
	}

}
