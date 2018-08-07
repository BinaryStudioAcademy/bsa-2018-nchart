import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { AppState } from '../models';

@Injectable()
export class StoreService {
	constructor(private store$: Store<AppState>) {}

	connect(connections: Map<any, any>) {
		const subscriptions = [];
		connections.forEach((subscriber, selector) => {
			const subscription = this.createSubscription(selector).subscribe(
				subscriber
			);
			subscriptions.push(subscription);
		});

		return this.disconnect(subscriptions);
	}

	createSubscription(selector: any) {
		return this.store$.pipe(select(selector));
	}

	dispatch(action: Action) {
		return this.store$.dispatch(action);
	}

	private disconnect(subscriptions = []) {
		return () => {
			subscriptions.forEach(s => s.unsubscribe());
		};
	}
}
