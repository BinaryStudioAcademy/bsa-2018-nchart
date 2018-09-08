import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from '@app/services/store.service';
import { notificationSelector } from '@app/store/selectors/notification.selector';
import { NotificationDestroy } from '@app/store/actions/notification/notification.actions';

@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.sass']
})
export class NotificationComponent implements OnInit, OnDestroy {
	isOpen: boolean;
	type: string;
	msg: string;

	disconnect: () => void;

	constructor(private storeService: StoreService) {}

	ngOnInit() {
		this.disconnect = this.storeService.connect([
			{
				subscriber: notification => {
					this.isOpen = notification.isOpen;
					this.type = notification.type;
					this.msg = notification.msg;
				},
				selector: notificationSelector()
			}
		]);
	}

	ngOnDestroy() {
		this.disconnect();
	}

	closeNotification() {
		this.storeService.dispatch(new NotificationDestroy());
	}
}
