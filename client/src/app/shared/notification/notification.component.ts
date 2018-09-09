import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from '@app/services/store.service';
import { notificationSelector } from '@app/store/selectors/notification.selector';
import { NotificationDestroy } from '@app/store/actions/notification/notification.actions';
import {
	trigger,
	transition,
	style,
	animate,
	state
} from '@angular/animations';

@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.sass'],
	animations: [
		trigger('slide', [
			state(
				'slideIn',
				style({
					transform: 'translateY(0px)'
				})
			),
			state(
				'slideOut',
				style({
					transform: 'translateY(100%)'
				})
			),
			transition('slideOut => slideIn', [
				animate('300ms cubic-bezier(0.23, 1.24, 0.76, 1.2)')
			]),
			transition('slideIn => slideOut', [
				animate('300ms cubic-bezier(0.23, 1.24, 0.76, 1.2)')
			])
		])
	]
})
export class NotificationComponent implements OnInit, OnDestroy {
	isOpen: boolean;
	type: string;
	msg: string;
	state: string;

	disconnect: () => void;

	constructor(private storeService: StoreService) {}

	ngOnInit() {
		this.disconnect = this.storeService.connect([
			{
				subscriber: notification => {
					this.isOpen = notification.isOpen;
					this.state = this.isOpen ? 'slideIn' : 'slideOut';
					this.type = notification.type
						? notification.type
						: this.type;
					this.msg = notification.msg ? notification.msg : this.msg;
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
