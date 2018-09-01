import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	CanDeactivate
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { StoreService } from '@app/services/store.service';
import { isChartsReady } from '@app/store/selectors/charts.selectors';
import {
	map,
	switchMap,
	take,
	withLatestFrom
} from 'rxjs/internal/operators';
import { LoadCharts } from '@app/store/actions/charts/charts.actions';
import { ProjectComponent } from '@app/core/project/project.component';
import { Actions } from '@ngrx/effects';
import { ChartsActionConstants } from '@app/store/actions/charts/charts.action-types';
import { LoadChartsComplete, LoadChartsFailed } from '@app/store/actions/charts/charts.actions';
import {
	isActiveDraft,
	isProjectDataset
} from '@app/store/selectors/projects.selectors';
import { Go } from '@app/store/actions/router/router.actions';

@Injectable({
	providedIn: 'root'
})
export class ProjectGuard
	implements CanActivate, CanDeactivate<ProjectComponent> {
	constructor(private storeService: StoreService, private action$: Actions) {}

	getChartsFromStoreOrAPI() {
		return this.storeService.createSubscription(isChartsReady()).pipe(
			switchMap(isReady => {
				const guardPayload: {
					isReady: boolean,
					action: LoadChartsComplete | LoadChartsFailed
				} = {
					isReady,
					action: null
				};

				if (isReady) {
					return of(guardPayload);
				}

				this.storeService.dispatch(new LoadCharts());

				return this.action$.ofType(ChartsActionConstants.LOAD_CHARTS__COMPLETE, ChartsActionConstants.LOAD_CHARTS__FAILED)
					.pipe(map(action => {
						return {
							...guardPayload,
							action
						};
					}));
			}),
			map((guardPayload) => {
				if (guardPayload.isReady || guardPayload.action.type === ChartsActionConstants.LOAD_CHARTS__COMPLETE) {
					return true;
				}

				this.storeService.dispatch(new Go({ path: ['/app'] }));
				return false;
			}),
			take(1)
		);
	}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		return this.getChartsFromStoreOrAPI();
	}

	canDeactivate(
		component: ProjectComponent,
		currentRoute: ActivatedRouteSnapshot,
		currentState: RouterStateSnapshot,
		nextState?: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> {
		return this.storeService.createSubscription(isActiveDraft()).pipe(
			withLatestFrom(
				this.storeService.createSubscription(isProjectDataset())
			),
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
