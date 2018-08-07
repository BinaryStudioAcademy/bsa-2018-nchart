import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from './models';
import { VerifyToken } from '@app/store/actions/user/user.actions';
import { user as userSelector } from '@app/store/selectors/user.selectors';
import { StoreService } from '@app/services/store.service';

@Component({
	selector: 'app-root',
	templateUrl: './root.component.html',
	styleUrls: ['./root.component.sass']
})
export class RootComponent implements OnInit, OnDestroy {
	user: User;
	disconnect;

	constructor(private storeService: StoreService) {}

	ngOnInit() {
		this.disconnect = this.storeService.connect(
			new Map([
				[
					userSelector,
					user => {
						this.user = user;
					}
				]
			])
		);
	}

	dispatch() {
		this.storeService.dispatch(new VerifyToken({ token: '12345' }));
	}

	ngOnDestroy() {
		this.disconnect();
	}
}
