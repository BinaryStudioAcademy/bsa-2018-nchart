import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, delayWhen, filter } from 'rxjs/operators';
import { timer } from 'rxjs';
import dict from '@app/models/notification.model';
import {
	NotificationGenerate,
	NotificationDestroy
} from '@app/store/actions/notification/notification.actions';
import * as NotificationActions from '@app/store/actions/notification/notification.action-types';
import { NotificationType } from '@app/models/notification.model';

@Injectable()
export class NotificationEffects {
	DELAY = 5000;
	constructor(private action$: Actions) {}

	@Effect()
	notificationCatch$ = this.action$.pipe(
		filter((action: any) => dict.has(action.type)),
		map((action: any) => {
			return new NotificationGenerate({
				type: /COMPLETE/.test(action.type)
					? NotificationType.SUCCESS
					: NotificationType.ERROR,
				msg: dict.get(action.type)
			});
		})
	);

	@Effect()
	autoCancel$ = this.action$.pipe(
		ofType(
			NotificationActions.NotificationActionConstants
				.NOTIFICATION_GENERATE
		),
		delayWhen((action: any) => timer(this.DELAY)),
		map((action: NotificationGenerate) => {
			return new NotificationDestroy();
		})
	);
}
